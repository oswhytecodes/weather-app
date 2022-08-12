import React from "react";
import { useAppSelector } from "../../redux/hooks";

import { Loader } from "./Loader";
import { Card } from "./Card";
import { Default } from "./Default";
import { Error } from "./Error";

export const Weather = () => {
  const { data, temp, desc, name, loading, error, cod } = useAppSelector(
    (state) => state.weather
  );

  // console.log(temp, error, loading, cod);
  let cardSection = <Default />;
  // if loading
  // if (loading) cardSection = <Loader />
  // if the input value does not match the city name - send error
  // if (error) cardSection = <Error />;
  // if the temp is > 0
  if (temp && desc) cardSection = <Card />;

  return (
    <section
      className="shadow-xl border-[.6px] border-neutral-300
         rounded-md flex flex-col gap-10 py-12  "
    >
      {cardSection}
    </section>
  );
};
