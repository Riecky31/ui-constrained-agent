export default function PartialStateIndicator({ state }) {
  const colorMap = {
    idle: "gray",
    in_progress: "blue",
    waiting_user: "orange",
    done: "green",
  };

  return (
    <div style={{ marginTop: 10, color: colorMap[state] }}>
      Task status: <strong>{state}</strong>
    </div>
  );
}
