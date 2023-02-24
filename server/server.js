const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const bodyParser = require("body-parser");
const cors = require("cors");
const configuration = new Configuration({
  organization: "org-ZfCMQTMHvH0VP2a6p0R00tuP",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
const port = 3001;
app.listen(port, () => {
  console.log("Server is working on port ", port);
});

app.post("/getAnswer", async (req, res) => {
  const { question } = req.body;
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: question,
      max_tokens: 200,
      temperature: 0,
    });

    res.send(response.data.choices[0].text);
  } catch (err) {
    res.send(err);
  }
});
