import React from "react";
import logo from "../assests/images/logo.png";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/" className="flex items-center">
      <img className="w-10" src={logo} alt="logo" />
      <div className="text-xl font-bold text-gray-700 dark:text-gray-200">
        FLIPZON
      </div>
    </Link>
  );
}

const Footer = () => {
  return (
    <>
      <div className="flex justify-around items-start gap-16 w-full px-2 sm:px-4 md:px-8 lg:px-12 py-10 dark:bg-slate-800 bg-slate-400 mt-16">
        {/* logo and information */}
        <div className="flex-1 flex flex-col gap-5">
          <Logo />
          <p className="text-md text-gray-600 dark:text-gray-400">
            FILPZON – Your one-stop shop for quality products at unbeatable
            prices. Enjoy fast shipping, secure payments, and excellent customer
            support. Shop with confidence today! 🚀✨
          </p>
        </div>
        {/* company pages */}
        <div className="flex flex-col gap-5">
          <h1 className="text-gray-800 dark:text-gray-200 text-xl font-semibold leading-3 my-2 ">
            COMPANY
          </h1>
          <div className="flex flex-col gap-1 [&>*]:text-md text-gray-600 dark:text-gray-400 [&>*]:cursor-pointer">
            <Link
              to="/about"
              className="hover:scale-110 dark:hover:text-white hover:text-black transition-all duration-500 ease-in-out"
            >
              ABOUT US
            </Link>
            <Link
              to="/"
              className="hover:scale-110 dark:hover:text-white hover:text-black transition-all duration-500 ease-in-out"
            >
              HOME
            </Link>
            <Link
              to="/collection"
              className="hover:scale-110 dark:hover:text-white hover:text-black transition-all duration-500 ease-in-out"
            >
              COLLECTION
            </Link>
            <Link
              to="/contact"
              className="hover:scale-110 dark:hover:text-white hover:text-black transition-all duration-500 ease-in-out"
            >
              CONTACT
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h1 className="text-gray-800 dark:text-gray-200 text-xl font-semibold leading-3 my-2">
            GET IN TOUCH
          </h1>
          <div className="flex flex-col gap-1 [&>*]:text-md text-gray-600 dark:text-gray-400 [&>*]:cursor-pointer">
            <p className="hover:scale-110 dark:hover:text-white hover:text-black transition-all duration-500 ease-in-out">
              Email: contactUs@filpzon.com
            </p>
            <p className="hover:scale-110 dark:hover:text-white hover:text-black transition-all duration-500 ease-in-out">
              Phone: +123 456 7890
            </p>
            <p className="hover:scale-110 dark:hover:text-white hover:text-black transition-all duration-500 ease-in-out">
              Address: 123 Main St, City, State, ZIP
            </p>
          </div>
        </div>
      </div>
      <div className="text-center bg-slate-400 dark:bg-slate-800 pb-4 text-gray-800 font-semibold dark:text-gray-200">
        &copy; 2025 E-Commerce Store. All rights reserved.
      </div>
    </>
  );
};

export default Footer;
