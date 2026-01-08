import { create } from "zustand";

export const useUIStore = create((set) => ({
  sessionId: null,
  userInput: "",
  agentResponse: "",
  confidence: 1,
  taskState: "idle",

  setSessionId: (id) => set({ sessionId: id }),
  setUserInput: (text) => set({ userInput: text }),
  setAgentResponse: (resp) => set({ agentResponse: resp }),
  setConfidence: (c) => set({ confidence: c }),
  setTaskState: (s) => set({ taskState: s }),
}));
