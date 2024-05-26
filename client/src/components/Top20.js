import React, { useState, useEffect, useContext } from "react";
import CardPicture from "../components/CardPicture";
import { getAllPictures } from "../utils/api";
import { AuthContext } from "../providers/AuthProvider ";

function Top20() {
  const [pictures, setPictures] = useState([]); // Stan przechowujący listę zdjęć
  const [pictureNumber, setPictureNumber] = useState(0); // Numer aktualnie wyświetlanego zdjęcia
  const [isLoading, setIsLoading] = useState(true); // Stan ładowania zdjęć
  const [likes, setLikes] = useState();  // Stan przechowujący liczbę polubień
  const { user } = useContext(AuthContext); // Kontekst autoryzacji użytkownika
  const allowLike = false; // Polubienia są wyłączone w tym widoku

  // useEffect do pobierania wszystkich zdjęć
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
