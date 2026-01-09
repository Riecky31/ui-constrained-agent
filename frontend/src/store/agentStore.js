import { create } from 'zustand';

const useAgentStore = create((set) => ({
  // Agent state
  agentResponses: [
    {
      text: "Hello! I'm your UI-constrained agent. I can only respond with 120 characters max, using predefined buttons and forms. Select a task to begin!",
      timestamp: new Date().toISOString(),
      charCount: 120
    }
  ],
  currentTask: null,
  taskState: 'idle',
  confidence: 0.8,
  uncertainty: 0.2,
  
  // Task constraints
  responseLimit: 120,
  
  // Actions
  setTask: (task) => set({ 
    currentTask: task, 
    taskState: 'in_progress' 
  }),
  
  addAgentResponse: (response) => set((state) => {
    // Calculate character count
    const charCount = response.length;
    
    // Enforce character limit
    const truncatedResponse = charCount > state.responseLimit 
      ? response.substring(0, state.responseLimit - 3) + '...' 
      : response;
    
    const finalCharCount = truncatedResponse.length;
    
    return { 
      agentResponses: [...state.agentResponses, {
        text: truncatedResponse,
        timestamp: new Date().toISOString(),
        charCount: finalCharCount
      }],
      // Update confidence based on response length
      confidence: finalCharCount > 100 ? state.confidence * 0.9 : state.confidence
    };
  }),
  
  updateTaskState: (newState) => set({ 
    taskState: newState,
    // Adjust confidence based on state
    confidence: newState === 'partial' ? 0.6 : 
               newState === 'error' ? 0.4 : 
               newState === 'complete' ? 0.9 : 
               state => state.confidence
  }),
  
  updateConfidence: (confidence) => set({ 
    confidence: Math.max(0.1, Math.min(1, confidence)),
    uncertainty: 1 - Math.max(0.1, Math.min(1, confidence))
  }),
  
  // User correction without restart
  applyCorrection: (correction) => set((state) => ({
    agentResponses: [...state.agentResponses, {
      text: `User correction: ${correction.substring(0, 50)}${correction.length > 50 ? '...' : ''}`,
      timestamp: new Date().toISOString(),
      type: 'correction'
    }],
    // Update confidence based on correction
    confidence: Math.max(0.3, state.confidence - 0.2),
    // Keep task in partial state
    taskState: 'partial'
  })),
  
  // Reset
  resetTask: () => set({ 
    agentResponses: [{
      text: "Task reset. Ready for a new task!",
      timestamp: new Date().toISOString(),
      charCount: 32
    }],
    currentTask: null,
    taskState: 'idle',
    confidence: 0.8,
    uncertainty: 0.2
  }),
}));

export default useAgentStore;