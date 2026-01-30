import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";
import config from "../config/config.js";
import { useConnection } from "../App.jsx";

const Register = ({ darkMode, onLogin }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { setIsServerDown } = useConnection();

    const API_URL = `${config.API_URL}/auth/register/siswa`;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError("Kata sandi tidak cocok dengan konfirmasi");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const { confirmPassword, ...registerData } = formData;

            const response = await fetch(`${API_URL}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(registerData),
            });

            const responseBody = await response.json();

            if (!response.ok) {
                throw new Error(responseBody.message || "Registrasi gagal");
            }

            const loginResponse = await fetch(`${config.API_URL}/auth/login/siswa`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                }),
            });

            const loginBody = await loginResponse.json();

            if (loginResponse.ok && loginBody.data?.token) {
                if (onLogin) {
                    onLogin(loginBody.data.token, loginBody.data.expiredAt, false);
                }
                navigate("/home");
            } else {
                navigate("/");
            }
        } catch (err) {
            if (err.name === 'TypeError' || err.message === 'Failed to fetch') {
                setIsServerDown(true);
            }
            setError(err.message || "Terjadi kesalahan saat registrasi");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className={`min-h-screen flex items-center justify-center overflow-x-hidden transition-colors duration-300 ${darkMode
                ? "bg-slate-900"
                : "bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50"
                }`}
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
            <div className="w-full max-w-md px-6 py-12 z-10">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <div className="text-center mb-10">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            className={`w-20 h-20 rounded-2xl mx-auto flex items-center justify-center shadow-xl mb-6 ${darkMode
                                ? "bg-gradient-to-br from-sky-700 to-cyan-700"
                                : "bg-gradient-to-br from-sky-400 to-cyan-500"
                                }`}
                        >
                            <span className="text-white text-3xl font-bold">E</span>
                        </motion.div>
                        <motion.h1
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className={`text-3xl font-extrabold mb-2 ${darkMode ? "text-white" : "text-slate-900"
                                }`}
                        >
                            Buat Akun Siswa
                        </motion.h1>
                        <motion.p
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className={`${darkMode ? "text-slate-400" : "text-slate-600"}`}
                        >
                            Daftar untuk bergabung dengan ekstrakurikuler
                        </motion.p>
                    </div>

                    <motion.form
                        onSubmit={handleSubmit}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-4"
                    >
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <User size={18} className={darkMode ? "text-slate-500" : "text-slate-400"} />
                            </div>
                            <input
                                id="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Masukkan nama lengkap"
                                className={`w-full pl-11 pr-4 py-3.5 rounded-xl border-2 transition-all duration-300 ${darkMode
                                    ? "bg-slate-800/50 border-slate-700 text-white placeholder-slate-500/70 focus:border-sky-600 focus:bg-slate-800"
                                    : "bg-white border-slate-200 text-slate-900 placeholder-slate-400/70 focus:border-sky-400"
                                    } focus:outline-none focus:ring-4 ${darkMode ? "focus:ring-sky-900/30" : "focus:ring-sky-100"
                                    }`}
                                required
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Mail size={18} className={darkMode ? "text-slate-500" : "text-slate-400"} />
                            </div>
                            <input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Masukkan alamat email"
                                className={`w-full pl-11 pr-4 py-3.5 rounded-xl border-2 transition-all duration-300 ${darkMode
                                    ? "bg-slate-800/50 border-slate-700 text-white placeholder-slate-500/70 focus:border-sky-600 focus:bg-slate-800"
                                    : "bg-white border-slate-200 text-slate-900 placeholder-slate-400/70 focus:border-sky-400"
                                    } focus:outline-none focus:ring-4 ${darkMode ? "focus:ring-sky-900/30" : "focus:ring-sky-100"
                                    }`}
                                required
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Lock size={18} className={darkMode ? "text-slate-500" : "text-slate-400"} />
                            </div>
                            <input
                                id="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Buat kata sandi baru"
                                className={`w-full pl-11 pr-4 py-3.5 rounded-xl border-2 transition-all duration-300 ${darkMode
                                    ? "bg-slate-800/50 border-slate-700 text-white placeholder-slate-500/70 focus:border-sky-600 focus:bg-slate-800"
                                    : "bg-white border-slate-200 text-slate-900 placeholder-slate-400/70 focus:border-sky-400"
                                    } focus:outline-none focus:ring-4 ${darkMode ? "focus:ring-sky-900/30" : "focus:ring-sky-100"
                                    }`}
                                required
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Lock size={18} className={darkMode ? "text-slate-500" : "text-slate-400"} />
                            </div>
                            <input
                                id="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Konfirmasi kata sandi"
                                className={`w-full pl-11 pr-4 py-3.5 rounded-xl border-2 transition-all duration-300 ${darkMode
                                    ? "bg-slate-800/50 border-slate-700 text-white placeholder-slate-500/70 focus:border-sky-600 focus:bg-slate-800"
                                    : "bg-white border-slate-200 text-slate-900 placeholder-slate-400/70 focus:border-sky-400"
                                    } focus:outline-none focus:ring-4 ${darkMode ? "focus:ring-sky-900/30" : "focus:ring-sky-100"
                                    }`}
                                required
                            />
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium flex items-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                </svg>
                                {error}
                            </motion.div>
                        )}

                        <motion.button
                            type="submit"
                            className={`w-full py-4 rounded-xl font-bold text-white text-lg shadow-lg transition-all duration-300 transform active:scale-[0.98] ${loading
                                ? "bg-slate-400 cursor-not-allowed"
                                : darkMode
                                    ? "bg-gradient-to-r from-sky-700 to-cyan-700 hover:shadow-sky-900/40"
                                    : "bg-gradient-to-r from-sky-500 to-cyan-500 hover:shadow-sky-500/40"
                                }`}
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Mendaftarkan...
                                </span>
                            ) : (
                                "Daftar Sekarang"
                            )}
                        </motion.button>
                    </motion.form>

                    <p
                        className={`mt-8 text-center text-sm ${darkMode ? "text-slate-400" : "text-slate-600"
                            }`}
                    >
                        Sudah punya akun?{" "}
                        <button
                            onClick={() => navigate("/")}
                            className={`font-bold transition-colors ${darkMode
                                ? "text-sky-400 hover:text-sky-300"
                                : "text-sky-600 hover:text-sky-700"
                                }`}
                        >
                            Masuk di sini
                        </button>
                    </p>
                </motion.div>
            </div>

            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity }}
                    className={`absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-20 ${darkMode ? "bg-sky-500" : "bg-sky-400"}`}
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, -90, 0],
                    }}
                    transition={{ duration: 25, repeat: Infinity }}
                    className={`absolute -bottom-32 -left-32 w-80 h-80 rounded-full blur-3xl opacity-20 ${darkMode ? "bg-cyan-500" : "bg-cyan-400"}`}
                />
            </div>
        </div>
    );
};

export default Register;
