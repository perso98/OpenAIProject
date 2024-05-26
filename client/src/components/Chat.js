import React, { useState, useRef, useEffect, useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { InputAdornment } from "@mui/material";
import { handleSubmit } from "../utils/api";
import { AuthContext } from "../providers/AuthProvider ";
import "../App.css";

function Chat() {

  // Stany
  const [chatHistory, setChatHistory] = useState([]);
  const [messageLoading, setMessageLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const chatHistoryRef = useRef(null); // Ref dla kontenera historii czatu
  const inputRef = useRef(null); // Ref dla pola tekstowego
  const { user } = useContext(AuthContext); // Pobranie użytkownika z kontekstu

  // Przewijanie do końca historii czatu po każdej aktualizacji
  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [chatHistory]);

  // Wywołanie funkcji handleSubmit z parametrami
  const handleOnSubmit = () => {
    handleSubmit(question, setQuestion, setChatHistory, setMessageLoading);
  };
  return (
    <>
      <div className="chat-container">
        <h1 style={{ textAlign: "center" }}>Chat</h1>
        <div className="question-answer-container" ref={chatHistoryRef}>
          {chatHistory.map((val, index) => {
            return (
              <React.Fragment key={index}>
                {val.You && (
                  <div className="question-you">
                    <div className="image-you">
                      {user ? user.login.charAt(0).toUpperCase() : "Y"}
                    </div>{" "}
                    <div className="text-you">{val.You}</div>
                  </div>
                )}
                {val.Bot && (
                  <div className="answer-bot ">
                    <div className="image-bot">B</div>{" "}
                    <div className="text-bot">{val.Bot}</div>
                  </div>
                )}
              </React.Fragment>
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
                  handleOnSubmit();
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
                      onClick={() => handleOnSubmit()}
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
