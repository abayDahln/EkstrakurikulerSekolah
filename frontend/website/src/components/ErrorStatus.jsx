import React from "react";
import { motion } from "framer-motion";
import { FiWifiOff, FiRefreshCw, FiAlertTriangle } from "react-icons/fi";

const ErrorStatus = ({ darkMode, type = "connection", onRetry }) => {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`max-w-md w-full rounded-3xl shadow-2xl p-8 text-center ${darkMode ? "bg-slate-800 border border-slate-700" : "bg-white border border-slate-100"
                    }`}
            >
                <div className="flex justify-center mb-6">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center ${darkMode ? "bg-red-900/30 text-red-500" : "bg-red-100 text-red-600"
                        }`}>
                        {type === "offline" ? (
                            <FiWifiOff className="text-4xl" />
                        ) : (
                            <FiAlertTriangle className="text-4xl" />
                        )}
                    </div>
                </div>

                <h2 className={`text-2xl font-extrabold mb-3 ${darkMode ? "text-white" : "text-slate-900"}`}>
                    {type === "offline" ? "Anda Sedang Offline" : "Koneksi Terputus"}
                </h2>

                <p className={`text-sm mb-8 leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                    {type === "offline"
                        ? "Maaf, sepertinya Anda tidak terhubung ke internet. Periksa koneksi WiFi atau data seluler Anda."
                        : "Gagal terhubung ke server. Pastikan server sudah berjalan atau coba beberapa saat lagi."}
                </p>

                <button
                    onClick={onRetry}
                    className="group relative w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 font-bold text-white transition-all duration-300 bg-gradient-to-r from-sky-500 to-cyan-500 rounded-2xl hover:shadow-lg hover:shadow-sky-500/25 active:scale-95"
                >
                    <FiRefreshCw className="text-lg group-hover:rotate-180 transition-transform duration-500" />
                    Coba Lagi
                </button>
            </motion.div>
        </div>
    );
};

export default ErrorStatus;
