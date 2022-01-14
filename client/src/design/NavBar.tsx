import React from "react";
import { Link, useNavigate } from "react-router-dom";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  const navigate = useNavigate();

  const disconnectionHandler = () => {
    navigate("/");
  };

  return (
    <nav className="flex mt-5 mx-2">
      <Link to="/">
        <h1 className="text-7xl text-white font-serif ml-2">True or False?</h1>
      </Link>
      <div className="flex items-center justify-end ml-auto">
        <Link to="/createcard" className="navBtn">
          Create Card
        </Link>

        <Link to="/leaderboard" className="navBtn">
          Leaderboard
        </Link>

        <Link to="/login" className="">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1024px-Circle-icons-profile.svg.png"
            alt="hello"
            className="h-16 w-16 border-4 m-2 border-red-300 rounded-full"
          />
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
