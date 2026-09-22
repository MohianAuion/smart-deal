import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import userPng from "../../assets/user.png";

const Navbar = () => {

  const{user ,signOutUser}=use(AuthContext);

    const links=<>
    <li className='text-lg text-gray-700'><NavLink to="/">Home</NavLink></li>
    <li className='text-lg text-gray-700'><NavLink to="/allproducts">All Products</NavLink></li>
    <li className='text-lg text-gray-700'><NavLink to="/myproducts">my Products</NavLink></li>
    <li className='text-lg text-gray-700'><NavLink to="/mybids">My Bids</NavLink></li>
    <li className='text-lg text-gray-700'><NavLink to="/createproducts">Create Product</NavLink></li>
    </>

    // handle logout
    const handleLogOut=()=>{
      signOutUser();
    }

    return (
        <div className='bg-base-100 shadow-sm'>
            <div className="navbar  w-10/12 mx-auto">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg aria-label="Menu" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={-1}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
       {
        links
       }
      </ul>
    </div>
    <a className="text-3xl font-semibold">Smart<span className='text-primary'>Deals</span></a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
     {
        links
     }
    </ul>
  </div>
  <div className="navbar-end">
    {
      user? <div className='flex items-center gap-4'>
        <img src={user.photoURL} alt={user.photoURL || userPng} className='w-11 h-11 rounded-full object-cover border-2 border-yellow-400' />
        <Link onClick={handleLogOut} to="/auth" className="btn text-lg text-gray-800">LogOut</Link>
      </div> : <Link to="/auth" className="btn text-lg text-gray-800">LogIn</Link>
    }
    
    
  </div>
</div>
        </div>
    );
};

export default Navbar;