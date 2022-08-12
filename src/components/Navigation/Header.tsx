import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import data from "../../Assets.json";
import { fetchData } from "../../redux/WeatherSlice";

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
  const rejected = useAppSelector((state) => state.weather.loading);

  if (desc === "" ) {
    t = defaultColor;
  } else {
    t = returnVal(data.colors, desc);
  }
  // const refresh = () => {
  //   window.location.reload(false);
  // };
  return (
    <header
      // onClick={refresh}
      style={{ backgroundColor: `${t}` }}
      className="App-header cursor-pointer px-6 py-4 flex justify-between items-center hover:bg-opacity-10 "
    >
      <p
        className="text-lg uppercase font-bold 
       tracking-widest   text-neutral-50"
      >
        rainorshine
      </p>
      <p className="text-neutral-50">click to refresh</p>
    </header>
  );
};

export const Footer = () => {
  const desc = useAppSelector((state) => state.weather.desc);
  const rejected = useAppSelector((state) => state.weather.loading);

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
