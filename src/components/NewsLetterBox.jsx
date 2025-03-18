import { React, useState } from "react";
import Button from "./Button";

const NewsLetterBox = () => {
  const [email, setEmail] = useState("");
  const onSubmitHandler = (event) => {
    event.preventDefault();
    //TODO perform form validation and submission logic here
  };
  return (
    <div className="flex flex-col items-center justify-center my-10 ">
      <div className="text-xl sm:text-2xl md:text-3xl font-semibold dark:text-white">
        Subscribe Now & get 20% Off
      </div>
      <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 text-center mt-3">
        Stay in the loop! 📩 Subscribe now and get a 20% OFF coupon on your
        first order!
      </p>
      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-3/4 lg:w-1/2 flex items-center justify-between mx-auto my-4 border-2 border-gray-800 dark:border-gray-300 rounded-full py-3 pl-5 pr-2"
      >
        <div className="relative flex flex-1">
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="bg-transparent text-sm sm:text-md md:text-base text-gray-600 dark:text-white peer border-none outline-none w-full"
          />
          {!email && (
            <label
              htmlFor="email"
              className={`text-xs sm:text-sm md:text-base absolute top-1/2 -translate-y-1/2  peer-focus:-top-1 transition-all duration-500 ease-in-out cursor-text dark:text-gray-200`}
            >
              Enter Your Email Address
            </label>
          )}
        </div>
        <Button className="md:py-2 lg:py-2">SUBSCRIBE</Button>
      </form>
    </div>
  );
};

export default NewsLetterBox;
