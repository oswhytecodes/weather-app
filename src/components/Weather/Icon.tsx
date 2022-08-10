import React from "react";
// import { useSelector } from "react-redux";
// typescript refactor
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchData } from "../../redux/WeatherSlice";
import data from "../../Assets.json";

import Preview from "/icons/Preview.svg";

export const Icon = () => {
  const desc = useAppSelector((state) => state.weather.desc);
  const temp = useAppSelector((state) => state.weather.temp);

  //  return the image that matches the weather description
  const returnVal = (obj: any, val: string) => {
    let y = obj[val];
    return y;
  };
  let t = returnVal(data.icons, desc);
  return (
    <div>
      <img src={temp === 0 ? Preview : t} className="w-28 h-fit object-center" alt={t} />
    </div>
  );
};
