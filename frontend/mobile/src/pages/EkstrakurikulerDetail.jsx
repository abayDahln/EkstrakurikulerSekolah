import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import {
    Users,
    Zap,
    Trophy,
    ArrowLeft,
    Loader2,
    ChevronRight,
    CircleCheck
} from "lucide-react";
import sessionManager from "../utils/utils.jsx";
import config from "../config/config.js";
import CustomDialog from "../components/CustomDialog.jsx";
import SliderButton from "../components/SliderButton.jsx";
import { Info, X as CloseIcon } from "lucide-react";
import { useConnection, fetchWithTimeout } from "../App.jsx";

const EkstrakurikulerDetail = ({ darkMode }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ekskul, setEkskul] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isJoining, setIsJoining] = useState(false);
    const [error, setError] = useState(null);
    const [members, setMembers] = useState([]);
    const [showJoinModal, setShowJoinModal] = useState(false);
    const [dialog, setDialog] = useState({ isOpen: false, title: "", message: "", type: "info" });
    const { setIsServerDown } = useConnection();

    const showDialog = (title, message, type = "info", onConfirm = null) => {
        setDialog({ isOpen: true, title, message, type, onConfirm });
    };

    const fetchDetail = async () => {
        try {
            const token = sessionManager.getToken();
            const response = await fetchWithTimeout(`${config.API_URL}/extracurricular/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    accept: "*/*"
                },
                timeout: 10000
            });

            if (response.ok) {
                const result = await response.json();
                const data = result.data;

                setEkskul(data);
                setMembers(data.members || []);
            } else if (response.status === 500) {
                setIsServerDown(true);
            } else {
                setError("Gagal memuat detail ekskul");
            }
        } catch (err) {

            console.error("Fetch detail error:", err);


            if (err.name === 'TypeError' || err.message === 'Failed to fetch') {
                setIsServerDown(true);
            } else if (err instanceof TypeError && err.message.includes('fetch')) {
                setError("Gagal terhubung ke server. Pastikan backend menyala.");
            } else {
                setError("Terjadi kesalahan internal pada aplikasi.");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDetail();
    }, [id]);

    const handleJoin = async () => {
        if (isJoining || ekskul?.isMember) return;

        const token = sessionManager.getToken();
        if (!token) {
            showDialog("Perhatian", "Silakan login terlebih dahulu untuk bergabung dengan ekstrakurikuler.", "info", () => navigate("/login"));
            return;
        }

        setShowJoinModal(true);
    };

    const confirmJoin = async () => {
        setIsJoining(true);
        const token = sessionManager.getToken();
        try {
            const response = await fetchWithTimeout(`${config.API_URL}/extracurricular/${id}/join`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    accept: "*/*"
                },
                timeout: 10000
            });

            const result = await response.json();

            if (response.ok) {
                showDialog("Berhasil", result.message || "Berhasil bergabung!", "success");
                setShowJoinModal(false);
                await fetchDetail();
            } else {
                showDialog("Masalah", result.message || "Gagal bergabung", "error");
                setShowJoinModal(false);
            }
        } catch (err) {
            console.error("Join error:", err);
            if (err.name === 'TypeError' || err.message === 'Failed to fetch') {
                setIsServerDown(true);
            }
            showDialog("Error", "Terjadi kesalahan koneksi", "error");
            setShowJoinModal(false);
        } finally {
            setIsJoining(false);
        }
    };

    const getFullImageUrl = (url) => {
        if (!url) return "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=600&fit=crop";
        if (url.startsWith("http")) return url;
        return `${config.BASE_URL}/${url}`;
    };

    if (loading) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${darkMode ? "bg-slate-900" : "bg-slate-50"}`}>
                <div className="flex flex-col items-center gap-4">
                    <Loader2 size={40} className="animate-spin text-sky-500" />
                    <p className={`text-sm font-bold ${darkMode ? "text-slate-400" : "text-slate-500"}`}>Memuat Detail...</p>
                </div>
            </div>
        );
    }

    if (error || !ekskul) {
        return (
            <div className={`min-h-screen flex flex-col items-center justify-center p-6 text-center ${darkMode ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-900"}`}>
                <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center mb-6 text-red-500">
                    <Zap size={40} />
                </div>
                <h2 className="text-xl font-black mb-2">{error || "Data tidak ditemukan"}</h2>
                <button
                    onClick={() => navigate("/ekskuls")}
                    className="mt-4 px-8 py-3 bg-sky-500 text-white rounded-2xl font-bold text-xs"
                >
                    Kembali
                </button>
            </div>
        );
    }

    return (
        <div className={`min-h-screen pb-40 transition-colors duration-300 ${darkMode ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-900"}`}>

            <div className="relative h-[45vh] w-full overflow-hidden">
                <img
                    src={getFullImageUrl(ekskul.imageUrl)}
                    alt={ekskul.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-8 left-6 w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center active:scale-95 transition-all z-10 shadow-lg shadow-sky-500/40"
                >
                    <ArrowLeft size={20} />
                </button>
            </div>

            <div className={`-mt-10 relative z-10 px-8 pt-10 pb-32 rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.04)] ${darkMode ? "bg-slate-900" : "bg-white"}`}>

                <div className="mb-8">

                    <div className="flex flex-wrap items-center gap-3">
                        <h1 className="text-3xl font-bold leading-tight">
                            {ekskul.name}
                        </h1>
                        {ekskul.isMember && (
                            <div className="px-3 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/20 flex items-center gap-1.5">
                                <CircleCheck size={12} className="text-emerald-500" />
                                <span className="text-[9px] font-black text-emerald-600 tracking-widest">Bergabung</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mb-10">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <div className="w-1.5 h-6 bg-sky-500 rounded-full" />
                        Tentang Ekskul Ini
                    </h2>
                    <p className={`text-sm leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                        {ekskul.description}
                    </p>
                </div>

                {ekskul.pembinas && ekskul.pembinas.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <div className="w-1.5 h-6 bg-sky-500 rounded-full" />
                            Pembina
                        </h2>
                        <div className={`p-6 rounded-[2.5rem] border flex items-center gap-5 ${darkMode ? "bg-slate-800/50 border-slate-700" : "bg-slate-50 border-slate-100"}`}>
                            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-sky-500/20 shadow-lg">
                                <img
                                    src={getFullImageUrl(ekskul.pembinas[0].profile)}
                                    alt={ekskul.pembinas[0].name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Crect fill='%23334155' width='40' height='40'/%3E%3Ctext x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' font-family='Plus Jakarta Sans, sans-serif' font-size='14' fill='white'%3EP%3C/text%3E%3C/svg%3E`;
                                    }}
                                />
                            </div>
                            <div className="flex-1">
                                <p className={`text-[10px] font-black tracking-widest ${darkMode ? "text-slate-500" : "text-slate-400"}`}>Pembina</p>
                                <h4 className="font-bold text-lg">{ekskul.pembinas[0].name}</h4>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mb-10">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <div className="w-1.5 h-6 bg-sky-500 rounded-full" />
                            Anggota
                        </h2>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{members.length} Total</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 p-2 -m-2">
                        {members.map((member, idx) => (
                            <div
                                key={member.id}
                                className={`flex flex-col items-center text-center p-4 rounded-3xl border ${darkMode ? "bg-slate-800/50 border-slate-700" : "bg-slate-50 border-slate-100"}`}
                            >
                                <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-sky-500/10 mb-3">
                                    <img
                                        src={getFullImageUrl(member.profile)}
                                        alt={member.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Crect fill='%2338bdf8' width='40' height='40'/%3E%3Ctext x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' font-family='Plus Jakarta Sans, sans-serif' font-size='12' fill='white'%3EM%3C/text%3E%3C/svg%3E`;
                                        }}
                                    />
                                </div>
                                <div className="w-full min-w-0">
                                    <p className="font-bold text-sm truncate mb-0.5">{member.name}</p>
                                    <div className="flex items-center justify-center gap-1.5">
                                        <Trophy size={10} className="text-amber-500" />
                                        <span className="text-[10px] font-black text-amber-600 uppercase tracking-tighter">{member.totalPoints} Poin</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {members.length === 0 && (
                        <p className="text-center text-sm text-slate-400 py-4 italic">Belum ada anggota.</p>
                    )}
                </div>
            </div>

            <div className={`fixed bottom-0 left-0 right-0 p-6 z-[20] ${darkMode ? "bg-slate-900/80 backdrop-blur-xl border-t border-slate-800" : "bg-white/80 backdrop-blur-xl border-t border-slate-100 shadow-[0_10px_20px_rgba(0,0,0,0.05)]"}`}>
                <div className="max-w-md mx-auto">
                    <button
                        onClick={handleJoin}
                        disabled={isJoining || ekskul.isMember}
                        className={`w-full py-4 rounded-full font-bold text-md tracking-[0.05em] flex items-center justify-center gap-3 transition-all active:scale-[0.97] ${ekskul.isMember
                            ? (darkMode ? "bg-slate-800 text-emerald-500 border border-emerald-500/30" : "bg-emerald-50 text-emerald-600 border border-emerald-100")
                            : "bg-sky-500 text-white shadow-sky-500/40 hover:bg-sky-600"
                            }`}
                    >
                        {isJoining ? (
                            <Loader2 size={18} className="animate-spin" />
                        ) : ekskul.isMember ? (
                            <>
                                <CircleCheck size={18} />
                                Sudah Bergabung
                            </>
                        ) : (
                            <>
                                Gabung Ekstrakurikuler
                            </>
                        )}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {showJoinModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => !isJoining && setShowJoinModal(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                        <motion.div initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 30 }} className={`relative w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl overflow-hidden border ${darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"}`}>
                            <div className="flex justify-between items-start mb-6">
                                <div className={`p-4 rounded-3xl ${darkMode ? "bg-slate-800" : "bg-sky-50"}`}>
                                    <Info size={32} className="text-sky-500" />
                                </div>
                                <button
                                    onClick={() => setShowJoinModal(false)}
                                    disabled={isJoining}
                                    className={`p-2 rounded-xl transition-colors ${darkMode ? "hover:bg-slate-800 text-slate-500" : "hover:bg-slate-50 text-slate-400"}`}
                                >
                                    <CloseIcon size={20} />
                                </button>
                            </div>

                            <div className="mb-8">
                                <h3 className={`text-xl font-bold mb-3 ${darkMode ? "text-white" : "text-slate-900"}`}>Konfirmasi Bergabung</h3>
                                <p className={`text-sm leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                                    Apakah Anda yakin ingin bergabung dengan ekstrakurikuler <span className="font-bold">{ekskul.name}</span>? Kamu akan mendapatkan notifikasi jadwal dan aktivitas terbaru.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <SliderButton
                                    onConfirm={confirmJoin}
                                    isLoading={isJoining}
                                    darkMode={darkMode}
                                    text="Konfirmasi gabung"
                                    successText="Memproses..."
                                />
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <CustomDialog
                isOpen={dialog.isOpen}
                onClose={() => setDialog({ ...dialog, isOpen: false })}
                onConfirm={dialog.onConfirm}
                title={dialog.title}
                message={dialog.message}
                type={dialog.type}
                darkMode={darkMode}
            />
        </div>
    );
};

export default EkstrakurikulerDetail;
