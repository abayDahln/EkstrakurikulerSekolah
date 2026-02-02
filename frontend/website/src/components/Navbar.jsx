import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/imgs/ekskul_logo.png";
import config from "../config/config";
import { sessionManager } from "../utils/utils";

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
      className={`fixed top-0 w-full z-50 px-4 backdrop-blur-md shadow-sm transition-colors duration-300 ${darkMode ? "bg-slate-800/90" : "bg-white/80"
        }`}
    >
      <div className="w-full flex justify-between items-center px-2 sm:px-4 py-4">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 cursor-pointer select-none"
          onClick={handleLogoClick}
        >
          <img src={logo} alt="" className="w-8 h-8 object-cover" />

          <div className="flex items-center gap-2">
            <span
              className={`text-xl font-bold ${darkMode ? "text-white" : "text-slate-800"
                }`}
            >
              Ekskul Sekolah
            </span>
            {sessionManager.getDemoMode() && (
              <span className="px-2 py-0.5 text-[10px] font-bold bg-sky-500 text-white rounded-full uppercase tracking-wider">
                Demo
              </span>
            )}
          </div>
        </motion.div>

        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleDarkMode}
            className={`p-2.5 rounded-lg transition-colors duration-300 ${darkMode
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


        </div>
      </div>
    </header>
  );
};