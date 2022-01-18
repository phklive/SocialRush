import React from "react";
import { newToast } from '../utils/toast'
import { useNavigate } from 'react-router-dom'
import CardUI from "../design/CardUI";
import MyCards from "./MyCards";
import ProfileInfo from "./ProfileInfo";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";


const Profile: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const disconnectionHandler = () => {
    localStorage.removeItem("token");
    newToast("success", "You have been successfully disconnected!", 2000);
    setTimeout(() => {
      dispatch(logout())
      navigate("/");
    }, 2000);
  };

  return (
      <CardUI>
        <h1 className="cardTitle">My profile</h1>
        <ProfileInfo />
        <MyCards />
        <button
          onClick={disconnectionHandler}
          className="cardBtn"
        >
          Disconnect
        </button>
      </CardUI>
  );
};

export default Profile;
