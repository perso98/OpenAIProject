import React, { useState, useContext } from "react";
import "../App.css";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Button, IconButton } from "@mui/material";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import FavoriteIconLiked from "@mui/icons-material/Favorite";
import { likePicture, dislikePicture, changeStatus } from "../utils/api";
import { AuthContext } from "../providers/AuthProvider ";
import CommentDialog from "./CommentDialog";
function CardPicture(props) {

  // Stany
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [openComments, setOpenComments] = useState(false);
  const [pictureId, setPictureId] = useState(0);

  const { user } = useContext(AuthContext); // Kontekst autoryzacji użytkownika

  // Funkcja zamykająca okno dialogowe komentarzy
  const handleCloseComments = () => {
    setOpenComments(false);
    setPictureId(null);
  };
  return (
    <>
      <div className="picture-card-container">
        {props.isLoading ? (
          <h1 style={{ color: "white" }}>Loading...</h1>
        ) : props.pictures.length !== 0 ? (
          <div
            className="picture-card"
            key={props.pictures[props.pictureNumber].id}
          >
            <img
              src={`http://localhost:3001/public${
                props.pictures[props.pictureNumber].url
              }`}
            />
            <div style={{ marginTop: "1rem" }}>
              <div className="picture-card-info">
                <div className="card-login-text">
                  {props.pictures[props.pictureNumber].User.login}
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  {props.pictures[props.pictureNumber].text}
                </div>

                <b>Likes: {props.likes}</b>
                <IconButton
                  className="comment-icon-button"
                  onClick={() => {
                    setOpenComments(true);
                    setPictureId(props.pictures[props.pictureNumber].id);
                    setCommentsLoading(true);
                  }}
                >
                  <CommentIcon className="comment-icon" />
                </IconButton>
                {user?.id === props.pictures[props.pictureNumber].User.id ? (
                  props.pictures[props.pictureNumber].public ? (
                    <Button
                      color="success"
                      variant="contained"
                      onClick={() => {
                        changeStatus(
                          props.pictures[props.pictureNumber].id,
                          0,
                          props.pictures,
                          props.setPictures
                        );
                      }}
                    >
                      Set as private
                    </Button>
                  ) : (
                    <Button
                      color="success"
                      variant="contained"
                      onClick={() => {
                        changeStatus(
                          props.pictures[props.pictureNumber].id,
                          1,
                          props.pictures,
                          props.setPictures
                        );
                      }}
                    >
                      Set as public
                    </Button>
                  )
                ) : null}
              </div>

              <div style={{ textAlign: "center" }}>
                {props.pictureNumber === 0 ? (
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
                        if (props.pictureNumber > 0) {
                          props.setPictureNumber(props.pictureNumber - 1);
                          props.setLikes(
                            props.pictures[props.pictureNumber - 1].Likes.length
                          );
                        }
                      }}
                    />
                  </IconButton>
                )}
                {props.user && props.allowLike ? (
                  props.pictures[props.pictureNumber].liked ? (
                    <IconButton
                      onClick={() =>
                        dislikePicture(
                          props.pictures[props.pictureNumber].id,
                          props.setPictures,
                          props.pictures
                        )
                      }
                    >
                      <FavoriteIconLiked
                        className="heart-icon-liked"
                        fontSize="large"
                      />
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={() =>
                        likePicture(
                          props.pictures[props.pictureNumber].id,
                          props.setPictures,
                          props.pictures
                        )
                      }
                    >
                      <FavoriteIcon className="heart-icon" fontSize="large" />
                    </IconButton>
                  )
                ) : null}
                {props.pictureNumber === props.pictures.length - 1 ? (
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
                        if (props.pictureNumber < props.pictures.length - 1) {
                          props.setPictureNumber(props.pictureNumber + 1);
                          props.setLikes(
                            props.pictures[props.pictureNumber + 1].Likes.length
                          );
                        }
                      }}
                    />
                  </IconButton>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div style={{ color: "white" }}>Nothing to show...</div>
        )}
      </div>
      <CommentDialog
        open={openComments}
        handleClose={handleCloseComments}
        pictureId={pictureId}
        loading={commentsLoading}
        setLoading={setCommentsLoading}
      />
    </>
  );
}

export default CardPicture;
