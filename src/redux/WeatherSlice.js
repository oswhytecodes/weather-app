import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  temp: "",
  desc: "",
  name: "",
  loading: false,
  error: "",
  cityName: "Miami",
};

// api call
export const fetchData = createAsyncThunk(
  "weather/fetchData",
  async (cityName, { rejectWithValue }) => {
    //
    try {
      const apiKEY = import.meta.env.VITE_APP_WEATHER_API_KEY;
      const apiURL = "https://api.openweathermap.org/data/2.5/weather";

      const url = `${apiURL}?q=${cityName}&appid=${apiKEY}&units=imperial`;
      const data = await fetch(url);
      const json = await data.json();
      const fetchedData = json;
      return fetchedData;
    } catch (error) {
      // console.log(error);
      // return error
      return rejectWithValue(error);
    }
  }
);

// weather slice
const WeatherSlice = createSlice({
  name: "weather",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [fetchData.pending]: (state) => {
      state.loading = true;
    },
    [fetchData.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.desc = action.payload.weather.map((x) => x.main);
      state.temp = action.payload.main.temp;
      state.name = action.payload.name;
      state.error = "";
    },
    [fetchData.rejected]: (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error;
    },
  },
});

export default WeatherSlice.reducer;
