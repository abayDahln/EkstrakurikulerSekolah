import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, easeOut } from "framer-motion";
import { House, NotebookText, Camera, ListChecks, Menu, X, LogOut } from "lucide-react";

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/login");
  };

  const menuItems = [
    { path: "/home", icon: <House size={20} />, label: "Home" },
    { path: "/jadwal", icon: <NotebookText size={20} />, label: "Buat Jadwal" },
    { path: "/dokumentasi", icon: <Camera size={20} />, label: "Dokumentasi" },
    { path: "/absen", icon: <ListChecks size={20} />, label: "Absensi" },
  ];

  return (
    <>
      <motion.aside
        initial={{ x: -200 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="hidden md:flex flex-col justify-between w-64 h-screen bg-blue-500 text-white fixed left-0 top-0 shadow-2xl p-6"
      >
        <div>
          <div className="flex gap-4">
            <img src="/logo.png" className="w-10 h-10"></img>
            <h1 className="text-2xl font-bold mb-10 text-center">Ekskul Hub</h1>
          </div>

          <div className="flex flex-col gap-4">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={index}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-4 px-5 py-3 rounded-xl text-lg font-semibold transition-all duration-300 
                    ${isActive ? "bg-yellow-300 text-black" : "hover:bg-blue-600"}
                  `}
                >
                  {item.icon}
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-5 py-3 rounded-xl text-lg font-semibold hover:bg-red-600 transition-all duration-300"
        >
          <LogOut size={20} />
          Logout
        </button>
      </motion.aside>

      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="pt-5 pb-5 px-4 flex justify-between items-center fixed top-0 left-0 w-full bg-blue-500 md:hidden shadow-md z-50"
      >
        <div className="flex gap-4">
          <img src="logo.png" className="w-10 h-10"></img>
          <h1 className="text-2xl font-bold text-white">Ekskul Hub</h1>
        </div>
        <button
          onClick={toggleMenu}
          className="text-white p-2"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-blue-400/95 pt-20"
          >
            <motion.div
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.3, ease: easeOut }}
              className="flex flex-col gap-5 p-5"
            >
              {menuItems.map((item, index) => {
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={index}
                    onClick={() => {
                      navigate(item.path);
                      setIsOpen(false);
                    }}
                    className={`w-full text-xl font-semibold rounded-xl flex items-center justify-start gap-5 px-5 py-4 h-16 shadow-lg 
                      ${isActive ? "bg-yellow-300 text-black" : "text-white"}
                    `}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                );
              })}

              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="w-full text-xl font-semibold rounded-xl flex items-center justify-start gap-5 px-5 py-4 h-16 shadow-lg text-white hover:bg-red-600"
              >
                <LogOut size={24} />
                Logout
              </button>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </>
  );
}
