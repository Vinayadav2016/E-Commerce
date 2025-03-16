import React, { useEffect, useRef, useState } from "react";
import Title from "../components/Title";
import { useDispatch, useSelector } from "react-redux";
import { createUser, loginUser } from "../store/userSlice";
import { CiUser } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { PopUp } from "../components/MsgPopUp";
// import { createUser } from "../store/userSlice";
const InputField = ({ value, name, type, labelText, onChange, signIn }) => {
  return (
    <div className="w-full md:w-3/4 py-1 px-1 border-b-2 border-slate-300 flex justify-between items-center gap-3">
      {name === "username" ? (
        <CiUser className="text-gray-300" />
      ) : (
        <RiLockPasswordLine className="text-gray-300" />
      )}
      <div className="relative flex-1">
        <input
          className="w-full bg-transparent order-none outline-none peer text-base text-gray-200"
          type={type}
          value={value}
          name={name}
          id={signIn ? `${name}1` : name}
          onChange={onChange}
          required
        />
        {!value && (
          <label
            htmlFor={signIn ? `${name}1` : name}
            className=" text-base font-semibold absolute left-0 text-gray-300 peer-focus:-translate-y-7 transition-all duration-500 ease-in-out"
          >
            {labelText}
          </label>
        )}
      </div>
    </div>
  );
};

const Form = ({ signIn = false, setIsSignIn, closeModal }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");
  const {
    error,
    isLoading,
    loggedIn,
    data: { userCreated = false } = {},
  } = useSelector((state) => state.user);
  useEffect(() => {
    if (loggedIn) {
      closeModal();
    }
  }, [loggedIn]);
  useEffect(() => {
    if (userCreated) {
      setIsSignIn(true);
      setUsername("");
      setPassword("");
      setConfirmPassword("");
    }
  }, [userCreated]);
  const dispatch = useDispatch();
  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(
      username ? username : false,
      password ? password : false,
      confirmPassword ? confirmPassword : ""
    );
    if (!username) {
      setFormError("Username is required");
      return;
    }
    if (!password) {
      setFormError("Password is required");
      return;
    }
    if (signIn) {
      dispatch(loginUser({ username, password }));
    } else {
      if (!confirmPassword) {
        setFormError("Confirm Password is required");
        return;
      }
      if (password === confirmPassword) {
        dispatch(createUser({ username, password }));
      } else {
        setFormError("Passwords do not match");
      }
    }
  };
  useEffect(() => {
    if (formError) {
      const id = setTimeout(() => {
        setFormError("");
      }, 4000);
      return () => clearTimeout(id);
    }
  }, [formError]);
  console.log(formError);
  return (
    <form
      className={`relative w-full flex flex-col justify-center items-center p-4`}
    >
      {formError && (
        <div className="absolute top-16 right-2">
          <PopUp msg={formError} error />
        </div>
      )}
      <div className="h-full prata-regular py-3 text-2xl text-center font-semibold text-gray-200">
        {signIn ? "SIGN IN" : "SIGN UP"}
      </div>
      {isLoading && (
        <div className="z-10 absolute bg-slate-400 dark:bg-slate-800 top-0 left-0 bottom-0 right-0 flex items-center justify-center text-white text-2xl">
          <div className="animate-pulse">Loading...</div>
        </div>
      )}
      <div
        className="absolute -z-20 top-[10%] left-[10%] w-3/4 h-3/4 bg-gradient-to-t blur-[150px] from-slate-800 to-gray-800 dark:from-slate-800 dark:to-gray-200"
        style={{ borderRadius: "20% 30% 80% 10%" }}
      ></div>

      <div className="my-5 w-full flex flex-col gap-6 justify-center items-center">
        <InputField
          name="username"
          labelText="Username"
          type="text"
          value={username}
          onChange={onChange}
          signIn={signIn}
        />
        <InputField
          name="password"
          type="password"
          labelText="Password"
          value={password}
          onChange={onChange}
          signIn={signIn}
        />
        {!signIn && (
          <InputField
            name="confirmPassword"
            type="password"
            labelText="Confirm Password"
            value={confirmPassword}
            onChange={onChange}
            signIn={signIn}
          />
        )}
      </div>
      <div className="w-3/4 text-end text-gray-300 ">
        <span
          onClick={() => setIsSignIn(!signIn)}
          className="cursor-pointer hover:underline underline-offset-2"
        >
          {signIn ? "Sign Up" : "Sign In"}
        </span>
      </div>
      <button
        onClick={handleSubmit}
        className="bg-black text-white text-sm md:text-md rounded-full shadow-sm shadow-gray-300 hover:scale-110 transition-scale duration-500 ease-in-out py-2 px-4 md:py-2 md:px-5 "
      >
        {"SIGN "} {signIn ? "IN" : "UP"}
      </button>
    </form>
  );
};

const SignupModal = ({ closeModal }) => {
  const [isSignIn, setIsSignIn] = useState(false);
  return (
    <div className="z-50 bg-slate-400 dark:bg-slate-800 border-2 border-gray-300 w-3/4 min-h-[50%] md:w-1/2 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl flex flex-col justify-center items-center overflow-hidden shadow-lg shadow-slate-800">
      <IoClose
        onClick={closeModal}
        className="z-[51] absolute top-2 right-2 size-6 dark:text-gray-300 cursor-pointer hover:scale-125"
      />
      <div
        className={`w-full h-full flex items-stretch [&>*]:flex-shrink-0 [&>*]:flex-grow-0 transition-all duration-500 ease-in-out ${
          isSignIn ? "-translate-x-[100%]" : ""
        }`}
      >
        <Form setIsSignIn={setIsSignIn} closeModal={closeModal} />
        <Form signIn setIsSignIn={setIsSignIn} closeModal={closeModal} />
      </div>
    </div>
  );
};

export default SignupModal;
