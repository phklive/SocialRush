import React, { useContext, useState } from "react";
import { newToast } from "../utils/toast";
import { useNavigate } from "react-router-dom";
import MyCards from "./MyCards";
import ProfileInfo from "./ProfileInfo";
import Modal from "../design/Modal";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "./AuhthContext";

const LOGOUT_MUTATION = `
mutation Mutation {
  logoutUser
}
`;

const Profile: React.FC = () => {
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const { setSession } = useContext(AuthContext);

  const modalHandler = () => {
    setModal((oldstate) => !oldstate);
  };

  const logout = () => {
    fetch("http://localhost:4000/graphql", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query: LOGOUT_MUTATION }),
    })
      .then((r) => r.json())
      .then(() => setSession(false));
  };

  const disconnectionHandler = () => {
    newToast("success", "You have been successfully disconnected!", 2000);
    setTimeout(() => {
      navigate("/");
      logout();
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
        style={{ width: "600px" }}
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
      <div className="flex-col playCard w-11/12 md:w-1/2 p-2">
        <ProfileInfo />
        <MyCards />
        <button onClick={modalHandler} className="m-2 accountBtn">
          Disconnect
        </button>
      </div>
    </>
  );
};

export default Profile;
