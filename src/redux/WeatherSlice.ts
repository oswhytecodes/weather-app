import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  data: {};
  temp: number | null;
  desc: "";
  name: string;
  // loading: boolean;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: boolean;
  cod: number | null;
  city: string;
  input: string;
};

const initialState: InitialState = {
  data: {},
  temp: null,
  desc: "",
  name: "",
  // loading: false,
  loading: 'idle',
  error: false,
  city: "",
  cod: null,
  input: "",
};

// api call
export const fetchData = createAsyncThunk(
  "weather/fetchData",
  async (city: string) => {
    //, { rejectWithValue }
    const apiKEY = import.meta.env.VITE_APP_WEATHER_API_KEY;
    const apiURL = "https://api.openweathermap.org/data/2.5/weather";

    const url = `${apiURL}?q=${city}&appid=${apiKEY}&units=imperial`;
    const data = await fetch(url);
    const fetchedData = await data.json();
    return fetchedData;
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
      state.loading = 'pending';
    }),
      builder.addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = 'succeeded';

        // data for the cards
        state.desc = action.payload.weather.map((x: any) => x.main);
        state.temp = action.payload.main.temp;
        state.name = action.payload.name;
        state.cod = action.payload.cod;
        state.error = action.payload.message;
      }),
      builder.addCase(fetchData.rejected, (state, action) => {
        state.loading = 'failed';
        state.data = {};
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
