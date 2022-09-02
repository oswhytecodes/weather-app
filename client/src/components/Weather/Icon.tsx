import React from "react";
import { ICONS, IconKey, IconType } from "../../modules/types";
import { useAppSelector } from "../../redux/hooks";

const returnVal = (obj: IconType, val: IconKey) => obj[val];

export const Icon = () => {
  const temp = useAppSelector((state) => state.weather.data.main.temp);
  const weatherDescription = useAppSelector(
    (state) => state.weather.data.weather.map((desc) => desc.main)[0]
  );
  const rejected = useAppSelector((state) => state.weather.loading);
  //  return the image that matches the weather description

  let weatherIcon = returnVal(ICONS, weatherDescription);
  return (
    <div className="WEATHER-ICON">
      <img
        src={weatherIcon}
        className="md:w-32 w-24 h-fit object-center"
        alt={weatherIcon}
      />
    </div>
  );
};
