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
  axios
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
    axios
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
    axios.get(`${API_URL}/user/getAuth`).then((res) => {
      setUser(res.data.user);
    });
  } catch (err) {
    console.log(err);
  }
};

export const loginToAccount = async (setUser, login, password) => {
  try {
    axios
      .post(`${API_URL}/user/loginToAccount`, {
        login: login,
        password: password,
      })
      .then((res) => {
        if (res.user) setUser(res.user);
        console.log(res);
      });
  } catch (err) {
    console.log(err);
  }
};

export const registerAccount = async (login, password) => {
  try {
    axios
      .post(`${API_URL}/user/registerAccount`, {
        login: login,
        password: password,
      })
      .then((res) => console.log(res));
  } catch (err) {
    console.log(err);
  }
};
