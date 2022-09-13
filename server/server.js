require("dotenv").config();
const express = require("express"),
  app = express(),
  PORT = process.env.PORT || 8000,
  cors = require("cors"),
  { performance } = require("perf_hooks"),
  fs = require("fs"),
  // function imports
  {
    mapReturnObject,
    secondsBetween,
    rateLimitError,
  } = require("./server-functions");
app.use(cors());
const axios = require("axios"),
  apiKEY = process.env.VITE_APP_WEATHER_API_KEY,
  apiURL = "https://api.openweathermap.org/data/2.5/weather";

// api call  ------------------------------------------
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

// CACHING ------------------------------------------
const cacheData = {};
const cachedDurationSeconds = 60;
// check for a city in the cache data
const isCityCached = (city) => cacheData.hasOwnProperty(city);
// cache city data in object
const updateCacheData = async (city) => {
  const fetchedData = await fetchCityData(city);
  cacheData[city] = {
    timeFetched: new Date().getTime(),
    data: fetchedData,
  };
};

// RATE LIMITING ------------------------------------------
let userStats = {};
let lastCheckedMinute = new Date().getMinutes();
// check time frame of ip address
const isUserLimited = (ip) => userStats.hasOwnProperty(ip);
const checkLastCall = () => {
  const currentMinute = new Date().getMinutes();
  console.log(
    `Last Checked - ${lastCheckedMinute}. Current Minute - ${currentMinute}`
  );
  if (currentMinute != lastCheckedMinute) {
    // if the minute has change, clear the object
    userStats = {};
    lastCheckedMinute = currentMinute;
    // fetchCityData(city);
  }
};

// API CALL FOR WEATHER DATA ------------------------------------------
app.get("/:city", async (req, res, next) => {
  // ip address
  const ip = req.socket.remoteAddress;
  checkLastCall();
  // is ip address saved to userStats?
  if (!isUserLimited(ip)) {
    userStats[ip] = 0;
  }
  // increase count on user
  userStats[ip]++;
  let userIpRequestCount = userStats[ip];
  if (userStats[ip] > 5) {
    res.json(rateLimitError.error);
  } else {
    try {
      // start of performance check
      const performanceStartTime = performance.now();
      // api
      const city = req.params.city;
      // check the user count

      if (isCityCached(city)) {
        // check if data is stale
        const cacheDate = new Date(cacheData[city].timeFetched);
        const now = new Date();
        const timeDiff = secondsBetween(cacheDate, now);

        if (timeDiff > cachedDurationSeconds) {
          // go fetch data from api to replace stale data
          await updateCacheData(city);
        }
      } else {
        // go fetch city from api for the first time to populate object
        await updateCacheData(city);
      }

      // data from api call
      res.json(mapReturnObject(cacheData[city].data));

      // end of performance check
      const performanceEndTime = performance.now();
      console.log("end" + performanceEndTime);

      // Log data ---------------------------------------------------------
      const timeOfApiCall = new Date();
      const performanceTime = (
        performanceEndTime - performanceStartTime
      ).toFixed(4);

      // log all api calls
      const accessLog = `\n[-- ${timeOfApiCall} -- ${ip} -- user made a call for ${city}. Data came back in  ${performanceTime} milliseconds. -- ]`;

      fs.appendFile("./access-log.txt", accessLog, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(accessLog);
        }
      });

      // log rate-limiting
      const currentMinute = new Date().getMinutes();

      const rateLimitLog = `\n --  ${timeOfApiCall}, Last Checked Minute : ${lastCheckedMinute}, Current Minute : ${currentMinute} -- \n -- ${ip} called ${city}, this is the ${userIpRequestCount} call from this user. `;
      fs.appendFile("./rate-limit-log.txt", rateLimitLog, (err) => {});

      // error handling -------------------------------------------------
    } catch (err) {
      const timeOfApiCall = new Date();
      const errorLog = `\n This ${err} occured at ${timeOfApiCall}`;
      fs.appendFile("./error-log.txt", errorLog, () => {});
      next(err);
    }
  }
});

app.listen(PORT, () => {
  console.log("Server started on port 8000");
});

// weather call for geocode data
// app.get("/:citycode", async (req, res, next) => {
//   const apiURL = "http://api.openweathermap.org/geo/1.0/direct";

//   const citycode = req.params.citycode;
//   const url = `${apiURL}?q=${citycode}&appid=${apiKEY}&limit=5`;
//   try {
//     const result = await axios.get(url, {
//       method: "GET",
//       url: "apiURL",
//       headers: {
//         "API-KEY": apiKEY,
//       },
//     });
//     res.json(result.data.name);
//   } catch (err) {
//     next(err);
//   }
// });
