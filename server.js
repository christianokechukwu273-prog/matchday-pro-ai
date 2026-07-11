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
      "https://v3.football.api-sports.io/fixtures?date=2026-07-11"
      {
        headers: {
          "x-apisports-key": process.env.API_KEY
        }
      }
    );

    res.json(response.data);

  } catch (error) {
    console.error(error.response?.data || error.message);

    res.status(500).json({
      error: "Failed to fetch fixtures"
    });
  }
});
   