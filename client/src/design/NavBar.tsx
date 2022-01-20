import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux'

const NavBar: React.FC = () => {

  const isAuth = useSelector((state: any) => state.auth.isAuth)

  return (
    <nav className="flex mt-5 mx-2 overflow-hidden sticky">
      <NavLink to="/" className="text-7xl text-black font-serif ml-2">
        <h1>
          True or False?
        </h1>
      </NavLink>
      <div className="flex items-center justify-end ml-auto">
        {isAuth && (
          <>
            <NavLink to="/play" className="navBtn">
              Play
            </NavLink>
            <NavLink to="/createcard" className="navBtn">
              Create Card
            </NavLink>
            <NavLink to="/leaderboard" className="navBtn">
              Leaderboard
            </NavLink>
            <NavLink
              to="/profile"
              className="h-16 w-16 m-2"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1024px-Circle-icons-profile.svg.png"
                alt="hello"
              />
            </NavLink>
          </>
        )}


        {!isAuth && (
          <>
            <NavLink to="/login" className="navBtn">
              Play
            </NavLink>
            <NavLink to="/leaderboard" className="navBtn">
              Leaderboard
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
