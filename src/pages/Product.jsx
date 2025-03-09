import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductData } from "../store/singleProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchRelatedData } from "../store/relatedProductsSlice";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { isLoading, data, error } = useSelector(
    (state) => state.singleProduct || null
  );
  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  console.log(productId, data);
  useEffect(() => {
    // fetch product details from API using productId
    // populate product details in the component state
    dispatch(fetchProductData(productId));
  }, [productId]);
  useEffect(() => {
    if (data) {
      setImage(data?.images[0]);
      dispatch(fetchRelatedData(data?.category));
    }
  }, [data]);

  function addToCart() {
    // add product to cart using productId
    // TODO implement quantity logic also
  }
  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* product data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* product images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-ful">
            {data &&
              data.images.map((image, index) => {
                return (
                  <img
                    onClick={() => setImage(image)}
                    src={image}
                    key={index}
                    className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                  />
                );
              })}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} />
          </div>
        </div>
        {/* product details */}
        <div className="flex-1">
          <h1 className="text-2xl font-medium mt-2">{data?.title}</h1>
          {/*TODO add rating */}
          <p className="text-3xl font-medium">${data?.price.toFixed(2)}</p>
          <p className="text-sm font-medium text-gray-500">
            {data?.category} | {data?.brand}
          </p>
          <p className="mt-5 md:w-4/5 text-gray-500">{data?.description}</p>

          <button
            onClick={addToCart}
            className="text-white text-sm bg-gray-800 px-8 py-3 rounded-full hover:bg-gray-700"
          >
            Add to Cart
          </button>
          <hr className="mt-8 sm:w[4/5]"></hr>
          {/* <button className="text-white text-sm bg-gray-800 px-6 py-3 rounded-full hover:bg-gray-700">
            Buy Now
          </button> */}
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product</p>
            <p>Cash on Delivery available</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>
      {/* reviews */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
            minima aut a, repellendus hic pariatur veniam praesentium sint
            corrupti, illum doloremque eveniet vero voluptatibus asperiores
            incidunt saepe. Commodi, quos consectetur?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
            aperiam rerum repudiandae id eaque? Eveniet, dignissimos, reiciendis
            impedit cumque ipsa enim placeat recusandae voluptatibus earum
            suscipit repellendus eum nam magni?
          </p>
        </div>
      </div>
      {/* related products */}
      <RelatedProducts />
    </div>
  );
};

export default Product;
