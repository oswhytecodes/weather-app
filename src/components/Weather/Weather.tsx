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

  // Today's date from stack overflow
  let today: Date = new Date();
  let day = String(today.getDate()).padStart(2, "0");
  let month = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let year = today.getFullYear();
  let todayDate = `${month} / ${day} / ${year} `;

  // dispatch data
  useEffect(() => {
    if (temp !== 0) {
      dispatch(fetchData(city));
    }
  }, [dispatch, city]);

  // return a new image
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
          {name}
        </h1>
        {/* weather conditional */}
        {temp === 0 ? (
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
              <p className="text-4xl text-gray-500 pb-4 ">
                {Math.floor(temp)}&deg;{" "}
              </p>
              <div>
                <p className="tracking-wider text-xs uppercase font-bold">
                  {desc}{" "}
                </p>
                <p className="text-xs">{todayDate}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
