import React from "react";
import Title from "./Title";
import { useSelector } from "react-redux";

const CartTotal = () => {
  const { total, totalQuantity, shippingFee } = useSelector(
    (state) => state.cart
  );
  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"CART"} text2={"TOTAL"} />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-md font-semibold dark:text-gray-300">
        <div className="flex justify-between">
          <p>SubTotal</p>
          <p>${total}</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>${shippingFee}</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <p>${total + shippingFee}</p>
        </div>
      </div>
    </div>
  );
};
export default CartTotal;
