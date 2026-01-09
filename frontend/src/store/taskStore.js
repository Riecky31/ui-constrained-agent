import { create } from "zustand";

const useTaskStore = create((set, get) => ({
  // --- Core Task State ---
  currentTask: null,
  currentStep: 0,
  completedSteps: [],
  partialData: {},

  // --- Task Selection ---
  selectTask: (task) =>
    set({
      currentTask: task,
      currentStep: 0,
      completedSteps: [],
      partialData: {},
    }),

  // --- Completing Steps ---
  completeStep: (stepId, data) =>
    set((state) => ({
      completedSteps: [...new Set([...state.completedSteps, stepId])],
      partialData: { ...state.partialData, [stepId]: data },
      currentStep: state.currentStep + 1,
    })),

  // --- Update Partial Data (Mid-Task Edits) ---
  updatePartialData: (stepId, data) =>
    set((state) => ({
      partialData: {
        ...state.partialData,
        [stepId]: { ...state.partialData[stepId], ...data },
      },
    })),

  // --- Apply Corrections Without Restart ---
  applyCorrectionToStep: (stepId, correction) =>
    set((state) => {
      const isCompleted = state.completedSteps.includes(stepId);

      // Remove step from completed list if needed
      const updatedCompleted = isCompleted
        ? state.completedSteps.filter((id) => id !== stepId)
        : state.completedSteps;

      // Update partial data safely
      const newPartial = {
        ...state.partialData,
        [stepId]: {
          ...state.partialData[stepId],
          correction,
          correctedAt: new Date().toISOString(),
        },
      };

      // If a user corrects a previous step, move cursor back ONLY if needed
      const newStep =
        state.currentStep > stepId ? stepId : state.currentStep;

      return {
        completedSteps: updatedCompleted,
        partialData: newPartial,
        currentStep: newStep,
      };
    }),

  // --- Step Helpers ---
  advanceStep: () =>
    set((state) => ({
      currentStep: state.currentStep + 1,
    })),

  getCurrentStep: () => {
    const state = get();
    if (!state.currentTask) return null;
    return state.currentTask.steps[state.currentStep] ?? null;
  },

  isStepCompleted: (stepId) => {
    return get().completedSteps.includes(stepId);
  },

  // --- Progress ---
  getProgress: () => {
    const state = get();
    if (!state.currentTask) return 0;
    const total = state.currentTask.steps.length;
    return (state.completedSteps.length / total) * 100;
  },

  // --- Reset ---
  resetTask: () =>
    set({
      currentTask: null,
      currentStep: 0,
      completedSteps: [],
      partialData: {},
    }),
}));

export default useTaskStore;
