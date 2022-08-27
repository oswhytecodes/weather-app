require("dotenv").config();
const PORT = 8000;
const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const apiURL = "https://api.openweathermap.org/data/2.5/weather";
const apiKEY = process.env.VITE_APP_WEATHER_API_KEY;

app.use(cors());

app.get("/:city", async (req, res) => {
  const city = req.params.city;
  const url = `${apiURL}?q=${city}&appid=${apiKEY}&units=imperial`;

  const result = await axios.get(url, {
    method: "GET",
    url: "apiURL",
    headers: {
      "API-KEY": apiKEY,
    },
  });
  res.json(result.data);
});

app.listen(PORT, () => {
  console.log("Server started on port 8000");
});
