import React from "react";
import { useSelector } from "react-redux";
import data from "../../Assets.json";
import { fetchData } from "../../redux/WeatherSlice";

export const Footer = () => {
  const desc = useSelector((state) => state.weather.desc);
  const colors = data.colors;
  
  // return the color that matches the weather description
  const returnVal = (obj, val) => {
    let y = obj[val];
    return y;
  };
  let t = returnVal(data.colors, desc);

  return (
    <footer style={{ backgroundColor: `${t}` }}>
      {" "}
      <p
        className="text-sm uppercase 
      text-left font-bold py-4 tracking-wider px-6
       text-neutral-100"
      >
        rainorshine
      </p>
    </footer>
  );
};
