import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiChevronRight, FiSmartphone, FiMonitor, FiCpu, FiAward, FiGlobe } from "react-icons/fi";
import { FaAndroid, FaApple, FaWindows } from "react-icons/fa";
import config from "../config/config";

const Download = ({ darkMode }) => {
    const navigate = useNavigate();

    const downloadOptions = [
        {
            id: "android",
            title: "Android",
            user: "Siswa",
            tagline: "Aplikasi Siswa Terpadu",
            icon: <FaAndroid className="text-4xl text-green-500" />,
            features: [
                "Presensi Jadwal Canggih",
                "Join Ekskul Apa Saja",
                "Update Point Otomatis",
                "Sertifikat Keaktifan Ekskul"
            ],
            action: "Download APK",
            link: config.DOWNLOAD_LINKS.ANDROID,
            popular: true
        },
        {
            id: "ios",
            title: "iOS",
            user: "Siswa",
            tagline: "Eksklusif untuk iPhone",
            icon: <FaApple className="text-4xl text-slate-800 dark:text-slate-200" />,
            features: [
                "Antarmuka Premium iOS",
                "Integrasi Apple Calendar",
                "Notifikasi Push Cepat",
                "Tersedia di App Store"
            ],
            action: "Download di App Store",
            link: config.DOWNLOAD_LINKS.IOS
        },
        {
            id: "desktop",
            title: "Desktop",
            user: "Pembina",
            tagline: "Manajemen Data Pembina",
            icon: <FaWindows className="text-4xl text-blue-500" />,
            features: [
                "Manajemen Siswa & Ekskul",
                "Manajemen Jadwal Canggih",
                "Dashboard Real-time",
                "Login Dengan Akun Pembina"
            ],
            action: "Download .exe",
            link: config.DOWNLOAD_LINKS.DESKTOP
        },
        {
            id: "web",
            title: "Website",
            user: "Pembina",
            tagline: "Akses Cepat & Ringan",
            icon: <FiGlobe className="text-4xl text-cyan-500" />,
            features: [
                "Tanpa Instalasi Tambahan",
                "Akses Dari Perangkat Lainnya",
                "Upload Sertifikat Siswa",
                "Login Dengan Akun Pembina"
            ],
            action: "Buka Browser",
            isInternal: true,
            link: config.DOWNLOAD_LINKS.WEB
        }
    ];

    const handleDownload = (option) => {
        if (!option.link) return;

        if (option.isInternal) {
            navigate(option.link);
            return;
        }

        window.open(option.link, "_blank");
    };

    return (
        <div
            className={`min-h-screen transition-colors duration-500 pt-20 pb-20 ${darkMode
                ? "bg-slate-900"
                : "bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50"
                }`}
        >
            <div className="container mx-auto max-w-7xl px-4">
                <motion.button
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    onClick={() => navigate("/")}
                    className={`flex items-center gap-2 mb-10 px-4 py-2 rounded-xl font-semibold transition-colors ${darkMode
                        ? "bg-slate-800 text-sky-400 hover:bg-slate-700"
                        : "bg-white text-sky-600 hover:bg-sky-50 shadow-md"
                        }`}
                >
                    <FiArrowLeft /> Kembali ke Beranda
                </motion.button>

                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-center mb-16"
                >
                    <h1 className={`text-4xl md:text-5xl font-extrabold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                        Download <span className="text-sky-500">Ekstrakurikuler</span>
                    </h1>
                    <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        Pilih platform yang sesuai dengan kebutuhan Anda. Tersedia aplikasi mobile untuk Siswa dan versi desktop/web bagi Pembina.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {downloadOptions.map((option, index) => (
                        <motion.div
                            key={option.id}
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative flex flex-col p-8 rounded-[2.5rem] border-2 transition-all duration-300 ${darkMode
                                ? option.popular
                                    ? "bg-slate-800 border-sky-500/50 shadow-[0_0_30px_rgba(14,165,233,0.1)]"
                                    : "bg-slate-800 border-slate-700 shadow-xl"
                                : option.popular
                                    ? "bg-white border-sky-400 shadow-[0_20px_50px_rgba(14,165,233,0.15)]"
                                    : "bg-white border-transparent shadow-xl"
                                }`}
                        >
                            <div className={`absolute top-6 right-6 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${option.user === "Siswa"
                                ? "bg-green-100 text-green-600"
                                : "bg-blue-100 text-blue-600"
                                }`}>
                                {option.user}
                            </div>

                            <div className={`mb-8 p-5 rounded-[1.5rem] w-fit ${darkMode ? "bg-slate-700/50" : "bg-slate-50"}`}>
                                {option.icon}
                            </div>

                            <div className="mb-6">
                                <h3 className={`text-2xl font-extrabold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                                    {option.title}
                                </h3>
                                <p className={`text-sm font-semibold mb-4 ${darkMode ? 'text-sky-400' : 'text-sky-500'}`}>
                                    {option.tagline}
                                </p>
                            </div>

                            <div className="space-y-4 mb-10 flex-1">
                                {option.features.map((feature, fIndex) => (
                                    <div key={fIndex} className="flex items-start gap-3">
                                        <FiChevronRight className={`mt-1 flex-shrink-0 ${darkMode ? 'text-sky-400' : 'text-sky-500'}`} />
                                        <span className={`text-sm font-medium leading-tight ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => handleDownload(option)}
                                className={`w-full py-4 px-6 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${darkMode
                                    ? "bg-gradient-to-r from-sky-600 to-cyan-600 hover:shadow-lg hover:shadow-sky-500/20 text-white"
                                    : "bg-gradient-to-r from-sky-500 to-cyan-400 hover:shadow-lg hover:shadow-sky-300/30 text-white"
                                    }`}
                            >
                                <span>{option.action}</span>
                                {option.id === "web" ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor">
                                        <path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z" />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                        <polyline points="7 10 12 15 17 10" />
                                        <line x1="12" y1="15" x2="12" y2="3" />
                                    </svg>
                                )}
                            </button>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className={`mt-20 p-10 rounded-[3rem] text-center border ${darkMode ? 'border-slate-800 bg-slate-800/30' : 'border-sky-100 bg-white/50 shadow-sm'
                        }`}
                >
                    <div className="flex flex-wrap justify-center gap-12 items-center">
                        <div className="flex flex-col items-center gap-3">
                            <div className={`p-4 rounded-2xl ${darkMode ? 'bg-slate-800' : 'bg-sky-50'}`}>
                                <FiSmartphone className={`text-2xl ${darkMode ? 'text-sky-400' : 'text-sky-500'}`} />
                            </div>
                            <span className={`text-xs font-bold uppercase tracking-widest ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Mobile Native</span>
                        </div>
                        <div className="flex flex-col items-center gap-3">
                            <div className={`p-4 rounded-2xl ${darkMode ? 'bg-slate-800' : 'bg-sky-50'}`}>
                                <FiMonitor className={`text-2xl ${darkMode ? 'text-sky-400' : 'text-sky-500'}`} />
                            </div>
                            <span className={`text-xs font-bold uppercase tracking-widest ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Desktop Optimized</span>
                        </div>
                        <div className="flex flex-col items-center gap-3">
                            <div className={`p-4 rounded-2xl ${darkMode ? 'bg-slate-800' : 'bg-sky-50'}`}>
                                <FiCpu className={`text-2xl ${darkMode ? 'text-sky-400' : 'text-sky-500'}`} />
                            </div>
                            <span className={`text-xs font-bold uppercase tracking-widest ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>High Performance</span>
                        </div>
                        <div className="flex flex-col items-center gap-3">
                            <div className={`p-4 rounded-2xl ${darkMode ? 'bg-slate-800' : 'bg-sky-50'}`}>
                                <FiAward className={`text-2xl ${darkMode ? 'text-sky-400' : 'text-sky-500'}`} />
                            </div>
                            <span className={`text-xs font-bold uppercase tracking-widest ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Secure Platform</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Download;
