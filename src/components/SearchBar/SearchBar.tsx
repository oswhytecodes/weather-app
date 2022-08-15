import React from "react";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchData } from "../../redux/WeatherSlice";
import { setInput } from "../../redux/WeatherSlice";

type InputValue = {
  value: string;
};
type SubmitValue = {
  handleSubmit: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const SearchBar = () => {
  // const [value, setValue] = useState("");
  const dispatch = useAppDispatch();
  const input = useAppSelector((state) => state.weather.input);

  // DATA FOR THE INPUT/SEARCH
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(fetchData(input));
    dispatch(setInput(""));
  };
  
  // React.ChangeEvent<HTMLFormElement>
  const handleChange = (e: any) => {
    dispatch(setInput(e.target.value));
    // setValue(e.target.value);
  };

  return (
    <section className="px-4">
      <div className="flex flex-col items-center md:items-center ">
        <form onSubmit={handleSubmit} className="relative">
          <p className="uppercase text-xs text-gray-600 pl-1 pb-2">Location</p>
          <input
            // onChange={(e) => setValue(e.target.value)}
            onChange={handleChange}
            className="border-[1px] shadow border-neutral-200 py-2 px-2
            min-w-[18em] rounded"
            type="text"
            value={input}
            // value={value}
            placeholder="Search location..."
          />
          <button
            type="submit"
            onClick={(event: React.MouseEvent<HTMLElement>) => handleSubmit}
            className="relative right-10"
            aria-label="right align"
          >
            <i className="fa-solid text-gray-600 fa-magnifying-glass"></i>
          </button>
        </form>
      </div>
    </section>
  );
};
