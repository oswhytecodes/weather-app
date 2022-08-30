import "./index.css";
import { Header } from "./components/Navigation/Header";
import { Weather } from "./components/Weather/Weather";
import { Footer } from "./components/Navigation/Header";

function App() {
  return (
    <div className="App h-screen flex flex-col justify-between">
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
