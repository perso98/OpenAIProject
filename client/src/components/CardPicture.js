import React, { useState, useEffect, useContext } from "react";
import "../App.css";
import axios from "axios";
import FavoriteIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { IconButton } from "@mui/material";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import FavoriteIconLiked from "@mui/icons-material/Favorite";
import { likePicture, dislikePicture } from "../utils/api";
import { AuthContext } from "../providers/AuthProvider ";
function CardPicture() {
  const [pictures, setPictures] = useState([]);
  const [pictureNumber, setPictureNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [likes, setLikes] = useState();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    axios
      .get("http://localhost:3001/picture/getPictures")
      .then((res) => {
        setPictures(res.data);
        setLikes(res.data[0].Likes.length);
        setIsLoading(false);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleLike = (id) => {
    likePicture(id);
    setPictures(
      pictures.map((val) => {
        if (val.id === id) {
          return { ...val, liked: true };
        }
        return val;
      })
    );
  };
  const disLike = (id) => {
    dislikePicture(id);
    setPictures(
      pictures.map((val) => {
        if (val.id === id) {
          return { ...val, liked: false };
        }
        return val;
      })
    );
  };
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
              <div style={{ margin: "0 1rem 0 1rem" }}>
                <div className="card-login-text">
                  {pictures[pictureNumber].User.login}
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  {pictures[pictureNumber].text}
                </div>

                <b>Likes: {likes}</b>
              </div>
              <div style={{ textAlign: "center" }}>
                {pictureNumber === 0 ? (
                  <IconButton>
                    <ArrowBackIosIcon
                      fontSize="small"
                      className="disabled-arrow"
                      disabled={true}
                    />
                  </IconButton>
                ) : (
                  <IconButton>
                    <ArrowBackIosIcon
                      className="enabled-arrow"
                      fontSize="small"
                      onClick={() => {
                        if (pictureNumber > 0) {
                          setPictureNumber(pictureNumber - 1);
                          setLikes(pictures[pictureNumber - 1].Likes.length);
                        }
                      }}
                    />
                  </IconButton>
                )}
                {user ? (
                  pictures[pictureNumber].liked ? (
                    <IconButton
                      onClick={() => disLike(pictures[pictureNumber].id)}
                    >
                      <FavoriteIconLiked
                        className="heart-icon-liked"
                        fontSize="large"
                      />
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={() => handleLike(pictures[pictureNumber].id)}
                    >
                      <FavoriteIcon className="heart-icon" fontSize="large" />
                    </IconButton>
                  )
                ) : null}
                {pictureNumber === pictures.length - 1 ? (
                  <IconButton>
                    <ArrowForwardIosOutlinedIcon
                      fontSize="small"
                      className="disabled-arrow"
                      disabled={true}
                    />
                  </IconButton>
                ) : (
                  <IconButton>
                    <ArrowForwardIosOutlinedIcon
                      className="enabled-arrow"
                      fontSize="small"
                      onClick={() => {
                        if (pictureNumber < pictures.length - 1) {
                          setPictureNumber(pictureNumber + 1);
                          setLikes(pictures[pictureNumber + 1].Likes.length);
                        }
                      }}
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
