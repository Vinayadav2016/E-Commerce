import React, { useState, useEffect, useCallback } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import ProductItem from "./ProductItem";
import "./ProductCarousel.css";
export const ProductCarousel = ({ productList = [] }) => {
  const [list, setList] = useState(productList);
  const [prevItems, setPrevItems] = useState(5);
  const [buttonPressed, setButtonPressed] = useState(false);

  function handleCarousalClick(left) {
    if (!buttonPressed) {
      if (left) {
        let tempList = list.slice(0, -1);
        setList([
          ...(list.length === 1 ? [] : [list[list.length - 1]]),
          ...tempList,
        ]);
      } else {
        let [firstProduct, ...tempList] = list;
        setList([...tempList, firstProduct]);
      }
      setButtonPressed(left ? "left" : "right");
    }
  }
  useEffect(() => {
    if (buttonPressed) {
      const id = setTimeout(() => setButtonPressed(false), 500);
      return () => clearTimeout(id);
    }
  }, [buttonPressed]);
  useEffect(() => {
    if (productList.length && productList.length < 7) {
      let tempList = productList;
      while (tempList.length < 7) {
        tempList = [...tempList, ...tempList];
      }
      setList([...tempList]);
    } else if (productList.length) {
      setList(productList);
    }
  }, [productList, productList.length]);

  const updatePrevItems = useCallback(() => {
    const width = window.innerWidth;
    setPrevItems(width >= 1024 ? 5 : width >= 768 ? 4 : width >= 640 ? 3 : 2);
  }, []);
  useEffect(() => {
    // Call updatePrevItems initially
    updatePrevItems();
    // Listen for window resize
    window.addEventListener("resize", updatePrevItems);
    return () => window.removeEventListener("resize", updatePrevItems);
  }, []);
  return (
    <div className="relative flex justify-evenly gap-2 items-center">
      <div
        className="group p-3 md:p-4 lg:pd-5 rounded-full cursor-pointer  hover:bg-slate-500
 hover:dark:bg-slate-200 hover:bg-opacity-40 dark:hover:bg-opacity-10  transition-colors ease-in-out"
        onClick={() => handleCarousalClick(true)}
      >
        <FaArrowAltCircleLeft className="size-4 md:size-6 lg:size-8 group-hover:scale-125 dark:text-gray-200 bg-white dark:bg-black rounded-full" />
      </div>
      <div className="overflow-hidden w-full">
        <div
          className="my-8 relative flex justify-between [&>*]:flex-grow-0 [&>*]:flex-shrink-0 [&>*]:w-1/2 [&>*]:sm:w-1/3 [&>*]:md:w-1/4 [&>*]:lg:w-1/5 -translate-x-1/2 sm:-translate-x-1/3 md:-translate-x-1/4 lg:-translate-x-[20%] "
          style={{
            animation: buttonPressed
              ? `${
                  buttonPressed == "right"
                    ? "move-right"
                    : `move-left-${prevItems}`
                } 0.5s ease-in-out`
              : "",
          }}
        >
          {list.map(
            ({ id, thumbnail, title, price, discountPercentage }, index) => (
              <Link
                className="hover:scale-110 flex justify-center items-center"
                to={`/product/${id}`}
                key={index}
              >
                <ProductItem
                  id={id}
                  thumbnail={thumbnail}
                  title={title}
                  price={price}
                  discountPercentage={discountPercentage}
                />
              </Link>
            )
          )}
        </div>
      </div>

      <div
        className="group p-3 md:p-4 lg:pd-5 rounded-full cursor-pointer  hover:bg-slate-500
 hover:dark:bg-slate-200 hover:bg-opacity-40 dark:hover:bg-opacity-10  transition-colors ease-in-out"
        onClick={() => handleCarousalClick(false)}
      >
        <FaArrowAltCircleRight
          size={20}
          className="size-4 md:size-6 lg:size-8 group-hover:scale-125 dark:text-gray-200 bg-white dark:bg-black rounded-full"
        />
      </div>
    </div>
  );
};
