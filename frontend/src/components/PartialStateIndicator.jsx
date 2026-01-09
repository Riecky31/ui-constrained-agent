import React from 'react';
import useAgentStore from '../store/agentStore';

const PartialStateIndicator = () => {
  const { taskState } = useAgentStore();
  
  const states = [
    { id: 'idle', label: 'Ready' },
    { id: 'in_progress', label: 'In Progress' },
    { id: 'partial', label: 'Partial' },
    { id: 'complete', label: 'Complete' },
    { id: 'error', label: 'Error' }
  ];
  
  return (
    <div className="partial-state-container">
      <h3>Task State</h3>
      <div className="state-progress">
        {states.map((state) => (
          <div 
            key={state.id} 
            className={`state-item ${taskState === state.id ? 'active' : ''} ${taskState === 'partial' && state.id === 'partial' ? 'highlight' : ''}`}
          >
            <div className="state-icon">{state.icon}</div>
            <div className="state-label">{state.label}</div>
            {taskState === state.id && (
              <div className="state-indicator"></div>
            )}
          </div>
        ))}
      </div>
      
      {taskState === 'partial' && (
        <div className="partial-state-info">
          <div className="warning-icon">⚠️</div>
          <div className="warning-content">
            <strong>Partial Completion State</strong>
            <p>Task is partially complete. You can apply corrections without restarting.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartialStateIndicator;