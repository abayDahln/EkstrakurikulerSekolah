import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Users,
    ChevronRight,
    Sparkles,
    TrendingUp,
    MapPin,
    ArrowUpRight,
    Loader2,
    X,
    Zap
} from "lucide-react";
import sessionManager from "../utils/utils.jsx";
import { useNavigate } from "react-router-dom";
import config from "../config/config.js";
import { useConnection, fetchWithTimeout } from "../App.jsx";


const Ekstrakurikuler = ({ darkMode }) => {
    const navigate = useNavigate();
    const [ekskuls, setEkskuls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [error, setError] = useState(null);
    const { setIsServerDown } = useConnection();

    const fetchEkskuls = async (searchTerm = "") => {
        setIsSearching(true);
        try {
            console.log("Fetching ekskuls with search:", searchTerm);
            const token = sessionManager.getToken();
            const headers = {
                Authorization: `Bearer ${token}`,
                accept: "*/*"
            };

            const url = searchTerm
                ? `${config.API_URL}/extracurricular?search=${encodeURIComponent(searchTerm)}`
                : `${config.API_URL}/extracurricular`;

            const response = await fetchWithTimeout(url, { headers, timeout: 10000 });

            if (response.ok) {
                const result = await response.json();
                console.log("Fetch result:", result);
                setEkskuls(result.data || []);
            } else if (response.status === 500) {
                setIsServerDown(true);
            } else {
                console.error("Fetch failed with status:", response.status);
                setError("Gagal memuat data dari server");
            }
        } catch (error) {
            console.error("Error fetching extracurriculars:", error);
            if (error.name === 'TypeError' || error.message === 'Failed to fetch') {
                setIsServerDown(true);
            }
            setError("Gagal terhubung ke server");
        } finally {
            setLoading(false);
            setIsSearching(false);
        }
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchEkskuls(search);
        }, search === "" ? 0 : 500);

        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    const getFullImageUrl = (url) => {
        if (!url) return "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=250&fit=crop";
        if (url.startsWith("http")) return url;
        return `${config.BASE_URL}/${url}`;
    };

    return (
        <div className={`min-h-screen pb-32 transition-colors duration-300 ${darkMode ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-900"}`}>

            <style dangerouslySetInnerHTML={{
                __html: `
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}} />

            <div className={`px-6 pt-12 pb-6 ${darkMode ? "bg-slate-800" : "bg-white"} rounded-b-[3rem] shadow-sm`}>
                <h1 className="text-3xl font-bold mb-6">Daftar Ekskul</h1>

                <div className="relative">
                    <div className="absolute inset-y-0 left-4 flex items-center text-slate-400">
                        <Search size={18} />
                    </div>
                    <input
                        type="text"
                        placeholder="Cari ekskul favoritmu..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className={`w-full pl-12 pr-12 py-4 rounded-4xl border-2 transition-all outline-none ${darkMode ? "bg-slate-700/30 border-slate-700 text-white focus:border-sky-500" : "bg-slate-50 border-slate-200 focus:border-sky-500"}`}
                    />
                    {search && (
                        <button
                            onClick={() => setSearch("")}
                            className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-sky-500"
                        >
                            <X size={18} />
                        </button>
                    )}
                </div>
            </div>

            <div className="px-6 mt-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                        <div className="w-1.5 h-6 bg-sky-500 rounded-full" />
                        Semua Ekstrakurikuler
                    </h2>
                    <span className="text-[10px] text-slate-400 tracking-widest text-right">
                        {ekskuls.length} Ekskul Total
                    </span>
                </div>

                {loading || isSearching ? (
                    <div className="flex flex-col items-center justify-center py-20 opacity-50">
                        <Loader2 size={40} className="animate-spin text-sky-500 mb-4" />
                        <p className="text-sm font-bold">Memuat Ekskul...</p>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <p className="text-red-500 mb-4 font-bold">{error}</p>
                        <button
                            onClick={() => fetchEkskuls(search)}
                            className="px-6 py-3 bg-sky-500 text-white rounded-2xl font-bold text-xs"
                        >
                            Coba Lagi
                        </button>
                    </div>
                ) : ekskuls.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6">
                        {ekskuls.map((ekskul, idx) => (
                            <motion.div
                                key={ekskul.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate(`/ekskul/${ekskul.id}`)}
                                className={`rounded-[2rem] overflow-hidden border transition-all hover:shadow-2xl flex flex-col ${darkMode ? "bg-slate-800/80 border-slate-700" : "bg-white border-slate-100 shadow-xl shadow-slate-200/50"}`}
                            >
                                <div className="relative h-48 overflow-hidden group">
                                    <img
                                        src={getFullImageUrl(ekskul.imageUrl)}
                                        alt={ekskul.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        onError={(e) => {
                                            e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'%3E%3Crect fill='%23${darkMode ? "1e293b" : "f1f5f9"}' width='400' height='200'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='16' fill='%23${darkMode ? "475569" : "94a3b8"}'%3E${ekskul.name}%3C/text%3E%3C/svg%3E`;
                                        }}
                                    />
                                </div>

                                <div className="p-5 flex flex-col flex-grow">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className={`font-bold text-xl leading-tight inline-flex items-center gap-2 ${darkMode ? "text-white" : "text-slate-900"}`}>
                                            {ekskul.name}
                                            {ekskul.isMember && (
                                                <div className="px-3.5 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/20 flex items-center gap-1">
                                                    <span className="text-[10px] font-black text-emerald-600 tracking-tighter uppercase">Joined</span>
                                                </div>
                                            )}
                                        </h3>
                                    </div>

                                    <p className={`text-sm leading-relaxed mb-6 line-clamp-2 flex-grow ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                                        {ekskul.description}
                                    </p>

                                    <div className={`flex items-center gap-3 pt-4 border-t ${darkMode ? "border-slate-700/50" : "border-slate-100"}`}>
                                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-sky-500/20 flex-shrink-0">
                                            <img
                                                src={getFullImageUrl(ekskul.pembina?.profile)}
                                                alt={ekskul.pembina?.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Crect fill='%23${darkMode ? "334155" : "f1f5f9"}' width='40' height='40'/%3E%3Ctext x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' font-family='Plus Jakarta Sans, sans-serif' font-size='14' fill='%23${darkMode ? "94a3b8" : "64748b"}'%3E${ekskul.pembina?.name?.charAt(0) || "P"}%3C/text%3E%3C/svg%3E`;
                                                }}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className={`text-[10px] font-semibold tracking-widest ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
                                                Pembina
                                            </p>
                                            <p className={`text-sm font-bold truncate ${darkMode ? "text-white" : "text-slate-900"}`}>
                                                {ekskul.pembina?.name || "Belum ada pembina"}
                                            </p>
                                        </div>
                                        <div className={`p-2 rounded-lg ${darkMode ? "bg-slate-700/50" : "bg-slate-50"}`}>
                                            <ChevronRight size={16} className="text-sky-500" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center mb-6 ${darkMode ? "bg-slate-800" : "bg-slate-100"}`}>
                            <Search size={32} className="text-slate-300" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Ekskul Tidak Ditemukan</h3>
                        <p className={`text-sm px-10 ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
                            Maaf, kami tidak menemukan ekskul yang cocok dengan kata kunci "{search}".
                        </p>
                        <button
                            onClick={() => setSearch("")}
                            className="mt-6 text-sky-500 font-bold text-sm"
                        >
                            Hapus Pencarian
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Ekstrakurikuler;
