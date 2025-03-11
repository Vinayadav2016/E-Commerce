import { Link } from "react-router-dom";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { useCallback, useEffect, useState } from "react";
import ProductItem from "./ProductItem";

function ButtonContainer({ onClick = () => {}, left = false }) {
  return (
    <div
      className={`group z-20 flex items-center absolute top-1/2 -translate-y-1/2 ${
        left ? "left-0" : "right-0"
      } p-3 md:p-4 lg:pd-5 rounded-full cursor-pointer  hover:bg-slate-500
 hover:dark:bg-slate-200 hover:bg-opacity-40 dark:hover:bg-opacity-10  transition-colors ease-in-out `}
      onClick={onClick}
    >
      {left ? (
        <FaArrowAltCircleLeft className="size-4 md:size-6 lg:size-8 group-hover:scale-125 dark:text-gray-200 bg-white dark:bg-black rounded-full" />
      ) : (
        <FaArrowAltCircleRight className="size-4 md:size-6 lg:size-8 group-hover:scale-125 dark:text-gray-200 bg-white dark:bg-black rounded-full" />
      )}
    </div>
  );
}

const ProductListContainer = ({ productList = [] }) => {
  return (
    <>
      {productList.map(
        ({ id, thumbnail, title, price, discountPercentage }, index) => {
          return (
            <Link
              key={index}
              className="group-hover:[&:not(&:hover)]:opacity-70 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 h-full flex-shrink-0 flex-grow-0 flex flex-col items-center justify-center hover:scale-110 transition-all duration-500 ease-in-out"
              to={`product/${id}`}
            >
              <ProductItem
                id={id}
                thumbnail={thumbnail}
                title={title}
                price={price}
                discountPercentage={discountPercentage}
              />
            </Link>
          );
        }
      )}
    </>
  );
};

function ListContainer({
  leftPosition,
  elementWidth,
  productList,
  transitionNone = false,
}) {
  // console.log(
  //   // left ? "leftFirst " : "leftSecond ",
  //   leftPosition,
  //   " elementWidth ",
  //   elementWidth,
  //   " productList length",
  //   productList.length,
  //   transitionNone ? "transition-none" : "transition-all"
  // );
  return (
    <div
      className={
        `w-full flex absolute top-10 bottom-10 bg-pink-400` +
        `${
          transitionNone
            ? "transition-none"
            : "transition-all duration-500 ease-in-out"
        }`
      }
      style={{
        left: `${leftPosition * elementWidth}%`,
      }}
    >
      <ProductListContainer productList={productList} />
    </div>
  );
}
export function InLoopProductSlider({ productList = [] }) {
  const [productListLength, setProductListLength] = useState(
    productList.length
  );
  const [
    { leftPosition: leftFirstList, transitionNone: transitionNoneFirst },
    setLeftFirstList,
  ] = useState({ leftPosition: 0, transitionNone: false });
  const [
    { leftPosition: leftSecondList, transitionNone: transitionNoneSecond },
    setLeftSecondList,
  ] = useState({ leftPosition: productList.length - 1, transitionNone: false });
  const [elementWidth, setElementWidth] = useState(-1);

  const getStateAfterLeftClick = (leftPosition) => {
    return leftPosition === productListLength - 1
      ? {
          leftPosition: -productListLength,
          transitionNone: true,
        }
      : {
          leftPosition: leftPosition + 1,
          transitionNone: false,
        };
  };
  const getStateAfterRightClick = (leftPosition) => {
    return leftPosition === -(productListLength + 1)
      ? {
          leftPosition: productListLength - 2,
          transitionNone: true,
        }
      : {
          leftPosition: leftPosition - 1,
          transitionNone: false,
        };
  };
  const handleLeftClick = () => {
    setLeftFirstList(getStateAfterLeftClick(leftFirstList));
    setLeftSecondList(getStateAfterLeftClick(leftSecondList));
  };
  const handleRightClick = () => {
    setLeftFirstList(getStateAfterRightClick(leftFirstList));
    setLeftSecondList(getStateAfterRightClick(leftSecondList));
  };

  useEffect(() => {
    setProductListLength(productList.length);
    setLeftSecondList({
      leftPosition: productList.length - 1,
      transitionNone: false,
    });
    setLeftFirstList({ leftPosition: -1, transitionNone: false });
  }, [productList.length]);

  const updateLeftValue = useCallback(() => {
    const width = window.innerWidth;

    if (width >= 1024) {
      // Large screens (lg)
      setElementWidth(20);
    } else if (width >= 768) {
      // Medium screens (md)
      setElementWidth(25);
    } else if (width >= 640) {
      // Small screens (sm)
      setElementWidth(100 / 3);
    } else {
      setElementWidth(50);
    }
  }, []);

  useEffect(() => {
    // Call updateLeftValue initially
    updateLeftValue();
    // Listen for window resize
    window.addEventListener("resize", updateLeftValue);

    return () => window.removeEventListener("resize", updateLeftValue);
  }, []);
  useEffect(() => {
    // set a timer to reset imageIndex after a certain amount of time
    const timer = setTimeout(() => {
      handleRightClick();
    }, 5000);
    return () => clearTimeout(timer);
  }, [leftFirstList, leftSecondList]);

  return (
    <div className="w-full relative p-4 animate-slide-in">
      <div className="group w-full aspect-[1/1] sm:aspect-[2/1] lg:aspect-[3/1]  flex items-center relative overflow-hidden">
        {/* first list */}
        <ListContainer
          leftPosition={leftFirstList}
          elementWidth={elementWidth}
          productList={productList}
          transitionNone={transitionNoneFirst}
        />
        {/* second list */}
        <ListContainer
          leftPosition={leftSecondList}
          elementWidth={elementWidth}
          productList={productList}
          transitionNone={transitionNoneSecond}
        />
      </div>
      {/* left button */}
      <ButtonContainer onClick={handleLeftClick} left />
      {/* right button */}
      <ButtonContainer onClick={handleRightClick} />
    </div>
  );
}
