import React from "react";
import { TailSpin } from "react-loader-spinner";
export const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <TailSpin
        height="80"
        width="80"
        color="#C0B3BC"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};
