import React from "react";
import useAgentStore from "../store/agentStore";

const clip120 = (t) => t.substring(0, 120);

const ActionButtons = () => {
  const { addAgentResponse, updateConfidence, updateTaskState } = useAgentStore();

  const sendAgentMessage = (text) => {
    const clipped = clip120(text);

    addAgentResponse({
      role: "agent",
      text: clipped,
      timestamp: Date.now(),
      charCount: clipped.length
    });
  };

  const predefinedActions = [
    {
      label: "✅ Confirm",
      action: () => {
        sendAgentMessage("Confirmed. Proceeding to the next step.");
        updateConfidence(0.9);
      }
    },
    {
      label: "❌ Reject",
      action: () => {
        sendAgentMessage("Rejected option. Showing alternatives.");
        updateConfidence(0.6);
      }
    },
    {
      label: "⏸️ Pause",
      action: () => {
        sendAgentMessage("Task paused. State preserved.");
        updateTaskState("partial");
      }
    },
    {
      label: "🔍 More Info",
      action: () => {
        sendAgentMessage("Providing details within constraints.");
      }
    },
    {
      label: "⏭️ Skip Step",
      action: () => {
        sendAgentMessage("Skipping step. Continuing task.");
        updateConfidence(0.7);
      }
    }
  ];

  return (
    <div className="action-buttons-container">
      <h3>Predefined Actions</h3>
      <p className="subtitle">Agent can only trigger these UI components</p>

      <div className="action-grid">
        {predefinedActions.map((btn, i) => (
          <button key={i} className="action-button" onClick={btn.action}>
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ActionButtons;
