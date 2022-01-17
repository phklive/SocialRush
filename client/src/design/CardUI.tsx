import React from "react";
import { ToastContainer } from "react-toastify";
import "../styles/index.css";

interface CardUIProps {
  children: any;
  style?: string
}

const CardUI: React.FC<CardUIProps> = ({ children, style }) => {
  return (
    <>
      <ToastContainer
        style={{ width: "400px" }}
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className={`${style} center  pink p-2 max-h-fit w-1/2 rounded-xl flex flex-col border-gray-400 border-4`}>
        {children}
      </div>
    </>
  );
};

export default CardUI;
