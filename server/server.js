require("dotenv").config();
const express = require("express"),
  app = express(),
  PORT = process.env.PORT || 8000,
  cors = require("cors"),
  { performance } = require("perf_hooks"),
  fs = require("fs"),
  // function imports
  {
    fetchCityData,
    mapReturnObject,
    secondsBetween,
    rateLimitError,
    checkLastCall,
    lastCheckedMinute,
    isCityCached,
  } = require("./server-functions");
app.use(cors());

// CACHING
const cacheData = {};
const cachedDurationSeconds = 60;
// check for a city in the cache data

const updateCacheData = async (city) => {
  const fetchedData = await fetchCityData(city);
  cacheData[city] = {
    timeFetched: new Date().getTime(),
    data: fetchedData,
  };
};

// RATE LIMITING
let userStats = {};

// check time frame of ip address
const isUserLimited = (ip) => userStats.hasOwnProperty(ip);

// API CALL FOR WEATHER DATA
app.get("/:city", async (req, res, next) => {
  // ip address
  checkLastCall();
  const ip = req.socket.remoteAddress;
  // is ip address saved to userStats?
  if (!isUserLimited(ip)) {
    userStats[ip] = 0;
  }
  // increase count on user
  userStats[ip]++;
  let userIpRequestCount = userStats[ip];

  if (userIpRequestCount > 5) {
    console.log(rateLimitError);
    res.json(rateLimitError);
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

      // log data to txt file
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
      const rateLimitLog = `\n -- ${ip} called ${city}, this is the ${userIpRequestCount} call from this user. -- \nThe time is ${timeOfApiCall}, Last Checked Minute : ${lastCheckedMinute}, Current Minute : ${currentMinute} --`;
      // create/update file
      fs.appendFile("./rate-limit-log.txt", rateLimitLog, (err) => {});

      // error handling
    } catch (err) {
      const timeOfApiCall = new Date();
      const errorLog = `\n This ${err} occured at ${timeOfApiCall}`;
      fs.appendFile("./error-log.txt", errorLog, () => {});
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
    res.json(result.data.name);
  } catch (err) {
    next(err);
  }
});

app.listen(PORT, () => {
  console.log("Server started on port 8000");
});
