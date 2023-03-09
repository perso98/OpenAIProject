import React, { useState, useEffect, useContext } from "react";
import CardPicture from "../components/CardPicture";
import { getAllPictures } from "../utils/api";
import { AuthContext } from "../providers/AuthProvider ";

function Top20() {
  const [pictures, setPictures] = useState([]);
  const [pictureNumber, setPictureNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [likes, setLikes] = useState();
  const { user } = useContext(AuthContext);
  const allowLike = false;
  useEffect(() => {
    getAllPictures(setPictures, setLikes, setIsLoading);
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "1rem", color: "white" }}>
        Top {pictureNumber + 1}
      </h1>
      <CardPicture
        pictures={pictures}
        likes={likes}
        pictureNumber={pictureNumber}
        setPictures={setPictures}
        isLoading={isLoading}
        user={user}
        setLikes={setLikes}
        setPictureNumber={setPictureNumber}
        allowLike={allowLike}
      />
    </div>
  );
}

export default Top20;
