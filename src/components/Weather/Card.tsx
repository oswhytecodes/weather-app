import React from "react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchData } from "../../redux/WeatherSlice";
import { Icon } from "./Icon";
import { Default } from "./Default";

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

  // Today's date from stack overflow
  let today: Date = new Date();
  let day = String(today.getDate()).padStart(2, "0");
  let month = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let year = today.getFullYear();
  let todayDate = `${month} / ${day} / ${year} `;

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

  // DATA FOR THE CARDS
  useEffect(() => {
    if (name !== input && loading === "pending") {
      dispatch(fetchData(city));
    }
  }, [dispatch, city]);

  // See more feature
  const [toggle, setToggle] = useState(false);
  // const [seeMore, setSeeMore] = useState(true)
  const seeMoreData = () => {
    setToggle((prev) => !prev);
    // console.log(toggle);
  };
  return (
    <div className="py-8 px-4 transition-all">
      <div className="">
        <h1
          className="uppercase font-bold text-xl 
          tracking-wider text-center mb-8"
        >
          {name}
        </h1>

        <div className="flex flex-wrap gap-12 justify-center items-center">
          <Icon />
          <div className="flex flex-col justify-between text-left gap-1">
            <p className="text-4xl text-gray-500 pb-4 ">{weatherTemp}&deg;</p>

            <div>
              <p className="tracking-wider text-xs uppercase font-bold">
                {desc}
              </p>
              <p className="text-xs">{todayDate}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="m-auto flex items-center justify-center">
        {toggle ? (
          <i
            onClick={seeMoreData}
            className="fa-solid fa-circle-chevron-up animate-pulse pt-10 text-2xl text-neutral-600 cursor-pointer
       "
          ></i>
        ) : (
          <i
            onClick={seeMoreData}
            className="fa-solid fa-circle-chevron-down animate-pulse pt-10 text-2xl text-neutral-600 cursor-pointer
       "
          ></i>
        )}
      </div>

      {toggle ? (
        <div className="pt-6 px-6 flex flex-col transition-all justify-between">
          <div className="flex justify-between">
            <div className="text-center">
              <h3 className="font-bold">Humidity </h3>
              <p className="text-2xl text-gray-500"> {humidity}&#37;</p>
            </div>
            <div className="text-center">
              <p className="font-bold">Feels like</p>
              <p className="text-2xl text-gray-500">{feelsLikeTemp}&deg;</p>
            </div>
          </div>
          <div className="pt-8 flex justify-between ">
            <div className="text-center">
              <p className="font-bold">Sunrise</p>
              <p className="text-sm text-gray-500">{sunriseDateX}</p>
            </div>
            <div className="text-center">
              <p className="font-bold">Sunset</p>
              <p className="text-sm text-gray-500">{sunsetDateX}</p>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
{
  /* <i class="fa-regular fa-circle-caret-down"></i>;
<i class="fa-solid fa-circle-arrow-down"></i>; */
}
