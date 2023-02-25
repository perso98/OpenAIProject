import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { InputAdornment } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import "../App.css";
function PhotoGenerator() {
  const [text, setText] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [firstLoadedImage, setFirstLoadedImage] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    setFirstLoadedImage(true);
    axios
      .post("http://localhost:3001/generatePhoto", {
        text: text,
      })

      .then((res) => {
        setPhotoUrl(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  return (
    <div className="generator-container">
      <div className="textfield-generator">
        <TextField
          style={{ width: "100%" }}
          label="Message"
          className="chat-input"
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(event) => {
            if (event.keyCode === 13) {
              handleSubmit();
            }
          }}
          inputProps={{ maxLength: 70 }}
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
      {firstLoadedImage ? (
        !loading ? (
          <>
            <div className="photo-generated">
              <img src={photoUrl} />
            </div>
            <Button variant="contained" color="success">
              Save
            </Button>
          </>
        ) : (
          <div className="generator-progress">
            <CircularProgress color="success" />
          </div>
        )
      ) : null}
    </div>
  );
}

export default PhotoGenerator;
