import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../redux/WeatherSlice";

export const SearchBar = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchData(value));
    console.log(value)
    setValue("");
  };
  return (
    <section className="">
      <div className="flex gap-2 flex-col items-start md:items-center">
        <form onSubmit={handleSubmit} className="relative">
          <p className="uppercase text-xs text-gray-400 pl-1">Location</p>
          <input
            onChange={(e) => setValue(e.target.value)}
            className="border-[1px] shadow border-neutral-200 py-1 px-2
            rounded"
            type="text"
            value={value}
            placeholder="Search location..."
          />
          <button className="relative right-7">
            <i
              type="submit"
              onClick={handleSubmit}
              className="fa-solid fa-magnifying-glass"
            ></i>
          </button>
        </form>
      </div>
    </section>
  );
};
