import React, { useState, useEffect, useContext } from "react";
import CardPicture from "../components/CardPicture";
import { getUserPictures } from "../utils/api";
import { AuthContext } from "../providers/AuthProvider ";
function UserPictures() {
  const [pictures, setPictures] = useState([]); // Stan przechowujący listę zdjęć użytkownika
  const [pictureNumber, setPictureNumber] = useState(0); // Numer aktualnie wyświetlanego zdjęcia
  const [isLoading, setIsLoading] = useState(true); // Stan ładowania zdjęć
  const [likes, setLikes] = useState(); // Stan przechowujący liczbę polubień
  const { user } = useContext(AuthContext); // Kontekst autoryzacji użytkownika
  const allowLike = false; // Polubienia są wyłączone w tym widoku

  // useEffect do pobierania zdjęć użytkownika
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
