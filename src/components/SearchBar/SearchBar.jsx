import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../redux/WeatherSlice";
import data from "../../Assets.json"


export const SearchBar = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchData(value));
    // console.log(value)
    setValue("");
  };
  return (
    <section className="px-4">
      <div className="flex flex-col items-center md:items-center ">
        <form onSubmit={handleSubmit} className="relative">
          <p className="uppercase text-xs text-gray-600 pl-1 pb-2">Location</p>
          <input
            onChange={(e) => setValue(e.target.value)}
            className="border-[1px] shadow border-neutral-200 py-2 px-2
            min-w-[18em] rounded"
            type="text"
            value={value}
            placeholder="Search location..."
          />
          <button 
          className="relative right-7"
          aria-label="right align">
            <i
              type="submit"
              onClick={handleSubmit}
              className="fa-solid text-gray-600 fa-magnifying-glass"
            ></i>
          </button>
        </form>
      </div>
    </section>
  );
};
