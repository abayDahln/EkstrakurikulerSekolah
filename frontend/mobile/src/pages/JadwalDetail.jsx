import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import {
    MapPin,
    Calendar,
    FileText,
    Image as ImageIcon,
    CheckCircle2,
    AlertCircle,
    Send,
    Loader2,
    ArrowLeft,
    MessageSquare,
    X,
    ClipboardList,
    ChevronRight
} from "lucide-react";
import sessionManager, { getFullImageUrl } from "../utils/utils.jsx";
import config from "../config/config.js";
import CustomDialog from "../components/CustomDialog.jsx";
import SliderButton from "../components/SliderButton.jsx";
import { useConnection, fetchWithTimeout } from "../utils/connectionContext.jsx";
import mockData from "../utils/mockData.js";

const JadwalDetail = ({ darkMode }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [schedule, setSchedule] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [reportTitle, setReportTitle] = useState("");
    const [reportText, setReportText] = useState("");
    const [activeTab, setActiveTab] = useState(() => {
        return sessionStorage.getItem(`jadwal_detail_tab_${id}`) || "info";
    });

    useEffect(() => {
        sessionStorage.setItem(`jadwal_detail_tab_${id}`, activeTab);
    }, [activeTab, id]);
    // States for Dialogs
    const [showAbsenModal, setShowAbsenModal] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const [selectedAbsenStatus, setSelectedAbsenStatus] = useState(null);
    const [showDocDialog, setShowDocDialog] = useState(false);
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [dialog, setDialog] = useState({ isOpen: false, title: "", message: "", type: "info" });
    const { setIsServerDown } = useConnection();

    const showDialog = (title, message, type = "info", onConfirm = null) => {
        setDialog({ isOpen: true, title, message, type, onConfirm });
    };

    const fetchDetail = async () => {
        if (sessionManager.isDemoMode()) {
            const demoSchedule = mockData.schedules.find(s => s.id === parseInt(id));
            if (demoSchedule) {
                setSchedule(demoSchedule);
            } else {
                setError("Jadwal tidak ditemukan dalam mode demo");
            }
            setLoading(false);
            return;
        }

        try {
            const token = sessionManager.getToken();
            const response = await fetchWithTimeout(`${config.API_URL}/schedule/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "accept": "*/*"
                },
                timeout: 10000
            });

            if (response.ok) {
                const result = await response.json();
                setSchedule(result.data);
            } else if (response.status === 500) {
                setIsServerDown(true);
            } else {
                setError("Gagal memuat detail jadwal");
            }
        } catch (err) {
            console.error("Fetch detail error:", err);
            if (err.name === 'TypeError' || err.message === 'Failed to fetch') {
                setIsServerDown(true);
            }
            setError("Gagal terhubung ke server");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDetail();
    }, [id]);

    const isAttendanceExpired = () => {
        if (!schedule) return true;
        const scheduleDate = new Date(schedule.scheduleDate);
        const now = new Date();
        const diffTime = Math.abs(now - scheduleDate);
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
        return diffDays > 1;
    };

    const handleAttendance = async (status) => {
        if (isSubmitting || schedule?.isAbsent) return;

        setIsSubmitting(true);

        if (sessionManager.isDemoMode()) {
            setTimeout(() => {
                showDialog("Berhasil", "Absen berhasil (Mode Demo)!", "success");
                setShowAbsenModal(false);
                setSchedule(prev => ({ ...prev, isAbsent: true, absent: status }));
                setIsSubmitting(false);
            }, 1500);
            return;
        }

        try {
            const token = sessionManager.getToken();
            const response = await fetchWithTimeout(`${config.API_URL}/schedule/attendance`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                    "accept": "*/*"
                },
                body: JSON.stringify({
                    scheduleId: parseInt(id),
                    status: status
                }),
                timeout: 10000
            });

            const result = await response.json();

            if (response.ok) {
                showDialog("Berhasil", result.message || "Absen berhasil!", "success");
                setShowAbsenModal(false);
                fetchDetail();
            } else {
                showDialog("Gagal", result.message || "Gagal mencatat absen", "error");
            }
        } catch (err) {
            console.error("Attendance error:", err);
            if (err.name === 'TypeError' || err.message === 'Failed to fetch') {
                setIsServerDown(true);
            }
            showDialog("Error", "Terjadi kesalahan koneksi", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReport = async (e) => {
        if (e) e.preventDefault();
        if (isSubmitting || schedule?.isReported || !reportText.trim() || !reportTitle.trim()) return;

        setIsSubmitting(true);

        if (sessionManager.isDemoMode()) {
            setTimeout(() => {
                showDialog("Berhasil", "Laporan berhasil dikirim (Mode Demo)!", "success");
                setShowReportModal(false);
                setReportText("");
                setReportTitle("");
                setSchedule(prev => ({
                    ...prev,
                    isReported: true,
                    reports: [
                        ...(prev.reports || []),
                        {
                            id: Date.now(),
                            reportTitle,
                            reportText,
                            member: mockData.profile
                        }
                    ]
                }));
                setIsSubmitting(false);
            }, 1500);
            return;
        }

        try {
            const token = sessionManager.getToken();
            const response = await fetchWithTimeout(`${config.API_URL}/schedule/report`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                    "accept": "*/*"
                },
                body: JSON.stringify({
                    scheduleId: parseInt(id),
                    reportTitle: reportTitle,
                    reportText: reportText
                }),
                timeout: 10000
            });

            const result = await response.json();

            if (response.ok) {
                showDialog("Berhasil", result.message || "Laporan berhasil dikirim!", "success");
                setShowReportModal(false);
                setReportText("");
                setReportTitle("");
                fetchDetail();
            } else {
                showDialog("Gagal", result.message || "Gagal mengirim laporan", "error");
            }
        } catch (err) {
            console.error("Report error:", err);
            if (err.name === 'TypeError' || err.message === 'Failed to fetch') {
                setIsServerDown(true);
            }
            showDialog("Error", "Terjadi kesalahan koneksi", "error");
        } finally {
            setIsSubmitting(false);
        }
    };


    const formatDate = (dateStr) => {
        const d = new Date(dateStr);
        return d.toLocaleDateString('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const formatTime = (dateStr) => {
        const d = new Date(dateStr);
        return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
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

    if (error || !schedule) {
        return (
            <div className={`min-h-screen flex flex-col items-center justify-center p-6 text-center ${darkMode ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-900"}`}>
                <h2 className="text-xl font-bold mb-2">{error || "Data tidak ditemukan"}</h2>
                <button
                    onClick={() => navigate(-1)}
                    className="mt-4 px-8 py-3 bg-sky-500 text-white rounded-2xl font-bold text-xs"
                >
                    Kembali
                </button>
            </div>
        );
    }

    return (
        <div className={`min-h-screen pb-40 transition-colors duration-300 ${darkMode ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-900"}`}>

            <AnimatePresence>
                {showAbsenModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAbsenModal(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className={`relative w-full max-w-sm rounded-[2rem] p-8 shadow-2xl ${darkMode ? "bg-slate-900 border border-slate-800" : "bg-white border border-slate-100"}`}>
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-black">Pilih Kehadiran</h3>
                                <button onClick={() => setShowAbsenModal(false)} className="p-2 text-slate-400 hover:text-red-500 transition-colors"><X size={20} /></button>
                            </div>
                            <div className="grid grid-cols-1 gap-3">
                                {[
                                    { label: "Hadir", status: "hadir", icon: CheckCircle2, color: "emerald", desc: "Saya hadir di lokasi latihan" },
                                    { label: "Sakit", status: "sakit", icon: AlertCircle, color: "amber", desc: "Saya tidak hadir karena sakit" },
                                    { label: "Izin", status: "izin", icon: MessageSquare, color: "indigo", desc: "Saya ada keperluan mendesak" }
                                ].map((opt) => (
                                    <button
                                        key={opt.status}
                                        onClick={() => setSelectedAbsenStatus(opt.status)}
                                        className={`flex items-center gap-4 p-5 rounded-3xl border transition-all relative overflow-hidden ${selectedAbsenStatus === opt.status
                                            ? (opt.status === "hadir" ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-500/10"
                                                : opt.status === "sakit" ? "border-amber-500 bg-amber-50/50 dark:bg-amber-500/10"
                                                    : "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-500/10")
                                            : (darkMode ? "bg-slate-800/40 border-slate-700" : "bg-slate-50 border-slate-100")
                                            }`}
                                    >
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${selectedAbsenStatus === opt.status
                                            ? (opt.status === "hadir" ? "bg-emerald-500 text-white"
                                                : opt.status === "sakit" ? "bg-amber-500 text-white"
                                                    : "bg-indigo-500 text-white")
                                            : (darkMode ? "bg-slate-700 text-slate-400" : "bg-white text-slate-400")
                                            }`}>
                                            <opt.icon size={24} />
                                        </div>
                                        <div className="text-left flex-1">
                                            <p className={`font-black text-sm tracking-tight ${selectedAbsenStatus === opt.status
                                                ? (opt.status === "hadir" ? "text-emerald-600 dark:text-emerald-400"
                                                    : opt.status === "sakit" ? "text-amber-600 dark:text-amber-400"
                                                        : "text-indigo-600 dark:text-indigo-400")
                                                : (darkMode ? "text-slate-400" : "text-slate-500")
                                                }`}>{opt.label}</p>
                                            <p className={`text-[10px] font-medium opacity-60`}>{opt.desc}</p>
                                        </div>
                                        {selectedAbsenStatus === opt.status && (
                                            <motion.div
                                                layoutId="selected-check"
                                                className={`absolute right-4 w-6 h-6 rounded-full flex items-center justify-center ${opt.status === "hadir" ? "bg-emerald-500" : opt.status === "sakit" ? "bg-amber-500" : "bg-indigo-500"} text-white shadow-lg`}
                                            >
                                                <CheckCircle2 size={14} />
                                            </motion.div>
                                        )}
                                    </button>
                                ))}
                            </div>
                            <div className="mt-8">
                                <SliderButton
                                    onConfirm={() => handleAttendance(selectedAbsenStatus)}
                                    isLoading={isSubmitting}
                                    disabled={!selectedAbsenStatus}
                                    darkMode={darkMode}
                                />
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showReportModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowReportModal(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className={`relative w-full max-w-sm rounded-[2rem] p-8 shadow-2xl ${darkMode ? "bg-slate-900 border border-slate-800" : "bg-white border border-slate-100"}`}>
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold">Laporan Latihan</h3>
                                <button onClick={() => setShowReportModal(false)} className="p-2 text-slate-400 hover:text-red-500 transition-colors"><X size={20} /></button>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-[11px] font-bold text-slate-400 mb-2">Judul Laporan</p>
                                    <input
                                        type="text"
                                        value={reportTitle}
                                        onChange={(e) => setReportTitle(e.target.value)}
                                        className={`w-full p-4 rounded-xl bg-transparent outline-none text-sm border transition-all ${darkMode ? "border-slate-800 bg-slate-800/50 focus:border-sky-500" : "border-slate-100 bg-slate-50 focus:border-sky-500"}`}
                                        placeholder="Contoh: Hasil Latihan Hari Ini"
                                    />
                                </div>
                                <div>
                                    <p className="text-[11px] font-bold text-slate-400 mb-2">Isi Laporan</p>
                                    <textarea
                                        value={reportText}
                                        onChange={(e) => setReportText(e.target.value)}
                                        className={`w-full p-4 rounded-xl bg-transparent outline-none text-sm min-h-[120px] border transition-all ${darkMode ? "border-slate-800 bg-slate-800/50 focus:border-sky-500" : "border-slate-100 bg-slate-50 focus:border-sky-500"}`}
                                        placeholder="Ceritakan apa saja yang kamu lakukan..."
                                    />
                                </div>
                            </div>
                            <button
                                onClick={handleReport}
                                disabled={isSubmitting || !reportText.trim() || !reportTitle.trim()}
                                className={`w-full mt-8 py-4.5 rounded-2xl flex items-center justify-center gap-3 font-bold text-sm transition-all active:scale-95 ${!reportText.trim() || !reportTitle.trim() ? "bg-slate-100 text-slate-300" : "bg-sky-500 text-white shadow-lg shadow-sky-500/40"}`}
                            >
                                {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                                Kirim Laporan
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <div className="relative h-[40vh] w-full overflow-hidden">
                <img
                    src={getFullImageUrl(schedule.extracurricular?.imageUrl)}
                    alt={schedule.title}
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
                    <div className="flex items-center gap-2 mb-2">
                        <span className={`px-3 py-1 text-[10px] font-bold rounded-full ${darkMode ? "bg-slate-800 text-sky-400" : "bg-sky-50 text-sky-600"}`}>
                            {schedule.extracurricular?.name}
                        </span>
                    </div>
                    <h1 className="text-3xl font-bold leading-tight tracking-tight">
                        {schedule.title}
                    </h1>
                </div>

                <div className="mb-10">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2 border-l-4 border-sky-500 pl-4">
                        Keterangan Kegiatan
                    </h2>
                    <p className={`text-sm leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                        {schedule.description}
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 mb-10">
                    <div className={`p-6 rounded-3xl border transition-all ${darkMode ? "bg-slate-800/50 border-slate-700" : "bg-slate-50 border-slate-100 hover:bg-slate-100"}`}>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 flex items-center justify-center text-sky-500 shrink-0">
                                <Calendar size={22} />
                            </div>
                            <div className="min-w-0">
                                <p className="text-[11px] font-bold text-slate-400 mb-1">Hari & Tanggal</p>
                                <p className="font-bold text-sm tracking-tight">{formatDate(schedule.scheduleDate)}</p>
                                <p className="text-xs text-sky-500 font-bold mt-1">{formatTime(schedule.scheduleDate)} WIB</p>
                            </div>
                        </div>
                    </div>

                    <div className={`p-6 rounded-3xl border transition-all ${darkMode ? "bg-slate-800/50 border-slate-700" : "bg-slate-50 border-slate-100 hover:bg-slate-100"}`}>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 flex items-center justify-center text-sky-500 shrink-0">
                                <MapPin size={22} />
                            </div>
                            <div className="min-w-0">
                                <p className="text-[11px] font-bold text-slate-400 mb-1">Lokasi Latihan</p>
                                <p className="font-bold text-sm tracking-tight">{schedule.location}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-12">
                    <button
                        onClick={() => {
                            if (isAttendanceExpired()) {
                                showDialog("Batas Waktu", "Batas waktu absen telah berakhir (maksimal 1 hari).", "error");
                                return;
                            }
                            setShowAbsenModal(true);
                        }}
                        disabled={schedule.isAbsent || isAttendanceExpired()}
                        className={`w-full flex items-center justify-between p-6 rounded-[2rem] border-2 transition-all active:scale-[0.98] ${schedule.isAbsent
                            ? schedule.absent === "sakit"
                                ? `${darkMode ? "bg-amber-500/20 border-amber-500/10 text-white" : "bg-amber-500/10 border-amber-100 text-amber-600"}`
                                : schedule.absent === "izin"
                                    ? `${darkMode ? "bg-indigo-500/20 border-indigo-500/10 text-white" : "bg-indigo-500/10 border-indigo-100 text-indigo-600"}`
                                    : `${darkMode ? "bg-emerald-500/20 border-emerald-500/10 text-white" : "bg-emerald-500/10 border-emerald-100 text-emerald-600"}`
                            : isAttendanceExpired()
                                ? `${darkMode ? "bg-red-500/20 border-red-500/10 text-white" : "bg-red-500/10 border-red-100 text-red-600"}`
                                : ` ${darkMode ? "bg-sky-500/10 border-sky-400/20 text-white" : "bg-sky-200/10 border-sky-400/10 text-black/90"}`
                            }`}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-2xl ${schedule.isAbsent
                                ? schedule.absent === "sakit"
                                    ? `${darkMode ? "bg-amber-500/20 text-amber-500" : "bg-amber-500/10 text-amber-500"}`
                                    : schedule.absent === "izin"
                                        ? `${darkMode ? "bg-indigo-500/20 text-indigo-500" : "bg-indigo-500/10 text-indigo-500"}`
                                        : `${darkMode ? "bg-emerald-500/20 text-emerald-500" : "bg-emerald-500/10 text-emerald-500"}`
                                : isAttendanceExpired()
                                    ? `text-white ${darkMode ? "bg-red-500/70 border-red-500/10" : "bg-red-500 border-red-100"}`
                                    : "bg-sky-500/10 text-sky-500"}`}>
                                {schedule.isAbsent ? (
                                    schedule.absent === "sakit" ? <AlertCircle size={24} /> :
                                        schedule.absent === "izin" ? <MessageSquare size={24} /> :
                                            <CheckCircle2 size={24} />
                                ) : isAttendanceExpired() ? <X size={24} /> : <AlertCircle size={24} />}
                            </div>
                            <div className="text-left">
                                <p className="font-bold text-sm tracking-tight">
                                    {schedule.isAbsent
                                        ? schedule.absent === "sakit" ? "Sedang Sakit" :
                                            schedule.absent === "izin" ? "Izin Absen" :
                                                "Sudah Absen"
                                        : isAttendanceExpired() ? "Waktu Habis" : "Konfirmasi Hadir"}
                                </p>
                                <p className={`text-[12px] font-medium opacity-80 mt-0.5`}>
                                    {schedule.isAbsent
                                        ? schedule.absent === "sakit" ? "Kamu terdaftar sakit hari ini" :
                                            schedule.absent === "izin" ? "Kamu terdaftar izin hari ini" :
                                                "Status kehadiran kamu tercatat"
                                        : isAttendanceExpired() ? "Batas waktu absen terlewati" : "Klik untuk pilih status kehadiran"}
                                </p>
                            </div>
                        </div>
                        {!schedule.isAbsent && !isAttendanceExpired() && <ChevronRight size={20} />}
                    </button>
                </div>

                {/* Tab Selection */}
                <div className={`flex p-1.5 rounded-[1.8rem] mb-8 border border-transparent ${darkMode ? "bg-slate-800/40 " : "bg-slate-200/50"}`}>
                    <button
                        onClick={() => setActiveTab("info")}
                        className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-[1.4rem] text-xs font-bold transition-all ${activeTab === "info"
                            ? (darkMode ? "bg-slate-800 text-white shadow-lg" : "bg-white text-sky-600 shadow-sm")
                            : "text-slate-400 hover:text-slate-600"
                            }`}
                    >
                        <ClipboardList size={14} /> Aktivitas
                    </button>
                    <button
                        onClick={() => setActiveTab("reports")}
                        className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-[1.4rem] text-xs font-bold transition-all ${activeTab === "reports"
                            ? (darkMode ? "bg-slate-800 text-white shadow-lg" : "bg-white text-sky-600 shadow-sm")
                            : "text-slate-400 hover:text-slate-600"
                            }`}
                    >
                        <FileText size={14} /> Laporan
                    </button>
                    <button
                        onClick={() => setActiveTab("documentations")}
                        className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-[1.4rem] text-xs font-bold transition-all ${activeTab === "documentations"
                            ? (darkMode ? "bg-slate-800 text-white shadow-lg" : "bg-white text-sky-600 shadow-sm")
                            : "text-slate-400 hover:text-slate-600"
                            }`}
                    >
                        <ImageIcon size={14} /> Dokumentasi
                    </button>
                </div>

                <div className="min-h-[300px]">
                    {activeTab === "info" && (
                        <div className="space-y-6">
                            <div className={`p-8 rounded-[2.5rem] border ${darkMode ? "bg-slate-800/50 border-slate-700" : "bg-slate-50 border-slate-100"}`}>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-sky-500/10 flex items-center justify-center text-sky-500">
                                        <ClipboardList size={22} />
                                    </div>
                                    <h4 className="text-lg font-bold tracking-tight">Laporan Hasil Latihan</h4>
                                </div>
                                <p className={`text-sm mb-8 leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                                    {schedule.isReported
                                        ? "Laporan kamu sudah kami terima dengan baik. Terima kasih!"
                                        : "Tuliskan apa saja yang kamu pelajari atau alami selama latihan hari ini."}
                                </p>
                                <button
                                    onClick={() => {
                                        if (schedule.isReported) return;
                                        if (!schedule.isAbsent) {
                                            showDialog("Perhatian", "Silakan lakukan absen terlebih dahulu sebelum mengirim laporan.", "info");
                                            return;
                                        }
                                        if (schedule.absent !== "hadir") {
                                            showDialog("Akses Dibatasi", "Laporan hanya dapat dikirim jika status kehadiran Anda adalah 'Hadir'.", "error");
                                            return;
                                        }
                                        setShowReportModal(true);
                                    }}
                                    disabled={schedule.isReported}
                                    className={`w-full py-4 rounded-2xl font-bold text-sm transition-all active:scale-[0.98] ${schedule.isReported
                                        ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                                        : `${darkMode ? "bg-white text-slate-900 border border-slate-200" : "bg-white text-slate-900 border border-sky-300 shadow-md shadow-sky-300/10"}`
                                        }`}
                                >
                                    {schedule.isReported ? "Laporan Sudah Terkirim" : "Tulis Laporan Sekarang"}
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === "reports" && (
                        <div className="space-y-4">
                            {schedule.reports?.length > 0 ? (
                                schedule.reports.map((report) => (
                                    <div
                                        key={report.id}
                                        onClick={() => showDialog(report.reportTitle, report.reportText, "info")}
                                        className={`p-6 rounded-[2rem] border transition-all active:scale-[0.98] cursor-pointer ${darkMode ? "bg-slate-800/50 border-slate-700 hover:bg-slate-800" : "bg-white border-slate-100 shadow-sm hover:shadow-md"}`}
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm shrink-0">
                                                <img src={getFullImageUrl(report.member?.profile)} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h4 className="text-sm font-bold truncate text-sky-500">{report.reportTitle}</h4>
                                                <p className="text-[10px] font-bold text-slate-400">{report.member?.name}</p>
                                            </div>
                                        </div>
                                        <p className={`text-sm leading-relaxed break-words line-clamp-2 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                                            {report.reportText}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <div className="py-20 text-center text-slate-400 italic font-medium">Belum ada laporan terkumpul.</div>
                            )}
                        </div>
                    )}

                    {activeTab === "documentations" && (
                        <div className="space-y-6">
                            {schedule.documentations?.length > 0 ? (
                                schedule.documentations.map((doc) => (
                                    <div
                                        key={doc.id}
                                        onClick={() => {
                                            setSelectedDoc(doc);
                                            setShowDocDialog(true);
                                        }}
                                        className={`relative w-full aspect-[4/3] rounded-[2.5rem] overflow-hidden border-2 shadow-xl cursor-pointer group ${darkMode ? "bg-slate-800 border-sky-900/20 shadow-none" : "bg-slate-100 border-white shadow-slate-200/50"
                                            }`}
                                    >
                                        <img
                                            src={getFullImageUrl(doc.fileUrl)}
                                            alt={doc.documentationTitle}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-8 flex flex-col justify-end">
                                            <div className="flex items-center mb-2">
                                                <h4 className="text-lg font-bold text-white leading-tight">{doc.documentationTitle}</h4>
                                            </div>
                                            <div className="flex items-center gap-2 text-white/60">
                                                <div className="w-5 h-5 rounded-full overflow-hidden border border-white/20">
                                                    <img src={getFullImageUrl(doc.uploadedBy?.profile)} className="w-full h-full object-cover" alt="" />
                                                </div>
                                                <p className="text-xs font-bold">Oleh: {doc.uploadedBy?.name}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="py-20 text-center text-slate-400 italic font-medium">Dokumentasi masih kosong.</div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <CustomDialog
                isOpen={dialog.isOpen}
                onClose={() => setDialog({ ...dialog, isOpen: false })}
                onConfirm={dialog.onConfirm}
                title={dialog.title}
                message={dialog.message}
                type={dialog.type}
                darkMode={darkMode}
            />

            <AnimatePresence>
                {showDocDialog && selectedDoc && (
                    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowDocDialog(false)}
                            className={`absolute inset-0 backdrop-blur-xl transition-colors ${darkMode ? "bg-black/95" : "bg-black/60"}`}
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="relative w-full max-w-lg flex flex-col items-center"
                        >
                            <button
                                onClick={() => setShowDocDialog(false)}
                                className={`absolute -top-16 right-0 w-12 h-12 rounded-full flex items-center justify-center transition-all ${darkMode ? "bg-white/10 hover:bg-white/20 text-white" : "bg-white/20 hover:bg-white/40 text-white"
                                    }`}
                            >
                                <X size={24} />
                            </button>

                            <div className={`w-full rounded-[2.5rem] overflow-hidden shadow-2xl border transition-colors ${darkMode ? "bg-slate-900 border-white/10" : "bg-white border-slate-100/10"
                                }`}>
                                <img
                                    src={getFullImageUrl(selectedDoc.fileUrl)}
                                    alt={selectedDoc.documentationTitle}
                                    className="w-full h-auto max-h-[70vh] object-contain bg-black/5"
                                />
                                <div className={`p-8 backdrop-blur-md border-t transition-colors ${darkMode ? "bg-slate-900/50 border-white/5" : "bg-slate-50/90 border-slate-100"
                                    }`}>
                                    <h3 className={`text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-slate-900"}`}>{selectedDoc.documentationTitle}</h3>
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-full overflow-hidden border ${darkMode ? "border-white/20" : "border-slate-200"
                                            }`}>
                                            <img src={getFullImageUrl(selectedDoc.uploadedBy?.profile)} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <p className={`text-[10px] font-medium tracking-widest ${darkMode ? "text-slate-500" : "text-slate-400"}`}>Diupload Oleh</p>
                                            <p className={`text-sm font-bold ${darkMode ? "text-white" : "text-slate-900"}`}>{selectedDoc.uploadedBy?.name}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default JadwalDetail;
