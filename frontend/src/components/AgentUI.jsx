import React, { useState, useEffect, useRef } from "react";
import useAgentStore from "../store/agentStore";
import useTaskStore from "../store/taskStore";

import ConfidenceBar from "./ConfidenceBar";
import PartialStateIndicator from "./PartialStateIndicator";
import ActionButtons from "./ActionButtons";
import ResponseBox from "./ResponseBox";

import { taskTemplates } from "../tasks/taskTemplates";
import { simulateAgentResponse } from "../utils/agentSimulator";

import "../styles.css";

/* Utility */
const clip120 = (t) => t.substring(0, 120);

const AgentUI = () => {
  /* Stores */
  const {
    agentResponses,
    taskState,
    confidence,
    addAgentResponse,
    updateTaskState,
    updateConfidence,
    applyCorrection,
    resetTask: resetAgentStore
  } = useAgentStore();

  const {
    selectTask,
    completeStep,
    getProgress,
    resetTask: resetTaskStateStore,
    currentTask
  } = useTaskStore();

  /* Local UI State */
  const [userInput, setUserInput] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const messagesEnd = useRef(null);

  /* Auto-scroll */
  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [agentResponses]);

  /* Combined reset */
  const resetAll = () => {
    resetAgentStore();
    resetTaskStateStore();
    setSelectedTaskId(null);
  };

  /* Select Task */
  const handleTaskSelect = (task) => {
    setSelectedTaskId(task.id);
    selectTask(task);
    updateTaskState("in_progress");

    const welcome = clip120(
      `Starting "${task.name}". ${task.description} ${task.steps.length} steps total.`
    );

    addAgentResponse({
      role: "agent",
      text: welcome,
      timestamp: Date.now(),
      charCount: welcome.length
    });
  };

  /* Add User + Agent Messages */
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    /* Add user message */
    const userMsg = {
      role: "user",
      text: clip120(userInput),
      timestamp: Date.now(),
      charCount: userInput.length
    };
    addAgentResponse(userMsg);

    /* Simulate agent */
    setTimeout(() => {
      const context = { taskState, confidence, task: currentTask };
      const agentRaw = simulateAgentResponse(userInput, context) || {
        text: "I couldn't process that.",
        confidence: 0.3
      };

      const agentText = clip120(agentRaw.text);

      addAgentResponse({
        role: "agent",
        text: agentText,
        timestamp: Date.now(),
        charCount: agentText.length
      });

      updateConfidence(agentRaw.confidence || 0.5);

      /* Random partial state trigger (demo behavior) */
      if (agentText.includes("partial") || Math.random() > 0.7) {
        updateTaskState("partial");
      }
    }, 600);

    setUserInput("");
  };

  /* Quick Actions */
  const handleQuickAction = (action) => {
    const dict = {
      confirm: {
        user: "Confirmed.",
        agent: "OK — moving forward."
      },
      reject: {
        user: "Rejected.",
        agent: "Understood — adjusting."
      },
      pause: {
        user: "Paused.",
        agent: "Task paused. State saved."
      },
      info: {
        user: "More info?",
        agent: "Here are the details."
      },
      skip: {
        user: "Skipped.",
        agent: "Skipping — continuing."
      }
    };

    const userText = clip120(dict[action].user);
    const agentText = clip120(dict[action].agent);

    addAgentResponse({
      role: "user",
      text: userText,
      timestamp: Date.now(),
      charCount: userText.length
    });

    setTimeout(() => {
      addAgentResponse({
        role: "agent",
        text: agentText,
        timestamp: Date.now(),
        charCount: agentText.length
      });
    }, 400);
  };

  const selectedTask = taskTemplates.find((t) => t.id === selectedTaskId);

  return (
    <div className="agent-container">
      {/* Header */}
      <header className="agent-header">
        <div className="header-left">
          <h1>🤖 UI-Constrained Agent</h1>
          <p className="subtitle">Task assistant • 120-char responses • UI-only actions</p>
        </div>

        <div className="header-right">
          <div className="constraint-badges">
            <span className="badge">120-char limit</span>
            <span className="badge">UI constrained</span>
            <span className="badge">Partial states</span>
          </div>
        </div>
      </header>

      <div className="agent-main">
        {/* LEFT PANEL */}
        <div className="left-panel">
          <section className="task-section">
            <h2>📋 Tasks</h2>
            <div className="task-grid">
              {taskTemplates.map((task) => (
                <div
                  key={task.id}
                  className={`task-card ${
                    selectedTaskId === task.id ? "selected" : ""
                  }`}
                  onClick={() => handleTaskSelect(task)}
                  disabled={taskState !== "idle"}
                >
                  <h3>{task.name}</h3>
                  <p className="task-desc">{task.description}</p>

                  <div className="task-meta">
                    <span>{task.steps.length} steps</span>
                    <span>{task.estimatedTime}</span>
                  </div>

                  <div className="task-tags">
                    {task.constraints.map((c, i) => (
                      <span key={i} className="tag">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="progress-section">
            <PartialStateIndicator />
          </section>

          <section className="correction-section">
            <h2>🔄 Corrections</h2>
            <button
              className="correction-btn"
              disabled={!selectedTaskId}
              onClick={() => {
                const correction = prompt("Enter correction:");
                if (correction) {
                  applyCorrection(correction);
                  const clipped = clip120(correction);

                  addAgentResponse({
                    role: "agent",
                    text: `Applied correction: ${clipped}`,
                    timestamp: Date.now(),
                    charCount: clipped.length
                  });

                  updateConfidence(Math.max(0, confidence - 0.1));
                }
              }}
            >
              Apply Correction
            </button>
          </section>
        </div>

        {/* MIDDLE PANEL */}
        <div className="middle-panel">
          <section className="conversation-section">
            <div className="conversation-header">
              <h2>💬 Conversation</h2>
              <span>Messages: {agentResponses.length}</span>
              <span className={`state-${taskState || "idle"}`}>
                {String(taskState || "idle").replace("_", " ")}
              </span>
            </div>

            <div className="messages">
              {agentResponses.map((msg, i) => (
                <div key={i} className={`message ${msg.role}`}>
                  <div className="message-header">
                    <span className="message-sender">
                      {msg.role === "user" ? "👤 You" : "🤖 Agent"}
                    </span>
                    <span className="message-time">
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </span>
                  </div>

                  <div className="message-content">{msg.text}</div>

                  {msg.role === "agent" && (
                    <div className="message-footer">
                      <span
                        className={`char-count ${
                          msg.charCount > 100 ? "warning" : ""
                        }`}
                      >
                        {msg.charCount}/120
                      </span>
                      <div className="char-bar">
                        <div
                          className="char-fill"
                          style={{
                            width: `${(msg.charCount / 120) * 100}%`
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <div ref={messagesEnd}></div>
            </div>
          </section>

          <section className="response-section">
            <ResponseBox />
          </section>

          <section className="actions-section">
            <ActionButtons />
          </section>

          <section className="confidence-section">
            <ConfidenceBar />
          </section>

          <section className="input-section">
            <form onSubmit={handleSendMessage} className="input-form">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                maxLength={100}
                placeholder="Type..."
                className="message-input"
                disabled={!selectedTaskId}
              />

              <button
                type="submit"
                className="send-btn"
                disabled={!selectedTaskId || !userInput.trim()}
              >
                Send
              </button>

              <div className="quick-actions">
                {["confirm", "reject", "pause", "info", "skip"].map((action) => (
                  <button
                    key={action}
                    type="button"
                    className="quick-btn"
                    disabled={!selectedTaskId}
                    onClick={() => handleQuickAction(action)}
                  >
                    {action}
                  </button>
                ))}
              </div>
            </form>
          </section>
        </div>

        {/* RIGHT PANEL */}
        <div className="right-panel">
          <section className="status-section">
            <h2>📊 Status</h2>

            <div className="status-grid">
              <div>
                <strong>Current Task:</strong> {selectedTask?.name || "None"}
              </div>
              <div>
                <strong>Task State:</strong>{" "}
                {String(taskState || "idle").replace("_", " ")}
              </div>
              <div>
                <strong>Progress:</strong> {getProgress().toFixed(0)}%
              </div>
              <div>
                <strong>Confidence:</strong>{" "}
                {(confidence * 100).toFixed(0)}%
              </div>
            </div>
          </section>

          <section className="reset-section">
            <button
              className="reset-btn"
              disabled={!selectedTaskId}
              onClick={resetAll}
            >
              🔄 Reset Task
            </button>
          </section>

          <section className="constraints-section">
            <h3>🎯 Constraints</h3>
            <ul>
              <li>Max 120 chars</li>
              <li>UI-only responses</li>
              <li>Partial state</li>
              <li>Corrections allowed</li>
              <li>Confidence visible</li>
              <li>No raw HTML</li>
            </ul>
          </section>
        </div>
      </div>

      <footer className="agent-footer">
        UI-Constrained Agent Assessment • Demonstrates a structured,
        safe, bounded agent interaction model.
      </footer>
    </div>
  );
};

export default AgentUI;
