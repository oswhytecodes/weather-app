import { useAppSelector } from "../../redux/hooks";
import { ColorKey, ColorType, COLORS } from "../../modules/types";
import LogoIcon from "/icons/cloud-sun-rain.svg";
import { SearchBar } from "../SearchBar/SearchBar";
// import dateFormat, { masks } from "dateformat";

// HEADER AND FOOTER COMPONENT
// return the color that matches the weather description
const returnVal = (obj: ColorType, val: ColorKey) => obj[val];

export const Header = () => {
  const loading = useAppSelector((state) => state.weather);
  const temperature = useAppSelector((state) => state.weather.data.main.temp);
  const weatherDescription = useAppSelector(
    (state) => state.weather.data.weather.map((desc) => desc.main)[0]
  );

  // refresh page
  const refresh = () => {
    window.location.reload();
  };

  return (
    <header
      style={{
        backgroundColor:
          weatherDescription !== "default"
            ? returnVal(COLORS, weatherDescription)
            : "#C0B3BC",
      }}
      className="HEADER cursor-pointer px-6 py-4 gap-4 flex justify-between items-center hover:bg-opacity-10 "
    >
      <div className="flex">
        <div className="hidden md:block">
          <p
            onClick={refresh}
            className="uppercase font-bold tracking-widest text-neutral-200 text-3xl dark:text-neutral-900 pr-4"
          >
            rainorshine
          </p>
        </div>
        <button>
          <img
            onClick={refresh}
            className="block md:hidden"
            src={LogoIcon}
            alt="Rainorshine Logo"
          />
        </button>
      </div>
      <div>
        <SearchBar />
      </div>
    </header>
  );
};
// FOOTER
export const Footer = () => {
  const loading = useAppSelector((state) => state.weather);
  const temperature = useAppSelector((state) => state.weather.data.main.temp);
  const weatherDescription = useAppSelector(
    (state) => state.weather.data.weather.map((desc) => desc.main)[0]
  );
  const now = new Date();
  return (
    <footer
      style={{
        backgroundColor:
          weatherDescription !== "default"
            ? returnVal(COLORS, weatherDescription)
            : "#C0B3BC",
      }}
      className="FOOTER py-3 flex flex-col justify-center items-center"
    >
      {/* <div className="text-center text-xs">{todaysDate}</div> */}

      <div className="flex text-2xl gap-4 p-2 pt-3">
        <a
          target="_blank"
          href="https://github.com/oswhytecodes"
          aria-label="github link"
        >
          {" "}
          <i
            className="fa-brands fa-github  
             hover:text-neutral-800 text-[#e5e5e5] hover:scale-150 hover:animate-pulse transition"
          ></i>
        </a>
        <a
          target="_blank"
          href="https://www.linkedin.com/in/orincywhyte/"
          aria-label="linkedin link"
        >
          {" "}
          <i
            className="fa-brands fa-linkedin-in
            hover:text-neutral-800 text-[#e5e5e5] hover:scale-150 hover:animate-pulse transition"
          ></i>
        </a>
        <a
          target="_blank"
          href="https://www.instagram.com/oswhytecodes/"
          aria-label="instagram link"
        >
          {" "}
          <i
            className="fa-brands fa-instagram
            hover:text-neutral-800 text-[#e5e5e5] hover:scale-150 hover:animate-pulse transition"
          ></i>
        </a>
        <a
          target="_blank"
          href="https://www.youtube.com/channel/UC_3pNhSyYoZk3Z201kZvgsg"
          aria-label="youtube link"
        >
          {" "}
          <i
            className="fa-brands fa-youtube
           hover:text-neutral-800 text-[#e5e5e5] hover:scale-150 hover:animate-pulse transition"
          ></i>
        </a>
      </div>
    </footer>
  );
};
