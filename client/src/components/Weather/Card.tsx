import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchData } from "../../redux/WeatherSlice";
import { Icon } from "./Icon";
import {
  epochToMilliSecondsConverter,
  timeZoneConverter,
  utcConverter,
} from "../../modules/functions";

export const Card = () => {
  // weather data from slice
  const dispatch = useAppDispatch();
  const name = useAppSelector((state) => state.weather.data.name);
  const { timezone, dt } = useAppSelector((state) => state.weather.data);
  const { city, input, loading } = useAppSelector((state) => state.weather);
  const { sunrise, sunset } = useAppSelector((state) => state.weather.data.sys);
  const weatherDescription = useAppSelector((state) =>
    state.weather.data.weather.map((x) => x.main)
  );
  const { temp, humidity, feels_like } = useAppSelector(
    (state) => state.weather.data.main
  );

  // timezone
  const timezoneCalculation = timeZoneConverter(dt, timezone);
  const utcCalculation =
    epochToMilliSecondsConverter(timezoneCalculation).toUTCString();
  const localTime = utcConverter(utcCalculation);

  // convert sunrise time
  let sunriseEpochTime = timeZoneConverter(sunrise, timezone);
  let sunriseUtcTime = epochToMilliSecondsConverter(sunriseEpochTime);
  let localSunriseTime = utcConverter(sunriseUtcTime);

  // convert sunset time
  let sunsetUnixTime = timeZoneConverter(sunset, timezone);
  let sunsetUtcTime = epochToMilliSecondsConverter(sunsetUnixTime);
  let localSunsetTime = utcConverter(sunsetUtcTime);

  // return temp with degree // not sure why temp wont bypass the type
  let toFahrenheit = Math.floor(temp);
  let feelsLikeTemp = Math.floor(feels_like);

  // Weather is coming back as imperial (Fahrenheit) - convert to celsius
  const toCelsius = Math.floor((toFahrenheit - 32) * (5 / 9));

  //DATA FOR THE CARDS
  useEffect(() => {
    if (name !== input && loading === "pending") {
      dispatch(fetchData(city));
    }
  }, [dispatch, city]);

  // See more feature
  const [toggle, setToggle] = useState(false);
  const [toggleWeather, setToggleWeather] = useState(false);
  const seeMoreData = () => {
    setToggle((prev) => !prev);
  };
  const toggleFahrenheit = () => {
    setToggleWeather((prev) => !prev);
  };

  return (
    <div className=" bg-slate-50 transition-all">
      <div className="flex items-center justify-between bg-neutral-200 px-4 py-2 md:mb-16 mb-8">
        <h1
          className="uppercase font-bold text-2xl 
          tracking-wider text-center "
        >
          {name}
        </h1>
        <p>{localTime}</p>
      </div>

      <div>
        <div className="flex flex-wrap gap-12 justify-center  items-start md:mt-6 ">
          <div className="flex flex-col justify-between text-left gap-1 ">
            <p
              onClick={toggleFahrenheit}
              className="md:text-7xl text-6xl cursor-pointer text-gray-500 dark:text-slate-50"
            >
              {toggleWeather ? `${toCelsius}\u00b0` : `${toFahrenheit}\u00b0`}
            </p>

            <p className="tracking-wider md:text-xl text-sm uppercase md:ml-1 ml-1 font-bold">
              {weatherDescription}
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon />
          </div>
        </div>
      </div>

      <div className="m-auto mb-4 flex flex-col items-center justify-center pt-10 ">
        {!toggle && (
          <p className="text-[.6em] uppercase text-neutral-500">See More</p>
        )}
        <i
          onClick={seeMoreData}
          className={`fa-solid 
          ${
            toggle ? "fa-circle-chevron-up" : "fa-circle-chevron-down"
          } fa-circle-chevron-down hover:animate-pulse text-2xl text-neutral-600 cursor-pointer dark:text-slate-50
       `}
        ></i>
      </div>

      {toggle && (
        <div className="py-6 mt-8 md:px-12 px-6 md:gap-8 gap-6 flex flex-wrap  transition-all justify-between bg-neutral-200 ">
          <div className="text-center">
            <h3 className="font-bold">Humidity </h3>
            <p className="text-xl text-gray-500 dark:text-slate-50">
              {" "}
              {humidity}&#37;
            </p>
          </div>
          <div className="text-center">
            <p className="font-bold">Feels like</p>
            <p className="text-xl text-gray-500 dark:text-slate-50">
              {feelsLikeTemp}&deg;
            </p>
          </div>

          <div className="text-center">
            <p className="font-bold">Sunrise</p>
            <p className="md:text-xl text-md text-gray-500 dark:text-slate-50">
              {localSunriseTime}
            </p>
          </div>
          <div className="text-center">
            <p className="font-bold">Sunset</p>
            <p className="md:text-xl text-md text-gray-500 dark:text-slate-50">
              {localSunsetTime}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
