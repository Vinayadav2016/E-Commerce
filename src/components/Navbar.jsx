import React, { useEffect, useState } from "react";
import logo from "../assests/images/logo.png";
import { Link, NavLink } from "react-router-dom";
import {
  CiMenuBurger,
  CiSearch,
  CiShoppingCart,
  CiUser,
  CiHeart,
} from "react-icons/ci";
import { IoSunnyOutline } from "react-icons/io5";
import { FaMoon, FaUserCircle } from "react-icons/fa";
import { ModalWrapper } from "../modal/ModalWrapper";
import SignupModal from "../modal/SignupModal";
import { useSelector, useDispatch } from "react-redux";
import { logOutUser } from "../store/userSlice";
import { MdWavingHand } from "react-icons/md";

function LinkContainer({ path, pageName, toggleShowModal = () => {} }) {
  return (
    <NavLink
      to={path}
      onClick={toggleShowModal}
      className="flex flex-col gap-[0.1rem] items-center group"
    >
      <p
        className=" group-hover:scale-110 group-hover:text-black dark:group-hover:text-white
        text-gray-700 dark:text-gray-200 transition-all duration-500 text-base "
      >
        {pageName}
      </p>
      <hr className="hidden sm:block w-0 h-[1.5px] border-none bg-gray-600 dark:bg-gray-200 transition-all duration-500 group-hover:w-1/2" />
    </NavLink>
  );
}
function NavLinks({ className, toggleShowModal }) {
  const links = [
    { path: "/", pageName: "HOME" },
    { path: "/collection", pageName: "COLLECTION" },
    { path: "/about", pageName: "ABOUT" },
    { path: "/contact", pageName: "CONTACT" },
  ];
  return (
    <div className={className}>
      {links.map((link, index) => {
        return (
          <LinkContainer
            key={index}
            toggleShowModal={toggleShowModal}
            {...link}
          />
        );
      })}
    </div>
  );
}

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

function User() {
  const dispatch = useDispatch();
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const {
    loggedIn,
    data: { name: username = "", email = "" } = {},
    error,
  } = useSelector((state) => state.user);
  return (
    <div className="group relative py-2">
      <CiUser
        onClick={() => {
          if (!loggedIn) setShowSignUpModal(!showSignUpModal);
        }}
        className="group-hover:size-5  transition-all duration-500 text-gray-700 dark:text-gray-200 group-hover:text-black dark:group-hover:text-white"
      />
      {showSignUpModal && (
        <ModalWrapper closeModal={() => setShowSignUpModal(false)}>
          <SignupModal closeModal={() => setShowSignUpModal(false)} />
        </ModalWrapper>
      )}
      {/* dropdown menu for user profile */}
      {loggedIn && (
        <div
          className="group-hover:block absolute right-0 top-[2rem] w-40 py-4 px-4
       bg-slate-400 dark:bg-slate-200 dark:bg-opacity-20  dark:text-gray-200 rounded-md text-gray-700 hidden"
        >
          <div className="cursor-context-menu hover:text-black dark:hover:text-white flex gap-2 items-center justify-center font-semibold mb-2">
            <FaUserCircle />
            <span className="capitalize  ">{username}</span>
          </div>
          <Link
            to="/orders"
            className="cursor-pointer block p-1 rounded-lg hover:bg-gray-800 hover:dark:bg-slate-800 hover:text-white"
          >
            Orders
          </Link>
          <div
            onClick={() => {
              dispatch(logOutUser());
            }}
            className="cursor-pointer p-1 rounded-lg hover:bg-gray-800 hover:dark:bg-slate-800 hover:text-white"
          >
            Logout
          </div>
        </div>
      )}
    </div>
  );
}

function SideIcons({ toggleShowModal }) {
  const [darkMode, setDarkMode] = useState(true);
  function toggleDarkMode() {
    document.body.classList.toggle("dark");
    setDarkMode(!darkMode);
  }
  const { totalQuantity = 0 } = useSelector((state) => state.cart);
  return (
    <div
      className="flex items-center gap-3 [&>*]:cursor-pointer [&>*]:transition-all [&>*]:duration-500 
    "
    >
      <CiSearch className="hover:size-5 text-gray-700 hover:text-black dark:text-gray-200 dark:hover:text-white " />
      <User />
      <Link to="/wishlist">
        <CiHeart className="hover:size-5 text-gray-700 hover:text-black dark:text-gray-200 dark:hover:text-white " />
      </Link>
      <Link to="/cart" className="relative group">
        <CiShoppingCart className="group-hover:size-5 text-gray-700 group-hover:text-black dark:text-gray-200 dark:group-hover:text-white transition-all duration-500" />
        <div className="bg-black dark:bg-white absolute top-[-8px] right-[-8px] w-4 leading-4 text-center text-white dark:text-black text-[10px] rounded-full">
          {totalQuantity}
        </div>
      </Link>
      <CiMenuBurger
        onClick={toggleShowModal}
        className=" sm:hidden hover:size-5 text-gray-700 hover:text-black dark:text-gray-200 dark:hover:text-white "
      />
      <div
        onClick={toggleDarkMode}
        className="ml-3 group rounded-full aspect-square p-2 flex justify-center items-center bg-slate-500 dark:bg-slate-200 bg-opacity-0 dark:bg-opacity-0 hover:bg-opacity-100 transition-all duration-500"
      >
        {darkMode ? (
          <IoSunnyOutline className="text-white group-hover:text-orange-700 transition-all duration-500" />
        ) : (
          <FaMoon className=" group-hover:text-white transition-all duration-500 " />
        )}
      </div>
    </div>
  );
}

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  function toggleShowModal() {
    setShowModal(!showModal);
  }
  return (
    <div className="fixed z-[1000] top-0 w-full flex items-center justify-between gap-5 h-14 px-2 sm:px-4 md:px-8 lg:px-12  bg-slate-400 dark:bg-slate-800 ">
      {/* logo & name */}
      <Logo />
      {/* links to different pages */}
      <NavLinks className={" gap-3 hidden sm:flex "} />
      {/* quick access icon */}
      <SideIcons toggleShowModal={toggleShowModal} />
      {/* modal for sideBar menu below sm size */}
      {showModal && (
        <ModalWrapper closeModal={toggleShowModal}>
          <NavLinks
            className={
              "fixed right-0 bottom-0 top-14 w-1/2 flex flex-col  gap-4 py-4 px-5 bg-slate-400 dark:bg-slate-800 "
            }
            toggleShowModal={toggleShowModal}
          />
        </ModalWrapper>
      )}
    </div>
  );
};

export default Navbar;
