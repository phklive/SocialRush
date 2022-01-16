import React from "react";
import CardUI from "../design/CardUI";
import MyCards from "./MyCards";

const Profile: React.FC = () => {
  return (
    <CardUI>
      <h1 className="cardTitle">My Profile</h1>

      <MyCards />
    </CardUI>
  );
};

export default Profile;
