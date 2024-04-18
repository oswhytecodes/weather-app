import { useAppSelector } from "../../redux/hooks";
import { ColorKey, ColorType, COLORS } from "../../modules/types";
import { SearchBar } from "../SearchBar/SearchBar";
import LogoIcon from "/icons/cloud-sun-rain.svg";
import { timeZoneConverter } from "../../modules/functions";

// HEADER AND FOOTER COMPONENT

export const Header = () => {
  const { timezone, dt } = useAppSelector((state) => state.weather.data);
  const { sunrise, sunset } = useAppSelector((state) => state.weather.data.sys);
  const weatherDescription = useAppSelector(
    (state) => state.weather.data.weather.map((desc) => desc.main)[0]
  );
  // return the color that matches the weather description
  let headerColor = "#434e6b";
  const returnVal = (obj: ColorType, val: ColorKey) => obj[val];

  // timezone
  const timezoneCalculation = timeZoneConverter(dt, timezone);
  // convert sunrise time
  let sunriseUnixTime = timeZoneConverter(sunrise, timezone);
  // convert sunset time
  let sunsetUnixTime = timeZoneConverter(sunset, timezone);
  // check the time of day
  if (
    // nighttime
    timezoneCalculation <= sunriseUnixTime &&
    timezoneCalculation >= sunsetUnixTime
  ) {
    headerColor = "#C0B3BC";
  } else if (
    // daytime
    timezoneCalculation <= sunsetUnixTime &&
    timezoneCalculation >= sunriseUnixTime
  ) {
    headerColor = returnVal(COLORS, weatherDescription);
  }
  // refresh page
  const refresh = () => window.location.reload();

  return (
    <header
      style={{ backgroundColor: `${headerColor}` }}
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
  const { timezone, dt } = useAppSelector((state) => state.weather.data);
  const { sunrise, sunset } = useAppSelector((state) => state.weather.data.sys);
  const weatherDescription = useAppSelector(
    (state) => state.weather.data.weather.map((desc) => desc.main)[0]
  );
  let headerColor = "#434e6b";
  const returnVal = (obj: ColorType, val: ColorKey) => obj[val];

  // timezone
  const timezoneCalculation = timeZoneConverter(dt, timezone);
  // convert sunrise time
  let sunriseUnixTime = timeZoneConverter(sunrise, timezone);
  // convert sunset time
  let sunsetUnixTime = timeZoneConverter(sunset, timezone);
  // check the time of day
  if (
    // nighttime
    timezoneCalculation <= sunriseUnixTime &&
    timezoneCalculation >= sunsetUnixTime
  ) {
    headerColor = "#C0B3BC";
  } else if (
    // daytime
    timezoneCalculation <= sunsetUnixTime &&
    timezoneCalculation >= sunriseUnixTime
  ) {
    headerColor = returnVal(COLORS, weatherDescription);
  }
  return (
    <footer
      style={{
        backgroundColor: `${headerColor}`,
      }}
      className="FOOTER py-3 flex flex-col justify-center items-center"
    >
      <div className="flex text-2xl gap-4 p-2 pt-3">
        <p>Built with ❤️ by <a target="_blank"
                             href="https://www.orincywhyte.com/"
                               aria-label="website link"
                             >Orincy Whyte Designs</a></p>
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
