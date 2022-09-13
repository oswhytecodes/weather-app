import "./index.css";
import { useEffect } from "react";
import { Header, Footer } from "./components/Navigation/Header";
import { Weather } from "./components/Weather/Weather";
import DayBG from "/images/bgDay.jpg";
function App() {


  return (
    <div
      style={{ backgroundImage: `url(${DayBG})` }}
      className="App bg-no-repeat bg-cover h-screen flex flex-col justify-between"
    >
      <div className="flex flex-col justify-start">
        <Header />
        <div className="mx-3 mt-6">
          <Weather />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
