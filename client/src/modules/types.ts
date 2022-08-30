import Assets from "./Assets.json";

export const COLORS = Assets.colors;

export type ColorType = typeof COLORS;

export type ColorKey = keyof ColorType;

// WeatherSLice
export type InitialState = {
  data: {
    main: { temp: any; feels_like: number; humidity: number };
    cod: any;
    message: string;
    weather: [{ main: ColorKey }];
    name: string;
    id: number;
    dt: number;
    sys: { sunrise: number; sunset: number };
    timezone: number;
  };
  city: string;
  loading: "idle" | "pending" | "succeeded" | "failed";
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
