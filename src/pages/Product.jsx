import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductData } from "../store/singleProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchRelatedData } from "../store/relatedProductsSlice";
import RelatedProducts from "../components/RelatedProducts";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import "./Product.css";
import { Rating } from "../components/Rating";
function CarousalImage({ image, index, buttonPressed }) {
  const animation = buttonPressed
    ? buttonPressed === "right"
      ? ` entry-image-${index}`
      : ` entry-image-left-${index} `
    : "";
  return (
    <div
      className={`h-3/4  w-full absolute top-1/2 left-2/3 sm:left-3/4 ${
        index === 1 ? "" : "blur-lg"
      } `}
      style={{
        transform: `translateX(${-100 + 30 * index}%) translateY(${
          -75 + 25 * index
        }%) scale(${1.25 - 0.25 * index})`,
        zIndex: index == 1 ? 11 : 10 - index,
        animation: animation ? `${animation} 1.5s ease-in-out` : "",
      }}
    >
      <img
        className="object-contain h-full w-full drop-shadow-2xl drop-shadow-slate-800"
        src={image}
      />
    </div>
  );
}

function Carousal({ data }) {
  const [images, setImages] = useState(data?.images || []);
  const [buttonPressed, setButtonPressed] = useState(false);

  useEffect(() => {
    if (buttonPressed) {
      const timeOutId = setTimeout(() => {
        setButtonPressed(false);
      }, 1500);
      return () => clearTimeout(timeOutId);
    }
  }, [buttonPressed]);
  useEffect(() => {
    if (data?.images) {
      if (data.images.length < 4) {
        let tempImages = data.images;
        while (tempImages.length < 4) {
          tempImages = [...tempImages, ...tempImages];
        }
        setImages(tempImages);
      } else setImages(data?.images);
    }
  }, [data, data?.images]);

  function handleCarousalClick(left) {
    if (!buttonPressed) {
      if (left) {
        let tempImages = images.slice(0, -1);
        setImages([
          ...(images.length === 1 ? [] : [images[images.length - 1]]),
          ...tempImages,
        ]);
      } else {
        let [firstImage, ...tempImages] = images;
        setImages([...tempImages, firstImage]);
      }
      setButtonPressed(left ? "left" : "right");
    }
  }
  return (
    <div className="w-full py-2 flex flex-col sm:flex-row flex-wrap items-center justify-around min-h-[70dvh]">
      <div className="peer w-full flex-1 lg:w-1/2 h-[65dvh] relative">
        {[...images, ...images].slice(0, 4).map((image, index) => (
          <CarousalImage
            key={index}
            index={index}
            image={image}
            buttonPressed={buttonPressed}
          />
        ))}
      </div>
      <ProductDetail data={data} />
      <div className="w-full px-5 flex justify-between peer-hover:[&>*]:animate-pulse peer-hover:[&>*]:opacity-100 [&>*]:cursor-pointer">
        <FaArrowCircleLeft
          className="size-5 sm:size-10 opacity-50 hover:opacity-100"
          onClick={() => handleCarousalClick(true)}
        />
        <FaArrowCircleRight
          className="size-5 sm:size-10 opacity-50 hover:opacity-100"
          onClick={() => handleCarousalClick(false)}
        />
      </div>
    </div>
  );
}

const ProductDetail = ({
  data: {
    title = "",
    price = 0,
    category = "",
    brand = "",
    description = "",
    rating = "",
    returnPolicy = "",
    discountPercentage = 0,
  },
}) => {
  return (
    <div className="z-20 flex flex-col px-4 items-center sm:items-start gap-2 w-full sm:w-1/2">
      <div className="text-xl font-semibold dark:text-gray-200 text-center sm:text-left">
        {title}
      </div>
      <div className="flex flex-col gap-1 items-center sm:block">
        <p className="text-3xl font-medium ">
          ${price.toFixed(2)}
          <span className="text-slate-600 dark:text-gray-400 text-xl ">
            {discountPercentage ? ` ( ${discountPercentage}% OFF )` : ""}
          </span>
        </p>
        <p className="text-sm font-medium text-slate-600 dark:text-gray-400 capitalize">
          {category} | {brand}
        </p>
        <Rating rating={rating} />
      </div>
      <p className="hidden sm:block md:w-4/5 text-slate-600 dark:text-gray-400">
        {description}
      </p>
      <button className="w-40 bg-black text-white text-sm md:text-md rounded-full shadow-lg shadow-gray-800 hover:scale-110 transition-scale duration-500 ease-in-out py-2 px-3 md:py-2 md:px-5 ">
        ADD TO CART
      </button>
      <div className="hidden text-sm text-slate-800 dark:text-gray-300 mt-5 sm:flex gap-1 flex-wrap">
        <p className="flex-[1fr]">100% Original Product |</p>
        <p className="flex-[1fr]">Cash on Delivery available |</p>
        <p className="flex-[1fr]">{returnPolicy}</p>
      </div>
    </div>
  );
};

const Product = () => {
  const { productId } = useParams();
  const { isLoading, data, error } = useSelector(
    (state) => state.singleProduct || null
  );

  const dispatch = useDispatch();
  useEffect(() => {
    // fetch product details from API using productId
    // populate product details in the component state
    dispatch(fetchProductData(productId));
  }, [productId]);
  useEffect(() => {
    if (data) {
      dispatch(fetchRelatedData(data?.category));
    }
  }, [data]);

  return (
    <div className="mt-14 transition-opacity ease-in duration-500 opacity-100">
      {/* product data */}
      <Carousal data={data} />
      {/* reviews */}
      {/* <div className="mt-20">
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
      </div> */}
      {/* related products */}
      {/* <RelatedProducts /> */}
    </div>
  );
};

export default Product;
