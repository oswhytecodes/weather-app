import React from "react";
// typescript refactor
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import data from "../../Assets.json";
import { fetchData } from "../../redux/WeatherSlice";
// import { useState } from "react";
// import { useSelector } from "react-redux";

const colors = data.colors;
let defaultColor = colors.default;
// return the color that matches the weather description
// const [color, setColor] = useState("");
const returnVal = (obj: any, val: any) => {
  let y = obj[val];
  return y;
};
let t: string;
export const Header = () => {
  const desc = useAppSelector((state) => state.weather.desc);
  
  if (desc === "") {
    t = defaultColor;
  } else {
    t = returnVal(data.colors, desc);
  }
  return (
    <header style={{ backgroundColor: `${t}` }} className="App-header">
      <p
        className="text-lg uppercase text-right font-bold py-4
       tracking-widest px-6 text-neutral-50"
      >
        rainorshine
      </p>
    </header>
  );
};

export const Footer = () => {
const desc = useAppSelector((state) => state.weather.desc);
 if (desc === "") {
   t = defaultColor;
 } else {
   t = returnVal(data.colors, desc);
 }
  return (
    <footer style={{ backgroundColor: `${t}` }} className="pb-[1em]">
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
