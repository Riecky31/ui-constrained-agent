const express = require("express");
const cors = require("cors");
const { v4: uuid } = require("uuid");

const app = express();
app.use(cors());
app.use(express.json());

const sessions = {};

app.post("/session", (req, res) => {
  const id = uuid();
  sessions[id] = {
    taskState: "idle",
    history: [],
    confidence: 1.0
  };
  res.json({ sessionId: id });
});

app.post("/message", (req, res) => {
  const { sessionId, userMessage } = req.body;
  const session = sessions[sessionId];

  if (!session) {
    return res.status(404).json({ error: "Invalid session" });
  }

  const agentResponse = "Working on it...";
  const confidence = 0.8;

  session.history.push({ userMessage, agentResponse });

  res.json({ 
    response: agentResponse.slice(0, 120),
    confidence
  });
});

const port = 3001;
app.listen(port, () => console.log("Backend running on port " + port));
