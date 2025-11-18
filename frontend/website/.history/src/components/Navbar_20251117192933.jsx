import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar({ darkMode, setActiveMenu, toggleDarkMode, onLogout }) {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLanding, setIsLanding] = useState(window.location.pathname === "/");

  useEffect(() => {
    if (window.location.pathname === "/") {
      setIsLanding(true);
    } else {
      setIsLanding(false);
    }
  }, [window.location.pathname]);

  const handleLogoClick = () => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      setActiveMenu(1);
      navigate("/home");
      
    } else {
      navigate("/");
    }
  };

  const handleLogout = () => {
    onLogout();
    setShowDropdown(false);
    navigate("/");
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  return (
    <header
      className={`fixed top-0 w-full z-50 px-4 backdrop-blur-md shadow-sm transition-colors duration-300 ${
        darkMode ? "bg-slate-800/90" : "bg-white/80"
      }`}
    >
      <div className="w-full flex justify-between items-center px-2 sm:px-4 py-4">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 cursor-pointer select-none"
          onClick={handleLogoClick}
        >
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${
              darkMode
                ? "bg-gradient-to-br from-sky-700 to-cyan-700"
                : "bg-gradient-to-br from-sky-400 to-cyan-500"
            }`}
          >
            <span className="text-white text-xl font-bold">E</span>
          </div>
          <span
            className={`text-xl font-bold ${
              darkMode ? "text-white" : "text-slate-800"
            }`}
          >
            Ekskul Sekolah
          </span>
        </motion.div>

        <div className="flex items-center gap-4">
          {/* Toggle Dark Mode */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleDarkMode}
            className={`p-2.5 rounded-lg transition-colors duration-300 ${
              darkMode
                ? "bg-slate-700 hover:bg-slate-600"
                : "bg-sky-100 hover:bg-sky-200"
            }`}
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-slate-800">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
              </svg>
            )}
          </motion.button>

          {isLanding && (
            <motion.button
              onClick={() => navigate('/login')}
              className={`text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${darkMode ? 'bg-gradient-to-r from-sky-700 to-cyan-700' : 'bg-gradient-to-r from-sky-500 to-cyan-500'}`}
            >
              Login Pembina
            </motion.button>

          )}
          {/* User Dropdown jika sudah login */}
          {token && (
            <div className="relative" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleDropdown}
                className={`p-2.5 rounded-lg transition-colors duration-300 ${
                  darkMode
                    ? "bg-slate-700 hover:bg-slate-600"
                    : "bg-sky-100 hover:bg-sky-200"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              </motion.button>

              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ${
                    darkMode ? "bg-slate-700" : "bg-white"
                  } ring-1 ring-black ring-opacity-5`}
                >
                  {/* Profile */}
                  <button
                    onClick={() => navigate("/profile")}
                    className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                      darkMode
                        ? "text-white hover:bg-slate-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Profile
                  </button>

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                      darkMode
                        ? "text-white hover:bg-slate-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </div>
          )}

        </div>
      </div>
    </header>
  );
};