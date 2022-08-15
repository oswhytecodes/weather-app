import React from 'react'
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchData } from "../../redux/WeatherSlice";


export const Error = () => {
    const cod = useAppSelector(state => state.weather.cod)
    const error = useAppSelector((state) => state.weather.error);
  return <div className="flex justify-center items-center">Try again</div>;
}
