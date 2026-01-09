import { create } from 'zustand';

const useTaskStore = create((set, get) => ({
  // Current task state
  currentTask: null,
  currentStep: 0,
  completedSteps: [],
  partialData: {},
  
  // Task actions
  selectTask: (task) => set({ 
    currentTask: task,
    currentStep: 0,
    completedSteps: [],
    partialData: {}
  }),
  
  completeStep: (stepId, data) => set((state) => ({
    completedSteps: [...state.completedSteps, stepId],
    partialData: { ...state.partialData, [stepId]: data },
    currentStep: state.currentStep + 1
  })),
  
  updatePartialData: (stepId, data) => set((state) => ({
    partialData: { ...state.partialData, [stepId]: data }
  })),
  
  // Correction without restart
  applyCorrectionToStep: (stepId, correction) => set((state) => {
    // Remove step from completed if it was completed
    const newCompletedSteps = state.completedSteps.filter(id => id !== stepId);
    
    // Update data with correction
    const newPartialData = { ...state.partialData };
    if (newPartialData[stepId]) {
      newPartialData[stepId] = { 
        ...newPartialData[stepId], 
        correction,
        correctedAt: new Date().toISOString()
      };
    }
    
    return {
      completedSteps: newCompletedSteps,
      partialData: newPartialData,
      currentStep: Math.min(stepId - 1, state.currentStep)
    };
  }),
  
  // Task progress
  getProgress: () => {
    const state = get();
    if (!state.currentTask) return 0;
    return (state.completedSteps.length / state.currentTask.steps.length) * 100;
  },
  
  getCurrentStep: () => {
    const state = get();
    if (!state.currentTask) return null;
    return state.currentTask.steps[state.currentStep];
  },
  
  isStepCompleted: (stepId) => {
    const state = get();
    return state.completedSteps.includes(stepId);
  },
  
  // Reset
  resetTask: () => set({
    currentTask: null,
    currentStep: 0,
    completedSteps: [],
    partialData: {}
  })
}));

export default useTaskStore;