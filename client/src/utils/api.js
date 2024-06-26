import axios from "axios";
const API_URL = "http://localhost:3001";
axios.defaults.withCredentials = true;


// Funkcja pobierająca odpowiedzi ai i aktualizująca czat
export const handleSubmit = async (
  question,
  setQuestion,
  setChatHistory,
  setMessageLoading
) => {
  setQuestion("");
  setMessageLoading(true);
  setChatHistory((prevHistory) => [
    ...prevHistory,
    { You: question, Bot: "writting..." },
  ]);
  try {
    const response = await axios.post(`${API_URL}/ai/getAnswer`, {
      question: question,
    });
    const botAnswer = response.data;
    setChatHistory((prevHistory) => {
      const latestQuestion = prevHistory[prevHistory.length - 1].You;
      const updatedHistory = prevHistory.slice(0, -1);
      return [...updatedHistory, { You: latestQuestion, Bot: botAnswer }];
    });
  } catch (error) {
    setChatHistory((prevHistory) => {
      const latestQuestion = prevHistory[prevHistory.length - 1].You;
      const updatedHistory = prevHistory.slice(0, -1);
      return [...updatedHistory, { You: latestQuestion, Bot: error }];
    });
  }
  setMessageLoading(false);
};

// Funkcja generująca zdjęcie na podstawie tekstu
export const generatePhoto = async (
  setLoading,
  setFirstLoadedImage,
  text,
  setPhotoUrl
) => {
  setLoading(true);
  setFirstLoadedImage(true);
  await axios
    .post(`${API_URL}/ai/generatePhoto`, {
      text: text,
    })

    .then((res) => {
      setPhotoUrl(res.data);
      setLoading(false);
    })
    .catch((error) => {
      setLoading(false);
      console.log(error);
    });
};

// Funkcja zapisująca zdjęcie
export const savePicture = async (text, url, status) => {
  try {
    await axios
      .post(`${API_URL}/picture/sendPicture`, {
        text,
        url,
        status,
      })
      .then((res) => {
        console.log(res);
      });
  } catch (err) {
    console.log(err);
  }
};

// Funkcja pobierająca autoryzację użytkownika
export const getAuth = async (setUser) => {
  try {
    await axios.get(`${API_URL}/user/getAuth`).then((res) => {
      setUser(res.data.user);
    });
  } catch (err) {
    console.log(err);
  }
};

// Funkcja logowania do konta
export const loginToAccount = async (setUser, login, password) => {
  try {
    await axios
      .post(`${API_URL}/user/loginToAccount`, {
        login: login,
        password: password,
      })
      .then((res) => {
        if (res.data.user) setUser(res.data.user);
        console.log(res);
      });
  } catch (err) {
    console.log(err);
  }
};

// Funkcja rejestracji konta
export const registerAccount = async (login, password) => {
  try {
    await axios
      .post(`${API_URL}/user/registerAccount`, {
        login: login,
        password: password,
      })
      .then((res) => console.log(res));
  } catch (err) {
    console.log(err);
  }
};

// Funkcja wylogowania z konta
export const logoutFromAccount = async (setUser) => {
  try {
    await axios.post(`${API_URL}/user/logout`).then((res) => setUser(null));
  } catch (err) {
    setUser(null);
    console.log(err);
  }
};

// Funkcja polubienia zdjęcia
export const likePicture = async (id, setPictures, pictures) => {
  try {
    await axios
      .post(`${API_URL}/picture/likePicture`, { id: id })
      .then((res) => {
        setPictures(
          pictures.map((val) => {
            if (val.id === id) {
              return { ...val, liked: true };
            }
            return val;
          })
        );
      });
  } catch (err) {
    console.log(err);
  }
};

// Funkcja usunięcia polubienia zdjęcia
export const dislikePicture = async (id, setPictures, pictures) => {
  try {
    await axios
      .post(`${API_URL}/picture/dislikePicture`, { id: id })
      .then((res) => {
        setPictures(
          pictures.map((val) => {
            if (val.id === id) {
              return { ...val, liked: false };
            }
            return val;
          })
        );
      });
  } catch (err) {
    console.log(err);
  }
};

// Funkcja pobierająca wszystkie publiczne zdjęcia
export const getPictures = async (setPictures, setLikes, setIsLoading) => {
  axios
    .get(`${API_URL}/picture/getPictures`)
    .then((res) => {
      const shuffledPictures = res.data.sort(() => Math.random() - 0.5);
      setPictures(shuffledPictures.map((val) => ({ ...val, liked: false })));
      setLikes(shuffledPictures[0]?.Likes.length);
      setIsLoading(false);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Funkcja pobierająca 20 najpopularniejszych zdjęć
export const getAllPictures = async (setPictures, setLikes, setIsLoading) => {
  axios
    .get(`${API_URL}/picture/getAllPictures`)
    .then((res) => {
      const sortedPictures = res.data
        .sort((a, b) => b.Likes.length - a.Likes.length)
        .slice(0, 20);
      setPictures(sortedPictures);
      setLikes(sortedPictures[0]?.Likes.length);
      setIsLoading(false);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Funkcja pobierająca ulubione zdjęcia użytkownika
export const getFavorites = async (setPictures, setLikes, setIsLoading) => {
  axios
    .get(`${API_URL}/picture/getFavorites`)
    .then((res) => {
      setPictures(res.data.map((val) => ({ ...val, liked: true })));
      setLikes(res.data[0]?.Likes.length);
      setIsLoading(false);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Funkcja pobierająca zdjęcia użytkownika
export const getUserPictures = async (setPictures, setLikes, setIsLoading) => {
  axios
    .get(`${API_URL}/picture/getUserPictures`)
    .then((res) => {
      setPictures(res.data);
      setLikes(res.data[0]?.Likes.length);
      setIsLoading(false);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Funkcja dodająca komentarz do zdjęcia
export const addComment = async (id, text, setComments, comments) => {
  try {
    await axios
      .post(`${API_URL}/comment/addComment`, {
        id: id,
        text: text,
      })
      .then((res) => {
        setComments([
          ...comments,
          {
            id: res.data.comment.id,
            text: text,
            createdAt: res.data.comment.createdAt,
            UserId: res.data.user.id,
            User: {
              id: res.data.user.id,
              login: res.data.user.login,
            },
            Picture: { UserId: res.data.user.id },
          },
        ]);
      });
  } catch (err) {
    console.log(err);
  }
};

// Funkcja pobierająca komentarze do zdjęcia
export const getComments = async (id, setComments, setLoading) => {
  try {
    await axios.get(`${API_URL}/comment/comments/${id}`).then((res) => {
      setComments(res.data);
      setLoading(false);
    });
  } catch (err) {
    console.log(err);
  }
};

// Funkcja usuwająca komentarz
export const deleteComment = async (id, setComments, comments) => {
  try {
    await axios.post(`${API_URL}/comment/deleteComment`, { id }).then((res) => {
      if (res.data.success)
        setComments(comments.filter((val) => val.id !== id));
      else console.log("Error");
    });
  } catch (err) {
    console.log(err);
  }
};

// Funkcja zmieniająca status (publiczny/prywatny) zdjęcia
export const changeStatus = async (id, status, pictures, setPictures) => {
  try {
    await axios
      .put(`${API_URL}/picture/changeStatus`, { id, status })
      .then((res) => {
        setPictures(
          pictures.map((val) =>
            val.id === id ? { ...val, public: status } : val
          )
        );
      });
  } catch (err) {
    console.log(err);
  }
};
