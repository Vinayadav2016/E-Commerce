import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

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
  const [imageIndex, setImageIndex] = useState(0);
  const handleLeftClick = () => {
    setImageIndex(imageIndex > 0 ? imageIndex - 1 : productList.length - 1);
  };
  const handleRightClick = () => {
    setImageIndex(imageIndex < productList.length - 1 ? imageIndex + 1 : 0);
  };
  useEffect(() => {
    // set a timer to reset imageIndex after a certain amount of time
    const timer = setTimeout(() => {
      handleRightClick();
    }, 5000);
    return () => clearTimeout(timer); // clean up the timer when imageIndex changes
  }, [imageIndex]);
  return (
    <div className="w-full sm:w-1/2 aspect-[2/1] relative p-4">
      <div className="w-full h-full flex overflow-hidden">
        {productList.map((product, index) => {
          return (
            <Link
              key={index}
              className="w-full h-full flex-shrink-0 flex-grow-0"
              to={`product/${product.id}`}
              style={{ translate: `${-100 * imageIndex}%` }}
            >
              <img
                key={product.id}
                className={`w-full h-full object-contain`}
                src={product.thumbnail}
                alt={product.title}
              />
            </Link>
          );
        })}
      </div>
      {/* left button */}
      <ButtonContainer onClick={handleLeftClick} left />
      {/* right button */}
      <ButtonContainer onClick={handleRightClick} />
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
  const { list: productList } = useSelector((state) => state.products || []);
  return (
    <div className="w-full sm:flex bg-slate-400 dark:bg-slate-800 p-2 sm:p-4 md:p-8 lg:p-12">
      {/* text */}
      <TextContainer />
      {/* image slider */}
      <ImageSlider productList={productList.slice(0, 10)} />
    </div>
  );
};

export default Hero;
