import React from 'react'
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchData } from "../../redux/WeatherSlice";


export const Error = () => {
    const cod = useAppSelector(state => state.weather.data.cod)
    const error = useAppSelector((state) => state.weather.error);
  return (
    <div className="flex justify-center items-center py-16 px-16 ">
      City Not Found. Try again.
    </div>
  );
}
