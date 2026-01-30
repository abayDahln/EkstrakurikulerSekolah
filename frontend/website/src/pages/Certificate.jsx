import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiSearch,
    FiAward,
    FiDownload,
    FiEye,
    FiCalendar,
    FiUser,
    FiX,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import config from "../config/config";
import { fetchWithAuth } from "../utils/utils";
import { useConnection } from "../context/ConnectionContext";

const SkeletonCertificate = ({ darkMode }) => (
    <div
        className={`rounded-2xl shadow-lg p-5 ${darkMode ? "bg-slate-800" : "bg-white"
            }`}
    >
        <div
            className={`w-full aspect-video rounded-xl animate-pulse mb-4 ${darkMode ? "bg-slate-700" : "bg-slate-200"
                }`}
        />
        <div className="space-y-3">
            <div
                className={`h-6 w-3/4 rounded animate-pulse ${darkMode ? "bg-slate-700" : "bg-slate-200"
                    }`}
            />
            <div className="flex items-center gap-2">
                <div
                    className={`w-8 h-8 rounded-full animate-pulse ${darkMode ? "bg-slate-700" : "bg-slate-200"
                        }`}
                />
                <div
                    className={`h-4 w-1/3 rounded animate-pulse ${darkMode ? "bg-slate-700" : "bg-slate-200"
                        }`}
                />
            </div>
        </div>
    </div>
);

const AnimatedWrapper = ({ children, delay = 0, isInitialLoad }) => {
    if (!isInitialLoad) return children;

    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay }}
        >
            {children}
        </motion.div>
    );
};

const CreateCertificateModal = ({
    darkMode,
    isOpen,
    onClose,
    onSuccess,
    memberList,
    API_URL,
}) => {
    const [formData, setFormData] = useState({
        name: "",
        memberId: "",
    });
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setFormData({ name: "", memberId: "" });
            setImage(null);
            setPreview(null);
            setError("");
        }
    }, [isOpen]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setError("Ukuran file maksimal 5MB");
                return;
            }
            setImage(file);
            setPreview(URL.createObjectURL(file));
            setError("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image) {
            setError("Pilih gambar sertifikat terlebih dahulu");
            return;
        }
        if (!formData.memberId) {
            setError("Pilih anggota terlebih dahulu");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const postData = new FormData();
            postData.append("image", image);
            postData.append("name", formData.name);
            postData.append("memberId", formData.memberId);

            const response = await fetchWithAuth(`${API_URL}/api/pembina/certificate`, {
                method: "POST",
                body: postData,
            });

            const result = await response.json();
            if (response.ok) {
                alert("Sertifikat berhasil diterbitkan!");
                onSuccess();
                onClose();
            } else {
                setError(result.message || "Gagal menerbitkan sertifikat");
            }
        } catch (err) {
            console.error("Error:", err);
            setError("Terjadi kesalahan saat menghubungi server");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className={`w-full max-w-xl rounded-2xl shadow-2xl my-auto ${darkMode ? "bg-slate-800" : "bg-white"
                    }`}
            >
                <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
                    <h2 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-slate-900"}`}>
                        Terbitkan Sertifikat Baru
                    </h2>
                    <button onClick={onClose} className={`p-2 rounded-lg ${darkMode ? "hover:bg-slate-700" : "hover:bg-slate-100"}`}>
                        <FiX className={`text-xl ${darkMode ? "text-white" : "text-slate-900"}`} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {error && (
                        <div className={`p-3 rounded-lg text-sm ${darkMode ? "bg-red-900/50 text-red-200 border border-red-700" : "bg-red-100 text-red-700 border border-red-300"}`}>
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className={`aspect-video rounded-xl border-2 border-dashed cursor-pointer overflow-hidden flex flex-col items-center justify-center transition-all ${preview ? "border-sky-500" : darkMode ? "border-slate-700 hover:border-slate-600 bg-slate-700/30" : "border-slate-200 hover:border-slate-300 bg-slate-50"}`}
                        >
                            {preview ? (
                                <img src={preview} alt="Preview" className="w-full h-full object-contain" />
                            ) : (
                                <div className="text-center p-6">
                                    <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center ${darkMode ? "bg-slate-700 text-slate-400" : "bg-slate-200 text-slate-500"}`}>
                                        <FiEye className="text-2xl" />
                                    </div>
                                    <p className={`font-semibold ${darkMode ? "text-slate-300" : "text-slate-600"}`}>Klik untuk upload gambar sertifikat</p>
                                    <p className={`text-xs mt-1 ${darkMode ? "text-slate-500" : "text-slate-400"}`}>Format PNG/JPG, maksimal 5MB</p>
                                </div>
                            )}
                            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                        </div>

                        <div>
                            <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
                                Nama Sertifikat / Penghargaan
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className={`w-full p-3 rounded-xl border-2 transition-all ${darkMode ? "bg-slate-700 border-slate-600 text-white" : "bg-white border-slate-200"} focus:outline-none focus:ring-4 ${darkMode ? "focus:ring-sky-900/50" : "focus:ring-sky-100"} focus:border-sky-500`}
                                required
                                placeholder="Contoh: Juara 1 Lomba Basket, Peserta Aktif, dll."
                            />
                        </div>

                        <div>
                            <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
                                Pilih Penerima (Anggota)
                            </label>
                            <select
                                value={formData.memberId}
                                onChange={(e) => setFormData({ ...formData, memberId: e.target.value })}
                                className={`w-full p-3 rounded-xl border-2 transition-all ${darkMode ? "bg-slate-700 border-slate-600 text-white" : "bg-white border-slate-200"} focus:outline-none focus:ring-4 ${darkMode ? "focus:ring-sky-900/50" : "focus:ring-sky-100"} focus:border-sky-500`}
                                required
                            >
                                <option value="">Pilih Anggota</option>
                                {memberList.map((member) => (
                                    <option key={member.memberId || member.id} value={member.memberId || member.id}>
                                        {member.name} ({member.extracurricular?.name || "Ekstrakurikuler"})
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className={`flex-1 py-3 rounded-xl font-semibold transition-all ${darkMode ? "bg-slate-700 hover:bg-slate-600 text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-700"} ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`flex-1 py-3 rounded-xl font-semibold text-white transition-all ${loading ? "bg-slate-600 cursor-not-allowed" : "bg-gradient-to-r from-sky-500 to-cyan-500 hover:shadow-lg transform hover:-translate-y-0.5"}`}
                        >
                            {loading ? "Menerbitkan..." : "Terbitkan Sertifikat"}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

const Certificate = ({ darkMode }) => {
    const [certificates, setCertificates] = useState([]);
    const [filteredCertificates, setFilteredCertificates] = useState([]);
    const [memberList, setMemberList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const { isServerDown, setIsServerDown } = useConnection();
    const [viewImageModal, setViewImageModal] = useState(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const navigate = useNavigate();
    const API_URL = config.BASE_URL;
    const intervalRef = useRef(null);

    const fetchCertificates = async () => {
        try {
            const response = await fetchWithAuth(`${API_URL}/api/pembina/certificate`);

            if (!response.ok) {
                throw new Error("Failed to fetch certificates");
            }

            const result = await response.json();
            if (result.status === 200) {
                setCertificates(result.data);
                setIsServerDown(false);
            }
        } catch (error) {
            console.error("Error fetching certificates:", error);
            setIsServerDown(true);
        } finally {
            setIsLoading(false);
            if (isInitialLoad) {
                setIsInitialLoad(false);
            }
        }
    };

    const fetchMembers = async () => {
        try {
            const response = await fetchWithAuth(`${API_URL}/api/pembina/member`);
            if (response.ok) {
                const result = await response.json();
                if (result.status === 200) {
                    setMemberList(result.data);
                }
            }
        } catch (err) {
            console.error("Error fetching members:", err);
            setIsServerDown(true);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        fetchCertificates();
        fetchMembers();

        const handleRetry = () => {
            fetchCertificates();
            fetchMembers();
        };

        window.addEventListener("retry-connection", handleRetry);

        intervalRef.current = setInterval(() => {
            fetchCertificates();
            fetchMembers();
        }, 60000);
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            window.removeEventListener("retry-connection", handleRetry);
        };
    }, []);

    useEffect(() => {
        const filtered = certificates.filter(
            (cert) =>
                cert.certificateName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                cert.member?.name?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredCertificates(filtered);
    }, [searchQuery, certificates]);

    const handleDownload = async (id, filename) => {
        try {
            const response = await fetchWithAuth(`${API_URL}/api/certificate/download/${id}`);

            if (!response.ok) throw new Error("Gagal mengunduh sertifikat");


            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            const cleanFilename = filename
                ? (filename.toLowerCase().endsWith(".png") || filename.toLowerCase().endsWith(".jpg") ? filename : `${filename}.png`)
                : "sertifikat.png";

            link.download = cleanFilename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setTimeout(() => window.URL.revokeObjectURL(url), 100);
        } catch (error) {
            console.error("Download error:", error);
            alert("Gagal mengunduh sertifikat");
        }
    };

    return (
        <div className="p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1
                        className={`text-3xl font-bold mb-2 flex items-center gap-3 ${darkMode ? "text-white" : "text-slate-900"
                            }`}
                    >
                        Daftar Sertifikat
                    </h1>
                    <p className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                        Kelola dan pantau sertifikat yang telah diterbitkan untuk anggota.
                    </p>
                </div>

                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-sky-500 to-cyan-500 hover:shadow-lg transform hover:-translate-y-0.5 transition-all w-fit"
                >
                    <FiAward className="text-xl" />
                    Buat Sertifikat
                </button>
            </div>

            <div className="mb-8 max-w-md relative">
                <FiSearch
                    className={`absolute left-4 top-1/2 -translate-y-1/2 text-xl ${darkMode ? "text-slate-400" : "text-slate-500"
                        }`}
                />
                <input
                    type="text"
                    placeholder="Cari nama sertifikat atau anggota..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all ${darkMode
                        ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500"
                        : "bg-white border-slate-200 text-slate-900 placeholder-slate-400"
                        } focus:outline-none focus:ring-4 ${darkMode ? "focus:ring-sky-900/50" : "focus:ring-sky-100"
                        } focus:border-sky-500`}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                    <>
                        <SkeletonCertificate darkMode={darkMode} />
                        <SkeletonCertificate darkMode={darkMode} />
                        <SkeletonCertificate darkMode={darkMode} />
                    </>
                ) : filteredCertificates.length === 0 ? (
                    <div className="col-span-full text-center py-20">
                        <div
                            className={`text-6xl mb-4 ${darkMode ? "text-slate-700" : "text-slate-200"
                                }`}
                        >
                            📜
                        </div>
                        <h3
                            className={`text-xl font-bold mb-2 ${darkMode ? "text-slate-300" : "text-slate-600"
                                }`}
                        >
                            {searchQuery
                                ? "Sertifikat tidak ditemukan"
                                : "Belum ada sertifikat"}
                        </h3>
                        <p className={darkMode ? "text-slate-500" : "text-slate-400"}>
                            {searchQuery
                                ? "Coba gunakan kata kunci pencarian lain"
                                : "Sertifikat yang telah diterbitkan akan muncul di sini"}
                        </p>
                    </div>
                ) : (
                    filteredCertificates.map((cert, index) => (
                        <AnimatedWrapper key={cert.id} delay={index * 0.1} isInitialLoad={isInitialLoad}>
                            <motion.div
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`group rounded-2xl shadow-lg overflow-hidden transition-all hover:shadow-2xl ${darkMode ? "bg-slate-800" : "bg-white"
                                    }`}
                            >
                                <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-900">
                                    <img
                                        src={`${API_URL}/${cert.certificateUrl}`}
                                        alt={cert.certificateName}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        onError={(e) => {
                                            e.target.src = "https://placehold.co/600x400/0ea5e9/ffffff?text=Sertifikat";
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                        <button
                                            onClick={() => setViewImageModal(cert)}
                                            className="p-3 rounded-full bg-white text-slate-900 hover:bg-sky-500 hover:text-white transition-colors"
                                            title="Lihat"
                                        >
                                            <FiEye className="text-xl" />
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDownload(cert.id, cert.certificateName)
                                            }
                                            className="p-3 rounded-full bg-white text-slate-900 hover:bg-sky-500 hover:text-white transition-colors"
                                            title="Download"
                                        >
                                            <FiDownload className="text-xl" />
                                        </button>
                                    </div>
                                </div>

                                <div className="p-5">
                                    <h3
                                        className={`text-lg font-bold mb-3 line-clamp-1 ${darkMode ? "text-white" : "text-slate-900"
                                            }`}
                                    >
                                        {cert.certificateName}
                                    </h3>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <img
                                                src={cert.member?.profileUrl ? `${API_URL}/${cert.member.profileUrl}` : `https://ui-avatars.com/api/?name=${encodeURIComponent(cert.member?.name || "Member")}&background=0ea5e9&color=fff`}
                                                alt={cert.member?.name || "Member"}
                                                className="w-8 h-8 rounded-full object-cover border-2 border-sky-500"
                                                onError={(e) => {
                                                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                        cert.member?.name || "Member"
                                                    )}&background=0ea5e9&color=fff`;
                                                }}
                                            />
                                            <div className="flex flex-col">
                                                <span
                                                    className={`text-sm font-semibold truncate ${darkMode ? "text-slate-200" : "text-slate-700"
                                                        }`}
                                                >
                                                    {cert.member?.name || "Unknown Member"}
                                                </span>
                                                <span
                                                    className={`text-xs ${darkMode ? "text-slate-400" : "text-slate-500"
                                                        }`}
                                                >
                                                    {new Date(cert.issuedAt).toLocaleDateString("id-ID", {
                                                        day: "numeric",
                                                        month: "short",
                                                        year: "numeric",
                                                    })}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatedWrapper>
                    ))
                )}
            </div>

            <AnimatePresence>
                {viewImageModal && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="relative max-w-4xl w-full"
                        >
                            <button
                                onClick={() => setViewImageModal(null)}
                                className="absolute -top-12 right-0 p-2 text-white hover:text-sky-400 transition-colors"
                            >
                                <FiX className="text-3xl" />
                            </button>
                            <img
                                src={`${API_URL}/${viewImageModal.certificateUrl}`}
                                alt={viewImageModal.certificateName}
                                className="w-full h-auto rounded-xl shadow-2xl"
                                onError={(e) => {
                                    e.target.src = "https://placehold.co/1200x800/0ea5e9/ffffff?text=Sertifikat";
                                }}
                            />
                            <div className="mt-4 flex items-center justify-between text-white">
                                <div>
                                    <h4 className="text-xl font-bold">{viewImageModal.certificateName}</h4>
                                    <p className="text-slate-400">Diberikan kepada: {viewImageModal.member.name}</p>
                                </div>
                                <button
                                    onClick={() =>
                                        handleDownload(
                                            viewImageModal.id,
                                            viewImageModal.certificateName
                                        )
                                    }
                                    className="flex items-center gap-2 px-6 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 transition-colors font-semibold"
                                >
                                    <FiDownload />
                                    Download PNG
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isCreateModalOpen && (
                    <CreateCertificateModal
                        darkMode={darkMode}
                        isOpen={isCreateModalOpen}
                        onClose={() => setIsCreateModalOpen(false)}
                        onSuccess={fetchCertificates}
                        memberList={memberList}
                        API_URL={API_URL}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default Certificate;
