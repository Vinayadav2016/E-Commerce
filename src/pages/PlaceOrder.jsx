import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { PopUp } from "../components/MsgPopUp";
import { resetCart } from "../store/cartSlice";
import { addOrderData } from "../store/ordersSlice";
import { useDispatch, useSelector } from "react-redux";

const DeliveryInfo = ({ setDeliveryInfo, deliveryInfo }) => {
  return (
    <div className=" flex flex-col gap-4 w-full sm:max-w-[700px] bg-slate-400 dark:bg-opacity-10 shadow-lg shadow-slate-800 p-6 rounded-2xl [&>*:last-child]:mb-5">
      <div className="text-xl sm:text-2xl my-2">
        <Title text1={"DELIVERY"} text2={"INFORMATION"} />
      </div>
      <div className="flex gap-3">
        {/* value, name, type, labelText, onChange, signIn */}
        <InputField
          value={deliveryInfo.firstName}
          name="firstName"
          type="text"
          labelText={"First Name"}
          onChange={(e) => {
            setDeliveryInfo({ ...deliveryInfo, firstName: e?.target?.value });
          }}
          required
        />
        <InputField
          value={deliveryInfo.lastName}
          name="lastName"
          type="text"
          labelText={"Last Name"}
          onChange={(e) => {
            setDeliveryInfo({ ...deliveryInfo, lastName: e?.target?.value });
          }}
        />
      </div>
      <InputField
        value={deliveryInfo.email}
        name="email"
        type="email"
        labelText="Email address"
        onChange={(e) => {
          setDeliveryInfo({ ...deliveryInfo, email: e?.target?.value });
        }}
      />
      <InputField
        value={deliveryInfo.street}
        name="street"
        type="address"
        labelText="House & Street"
        onChange={(e) => {
          setDeliveryInfo({ ...deliveryInfo, street: e?.target?.value });
        }}
        required
      />
      <div className="flex gap-3">
        <InputField
          value={deliveryInfo.city}
          name="city"
          type="address"
          labelText={"City"}
          onChange={(e) => {
            setDeliveryInfo({ ...deliveryInfo, city: e?.target?.value });
          }}
        />
        <InputField
          value={deliveryInfo.state}
          name="state"
          type="address"
          labelText={"State/Province"}
          onChange={(e) => {
            setDeliveryInfo({ ...deliveryInfo, state: e?.target?.value });
          }}
        />
      </div>
      <div className="flex gap-3">
        <InputField
          value={deliveryInfo.postalCode}
          name="postalCode"
          type="address"
          labelText={"Postal Code"}
          onChange={(e) => {
            setDeliveryInfo({ ...deliveryInfo, postalCode: e?.target?.value });
          }}
          required
        />
        <InputField
          value={deliveryInfo.country}
          name="country"
          type="address"
          labelText={"Country"}
          onChange={(e) => {
            setDeliveryInfo({ ...deliveryInfo, country: e?.target?.value });
          }}
          required
        />
      </div>
      <InputField
        value={deliveryInfo.phoneNumber}
        name="phoneNumber"
        type="tel"
        labelText={"Phone Number"}
        onChange={(e) => {
          setDeliveryInfo({ ...deliveryInfo, phoneNumber: e?.target?.value });
        }}
        required
      />
    </div>
  );
};
const PaymentMethodDialog = ({
  paymentMethod,
  setPaymentMethod,
  name,
  label,
}) => {
  return (
    <div
      onClick={() => setPaymentMethod(name)}
      className="flex items-center gap-3 p-2 px-3 cursor-pointer rounded-lg bg-slate-400  dark:bg-slate-700 shadow-lg shadow-slate-800 hover:scale-105"
    >
      <p
        className={`min-w-3 aspect-square border-2 border-gray-800 dark:border-gray-300 rounded-full ${
          paymentMethod === name ? "bg-green-800" : ""
        }`}
      ></p>
      <p className="text-gray-800 text-sm font-medium mx-2 dark:text-gray-300">
        {label}
      </p>
    </div>
  );
};
const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, total, totalProducts, shippingFee } = useSelector(
    (state) => state.cart
  );
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [deliveryInfo, setDeliveryInfo] = useState({});
  const [error, setError] = useState("");
  const requiredFields = [
    "firstName",
    "street",
    "postalCode",
    "country",
    "phoneNumber",
  ];
  const checkEmptyField = () => {
    return requiredFields.find((field) => {
      return !deliveryInfo[field];
    });
  };
  const handlePlaceOrder = () => {
    if (!error) {
      const emptyField = checkEmptyField();
      if (!emptyField) {
        dispatch(
          addOrderData({
            deliveryInfo,
            paymentMethod,
            data,
            total: total + shippingFee,
          })
        );
        dispatch(resetCart());
        navigate("/orders");
      } else {
        setError(`Fill the required field ${emptyField.toUpperCase()}`);
      }
    }
  };

  useEffect(() => {
    if (totalProducts === 0) {
      setError("Cart is empty navigating to home");
      const id = setTimeout(() => {
        navigate("/");
      }, 4000);
      return () => clearTimeout(id);
    }
  }, [totalProducts]);
  return (
    <div className="relative flex flex-col sm:flex-row justify-around items-center gap-6 mt-14 py-5 px-4 md:px-8 lg:px-12">
      {/* leftSide */}
      {/*  msg,
  error = false,
  success = false,
  reset = () => {}, */}
      <div className="absolute top-2 right-2">
        <PopUp
          msg={error}
          error
          reset={() => {
            setError("");
          }}
        />
      </div>

      <DeliveryInfo
        deliveryInfo={deliveryInfo}
        setDeliveryInfo={setDeliveryInfo}
      />
      {/* right side */}
      <div className="mt-8 sm:mt-0">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-10">
          <div className="text-xl">
            <Title text1={"PAYMENT"} text2={"METHOD"} />
          </div>
          <div className="flex gap-4 flex-col ">
            <PaymentMethodDialog
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              name="COD"
              label="CASH ON DELIVERY"
            />
            <PaymentMethodDialog
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              name="ONLINE"
              label="ONLINE"
            />
          </div>
          <div className="mt-4 w-full flex justify-end">
            <Button onClick={handlePlaceOrder}>PLACE ORDER</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
