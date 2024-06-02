const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Express instance
const app = express();


const corsOptions = {
  origin: ["http://localhost:5174", "http://localhost:5173"],
};

app.use(cors(corsOptions));

// Middlewares
app.use(express.json());
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Generate Content Route
app.post("/generate", async (req, res) => {
  const { prompt } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    res.send(text);
  } catch (error) {
    console.log(error);

    res.status(500).send("Failed to generate content");
  }
});

app.listen(8080, console.log("Server is running"));
