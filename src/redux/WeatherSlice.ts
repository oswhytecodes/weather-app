import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type InitialState = {
  data: {
    main: { temp: any; feels_like: number; humidity: number };
    cod: any;
    message: string;
    weather: [{ main: string }];
    name: string;
    id: number;
    // See More
    sys: { sunrise: number ; sunset: number  };
  };
  city: string;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: boolean;
  input: string;
};

const initialState: InitialState = {
  data: {
    main: { temp: null, feels_like: 0, humidity: 0 },
    message: "",
    cod: 0,
    weather: [{ main: "" }],
    name: "",
    id: 0,
    sys: { sunrise: 0, sunset: 0 },
  },
  city: "",
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
