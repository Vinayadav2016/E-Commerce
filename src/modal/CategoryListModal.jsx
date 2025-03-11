import React from "react";
import { MdCancel } from "react-icons/md";

const CategoryListModal = ({ closeModal, children }) => {
  return (
    <div
      className={`z-50 fixed top-1/2 left-1/2 w-3/4 max-h-[70%] transform -translate-x-1/2 -translate-y-1/2 bg-slate-400 dark:bg-slate-600 dark:text-gray-200 p-5 rounded-lg shadow-lg shadow-slate-800 overflow:hidden overflow-y-scroll`}
    >
      <MdCancel
        className="size-5 absolute top-2 right-2 cursor-pointer hover:scale-110"
        onClick={closeModal}
      />
      {children}
    </div>
  );
};

export default CategoryListModal;
