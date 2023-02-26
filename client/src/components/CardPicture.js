import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import FavoriteIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { IconButton } from "@mui/material";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
function CardPicture() {
  const [pictures, setPictures] = useState([]);
  const [pictureNumber, setPictureNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get("http://localhost:3001/picture/getPictures")
      .then((res) => {
        setPictures(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="picture-card-container">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        pictures.length > 0 && (
          <div className="picture-card" key={pictures[pictureNumber].id}>
            <img
              src={`http://localhost:3001/public${pictures[pictureNumber].url}`}
            />
            <div style={{ marginTop: "1rem" }}>
              <div style={{ marginLeft: "1rem", marginRight: "1rem" }}>
                <div
                  style={{
                    fontWeight: "600",
                    textAlign: "center",
                    marginBottom: "0.5rem",
                  }}
                >
                  {pictures[pictureNumber].User.login}
                </div>
                <div>{pictures[pictureNumber].text}</div>
              </div>
              <div style={{ textAlign: "center" }}>
                {pictureNumber === 0 ? (
                  <IconButton>
                    <ArrowBackIosIcon
                      style={{
                        fontSize: "1rem",
                        color: "gray",
                        padding: "0.5rem",
                      }}
                      disabled={true}
                    />
                  </IconButton>
                ) : (
                  <IconButton>
                    <ArrowBackIosIcon
                      style={{
                        fontSize: "1rem",
                        color: "black",
                        padding: "0.5rem",
                      }}
                      onClick={() => setPictureNumber(pictureNumber - 1)}
                    />
                  </IconButton>
                )}
                <IconButton>
                  <FavoriteIcon
                    style={{
                      fontSize: "2rem",
                      color: "black",
                      padding: "0.5rem",
                    }}
                  />
                </IconButton>
                {pictureNumber === pictures.length - 1 ? (
                  <IconButton>
                    <ArrowForwardIosOutlinedIcon
                      style={{
                        fontSize: "1rem",
                        color: "gray",
                        padding: "0.5rem",
                      }}
                      disabled={true}
                    />
                  </IconButton>
                ) : (
                  <IconButton>
                    <ArrowForwardIosOutlinedIcon
                      style={{
                        fontSize: "1rem",
                        color: "black",
                        padding: "0.5rem",
                      }}
                      onClick={() => setPictureNumber(pictureNumber + 1)}
                    />
                  </IconButton>
                )}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default CardPicture;
