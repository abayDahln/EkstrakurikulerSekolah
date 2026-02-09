import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    User,
    Mail,
    LogOut,
    Shield,
    Camera,
    ChevronRight,
    Trophy,
    Users,
    History,
    Edit3,
    X,
    Loader2,
    Star,
    Zap,
    FileText,
    CalendarCheck2
} from "lucide-react";
import sessionManager, { getFullImageUrl } from "../utils/utils.jsx";
import { useNavigate } from "react-router-dom";
import config from "../config/config.js";
import { useConnection, fetchWithTimeout } from "../utils/connectionContext.jsx";
import mockData from "../utils/mockData.js";

const MyProfile = ({ darkMode, onLogout }) => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [activeTab, setActiveTab] = useState("extracurriculars");
    const { setIsServerDown } = useConnection();

    // Edit Profile States
    const [showEditModal, setShowEditModal] = useState(false);
    const [editName, setEditName] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateError, setUpdateError] = useState(null);

    const fetchProfile = async () => {
        if (sessionManager.isDemoMode()) {
            setProfile(mockData.profile);
            setLoading(false);
            return;
        }

        try {
            const token = sessionManager.getToken();
            const response = await fetchWithTimeout(`${config.API_URL}/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    accept: "*/*"
                },
                timeout: 10000
            });

            if (response.ok) {
                const data = await response.json();
                setProfile(data.data);
            } else if (response.status === 500) {
                setIsServerDown(true);
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
            if (error.name === 'TypeError' || error.message === 'Failed to fetch') {
                setIsServerDown(true);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleLogoutClick = () => {
        setShowLogoutConfirm(true);
    };

    const confirmLogout = () => {
        if (onLogout) onLogout();
        navigate("/");
    };

    const handleUpdateProfile = async (e) => {
        if (e) e.preventDefault();
        setIsUpdating(true);
        setUpdateError(null);

        if (sessionManager.isDemoMode()) {
            setTimeout(() => {
                setProfile(prev => ({ ...prev, name: editName, email: editEmail }));
                setShowEditModal(false);
                setIsUpdating(false);
            }, 1000);
            return;
        }

        try {
            const token = sessionManager.getToken();
            const payload = {
                name: editName,
                email: editEmail
            };

            const response = await fetchWithTimeout(`${config.API_URL}/profile`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "accept": "*/*"
                },
                body: JSON.stringify(payload),
                timeout: 10000
            });

            const result = await response.json();
            if (response.ok) {
                setProfile(prev => ({ ...prev, ...result.data }));
                setShowEditModal(false);
            } else if (response.status === 500) {
                setIsServerDown(true);
            } else {
                setUpdateError(result.message || "Gagal memperbarui profil");
            }
        } catch (err) {
            if (err.name === 'TypeError' || err.message === 'Failed to fetch') {
                setIsServerDown(true);
            }
            setUpdateError("Terjadi kesalahan koneksi");
        } finally {
            setIsUpdating(false);
        }
    };

    const handlePhotoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUpdating(true);

        if (sessionManager.isDemoMode()) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile(prev => ({ ...prev, profileUrl: reader.result }));
                setIsUpdating(false);
            };
            reader.readAsDataURL(file);
            return;
        }

        const formData = new FormData();
        formData.append("image", file);

        try {
            const token = sessionManager.getToken();
            const response = await fetchWithTimeout(`${config.API_URL}/profile/photo`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "accept": "*/*"
                },
                body: formData,
                timeout: 10000
            });

            const result = await response.json();
            if (response.ok) {
                setProfile(prev => ({ ...prev, profileUrl: result.data.profileUrl }));
                fetchProfile();
            } else if (response.status === 500) {
                setIsServerDown(true);
            }
        } catch (err) {
            console.error("Photo upload error:", err);
            if (err.name === 'TypeError' || err.message === 'Failed to fetch') {
                setIsServerDown(true);
            }
        } finally {
            setIsUpdating(false);
        }
    };

    const openEditModal = () => {
        setEditName(profile?.name || "");
        setEditEmail(profile?.email || "");
        setShowEditModal(true);
        setUpdateError(null);
    };

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("id-ID", {
            day: "numeric",
            month: "short",
            hour: "2-digit",
            minute: "2-digit"
        }).format(date);
    };


    return (
        <div className={`min-h-screen pb-32 transition-colors duration-300 ${darkMode ? "bg-slate-900" : "bg-slate-50"
            }`}>
            <input type="file" ref={fileInputRef} onChange={handlePhotoUpload} className="hidden" accept="image/*" />

            <div className={`h-40 w-full ${darkMode ? "bg-slate-800" : "bg-gradient-to-r from-sky-500 to-indigo-600"
                }`} />

            <div className={`-mt-20 px-6 rounded-t-[2.5rem] ${darkMode ? "bg-slate-900" : "bg-slate-50"
                }`}>
                <div className="max-w-md mx-auto">
                    <div className="relative -top-14 flex items-end justify-between">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="relative"
                        >
                            <div className={`w-32 h-32 rounded-full border-4 ${darkMode ? "border-slate-900 bg-slate-800" : "border-white bg-slate-200"} shadow-xl overflow-hidden relative`}>
                                {isUpdating && (
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
                                        <Loader2 className="text-white animate-spin" size={24} />
                                    </div>
                                )}
                                {profile?.profileUrl ? (
                                    <img src={getFullImageUrl(profile.profileUrl)} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <User size={48} className={darkMode ? "text-slate-500" : "text-slate-400"} />
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="absolute bottom-1 right-1 bg-sky-500 text-white p-2 rounded-full shadow-lg border-2 border-white dark:border-slate-900"
                            >
                                <Camera size={16} />
                            </button>
                        </motion.div>

                        <button
                            onClick={openEditModal}
                            className={`mb-2 px-6 py-2 rounded-full font-bold text-sm shadow-sm transition-all ${darkMode ? "bg-slate-800 text-sky-400" : "bg-sky-100 text-sky-600"
                                }`}
                        >
                            Edit Profil
                        </button>
                    </div>

                    <div className="-mt-10 mb-8">
                        <h1 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-slate-900"}`}>
                            {loading ? "Loading..." : profile?.name || "Siswa"}
                        </h1>
                        <p className={`text-sm ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
                            {profile?.email || "email@sekolah.id"}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-10">
                        <div className={`p-5 rounded-[2rem] border ${darkMode ? "bg-slate-800/50 border-slate-700" : "bg-white border-slate-100 shadow-sm"}`}>
                            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center mb-4">
                                <Star size={20} fill="currentColor" />
                            </div>
                            <p className={`text-xl font-bold ${darkMode ? "text-white" : "text-slate-900"}`}>
                                {profile?.activityStats?.totalPoints || 0}
                            </p>
                            <p className="text-xs text-slate-500 font-medium">Total Poin</p>
                        </div>
                        <div className={`p-5 rounded-[2rem] border ${darkMode ? "bg-slate-800/50 border-slate-700" : "bg-white border-slate-100 shadow-sm"}`}>
                            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center mb-4">
                                <CalendarCheck2 size={20} />
                            </div>
                            <p className={`text-xl font-bold ${darkMode ? "text-white" : "text-slate-900"}`}>
                                {profile?.activityStats?.totalAttendances || 0}
                            </p>
                            <p className="text-xs text-slate-500 font-medium">Total Hadir</p>
                        </div>
                        <div className={`p-5 rounded-[2rem] border ${darkMode ? "bg-slate-800/50 border-slate-700" : "bg-white border-slate-100 shadow-sm"}`}>
                            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-500 flex items-center justify-center mb-4">
                                <Users size={20} />
                            </div>
                            <p className={`text-xl font-bold ${darkMode ? "text-white" : "text-slate-900"}`}>
                                {profile?.activityStats?.joinedExtracurriculars || 0}
                            </p>
                            <p className="text-xs text-slate-500 font-medium">Total Ekskul</p>
                        </div>
                        <div className={`p-5 rounded-[2rem] border ${darkMode ? "bg-slate-800/50 border-slate-700" : "bg-white border-slate-100 shadow-sm"}`}>
                            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center mb-4">
                                <FileText size={20} />
                            </div>
                            <p className={`text-xl font-bold ${darkMode ? "text-white" : "text-slate-900"}`}>
                                {profile?.activityStats?.totalReports || 0}
                            </p>
                            <p className="text-xs text-slate-500 font-medium">Total Report</p>
                        </div>
                    </div>

                    <div className={`flex p-1.5 rounded-[1.8rem] mb-8 border border-transparent ${darkMode ? "bg-slate-800/40 " : "bg-slate-200/50"}`}>
                        <button
                            onClick={() => setActiveTab("extracurriculars")}
                            className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-[1.4rem] text-xs font-bold transition-all ${activeTab === "extracurriculars"
                                ? (darkMode ? "bg-slate-800 text-white" : "bg-white text-sky-600 shadow-sm")
                                : "text-slate-400 hover:text-slate-600"
                                }`}
                        >
                            <Users size={14} /> Ekskul
                        </button>
                        <button
                            onClick={() => setActiveTab("points")}
                            className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-[1.4rem] text-xs font-bold transition-all ${activeTab === "points"
                                ? (darkMode ? "bg-slate-800 text-white" : "bg-white text-sky-600 shadow-sm")
                                : "text-slate-400 hover:text-slate-600"
                                }`}
                        >
                            <History size={14} /> Poin
                        </button>
                    </div>

                    <div className="space-y-4 pb-20">
                        {activeTab === "extracurriculars" ? (
                            profile?.extracurriculars?.length > 0 ? (
                                profile.extracurriculars.map((ekskul, idx) => (
                                    <EkskulCard
                                        key={idx}
                                        ekskul={ekskul}
                                        darkMode={darkMode}
                                        getFullImageUrl={getFullImageUrl}
                                    />
                                ))
                            ) : (
                                <EmptyState label="Belum ada ekskul" icon={<Users size={32} />} darkMode={darkMode} />
                            )
                        ) : (
                            profile?.pointDetails?.length > 0 ? (
                                profile.pointDetails.map((point, idx) => (
                                    <PointCard key={idx} point={point} darkMode={darkMode} formatDateTime={formatDateTime} />
                                ))
                            ) : (
                                <EmptyState label="Belum ada poin" icon={<Trophy size={32} />} darkMode={darkMode} />
                            )
                        )}

                        <div className="pt-8 flex justify-center">
                            <button
                                onClick={handleLogoutClick}
                                className="flex items-center gap-2 font-bold text-red-500 hover:text-red-600 transition-colors"
                            >
                                <LogOut size={18} /> Keluar Sesi
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {showEditModal && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => !isUpdating && setShowEditModal(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" />
                        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className={`fixed bottom-0 left-0 right-0 p-8 rounded-t-[2.5rem] z-[101] ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white"} border-t shadow-2xl`}>
                            <div className="max-w-md mx-auto">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className={`text-xl font-bold ${darkMode ? "text-white" : "text-slate-900"}`}>Ubah Profil</h3>
                                    <button onClick={() => setShowEditModal(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"><X size={20} /></button>
                                </div>
                                <form onSubmit={handleUpdateProfile} className="space-y-4">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-4 flex items-center text-slate-400">
                                            <User size={20} />
                                        </div>
                                        <input
                                            type="text"
                                            value={editName}
                                            onChange={(e) => setEditName(e.target.value)}
                                            placeholder="Nama Lengkap"
                                            className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 transition-all outline-none ${darkMode ? "bg-slate-900 border-slate-700 text-white focus:border-sky-500" : "bg-slate-50 border-slate-100 text-slate-900 focus:border-sky-500"}`}
                                        />
                                    </div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-4 flex items-center text-slate-400">
                                            <Mail size={20} />
                                        </div>
                                        <input
                                            type="email"
                                            value={editEmail}
                                            onChange={(e) => setEditEmail(e.target.value)}
                                            placeholder="Alamat Email"
                                            className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 transition-all outline-none ${darkMode ? "bg-slate-900 border-slate-700 text-white focus:border-sky-500" : "bg-slate-50 border-slate-100 text-slate-900 focus:border-sky-500"}`}
                                        />
                                    </div>
                                    {updateError && <p className="text-red-500 text-xs px-2 font-medium">{updateError}</p>}
                                    <button type="submit" disabled={isUpdating} className="w-full py-4 rounded-2xl bg-sky-500 text-white font-bold shadow-lg shadow-sky-500/30 flex items-center justify-center gap-2">
                                        {isUpdating ? <Loader2 className="animate-spin" size={20} /> : "Simpan Perubahan"}
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </>
                )}

                {showLogoutConfirm && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowLogoutConfirm(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" />
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-sm p-8 rounded-[2.5rem] z-[101] ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white"} border shadow-2xl`}>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-red-50 dark:bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6"><LogOut size={32} className="text-red-500" /></div>
                                <h3 className={`text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-slate-900"}`}>Keluar Sesi</h3>
                                <p className={`text-sm mb-8 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>Apakah Anda yakin ingin keluar dari aplikasi?</p>
                                <div className="flex flex-col gap-3">
                                    <button onClick={confirmLogout} className="w-full py-4 rounded-2xl bg-red-500 text-white font-bold shadow-lg shadow-red-500/30">Ya, Keluar</button>
                                    <button onClick={() => setShowLogoutConfirm(false)} className={`w-full py-4 rounded-2xl font-bold ${darkMode ? "bg-slate-700 text-white" : "bg-slate-100 text-slate-700"}`}>Batal</button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

const EkskulCard = ({ ekskul, darkMode, getFullImageUrl }) => (
    <div className={`p-4 rounded-3xl border flex items-center gap-4 ${darkMode ? "bg-slate-800/50 border-slate-700" : "bg-white border-slate-100 shadow-sm"
        }`}>
        <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-sm">
            <img src={getFullImageUrl(ekskul.imageUrl)} alt={ekskul.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
            <h4 className="font-bold text-sm tracking-tight">{ekskul.name}</h4>
            <p className={`text-xs mt-0.5 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                {ekskul.totalPoints} Poin • {ekskul.status}
            </p>
        </div>
        <ChevronRight size={16} className="text-slate-300" />
    </div>
);

const PointCard = ({ point, darkMode, formatDateTime }) => {
    const getDescription = (title, ekskulName) => {
        const t = title.toLowerCase();
        if (t.includes("hadir")) return "hadir pada kegiatan ekskul";
        if (t.includes("izin")) return "izin tidak mengikuti ekskul";
        if (t.includes("mengupload")) return "mengupload dokumentasi kegiatan";
        if (t.includes("bergabung")) return `bergabung ke ekskul ${ekskulName || "ekskul"}`;
        if (t.includes("sakit")) return "tidak mengikuti kegiatan karena sakit";
        return title;
    };

    return (
        <div className={`p-4 rounded-3xl border flex items-center justify-between ${darkMode ? "bg-slate-800/50 border-slate-700" : "bg-white border-slate-100 shadow-sm"
            }`}>
            <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${darkMode ? "bg-sky-500/10 text-sky-400" : "bg-sky-50 text-sky-600"}`}>
                    <History size={18} />
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-0.5">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${darkMode ? "bg-slate-700 text-slate-300" : "bg-sky-50 text-sky-600"}`}>
                            {point.extracurricular?.name}
                        </span>
                        <p className={`text-[10px] ${darkMode ? "text-slate-500" : "text-slate-400"}`}>{formatDateTime(point.createdAt)}</p>
                    </div>
                    <h4 className="font-bold text-sm">
                        {getDescription(point.title, point.extracurricular?.name)}
                    </h4>
                </div>
            </div>
            <span className="text-lg font-black text-sky-500">+{point.points}</span>
        </div>
    );
};

const EmptyState = ({ label, icon, darkMode }) => (
    <div className={`py-12 text-center rounded-3xl border-2 border-dashed ${darkMode ? "border-slate-800 text-slate-600" : "border-slate-100 text-slate-300"}`}>
        <div className="flex justify-center mb-2 opacity-50">{icon}</div>
        <p className="text-xs font-bold uppercase tracking-widest">{label}</p>
    </div>
);

export default MyProfile;
