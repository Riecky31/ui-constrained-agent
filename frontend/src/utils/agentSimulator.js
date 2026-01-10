const RESPONSE_LIMIT = 120;

const clipText = (text, limit = RESPONSE_LIMIT) => {
  const safeText = String(text || '');
  return safeText.length <= limit
    ? safeText
    : safeText.slice(0, limit - 3) + '...';
};

/**
 * Simulates an agent response.
 * Returns normalized data (UI/store decide what to do with it).
 */
export const simulateAgentResponse = (userInput = '', context = {}) => {
  const { taskState, currentStep, providedData } = context;

  // 1️⃣ Partial task state
  if (taskState === 'partial') {
    return {
      text: clipText(
        'You are in a partial completion state. You may correct previous steps without restarting.'
      ),
      confidenceDelta: +0.02,
      requiresAction: true,
    };
  }

  // 2️⃣ User asked a question
  if (userInput.trim().endsWith('?')) {
    return {
      text: clipText(
        'I can help with that. Use the available UI buttons to clarify or confirm your choice.'
      ),
      confidenceDelta: -0.02,
      requiresAction: true,
    };
  }

  // 3️⃣ Missing required data
  if (currentStep?.requires && !providedData) {
    return {
      text: clipText(
        `This step requires ${currentStep.requires}. Please select one of the available options.`
      ),
      confidenceDelta: 0,
      requiresAction: true,
    };
  }

  // 4️⃣ Generic progress responses
  const fallbackResponses = [
    'Step recorded. Continue using the available buttons to move forward.',
    'Your input is saved. Choose the next action from the UI controls.',
    'Processing completed. Ready for the next step.',
    'Acknowledged. Let me know if you need corrections or more detail.',
    'Current step updated. Continue using buttons to stay within constraints.',
  ];

  const selected =
    fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];

  return {
    text: clipText(selected),
    confidenceDelta: -0.01,
    requiresAction: false,
  };
};

/**
 * Predefined UI-constrained action buttons
 */
export const generateActionButtons = () => [
  { id: 'confirm', label: 'Confirm', type: 'primary' },
  { id: 'reject', label: 'Reject', type: 'danger' },
  { id: 'pause', label: 'Pause', type: 'warning' },
  { id: 'info', label: 'More Info', type: 'info' },
  { id: 'skip', label: 'Skip Step', type: 'secondary' },
  { id: 'retry', label: 'Retry', type: 'secondary' },
];
