import React, { useEffect } from "react";
import ProductItem from "../components/ProductItem";
import SlideInWrapper from "../components/SlideInWrapper";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Title from "../components/Title";
import { addProductToCart } from "../store/cartSlice";
import { removeItemFromWishList } from "../store/wishlistSlice";
import Button from "../components/Button";
import NoItemDialog from "../components/NoItemDialog";

const Wishlist = () => {
  const { list = {}, isLoading } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  return (
    <div className="mt-14 px-2 sm:px-4 md:px-8 lg:px-12">
      <SlideInWrapper>
        <div className="prata-regular pt-10 text-4xl text-center text-slate-800 dark:text-gray-200">
          WISHLIST
        </div>
      </SlideInWrapper>
      {Object.values(list).length === 0 ? (
        <NoItemDialog className="mt-10">NO ITEMS IN WISHLIST</NoItemDialog>
      ) : (
        <div className="py-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6 grid-auto-rows-[1fr]">
          {Object.values(list).map((product, index) => {
            return (
              <SlideInWrapper key={index} className="h-full">
                <ProductItem data={product} heightFull />
                <div className="flex justify-center">
                  <Button
                    onClick={() => {
                      dispatch(addProductToCart(product));
                      dispatch(removeItemFromWishList(product.id));
                    }}
                    className="mt-5 w-40"
                  >
                    ADD TO CART
                  </Button>
                </div>
              </SlideInWrapper>
            );
          })}

          {isLoading && (
            <div className="flex justify-center">
              <ProductItem isLoading />
            </div>
          )}
          {isLoading && (
            <div className="flex justify-center">
              <ProductItem isLoading />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
