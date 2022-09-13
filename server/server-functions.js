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

// export functions
module.exports = {
  mapReturnObject,
  secondsBetween,
  rateLimitError,
};
