import React, { useState } from 'react';
import useAgentStore from '../store/agentStore';
import MessageBubble from './MessageBubble';
import InputBar from './InputBar';
import ConfidenceBar from './ConfidenceBar';
import PartialStateIndicator from './PartialStateIndicator';
import ResponseBox from './ResponseBox';
import ActionButtons from './ActionButtons';
import '../styles.css';

const AgentUI = () => {
  const {
    agentResponses,
    taskState,
    confidence,
    currentTask,
    addAgentResponse,
    updateTaskState,
    applyCorrection,
    resetTask
  } = useAgentStore();
  
  const [userInput, setUserInput] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);

  // Mock tasks
  const availableTasks = [
    { id: 1, name: 'Schedule Meeting', steps: 3 },
    { id: 2, name: 'Create Report', steps: 4 },
    { id: 3, name: 'Book Travel', steps: 5 }
  ];

  const handleTaskSelect = (task) => {
    setSelectedTask(task);
    updateTaskState('in_progress');
    addAgentResponse(`Starting task: ${task.name}. I'll guide you through ${task.steps} steps.`);
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    
    // Add user message
    addAgentResponse(`User: ${userInput}`);
    
    // Simulate agent response (in real app, this would be API call)
    setTimeout(() => {
      const mockResponses = [
        "I understand. Let me check the calendar.",
        "Found 3 time slots. Which works best?",
        "Great! I'll send invites now.",
        "Task partially complete. Need recipient emails.",
        "Confidence: 85% this works for everyone."
      ];
      const response = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      addAgentResponse(response);
      
      // Randomly change state to show partial completion
      if (Math.random() > 0.5) {
        updateTaskState('partial');
      }
    }, 500);
    
    setUserInput('');
  };

  const handleCorrection = () => {
    const correction = prompt('What needs correction?');
    if (correction) {
      applyCorrection(correction);
      addAgentResponse(`Applying correction: "${correction}"`);
    }
  };

  return (
    <div className="agent-container">
      <header className="agent-header">
        <h1>UI-Constrained Agent</h1>
        <p className="subtitle">Task-focused assistant with constrained responses</p>
      </header>

      <div className="agent-layout">
        {/* Left Panel: Task Selection */}
        <div className="left-panel">
          <h2>Select Task</h2>
          <div className="task-buttons">
            {availableTasks.map(task => (
              <button
                key={task.id}
                className={`task-btn ${selectedTask?.id === task.id ? 'active' : ''}`}
                onClick={() => handleTaskSelect(task)}
              >
                {task.name}
                <span className="step-count">{task.steps} steps</span>
              </button>
            ))}
          </div>
          
          <PartialStateIndicator />
          
          <div className="correction-section">
            <h3>Need Correction?</h3>
            <button 
              className="correction-btn"
              onClick={handleCorrection}
              disabled={taskState === 'idle'}
            >
              Apply Correction
            </button>
            <p className="help-text">Correct without restarting task</p>
          </div>
        </div>

        {/* Main Panel: Conversation */}
        <div className="main-panel">
          <div className="conversation-container">
            {agentResponses.map((msg, index) => (
              <MessageBubble
                key={index}
                message={msg.text}
                isAgent={!msg.text.startsWith('User:')}
                timestamp={msg.timestamp}
                charCount={msg.charCount}
              />
            ))}
            
            {taskState === 'idle' && (
              <div className="welcome-message">
                <h3>Welcome to UI-Constrained Agent</h3>
                <p>Select a task to begin. Agent responses are limited to 120 characters and rendered through predefined UI components only.</p>
              </div>
            )}
          </div>

          {/* Response Box (Constrained Agent Output) */}
          <ResponseBox />
          
          {/* Confidence Display */}
          <ConfidenceBar />
          
          {/* Action Buttons */}
          <ActionButtons />
          
          {/* User Input */}
          <InputBar
            value={userInput}
            onChange={setUserInput}
            onSubmit={handleUserSubmit}
            disabled={taskState === 'idle'}
            maxLength={50}
          />
        </div>

        {/* Right Panel: Status */}
        <div className="right-panel">
          <div className="status-card">
            <h3>Agent Status</h3>
            <div className="status-item">
              <span className="status-label">Task State:</span>
              <span className={`status-value state-${taskState}`}>
                {taskState.replace('_', ' ')}
              </span>
            </div>
            <div className="status-item">
              <span className="status-label">Current Task:</span>
              <span className="status-value">
                {currentTask?.name || 'None'}
              </span>
            </div>
            <div className="status-item">
              <span className="status-label">Response Limit:</span>
              <span className="status-value">120 characters</span>
            </div>
            <div className="status-item">
              <span className="status-label">Messages:</span>
              <span className="status-value">{agentResponses.length}</span>
            </div>
          </div>
          
          <button className="reset-btn" onClick={resetTask}>
            Reset Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentUI;