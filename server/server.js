require("dotenv").config();
const express = require("express"),
  app = express(),
  PORT = process.env.PORT || 8000,
  cors = require("cors"),
  axios = require("axios"),
  { performance } = require("perf_hooks"),
  fs = require("fs"),
  apiKEY = process.env.VITE_APP_WEATHER_API_KEY;
app.use(cors());

const now = new Date();
const currentTime = `${now.getHours()}:${now.getMinutes()}`;
// rate-limiting
const userData = {};
const timeBeforeApiCall = new Date().getMinutes();
// caching
const cityName = {};
console.log("Current time : " + currentTime, timeBeforeApiCall);
// api call for weather data
app.get("/:city", async (req, res, next) => {
  // api
  const apiURL = "https://api.openweathermap.org/data/2.5/weather";
  const city = req.params.city;
  const url = `${apiURL}?q=${city}&appid=${apiKEY}&units=imperial`;
  // rate-limiting
  const ip = req.socket.remoteAddress;
  const timeOfApiCall = new Date().getMinutes();

  // performance check
  const performanceStartTime = performance.now();

  try {
    const result = await axios.get(url, {
      method: "GET",
      url: "apiURL",
      headers: {
        "API-KEY": apiKEY,
      },
    });
    // api call
    res.json({
      main: {
        temp: result.data.main.temp,
        feels_like: result.data.main.feels_like,
        humidity: result.data.main.humidity,
      },
      message: result.data.message,
      cod: result.data.cod,
      weather: result.data.weather,
      name: result.data.name,
      id: result.data.id,
      dt: result.data.dt,
      sys: {
        sunrise: result.data.sys.sunrise,
        sunset: result.data.sys.sunset,
      },
      timezone: result.data.timezone,
    });
  } catch (err) {
    next(err);
  }

  const performanceEndTime = performance.now();
  // performance calculation
  const performanceTime = (performanceEndTime - performanceStartTime).toFixed(
    4
  );
  const line = `\n[User ${ip} made a call for ${city} at ${timeOfApiCall}. Data came back in ${performanceTime} milliseconds]`;

  // access log
  fs.appendFile("./access-log.txt", line, (err) => {
    if (err) {
      console.log("There is an error");
    } else {
      console.log(line);
    }
  });
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
