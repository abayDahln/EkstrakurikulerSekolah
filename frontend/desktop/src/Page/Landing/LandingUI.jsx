import React from "react";
import { motion} from "framer-motion";

export function Isi() {

  return (
    <motion.div
      initial={{ y: 200, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.1, ease: "easeOut" }}
      className="flex flex-col items-center justify-center min-h-screen px-6 text-center"
    >
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight max-w-3xl"
      >
        Sistem Informasi <span className="text-blue-600">Ekstrakurikuler</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="text-base sm:text-lg text-gray-600 mb-10 max-w-xl sm:max-w-2xl leading-relaxed"
      >
        Kelola kegiatan ekstrakurikuler sekolah Anda dengan lebih mudah.  
        Didesain untuk <strong>siswa</strong> dan <strong>pembina</strong> agar tetap terhubung.
      </motion.p>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <a href="http://localhost:5173/assets/Ekskul.apk">
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 px-8 rounded-full shadow-xl transition duration-300 flex items-center gap-2">
            📲 Download Aplikasi
          </button>
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 1 }}
        className="mt-12 text-sm text-gray-500"
      >
        Versi Android tersedia sekarang
      </motion.div>
    </motion.div>
  );
}