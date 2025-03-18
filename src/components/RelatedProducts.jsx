import React from "react";
import { useSelector } from "react-redux";
import Title from "./Title";
import { ProductCarousel } from "./ProductCarousel.jsx";
import SlideInWrapper from "./SlideInWrapper";

const RelatedProducts = ({ productDataLoading = false }) => {
  const { isLoading, error, data } = useSelector(
    (state) => state.relatedProducts || []
  );
  return (
    <SlideInWrapper>
      <div className="my-24">
        <Title
          text1={"RELATED"}
          text2={"PRODUCTS"}
          className="text-3xl py-2 justify-center"
        />
        <ProductCarousel
          productList={data}
          isLoading={isLoading || productDataLoading}
        />
      </div>
    </SlideInWrapper>
  );
};

export default RelatedProducts;
