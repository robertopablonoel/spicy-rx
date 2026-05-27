# Patient portal — UI kit

The logged-in surface where prescribed patients track their consultation, manage refills, and message the clinician.

> **No actual codebase provided.** This is a first-draft surface built from the brand brief.

## Screens

1. **Dashboard** — order status, vitals, refill timer, upcoming clinician message.
2. **Order details** — lot number, assay readouts, shipment tracking.
3. **Clinician messages** — async DM thread with the prescriber.

Switch with the sidebar.

## Components

- `Sidebar.jsx` — vertical nav, account chip at the foot
- `Dashboard.jsx` — order status hero card + vitals strip + recent updates
- `OrderDetail.jsx` — lot card with assay readouts
- `Messages.jsx` — chat thread with the clinician
- `StatusChip`, `LabReadout`, `Card` — atoms (in Atoms.jsx)
