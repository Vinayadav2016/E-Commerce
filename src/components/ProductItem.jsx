import React from "react";
import { useSelector } from "react-redux";
import { Rating } from "./Rating";

const ProductItem = ({
  id = "",
  thumbnail = "",
  title = "",
  price = "",
  rating = "",
  discountPercentage = "",
  isLoading = false,
}) => {
  const currency = useSelector((state) => state.products.currency || "$");
  return (
    <div className="flex flex-col p-2 gap-1 justify-between items-center bg-slate-400 dark:bg-slate-200  dark:bg-opacity-5 w-[94%] h-full min-h-[250px] rounded-lg shadow-lg shadow-slate-800">
      {isLoading || !thumbnail ? (
        <div className=" w-[min(70%,70%)] aspect-square rounded-full shadow-slate-800 shadow-lg bg-gray-300 dark:bg-gray-700 animate-pulse" />
      ) : (
        <img
          src={thumbnail}
          alt={title}
          className=" w-full h-[70%] object-contain"
        />
      )}

      {isLoading || !title ? (
        <div className="w-full h-[min(6%,6%)] rounded-full shadow-slate-800 shadow-lg bg-gray-300 dark:bg-gray-700 animate-pulse" />
      ) : (
        <div className="w-full text-center pt-3 pb-1 text-xs text-gray-800 dark:text-white font-semibold">
          {title}
        </div>
      )}
      {isLoading || !price ? (
        <div className="w-full h-[min(6%,6%)]  mb-5 rounded-full shadow-slate-800 shadow-lg bg-gray-300 dark:bg-gray-700 animate-pulse" />
      ) : (
        <div className="w-full text-center text-sm h-[15%] font-medium text-gray-600 dark:text-gray-300">
          {price ? `${currency} ${price}` : null}
          <span className="text-md text-gray-800 dark:text-white pl-2">{`(${discountPercentage}% OFF)`}</span>
        </div>
      )}
      {/* rating */}
      {rating && <Rating rating={rating} />}
    </div>
  );
};

export default ProductItem;
