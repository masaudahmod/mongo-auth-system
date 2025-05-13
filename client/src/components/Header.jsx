import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "../features/auth/authApi";

const Header = () => {
  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      localStorage.removeItem("authToken");
      navigate(0);
      console.log("Logout successful");
    } catch (error) {
      console.log("Error in logout", error);
    }
  };
  return (
    <header className="bg-slate-400">
      <nav className="container mx-auto px-4">
        <div className="py-3 flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold capitalize text-black font-mono">
            MERN Auth System
          </h1>

          <div className="relative flex gap-5" ref={dropdownRef}>
            <Link
              to="/"
              className="text-xl  font-semibold border hover:bg-black hover:text-white transition duration-300 px-2 py-1 rounded "
            >
              Home
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-xl  font-semibold border hover:bg-black hover:text-white transition duration-300 px-2 py-1 rounded cursor-pointer"
            >
              Profile
            </button>

            {isOpen && (
              <div className="absolute right-0 top-12 w-40 bg-slate-400 text-lg transform origin-top-right transition-all duration-300 font-bold rounded-b-2xl shadow-lg py-2 z-50">
                <Link
                  to={`/profile`}
                  className="block px-4 py-2 text-sm text-black hover:bg-slate-100 w-full text-left"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-slate-100 w-full text-left cursor-pointer"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
