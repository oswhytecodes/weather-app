import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  data: {};
  temp: number | null;
  desc: string;
  name: string;
  loading: boolean;
  error: string;
  cod: number | null;
  city: string;
  input: string;
};

const initialState: InitialState = {
  data: {},
  temp: null,
  desc: "",
  name: "",
  loading: false,
  error: "",
  city: "",
  cod: null,
  input: "",
};

// api call
export const fetchData = createAsyncThunk(
  "weather/fetchData",
  async (city: string) => {
    //, { rejectWithValue }
    try {
      const apiKEY = import.meta.env.VITE_APP_WEATHER_API_KEY;
      const apiURL = "https://api.openweathermap.org/data/2.5/weather";

      const url = `${apiURL}?q=${city}&appid=${apiKEY}&units=imperial`;
      const data = await fetch(url);
      const fetchedData = await data.json();

      return fetchedData;
    } catch (error) {
      console.log(error);
      // return rejectWithValue(error);
    }
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
      state.loading = true;
    }),
      builder.addCase(fetchData.fulfilled, (state, action) => {
        // if (!action.payload) {
        //   state.error = "City Not Found";
        //   state.loading = false;
        //   state.data = {};
        //   return;
        // }
        state.data = action.payload;
        state.loading = false;
        // data for the cards
        state.desc = action.payload.weather.map((x: any) => x.main);
        state.temp = action.payload.main.temp;
        state.name = action.payload.name;
        state.cod = action.payload.cod;
        state.error = action.payload.message;
      }),
      builder.addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.data = {};
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default WeatherSlice.reducer;
export const setInput = WeatherSlice.actions