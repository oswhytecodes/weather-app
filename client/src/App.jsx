import "./index.css";
import { Header } from "./components/Navigation/Header";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { Weather } from "./components/Weather/Weather";
import { Footer } from "./components/Navigation/Header";

import { useState, useEffect } from "react";
function App() {
  return (
    <div className="App h-screen flex flex-col justify-between">
      <div className="flex flex-col justify-start">
        <Header />
        <div className="mx-3 mt-6">
          <SearchBar />
          <Weather />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;

// // Dark Mode
// const [theme, setTheme] = useState("");
// useEffect(() => {
//   if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
//     setTheme("dark");
//   } else {
//     setTheme("light");
//   }
// }, []);

// useEffect(() => {
//   if (theme === "dark") {
//     document.documentElement.classList.add("dark");
//   } else {
//     document.documentElement.classList.remove("dark");
//   }
// }, []);

// const handleSwitch = () => {
//   setTheme(theme === "dark" ? "light" : "dark");
//   console.log("hey");
// };
