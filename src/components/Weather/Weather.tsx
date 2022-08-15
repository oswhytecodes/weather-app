import React from "react";
import { useAppSelector } from "../../redux/hooks";
// import { fetchedData } from "../../redux/WeatherSlice";
import { Loader } from "./Loader";
import { Card } from "./Card";
import { Default } from "./Default";
import { Error } from "./Error";
export const Weather = () => {
  const temp = useAppSelector((state) => state.weather.data.main.temp);
  const loading = useAppSelector((state) => state.weather.loading);
  const error = useAppSelector((state) => state.weather.error);
  const data = useAppSelector((state) => state.weather.data);
  const input = useAppSelector((state) => state.weather.input);
  const name = useAppSelector((state) => state.weather.data.name);
  const cod = useAppSelector((state) => state.weather.data.cod);

  let cardSection = <Card />;
  // if (temp) cardSection = <Card />;

  return (
    <section
      className="shadow-xl border-[.6px] border-neutral-300
         rounded-md flex flex-col gap-10 py-12  "
    >
      {cardSection}
    </section>
  );
};
