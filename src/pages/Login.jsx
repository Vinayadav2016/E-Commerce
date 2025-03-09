import React, { useState } from "react";

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const onSubmitHandler = (event) => {
    event.preventDefault();
    // perform form validation and submission logic here
    console.log("Form submitted");
  };
  return (
    <form className="flex flex-col items-center w-[90%] sm:mas-w-96 m-auto mt-14 gap-4 text-gray-800">
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">
          {isLogin ? "Login" : "Sign Up"}
        </p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {!isLogin && (
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
        />
      )}

      <input
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email address"
      />

      <input
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
      />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forget your Password?</p>
        <p className="cursor-pointer" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Login here" : "Create Account"}
        </p>
      </div>
      <button className="bg-black text-white font-light px-8 py-2 mt-4 ">
        {isLogin ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
