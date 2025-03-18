import React from "react";

const Button = ({ children, onClick = () => {}, className = "" }) => {
  return (
    <button
      className={`w-30 text-white bg-black text-xs sm:text-sm md:text-md rounded-full shadow-lg shadow-gray-800 hover:scale-110 transition-scale duration-500 ease-in-out py-2 px-3 md:py-3 md:px-5 items-center justify-center ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
