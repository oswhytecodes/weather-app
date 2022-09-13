import Assets from "./Assets.json";

export const COLORS = Assets.colors;
export const ICONS = Assets.icons;

export type ColorType = typeof COLORS;
export type ColorKey = keyof ColorType;

export type IconType = typeof ICONS;
export type IconKey = keyof IconType;

// WeatherSLice
export type InitialState = {
  data: {
    main: { temp: any; feels_like: number; humidity: number };
    cod: any;
    message: string;
    weather: [{ main: ColorKey | IconKey }];
    name: string;
    id: number;
    dt: number;
    sys: { sunrise: number; sunset: number };
    timezone: number;
    error: string
  };
  city: string;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: boolean;
  input: string;
  response: number;
};

export type cityCodeState = {
  cityname: string;
  loading: string;
  error: boolean;
  input: string;
};

// Search Bar
export type InputValue = {
  value: string;
};
export type SubmitValue = {
  handleSubmit: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
