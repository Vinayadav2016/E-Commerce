import React from "react";

const NoItemDialog = ({ children, className }) => {
  return (
    <div
      className={`text-2xl text-center dark:text-gray-300 font-semibold ${className}`}
    >
      {children}
    </div>
  );
};

export default NoItemDialog;
