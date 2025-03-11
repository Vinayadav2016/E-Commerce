import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from "react-icons/io";
const Rating = ({ rating }) => {
  let tempRating = rating || 0;
  return (
    <div className="flex items-center gap-1 ">
      {[...Array(5)].map((_, index) => {
        console.log(
          " rating out of five ",
          index,
          " index ",
          tempRating - index
        );
        return (
          <div className="relative" key={index}>
            {tempRating - index >= 1 ? (
              <IoMdStar className="text-slate-800 dark:text-yellow-400" />
            ) : tempRating - index >= 0.5 ? (
              <IoMdStarHalf className="text-slate-800 dark:text-yellow-400" />
            ) : (
              <IoMdStarOutline className="text-slate-800 dark:text-yellow-400" />
            )}
          </div>
        );
      })}
    </div>
  );
};
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
