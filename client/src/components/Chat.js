import React, { useState, useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { InputAdornment } from "@mui/material";
import axios from "axios";
import "../App.css";

function Chat() {
  const [chatHistory, setChatHistory] = useState([]);
  const [messageLoading, setMessageLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const chatHistoryRef = useRef(null);
  const inputRef = useRef(null);
  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [chatHistory]);

  const handleSubmit = async () => {
    setQuestion("");
    setMessageLoading(true);
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
        setMessageLoading(false);
      })
      .catch((error) => {
        setChatHistory((prevHistory) => {
          const latestQuestion = prevHistory[prevHistory.length - 1].You;
          const updatedHistory = prevHistory.slice(0, -1);

          return [...updatedHistory, { You: latestQuestion, Bot: error }];
        });
        setMessageLoading(false);
      });
  };
  return (
    <>
      <div className="chat-container">
        <div className="question-answer-container" ref={chatHistoryRef}>
          {chatHistory.map((val) => {
            return (
              <>
                {val.You && (
                  <div className="question-you">
                    <div className="image-you">M</div>{" "}
                    <div className="text-you">{val.You}</div>
                  </div>
                )}
                {val.Bot && (
                  <div className="answer-bot ">
                    <div className="image-bot">B</div>{" "}
                    <div className="text-bot">{val.Bot}</div>
                  </div>
                )}
              </>
            );
          })}
        </div>
        {!messageLoading ? (
          <div className="textfield-container">
            <TextField
              label="Message"
              className="chat-input"
              multiline
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(event) => {
                if (event.keyCode === 13) {
                  handleSubmit();
                }
              }}
              inputRef={inputRef}
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
        ) : (
          <div className="textfield-container">
            <TextField
              label="Message"
              className="chat-input"
              multiline
              value={question}
              disabled={true}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      variant="contained"
                      color="success"
                      className="chat-send-btn"
                      startIcon={<SendIcon />}
                      disabled={true}
                    >
                      Send
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Chat;
