import React, { useEffect, useRef, useState } from "react";
import Title from "../components/Title";
import { useDispatch, useSelector } from "react-redux";
import { createUser, loginUser } from "../store/userSlice";
import { CiUser } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
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
          className="bg-transparent order-none outline-none peer text-base text-gray-200"
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
            className="z-10 text-base font-semibold absolute left-0 text-gray-300 peer-focus:-translate-y-7 transition-all duration-500 ease-in-out"
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
      console.log("user created please sign in....");
      setIsSignIn(true);
    }
  }, [userCreated]);
  const dispatch = useDispatch();
  const onChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value, "onChange");
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };
  console.log(signIn, username, password, "onChange");
  const handleSubmit = (event) => {
    event.preventDefault();
    if (signIn) {
      dispatch(loginUser({ username, password }));
    } else {
      if (password === confirmPassword) {
        dispatch(createUser({ username, password }));
      } else {
        alert("Passwords do not match");
      }
    }
    setIsSignIn(!signIn);
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };
  if (error) {
    return <div>{error.message}</div>;
  } else if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <form
      className={`relative w-full h-full flex flex-col justify-center items-center p-4`}
    >
      <div className="h-full prata-regular py-3 text-2xl text-center font-semibold text-gray-200">
        {signIn ? "SIGN IN" : "SIGN UP"}
      </div>

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
      <div
        className="w-3/4 cursor-pointer text-end text-gray-300 hover:underline underline-offset-2"
        onClick={() => setIsSignIn(!signIn)}
      >
        {signIn ? "Sign Up" : "Sign In"}
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
    <div className="z-50 bg-slate-400 dark:bg-slate-800 border-2 border-gray-300 w-3/4 min-h-1/2 md:w-1/2 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl flex flex-col justify-center items-center overflow-hidden">
      <IoClose
        onClick={closeModal}
        className="z-[51] absolute top-2 right-2 size-6 dark:text-gray-300 cursor-pointer hover:scale-125"
      />
      <div
        className={`w-full flex items-center [&>*]:flex-shrink-0 [&>*]:flex-grow-0 transition-all duration-500 ease-in-out ${
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
