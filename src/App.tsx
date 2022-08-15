import "./index.css";
import { Header } from "./components/Navigation/Header";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { Weather } from "./components/Weather/Weather";
import { Footer } from "./components/Navigation/Header";
import { Card } from "./components/Weather/Card";

function App() {
  return (
    <div className="App">
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
