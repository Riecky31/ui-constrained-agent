# UI-Constrained Agent Assessment

## Overview
A task-focused assistant where the UI constrains the agent's behavior, preventing free-form chat and ensuring structured, predictable interactions.

**Key Features:**
- **120-character limit** on all agent responses
- **Predefined UI components only** (buttons, forms, status indicators)
- **Partial task completion** with visual states
- **User correction** without restarting tasks
- **Visible confidence/uncertainty** metrics

## Quick Start

### Prerequisites
- Node.js 18+ (LTS recommended)
- npm 9+ or yarn

### Installation & Running
```bash
# 1. Navigate to frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open browser to:
# http://localhost:5173
Screenshots
The following screenshots demonstrate all required assessment features:

1. Initial Interface
https://./public/screenshots/Ui-before-sellection.png
*Showing: Task selection panel, constraint explanation (120-char limit, predefined components only)*

2. Active Task Interface
https://./public/screenshots/ui-after-selection.png
*Showing: Agent response with character counter (95/120), confidence display (85%), predefined action buttons, partial state indicator*

3. State Management Diagram
https://./public/screenshots/stateflow.png
Complete state machine showing: idle → in_progress → partial → complete transitions with recovery paths and correction flows

4. Correction Process
https://./public/screenshots/correction.png
User applying correction without restart: confidence adjusts from 85% to 70%, task continues from correction point, no restart required

5. Recovery Behavior
https://./public/screenshots/recovery.png
System recovery after errors: partial state entry, confidence adjustment, continued execution, state preservation