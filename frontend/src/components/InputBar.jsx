import React, { useState } from "react";
import useAgentStore from "../store/agentStore";

export default function InputBar() {
  const [text, setText] = useState("");
  const sendMessage = useAgentStore((state) => state.sendMessage);

  return (
    <div className="input-bar">
      <input
        value={text}
        maxLength={120}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type here…"
      />
      <button onClick={() => {
        sendMessage(text);
        setText("");
      }}>
        Send
      </button>
    </div>
  );
}
