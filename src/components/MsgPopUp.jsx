import React, { useEffect, useState } from "react";
import { MdError } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { ModalWrapper } from "../modal/ModalWrapper";
import { AiFillInfoCircle } from "react-icons/ai";
import { resetUserMsgs } from "../store/userSlice";
import { resetCartMsgs } from "../store/cartSlice";

export const PopUp = ({
  msg,
  error = false,
  success = false,
  reset = () => {},
}) => {
  const [isHidden, setIsHidden] = useState(false);
  useEffect(() => {
    if (msg) {
      setIsHidden(false);
      const id = setTimeout(() => {
        setIsHidden(true);
        reset(); // reset the messages after 4 seconds
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
  const dispatch = useDispatch();
  return (
    <div className="z-[55] fixed top-16 right-2">
      {userError && (
        <PopUp msg={userError} reset={() => dispatch(resetUserMsgs())} error />
      )}
      {userSuccess && (
        <PopUp
          msg={userSuccess}
          success
          reset={() => dispatch(resetUserMsgs())}
        />
      )}
      {cartError && (
        <PopUp
          msg={cartError?.msg}
          error
          reset={() => {
            dispatch(resetCartMsgs());
          }}
        />
      )}
      {cartSuccess && (
        <PopUp
          msg={cartSuccess?.msg}
          success
          reset={() => {
            dispatch(resetCartMsgs());
          }}
        />
      )}
    </div>
  );
};

export default MsgPopUp;
