import React from "react";
import { useSelector } from "react-redux";
import Title from "./Title";
import { ProductCarousel } from "./ProductCarousel.jsx";
import SlideInWrapper from "./SlideInWrapper";

const RelatedProducts = () => {
  const { isLoading, error, data } = useSelector(
    (state) => state.relatedProducts || []
  );
  return (
    <SlideInWrapper>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div className="my-24">
          <div className="text-center text-3xl py-2">
            <Title text1={"RELATED"} text2={"PRODUCTS"} />
          </div>
          <ProductCarousel productList={data} />
        </div>
      )}
    </SlideInWrapper>
  );
};

export default RelatedProducts;
