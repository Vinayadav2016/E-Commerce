import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./ProductCarousel.css";
import { Rating } from "./Rating";

function ButtonContainer({ onClick = () => {}, left = false }) {
  return (
    <div
      className={`group flex items-center absolute top-1/2 -translate-y-1/2 ${
        left ? "left-0" : "right-0"
      } p-3 md:p-4 lg:pd-5 rounded-full cursor-pointer  hover:bg-slate-500
 hover:dark:bg-slate-200 hover:bg-opacity-40 dark:hover:bg-opacity-10  transition-colors ease-in-out `}
      onClick={onClick}
    >
      {left ? (
        <FaArrowAltCircleLeft className="size-4 md:size-6 lg:size-8 group-hover:scale-125 dark:text-gray-200" />
      ) : (
        <FaArrowAltCircleRight className="size-4 md:size-6 lg:size-8 group-hover:scale-125 dark:text-gray-200" />
      )}
    </div>
  );
}

function ImageSlider({ productList }) {
  const [list, setList] = useState(productList);
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
      const id = setTimeout(() => setButtonPressed(false), 1000);
      return () => clearTimeout(id);
    } else {
      const id = setTimeout(() => handleCarousalClick(false), 3000);
      return () => clearTimeout(id);
    }
  }, [buttonPressed, list]);
  useEffect(() => {
    if (productList.length) {
      setList(productList);
    }
  }, [productList, productList.length]);

  return (
    <div className="w-full sm:w-1/2 aspect-[2/1] relative p-4 overflow-hidden ">
      <div
        className="w-full h-full flex -translate-x-[100%]"
        style={{
          animation: buttonPressed
            ? `${
                buttonPressed == "right" ? "move-right" : `move-left-1`
              } 1s ease-in-out`
            : "",
        }}
      >
        {list.map((product, index) => {
          return (
            <Link
              key={index}
              className="w-full h-full flex flex-col justify-center items-center flex-shrink-0 flex-grow-0 -translate-x-full"
              to={`product/${product.id}`}
            >
              <img
                key={product.id}
                className={`h-[90%] object-contain`}
                src={product.thumbnail}
                alt={product.title}
              />
              <div className="dark:text-gray-300">{product.title}</div>
              {product.rating && <Rating rating={product.rating} />}
            </Link>
          );
        })}
      </div>
      {/* left button */}
      <ButtonContainer onClick={() => handleCarousalClick(true)} left />
      {/* right button */}
      <ButtonContainer onClick={() => handleCarousalClick(false)} />
    </div>
  );
}
function TextContainer() {
  return (
    <div className="w-full sm:w-1/2 aspect-[2/1] flex flex-col gap-4 justify-center items-center">
      <div>
        <div className="flex items-center justify-start gap-2">
          <p className="w-8 h-[2px] bg-[#414141] dark:bg-gray-300"></p>
          <p className="font-medium text-base sm:text-lg md:text-xl dark:text-gray-200">
            OUR BESTSELLERS
          </p>
        </div>
        <h1 className="prata-regular text-2xl  sm:text-3xl md:text-4xl dark:text-gray-200">
          LATEST ARRIVALS
        </h1>
        <div className="flex items-center justify-end gap-2">
          <p className="font-medium text-base sm:text-lg md:text-xl dark:text-gray-200">
            SHOP NOW
          </p>
          <p className="w-8 h-[2px] bg-[#414141] dark:bg-gray-300"></p>
        </div>
      </div>
    </div>
  );
}

const Hero = () => {
  const {
    data: productList = [],
    isLoading,
    error,
  } = useSelector((state) => state.latestProducts || []);
  return error ? null : (
    <div className="w-full sm:flex bg-slate-400 dark:bg-slate-800 p-2 sm:p-4 md:p-8 lg:p-12">
      {/* text */}
      <TextContainer />
      {/* image slider */}
      {isLoading && (
        <div className="w-full sm:w-1/2 flex justify-center items-center">
          <div className="w-1/2 aspect-square bg-slate-300 dark:bg-slate-400 dark:bg-opacity-20 rounded-full animate-pulse"></div>
        </div>
      )}
      {!isLoading && <ImageSlider productList={productList.slice(10, 20)} />}
    </div>
  );
};

export default Hero;
