import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../../redux/WeatherSlice";
import { Icon } from "./Icon";
import Clouds from "/icons/Clouds.svg";

export const Weather = () => {
  const dispatch = useDispatch();

  const weatherData = useSelector((state) => state.weather.data);
  const temp = useSelector((state) => state.weather.temp);
  const desc = useSelector((state) => state.weather.desc);
  const name = useSelector((state) => state.weather.name);
  const city = useSelector((state) => state.weather.cityName);
  // console.log("Thing I am mapping", desc);

  // Today's date from stack overflow
  var today = new Date();
  var day = String(today.getDate()).padStart(2, "0");
  var month = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var year = today.getFullYear();

  today = `${month} / ${day} / ${year} `;

  // dispatch data
  useEffect(() => {
    dispatch(fetchData(city));
  }, [dispatch, city]);

  const current = new Date();

  return (
    <section className="">
      <div
        className="shadow-xl border-[.6px]  border-neutral-300
         rounded-md flex flex-col gap-10  py-12
         "
      >
        <h1
          className="uppercase font-bold text-xl 
          tracking-wider text-center"
        >
          {name}
        </h1>

        <div className="flex flex-wrap  gap-12 justify-center items-start">
          {/* <Icon /> */}
          <img className="w-20 object-center " src={Clouds} alt="" />
          <div className="flex flex-col justify-between text-left gap-1">
            <p className="text-4xl text-gray-500 font-bold">
              {Math.floor(temp)}&deg;{" "}
            </p>
            <div>
              <p className="tracking-wide text-xs uppercase">{desc} </p>
              <p className="text-xs">{today}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
