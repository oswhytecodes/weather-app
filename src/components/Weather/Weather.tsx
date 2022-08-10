import React from "react";
import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// typescript refactor
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchData } from "../../redux/WeatherSlice";
import { Icon } from "./Icon";
import prev from "/images/prev.svg";

export const Weather = () => {
  const dispatch = useAppDispatch();

  const weatherData = useAppSelector((state) => state.weather.data);
  const temp = useAppSelector((state) => state.weather.temp);
  const desc = useAppSelector((state) => state.weather.desc);
  const name = useAppSelector((state) => state.weather.name);
  const city = useAppSelector((state) => state.weather.cityName);
  const rejected = useAppSelector((state) => state.weather.loading);
  const status = useAppSelector((state) => state.weather.cod);
console.log(status)
  // Today's date from stack overflow
  let today: Date = new Date();
  let day = String(today.getDate()).padStart(2, "0");
  let month = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let year = today.getFullYear();
  let todayDate = `${month} / ${day} / ${year} `;
console.log(rejected)
  // dispatch data
  useEffect(() => {
    if (temp !== 0) {
      dispatch(fetchData(city));
    }
  }, [dispatch, city]);

  // return temp with degree
let weatherTemp = Math.floor(temp);
  
  return (
    <section className="">
      <div
        className="shadow-xl border-[.6px]  border-neutral-300
         rounded-md flex flex-col gap-10 py-12
         "
      >
        <h1
          className="uppercase font-bold text-xl 
          tracking-wider text-center"
        >
          {rejected  ? "try again" : name}
        </h1>
        {/* weather conditional */}
        {temp === 0 || rejected ? (
          <div className="flex justify-center items-center">
            <img
              src={prev}
              className="w-40 text-center object-cover"
              alt={prev}
            />
          </div>
        ) : (
          <div className="flex flex-wrap  gap-12 justify-center items-center">
            {/* <Icon /> */}
            <Icon />
            <div className="flex flex-col justify-between text-left gap-1">
              {rejected ? (
                ""
              ) : (
                <p className="text-4xl text-gray-500 pb-4 ">
                  {weatherTemp}&deg;
                </p>
              )}

              <div>
                <p className="tracking-wider text-xs uppercase font-bold">
                  {rejected ? "" : desc}{" "}
                </p>
                <p className="text-xs">{rejected ? " " : todayDate}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
