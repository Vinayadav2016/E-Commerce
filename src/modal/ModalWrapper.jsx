import { useEffect } from "react";
import { createPortal } from "react-dom";
export function ModalWrapper({ closeModal, children }) {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);
  return createPortal(
    <>
      <div
        className="fixed top-0 right-0 left-0 bottom-0 bg-slate-600 bg-opacity-10 dark:bg-slate-800 dark:bg-opacity-50"
        onClick={closeModal}
      ></div>
      {children}
    </>,
    document.querySelector(".modal")
  );
}
