import { useAppSelector } from "../../redux/hooks";
// type Response = "InvalidRequestError" | "UnexpectedError";

export const Error = () => {
  const response = useAppSelector((state) => state.weather.response);
  const input = useAppSelector((state) => state.weather.input);
  console.log(response);

  return (
    <div className="flex justify-center py-16 px-16 ">
      <div className="flex flex-col items-center justify-center">
        <p className="text-xl">City Not Found / Search Limit Exceeded. </p>
        <p>Please try again shortly.</p>
      </div>
    </div>
  );
};

{
  /* <p className="text-xl">
    City <span className="font-bold">{input}</span> was not found.  </p>
    <p className="text-lg">Please try again </p> */
}
