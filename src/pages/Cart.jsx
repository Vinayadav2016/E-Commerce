import React from "react";
import Title from "../components/Title";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import CartTotal from "../components/CartTotal";
import { Link } from "react-router-dom";
const Cart = () => {
  const { isLoading, error, data } = useSelector((state) => state.cart);
  const { products } = data;
  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>
      <div>
        {products.map((item, index) => {
          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] item-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-16 sm:w-20 h-16"
                />
                <div>
                  <p className="text-xs sm:text-lg font-medium">{item.name}</p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>{item.price}</p>
                  </div>
                </div>
              </div>
              <input
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                type="number"
                min={1}
                defaultValue={item.quantity}
              />
              <MdDelete className="w-4 mr-4 sm:w-5 cursor-pointer" />
            </div>
          );
        })}
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <Link to="/placeOrder">
              <button className="bg-black text-white text-sm my-8 px-8 py-3">
                PROCEED TO CHECKOUT
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
