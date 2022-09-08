import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchData, setInput } from "../../redux/WeatherSlice";
import { useEffect, useState } from "react";

export const SearchBar = () => {
  const dispatch = useAppDispatch();
  const input = useAppSelector((state) => state.weather.input);
  const [suggestions, setSuggestions] = useState([]);

  

  // DATA FOR THE INPUT/SEARCH
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(fetchData(input));
    {
      dispatch(setInput(""));
    }
  };

  // React.ChangeEvent<HTMLFormElement>
  const handleChange = (e: any) => {
    dispatch(setInput(e.target.value));

  };

  return (
    <section className="SEARCH-BAR py-4">
      <div className="flex flex-col self-start">
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            className="border-[1px] shadow border-neutral-200 py-2 px-2 relative
             rounded  focus:w-[20em] md:max-w-full"
            type="text"
            value={input}
            placeholder="Search city..."
          />
          <button
            type="submit"
            onClick={(event: React.MouseEvent<HTMLElement>) => handleSubmit}
            className="absolute right-10 top-10"
            aria-label="right align"
          >
            <i className="fa-solid text-gray-600 fa-magnifying-glass"></i>
          </button>
        </form>
      </div>
    </section>
  );
};



  // // api call
  // useEffect(() => {
  //   fetch("https://api.foursquare.com/v3/places/search?near=${city}/", {
  //     method: "GET",
  //     headers: {
  //       Authorization: "fsq3GXUPRhaFdQ5OjxV89mbkUPfAZLWuZUlVEAxnd9JXu/E=",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setSuggestions(data.results));
  // }, []);