import React from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchData } from "../../redux/WeatherSlice";
import { Icon } from "./Icon";
import { Default } from "./Default";

export const Card = () => {
  const dispatch = useAppDispatch();

  const temp = useAppSelector((state) => state.weather.data.main.temp);
  const desc = useAppSelector((state) =>
    state.weather.data.weather.map((x) => x.main)
  );
  const name = useAppSelector((state) => state.weather.data.name);
  const city = useAppSelector((state) => state.weather.city);
  const input = useAppSelector((state) => state.weather.input);

  // return temp with degree // not sure why temp wont bypass the type
  let weatherTemp = Math.floor(temp);

  // Today's date from stack overflow
  let today: Date = new Date();
  let day = String(today.getDate()).padStart(2, "0");
  let month = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let year = today.getFullYear();
  let todayDate = `${month} / ${day} / ${year} `;

  // DATA FOR THE CARDS
  useEffect(() => {
    if (name !== input && loading === "pending") {
      dispatch(fetchData(city));
    }
  }, [dispatch, city]);

  const loading = useAppSelector((state) => state.weather.loading);

  return (
    <section className="">
      <h1
        className="uppercase font-bold text-xl 
          tracking-wider text-center mb-6"
      >
        {name}
      </h1>

      <div className="flex flex-wrap  gap-12 justify-center items-center">
        <Icon />
        <div className="flex flex-col justify-between text-left gap-1">
          <p className="text-4xl text-gray-500 pb-4 ">{weatherTemp}&deg;</p>

          <div>
            <p className="tracking-wider text-xs uppercase font-bold">{desc}</p>
            <p className="text-xs">{todayDate}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// //  <div
//         className="shadow-xl border-[.6px]  border-neutral-300
//          rounded-md flex flex-col gap-10 py-12
//          "
//       >
//         <h1
//           className="uppercase font-bold text-xl
//           tracking-wider text-center"
//         >
//           {/* error handling */}
//           {name}
//         </h1>
//         {/* weather conditional */}
//         {temp === 0 || loading ? (
//           <div className="flex justify-center items-center">
//             <img
//               src={prev}
//               className="w-40 text-center object-cover"
//               alt={prev}
//             />
//           </div>
//         ) : (
//           <div className="flex flex-wrap  gap-12 justify-center items-center">
//             {/* <Icon /> */}
//             <Icon />
//             <div className="flex flex-col justify-between text-left gap-1">
//               {loading ? (
//                 ""
//               ) : (
//                 <p className="text-4xl text-gray-500 pb-4 ">
//                   {weatherTemp}&deg;
//                 </p>
//               )}

//               <div>
//                 <p className="tracking-wider text-xs uppercase font-bold">
//                   {loading ? "" : desc}{" "}
//                 </p>
//                 <p className="text-xs">{loading ? " " : todayDate}</p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
