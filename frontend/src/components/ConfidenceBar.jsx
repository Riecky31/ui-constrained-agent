import React from 'react';
import useAgentStore from '../store/agentStore';

const clamp = (value) => Math.max(0, Math.min(1, Number(value) || 0));

const ConfidenceBar = () => {
  const { confidence, uncertainty } = useAgentStore();

  const safeConfidence = clamp(confidence);
  const safeUncertainty = clamp(uncertainty);

  const confidencePct = Math.round(safeConfidence * 100);
  const uncertaintyPct = Math.round(safeUncertainty * 100);

  const level =
    safeConfidence > 0.7
      ? 'high'
      : safeConfidence > 0.4
      ? 'medium'
      : 'low';

  return (
    <div className="confidence-display">
      <div className="confidence-header">
        <h3>Agent Confidence</h3>

        <div className="confidence-values">
          <span className="confidence-value">
            Confidence: {confidencePct}%
          </span>
          <span className="uncertainty-value">
            Uncertainty: {uncertaintyPct}%
          </span>
        </div>
      </div>

      <div className="confidence-visual">
        <div className="bar-container">
          <div
            className="confidence-bar"
            style={{ width: `${confidencePct}%` }}
            title={`${confidencePct}% confidence`}
          />
          <div
            className="uncertainty-bar"
            style={{ width: `${uncertaintyPct}%` }}
            title={`${uncertaintyPct}% uncertainty`}
          />
        </div>

        <div className="confidence-labels">
          <span className="label-low">Low</span>
          <span className="label-medium">Medium</span>
          <span className="label-high">High</span>
        </div>
      </div>

      <div className={`confidence-indicator ${level}`}>
        {level === 'high' && (
          <>
            <span className="indicator-icon">✓</span>
            High confidence — Agent is certain
          </>
        )}

        {level === 'medium' && (
          <>
            <span className="indicator-icon">⚠</span>
            Moderate confidence — May need verification
          </>
        )}

        {level === 'low' && (
          <>
            <span className="indicator-icon">❓</span>
            Low confidence — Consider correction
          </>
        )}
      </div>
    </div>
  );
};

export default ConfidenceBar;
