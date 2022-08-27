import React from "react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchData } from "../../redux/WeatherSlice";
import { Icon } from "./Icon";

export const Card = () => {
  const dispatch = useAppDispatch();
  // weather data
  const { temp, humidity, feels_like } = useAppSelector(
    (state) => state.weather.data.main
  );
  const desc = useAppSelector((state) =>
    state.weather.data.weather.map((x) => x.main)
  );
  const name = useAppSelector((state) => state.weather.data.name);
  const { city, input, loading } = useAppSelector((state) => state.weather);
  const { sunrise, sunset } = useAppSelector((state) => state.weather.data.sys);

  // return temp with degree // not sure why temp wont bypass the type
  let weatherTemp = Math.floor(temp);
  let feelsLikeTemp = Math.floor(feels_like);

  // Today's Data and Time
  let today: Date = new Date();
  let day = String(today.getDate()).padStart(2, "0");
  let month = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let year = today.getFullYear();
  let todayDate = `${month} / ${day} / ${year} `;
  var todayTime = new Date();
  var time = todayTime.getHours() + ":" + todayTime.getMinutes();

  // convert sunrise time
  let sunriseDate = new Date(sunrise * 1000);
  let sunriseDateX = sunriseDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  // convert sunset time
  let sunsetDate = new Date(sunset * 1000);
  let sunsetDateX = sunsetDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  let dayTime: string;
  let nightTime: string;

  //DATA FOR THE CARDS
  useEffect(() => {
    if (name !== input && loading === "pending") {
      dispatch(fetchData(city));
    }
  }, [dispatch, city]);

  // See more feature
  const [toggle, setToggle] = useState(false);
  const seeMoreData = () => {
    setToggle((prev) => !prev);
  };
  return (
    <div className="pb-8 bg-slate-50 transition-all">
      <div className="flex  justify-between bg-neutral-200 px-4 py-2 md:mb-16 mb-8">
        <h1
          className="uppercase font-bold text-xl 
          tracking-wider text-center "
        >
          {name}
        </h1>
        <p>{time}</p>
      </div>

      <div>
        <div className="flex flex-wrap gap-12 justify-center items-center">
          <div className="flex flex-col justify-between text-left gap-1">
            <p className="md:text-8xl text-6xl text-gray-500 dark:text-slate-50 pb-4 ">
              {weatherTemp}&deg;
            </p>

            {/* <div><p className="text-xs">{todayDate}</p></div> */}
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon />
            <p className="tracking-wider text-xs uppercase font-bold">{desc}</p>
          </div>
        </div>
      </div>

      <div className="m-auto flex items-center justify-center gap-4 pt-10 ">
        {!toggle && <p>See More</p>}
        <i
          onClick={seeMoreData}
          className={`fa-solid ${
            toggle ? "fa-circle-chevron-up" : "fa-circle-chevron-down"
          } fa-circle-chevron-down hover:animate-pulse text-2xl text-neutral-600 cursor-pointer dark:text-slate-50
       `}
        ></i>
      </div>

      {toggle && (
        <div className="pt-6 md:px-24 px-6 flex flex-col transition-all justify-between">
          <div className="flex justify-between">
            <div className="text-center">
              <h3 className="font-bold">Humidity </h3>
              <p className="text-2xl text-gray-500 dark:text-slate-50">
                {" "}
                {humidity}&#37;
              </p>
            </div>
            <div className="text-center">
              <p className="font-bold">Feels like</p>
              <p className="text-2xl text-gray-500 dark:text-slate-50">
                {feelsLikeTemp}&deg;
              </p>
            </div>
          </div>
          <div className="pt-8 flex justify-between ">
            <div className="text-center">
              <p className="font-bold">Sunrise</p>
              <p className="text-sm text-gray-500 dark:text-slate-50">
                {sunriseDateX}
              </p>
            </div>
            <div className="text-center">
              <p className="font-bold">Sunset</p>
              <p className="text-sm text-gray-500 dark:text-slate-50">
                {sunsetDateX}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
