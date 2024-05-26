const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

// Konfiguracja klienta OpenAI za pomocą klucza API z pliku .env
const configuration = new Configuration({
  organization: "org-ZfCMQTMHvH0VP2a6p0R00tuP",
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Funkcja obsługująca żądanie uzyskania odpowiedzi od modelu OpenAI
exports.getAnswer = async (req, res) => {
  const { question } = req.body;
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: question,
      max_tokens: 400,
      temperature: 0,
    });

    res.send(response.data.choices[0].text);
  } catch (err) {
    res.send(err);
  }
};

// Funkcja obsługująca żądanie wygenerowania zdjęcia przez model OpenAI
exports.generatePhoto = async (req, res) => {
  const { text } = req.body;
  try {
    const response = await openai.createImage({
      prompt: text,
      n: 1,
      size: "256x256",
    });

    res.send(response.data.data[0].url);
  } catch (err) {
    res.send(err);
  }
};
