import React from "react";
import { useSelector } from "react-redux";
import { fetchData } from "../../redux/WeatherSlice";
import data from "../../Assets.json";

export const Icon = () => {
  const desc = useSelector((state) => state.weather.desc);
  //  return the image that matches the weather description
  const returnVal = (obj, val) => {
    let y = obj[val];
    return y;
  };
  let t = returnVal(data.icons, desc);
  return (
    <div>
      <img src={t} className="w-28 object-center" alt={t} />
    </div>
  );
};
