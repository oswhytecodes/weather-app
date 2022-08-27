import React from "react";
import { useAppSelector } from "../../redux/hooks";
import { Loader } from "./Loader";
import { Card } from "./Card";
import { Default } from "./Default";
import { Error } from "./Error";

export const Weather = () => {
  const temp = useAppSelector((state) => state.weather.data.main.temp);
  const { name, cod } = useAppSelector((state) => state.weather.data);
  const { loading, error, data, input } = useAppSelector(
    (state) => state.weather
  );

  let cardSection = <Default />;

  if (loading === "pending" && !error) cardSection = <Loader />;

  if (data.id && loading === "idle" && error === false) cardSection = <Card />;

  if (error) cardSection = <Error />;
  return (
    <section
      className="WEATHER-CONTAINER shadow-xl border-[.2px] border-neutral-300 dark:bg-slate-100 dark:text-slate-500
         rounded-md flex-col gap-10 mt-4 mb-12"
    >
      <div className=""> {cardSection}</div>
    </section>
  );
};
