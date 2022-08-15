import { useEffect } from "react";
import "./index.css";
import { Header } from "./components/Navigation/Header";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { Weather } from "./components/Weather/Weather";
import { Footer } from "./components/Navigation/Header";
import { Card } from "./components/Weather/Card";

function App() {
  return (
    <div className="App">
      <Header />
      <div>
        <SearchBar />
        <Card />
      </div>
      <Footer />
    </div>
  );
}

export default App;

// console.log(import.meta.env.VITE_APP_WEATHER_API_KEY);
