import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProductItem = ({ id, thumbnail, title, price }) => {
  const currency = useSelector((state) => state.products.currency || "$");
  return (
    <div className="flex flex-col justify-center items-center bg-slate-400 dark:bg-slate-200 bg-opacity-5 dark:bg-opacity-5 w-[94%] rounded-lg">
      <img
        src={thumbnail}
        alt={title}
        className=" w-full max-h-[70%] object-contain "
      />
      <p className="text-center pt-3 pb-1 text-sm text-gray-800 dark:text-white font-semibold">
        {title}
      </p>
      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
        {currency}
        {price}
      </p>
    </div>
  );
};

export default ProductItem;
