#!/usr/bin/env bash
# Live monitor for the insert-card lander (/card) and the insert-exit-2026-09
# experiment. Read-only: it only runs HogQL SELECTs.
#
# Reports the whole chain a real scanner walks:
#   insert_qr_scan -> card_quiz_viewed -> card_quiz_step -> completed -> handoff
# split by exit arm, plus the line they routed to and where they drop.
#
# Project 446371 is my.spicyrx.com / the marketing site, which is where
# lib/analytics sends the card_quiz_* events and where the /qr route posts
# insert_qr_scan.

set -uo pipefail

# Measure from go-live, not from "3 days ago". Earlier scan counts are polluted:
# the /qr route posts insert_qr_scan SERVER-SIDE using NEXT_PUBLIC_POSTHOG_KEY,
# which .env.local also sets — so local dev-server testing fired real events into
# production PostHog. Roughly 110 synthetic scans landed on 2026-09-03 between
# 20:00 and 22:00 UTC. Anything before SINCE is untrustworthy for this channel.
SINCE="${MONITOR_SINCE:-2026-09-03 21:55:00}"

KEY="$(cat ~/command-center/.posthog_key)"
PROJECT=446371
HOST="https://us.posthog.com"

q() {
  curl -s -X POST "$HOST/api/projects/$PROJECT/query/" \
    -H "Authorization: Bearer $KEY" \
    -H "Content-Type: application/json" \
    -d "{\"query\":{\"kind\":\"HogQLQuery\",\"query\":$(python3 -c 'import json,sys;print(json.dumps(sys.argv[1]))' "$1")}}" \
    | python3 -c '
import json,sys
try:
    d=json.load(sys.stdin)
except Exception:
    print("  (no response)"); sys.exit()
if "results" not in d:
    print("  error:", str(d)[:200]); sys.exit()
rows=d["results"]
if not rows:
    print("  (nothing yet)"); sys.exit()
cols=[c.split(".")[-1] for c in d.get("columns",[])]
w=[max(len(str(cols[i])), max(len(str(r[i])) for r in rows)) for i in range(len(cols))]
print("  " + "  ".join(str(cols[i]).ljust(w[i]) for i in range(len(cols))))
for r in rows:
    print("  " + "  ".join(str(r[i]).ljust(w[i]) for i in range(len(cols))))
'
}

echo "════════════════════════════════════════════════════════════"
echo " insert-card lander · $(date '+%H:%M %Z') · since $SINCE UTC"
echo "════════════════════════════════════════════════════════════"

echo
echo "▸ THE CHAIN (since go-live)"
q "SELECT event, count() AS events, count(DISTINCT distinct_id) AS people
   FROM events
   WHERE event IN ('insert_qr_scan','card_quiz_viewed','card_quiz_step',
                   'card_quiz_completed','card_quiz_handoff_click')
     AND timestamp > toDateTime('$SINCE')
   GROUP BY event
   ORDER BY events DESC"

echo
echo "▸ BY EXIT ARM  (the experiment: lander vs direct)"
# TAP-TIME EVENTS ONLY. card_quiz_viewed is deliberately excluded: it fires
# during hydration, when useExitArm()'s server snapshot still reads "lander",
# so its `arm` is unreliable and over-counts lander. step/completed/handoff all
# fire on a user tap, long after hydration settles, and are trustworthy.
# Read the experiment from these, never from viewed.
q "SELECT properties.arm AS arm, event, count() AS n,
          count(DISTINCT distinct_id) AS people
   FROM events
   WHERE event IN ('card_quiz_step','card_quiz_completed','card_quiz_handoff_click')
     AND timestamp > toDateTime('$SINCE')
   GROUP BY arm, event ORDER BY arm, n DESC"

echo
echo "▸ SPLIT BALANCE  (a person under BOTH arms means the labelling regressed)"
q "SELECT arms, count() AS people FROM (
     SELECT distinct_id, arrayStringConcat(arraySort(groupUniqArray(toString(properties.arm))),'+') AS arms
     FROM events
     WHERE event IN ('card_quiz_step','card_quiz_completed','card_quiz_handoff_click')
       AND timestamp > toDateTime('$SINCE')
     GROUP BY distinct_id
   ) GROUP BY arms ORDER BY people DESC"

echo
echo "▸ THE SCOREBOARD  (leads ÷ people who reached the reveal)"
# The reveal is the last screen both arms share, so it is the unbiased
# denominator. Scans cannot be used per-arm: insert_qr_scan is posted
# server-side and does NOT carry sc_exit, so scan counts exist only in total.
q "SELECT r.arm AS arm, r.reveal AS reveal, l.leads AS leads,
          round(100.0 * l.leads / r.reveal, 1) AS pct
   FROM (SELECT toString(properties.arm) AS arm, count(DISTINCT distinct_id) AS reveal
         FROM events WHERE event='card_quiz_completed' AND timestamp > toDateTime('$SINCE')
         GROUP BY arm) r
   LEFT JOIN (SELECT extractURLParameter(toString(properties.\$current_url),'sc_exit') AS arm,
                     count(DISTINCT distinct_id) AS leads
              FROM events WHERE event='client.lead.created' AND timestamp > toDateTime('$SINCE')
                AND extractURLParameter(toString(properties.\$current_url),'sc_exit') != ''
              GROUP BY arm) l ON r.arm = l.arm
   ORDER BY arm"

echo
echo "▸ DROP-OFF BY QUESTION  (where they quit)"
q "SELECT properties.question AS question, properties.answer AS answer, count() AS n
   FROM events
   WHERE event = 'card_quiz_step' AND timestamp > toDateTime('$SINCE')
   GROUP BY question, answer ORDER BY question, n DESC"

echo
echo "▸ WHICH LINE THEY ROUTED TO"
q "SELECT properties.line AS line, count() AS n
   FROM events
   WHERE event = 'card_quiz_handoff_click' AND timestamp > toDateTime('$SINCE')
   GROUP BY line ORDER BY n DESC"

echo
echo "▸ CARD DESIGN  (playing-card vs black-card — bc has been dark since Aug 26)"
q "SELECT properties.utm_content AS design, count() AS scans
   FROM events
   WHERE event = 'insert_qr_scan' AND timestamp > toDateTime('$SINCE')
   GROUP BY design ORDER BY scans DESC"

echo
echo "▸ DID ANYONE REACH THE INTAKE?  (arm parsed out of the intake URL)"
# Join on sc_exit read from \$current_url, NOT from a property. Rimo's GTM
# bridge promotes only an allowlist of params to top-level properties —
# sc_order and form_arm made that list, sc_exit did not — so properties.sc_exit
# is null on every Rimo event even when the param is plainly in the URL.
#
# Do NOT filter on `properties.utm.utmMedium`: HogQL reads that as a nested
# JSON path (properties → utm → utmMedium), but the literal key is the
# dotted string "utm.utmMedium". It silently matches nothing, which reported
# "(nothing yet)" for the first 14 hours while two real leads had already
# landed. Bracket-quote dotted keys, or key off the URL as we do here.
q "SELECT extractURLParameter(toString(properties.\$current_url),'sc_exit') AS arm,
          event, count() AS n, count(DISTINCT distinct_id) AS people
   FROM events
   WHERE event LIKE 'client.%'
     AND extractURLParameter(toString(properties.\$current_url),'sc_exit') != ''
     AND timestamp > toDateTime('$SINCE')
   GROUP BY arm, event ORDER BY arm, n DESC"

echo
echo "▸ COUPON SURVIVAL INTO THE INTAKE  (blank = the discount was lost)"
q "SELECT extractURLParameter(toString(properties.\$current_url),'sc_exit') AS arm,
          toString(properties['teleform.name']) AS form,
          extractURLParameter(toString(properties.\$current_url),'coupon') AS coupon,
          count() AS n
   FROM events
   WHERE event = 'client.teleform.started'
     AND extractURLParameter(toString(properties.\$current_url),'sc_exit') != ''
     AND timestamp > toDateTime('$SINCE')
   GROUP BY arm, form, coupon ORDER BY n DESC"
echo
