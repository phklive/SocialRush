import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../pages/AuhthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const NavBar: React.FC = () => {
  const [menu, setMenu] = useState(true);

  const { session } = useContext(AuthContext);

  const menuHandler = () => {
    setMenu((state) => !state);
  };

  return (
    <>
      <nav className="md:flex md:justify-between md:items-center p-2 mb-10 md:mb-20">
        <NavLink to="/" className="mr-10">
          <img
            alt="logo"
            src={require("../styles/assets/Social Rush (3)_preview_rev_1.png")}
            className="h-60 -top-16 -left-10 md:h-80 md:-top-24 md:-left-14 absolute"
            onClick={() => {
              setMenu(true);
            }}
          />
        </NavLink>

        {session && (
          <>
            <div className="flex justify-between items-center">
              {menu ? (
                <FontAwesomeIcon
                  icon={faBars}
                  className="text-3xl cursor-pointer md:hidden block mx-2 absolute top-6 right-3"
                  onClick={menuHandler}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faTimes}
                  className="text-3xl cursor-pointer md:hidden block mx-2 absolute top-6 right-3"
                  onClick={menuHandler}
                />
              )}
            </div>
            <div
              className={
                menu
                  ? "list"
                  : "md:flex md:items-center z-[-1] md:z-auto md:static left-0 translate-y-12 w-full md:w-auto md:py-0 py-2 md:pl-0 pl-7 md:opacity-100 transition-all ease-in duration-500 opacity-100"
              }
            >
              <NavLink
                to="/play"
                className="text-2xl md:text-3xl my-3 mx-2 block md:my-0 pinky"
                onClick={() => {
                  setMenu(true);
                }}
              >
                Play
              </NavLink>
              <NavLink
                to="/createcard"
                className="text-2xl md:text-3xl my-3 mx-2 block pinky md:my-0 whitespace-nowrap"
                onClick={() => {
                  setMenu(true);
                }}
              >
                Create card
              </NavLink>
              <NavLink
                to="/leaderboard"
                className="text-2xl md:text-3xl my-3 mx-2 block md:my-0 pinky"
                onClick={() => {
                  setMenu(true);
                }}
              >
                Leaderboard
              </NavLink>
              <NavLink
                to="/profile"
                className="text-2xl md:text-3xl my-3 mx-2 block md:my-0 pinky"
                onClick={() => {
                  setMenu(true);
                }}
              >
                Profile
              </NavLink>
            </div>
          </>
        )}
      </nav>
    </>
  );
};

export default NavBar;
