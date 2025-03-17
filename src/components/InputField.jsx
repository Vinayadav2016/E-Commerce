import React from "react";
import { CiUser } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { IoLocation } from "react-icons/io5";
import { FaPhoneAlt, FaRegUser } from "react-icons/fa";

const Icon = ({ type }) => {
  return type === "tel" ? (
    <FaPhoneAlt className="text-gray-800 dark:text-gray-300" />
  ) : type === "address" ? (
    <IoLocation className="text-gray-800 dark:text-gray-300" />
  ) : type === "text" ? (
    <FaRegUser className="text-gray-800 dark:text-gray-300" />
  ) : type === "email" ? (
    <MdOutlineAlternateEmail className="text-gray-800 dark:text-gray-300" />
  ) : (
    <RiLockPasswordLine className="text-gray-800 dark:text-gray-300" />
  );
};
const InputField = ({
  value = "",
  name = "",
  type = "",
  labelText = "",
  onChange = () => {},
  signIn = false,
  required = false,
}) => {
  return (
    <div className="w-full py-1 px-1 border-b-2 border-gray-800 dark:border-slate-300 flex justify-between items-center gap-3 ">
      <Icon type={type} />
      <div className="relative flex-1">
        <input
          className="w-full bg-transparent order-none outline-none peer text-sm text-gray-800 dark:text-gray-200 "
          type={type}
          value={value}
          name={name}
          id={signIn ? `${name}1` : name}
          onChange={onChange}
        />
        {required && (
          <span className="absolute top-0 right-0 text-gray-800 dark:text-white">
            *
          </span>
        )}
        {!value && (
          <label
            htmlFor={signIn ? `${name}1` : name}
            className=" text-sm font-semibold absolute left-0 text-gray-800 dark:text-gray-300 peer-focus:-translate-y-5 transition-all duration-500 ease-in-out"
          >
            {labelText}
          </label>
        )}
      </div>
    </div>
  );
};
export default InputField;
