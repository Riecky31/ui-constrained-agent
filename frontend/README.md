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
![UI-before-selection](./public/screenshots/UI-before-selection.png)

2. Active Task Interface  
![ui-after-selection](./public/screenshots/ui-after-selection.png)

3. State Management Diagram
![stateflow](./public/screenshots/stateflow.png)

4. Correction Process
![correction](./public/screenshots/correction.png)

5. Recovery Behavior
![recovery](./public/screenshots/recovery.png)
