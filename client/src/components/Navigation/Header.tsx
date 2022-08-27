import { useAppSelector } from "../../redux/hooks";
import Assets from "../../modules/Assets.json";
import LogoIcon from "/icons/cloud-sun-rain.svg";
import { SearchBar } from "../SearchBar/SearchBar";

// HEADER AND FOOTER COMPONENT

const colors = Assets.colors;
// return the color that matches the weather description
const returnVal = (obj: any, val: any) => {
  let y = obj[val];
  return y;
};
let headerColor = "#C0B3BC";

export const Header = () => {
  const desc = useAppSelector((state) =>
    state.weather.data.weather.map((desc) => desc.main)
  );
  const temperature = useAppSelector((state) => state.weather.data.main.temp);
  const { loading } = useAppSelector((state) => state.weather);
  if (loading && !temperature) {
    headerColor = "#C0B3BC";
  } else if (desc[0] !== "default") {
    headerColor = returnVal(Assets.colors, desc);
  }
  const refresh = () => {
    window.location.reload();
  };

  return (
    <header
      style={{ backgroundColor: `${headerColor}` }}
      className="HEADER cursor-pointer px-6 py-4 gap-4 flex justify-between items-center hover:bg-opacity-10 "
    >
      <div className="flex">
        <div className="hidden md:block">
          <p
            className=" uppercase font-bold 
        tracking-widest text-neutral-200
        text-3xl
         dark:text-neutral-900 pr-4"
          >
            rainorshine
          </p>
        </div>

        <img className="block md:hidden" src={LogoIcon} alt="" />
        <button onClick={refresh}></button>
      </div>
      <div>
        <SearchBar />
      </div>
    </header>
  );
};
// FOOTER
export const Footer = () => {
  const description = useAppSelector((state) =>
    state.weather.data.weather.map((desc) => desc.main)
  );
  const temperature = useAppSelector((state) => state.weather.data.main.temp);
  const { loading } = useAppSelector((state) => state.weather);

  if (loading && !temperature) {
    headerColor = "#C0B3BC";
  } else if (description[0] !== "default") {
    headerColor = returnVal(Assets.colors, description);
  }
  return (
    <footer
      style={{ backgroundColor: `${headerColor}` }}
      className="FOOTER py-3 flex justify-center"
    >
      <div className="flex text-2xl gap-4 p-2">
        <a href="https://github.com/oswhytecodes" aria-label="github link">
          {" "}
          <i
            className="fa-brands fa-github  
             hover:text-neutral-800 text-[#e5e5e5] hover:scale-150 hover:animate-pulse transition"
          ></i>
        </a>
        <a
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
