import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  data: {};
  temp: number;
  desc: string;
  name: string;
  loading: boolean;
  error: string;
  cod: number,
  cityName: string;
};

const initialState: InitialState = {
  data: {},
  temp: 0,
  desc: "",
  name: "",
  loading: false,
  error: "",
  cityName: "",
  cod: 0,
};

// api call
export const fetchData = createAsyncThunk(
  "weather/fetchData",
  async (cityName: string, { rejectWithValue }) => {
    //
    try {
      const apiKEY = import.meta.env.VITE_APP_WEATHER_API_KEY;
      const apiURL = "https://api.openweathermap.org/data/2.5/weather";

      const url = `${apiURL}?q=${cityName}&appid=${apiKEY}&units=imperial`;
      const data = await fetch(url);
      const fetchedData = await data.json();
      return fetchedData;

    } catch (error) {       
        console.log(rejectWithValue(error));
      
    }
  }
);

// weather slice
const WeatherSlice = createSlice({
  name: "weather",
  initialState: initialState,
  reducers: {
    inputValue: (state, action) => {
      
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.desc = action.payload.weather.map((x: any) => x.main);
        state.temp = action.payload.main.temp;
        state.name = action.payload.name;
        state.error = "";
        state.cod = action.payload.cod
      }),
      builder.addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default WeatherSlice.reducer;
