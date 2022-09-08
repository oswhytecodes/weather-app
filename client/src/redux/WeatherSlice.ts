import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { InitialState } from "../modules/types";

const initialState: InitialState = {
  data: {
    main: { temp: null, feels_like: 0, humidity: 0 },
    message: "",
    cod: 0,
    weather: [{ main: "default" }],
    name: "",
    id: 0,
    dt: 0,
    sys: { sunrise: 0, sunset: 0 },
    timezone: 0,
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
    const apiURL = `http://weatherapp-env.eba-9ekcmhwg.us-east-1.elasticbeanstalk.com/${city}`;
    // const apiURL = `api/${city}`;
    const response = await axios.get(apiURL);
    if (response.data.cod !== 200) {
      return rejectWithValue(response.data.message);
    }
    return response.data;
  }
);
export const fetchCityCode = createAsyncThunk(
  "weather/fetchData",
  async (citycode: string, { rejectWithValue }) => {
    const apiURL = `http://weatherapp-env.eba-9ekcmhwg.us-east-1.elasticbeanstalk.com/${citycode}`;
    // const apiURL = `api/${citycode}`;
    const response = await axios.get(apiURL);
    if (!response) {
      console.log("no worky")
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
