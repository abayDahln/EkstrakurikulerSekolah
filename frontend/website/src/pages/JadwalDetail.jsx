import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import config from "../config/config";
import { fetchWithAuth } from "../utils/utils";
import { useConnection } from "../context/ConnectionContext";
import {
    FiClock,
    FiMapPin,
    FiUser,
    FiUpload,
    FiX,
    FiCheck,
    FiImage,
    FiCalendar,
} from "react-icons/fi";

const SkeletonDetail = ({ darkMode }) => (
    <div className="space-y-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2 space-y-6">
                <div
                    className={`rounded-2xl p-6 ${darkMode ? "bg-slate-800" : "bg-white"
                        } shadow-lg`}
                >
                    <div className="flex items-start gap-4 mb-6">
                        <div
                            className={`w-20 h-20 rounded-xl animate-pulse ${darkMode ? "bg-slate-700" : "bg-slate-200"
                                }`}
                        />
                        <div className="flex-1 space-y-3">
                            <div
                                className={`h-8 w-2/3 rounded animate-pulse ${darkMode ? "bg-slate-700" : "bg-slate-200"
                                    }`}
                            />
                            <div
                                className={`h-4 w-1/3 rounded animate-pulse ${darkMode ? "bg-slate-700" : "bg-slate-200"
                                    }`}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div
                            className={`h-4 w-full rounded animate-pulse ${darkMode ? "bg-slate-700" : "bg-slate-200"
                                }`}
                        />
                        <div
                            className={`h-4 w-5/6 rounded animate-pulse ${darkMode ? "bg-slate-700" : "bg-slate-200"
                                }`}
                        />
                    </div>
                </div>

                <div
                    className={`rounded-2xl p-6 ${darkMode ? "bg-slate-800" : "bg-white"
                        } shadow-lg`}
                >
                    <div
                        className={`h-6 w-40 mb-4 rounded animate-pulse ${darkMode ? "bg-slate-700" : "bg-slate-200"
                            }`}
                    />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Array(4)
                            .fill(0)
                            .map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-24 rounded-xl animate-pulse ${darkMode ? "bg-slate-700" : "bg-slate-200"
                                        }`}
                                />
                            ))}
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div
                    className={`rounded-2xl p-6 ${darkMode ? "bg-slate-800" : "bg-white"
                        } shadow-lg`}
                >
                    <div
                        className={`h-6 w-32 mb-4 rounded animate-pulse ${darkMode ? "bg-slate-700" : "bg-slate-200"
                            }`}
                    />
                    <div
                        className={`h-48 rounded-xl animate-pulse ${darkMode ? "bg-slate-700" : "bg-slate-200"
                            }`}
                    />
                </div>
            </div>
        </div>
    </div>
);

const JadwalDetail = ({ darkMode }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [scheduleDetail, setScheduleDetail] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { setIsServerDown } = useConnection();
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState("");
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [documentationTitle, setDocumentationTitle] = useState("");
    const [viewImageModal, setViewImageModal] = useState(null);
    const [viewReportModal, setViewReportModal] = useState(null);
    const [memberSearchQuery, setMemberSearchQuery] = useState("");
    const fileInputRef = useRef(null);
    const intervalRef = useRef(null);

    const API_URL = config.BASE_URL;

    const hasDocumentation = scheduleDetail?.documentatioData && scheduleDetail.documentatioData.length > 0;

    const getScheduleStatus = () => {
        if (!scheduleDetail?.schedule?.scheduleDate) return null;

        const now = new Date();
        const scheduleDate = new Date(scheduleDetail.schedule.scheduleDate);

        const nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const scheduleDateOnly = new Date(
            scheduleDate.getFullYear(),
            scheduleDate.getMonth(),
            scheduleDate.getDate()
        );

        if (nowDate > scheduleDateOnly) {
            return { status: "selesai", label: "Selesai", color: "green" };
        } else if (nowDate < scheduleDateOnly) {
            return { status: "belum_mulai", label: "Belum Dimulai", color: "blue" };
        } else {
            // Same day
            const scheduleTime = scheduleDate.toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
            });
            if (now < scheduleDate) {
                return {
                    status: "hari_ini",
                    label: `Dimulai pukul ${scheduleTime}`,
                    color: "yellow",
                };
            } else {
                return { status: "berlangsung", label: "Sedang Berlangsung", color: "orange" };
            }
        }
    };

    const fetchScheduleDetail = async () => {
        try {
            const response = await fetchWithAuth(
                `${API_URL}/api/pembina/schedule/${id}`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }

            const result = await response.json();

            if (result.status === 200) {
                setScheduleDetail(result.data);
                setIsServerDown(false);
            } else {
                throw new Error(result.message || "Failed to fetch data");
            }
        } catch (error) {
            console.error("Error fetching schedule detail:", error);
            setIsServerDown(true);
            setScheduleDetail(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!id) {
            console.error("No ID provided in URL");
            return;
        }

        fetchScheduleDetail();

        const handleRetry = () => {
            fetchScheduleDetail();
        };

        window.addEventListener("retry-connection", handleRetry);

        intervalRef.current = setInterval(fetchScheduleDetail, 60000);
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            window.removeEventListener("retry-connection", handleRetry);
        };
    }, [id]);

    const handleBack = () => {
        navigate("/jadwal");
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                setUploadError("Hanya file gambar yang diperbolehkan");
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                setUploadError("Ukuran file maksimal 5MB");
                return;
            }
            setSelectedImage(file);
            setUploadError("");
        }
    };

    const handleUploadDocumentation = async () => {
        if (!selectedImage || !documentationTitle.trim()) {
            setUploadError("Pilih gambar dan masukkan judul dokumentasi");
            return;
        }

        setIsUploading(true);
        setUploadError("");

        try {
            const token =
                localStorage.getItem("token") || sessionStorage.getItem("token");

            const formData = new FormData();
            formData.append("file", selectedImage);
            formData.append("scheduleId", id);
            formData.append("Title", documentationTitle);

            const response = await fetchWithAuth(
                `${API_URL}/api/pembina/documentation`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            const result = await response.json();

            if (response.ok) {
                setShowUploadModal(false);
                setSelectedImage(null);
                setDocumentationTitle("");
                fetchScheduleDetail();
            } else {
                setUploadError(result.message || "Gagal mengupload dokumentasi");
            }
        } catch (error) {
            console.error("Error uploading documentation:", error);
            setUploadError("Terjadi kesalahan saat mengupload");
        } finally {
            setIsUploading(false);
        }
    };

    const handleProfileClick = (memberId) => {
        navigate(`/profile/${memberId}`);
    };

    const handleImageError = (e, fallbackImage = null) => {
        e.currentTarget.onerror = null;
        if (fallbackImage) {
            e.currentTarget.src = fallbackImage;
        } else {
            e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%2338bdf8' width='100' height='100'/%3E%3Ctext x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='36' font-family='Arial'%3EE%3C/text%3E%3C/svg%3E`;
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "Tidak tersedia";
        const date = new Date(dateString);
        return date.toLocaleDateString("id-ID", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    const formatTime = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const scheduleStatus = getScheduleStatus();

    const getStatusStyles = () => {
        if (!scheduleStatus) return {};

        switch (scheduleStatus.color) {
            case "green":
                return {
                    bg: darkMode ? "bg-green-900/50" : "bg-green-100",
                    text: darkMode ? "text-green-300" : "text-green-700",
                    border: darkMode ? "border-green-700" : "border-green-300",
                };
            case "blue":
                return {
                    bg: darkMode ? "bg-blue-900/50" : "bg-blue-100",
                    text: darkMode ? "text-blue-300" : "text-blue-700",
                    border: darkMode ? "border-blue-700" : "border-blue-300",
                };
            case "yellow":
                return {
                    bg: darkMode ? "bg-yellow-900/50" : "bg-yellow-100",
                    text: darkMode ? "text-yellow-300" : "text-yellow-700",
                    border: darkMode ? "border-yellow-700" : "border-yellow-300",
                };
            case "orange":
                return {
                    bg: darkMode ? "bg-orange-900/50" : "bg-orange-100",
                    text: darkMode ? "text-orange-300" : "text-orange-700",
                    border: darkMode ? "border-orange-700" : "border-orange-300",
                };
            default:
                return {
                    bg: darkMode ? "bg-slate-700" : "bg-slate-100",
                    text: darkMode ? "text-slate-300" : "text-slate-700",
                    border: darkMode ? "border-slate-600" : "border-slate-300",
                };
        }
    };

    const statusStyles = getStatusStyles();

    if (isLoading) {
        return (
            <div className="p-8">
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={handleBack}
                    className={`cursor-pointer flex items-center gap-2 mb-6 px-4 py-2 rounded-lg transition-colors ${darkMode
                        ? "hover:bg-slate-800 text-slate-300"
                        : "hover:bg-slate-100 text-slate-600"
                        }`}
                >
                    <span className="text-3xl">←</span>
                    <span className="font-semibold mt-1.5">Back</span>
                </motion.button>
                <SkeletonDetail darkMode={darkMode} />
            </div>
        );
    }

    return (
        <div className="p-8">
            <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                onClick={handleBack}
                className={`cursor-pointer flex items-center gap-2 mb-6 px-4 py-2 rounded-lg transition-colors ${darkMode
                    ? "hover:bg-slate-800 text-slate-300"
                    : "hover:bg-slate-100 text-slate-600"
                    }`}
            >
                <span className="text-3xl">←</span>
                <span className="font-semibold mt-1.5">Back</span>
            </motion.button>

            {isServerDown || !scheduleDetail ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-16"
                >
                    <div className="text-6xl mb-4">⚠️</div>
                    <h3
                        className={`text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-slate-900"
                            }`}
                    >
                        {isServerDown
                            ? "Server Tidak Dapat Dihubungi"
                            : "Data Tidak Ditemukan"}
                    </h3>
                    <p
                        className={`${darkMode ? "text-slate-400" : "text-slate-500"
                            } mb-4`}
                    >
                        {isServerDown
                            ? "Pastikan backend sedang berjalan dan koneksi aktif."
                            : "Jadwal dengan ID tersebut tidak ditemukan."}
                    </p>
                    <button
                        onClick={handleBack}
                        className={`px-6 py-2 rounded-lg font-semibold ${darkMode
                            ? "bg-sky-600 hover:bg-sky-700 text-white"
                            : "bg-sky-500 hover:bg-sky-600 text-white"
                            }`}
                    >
                        Kembali ke Daftar Jadwal
                    </button>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <div
                                className={`rounded-2xl shadow-lg p-6 ${darkMode ? "bg-slate-800" : "bg-white"
                                    }`}
                            >
                                <div className="flex items-start gap-4 mb-6">
                                    <img
                                        src={`${API_URL}/${scheduleDetail.schedule?.extracurricular?.imageUrl}`}
                                        alt={scheduleDetail.schedule?.extracurricular?.name}
                                        className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                                        onError={(e) => {
                                            e.currentTarget.onerror = null;
                                            e.currentTarget.src = 'https://placehold.co/80x80/38bdf8/white?text=' + (scheduleDetail.schedule?.extracurricular?.name?.charAt(0) || 'E');
                                        }}
                                    />
                                    <div className="flex-1">
                                        <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                                            <h1
                                                className={`text-2xl font-bold ${darkMode ? "text-white" : "text-slate-900"
                                                    }`}
                                            >
                                                {scheduleDetail.schedule?.title}
                                            </h1>
                                            {scheduleStatus && (
                                                <span
                                                    className={`px-4 py-1.5 rounded-full text-sm font-semibold border ${statusStyles.bg} ${statusStyles.text} ${statusStyles.border}`}
                                                >
                                                    {scheduleStatus.label}
                                                </span>
                                            )}
                                        </div>
                                        <p
                                            className={`text-sm mb-3 ${darkMode ? "text-slate-400" : "text-slate-500"
                                                }`}
                                        >
                                            {scheduleDetail.schedule?.extracurricular?.name}
                                        </p>
                                        <p
                                            className={`${darkMode ? "text-slate-300" : "text-slate-600"
                                                }`}
                                        >
                                            {scheduleDetail.schedule?.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div
                                        className={`rounded-xl p-4 ${darkMode ? "bg-slate-700/50" : "bg-slate-50"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`w-10 h-10 rounded-lg flex items-center justify-center ${darkMode ? "bg-sky-900/50" : "bg-sky-100"
                                                    }`}
                                            >
                                                <FiCalendar
                                                    className={`text-lg ${darkMode ? "text-sky-400" : "text-sky-600"
                                                        }`}
                                                />
                                            </div>
                                            <div>
                                                <p
                                                    className={`text-xs ${darkMode ? "text-slate-400" : "text-slate-500"
                                                        }`}
                                                >
                                                    Tanggal
                                                </p>
                                                <p
                                                    className={`font-semibold text-sm ${darkMode ? "text-white" : "text-slate-900"
                                                        }`}
                                                >
                                                    {formatDate(scheduleDetail.schedule?.scheduleDate)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className={`rounded-xl p-4 ${darkMode ? "bg-slate-700/50" : "bg-slate-50"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`w-10 h-10 rounded-lg flex items-center justify-center ${darkMode ? "bg-purple-900/50" : "bg-purple-100"
                                                    }`}
                                            >
                                                <FiClock
                                                    className={`text-lg ${darkMode ? "text-purple-400" : "text-purple-600"
                                                        }`}
                                                />
                                            </div>
                                            <div>
                                                <p
                                                    className={`text-xs ${darkMode ? "text-slate-400" : "text-slate-500"
                                                        }`}
                                                >
                                                    Waktu
                                                </p>
                                                <p
                                                    className={`font-semibold text-sm ${darkMode ? "text-white" : "text-slate-900"
                                                        }`}
                                                >
                                                    {formatTime(scheduleDetail.schedule?.scheduleDate)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className={`rounded-xl p-4 ${darkMode ? "bg-slate-700/50" : "bg-slate-50"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`w-10 h-10 rounded-lg flex items-center justify-center ${darkMode ? "bg-green-900/50" : "bg-green-100"
                                                    }`}
                                            >
                                                <FiMapPin
                                                    className={`text-lg ${darkMode ? "text-green-400" : "text-green-600"
                                                        }`}
                                                />
                                            </div>
                                            <div>
                                                <p
                                                    className={`text-xs ${darkMode ? "text-slate-400" : "text-slate-500"
                                                        }`}
                                                >
                                                    Lokasi
                                                </p>
                                                <p
                                                    className={`font-semibold text-sm ${darkMode ? "text-white" : "text-slate-900"
                                                        }`}
                                                >
                                                    {scheduleDetail.schedule?.location}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div
                                className={`rounded-2xl shadow-lg p-6 ${darkMode ? "bg-slate-800" : "bg-white"
                                    }`}
                            >
                                <h2
                                    className={`text-xl font-bold mb-4 ${darkMode ? "text-white" : "text-slate-900"
                                        }`}
                                >
                                    Ringkasan Kehadiran
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div
                                        className={`rounded-xl p-4 text-center ${darkMode ? "bg-slate-700/50" : "bg-slate-50"
                                            }`}
                                    >
                                        <p
                                            className={`text-3xl font-bold mb-1 ${darkMode ? "text-white" : "text-slate-900"
                                                }`}
                                        >
                                            {scheduleDetail.attendanceData?.length || 0}
                                        </p>
                                        <p
                                            className={`text-xs ${darkMode ? "text-slate-400" : "text-slate-500"
                                                }`}
                                        >
                                            Total Anggota
                                        </p>
                                    </div>
                                    <div
                                        className={`rounded-xl p-4 text-center ${darkMode ? "bg-green-900/30" : "bg-green-50"
                                            }`}
                                    >
                                        <p
                                            className={`text-3xl font-bold mb-1 ${darkMode ? "text-green-400" : "text-green-600"
                                                }`}
                                        >
                                            {scheduleDetail.attendanceSummary?.present || 0}
                                        </p>
                                        <p
                                            className={`text-xs ${darkMode ? "text-green-300" : "text-green-600"
                                                }`}
                                        >
                                            Hadir
                                        </p>
                                    </div>
                                    <div
                                        className={`rounded-xl p-4 text-center ${darkMode ? "bg-yellow-900/30" : "bg-yellow-50"
                                            }`}
                                    >
                                        <p
                                            className={`text-3xl font-bold mb-1 ${darkMode ? "text-yellow-400" : "text-yellow-600"
                                                }`}
                                        >
                                            {scheduleDetail.attendanceSummary?.sick || 0}
                                        </p>
                                        <p
                                            className={`text-xs ${darkMode ? "text-yellow-300" : "text-yellow-600"
                                                }`}
                                        >
                                            Sakit
                                        </p>
                                    </div>
                                    <div
                                        className={`rounded-xl p-4 text-center ${darkMode ? "bg-red-900/30" : "bg-red-50"
                                            }`}
                                    >
                                        <p
                                            className={`text-3xl font-bold mb-1 ${darkMode ? "text-red-400" : "text-red-600"
                                                }`}
                                        >
                                            {scheduleDetail.attendanceSummary?.alpha || 0}
                                        </p>
                                        <p
                                            className={`text-xs ${darkMode ? "text-red-300" : "text-red-600"
                                                }`}
                                        >
                                            Alpha
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Attendance List - Centered below Summary */}
                            <div
                                className={`rounded-2xl shadow-lg p-6 ${darkMode ? "bg-slate-800" : "bg-white"
                                    }`}
                            >
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                                    <div className="flex items-center gap-2">
                                        <h2
                                            className={`text-xl font-bold ${darkMode ? "text-white" : "text-slate-900"
                                                }`}
                                        >
                                            Daftar Kehadiran Member
                                        </h2>
                                    </div>
                                    {/* Search Input */}
                                    <div className="w-full sm:w-auto">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Cari nama member..."
                                                value={memberSearchQuery}
                                                onChange={(e) => setMemberSearchQuery(e.target.value)}
                                                className={`w-full sm:w-64 pl-10 pr-4 py-2 rounded-xl border-2 text-sm ${darkMode
                                                    ? "bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                                                    : "bg-white border-slate-200 text-slate-900 placeholder-slate-400"
                                                    } focus:outline-none focus:ring-4 ${darkMode ? "focus:ring-sky-900/50 focus:border-sky-500" : "focus:ring-sky-100 focus:border-sky-400"
                                                    }`}
                                            />
                                            <FiUser
                                                className={`absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? "text-slate-400" : "text-slate-400"
                                                    }`}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {scheduleDetail.attendanceData &&
                                    scheduleDetail.attendanceData.length > 0 ? (
                                    (() => {
                                        const filteredMembers = scheduleDetail.attendanceData.filter((attendance) =>
                                            attendance.name?.toLowerCase().includes(memberSearchQuery.toLowerCase())
                                        );
                                        return filteredMembers.length > 0 ? (
                                            <div className="flex flex-col space-y-3">
                                                {filteredMembers.map((attendance) => (
                                                    <div
                                                        key={attendance.memberId}
                                                        onClick={() => handleProfileClick(attendance.memberId)}
                                                        className={`rounded-xl p-4 flex items-center gap-3 cursor-pointer transition-all hover:scale-[1.02] ${darkMode
                                                            ? "bg-slate-700/50 hover:bg-slate-700"
                                                            : "bg-slate-50 hover:bg-slate-100"
                                                            }`}
                                                    >
                                                        <img
                                                            src={`${API_URL}/${attendance.profileUrl}`}
                                                            alt={attendance.name}
                                                            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                                                            onError={(e) =>
                                                                handleImageError(e, attendance.name?.charAt(0) || "M")
                                                            }
                                                        />
                                                        <div className="flex-1 min-w-0">
                                                            <p
                                                                className={`font-semibold truncate ${darkMode ? "text-white" : "text-slate-900"
                                                                    }`}
                                                            >
                                                                {attendance.name}
                                                            </p>
                                                            <p
                                                                className={`text-xs ${darkMode ? "text-slate-400" : "text-slate-500"
                                                                    }`}
                                                            >
                                                                {attendance.attendanceTime
                                                                    ? new Date(attendance.attendanceTime).toLocaleTimeString(
                                                                        "id-ID",
                                                                        { hour: "2-digit", minute: "2-digit" }
                                                                    )
                                                                    : "-"}
                                                            </p>
                                                        </div>
                                                        <div className="flex-shrink-0">
                                                            {attendance.isPresent ? (
                                                                <span
                                                                    className={`px-3 py-1.5 rounded-full text-xs font-semibold ${attendance.status === "Hadir"
                                                                        ? darkMode
                                                                            ? "bg-green-900/50 text-green-300"
                                                                            : "bg-green-100 text-green-700"
                                                                        : attendance.status === "Sakit"
                                                                            ? darkMode
                                                                                ? "bg-yellow-900/50 text-yellow-300"
                                                                                : "bg-yellow-100 text-yellow-700"
                                                                            : darkMode
                                                                                ? "bg-blue-900/50 text-blue-300"
                                                                                : "bg-blue-100 text-blue-700"
                                                                        }`}
                                                                >
                                                                    {attendance.status}
                                                                </span>
                                                            ) : (
                                                                <span
                                                                    className={`px-3 py-1.5 rounded-full text-xs font-semibold ${darkMode
                                                                        ? "bg-red-900/50 text-red-300"
                                                                        : "bg-red-100 text-red-700"
                                                                        }`}
                                                                >
                                                                    Alpha
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-12">
                                                <div className="text-5xl mb-4">🔍</div>
                                                <p
                                                    className={`${darkMode ? "text-slate-400" : "text-slate-500"
                                                        }`}
                                                >
                                                    Tidak ada member dengan nama "{memberSearchQuery}"
                                                </p>
                                            </div>
                                        );
                                    })()
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="text-5xl mb-4">👥</div>
                                        <p
                                            className={`${darkMode ? "text-slate-400" : "text-slate-500"
                                                }`}
                                        >
                                            Belum ada data kehadiran
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div
                                className={`rounded-2xl shadow-lg p-6 ${darkMode ? "bg-slate-800" : "bg-white"
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <h2
                                        className={`text-xl font-bold ${darkMode ? "text-white" : "text-slate-900"
                                            }`}
                                    >
                                        Dokumentasi
                                    </h2>
                                    {!hasDocumentation && (
                                        <button
                                            onClick={() => setShowUploadModal(true)}
                                            className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-sky-500 to-cyan-500 hover:shadow-lg transition-all"
                                        >
                                            <FiUpload />
                                            Upload
                                        </button>
                                    )}
                                </div>

                                {hasDocumentation ? (
                                    <div className="space-y-4">
                                        {scheduleDetail.documentatioData.map((doc) => (
                                            <div
                                                key={doc.id}
                                                className={`rounded-xl overflow-hidden cursor-pointer transition-all hover:scale-[1.02] ${darkMode ? "bg-slate-700" : "bg-slate-100"
                                                    }`}
                                                onClick={() => setViewImageModal(doc)}
                                            >
                                                <div className="aspect-video relative">
                                                    <img
                                                        src={`${API_URL}/${doc.fileUrl}`}
                                                        alt={doc.documentationTitle}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => handleImageError(e, "D")}
                                                    />
                                                </div>
                                                <div className="p-4">
                                                    <p
                                                        className={`font-semibold ${darkMode ? "text-white" : "text-slate-900"
                                                            }`}
                                                    >
                                                        {doc.documentationTitle}
                                                    </p>
                                                    <p
                                                        className={`text-sm mt-1 ${darkMode ? "text-slate-400" : "text-slate-500"
                                                            }`}
                                                    >
                                                        {new Date(doc.submittedAt).toLocaleDateString("id-ID", {
                                                            day: "numeric",
                                                            month: "long",
                                                            year: "numeric",
                                                        })}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="text-5xl mb-4">📷</div>
                                        <p
                                            className={`${darkMode ? "text-slate-400" : "text-slate-500"
                                                }`}
                                        >
                                            Belum ada dokumentasi
                                        </p>
                                        <p
                                            className={`text-sm mt-2 ${darkMode ? "text-slate-500" : "text-slate-400"
                                                }`}
                                        >
                                            Klik tombol Upload untuk menambahkan dokumentasi kegiatan
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Reports Section */}
                            {scheduleDetail.reportData && scheduleDetail.reportData.length > 0 && (
                                <div
                                    className={`rounded-2xl shadow-lg p-6 ${darkMode ? "bg-slate-800" : "bg-white"
                                        }`}
                                >
                                    <h2
                                        className={`text-xl font-bold mb-4 ${darkMode ? "text-white" : "text-slate-900"
                                            }`}
                                    >
                                        Laporan
                                    </h2>
                                    <div className="space-y-3">
                                        {scheduleDetail.reportData.map((report) => (
                                            <div
                                                key={report.id}
                                                className={`rounded-xl p-4 cursor-pointer transition-all hover:scale-[1.01] ${darkMode ? "bg-slate-700/50 hover:bg-slate-700" : "bg-slate-50 hover:bg-slate-100"
                                                    }`}
                                                onClick={() => setViewReportModal(report)}
                                            >
                                                <div className="flex-1">
                                                    <p
                                                        className={`font-semibold text-sm ${darkMode ? "text-white" : "text-slate-900"
                                                            }`}
                                                    >
                                                        {report.reportTitle}
                                                    </p>
                                                    <p
                                                        className={`text-xs mt-1 line-clamp-2 ${darkMode ? "text-slate-400" : "text-slate-500"
                                                            }`}
                                                    >
                                                        {report.reportText}
                                                    </p>
                                                    <p
                                                        className={`text-xs mt-2 ${darkMode ? "text-slate-500" : "text-slate-400"
                                                            }`}
                                                    >
                                                        {report.memberName} •{" "}
                                                        {new Date(report.submittedAt).toLocaleDateString("id-ID")}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>


                </motion.div>
            )}

            <AnimatePresence>
                {showUploadModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className={`w-full max-w-lg rounded-2xl shadow-2xl ${darkMode ? "bg-slate-800" : "bg-white"
                                }`}
                        >
                            <div
                                className={`flex items-center justify-between p-6 border-b ${darkMode ? "border-slate-700" : "border-slate-200"
                                    }`}
                            >
                                <h2
                                    className={`text-xl font-bold ${darkMode ? "text-white" : "text-slate-900"
                                        }`}
                                >
                                    Upload Dokumentasi
                                </h2>
                                <button
                                    onClick={() => {
                                        setShowUploadModal(false);
                                        setSelectedImage(null);
                                        setDocumentationTitle("");
                                        setUploadError("");
                                    }}
                                    className={`p-2 rounded-lg ${darkMode ? "hover:bg-slate-700" : "hover:bg-slate-100"
                                        }`}
                                >
                                    <FiX
                                        className={`text-xl ${darkMode ? "text-white" : "text-slate-900"
                                            }`}
                                    />
                                </button>
                            </div>

                            <div className="p-6 space-y-4">
                                {uploadError && (
                                    <div
                                        className={`p-3 rounded-lg ${darkMode
                                            ? "bg-red-900/50 text-red-200 border border-red-700"
                                            : "bg-red-100 text-red-700 border border-red-300"
                                            }`}
                                    >
                                        {uploadError}
                                    </div>
                                )}

                                <div>
                                    <label
                                        className={`block text-sm font-semibold mb-2 ${darkMode ? "text-slate-300" : "text-slate-700"
                                            }`}
                                    >
                                        Judul Dokumentasi
                                    </label>
                                    <input
                                        type="text"
                                        value={documentationTitle}
                                        onChange={(e) => setDocumentationTitle(e.target.value)}
                                        placeholder="Masukkan judul dokumentasi..."
                                        className={`w-full p-3 rounded-xl border-2 ${darkMode
                                            ? "bg-slate-700 border-slate-600 text-white"
                                            : "bg-white border-slate-200"
                                            } focus:outline-none focus:ring-4 ${darkMode ? "focus:ring-sky-900/50" : "focus:ring-sky-100"
                                            }`}
                                    />
                                </div>

                                <div>
                                    <label
                                        className={`block text-sm font-semibold mb-2 ${darkMode ? "text-slate-300" : "text-slate-700"
                                            }`}
                                    >
                                        Pilih Gambar
                                    </label>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileSelect}
                                        className="hidden"
                                    />
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${darkMode
                                            ? "border-slate-600 hover:border-sky-500"
                                            : "border-slate-300 hover:border-sky-400"
                                            }`}
                                    >
                                        {selectedImage ? (
                                            <div className="space-y-2">
                                                <img
                                                    src={URL.createObjectURL(selectedImage)}
                                                    alt="Preview"
                                                    className="max-h-40 mx-auto rounded-lg object-contain"
                                                />
                                                <p
                                                    className={`text-sm ${darkMode ? "text-slate-300" : "text-slate-600"
                                                        }`}
                                                >
                                                    {selectedImage.name}
                                                </p>
                                            </div>
                                        ) : (
                                            <div>
                                                <FiImage
                                                    className={`text-4xl mx-auto mb-2 ${darkMode ? "text-slate-500" : "text-slate-400"
                                                        }`}
                                                />
                                                <p
                                                    className={`${darkMode ? "text-slate-400" : "text-slate-500"
                                                        }`}
                                                >
                                                    Klik untuk memilih gambar
                                                </p>
                                                <p
                                                    className={`text-xs mt-1 ${darkMode ? "text-slate-500" : "text-slate-400"
                                                        }`}
                                                >
                                                    Maksimal 5MB
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowUploadModal(false);
                                            setSelectedImage(null);
                                            setDocumentationTitle("");
                                            setUploadError("");
                                        }}
                                        disabled={isUploading}
                                        className={`flex-1 py-3 rounded-xl font-semibold ${darkMode
                                            ? "bg-slate-700 hover:bg-slate-600 text-white"
                                            : "bg-slate-200 hover:bg-slate-300 text-slate-700"
                                            } ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
                                    >
                                        Batal
                                    </button>
                                    <button
                                        onClick={handleUploadDocumentation}
                                        disabled={isUploading || !selectedImage || !documentationTitle.trim()}
                                        className={`flex-1 py-3 rounded-xl font-semibold text-white ${isUploading || !selectedImage || !documentationTitle.trim()
                                            ? "bg-slate-400 cursor-not-allowed"
                                            : "bg-gradient-to-r from-sky-500 to-cyan-500 hover:shadow-lg"
                                            }`}
                                    >
                                        {isUploading ? "Mengupload..." : "Upload"}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {viewImageModal && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={() => setViewImageModal(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="max-w-4xl max-h-[90vh] relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setViewImageModal(null)}
                                className="absolute -top-12 right-0 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                            >
                                <FiX className="text-2xl" />
                            </button>
                            <img
                                src={`${API_URL}/${viewImageModal.fileUrl}`}
                                alt={viewImageModal.documentationTitle}
                                className="max-w-full max-h-[80vh] rounded-xl object-contain"
                            />
                            <div className="mt-4 text-center">
                                <p className="text-white font-semibold text-lg">
                                    {viewImageModal.documentationTitle}
                                </p>
                                <p className="text-white/70 text-sm">
                                    {new Date(viewImageModal.submittedAt).toLocaleDateString("id-ID", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {viewReportModal && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                        onClick={() => setViewReportModal(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className={`w-full max-w-lg rounded-2xl shadow-2xl ${darkMode ? "bg-slate-800" : "bg-white"
                                }`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div
                                className={`flex items-center justify-between p-6 border-b ${darkMode ? "border-slate-700" : "border-slate-200"
                                    }`}
                            >
                                <h2
                                    className={`text-xl font-bold ${darkMode ? "text-white" : "text-slate-900"
                                        }`}
                                >
                                    Detail Laporan
                                </h2>
                                <button
                                    onClick={() => setViewReportModal(null)}
                                    className={`p-2 rounded-lg ${darkMode ? "hover:bg-slate-700" : "hover:bg-slate-100"
                                        }`}
                                >
                                    <FiX
                                        className={`text-xl ${darkMode ? "text-white" : "text-slate-900"
                                            }`}
                                    />
                                </button>
                            </div>

                            <div className="p-6">
                                <h3
                                    className={`text-lg font-bold mb-3 ${darkMode ? "text-white" : "text-slate-900"
                                        }`}
                                >
                                    {viewReportModal.reportTitle}
                                </h3>
                                <p
                                    className={`leading-relaxed whitespace-pre-wrap ${darkMode ? "text-slate-300" : "text-slate-600"
                                        }`}
                                >
                                    {viewReportModal.reportText}
                                </p>
                                <div
                                    className={`mt-6 pt-4 border-t ${darkMode ? "border-slate-700" : "border-slate-200"
                                        }`}
                                >
                                    <p
                                        className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-500"
                                            }`}
                                    >
                                        Ditulis oleh <span className="font-semibold">{viewReportModal.memberName}</span>
                                    </p>
                                    <p
                                        className={`text-xs mt-1 ${darkMode ? "text-slate-500" : "text-slate-400"
                                            }`}
                                    >
                                        {new Date(viewReportModal.submittedAt).toLocaleDateString("id-ID", {
                                            weekday: "long",
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </p>
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
