import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaHome,
    FaTasks,
    FaCalendarAlt,
    FaAward,
    FaUserCircle,
    FaTimes
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import config from "../config/config.js";
import logo from "../assets/imgs/ekskul_logo.png";

export default function Sidebar({ darkMode, initialMenu, isOpen, onClose }) {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hasAnimated, setHasAnimated] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const intervalRef = useRef(null);
    const [activeMenu, setActiveMenuState] = useState(initialMenu);

    useEffect(() => {
        setActiveMenuState(initialMenu);
    }, [initialMenu]);

    useEffect(() => {
        if (!hasAnimated) setHasAnimated(true);
    }, [hasAnimated]);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${config.API_URL}/profile`, {
                headers: { Authorization: `Bearer ${token}`, accept: "*/*" },
            });

            if (response.ok) {
                const data = await response.json();
                setProfile(data.data);
            } else {
                console.error("Failed to fetch profile:", response.status);
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (hasAnimated) {
            fetchProfile();
        } else {
            setTimeout(() => {
                fetchProfile();
            }, 2000);
        }

        intervalRef.current = setInterval(() => {
            fetchProfile();
        }, 2000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    const handleMenuClick = (menuId) => {
        setActiveMenuState(menuId);
        if (onClose) onClose();

        switch (menuId) {
            case 1:
                navigate("/home");
                break;
            case 2:
                navigate("/ekskuls");
                break;
            case 3:
                navigate("/jadwal");
                break;
            case 4:
                navigate("/certificates");
                break;
            default:
                navigate("/home");
        }
    };

    const menuItems = [
        { id: 1, icon: <FaHome />, label: "Home" },
        { id: 2, icon: <FaTasks />, label: "Ekstrakurikuler" },
        { id: 3, icon: <FaCalendarAlt />, label: "Jadwal" },
        { id: 4, icon: <FaAward />, label: "Sertifikat" },
    ];

    const buttonVariants = {
        hover: {
            scale: 1.02,
            transition: { duration: 0.2 },
        },
        tap: {
            scale: 0.98,
        },
    };

    const indicatorVariants = {
        initial: hasAnimated
            ? false
            : {
                opacity: 0,
                scale: 0.8,
            },
        animate: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 30,
            },
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            transition: { duration: 0.2 },
        },
    };

    useEffect(() => {
        const currentPath = location.pathname;

        if (currentPath === "/home" || currentPath === "/") {
            setActiveMenuState(1);
        } else if (
            currentPath === "/ekskuls" ||
            currentPath.startsWith("/ekskul/")
        ) {
            setActiveMenuState(2);
        } else if (
            currentPath === "/jadwal" ||
            currentPath.startsWith("/jadwal/")
        ) {
            setActiveMenuState(3);
        } else if (
            currentPath === "/certificates" ||
            currentPath.startsWith("/certificate/")
        ) {
            setActiveMenuState(4);
        }
    }, [location.pathname]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.aside
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className={`fixed top-0 left-0 h-screen w-72 flex flex-col justify-between z-60 shadow-2xl border-r 
              ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"
                        }`}
                >
                    <div className="flex items-center justify-between p-5 border-b border-inherit">
                        <div className="flex items-center gap-3">
                            
                            <img src={logo} alt="" className="w-8 h-8 object-cover" />
                          
                            <h1
                                className={`font-bold text-xl ${darkMode ? "text-white" : "text-slate-800"
                                    }`}
                            >
                                Ekskul Sekolah
                            </h1>
                        </div>

                        <button
                            onClick={onClose}
                            className={`p-2 rounded-lg transition-colors ${darkMode ? "hover:bg-slate-700 text-slate-400" : "hover:bg-slate-100 text-slate-500"
                                }`}
                        >
                            <FaTimes size={20} />
                        </button>
                    </div>

                    <nav className="relative flex-1 p-4 space-y-2 overflow-y-auto pt-6">
                        {menuItems.map((item) => (
                            <motion.button
                                key={item.id}
                                onClick={() => handleMenuClick(item.id)}
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                                className={`relative w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all text-left
                ${darkMode
                                        ? activeMenu === item.id
                                            ? "text-white"
                                            : "text-slate-400 hover:bg-slate-700 hover:text-white"
                                        : activeMenu === item.id
                                            ? "text-white"
                                            : "text-slate-600 hover:bg-sky-50 hover:text-sky-600"
                                    }
              `}
                            >
                                {activeMenu === item.id && (
                                    <motion.div
                                        layoutId="activeIndicator"
                                        layout
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 30,
                                        }}
                                        className={`absolute inset-0 rounded-2xl -z-10 ${darkMode
                                            ? "bg-gradient-to-r from-sky-600 to-cyan-600 shadow-lg shadow-sky-900/20"
                                            : "bg-gradient-to-r from-sky-500 to-cyan-500 shadow-lg shadow-sky-200"
                                            }`}
                                    />
                                )}

                                <span className="text-xl relative z-10">{item.icon}</span>
                                <span className="font-semibold text-base relative z-10">
                                    {item.label}
                                </span>
                            </motion.button>
                        ))}
                    </nav>

                    <div
                        onClick={() => {
                            if (onClose) onClose();
                            navigate("/profile");
                        }}
                        className={`p-4 md:p-6 border-t flex items-center gap-4 cursor-pointer hover:bg-opacity-10 transition-colors m-3 rounded-2xl
                            ${darkMode
                                ? "border-slate-700 hover:bg-slate-700/40"
                                : "border-slate-100 hover:bg-sky-50"
                            }`}
                    >
                        {loading ? (
                            <div className={`w-12 h-12 rounded-full animate-pulse ${darkMode ? "bg-slate-700" : "bg-slate-200"}`} />
                        ) : profile?.profileUrl ? (
                            <img
                                src={`${config.BASE_URL}/${profile.profileUrl}`}
                                alt={profile?.name || "Profile"}
                                className="w-12 h-12 rounded-full object-cover ring-2 ring-sky-400 p-0.5"
                                onError={(e) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = "https://ui-avatars.com/api/?name=" + (profile?.name || "User");
                                }}
                            />
                        ) : (
                            <div className={`${darkMode ? "text-sky-400" : "text-sky-500"}`}>
                                <FaUserCircle size={48} />
                            </div>
                        )}

                        <div className="flex-1 min-w-0">
                            <p
                                className={`font-bold text-sm truncate ${darkMode ? "text-white" : "text-slate-800"
                                    }`}
                            >
                                {loading ? "Memuat..." : profile?.name || "Siswa"}
                            </p>
                            <p
                                className={`text-xs font-medium truncate ${darkMode ? "text-slate-400" : "text-slate-500"
                                    }`}
                            >
                                {loading ? "Loading..." : profile?.role || "Siswa"}
                            </p>
                        </div>
                    </div>
                </motion.aside>
            )}
        </AnimatePresence>
    );
}
