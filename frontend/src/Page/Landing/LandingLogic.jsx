import React from "react";
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion";

export function LoginButton() {
  const navigate = useNavigate()

  const handleOnClick = () => {
    navigate("/login")
  }

  return (
    <motion.div 
    initial={{opacity: 0, x: 200 }}
    animate={{opacity: 1, x: 0 }}
    transition={{duration: 1.4, ease: "easeOut"}}
    className="flex justify-end p-3 sm:p-5"> 
      <button 
        onClick={handleOnClick}
        className="bg-gray-700 text-white font-semibold py-2 px-3 text-sm rounded-lg shadow-lg hover:bg-gray-800 transition duration-300 transform hover:scale-105 md:text-base md:px-4"
      >
        Login Sebagai Pembina
      </button>
    </motion.div>
  );
}