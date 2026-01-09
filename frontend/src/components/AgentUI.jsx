import { useEffect } from "react";
import { useUIStore } from "../store/uiStore";
import { createSession, sendMessage } from "../api/api";
import ConfidenceBar from "./ConfidenceBar";
import PartialStateIndicator from "./PartialStateIndicator";
import ResponseBox from "./ResponseBox";

export default function AgentUI() {
  const {
    sessionId,
    userInput,
    agentResponse,
    confidence,
    taskState,
    setSessionId,
    setUserInput,
    setAgentResponse,
    setConfidence,
    setTaskState,
  } = useUIStore();

  useEffect(() => {
    const init = async () => {
      const id = await createSession();
      setSessionId(id);
    };
    init();
  }, []);

  const onSend = async () => {
    if (!userInput.trim()) return;

    const res = await sendMessage(sessionId, userInput);

    setAgentResponse(res.response);
    setConfidence(res.confidence);

    // backend will later set real task state
    setTaskState("in_progress");

    setUserInput("");
  };

  return (
    <div style={{ padding: 20, maxWidth: 500, margin: "auto" }}>
      <h2>Constrained Task Assistant</h2>

      <PartialStateIndicator state={taskState} />
      <ConfidenceBar value={confidence} />
      <ResponseBox text={agentResponse} />

      <div style={{ marginTop: 20 }}>
        <input
          style={{ width: "100%", padding: 10 }}
          placeholder="Type instruction…"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />

        <button
          style={{
            marginTop: 10,
            padding: 10,
            width: "100%",
            background: "black",
            color: "white",
          }}
          onClick={onSend}
        >
          Send
        </button>
      </div>
    </div>
  );
}