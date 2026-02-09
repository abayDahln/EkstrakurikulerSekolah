import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronRight,
    Sparkles,
    TrendingUp,
    Zap,
    Trophy,
    Users,
    Bell,
    X
} from "lucide-react";
import sessionManager, { getFullImageUrl } from "../utils/utils.jsx";
import { useNavigate } from "react-router-dom";
import config from "../config/config.js";
import { useConnection, fetchWithTimeout } from "../utils/connectionContext.jsx";
import mockData from "../utils/mockData.js";

const Home = ({ darkMode }) => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [ekskuls, setEkskuls] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [showNotification, setShowNotification] = useState(false);
    const [loading, setLoading] = useState(true);
    const [prevTodayCount, setPrevTodayCount] = useState(0);
    const [isNotificationDismissed, setIsNotificationDismissed] = useState(false);
    const { setIsServerDown } = useConnection();

    const fetchData = async () => {
        if (sessionManager.isDemoMode()) {
            setProfile(mockData.profile);
            setEkskuls(mockData.extracurriculars);
            setSchedules(mockData.schedules);
            setLoading(false);
            return;
        }

        try {
            const token = sessionManager.getToken();
            const headers = {
                Authorization: `Bearer ${token}`,
                accept: "*/*"
            };

            const [profileRes, ekskulRes, scheduleRes] = await Promise.all([
                fetchWithTimeout(`${config.API_URL}/profile`, { headers, timeout: 10000 }),
                fetchWithTimeout(`${config.API_URL}/extracurricular`, { headers, timeout: 10000 }),
                fetchWithTimeout(`${config.API_URL}/schedule`, { headers, timeout: 10000 })
            ]);

            if (profileRes.ok) {
                const data = await profileRes.json();
                setProfile(data.data);
            } else if (profileRes.status === 500) {
                setIsServerDown(true);
            }

            if (ekskulRes.ok) {
                const data = await ekskulRes.json();
                setEkskuls(data.data || []);
            } else if (ekskulRes.status === 500) {
                setIsServerDown(true);
            }

            if (scheduleRes.ok) {
                const data = await scheduleRes.json();
                setSchedules(data.data || []);
            } else if (scheduleRes.status === 500) {
                setIsServerDown(true);
            }
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
            if (error.name === 'TypeError' || error.message === 'Failed to fetch') {
                setIsServerDown(true);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const todayStr = new Date().toDateString();
        const currentTodaySchedules = schedules.filter(item =>
            new Date(item.scheduleDate).toDateString() === todayStr
        );

        const currentCount = currentTodaySchedules.length;

        if (currentCount > prevTodayCount) {
            setShowNotification(true);
            setIsNotificationDismissed(false);
            setPrevTodayCount(currentCount);
        } else if (currentCount === 0) {
            setShowNotification(false);
            setPrevTodayCount(0);
        } else if (!isNotificationDismissed) {
            setShowNotification(true);
        }
    }, [schedules, prevTodayCount, isNotificationDismissed]);

    const todayActivities = schedules.filter(item => {
        const itemDate = new Date(item.scheduleDate);
        return itemDate.toDateString() === new Date().toDateString();
    });

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Selamat Pagi";
        if (hour < 15) return "Selamat Siang";
        if (hour < 18) return "Selamat Sore";
        return "Selamat Malam";
    };

    const joinedEkskuls = ekskuls.filter(e => e.isMember);

    if (loading) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${darkMode ? "bg-slate-900" : "bg-slate-50"}`}>
                <div className="flex flex-col items-center gap-4">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="w-12 h-12 border-4 border-sky-500/30 border-t-sky-500 rounded-full"
                    />
                    <p className={`text-sm font-bold ${darkMode ? "text-slate-400" : "text-slate-500"}`}>Menyiapkan Home...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen pb-32 transition-colors duration-300 ${darkMode ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-900"}`}>

            <style dangerouslySetInnerHTML={{
                __html: `
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { 
                    -ms-overflow-style: none; 
                    scrollbar-width: none; 
                    -webkit-overflow-scrolling: touch;
                }
            `}} />

            <div className={`relative px-8 pt-10 pb-10 overflow-hidden rounded-b-[3rem] ${darkMode ? "bg-slate-800" : "bg-white"} transition-colors shadow-sm`}>
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Sparkles size={120} className="text-sky-500 rotate-12" />
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative z-10"
                >
                    <div className="flex items-center gap-2 mb-2">
                        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${darkMode ? "bg-slate-700 text-sky-400" : "bg-sky-50 text-sky-600"}`}>
                            Home
                        </span>
                    </div>
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-black mb-1 leading-tight">
                                {getGreeting()}, <br />
                                <span className="text-sky-500">{profile?.name?.split(' ')[0] || "Siswa"}!</span>
                            </h1>
                            <p className={`text-sm font-medium ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                                Ada aktivitas seru apa hari ini?
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>

            <AnimatePresence>
                {showNotification && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="px-6 mt-6 cursor-pointer"
                        onClick={() => navigate('/jadwal', { state: { fromNotification: true } })}
                    >
                        <div className={`p-4 rounded-[1.5rem] flex items-center justify-between shadow-xl transition-colors ${darkMode
                            ? "bg-slate-800 border border-slate-800"
                            : "bg-sky-600 border border-sky-500 shadow-sky-100/40"
                            }`}>
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${darkMode ? "bg-sky-500/20" : "bg-white/20"}`}>
                                    <Bell size={20} className="text-white animate-bounce" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-bold text-white">Ada aktivitas hari ini!</p>
                                    <p className="text-[10px] text-white/70 truncate">
                                        Kamu punya {todayActivities.length} jadwal untuk hari ini.
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowNotification(false);
                                    setIsNotificationDismissed(true);
                                }}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/50"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mt-10">
                <div className="px-6 flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                        <div className="w-1.5 h-6 bg-sky-500 rounded-full" />
                        Ekskul Kamu
                    </h2>
                    <button
                        onClick={() => navigate('/ekskuls')}
                        className="text-xs font-bold text-sky-500 flex items-center gap-1 hover:gap-2 transition-all"
                    >
                        Jelajahi Lainnya <ChevronRight size={14} />
                    </button>
                </div>

                <div className="overflow-x-auto no-scrollbar">
                    <div className="flex flex-nowrap gap-5 px-6 pb-8">
                        {joinedEkskuls.length > 0 ? joinedEkskuls.map((ekskul, idx) => (
                            <motion.div
                                key={ekskul.id}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate(`/ekskul/${ekskul.id}`)}
                                className={`flex-shrink-0 w-72 rounded-[1.5rem] overflow-hidden border transition-all hover:shadow-2xl ${darkMode ? "bg-slate-800/80 border-slate-800" : "bg-white border-slate-50 shadow-xl shadow-slate-200/40"}`}
                            >
                                <div className="h-32 relative">
                                    <img
                                        src={getFullImageUrl(ekskul.imageUrl)}
                                        className="w-full h-full object-cover"
                                        alt={ekskul.name}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                </div>
                                <div className="p-5">
                                    <h4 className="font-bold text-lg mb-2 truncate">{ekskul.name}</h4>
                                    <div className="flex items-center gap-2 text-slate-400">
                                        <span className="text-[12px] font-bold tracking-wider truncate">{ekskul.pembina?.name || "Guru Pembina"}</span>
                                    </div>
                                </div>
                            </motion.div>
                        )) : (
                            <div className={`w-full py-12 flex flex-col items-center justify-center rounded-[2.5rem] border-2 border-dashed ${darkMode ? "border-slate-800 text-slate-600" : "border-slate-100 text-slate-300"}`}>
                                <Users size={40} className="mb-4 opacity-30" />
                                <p className="text-xs font-black tracking-widest">Kamu belum mengikuti ekskul apa pun</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="px-6 mt-6">
                <div className={`p-8 rounded-[2.5rem] relative overflow-hidden ${darkMode ? "bg-gradient-to-br from-indigo-900 to-slate-800" : "bg-gradient-to-br from-sky-500 to-indigo-600"} shadow-2xl`}>
                    <div className="absolute -right-8 -bottom-8 opacity-20">
                        <Trophy size={160} className="text-white" />
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-white text-xl font-black mb-2">Prestasi & Sertifikat</h3>
                        <p className="text-white/70 text-sm font-medium mb-6 leading-relaxed">
                            Ayo tingkatkan poin kamu dengan mengikuti banyak aktivitas seru.
                        </p>
                        <button
                            onClick={() => navigate('/certificates')}
                            className="px-8 py-3 bg-white text-sky-600 rounded-2xl font-bold text-xs shadow-lg shadow-black/10 active:scale-95 transition-all"
                        >
                            Cek Koleksi Saya
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Home;
