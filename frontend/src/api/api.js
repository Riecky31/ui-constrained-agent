import axios from "axios";

const API_URL = "http://localhost:3001";

export const createSession = async () => {
  const res = await axios.post(`${API_URL}/session`);
  return res.data.sessionId;
};

export const sendMessage = async (sessionId, text) => {
  const res = await axios.post(`${API_URL}/message`, {
    sessionId,
    userMessage: text,
  });
  return res.data;
};
