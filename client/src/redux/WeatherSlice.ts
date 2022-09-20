import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { InitialState, cityCodeState } from "../modules/types";

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
    error: "",
  },
  city: "",
  loading: "idle",
  error: false,
  input: "",
  response: 200 | 204 | 404 | 429 | 500,
};

const cityCodeState: cityCodeState = {
  cityname: "",
  loading: "",
  error: false,
  input: "",
};

// axios
export const fetchData = createAsyncThunk(
  "weather/fetchData",
  async (city: string, { rejectWithValue }) => {
    // const apiURL = `http://localhost:8000/${city}`;
    // const apiURL = `http://weatherapp-env.eba-9ekcmhwg.us-east-1.elasticbeanstalk.com/${city}`;
    const apiURL = `api/${city}`;
    const response = await axios.get(apiURL);

    if (response.data.cod !== 200) {
      return rejectWithValue(response.data.message);
    } else {
      return response.data;
    }
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
      state.response = 200;
    }),
      builder.addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = "idle";
        state.error = false;
      }),
      builder.addCase(fetchData.rejected, (state: InitialState, action) => {
        state.loading = "idle";
        state.error = true;
        state.response = 204 | 404 || 429 || 500;
      });
  },
});

export default WeatherSlice.reducer;
export const { setInput } = WeatherSlice.actions;


