const express = require("express");
const cors = require("cors");
const { v4: uuid } = require("uuid");

const app = express();
app.use(cors());
app.use(express.json());

const sessions = {};

// Helper: limit  to 120 chars
const limit = (text) => text.slice(0, 120);

// State machine for the task
function nextAgentStep(session, userMessage) {
  const msg = userMessage.trim().toLowerCase();
  let response = "";
  let confidence = 1;

  // Switch on agent state
  switch (session.taskState) {
    case "idle":
      session.taskState = "collect_name";
      response = "Let's start. What's your name?";
      break;

    case "collect_name":
      if (!msg) {
        response = "I didn’t get that. Please enter your name.";
        confidence = 0.5;
        break;
      }
      session.data.name = userMessage;
      session.taskState = "collect_email";
      response = `Got it, ${userMessage}. What's your email?`;
      break;

    case "collect_email":
      if (!msg.includes("@")) {
        response = "Email looks incorrect. Fix it or enter a new one.";
        session.taskState = "waiting_correction_email";
        confidence = 0.4;
        break;
      }
      session.data.email = userMessage;
      session.taskState = "collect_goal";
      response = "Thanks. What's your goal for today?";
      break;

    case "waiting_correction_email":
      if (!msg.includes("@")) {
        response = "Still invalid. Try again.";
        confidence = 0.3;
      } else {
        session.data.email = userMessage;
        session.taskState = "collect_goal";
        response = "Email updated. What's your goal today?";
        confidence = 0.7;
      }
      break;

    case "collect_goal":
      session.data.goal = userMessage;
      session.taskState = "confirm";
      response = `Confirm: name=${session.data.name}, email=${session.data.email}, goal=${session.data.goal}?`;
      break;

    case "confirm":
      if (msg === "yes") {
        session.taskState = "done";
        response = "Great! Task completed.";
      } else if (msg === "no") {
        session.taskState = "collect_name";
        response = "Okay, let's restart. What's your name?";
      } else {
        response = "Type 'yes' to finish or 'no' to restart.";
        confidence = 0.6;
      }
      break;

    case "done":
      response = "You're all set! If you need something else, start again.";
      confidence = 0.9;
      break;

    default:
      response = "Error occurred. Resetting.";
      session.taskState = "collect_name";
      confidence = 0.2;
  }

  return { response: limit(response), confidence };
}

app.post("/session", (req, res) => {
  const id = uuid();
  sessions[id] = {
    taskState: "idle",
    data: {},
    history: [],
  };
  res.json({ sessionId: id });
});

// Handle messages
app.post("/message", (req, res) => {
  const { sessionId, userMessage } = req.body;
  const session = sessions[sessionId];

  if (!session) {
    return res.status(404).json({ error: "Invalid session" });
  }

  const agent = nextAgentStep(session, userMessage);
  session.history.push({ userMessage, agentResponse: agent.response });

  res.json({
  response: agent.response,
  confidence: agent.confidence,
  taskState: session.taskState
});

});

const port = 3001;
app.listen(port, () => console.log("Backend running on port " + port));
