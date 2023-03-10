import axios from "axios";
const API_URL = "http://localhost:3001";
axios.defaults.withCredentials = true;
//funkcja pobierająca odpowiedzi bota i updatejtująca czat
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

export const generatePhoto = async (
  setLoading,
  setFirstLoadedImage,
  text,
  setPhotoUrl
) => {
  setLoading(true);
  setFirstLoadedImage(true);
  await axios
    .post("http://localhost:3001/ai/generatePhoto", {
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

export const savePicture = async (text, url) => {
  try {
    await axios
      .post(`${API_URL}/picture/sendPicture`, {
        text: text,
        url: url,
      })
      .then((res) => {
        console.log(res);
      });
  } catch (err) {
    console.log(err);
  }
};

export const getAuth = async (setUser) => {
  try {
    await axios.get(`${API_URL}/user/getAuth`).then((res) => {
      setUser(res.data.user);
    });
  } catch (err) {
    console.log(err);
  }
};

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

export const logoutFromAccount = async (setUser) => {
  try {
    await axios.post(`${API_URL}/user/logout`).then((res) => setUser());
  } catch (err) {
    console.log(err);
  }
};
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
