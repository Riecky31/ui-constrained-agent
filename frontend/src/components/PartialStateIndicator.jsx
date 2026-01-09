import React from "react";
import useAgentStore from "../store/agentStore";

const PartialStateIndicator = () => {
  const { taskState } = useAgentStore();

  const states = [
    { id: "idle", label: "Ready", icon: "🟢" },
    { id: "in_progress", label: "In Progress", icon: "🔄" },
    { id: "partial", label: "Partial", icon: "🟡" },
    { id: "complete", label: "Complete", icon: "✅" },
    { id: "error", label: "Error", icon: "❗" }
  ];

  const currentState =
    states.find((s) => s.id === taskState) ??
    { id: "idle", label: "Ready", icon: "🟢" };

  return (
    <div className="partial-state-container">
      <h3>Task State</h3>

      <div className="state-progress">
        {states.map((state) => {
          const isActive = currentState.id === state.id;
          return (
            <div
              key={state.id}
              className={`state-item ${isActive ? "active" : ""}`}
            >
              <div className="state-icon">{state.icon}</div>
              <div className="state-label">{state.label}</div>
              {isActive && <div className="state-indicator" />}
            </div>
          );
        })}
      </div>

      {currentState.id === "partial" && (
        <div className="partial-state-info">
          <div className="warning-icon">⚠️</div>
          <div className="warning-content">
            <strong>Partial Completion</strong>
            <p>You can correct inputs without restarting the task.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartialStateIndicator;
