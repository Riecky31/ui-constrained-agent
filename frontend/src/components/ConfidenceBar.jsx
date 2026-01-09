import React from 'react';
import useAgentStore from '../store/agentStore';

const ConfidenceBar = () => {
  const { confidence, uncertainty } = useAgentStore();
  
  return (
    <div className="confidence-display">
      <div className="confidence-header">
        <h3> Agent Confidence</h3>
        <div className="confidence-values">
          <span className="confidence-value">Confidence: {(confidence * 100).toFixed(0)}%</span>
          <span className="uncertainty-value">Uncertainty: {(uncertainty * 100).toFixed(0)}%</span>
        </div>
      </div>
      
      <div className="confidence-visual">
        <div className="bar-container">
          <div 
            className="confidence-bar" 
            style={{ width: `${confidence * 100}%` }}
            title={`${(confidence * 100).toFixed(0)}% confidence`}
          />
          <div 
            className="uncertainty-bar" 
            style={{ width: `${uncertainty * 100}%` }}
            title={`${(uncertainty * 100).toFixed(0)}% uncertainty`}
          />
        </div>
        
        <div className="confidence-labels">
          <span className="label-low">Low</span>
          <span className="label-medium">Medium</span>
          <span className="label-high">High</span>
        </div>
      </div>
      
      <div className={`confidence-indicator ${confidence > 0.7 ? 'high' : confidence > 0.4 ? 'medium' : 'low'}`}>
        {confidence > 0.7 && (
          <>
            <span className="indicator-icon">✓</span>
            High confidence - Agent is certain
          </>
        )}
        {confidence > 0.4 && confidence <= 0.7 && (
          <>
            <span className="indicator-icon">⚠</span>
            Moderate confidence - May need verification
          </>
        )}
        {confidence <= 0.4 && (
          <>
            <span className="indicator-icon">❓</span>
            Low confidence - Consider correction
          </>
        )}
      </div>
    </div>
  );
};

export default ConfidenceBar;