const express = require("express");
const cors = require("cors");
require("dotenv").config();
const axios = require("axios");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.get("/fixtures", async (req, res) => {
  try {
    const response = await axios.get(
      "https://www.thesportsdb.com/api/v1/json/123/eventsnextleague.php?id=4328"
    );

    res.json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);

    res.status(500).json({
      error: "Failed to fetch fixtures"
    });
  }
});