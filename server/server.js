require("dotenv").config();
const PORT = process.env.PORT || 8000;
const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const apiKEY = process.env.VITE_APP_WEATHER_API_KEY;

app.use(cors());
// api call for weather data
app.get("/:city", async (req, res, next) => {
  const apiURL = "https://api.openweathermap.org/data/2.5/weather";
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
// weather call for geocode data
app.get("/:citycode", async (req, res, next) => {
  const apiURL = "http://api.openweathermap.org/geo/1.0/direct";

  const citycode = req.params.citycode;
  const url = `${apiURL}?q=${citycode}&appid=${apiKEY}&limit=5`;
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

app.listen(PORT, () => {
  console.log("Server started on port 8000");
});
