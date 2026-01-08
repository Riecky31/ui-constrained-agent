import { create } from 'zustand';

const useAgentStore = create((set) => ({
  // Agent state
  agentResponses: [],
  currentTask: null,
  taskState: 'idle', // 'idle', 'in_progress', 'partial', 'complete', 'error'
  confidence: 0.8,
  uncertainty: 0.2,
  
  // Task constraints
  responseLimit: 120,
  
  // Actions
  setTask: (task) => set({ currentTask: task, taskState: 'in_progress' }),
  
  addAgentResponse: (response) => set((state) => {
    // Enforce character limit
    const truncatedResponse = response.length > state.responseLimit 
      ? response.substring(0, state.responseLimit) + '...' 
      : response;
    
    return { 
      agentResponses: [...state.agentResponses, {
        text: truncatedResponse,
        timestamp: new Date().toISOString(),
        charCount: truncatedResponse.length
      }]
    };
  }),
  
  updateTaskState: (state) => set({ taskState: state }),
  
  updateConfidence: (confidence) => set({ 
    confidence,
    uncertainty: 1 - confidence 
  }),
  
  // User correction without restart
  applyCorrection: (correction) => set((state) => ({
    agentResponses: [...state.agentResponses, {
      text: `Correction applied: ${correction}`,
      timestamp: new Date().toISOString(),
      type: 'correction'
    }],
    confidence: Math.max(0.3, state.confidence - 0.1)
  })),
  
  resetTask: () => set({ 
    agentResponses: [],
    currentTask: null,
    taskState: 'idle',
    confidence: 0.8,
    uncertainty: 0.2
  }),
}));

export default useAgentStore;