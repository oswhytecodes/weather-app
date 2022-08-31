require("dotenv").config();
const PORT = process.env.PORT || 8000;
const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const axios = require("axios");
const apiURL = "https://api.openweathermap.org/data/2.5/weather";
const apiKEY = process.env.VITE_APP_WEATHER_API_KEY;

app.use(cors());

// Serve Node the files for build

app.use(express.static(path.resolve(__dirname, "../client/dist")));
// api call
app.get("/:city", async (req, res, next) => {
  const city = req.params.city;
  const url = `${apiURL}?q=${city}&appid=${apiKEY}&units=imperial`;
  try {
    const result = await axios.get(url, {
      method: "GET",
      url: "apiURL",
      headers: {
        "API-KEY": apiKEY,
      },
    });
    res.json(result.data);
  } catch (err) {
    next(err);
  }
});

// unhandled requests will get sent back to react
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
});

app.listen(PORT, () => {
  console.log("Server started on port 8000");
});
