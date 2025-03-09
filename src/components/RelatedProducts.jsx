import React from "react";
import { useSelector } from "react-redux";
import Title from "./Title";
import ProductItem from "./ProductItem";

const RelatedProducts = () => {
  const { isLoading, error, data } = useSelector(
    (state) => state.relatedProducts || []
  );
  console.log("relatedProducts ", data);
  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div className="my-24">
          <div className="text-center text-3xl py-2">
            <Title text1={"RELATED"} text2={"PRODUCTS"} />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
            {data.map(({ id, name, thumbnail, price }, index) => (
              <ProductItem
                key={id}
                id={id}
                name={name}
                image={thumbnail}
                price={price}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RelatedProducts;
