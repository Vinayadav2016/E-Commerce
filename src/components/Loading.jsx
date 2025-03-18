import React from "react";

const Loading = ({ className }) => {
  return (
    <div
      className={`flex justify-center items-center animate-pulse ${className}`}
    >
      <span>LOADING!!!</span>
    </div>
  );
};

export default Loading;
