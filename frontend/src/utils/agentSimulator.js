// Mock AI agent that respects constraints
export const simulateAgentResponse = (userInput, context) => {
  // Predefined responses that fit within 120 chars
  const responses = [
    "I understand. Let me check available options within constraints.",
    "Processing request. Please choose from the buttons below.",
    "Task partially complete. Need additional information to proceed.",
    "Confidence: 85% this matches requirements. Please confirm.",
    "Found 3 matching options. Which works best for you?",
    "Sending confirmation now. Next step: review details.",
    "Request received. Working within UI constraints...",
    "Need clarification. Use buttons below to specify.",
    "Step completed. Moving to next phase of task.",
    "Error detected. Please use correction feature to fix."
  ];

  // Select response based on context
  let response;
  if (context.taskState === 'partial') {
    response = "Partial state detected. You can correct without restarting.";
  } else if (userInput.includes('?')) {
    response = "Answering your question within character limits...";
  } else {
    response = responses[Math.floor(Math.random() * responses.length)];
  }

  // Ensure response is exactly 120 chars or less
  if (response.length > 120) {
    response = response.substring(0, 117) + '...';
  }

  // Calculate simulated confidence
  const confidence = 0.7 + Math.random() * 0.2; // 70-90%
  
  return {
    text: response,
    confidence: confidence,
    requiresAction: Math.random() > 0.5
  };
};

export const generateActionButtons = () => {
  return [
    { id: 'confirm', label: ' Confirm', type: 'primary' },
    { id: 'reject', label: ' Reject', type: 'danger' },
    { id: 'pause', label: ' Pause', type: 'warning' },
    { id: 'info', label: ' More Info', type: 'info' },
    { id: 'skip', label: ' Skip Step', type: 'secondary' },
    { id: 'retry', label: ' Retry', type: 'secondary' }
  ];
};