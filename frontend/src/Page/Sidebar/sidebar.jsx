import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { House, NotebookText, Camera, ListChecks, Menu, X } from "lucide-react";

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { path: "/home", icon: <House size={20} />, label: "Home" },
    { path: "/jadwal", icon: <NotebookText size={20} />, label: "Buat Jadwal" },
    { path: "/dokumentasi", icon: <Camera size={20} />, label: "Dokumentasi" },
    { path: "/absen", icon: <ListChecks size={20} />, label: "Absensi" },
  ];

  return (
    <div className="flex">
      {/* --- Sidebar untuk Desktop --- */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="hidden md:flex flex-col w-64 bg-blue-900 min-h-screen text-white p-6 shadow-2xl"
      >
        <h1 className="text-2xl font-bold mb-10 text-center">EkskulHub</h1>

        <div className="flex flex-col gap-3">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl text-left font-semibold transition-all duration-300
                  ${
                    isActive
                      ? "bg-yellow-300 text-blue-900 shadow-md"
                      : "hover:bg-blue-800 hover:text-yellow-300"
                  }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </motion.aside>

      {/* --- Navbar & Sidebar Mobile --- */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-blue-900 text-white flex justify-between items-center px-5 py-4 z-50 shadow-lg">
        <h1 className="text-xl font-bold">EkskulHub</h1>
        <button onClick={toggleMenu}>{isOpen ? <X size={32} /> : <Menu size={32} />}</button>
      </div>

      {isOpen && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed top-0 left-0 h-full w-64 bg-blue-900 text-white flex flex-col p-6 z-40 shadow-2xl"
        >
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-xl font-bold">EkskulHub</h1>
            <button onClick={toggleMenu}>
              <X size={28} />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={index}
                  onClick={() => {
                    navigate(item.path);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all
                    ${
                      isActive
                        ? "bg-yellow-300 text-blue-900"
                        : "hover:bg-blue-800 hover:text-yellow-300"
                    }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}
