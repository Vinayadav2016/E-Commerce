import { React, useState } from "react";

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
      <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque quos
        architecto dolore quae officia provident! Nemo consectetur asperiores
        consequatur dignissimos libero praesentium ipsa quis quae minus,
        perspiciatis dolor, nam nihil!
      </p>
      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-3/4 lg:w-1/2 flex items-center justify-between mx-auto my-4 border-2 border-gray-300 rounded-full py-3 pl-5 pr-2"
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
              for="email"
              className={`text-xs sm:text-sm md:text-base absolute top-1/2 -translate-y-1/2  peer-focus:-top-1 transition-all duration-500 ease-in-out cursor-text dark:text-gray-200`}
            >
              Enter Your Email Address
            </label>
          )}
        </div>
        <button className="bg-black text-white text-sm md:text-md rounded-full shadow-lg shadow-gray-800 hover:scale-110 transition-scale duration-500 ease-in-out py-2 px-3 md:py-2 md:px-5 ">
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsLetterBox;
