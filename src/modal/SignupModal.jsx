import React, { useEffect, useRef, useState } from "react";
import Title from "../components/Title";
import { useDispatch, useSelector } from "react-redux";
import { createUser, loginUser } from "../store/userSlice";

import { IoClose } from "react-icons/io5";
import { PopUp } from "../components/MsgPopUp";
import InputField from "../components/InputField";

const Form = ({ signIn = false, setIsSignIn, closeModal }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
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
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  }, [userCreated]);
  const dispatch = useDispatch();
  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === "username") setUsername(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };
  const checkError = () => {
    if (!email) {
      setFormError("Email is required");
      return true;
    }
    if (!password) {
      setFormError("Password is required");
      return true;
    }
    if (!signIn) {
      if (!username) {
        setFormError("Username is required");
        return true;
      }
      if (!confirmPassword) {
        setFormError("Confirm Password is required");
        return true;
      }
      if (password !== confirmPassword) {
        setFormError("Passwords do not match");
        return true;
      }
    }
    return false;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!checkError()) {
      if (signIn) {
        dispatch(loginUser({ email, password }));
      } else {
        dispatch(createUser({ username, email, password }));
      }
    }
  };

  return (
    <div className={`relative w-full flex justify-center items-center `}>
      <form className="flex w-full flex-col justify-center items-center p-4">
        {formError && (
          <div className="absolute top-16 right-2">
            <PopUp msg={formError} error reset={() => setFormError("")} />
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

        <div className="my-5 w-full md:w-3/4 px-4 flex flex-col gap-6 justify-center items-center">
          {!signIn && (
            <InputField
              name="username"
              labelText="Username"
              type="text"
              value={username}
              onChange={onChange}
              signIn={signIn}
            />
          )}
          <InputField
            name="email"
            labelText="Email"
            type="email"
            value={email}
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
    </div>
  );
};

const SignupModal = ({ closeModal }) => {
  const [isSignIn, setIsSignIn] = useState(false);
  return (
    <div className="z-50 bg-slate-400 dark:bg-slate-800 border-2 border-gray-300 w-3/4 md:w-1/2 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] rounded-2xl flex flex-col justify-center items-center overflow-hidden shadow-lg shadow-slate-800">
      <IoClose
        onClick={closeModal}
        className="z-[51] absolute top-2 right-2 size-6 dark:text-gray-300 cursor-pointer hover:scale-125"
      />
      <div
        className={`w-full flex items-stretch [&>*]:flex-shrink-0 [&>*]:flex-grow-0 transition-all duration-500 ease-in-out ${
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
