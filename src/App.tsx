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
      <div className="flex flex-col justify-start mx-2 ">
      <SearchBar />
      <Weather />
      </div>
      <Footer />
    </div>
  );
}

export default App;

