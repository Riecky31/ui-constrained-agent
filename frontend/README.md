# UI-Constrained Agent

## Requirements
- Node.js 20+
- npm or yarn

## Installation
```bash
npm install


### b) Design decisions

- Agent responses are **UI-constrained**, ≤120 chars
- All messages are normalized: `{ role, text, charCount, timestamp }`
- **Zustand store** handles:
  - agentResponses
  - taskState (`idle` | `in_progress` | `partial` | `complete`)
  - confidence / uncertainty
- Partial completion handled via `applyCorrection`
- Confidence/uncertainty always sum to 1

### c) Failure scenario & recovery

Example:

> **Scenario:** User skips a required step.  
> **Recovery:** Agent still uses `taskState` and `providedData` to suggest next action. State is never lost; partial completion remains until corrected.

### d) Why plain-text chat would break this

- UI constraints (buttons, forms, indicators) wouldn’t be enforced
- Agent could produce >120 chars, violating the UI contract
- Partial completion & correction flows rely on **state awareness**, which is invisible in plain text

---

## Final checks

- All flows tested:
  - New task → normal response
  - Partial task → correction
  - Skipped step → fallback response
- Confirm confidence bar updates correctly
- Confirm no runtime errors
- Confirm app runs from fresh clone / zip
- Include **screenshots** and diagram in README

---

If you follow this plan, you’ll meet **all submission requirements**: working code, diagrams, screenshots, README explaining state & design decisions.  

---

If you want, I can **draft a sample README and diagram layout for your submission** that you can just fill in with your screenshots — ready to go for GitHub/zip.  

Do you want me to do that next?
