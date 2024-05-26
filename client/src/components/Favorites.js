import React, { useState, useEffect, useContext } from "react";
import CardPicture from "../components/CardPicture";
import { getFavorites } from "../utils/api";
import { AuthContext } from "../providers/AuthProvider ";
function Favorites() {
  const [pictures, setPictures] = useState([]); // Stan przechowujący zdjęcia
  const [pictureNumber, setPictureNumber] = useState(0); // Numer aktualnie wyświetlanego zdjęcia
  const [isLoading, setIsLoading] = useState(true); // Stan ładowania zdjęć
  const [likes, setLikes] = useState(); // Stan przechowujący liczbę polubień
  const { user } = useContext(AuthContext); // Kontekst autoryzacji użytkownika
  const allowLike = true; // Zezwolenie na polubienia

   // Efekt uboczny do pobierania ulubionych zdjęć
  useEffect(() => {
    getFavorites(setPictures, setLikes, setIsLoading);
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

export default Favorites;
