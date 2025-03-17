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

      <div className="flex flex-col gap-2 mt-2 text-md font-semibold dark:text-gray-300 [&>*]:border-b-2 [&>*]:border-slate-800 [&>*]:dark:border-gray-300 [&>*]:pb-3 [&>*:last-child]:border-b-0">
        <div className="flex justify-between">
          <p>SubTotal</p>
          <p>${total}</p>
        </div>
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>${shippingFee}</p>
        </div>
        <div className="flex justify-between">
          <b>Total</b>
          <p>${total + shippingFee}</p>
        </div>
      </div>
    </div>
  );
};
export default CartTotal;
