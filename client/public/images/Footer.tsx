import React from "react";
// import { useSelector } from "react-redux";
import data from "../../src/Assets.json";
import { useAppDispatch, useAppSelector } from "../../src/redux/hooks";

import { fetchData } from "../../src/redux/WeatherSlice";

export const Footer = () => {
  const desc = useAppSelector((state) => state.weather.desc);
  const colors = data.colors;

  // return the color that matches the weather description
  const returnVal = (obj: any, val: any) => {
    let y = obj[val];
    // console.log(obj, val)
    return y;
  };
  let t = returnVal(data.colors, desc);

  return (
    <footer style={{ backgroundColor: `${t}` }} 
    className="pb-[1em]"
    >
      
      <p
        className="text-md uppercase 
      text-left font-bold py-4 tracking-widest px-6
       text-neutral-50"
      >
        rainorshine
      </p>
    </footer>
  );
};
