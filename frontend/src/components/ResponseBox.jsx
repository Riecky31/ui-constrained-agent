export default function ResponseBox({ text }) {
  if (!text) return null;

  return (
    <div
      style={{
        marginTop: 20,
        background: "#f7f7f7",
        padding: 10,
        borderRadius: 6,
        fontSize: 14,
        border: "1px solid #ddd",
      }}
    >
      {text}
    </div>
  );
}
