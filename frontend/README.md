# UI-Constrained Agent Assessment

## Overview
A task-focused assistant where the UI constrains the agent's behavior, preventing free-form chat and ensuring structured, predictable interactions.

**Key Features:**
-  **120-character limit** on all agent responses
-  **Predefined UI components only** (buttons, forms, status indicators)
-  **Partial task completion** with visual states
-  **User correction** without restarting tasks
-  **Visible confidence/uncertainty** metrics

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

## Screenshots

### 1. Main UI with All Constraints Active
![UI Overview](./screenshots/ui-overview.png)
*Showing character counter, predefined buttons, confidence display*

### 2. Character Limit Enforcement  
![Character Limit](./screenshots/char-limit.png)
*Agent response truncated at 120 characters*

### 3. Partial Completion State
![Partial State](./screenshots/partial-state.png)
*Task paused showing correction available*

### 4. Correction Flow in Action
![Correction Flow](./screenshots/correction-flow.png)
*User applying correction without restart*

### 5. Confidence Display
![Confidence Display](./screenshots/confidence-display.png)
*Visual confidence meter and uncertainty*

### 6. State Flow Diagram
![State Diagram](./screenshots/stateflow.png)
*Complete state machine and transitions*