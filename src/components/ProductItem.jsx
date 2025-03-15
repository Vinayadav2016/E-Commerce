import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Rating } from "./Rating";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  addItemToWishList,
  removeItemFromWishList,
} from "../store/wishlistSlice";
const ProductItem = ({
  data: {
    id = "",
    thumbnail = "",
    title = "",
    price = "",
    rating = "",
    discountPercentage = "",
  } = {},
  data = {},
  isLoading = false,
  heightFull = false,
}) => {
  const currency = useSelector((state) => state.products.currency || "$");
  const { list } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  return (
    <div
      className={`w-full relative hover:scale-110 transition-all duration-500 ease-in-out flex justify-center ${
        heightFull ? "h-full" : ""
      }`}
    >
      {!isLoading && (
        <div className="absolute bottom-2 right-5 z-20">
          {list?.[id] ? (
            <FaHeart
              className="size-6 text-slate-800 dark:text-slate-400  cursor-pointer hover:scale-125"
              style={{ filter: "drop-shadow(1px 5px 5px rgb(30, 41, 59,1))" }}
              onClick={() => dispatch(removeItemFromWishList(id))}
            />
          ) : (
            <FaRegHeart
              className="size-6 text-slate-800 dark:text-slate-400 cursor-pointer hover:scale-125"
              style={{ filter: "drop-shadow(1px 5px 5px rgb(30, 41, 59,1))" }}
              onClick={() => dispatch(addItemToWishList(data))}
            />
          )}
        </div>
      )}
      <Link
        className="flex p-2 flex-col gap-1 justify-between items-center bg-slate-400 dark:bg-slate-200  dark:bg-opacity-5 w-[90%] h-full min-h-[250px] rounded-lg shadow-lg shadow-slate-800"
        to={`/product/${id}`}
      >
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
      </Link>
    </div>
  );
};

export default ProductItem;
