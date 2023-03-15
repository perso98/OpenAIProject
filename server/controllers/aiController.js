const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  organization: "org-ZfCMQTMHvH0VP2a6p0R00tuP",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);
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
