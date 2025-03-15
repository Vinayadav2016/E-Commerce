import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductData } from "../store/singleProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchRelatedData } from "../store/relatedProductsSlice";
import RelatedProducts from "../components/RelatedProducts";
import SlideInWrapper from "../components/SlideInWrapper";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import "./Product.css";
import { Rating } from "../components/Rating";
import { ProductCarousel } from "../components/ProductCarousel";
import { addProductToCart } from "../store/cartSlice";
import {
  addItemToWishList,
  removeItemFromWishList,
} from "../store/wishlistSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";
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
    <div className="w-full py-2 flex flex-col sm:flex-row flex-wrap items-center justify-around">
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
      {data && <ProductDetail data={data} />}
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

const DescriptionText = ({ title = "", value = "" }) => {
  return (
    <div className="flex">
      <span className="min-w-32 text-slate-800 font-semibold">{title}</span>{" "}
      <span className="text-gray-400">{value}</span>{" "}
    </div>
  );
};

const ReviewDialog = ({ data }) => {
  return (
    <div className=" bg-slate-400 bg-opacity-10 p-4 rounded-lg flex flex-col items-center justify-center shadow-md shadow-slate-800">
      <div className="uppercase text-xl font-semibold text-center">
        {data?.reviewerName}
      </div>
      <div className="text-lg text-slate-800 text-center">
        {data?.reviewerEmail}
      </div>
      <Rating rating={data?.rating} />
      <div className=" text-2xl text-gray-300 text-center">
        <span className="text-3xl">"</span>
        {data?.comment}
        <span className="text-3xl">"</span>
      </div>
    </div>
  );
};

const DetailsContainer = ({ data }) => {
  const [isReviewTabSelected, setIsReviewTabSelected] = useState(false);
  return (
    <div className="mx-5 mt-5 dark:bg-slate-600 border-[6px] border-slate-800 rounded-lg shadow-lg shadow-slate-800  ">
      <div className="flex items-center bg-slate-800 dark:text-gray-300">
        <button
          className={`font-semibold px-4 py-2 text-xl   ${
            isReviewTabSelected ? "" : "dark:bg-slate-600"
          } rounded-t-lg transition-all duration-500 ease-in-out`}
          onClick={() => setIsReviewTabSelected(false)}
        >
          Product Details
        </button>
        <button
          className={`font-semibold px-4 py-2 text-xl ${
            isReviewTabSelected ? "dark:bg-slate-600" : ""
          } rounded-t-lg transition-all duration-500 ease-in-out`}
          onClick={() => setIsReviewTabSelected(true)}
        >
          Reviews
        </button>
      </div>
      <div className="p-5 h-[250px] font-medium text-lg flex flex-col gap-2 overflow-y-scroll">
        {isReviewTabSelected ? (
          data.reviews.map((review, index) => {
            return <ReviewDialog key={index} data={review} />;
          })
        ) : (
          <div className="bg-slate-400 bg-opacity-10 rounded-lg p-5">
            <div className="flex justify-between items-start flex-wrap ">
              <DescriptionText title="Product Name" value={data?.title} />
              <Rating rating={data?.rating} />
            </div>
            <DescriptionText title="Brand" value={data?.brand} />
            <DescriptionText
              title="Warranty"
              value={data?.warrantyInformation}
            />
            <DescriptionText
              title="Shipping"
              value={data?.shippingInformation}
            />
            <DescriptionText title="Return Policy" value={data?.returnPolicy} />
            <DescriptionText title="Description" value={data?.description} />
          </div>
        )}
      </div>
    </div>
  );
};

const ProductDetail = ({
  data: {
    id = "",
    title = "",
    price = 0,
    category = "",
    brand = "",
    description = "",
    rating = "",
    returnPolicy = "",
    discountPercentage = 0,
  },
  data,
}) => {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.wishlist);
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
      <div className="flex gap-2 items-center">
        <button
          className="w-40 bg-black text-white text-sm md:text-md rounded-full shadow-lg shadow-gray-800 hover:scale-110 transition-scale duration-500 ease-in-out py-2 px-3 md:py-2 md:px-5 "
          onClick={() => dispatch(addProductToCart(data))}
        >
          ADD TO CART
        </button>

        {list?.[id] ? (
          <FaHeart
            className="size-6 text-slate-800 dark:text-slate-400  cursor-pointer hover:scale-125"
            style={{ filter: "drop-shadow(1px 5px 5px rgb(30, 41, 59,1))" }}
            onClick={() => dispatch(removeItemFromWishList(id))}
          />
        ) : (
          <FaRegHeart
            className="size-6 text-slate-800 dark:text-slate-400 cursor-pointer hover:scale-125"
            style={{ filter: "drop-shadow(1px 5px 5px rgb(30, 41, 59,1))" }}
            onClick={() => dispatch(addItemToWishList(data))}
          />
        )}
      </div>
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
    <div className="mt-14">
      {/* product data */}
      <Carousal data={data} />
      <SlideInWrapper>
        <DetailsContainer data={data} />
      </SlideInWrapper>
      <RelatedProducts />
    </div>
  );
};

export default Product;
