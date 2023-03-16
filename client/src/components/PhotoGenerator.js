import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { InputAdornment } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { generatePhoto, savePicture } from "../utils/api";
import "../App.css";
function PhotoGenerator() {
  const [text, setText] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [firstLoadedImage, setFirstLoadedImage] = useState(false);
  const [sendPicture, setSendPicture] = useState(true);
  const handleSubmit = async () => {
    generatePhoto(setLoading, setFirstLoadedImage, text, setPhotoUrl);
  };
  const handleSavePicture = async () => {
    savePicture(text, photoUrl);
  };
  return (
    <div className="generator-container">
      <h1 style={{ textAlign: "center" }}>Picture Generator</h1>
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
                  onClick={() => {
                    handleSubmit();
                    setSendPicture(true);
                  }}
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
            {sendPicture ? (
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  handleSavePicture();
                  setSendPicture(false);
                }}
              >
                Save
              </Button>
            ) : (
              <Button variant="contained" color="success" disabled={true}>
                Save
              </Button>
            )}
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
