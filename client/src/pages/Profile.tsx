import React from "react";
import { newToast } from '../utils/toast'
import { useNavigate } from 'react-router-dom'
import CardUI from "../design/CardUI";
import  MyCards  from "./MyCards";
import {me} from '../utils/auth'

const Profile: React.FC = () => {
  const user:any = me()
  const navigate = useNavigate()

  const disconnectionHandler = () => {
    localStorage.removeItem("token");
    newToast("success", "You have been successfully disconnected!", 2000);
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <CardUI>
      <h1 className="cardTitle">My Profile</h1>
      <div className="p-2">
        <h1 className="text-2xl font-semibold">hello {user.name},</h1>
      </div>
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
