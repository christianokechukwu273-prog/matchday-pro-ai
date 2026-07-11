const express = require("express");
const cors = require("cors");
require("dotenv").config();
const axios = require("axios");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.json({
    app: "MATCHDAY PRO AI",
    status: "Running",
    message: "Football Prediction Backend is Live!"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.get("/fixtures", async (req, res) => {
  try {
    const response = await axios.get(
      "https://www.thesportsdb.com/api/v2/json/123/livescore"
    );

    res.json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);

    res.status(500).json({
      error: "Failed to fetch data"
    });
  }
});