import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { InputAdornment } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { generatePhoto, savePicture } from "../utils/api";
import "../App.css";
function PhotoGenerator() {
  const [text, setText] = useState(""); // Stan dla tekstu wprowadzonego przez użytkownika
  const [photoUrl, setPhotoUrl] = useState(""); // Stan dla URL wygenerowanego zdjęcia
  const [loading, setLoading] = useState(false); // Stan ładowania dla generowania zdjęcia
  const [firstLoadedImage, setFirstLoadedImage] = useState(false); // Stan określający, czy pierwsze zdjęcie zostało załadowane
  const [sendPicture, setSendPicture] = useState(true); // Stan określający, czy zdjęcie zostało już zapisane

  // Funkcja obsługująca wysyłanie tekstu do wygenerowania zdjęcia
  const handleSubmit = async () => {
    generatePhoto(setLoading, setFirstLoadedImage, text, setPhotoUrl);
  };

   // Funkcja obsługująca zapisywanie wygenerowanego zdjęcia
  const handleSavePicture = async (type) => {
    savePicture(text, photoUrl, type);
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
              <div>
                <Button
                  variant="contained"
                  color="success"
                  style={{ marginRight: "2rem" }}
                  onClick={() => {
                    handleSavePicture(1);
                    setSendPicture(false);
                  }}
                >
                  Save as public
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => {
                    handleSavePicture(0);
                    setSendPicture(false);
                  }}
                >
                  Save as private
                </Button>
              </div>
            ) : (
              <Button variant="contained" color="success" disabled={true}>
                Already saved
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
