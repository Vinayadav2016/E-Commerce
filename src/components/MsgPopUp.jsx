import React, { useEffect, useState } from "react";
import { MdError } from "react-icons/md";
import { useSelector } from "react-redux";
import { ModalWrapper } from "../modal/ModalWrapper";
import { AiFillInfoCircle } from "react-icons/ai";

export const PopUp = ({ msg, error = false, success = false }) => {
  const [isHidden, setIsHidden] = useState(false);
  useEffect(() => {
    if (msg) {
      setIsHidden(false);
      const id = setTimeout(() => {
        setIsHidden(true);
      }, 4000);
      return () => clearTimeout(id);
    }
  }, [msg]);
  return msg && !isHidden ? (
    <div
      className={` ${error && "bg-red-800 "} ${
        success && "bg-green-800 "
      } cursor-pointer min-w-40 px-4 py-2 rounded-lg overflow-hidden`}
    >
      <div className="flex items-center gap-2 text-white">
        {error && <MdError className="text-white" />}
        {success && <AiFillInfoCircle className="text-white" />}
        <div>{msg}</div>
      </div>
      <div
        className={`absolute bottom-0 left-0 ${error && "bg-yellow-500"} ${
          success && "bg-white"
        } w-0 h-[5px] rounded-full animate-reduce-width`}
      ></div>
    </div>
  ) : null;
};
const MsgPopUp = () => {
  const { error: userError, success: userSuccess } = useSelector(
    (state) => state.user
  );
  const {
    errorMsg: cartError,
    successMsg: cartSuccess,
    data,
  } = useSelector((state) => state.cart);
  return (
    <div className="z-[55] fixed top-16 right-2">
      {userError && <PopUp msg={userError} error />}
      {userSuccess && <PopUp msg={userSuccess} success />}
      {cartError && <PopUp msg={cartError?.msg} error />}
      {cartSuccess && <PopUp msg={cartSuccess?.msg} success />}
    </div>
  );
};

export default MsgPopUp;
