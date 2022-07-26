import React from "react";
// import { useState } from "react";
import { useSelector } from "react-redux";
import data from "../../Assets.json";
import { fetchData } from "../../redux/WeatherSlice";

export const Header = () => {
  const desc = useSelector((state) => state.weather.desc);
  const colors = data.colors;
  // return the color that matches the weather description
  // const [color, setColor] = useState("");
  const returnVal = (obj, val) => {
    let y = obj[val];
    return y
  };
  let t = returnVal(data.colors, desc);

  return (
    <header style={{ backgroundColor: `${t}` }} className="App-header">
      <p
        className="text-md uppercase text-right font-bold py-4
       tracking-wider px-6 text-neutral-100"
      >
        rainorshine
      </p>
    </header>
  );
};
