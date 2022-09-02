import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchData } from "../../redux/WeatherSlice";

export const Error = () => {
  const cod = useAppSelector((state) => state.weather.data.cod);
  const error = useAppSelector((state) => state.weather.error);
  return (
    <div className="flex flex-col justify-center items-center py-16 px-16 ">
      <p className="text-3xl"> City Not Found.</p>
      <p>Try again.</p>
    </div>
  );
};
