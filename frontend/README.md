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

┌─────────┐    ┌──────────────┐    ┌──────────────┐
│  User   │────▶│    UI Layer   │────▶│   Response   │
│  Input  │    │  (Constrained)│    │   Renderer   │
└─────────┘    └──────────────┘    └──────────────┘
      │               │                    │
      ▼               ▼                    ▼
┌─────────┐    ┌──────────────┐    ┌──────────────┐
│  Task   │◀───│  Agent Store  │◀───│  120-Char    │
│  State  │    │  (Zustand)    │    │   Enforcer   │
└─────────┘    └──────────────┘    └──────────────┘
      │               │                    │
      ▼               ▼                    ▼
┌─────────────────────────────────────────────────┐
│              Partial State Manager              │
│  • Save progress at any point                   │
│  • Resume from correction points                │
│  • Maintain confidence through corrections      │
└─────────────────────────────────────────────────┘