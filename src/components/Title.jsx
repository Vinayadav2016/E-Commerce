import React from "react";

const Title = ({ text1, text2, className }) => {
  return (
    <div className={`mb-3 flex ${className}`}>
      <div className="flex gap-2 items-center">
        <p className="text-gray-500 dark:text-gray-300">
          {text1 + " "}
          <span className="text-gray-700 dark:text-white font-medium">
            {text2}
          </span>
        </p>
        <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700 dark:bg-gray-200"></p>
      </div>
    </div>
  );
};

export default Title;
