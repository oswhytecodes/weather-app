import React from 'react'
import prev from "/images/prev.svg";

export const Default = () => {
  return (
    <div className="flex justify-center items-center">
      <img src={prev} className="w-40 text-center object-cover" alt={prev} />
    </div>
  );
}
