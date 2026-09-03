#!/usr/bin/env bash
# Runs the card monitor every 10 minutes, appending to a log Cole can tail.
# Read-only throughout: HogQL SELECTs only.
LOG=/tmp/card-monitor/live.log
cd "$(dirname "$0")/.."
while true; do
  ./scripts/card-monitor.sh >> "$LOG" 2>&1
  echo "" >> "$LOG"
  sleep 600
done
