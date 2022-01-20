import React, { useState } from "react";
import { newToast } from '../utils/toast'
import { useNavigate } from 'react-router-dom'
import MyCards from "./MyCards";
import ProfileInfo from "./ProfileInfo";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import Modal from "../design/Modal";
import { ToastContainer } from "react-toastify";

const Profile: React.FC = () => {
  const [modal, setModal] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const modalHandler = () => {
    setModal((oldstate) => !oldstate)
  }

  const disconnectionHandler = () => {
    localStorage.removeItem("token");
    newToast("success", "You have been successfully disconnected!", 2000);
    setTimeout(() => {
      dispatch(logout())
      navigate("/");
    }, 2000);
  };

  return (
    <>
      <Modal
        title="Disconnect"
        text="Are you sure you want to disconnect?"
        btn="Disconnect"
        open={modal}
        close={modalHandler}
        exec={disconnectionHandler}
      />
      <ToastContainer
        style={{width:"500px"}}
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
      <div className="accountCard flex-col p-2">
        <ProfileInfo />
        <MyCards />
        <button
          onClick={modalHandler}
          className="accountBtn"
        >
          Disconnect
        </button>
      </div>
    </>
  );
};

export default Profile;
