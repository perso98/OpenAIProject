import axios from "axios";
const API_URL = "http://localhost:3001";
//funkcja pobierająca odpowiedzi bota i updatejtująca czat
export const handleSubmit = async (
  question,
  setQuestion,
  setChatHistory,
  setMessageLoading
) => {
  setQuestion("");
  setMessageLoading(true);
  setChatHistory((prevHistory) => [
    ...prevHistory,
    { You: question, Bot: "writting..." },
  ]);
  try {
    const response = await axios.post(`${API_URL}/getAnswer`, {
      question: question,
    });
    const botAnswer = response.data;
    setChatHistory((prevHistory) => {
      const latestQuestion = prevHistory[prevHistory.length - 1].You;
      const updatedHistory = prevHistory.slice(0, -1);
      return [...updatedHistory, { You: latestQuestion, Bot: botAnswer }];
    });
  } catch (error) {
    setChatHistory((prevHistory) => {
      const latestQuestion = prevHistory[prevHistory.length - 1].You;
      const updatedHistory = prevHistory.slice(0, -1);
      return [...updatedHistory, { You: latestQuestion, Bot: error }];
    });
  }
  setMessageLoading(false);
};
