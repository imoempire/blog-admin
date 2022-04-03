import React from "react";
import { NavLink } from "react-router-dom";
import { AiFillHome, AiFillFolderAdd } from "react-icons/ai";

const NavItem = ({to, value, close, Icon}) =>{
   const common = "flex items-center space-x-2 w-full p-2 block whitespace-nowrap";
   const active = common + " bg-blue-500 text-white"
   const inActive = common + " text-gray-500"
   return (
      <NavLink className={({isActive}) => isActive ? active : inActive} to={to}>
         {Icon}
         <span className={close ? 'w-0 transition-width overflow-hidden' : 'w-full transition-width overflow-hidden' }>
            {value}
         </span>
      </NavLink>
   )
}

export default function Navbar ({close}) {
  return (
    <nav>
       <div className="flex justify-center p-3">
          <img className="w-14" src="./spacelog.png" alt="" />
       </div>
      <ul>
        <li>
          <NavItem close={close} to='/' value="Home" Icon={<AiFillHome size={30} />} />
        </li>
        <li>
          <NavItem close={close} to="/create" Icon={<AiFillFolderAdd size={30}/>} value="Create Post" />
        </li>
      </ul>
    </nav>
  );
};


// <NavLink className='flex items-center space-x-2' to="/">
//             <AiFillHome size={30} />
//             <span>Home</span>
//           </NavLink>