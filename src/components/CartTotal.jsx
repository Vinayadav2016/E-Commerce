import React from "react";
import Title from "./Title";

const CartTotal = () => {
  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>SubTotal</p>
          <p>$12233</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>$200</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <p>$5000</p>
        </div>
      </div>
    </div>
  );
};
export default CartTotal;
