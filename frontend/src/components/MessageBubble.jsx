export default function MessageBubble({ msg }) {
  const isUser = msg.role === "user";

  return (
    <div className={`bubble ${isUser ? "user" : "assistant"}`}>
      {msg.text}
    </div>
  );
}
