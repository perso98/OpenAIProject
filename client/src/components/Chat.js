import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { InputAdornment } from "@mui/material";
import axios from "axios";
import "../App.css";

function Chat() {
  const [chatHistory, setChatHistory] = useState([]);

  const [question, setQuestion] = useState("");

  const handleSubmit = async () => {
    setQuestion("");
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { You: question, Bot: "writting..." },
    ]);
    axios
      .post("http://localhost:3001/getAnswer", {
        question: question,
      })

      .then((res) => {
        setChatHistory((prevHistory) => {
          const latestQuestion = prevHistory[prevHistory.length - 1].You;
          const updatedHistory = prevHistory.slice(0, -1);
          return [...updatedHistory, { You: latestQuestion, Bot: res.data }];
        });
      })
      .catch((error) => {
        setChatHistory((prevHistory) => {
          const latestQuestion = prevHistory[prevHistory.length - 1].You;
          const updatedHistory = prevHistory.slice(0, -1);
          return [...updatedHistory, { You: latestQuestion, Bot: error }];
        });
      });
  };
  return (
    <>
      <div className="chat-container">
        <div className="question-answer-container">
          {chatHistory.map((val) => {
            return (
              <>
                {val.You && <div className="question-you">You: {val.You}</div>}
                {val.Bot && <div className="answer-bot ">Bot: {val.Bot}</div>}
              </>
            );
          })}
        </div>
        <div className="textfield-container">
          <TextField
            label="Message"
            className="chat-input"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(event) => {
              if (event.keyCode === 13) {
                handleSubmit();
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    variant="contained"
                    color="success"
                    className="chat-send-btn"
                    startIcon={<SendIcon />}
                    onClick={() => handleSubmit()}
                  >
                    Send
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Chat;
