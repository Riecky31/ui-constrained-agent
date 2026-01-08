import useAgentStore from "../store/agentStore";

export default function ConfidenceBar() {
  const confidence = useAgentStore((state) => state.confidence);

  return (
    <div className="confidence-bar">
      <label>Confidence: {Math.round(confidence * 100)}%</label>
      <div className="bar">
        <div className="fill" style={{ width: `${confidence * 100}%` }}></div>
      </div>
    </div>
  );
}
