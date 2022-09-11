import { useAppSelector } from "../../redux/hooks";
import { Loader } from "./Loader";
import { Card } from "./Card";
import { Default } from "./Default";
import { Error } from "./Error";

export const Weather = () => {
  const { loading, error, data } = useAppSelector((state) => state.weather);

  let cardSection = <Default />;

  if (loading === "pending" && !error) cardSection = <Loader />;

  if (data.id && loading === "idle" && error === false) cardSection = <Card />;

  if (error) cardSection = <Error />;
  return (
    <section
      className="WEATHER-CONTAINER  shadow-xl border-[.2px] border-neutral-300 bg-slate-100 dark:text-slate-500
         rounded-md flex-col gap-10 mt-4 mb-12"
    >
      <div> {cardSection}</div>
    </section>
  );
};
