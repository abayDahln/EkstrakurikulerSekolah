import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import config from "../config/config.js";
import sessionManager, { getFullImageUrl } from "../utils/utils.jsx";
import { useConnection } from "../utils/connectionContext.jsx";
import ekskulLogo from "../assets/imgs/ekskul_logo.png";

const Login = ({ darkMode, onLogin }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { setIsServerDown } = useConnection();

    const API_URL = `${config.API_URL}/auth/login/siswa`;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (sessionManager.isDemoMode()) {
            // Bypass login for demo mode
            setTimeout(() => {
                const dummyToken = "dummy-demo-token.eyJpZCI6MSwibmFtZSI6IkFuZGlhbnN5YWgiLCJyb2xlIjoic2lzd2EifQ.dummy";
                const dummyExp = new Date(Date.now() + 86400000).toISOString();
                if (onLogin) onLogin(dummyToken, dummyExp, rememberMe);
                setLoading(false);
                navigate("/home");
            }, 1000);
            return;
        }

        try {
            const response = await fetch(`${API_URL}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const responseBody = await response.json();

            if (!response.ok) {
                throw new Error(responseBody.message || "Login gagal");
            }

            const token = responseBody.data?.token;
            const expiredAt = responseBody.data?.expiredAt;
            if (!token) throw new Error("Token tidak ditemukan dalam response");
            if (!expiredAt)
                throw new Error("ExpiredAt tidak ditemukan dalam response");

            if (onLogin) {
                onLogin(token, expiredAt, rememberMe);
            }
            await new Promise((resolve) => setTimeout(resolve, 100));

            navigate("/home");
        } catch (err) {
            if (err.name === 'TypeError' || err.message === 'Failed to fetch') {
                setIsServerDown(true);
            }
            setError(err.message || "Email atau password salah");
        } finally {
            setLoading(false);
        }
    };

    const handleDemoLogin = async () => {
        sessionStorage.setItem("isDemoMode", "true");
        setLoading(true);

        // Immediate redirect for demo without waiting for real fetch
        setTimeout(() => {
            const dummyToken = "dummy-demo-token.eyJpZCI6MSwibmFtZSI6IkFuZGlhbnN5YWgiLCJyb2xlIjoic2lzd2EifQ.dummy";
            const dummyExp = new Date(Date.now() + 86400000).toISOString();
            if (onLogin) onLogin(dummyToken, dummyExp, true);
            setLoading(false);
            navigate("/home");
        }, 1000);
    };

    return (
        <div
            className={`min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-300 ${darkMode
                ? "bg-slate-900"
                : "bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50"
                }`}
            style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                paddingTop: 'env(safe-area-inset-top)',
                paddingBottom: 'env(safe-area-inset-bottom)'
            }}
        >
            <div className="w-full max-w-md px-6 pt-24 pb-12 z-10">
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
                            className="w-20 h-20 mx-auto mb-6 flex items-center justify-center"
                        >
                            <img src={ekskulLogo} alt="Logo" className="w-full h-full object-contain drop-shadow-xl" />
                        </motion.div>
                        <motion.h1
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className={`text-3xl font-extrabold mb-2 ${darkMode ? "text-white" : "text-slate-900"
                                }`}
                        >
                            Selamat Datang
                        </motion.h1>
                        <motion.p
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className={`${darkMode ? "text-slate-400" : "text-slate-600"}`}
                        >
                            Masuk sebagai siswa Ekskul Sekolah
                        </motion.p>
                    </div>

                    <motion.form
                        onSubmit={handleSubmit}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-5"
                    >
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Mail size={20} className={darkMode ? "text-slate-500" : "text-slate-400"} />
                            </div>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Masukkan alamat email"
                                className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 transition-all duration-300 ${darkMode
                                    ? "bg-slate-800/50 border-slate-700 text-white placeholder-slate-500/70 focus:border-sky-600 focus:bg-slate-800"
                                    : "bg-white border-slate-200 text-slate-900 placeholder-slate-400/70 focus:border-sky-400"
                                    } focus:outline-none focus:ring-4 ${darkMode ? "focus:ring-sky-900/30" : "focus:ring-sky-100"
                                    }`}
                                required
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Lock size={20} className={darkMode ? "text-slate-500" : "text-slate-400"} />
                            </div>
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Masukkan kata sandi"
                                className={`w-full pl-12 pr-12 py-4 rounded-2xl border-2 transition-all duration-300 ${darkMode
                                    ? "bg-slate-800/50 border-slate-700 text-white placeholder-slate-500/70 focus:border-sky-600 focus:bg-slate-800"
                                    : "bg-white border-slate-200 text-slate-900 placeholder-slate-400/70 focus:border-sky-400"
                                    } focus:outline-none focus:ring-4 ${darkMode ? "focus:ring-sky-900/30" : "focus:ring-sky-100"
                                    }`}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-sky-500 transition-colors"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        <div className="flex items-center justify-between px-1">
                            <label className="flex items-center cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="hidden"
                                />
                                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${rememberMe
                                    ? "bg-sky-500 border-sky-500"
                                    : (darkMode ? "border-slate-700 bg-slate-800" : "border-slate-300 bg-white")
                                    }`}>
                                    {rememberMe && <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-white fill-current"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" /></svg>}
                                </div>
                                <span className={`ml-3 text-sm font-medium transition-colors ${darkMode ? "text-slate-400 group-hover:text-slate-300" : "text-slate-600 group-hover:text-slate-900"
                                    }`}>
                                    Ingat saya
                                </span>
                            </label>

                            <button
                                type="button"
                                className={`text-sm font-bold transition-colors ${darkMode
                                    ? "text-sky-400 hover:text-sky-300"
                                    : "text-sky-600 hover:text-sky-700"
                                    }`}
                            >
                                Lupa password?
                            </button>
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
                            className={`w-full py-4 rounded-2xl font-bold text-white text-lg shadow-lg transition-all duration-300 transform active:scale-[0.98] ${loading
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
                                    Mendukung...
                                </span>
                            ) : (
                                "Masuk Sekarang"
                            )}
                        </motion.button>
                    </motion.form>

                    <p
                        className={`mt-10 text-center text-sm ${darkMode ? "text-slate-400" : "text-slate-600"
                            }`}
                    >
                        Belum punya akun?{" "}
                        <button
                            onClick={() => navigate("/register")}
                            className={`font-bold transition-colors ${darkMode
                                ? "text-sky-400 hover:text-sky-300"
                                : "text-sky-600 hover:text-sky-700"
                                }`}
                        >
                            Daftar Gratis
                        </button>
                    </p>

                    <div className="mt-6 flex flex-col items-center gap-3">
                        <div className={`w-full max-w-xs h-px ${darkMode ? "bg-slate-700" : "bg-slate-200"}`}></div>
                        <button
                            type="button"
                            onClick={handleDemoLogin}
                            className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${darkMode
                                ? "bg-slate-800 text-sky-400 hover:bg-slate-700"
                                : "bg-sky-50 text-sky-600 hover:bg-sky-100"
                                }`}
                        >
                            ✨ Coba Versi Demo
                        </button>
                    </div>
                </motion.div>
            </div>

            <div className="fixed inset-0 pointer-events-none overflow-hidden text-sky-500/10 dark:text-sky-400/5">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity }}
                    className={`absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl opacity-30 ${darkMode ? "bg-sky-500" : "bg-sky-400"}`}
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, -90, 0],
                    }}
                    transition={{ duration: 25, repeat: Infinity }}
                    className={`absolute -bottom-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-30 ${darkMode ? "bg-cyan-500" : "bg-cyan-400"}`}
                />
            </div>
        </div>
    );
};

export default Login;
