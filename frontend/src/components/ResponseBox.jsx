import React from 'react';
import useAgentStore from '../store/agentStore';

const ResponseBox = () => {
  const { agentResponses, responseLimit } = useAgentStore();
  const lastAgentResponse = agentResponses
    .filter(msg => !msg.text?.startsWith('User:'))
    .slice(-1)[0];

  if (!lastAgentResponse) {
    return (
      <div className="response-box empty">
        <div className="response-header">
          <span className="label">Agent Response (Constrained)</span>
          <span className="char-limit">Max {responseLimit} chars</span>
        </div>
        <div className="response-content">
          <p className="placeholder">Agent responses appear here</p>
          <div className="constraint-info">
            <span>⚠️ Responses limited to predefined UI components</span>
          </div>
        </div>
      </div>
    );
  }

  const isNearLimit = lastAgentResponse.charCount > responseLimit * 0.8;

  return (
    <div className="response-box">
      <div className="response-header">
        <span className="label">Agent Response</span>
        <span className={`char-count ${isNearLimit ? 'warning' : ''}`}>
          {lastAgentResponse.charCount}/{responseLimit} chars
        </span>
      </div>
      
      <div className="response-content">
        <p>{lastAgentResponse.text}</p>
        
        {/* Predefined UI components for agent responses */}
        <div className="response-actions">
          {lastAgentResponse.text.includes('time slots') && (
            <>
              <button className="action-btn primary">Monday 10 AM</button>
              <button className="action-btn primary">Wednesday 2 PM</button>
              <button className="action-btn primary">Friday 11 AM</button>
            </>
          )}
          
          {lastAgentResponse.text.includes('Confidence') && (
            <div className="confidence-display">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${parseInt(lastAgentResponse.text.match(/\d+/)?.[0] || 50)}%` }}
                />
              </div>
            </div>
          )}
          
          {lastAgentResponse.text.includes('complete') && (
            <div className="status-indicators">
              <span className="status-dot partial" />
              <span className="status-label">Partial Completion</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResponseBox;