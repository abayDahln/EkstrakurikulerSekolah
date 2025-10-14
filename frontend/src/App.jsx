import React from "react";
import { useNavigate } from "react-router-dom"
import { easeInOut, easeOut, motion } from "framer-motion";

function LoginButton() {
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

function Isi(){
  return(

    <motion.div 
    initial={{ y: 400, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 1.1, ease: 'easeOut'}}
    className="flex flex-col items-center justify-center min-h-screen text-center p-6 sm:p-8 pt-20">
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight max-w-lg sm:max-w-3xl">
          Sistem Informasi Ekstrakurikuler
        </h1>

        <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-xs sm:max-w-2xl">
          Temukan, kelola, dan ikuti kegiatan ekstrakurikuler sekolah Anda dengan mudah. Panduan terpadu untuk siswa dan pembina.
        </p>

        <div className="flex justify-center mt-6">
          <button 
            className="bg-blue-600 text-white text-md sm:text-lg font-bold py-3 px-6 sm:px-8 rounded-full shadow-xl hover:bg-blue-700 transition duration-300 transform hover:scale-105 sm:w-100 max-w-xs sm:max-w-none "
          >
            📥 Download Aplikasi 
          </button>
        </div>      
      </motion.div>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <header className="absolute top-0 w-full z-10">
        <LoginButton />
      </header>
      <Isi />
      
    </div>
  );
}