import { useSelector } from "react-redux";
import Title from "./Title";
import { useEffect, useState } from "react";
import { ProductCarousel } from "./ProductCarousel.jsx";

export default function LatestCollection() {
  const {
    isLoading,
    error,
    data: productList,
  } = useSelector((state) => state.latestProducts || []);
  return error ? (
    <></>
  ) : (
    <div className="my-10">
      <div className="text-center py-8">
        <Title
          text1={"LATEST"}
          text2={"COLLECTIONS"}
          className=" text-3xl justify-center"
        />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300">
          Explore Our Latest Collection! ✨ Fresh styles, bold designs, and
          must-have trends—handpicked just for you. Elevate your wardrobe with
          our newest arrivals and make every outfit unforgettable!
        </p>
      </div>
      {/* rendering products */}
      <ProductCarousel productList={productList} isLoading={isLoading} />
    </div>
  );
}
