import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type InitialState = {
  data: {
    main: { temp: any };
    cod: any;
    message: string;
    weather: [{ main: string }];
    name: string;
  };
  city: string;
  // loading: boolean;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: boolean;
  input: string;
};

const initialState: InitialState = {
  data: {
    main: { temp: null },
    message: "",
    cod: 0,
    weather: [{ main: "" }],
    name: "",
  },
  city: "",
  // loading: false,
  loading: "idle",
  error: false,
  input: "",
};

// axios
export const fetchData = createAsyncThunk(
  "weather/fetchData",
  async (city: string, { rejectWithValue }) => {
    const apiKEY = import.meta.env.VITE_APP_WEATHER_API_KEY;
    const apiURL = "https://api.openweathermap.org/data/2.5/weather";
    const url = `${apiURL}?q=${city}&appid=${apiKEY}&units=imperial`;
    const response = await axios.get(url);
    if (response.data.cod !== 200) {
      return rejectWithValue(response.data.message);
    }
    return response.data;
  }
);
// Weather Slice
const WeatherSlice = createSlice({
  name: "weather",
  initialState: initialState,
  reducers: {
    setInput: (state: InitialState, action: PayloadAction<string>) => {
      state.input = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.loading = "pending";
    }),
      builder.addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = "idle";
        state.error = false;
      }),
      builder.addCase(fetchData.rejected, (state: InitialState, action) => {
        state.loading = "idle";
        state.error = true;
      });
  },
});

export default WeatherSlice.reducer;
export const { setInput } = WeatherSlice.actions;

// if (!action.payload) {
//   // state.error = true;
//   state.loading = false
//   state.data = {}
//   return
// }

// api call async await
// export const fetchData = createAsyncThunk(
//   "weather/fetchData",
//   async (city: string, { rejectWithValue }) => {

//     //
//     const apiKEY = import.meta.env.VITE_APP_WEATHER_API_KEY;
//     const apiURL = "https://api.openweathermap.org/data/2.5/weather";

//     const url = `${apiURL}?q=${city}&appid=${apiKEY}&units=imperial`;
//     const data = await fetch(url);
//     const fetchedData = await data.json();
//     return fetchedData;
//   }
// );

// api call async await
// export const fetchData = createAsyncThunk(
//   "weather/fetchData",
//   async (city: string, { rejectWithValue }) => {
//     //
//     const apiKEY = import.meta.env.VITE_APP_WEATHER_API_KEY;
//     const apiURL = "https://api.openweathermap.org/data/2.5/weather";

//     const url = `${apiURL}?q=${city}&appid=${apiKEY}&units=imperial`;
//     const data = await fetch(url);
//     const fetchedData = await data.json();

//     if (fetchedData.payload.cod !== 200) {
//       rejectWithValue("Not 200");
//     } else {
//     return fetchedData;}
//   }
// );

// data for the cards
// state.desc = action.payload.weather.map((x: any) => x.main);
// state.temp = action.payload.main.temp;
// state.name = action.payload.name;
// state.cod = action.payload.cod;
// state.message = action.payload.message
