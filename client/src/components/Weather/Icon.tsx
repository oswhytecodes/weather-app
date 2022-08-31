import React from "react";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import data from "../../modules/Assets.json";

export const Icon = () => {
  const temp = useAppSelector((state) => state.weather.data.main.temp);
  const desc = useAppSelector((state) =>
    state.weather.data.weather.map((x) => x.main)
  );
  const rejected = useAppSelector((state) => state.weather.loading);
  //  return the image that matches the weather description
  const returnVal = (obj: any, val: any) => {
    let y = obj[val];
    return y;
  };
  let t = returnVal(data.icons, desc);
  return (
    <div className="WEATHER-ICON">
      <img src={t} className="md:w-32 w-24 h-fit object-center" alt={t} />
    </div>
  );
};
