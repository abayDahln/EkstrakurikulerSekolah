import React from "react";
import { motion } from "framer-motion";
import { WifiOff, ServerCrash, RefreshCw } from "lucide-react";

/**
 * @param {Object} props
 * @param {boolean} props.isOffline
 * @param {boolean} props.isServerDown
 * @param {Function} props.onRetry
 * @param {boolean} props.darkMode
 */
const ErrorStatus = ({ isOffline, isServerDown, onRetry, darkMode }) => {
    const title = isOffline ? "Koneksi Terputus" : "Server Tidak Merespon";
    const description = isOffline
        ? "Sepertinya kamu sedang offline. Periksa koneksi internet kamu dan coba lagi."
        : "Kami sedang mengalami masalah saat menghubungi server. Mohon tunggu sebentar.";

    const Icon = isOffline ? WifiOff : ServerCrash;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`min-h-screen flex items-center justify-center p-6 ${darkMode ? "bg-slate-900" : "bg-slate-50"}`}
        >
            <div className={`w-full max-w-md p-8 rounded-[2.5rem] shadow-2xl text-center transition-colors ${darkMode ? "bg-slate-800 border border-slate-700" : "bg-white border border-slate-100"}`}>
                <div className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center ${darkMode ? "bg-red-500/10" : "bg-red-50"}`}>
                    <Icon className="text-red-500" size={40} />
                </div>

                <h2 className={`text-2xl font-bold mb-3 ${darkMode ? "text-white" : "text-slate-900"}`}>
                    {title}
                </h2>
                <p className={`text-sm font-medium mb-8 leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                    {description}
                </p>

                <button
                    onClick={onRetry}
                    className={`w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-bold transition-all active:scale-95 shadow-lg ${darkMode
                            ? "bg-sky-500 hover:bg-sky-600 text-white shadow-sky-900/20"
                            : "bg-sky-500 hover:bg-sky-600 text-white shadow-sky-200"
                        }`}
                >
                    <RefreshCw size={18} />
                    Coba Lagi
                </button>
            </div>
        </motion.div>
    );
};

export default ErrorStatus;
