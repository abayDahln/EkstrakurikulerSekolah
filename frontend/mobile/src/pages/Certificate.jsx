import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Download,
    Eye,
    Trophy,
    Calendar,
    Award,
    X,
    Loader2,
    ArrowLeft,
    Inbox
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import sessionManager, { getFullImageUrl } from "../utils/utils.jsx";
import config from "../config/config.js";
import { useConnection, fetchWithTimeout } from "../utils/connectionContext.jsx";
import mockData from "../utils/mockData.js";

const Certificate = ({ darkMode }) => {
    const navigate = useNavigate();
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCert, setSelectedCert] = useState(null);
    const [isDownloading, setIsDownloading] = useState(null);
    const { setIsServerDown } = useConnection();

    const fetchCertificates = async () => {
        if (sessionManager.isDemoMode()) {
            const demoCerts = mockData.certificates.filter(c =>
                c.certificateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                c.extracurricularName.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setCertificates(demoCerts);
            setLoading(false);
            return;
        }

        try {
            const token = sessionManager.getToken();
            const response = await fetchWithTimeout(`${config.API_URL}/certificate?search=${searchQuery}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "accept": "*/*"
                },
                timeout: 10000
            });

            if (response.ok) {
                const result = await response.json();
                setCertificates(result.data || []);
            } else if (response.status === 500) {
                setIsServerDown(true);
            }
        } catch (error) {
            console.error("Error fetching certificates:", error);
            if (error.name === 'TypeError' || error.message === 'Failed to fetch') {
                setIsServerDown(true);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            fetchCertificates();
        }, 300);
        return () => clearTimeout(delaySearch);
    }, [searchQuery]);

    const handleDownload = async (id, fileName) => {
        setIsDownloading(id);

        if (sessionManager.isDemoMode()) {
            setTimeout(() => {
                alert("Demo Mode: Simulasi download sertifikat berhasil!");
                setIsDownloading(null);
            }, 1500);
            return;
        }

        try {
            const token = sessionManager.getToken();
            const response = await fetchWithTimeout(`${config.API_URL}/certificate/download/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "accept": "*/*"
                },
                timeout: 10000
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = fileName || `sertifikat-${id}.png`;
                document.body.appendChild(link);
                link.click();
                link.remove();
            } else if (response.status === 500) {
                setIsServerDown(true);
            }
        } catch (error) {
            console.error("Download error:", error);
            if (error.name === 'TypeError' || error.message === 'Failed to fetch') {
                setIsServerDown(true);
            }
        } finally {
            setIsDownloading(null);
        }
    };

    const formatDate = (dateStr) => {
        const d = new Date(dateStr);
        return d.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <div className={`min-h-screen pb-32 transition-colors duration-300 ${darkMode ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-900"}`}>

            <div className={`px-6 pt-12 pb-6 rounded-b-[3rem] shadow-sm transition-colors ${darkMode ? "bg-slate-800" : "bg-white"}`}>
                <div className="flex items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Koleksi Sertifikat</h1>
                        <p className={`text-xs font-medium ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
                            Simpan dan pamerkan pencapaianmu
                        </p>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                        <Search size={18} className={darkMode ? "text-slate-500" : "text-slate-400"} />
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari sertifikat..."
                        className={`w-full pl-12 pr-4 py-4 rounded-4xl border-2 transition-all outline-none ${darkMode
                            ? "bg-slate-700/30 border-slate-700 text-white focus:border-sky-500"
                            : "bg-slate-50 border-slate-100 text-slate-900 focus:border-sky-500"
                            }`}
                    />
                </div>
            </div>

            <div className="px-6 mt-8">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 opacity-50">
                        <Loader2 size={40} className="animate-spin text-sky-500 mb-4" />
                        <p className="text-sm font-bold">Memuat Koleksi...</p>
                    </div>
                ) : certificates.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6">
                        {certificates.map((cert, idx) => (
                            <motion.div
                                key={cert.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className={`rounded-[2.5rem] overflow-hidden border transition-all hover:shadow-2xl ${darkMode ? "bg-slate-800/80 border-slate-800" : "bg-white border-white shadow-xl shadow-slate-200/40"
                                    }`}
                            >
                                <div
                                    className="h-48 relative group cursor-pointer overflow-hidden"
                                    onClick={() => setSelectedCert(cert)}
                                >
                                    <img
                                        src={getFullImageUrl(cert.certificateUrl)}
                                        alt={cert.certificateName}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                                            <Eye size={24} />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-4 left-4">
                                        <div className="px-3 py-1 bg-amber-500/90 backdrop-blur-md rounded-full text-[10px] font-black text-white shadow-lg flex items-center gap-1.5">
                                            <Trophy size={10} />
                                            {cert.extracurricularName}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="font-bold text-lg mb-4 leading-tight">
                                        {cert.certificateName}
                                    </h3>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg ${darkMode ? "bg-slate-700 text-slate-400" : "bg-slate-50 text-slate-400"}`}>
                                                <Calendar size={14} />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Tanggal Terbit</p>
                                                <p className="text-xs font-bold truncate">{formatDate(cert.issuedAt)}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg ${darkMode ? "bg-slate-700 text-slate-400" : "bg-slate-50 text-slate-400"}`}>
                                                <Award size={14} />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Penerima</p>
                                                <p className="text-xs font-bold truncate">{cert.userName}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleDownload(cert.id, cert.certificateName)}
                                        disabled={isDownloading === cert.id}
                                        className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-3 transition-all active:scale-[0.98] ${darkMode
                                            ? "bg-sky-500 text-white shadow-lg shadow-sky-500/10"
                                            : "bg-sky-500 text-white shadow-lg shadow-sky-500/30"
                                            } disabled:opacity-50`}
                                    >
                                        {isDownloading === cert.id ? (
                                            <Loader2 size={18} className="animate-spin" />
                                        ) : (
                                            <Download size={18} />
                                        )}
                                        Download Sertifikat
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center mb-6 ${darkMode ? "bg-slate-800" : "bg-slate-100"}`}>
                            <Inbox size={32} className="text-slate-300" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Belum Ada Sertifikat</h3>
                        <p className={`text-sm px-10 ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
                            Ikuti berbagai kegiatan ekstrakurikuler untuk mendapatkan sertifikat penghargaan.
                        </p>
                    </div>
                )}
            </div>

            <AnimatePresence>
                {selectedCert && (
                    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedCert(null)}
                            className="absolute inset-0 bg-black/95 backdrop-blur-xl"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="relative w-full max-w-lg flex flex-col items-center"
                        >
                            <button
                                onClick={() => setSelectedCert(null)}
                                className="absolute -top-16 right-0 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
                            >
                                <X size={24} />
                            </button>

                            <div className={`w-full rounded-[2.5rem] overflow-hidden shadow-2xl border ${darkMode ? "bg-slate-900 border-white/10" : "bg-white border-slate-100"}`}>
                                <img
                                    src={getFullImageUrl(selectedCert.certificateUrl)}
                                    alt={selectedCert.certificateName}
                                    className="w-full h-auto max-h-[70vh] object-contain"
                                />
                                <div className={`p-8 border-t ${darkMode ? "bg-slate-900 border-white/5" : "bg-slate-50 border-slate-100"}`}>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-black tracking-widest ${darkMode ? "bg-slate-800 text-sky-400" : "bg-sky-50 text-sky-600"}`}>
                                            {selectedCert.extracurricularName}
                                        </span>
                                    </div>
                                    <h3 className={`text-xl font-bold ${darkMode ? "text-white" : "text-slate-900"}`}>
                                        {selectedCert.certificateName}
                                    </h3>
                                    <p className={`text-xs mt-2 font-medium ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
                                        Diterbitkan pada {formatDate(selectedCert.issuedAt)}
                                    </p>

                                    <button
                                        onClick={() => handleDownload(selectedCert.id, selectedCert.certificateName)}
                                        disabled={isDownloading === selectedCert.id}
                                        className="w-full mt-8 py-4 bg-sky-500 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-3 shadow-lg shadow-sky-500/30"
                                    >
                                        {isDownloading === selectedCert.id ? (
                                            <Loader2 size={18} className="animate-spin" />
                                        ) : (
                                            <Download size={18} />
                                        )}
                                        Download File
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Certificate;
