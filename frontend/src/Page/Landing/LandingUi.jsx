import React from "react";
import { motion} from "framer-motion";

export function Isi(){
  const APP_DOWNLOAD = '/assets/app-debug.apk';
  const APP_NAME = 'Ekskul-App';

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
          <a href={APP_DOWNLOAD} download={APP_NAME} className="flex items-center gap-2">
            <button 
              className="bg-blue-600 text-white text-md sm:text-lg font-bold py-3 px-6 sm:px-8 rounded-full shadow-xl hover:bg-blue-700 transition duration-300 transform hover:scale-105 sm:w-100 max-w-xs sm:max-w-none ">
              📥 Download Aplikasi 
            </button>
          </a>
        </div>      
      </motion.div>
  )
}