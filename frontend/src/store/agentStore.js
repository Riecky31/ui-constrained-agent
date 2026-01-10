import { create } from 'zustand';

const RESPONSE_LIMIT = 120;
const MIN_CONFIDENCE = 0.1;

const clamp = (value) => Math.max(0, Math.min(1, value));

const createMessage = ({ role, text }) => {
  const safeText = String(text ?? '');

  return {
    role,
    text: safeText,
    charCount: safeText.length,
    timestamp: new Date().toISOString(),
  };
};

const deriveUncertainty = (confidence) => 1 - clamp(confidence);

const useAgentStore = create((set) => {
  const introText =
    "Hello! I'm your UI-constrained agent. I can only respond with 120 characters max, using predefined buttons and forms. Select a task to begin!";

  return {
 

    agentResponses: [
      createMessage({
        role: 'agent',
        text: introText,
      }),
    ],

    currentTask: null,
    taskState: 'idle',

    confidence: 0.8,
    uncertainty: 0.2,

    responseLimit: RESPONSE_LIMIT,

    /* ======================
       Actions
    ====================== */

    setTask: (task) =>
      set({
        currentTask: task,
        taskState: 'in_progress',
      }),

    addAgentResponse: (response) =>
      set((state) => {
        const rawText = String(response ?? '');

        const truncated =
          rawText.length > state.responseLimit
            ? rawText.slice(0, state.responseLimit - 3) + '...'
            : rawText;

        const message = createMessage({
          role: 'agent',
          text: truncated,
        });

        const newConfidence =
          message.charCount > 100
            ? clamp(state.confidence * 0.9)
            : state.confidence;

        return {
          agentResponses: [...state.agentResponses, message],
          confidence: Math.max(MIN_CONFIDENCE, newConfidence),
          uncertainty: deriveUncertainty(newConfidence),
        };
      }),

    applyCorrection: (correction) =>
      set((state) => {
        const text =
          correction.length > 50
            ? correction.slice(0, 50) + '...'
            : correction;

        const newConfidence = Math.max(
          MIN_CONFIDENCE,
          state.confidence - 0.2
        );

        return {
          agentResponses: [
            ...state.agentResponses,
            createMessage({
              role: 'user',
              text,
            }),
          ],
          confidence: newConfidence,
          uncertainty: deriveUncertainty(newConfidence),
          taskState: 'partial',
        };
      }),

    updateTaskState: (newState) =>
      set((state) => {
        const confidence =
          newState === 'partial'
            ? 0.6
            : newState === 'error'
            ? 0.4
            : newState === 'complete'
            ? 0.9
            : state.confidence;

        return {
          taskState: newState,
          confidence,
          uncertainty: deriveUncertainty(confidence),
        };
      }),

    updateConfidence: (value) =>
      set(() => {
        const confidence = clamp(value);
        return {
          confidence,
          uncertainty: deriveUncertainty(confidence),
        };
      }),

    resetTask: () =>
      set({
        agentResponses: [
          createMessage({
            role: 'agent',
            text: 'Task reset. Ready for a new task!',
          }),
        ],
        currentTask: null,
        taskState: 'idle',
        confidence: 0.8,
        uncertainty: 0.2,
      }),
  };
});

export default useAgentStore;
