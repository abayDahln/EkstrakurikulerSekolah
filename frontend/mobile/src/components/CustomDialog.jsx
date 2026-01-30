import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertCircle, CheckCircle2, Info, HelpCircle } from "lucide-react";

const CustomDialog = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    type = "info",
    confirmText = "Oke",
    cancelText = "Batal",
    darkMode = false
}) => {
    if (!isOpen) return null;

    const getIcon = () => {
        switch (type) {
            case "success": return <CheckCircle2 size={32} className="text-emerald-500" />;
            case "error": return <AlertCircle size={32} className="text-red-500" />;
            case "confirm": return <HelpCircle size={32} className="text-sky-500" />;
            default: return <Info size={32} className="text-sky-500" />;
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className={`relative w-full max-w-sm overflow-hidden rounded-[2.5rem] shadow-2xl border ${darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"
                            }`}
                    >
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-6">
                                <div className={`p-4 rounded-3xl ${darkMode ? "bg-slate-800" : "bg-slate-50"}`}>
                                    {getIcon()}
                                </div>
                                <button
                                    onClick={onClose}
                                    className={`p-2 rounded-xl transition-colors ${darkMode ? "hover:bg-slate-800 text-slate-500" : "hover:bg-slate-50 text-slate-400"
                                        }`}
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="mb-8">
                                <h3 className={`text-xl font-black mb-3 break-words ${darkMode ? "text-white" : "text-slate-900"}`}>
                                    {title}
                                </h3>
                                <div className="max-h-[35vh] overflow-y-auto pr-2 -mr-2 custom-scrollbar">
                                    <p className={`text-sm leading-relaxed break-all ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                                        {message}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                {type === "confirm" && (
                                    <button
                                        onClick={onClose}
                                        className={`flex-1 py-4 px-6 rounded-2xl font-bold text-sm transition-all active:scale-95 ${darkMode
                                            ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                            }`}
                                    >
                                        {cancelText}
                                    </button>
                                )}
                                <button
                                    onClick={() => {
                                        if (onConfirm) onConfirm();
                                        onClose();
                                    }}
                                    className={`flex-1 py-4 px-6 rounded-2xl font-black text-sm transition-all active:scale-95 shadow-lg ${type === "error"
                                        ? "bg-red-500 text-white shadow-red-500/30 hover:bg-red-600"
                                        : type === "success"
                                            ? "bg-emerald-500 text-white shadow-emerald-500/30 hover:bg-emerald-600"
                                            : "bg-sky-500 text-white shadow-sky-500/30 hover:bg-sky-600"
                                        }`}
                                >
                                    {confirmText}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CustomDialog;
