# Project decisions

- Keep password recovery on a public `/reset-password` route so users can complete recovery before signing in.
- Register browser agent tools in the page component that owns their visible data, so each registration follows that screen's lifetime.
- Keep browser tool telemetry to static tool names, outcome, and duration, so user data and inputs are never sent as telemetry.