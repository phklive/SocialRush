import React, {useContext, useState} from "react";
import {NavLink} from "react-router-dom";
import {AuthContext} from "../pages/AuhthContext";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBars, faTimes} from '@fortawesome/free-solid-svg-icons'


const NavBar: React.FC = () => {
  const [menu, setMenu] = useState(true)

  const {session} = useContext(AuthContext)

  const menuHandler = () => {
    setMenu((state) => !state)
  }

  return (
    <nav className="md:flex md:justify-between md:items-center p-2">
      <div className="flex justify-between items-center">
        <NavLink to='/' className="text-4xl mr-10 md:text-7xl whitespace-nowrap">
          Sheep or Not? 
        </NavLink>
      {menu ? 
        <FontAwesomeIcon  icon={faBars} className="text-3xl cursor-pointer md:hidden block mx-2" onClick={menuHandler}/>
        :
        <FontAwesomeIcon  icon={faTimes} className="text-3xl cursor-pointer md:hidden block mx-2" onClick={menuHandler}/>
      }
      </div>
      {session && (
      <div className={menu ? 'list' : 'md:flex md:items-center z-[-1] md:z-auto md:static  w-full left-0 md:w-auto md:py-0 py-2 md:pl-0 pl-7 md:opacity-100 transition-all ease-in duration-500 opacity-100'}>
        <NavLink to='/play' className="text-3xl my-6 mx-2 block md:my-0">
          Play
        </NavLink>
        <NavLink to='/createcard' className="text-3xl my-6 mx-2 block md:my-0 whitespace-nowrap">
          Create card
        </NavLink>
        <NavLink to='/leaderboard' className="text-3xl my-6 mx-2 block md:my-0">
          Leaderboard
        </NavLink>
        <NavLink to='/profile' className="text-3xl my-6 mx-2 block md:my-0">
          Profile
        </NavLink>
      </div>
      )}

      {!session && (
        <NavLink to='/play' className="text-3xl m-2">
          Play
        </NavLink>
      )}

    </nav>
  );
};

export default NavBar;
