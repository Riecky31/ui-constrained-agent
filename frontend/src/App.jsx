import React from "react";
import MessageBubble from "./components/MessageBubble.jsx";
import InputBar from "./components/InputBar.jsx";
import ConfidenceBar from "./components/ConfidenceBar.jsx";
import "./App.css";
import "./styles.css";

export default function App() {
  return (
    <div className="app-container">
      <h1>UI-Constrained Agent</h1>

      {/* Message area */}
      <div className="message-area">
        <MessageBubble msg={{ role: "assistant", text: "Hello! I am ready." }} />
        <MessageBubble msg={{ role: "user", text: "Hi!" }} />
      </div>

      {/* Input */}
      <InputBar />

      {/* Confidence */}
      <ConfidenceBar />
    </div>
  );
}
