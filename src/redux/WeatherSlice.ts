import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type InitialState = {
  data: {};
  temp: number | null;
  desc: "";
  name: string;
  // loading: boolean;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: boolean;
  cod: 200 | 400 | 404 | null;
  city: string;
  input: string;
};

const initialState: InitialState = {
  data: {},
  temp: null,
  desc: "",
  name: "",
  // loading: false,
  loading: "idle",
  error: false,
  city: "",
  cod: null,
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
    if (response.data.payload.cod !== 200) {
      console.log("not 200");
    }
    return response.data;
  }
);

// weather slice
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
        state.loading = "succeeded";

        // data for the cards
        state.desc = action.payload.weather.map((x: any) => x.main);
        state.temp = action.payload.main.temp;
        state.name = action.payload.name;
        state.cod = action.payload.cod;
      }),
      builder.addCase(fetchData.rejected, (state: InitialState, action) => {
        state.data = {};
        state.loading = "failed";
        state.error = true;
        state.cod = 400 || 404;
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
