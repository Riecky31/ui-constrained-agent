## Screenshots

The following screenshots demonstrate all required assessment features:

### 1. Initial Interface
![UI Before Task Selection](./screenshots/Ui-before-sellection.png)
*Showing: Task selection panel, constraint explanation (120-char limit, predefined components)*

### 2. Active Task Interface  
![UI After Task Selection](./screenshots/ui-after-selection.png)
*Showing: Agent response with character counter, confidence display (85%), predefined action buttons*

### 3. State Management Diagram
![State Diagram](./screenshots/stateflow.png)
*Complete state machine showing: idle → in_progress → partial → complete transitions with recovery paths*

### 4. Correction Process
![Correction Flow](./screenshots/correction.png)
*User applying correction without restart: confidence adjusts, task continues from correction point*

### 5. Recovery Behavior
![Recovery Flow](./screenshots/recovery.png)
*System recovery after errors: partial state entry, confidence adjustment, continued execution*

