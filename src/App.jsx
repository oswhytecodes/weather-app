import { useEffect } from "react";
import "./index.css";
import { Header } from "./components/Header/Header";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { Weather } from "./components/Weather/Weather";
import { Footer } from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <div>
        <SearchBar />
        <Weather />
      </div>
      <Footer />
    </div>
  );
}

export default App;

// console.log(import.meta.env.VITE_APP_WEATHER_API_KEY);
