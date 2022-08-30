import { useAppSelector } from "./hooks";

export const { temp, humidity, feels_like } = useAppSelector(
  (state) => state.weather.data.main
);

export const weatherDescription = useAppSelector((state) =>
  state.weather.data.weather.map((x) => x.main)
);
export const timezone = useAppSelector((state) => state.weather.data.timezone);
export const name = useAppSelector((state) => state.weather.data.name);
export const { city, input, loading } = useAppSelector((state) => state.weather);
export const { sunrise, sunset } = useAppSelector((state) => state.weather.data.sys);
