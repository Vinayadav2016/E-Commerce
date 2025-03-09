import { useSelector } from "react-redux";
import Title from "./Title";
import { useEffect, useState } from "react";
import { InLoopProductSlider } from "./InLoopProductSlider";

export default function LatestCollection() {
  const {
    isLoading,
    error,
    list: productList,
  } = useSelector((state) => state.products || []);
  const [latestProducts, setLatestProducts] = useState([]);
  useEffect(() => {
    setLatestProducts(productList.slice(0, 10)); // get the first 10 products
  }, [productList]);
  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure repellat
          dignissimos veniam tempore, quasi, laborum, nesciunt facere alias
          libero beatae eos aspernatur! Perspiciatis ut quo, fuga dolor beatae
          dolorem asperiores.
        </p>
      </div>
      {/* rendering products */}
      {isLoading ? (
        <h1>loading .....</h1>
      ) : (
        <>
          {error ? (
            <h1>errorr</h1>
          ) : (
            <InLoopProductSlider productList={latestProducts} />
          )}
        </>
      )}
    </div>
  );
}
