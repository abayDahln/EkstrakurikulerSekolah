import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";

export default function Navbar({ darkMode, setActiveMenu, toggleDarkMode, onLogout, toggleSidebar, isSidebarOpen }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [showDropdown, setShowDropdown] = useState(false);



    const handleLogoClick = () => {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        if (token) {
            if (setActiveMenu) setActiveMenu(1);
            navigate("/home");

        } else {
            navigate("/");
        }
    };

    const handleLogout = () => {
        if (onLogout) onLogout();
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
                <div className="flex items-center gap-3">
                    {token && location.pathname !== "/" && location.pathname !== "/register" && (
                        <button
                            onClick={toggleSidebar}
                            className={`p-2 rounded-xl transition-all duration-300 ${darkMode
                                ? "bg-slate-700 text-white hover:bg-slate-600"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                }`}
                        >
                            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    )}

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 cursor-pointer select-none"
                        onClick={handleLogoClick}
                    >
                        <span
                            className={`text-xl hidden xs:block font-bold ${darkMode ? "text-white" : "text-slate-800"
                                }`}
                        >
                            Ekskul Sekolah
                        </span>
                        {sessionStorage.getItem("isDemoMode") === "true" && (
                            <div className="px-2 py-0.5 bg-sky-500 text-[10px] font-black text-white rounded-md shadow-lg shadow-sky-500/20 translate-y-[-1px]">
                                DEMO
                            </div>
                        )}
                    </motion.div>
                </div>

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
                            <Sun size={20} className="text-white" />
                        ) : (
                            <Moon size={20} className="text-slate-800" />
                        )}
                    </motion.button>

                </div>
            </div>
        </header>
    );
};
