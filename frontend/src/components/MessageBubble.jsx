// src/components/MessageBubble.jsx
export default function MessageBubble({ msg }) {
  const isUser = msg.role === "user";

  return (
    <div className={`message ${msg.role}`}>
      {/* Header */}
      <div className="message-header">
        <span className="message-sender">{isUser ? "👤 You" : "🤖 Agent"}</span>
        <span className="message-time">
          {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>

      {/* Content */}
      <div className="message-content">
        {typeof msg.text === "string" ? msg.text : JSON.stringify(msg.text)}
      </div>

      {/* Footer only for agent */}
      {!isUser && (
        <div className="message-footer">
          <span className={`char-count ${msg.charCount > 100 ? "warning" : ""}`}>
            {msg.charCount}/120
          </span>
          <div className="char-bar">
            <div className="char-fill" style={{ width: `${(msg.charCount / 120) * 100}%` }} />
          </div>
        </div>
      )}
    </div>
  );
}
