import React, { useState } from "react";
import Title from "../components/Title";
import { MdDelete } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import CartTotal from "../components/CartTotal";
import {
  addProductToCart,
  deleteProductFromCart,
  removeProductFromCart,
  setCartError,
} from "../store/cartSlice";
import { Rating } from "../components/Rating";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { addItemToWishList } from "../store/wishlistSlice";
import { ModalWrapper } from "../modal/ModalWrapper";
import SignupModal from "../modal/SignupModal";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
const Cart = () => {
  const { data = {}, totalProducts } = useSelector((state) => state.cart);
  const { loggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const handleCheckout = () => {
    if (totalProducts === 0) {
      dispatch(
        setCartError({
          type: "checkout",
          msg: "Please add items to the cart to proceed.",
        })
      );
    } else if (!loggedIn) {
      setShowSignUpModal(true);
    } else {
      navigate("/placeOrder");
    }
  };
  return (
    <div className="mt-14 py-5 px-2 sm:px-4 md:px-8 lg:px-12">
      <div className="text-2xl my-5">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>
      {showSignUpModal && (
        <ModalWrapper closeModal={() => setShowSignUpModal(false)}>
          <SignupModal closeModal={() => setShowSignUpModal(false)} />
        </ModalWrapper>
      )}
      <div>
        {Object.values(data).map((item, index) => {
          return (
            <div
              key={index}
              className="flex mb-5 px-4 py-2 justify-between items-center flex-wrap md:flex-nowrap bg-slate-400 dark:bg-opacity-10 shadow-lg shadow-slate-800 rounded-xl"
            >
              <div className="w-full sm:w-1/2 md:w-1/3 flex items-start gap-6">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="size-16 sm:size-20"
                />
                <div>
                  <p className="text-xs sm:text-lg font-medium dark:text-gray-300">
                    {item.title}
                  </p>
                  <span className="text-lg font-medium">
                    ${item.price.toFixed(2)}{" "}
                    <span className="pl-3 text-sm dark:text-gray-300">
                      {item.discountPercentage
                        ? ` ( ${item.discountPercentage}% OFF )`
                        : ""}
                    </span>
                  </span>
                  <Rating rating={item.rating} />
                </div>
              </div>
              <div className="flex items-center py-4 px-4 ">
                {item.quantity > 1 ? (
                  <CiCircleMinus
                    className="size-6 dark:text-gray-300 cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out"
                    onClick={() => {
                      dispatch(removeProductFromCart({ id: item.id }));
                    }}
                  />
                ) : (
                  <AiOutlineDelete
                    onClick={() => {
                      dispatch(deleteProductFromCart({ id: item.id }));
                    }}
                    className="size-6 dark:text-gray-200 cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out"
                  />
                )}

                <span className="px-3 font-medium text-xl dark:text-gray-200 transition-all duration-300 ease-in-out">
                  {item.quantity}
                </span>

                <CiCirclePlus
                  className="size-6 dark:text-gray-300 cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out"
                  onClick={() => {
                    dispatch(addProductToCart(item));
                  }}
                />
              </div>

              <FaRegHeart
                onClick={() => {
                  dispatch(deleteProductFromCart({ id: item.id }));
                  dispatch(addItemToWishList(item));
                }}
                className="hover:scale-110 md:hidden ml-1 size-5 cursor-pointer dark:text-gray-300"
              />
              <Button
                onClick={() => {
                  dispatch(deleteProductFromCart({ id: item.id }));
                  dispatch(addItemToWishList(item));
                }}
                addedClassName="hidden md:flex items-center justify-center w-30 bg-gray-700 dark:bg-slate-700  text-white"
              >
                MOVE TO <FaRegHeart className="pl-1 size-5" />
              </Button>
            </div>
          );
        })}
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full mt-5 text-end">
            <Button
              onClick={handleCheckout}
              addedClassName=" py-3 px-3 md:py-4 md:px-5 "
            >
              PROCEED TO CHECKOUT
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
