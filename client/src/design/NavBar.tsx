import React from "react";
import { Link, useNavigate } from "react-router-dom";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  const navigate = useNavigate();

  const disconnectionHandler = () => {
    navigate("/");
  };

  return (
    <nav className="flex mt-5">
      <Link to="/" className="text-7xl hover:text-red-500 m-2 inline-block">
        <h1 className="">True or False ?</h1>
      </Link>
      <div className="flex items-center justify-end ml-auto">
        <Link to="/" className="text-4xl hover:text-red-500 m-2 inline-block">
          <h1 className="">Home</h1>
        </Link>
        <Link to="/leaderboard" className="text-4xl hover:text-red-500 m-4 ">
          Leaderboard
        </Link>

        <Link to="/login" className="text-4xl m-4 hover:text-red-500">
          Connect / Create Account
        </Link>
        <Link
          to="/createcard"
          className="text-4xl hover:text-red-500 m-4 active:underline"
        >
          Create Card
        </Link>
        <button
          className="text-4xl m-4 hover:text-red-500"
          onClick={() => disconnectionHandler()}
        >
          Disconnect
        </button>
        <Link to="/profile" className="text-4xl hover:text-red-500 m-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1024px-Circle-icons-profile.svg.png"
            alt="hello"
            className="h-16 w-16 "
          />
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
