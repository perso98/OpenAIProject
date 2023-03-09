import React, { useState, useEffect, useContext } from "react";
import "../App.css";
import axios from "axios";
import FavoriteIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { IconButton } from "@mui/material";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import FavoriteIconLiked from "@mui/icons-material/Favorite";
import { likePicture, dislikePicture } from "../utils/api";
function CardPicture(props) {
  return (
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
            <div style={{ margin: "0 1rem 0 1rem" }}>
              <div className="card-login-text">
                {props.pictures[props.pictureNumber].User.login}
              </div>
              <div style={{ marginBottom: "1rem" }}>
                {props.pictures[props.pictureNumber].text}
              </div>

              <b>Likes: {props.likes}</b>
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
  );
}

export default CardPicture;
