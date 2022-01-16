import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { newToast } from "../utils/toast";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  const navigate = useNavigate();

  const disconnectionHandler = () => {
    localStorage.removeItem("token");
    newToast("success", "You have been successfully disconnected!", 2000);
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <>
      <nav className="flex mt-5 mx-2">
        <NavLink to="/">
          <h1 className="text-7xl text-white font-serif ml-2">
            True or False?
          </h1>
        </NavLink>
        <div className="flex items-center justify-end ml-auto">
          <NavLink to="/leaderboard" className="navBtn">
            Leaderboard
          </NavLink>

          {localStorage.hasOwnProperty("token") && (
            <>
              <NavLink to="/createcard" className="navBtn">
                Create Card
              </NavLink>
              <button
                onClick={disconnectionHandler}
                className="navBtn active:border-pink-500"
              >
                Disconnect
              </button>
              <NavLink
                to="/profile"
                className="h-16 w-16 border-4 m-2 border-red-300 rounded-full"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1024px-Circle-icons-profile.svg.png"
                  alt="hello"
                />
              </NavLink>
            </>
          )}

          {!localStorage.hasOwnProperty("token") && (
            <NavLink
              to="/login"
              className="h-16 w-16 border-4 m-2 border-red-300 rounded-full"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1024px-Circle-icons-profile.svg.png"
                alt="hello"
              />
            </NavLink>
          )}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
