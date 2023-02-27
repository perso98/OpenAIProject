import React, { useState, useEffect, useContext } from "react";
import CardPicture from "../components/CardPicture";
import { getUserPictures } from "../utils/api";
import { AuthContext } from "../providers/AuthProvider ";
function UserPictures() {
  const [pictures, setPictures] = useState([]);
  const [pictureNumber, setPictureNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [likes, setLikes] = useState();
  const { user } = useContext(AuthContext);
  const allowLike = false;
  useEffect(() => {
    getUserPictures(setPictures, setLikes, setIsLoading);
  }, []);
  return (
    <div>
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

export default UserPictures;
