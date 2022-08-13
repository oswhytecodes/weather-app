import React from "react";
import { useAppSelector } from "../../redux/hooks";
// import { fetchedData } from "../../redux/WeatherSlice";
import { Loader } from "./Loader";
import { Card } from "./Card";
import { Default } from "./Default";
import { Error } from "./Error";

export const Weather = () => {
  const { data, input, temp, desc, name, loading, error, cod } = useAppSelector(
    (state) => state.weather
  );

  // STILL WORKING ON THIS
  // default works for now
  let cardSection = <Default />;
  if (!loading && temp === null) {
    cardSection = <Loader />;
  } else if (cod === 404) {
    cardSection = <Error />;
    // and the card
  } else if (temp) {
    cardSection = <Card />;
  }

  return (
    <section
      className="shadow-xl border-[.6px] border-neutral-300
         rounded-md flex flex-col gap-10 py-12  "
    >
      {cardSection}
    </section>
  );
};
