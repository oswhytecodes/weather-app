import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../../redux/WeatherSlice";
import Sun from "../../../public/icons/Sun.svg";

export const Weather = () => {
  const dispatch = useDispatch();

  const weatherData = useSelector((state) => state.weather.data);
  const city = useSelector((state) => state.weather.cityName);

  useEffect(() => {
    dispatch(fetchData(city));
  }, [dispatch, city]);

  const current = new Date();
  console.log("Weather Component", weatherData.main.temp);

  
  return (
    <section className="">
      <div
        className="shadow-xl border-[.6px]  border-neutral-300 rounded-md py-20 px-8 gap-12 
        flex flex-wrap justify-center items-start"
      >
        <img className="w-20 object-center " src={Sun} alt="Sun" />
        <div className="flex flex-col text-left gap-2">
          <h1 className="uppercase font-bold text-xl tracking-wider">
            {weatherData.name}
          </h1>
          <p>Temperature: </p>
          <p>Description: </p>
          <p>Date: July 24, 2022</p>
        </div>
      </div>
    </section>
  );
};
