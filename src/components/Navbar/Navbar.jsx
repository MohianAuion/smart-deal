
// import React, { use } from 'react';
// import { Link, NavLink } from 'react-router';
// import { AuthContext } from '../../context/AuthContext';
// import userPng from "../../assets/user.png";
// import "./Navbar.css";

// const Navbar = () => {
//     const { user, signOutUser } = use(AuthContext);

//     const links = <>
//         <li className='text-base lg:text-lg text-gray-700'>
//             <NavLink to="/">Home</NavLink>
//         </li>

//         <li className='text-base lg:text-lg text-gray-700'>
//             <NavLink to="/allproducts">All Products</NavLink>
//         </li>

//         <li className='text-base lg:text-lg text-gray-700'>
//             <NavLink to="/myproducts">My Products</NavLink>
//         </li>

//         <li className='text-base lg:text-lg text-gray-700'>
//             <NavLink to="/mybids">My Bids</NavLink>
//         </li>

//         <li className='text-base lg:text-lg text-gray-700'>
//             <NavLink to="/createproducts">Create Product</NavLink>
//         </li>
//     </>;

//     // Handle logout
//     const handleLogOut = () => {
//         signOutUser();
//     };

//     return (
//         <div className='bg-base-100 shadow-sm sticky top-0 z-50'>
//             <div className="navbar w-11/12 sm:w-10/12 mx-auto px-0 min-h-16 sm:min-h-20">

//                 {/* Navbar start */}
//                 <div className="navbar-start gap-1 sm:gap-2">

//                     {/* Mobile menu */}
//                     <div className="dropdown lg:hidden">
//                         <div
//                             tabIndex={0}
//                             role="button"
//                             className="btn btn-ghost btn-circle"
//                             aria-label="Open navigation menu"
//                         >
//                             <svg
//                                 aria-label="Menu"
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 className="h-6 w-6"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor"
//                             >
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth="2"
//                                     d="M4 6h16M4 12h8m-8 6h16"
//                                 />
//                             </svg>
//                         </div>

//                         <ul
//                             tabIndex={0}
//                             className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-60 max-w-[85vw] p-2 shadow-lg border border-gray-100"
//                         >
//                             {links}
//                         </ul>
//                     </div>

//                     {/* Logo */}
//                     <Link
//                         to="/"
//                         className="text-xl sm:text-2xl lg:text-3xl font-semibold whitespace-nowrap"
//                     >
//                         Smart<span className='text-primary'>Deals</span>
//                     </Link>
//                 </div>

//                 {/* Desktop navigation */}
//                 <div className="navbar-center hidden lg:flex">
//                     <ul className="menu menu-horizontal px-1 gap-0">
//                         {links}
//                     </ul>
//                 </div>

//                 {/* Navbar end */}
//                 <div className="navbar-end gap-1 sm:gap-3">

//                     {user ? (
//                         <div className='flex items-center gap-2 sm:gap-4'>

//                             {/* User profile image */}
//                             <img
//                                 src={user.photoURL || userPng}
//                                 alt="User profile"
//                                 className='w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full object-cover border-2 border-yellow-400 shrink-0'
//                             />

//                             {/* Logout */}
//                             <Link
//                                 onClick={handleLogOut}
//                                 to="/auth"
//                                 className="btn btn-sm sm:btn-md text-sm sm:text-base lg:text-lg text-gray-800 px-3 sm:px-4"
//                             >
//                                 Log Out
//                             </Link>
//                         </div>
//                     ) : (
//                         <Link
//                             to="/auth"
//                             className="btn btn-sm sm:btn-md text-sm sm:text-base lg:text-lg text-gray-800 px-3 sm:px-4"
//                         >
//                             Log In
//                         </Link>
//                     )}

//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Navbar;










import React, { use } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import userPng from "../../assets/user.png";
import "./Navbar.css";

const Navbar = () => {
  const { user, signOutUser } = use(AuthContext);
  const navigate = useNavigate();

  const links = (
    <>
      <li className="text-base lg:text-lg text-gray-700">
        <NavLink to="/">Home</NavLink>
      </li>

      <li className="text-base lg:text-lg text-gray-700">
        <NavLink to="/allproducts">All Products</NavLink>
      </li>

      <li className="text-base lg:text-lg text-gray-700">
        <NavLink to="/myproducts">My Products</NavLink>
      </li>

      <li className="text-base lg:text-lg text-gray-700">
        <NavLink to="/mybids">My Bids</NavLink>
      </li>

      <li className="text-base lg:text-lg text-gray-700">
        <NavLink to="/createproducts">Create Product</NavLink>
      </li>
    </>
  );

  // Handle logout: navigate only after sign out succeeds
  const handleLogOut = () => {
    signOutUser()
      .then(() => navigate("/auth"))
      .catch((err) => console.error("Logout failed:", err));
  };

  return (
    <div className="bg-base-100 shadow-sm sticky top-0 z-50">
      <div className="navbar w-11/12 sm:w-10/12 mx-auto px-0 min-h-16 sm:min-h-20">
        {/* Navbar start */}
        <div className="navbar-start gap-1 sm:gap-2">
          {/* Mobile menu */}
          <div className="dropdown lg:hidden">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
              aria-label="Open navigation menu"
            >
              <svg
                aria-label="Menu"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-60 max-w-[85vw] p-2 shadow-lg border border-gray-100"
            >
              {links}
            </ul>
          </div>

          {/* Logo */}
          <Link
            to="/"
            className="text-xl sm:text-2xl lg:text-3xl font-semibold whitespace-nowrap"
          >
            Smart<span className="text-primary">Deals</span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-0">{links}</ul>
        </div>

        {/* Navbar end */}
        <div className="navbar-end gap-1 sm:gap-3">
          {user ? (
            <div className="flex items-center gap-2 sm:gap-4">
              {/* User profile image */}
              <img
                src={user.photoURL || userPng}
                alt="User profile"
                className="w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full object-cover border-2 border-yellow-400 shrink-0"
              />

              {/* Logout */}
              <button
                onClick={handleLogOut}
                className="btn btn-sm sm:btn-md text-sm sm:text-base lg:text-lg text-gray-800 px-3 sm:px-4"
              >
                Log Out
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="btn btn-sm sm:btn-md text-sm sm:text-base lg:text-lg text-gray-800 px-3 sm:px-4"
            >
              Log In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;