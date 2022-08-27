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
  };

  return (
    <section className="SEARCH-BAR py-4">
      <div className="flex flex-col self-start">
        <form onSubmit={handleSubmit} className="">
          <input
            onChange={handleChange}
            className="border-[1px] shadow border-neutral-200 py-2 px-2 relative
             rounded max-w-[12em] md:max-w-[20em]"
            type="text"
            value={input}
            placeholder="Search location..."
          />
          <button
            type="submit"
            onClick={(event: React.MouseEvent<HTMLElement>) => handleSubmit}
            className="absolute right-14 top-10"
            aria-label="right align"
          >
            <i className="fa-solid text-gray-600 fa-magnifying-glass"></i>
          </button>
        </form>
      </div>
    </section>
  );
};
