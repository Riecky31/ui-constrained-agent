export default function ConfidenceBar({ value }) {
  const percent = Math.round(value * 100);

  return (
    <div style={{ marginTop: 10 }}>
      <div style={{ fontSize: 12 }}>Agent confidence: {percent}%</div>
      <div
        style={{
          height: 6,
          background: "#eee",
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${percent}%`,
            height: "100%",
            background: percent > 70 ? "green" : percent > 40 ? "orange" : "red",
            transition: "width 0.3s",
          }}
        ></div>
      </div>
    </div>
  );
}
