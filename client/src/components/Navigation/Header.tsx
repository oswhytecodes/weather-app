import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Assets from "../../Assets.json";
import { fetchData } from "../../redux/WeatherSlice";

const colors = Assets.colors;
let defaultColor = colors.default;
// return the color that matches the weather description
const returnVal = (obj: any, val: any) => {
  let y = obj[val];
  return y;
};
let t: string = "#C0B3BC";

export const Header = () => {
  const desc = useAppSelector((state) =>
    state.weather.data.weather.map((desc) => desc.main)
  );
  const temp = useAppSelector((state) => state.weather.data.main.temp);
  const { loading, error, data, input } = useAppSelector(
    (state) => state.weather
  );
  const { cod, name } = useAppSelector((state) => state.weather.data);

  if (loading && !temp) {
    t = "#C0B3BC";
  } else if (desc[0] !== "default") {
    t = returnVal(Assets.colors, desc);
  }
  const refresh = () => {
    window.location.reload();
  };

  
  return (
    <header
      style={{ backgroundColor: `${t}` }}
      className="HEADER cursor-pointer px-6 py-4 flex justify-between items-center hover:bg-opacity-10 "
    >
      <div className="flex">
        <p
          className="text-lg uppercase font-bold 
        tracking-widest text-neutral-200 dark:text-neutral-900 pr-4"
        >
          rainorshine
        </p>
        <button onClick={refresh}>
          <i
            className="fa-solid fa-arrow-rotate-right text-neutral-50 text-xl
      animate-pulse hover:animate-spin
      "
          ></i>
        </button>
      </div>

      {/* <button className="cursor-pointer text-2xl" onClick={handleSwitch}>
        {theme === "dark" ? (
          <i className="fa-solid fa-moon animate-pulse"></i>
        ) : (
          <i className="fa-solid fa-sun animate-pulse"></i>
        )}
      </button> */}
    </header>
  );
};

export const Footer = () => {
  const desc = useAppSelector((state) =>
    state.weather.data.weather.map((desc) => desc.main)
  );
  const temp = useAppSelector((state) => state.weather.data.main.temp);
  const { loading, error, data, input } = useAppSelector(
    (state) => state.weather
  );
  const { cod, name } = useAppSelector((state) => state.weather.data);

  if (loading && !temp) {
    t = "#C0B3BC";
  } else if (desc[0] !== "default") {
    t = returnVal(Assets.colors, desc);
  }
  return (
    <footer style={{ backgroundColor: `${t}` }} className="FOOTER pb-[1em] ">
      <p
        className=" text-md uppercase 
      text-left font-bold py-4 tracking-widest px-6
       text-neutral-50"
      >
        rainorshine
      </p>
    </footer>
  );
};
