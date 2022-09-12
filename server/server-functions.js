require("dotenv").config();
const axios = require("axios"),
  apiKEY = process.env.VITE_APP_WEATHER_API_KEY,
  apiURL = "https://api.openweathermap.org/data/2.5/weather";

// api call
const fetchCityData = async (city) => {
  const url = `${apiURL}?q=${city}&appid=${apiKEY}&units=imperial`;
  const result = await axios.get(url, {
    method: "GET",
    headers: {
      "API-KEY": apiKEY,
    },
  });
  return result;
};

// mapped object
const mapReturnObject = (input) => {
  return {
    main: {
      temp: input.data.main.temp,
      feels_like: input.data.main.feels_like,
      humidity: input.data.main.humidity,
    },
    message: input.data.message,
    cod: input.data.cod,
    weather: input.data.weather,
    name: input.data.name,
    id: input.data.id,
    dt: input.data.dt,
    sys: {
      sunrise: input.data.sys.sunrise,
      sunset: input.data.sys.sunset,
    },
    timezone: input.data.timezone,
  };
};

// CACHING
const cacheData = {};
// check for a city in the cache data
const isCityCached = (city) => cacheData.hasOwnProperty(city);

// rate limit object
const rateLimitError = {
  error: "You have exceeded your search limit. Try again in a minute.",
};
/**
 * Returns the amount of seconds between two given dates.
 * @param {Date} dtStart The start time.
 * @param {Date} dtEnd The end time.
 * @returns The number of seconds between the two dates.
 */
function secondsBetween(dtStart, dtEnd) {
  var diff = (dtStart.getTime() - dtEnd.getTime()) / 1000;
  return Math.abs(diff);
}

let lastCheckedMinute = new Date().getMinutes();

const checkLastCall = () => {
  const currentMinute = new Date().getMinutes();
  console.log(
    "Last Checked - " + lastCheckedMinute,
    "Current- " + currentMinute
  );
  if (currentMinute != lastCheckedMinute) {
    // if the minute has change, clear the object
    userStats = {};
    lastCheckedMinute = currentMinute;
  }
};

// export functions
module.exports = {
  fetchCityData,
  mapReturnObject,
  secondsBetween,
  rateLimitError,
  checkLastCall,
  lastCheckedMinute,
  isCityCached,
};
