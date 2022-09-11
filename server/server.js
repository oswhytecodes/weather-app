require("dotenv").config();
const express = require("express"),
  app = express(),
  PORT = process.env.PORT || 8000,
  cors = require("cors"),
  { performance } = require("perf_hooks"),
  fs = require("fs"),
  {
    fetchCityData,
    mapReturnObject,
    secondsBetween,
  } = require("./server-functions");
app.use(cors());

// CACHING
const cacheData = {};
const cachedDurationSeconds = 60;
// check for a city in the cache data
const isCityCached = (city) => cacheData.hasOwnProperty(city);

const updateCacheData = async (city) => {
  const fetchedData = await fetchCityData(city);
  cacheData[city] = {
    timeFetched: new Date().getTime(),
    data: fetchedData,
  };
};

// RATE LIMITING
let userStats = {};
const lastCheckedMinute = new Date().getMinutes();

const isUserLimited = (ip) => userStats.hasOwnProperty(ip);
// check time frame of ip address
const checkLastCall = () => {
  const currentMinute = new Date().getMinutes();
  console.log(
    "Last Checked Minute : " + lastCheckedMinute,
    "Current Minute : " + currentMinute
  );
  if (currentMinute != lastCheckedMinute) {
    // if the minute has change, clear the object
    userStats = {};
    lastCheckedMinute = currentMinute;
  }
};

// API CALL FOR WEATHER DATA
app.get("/:city", async (req, res, next) => {
  // ip address
  checkLastCall();
  const ip = req.socket.remoteAddress;
  let userIpRequestCount = userStats[ip];
  if (!isUserLimited(ip)) {
    userIpRequestCount = 0;
  }
  userIpRequestCount++;

  // check the user count
  if (userIpRequestCount > 6) {
    res.json({ error: "Exceeded Limit, " });
  } else {
    try {
      // start of performance check
      const performanceStartTime = performance.now();

      // api
      const city = req.params.city;

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

      // log data to txt file

      const timeOfApiCall = new Date();
      const performanceTime = (
        performanceEndTime - performanceStartTime
      ).toFixed(4);
      const accessLog = `\n[ - ${ip} - user made a call for ${city} at  -- ${timeOfApiCall}. Data came back in -- ${performanceTime} milliseconds -- ]`;
      fs.appendFile("./access-log.txt", accessLog, (err) => {
        if (err) {
          console.log("There is an error");
        } else {
          console.log(accessLog);
        }
      });
      // error handling
    } catch (err) {
      const timeOfApiCall = new Date();
      const errorLog = `\n This ${err} occured at ${timeOfApiCall}`;
      fs.appendFile("./error-log.txt", errorLog);
    }
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
