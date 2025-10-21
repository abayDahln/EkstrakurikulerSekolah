import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { easeOut, motion } from "framer-motion";
import { House, NotebookText, Camera, ListChecks, Menu, X, CheckCircle, XCircle } from "lucide-react";

const API_URL = "http://localhost:5000/api/pembina/schedule";

const DUMMY_TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IkJ1ZGkgUHJhbm93byBTLlBkLiIsInJvbGUiOiJwZW1iaW5hIiwibmFtZWlkIjoiMSIsIm5iZiI6MTc2MTAyOTQyNywiZXhwIjoxNzYxMDMxMjI3LCJpYXQiOjE3NjEwMjk0MjcsImlzcyI6IkVrc2t1bEFQSSIsImF1ZCI6IlNpc3dhRWtza3VsIn0.opU_HvazfABtD62J_Ijhi4fYlv9UduvqiN7r18acWbA";

function Navbar() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const dokum = () => { navigate("/dokumentasi"); setIsOpen(false); }
    const absensi = () => { navigate("/absen"); setIsOpen(false); }
    const home = () => { navigate("/home"); setIsOpen(false); }
    const jadwal = () => { navigate("/jadwal"); setIsOpen(false); }

    const toggleMenu = () => setIsOpen(!isOpen);

    const menuItems = [
        { icon: <House size={20} />, label: "Home", onClick: home, color: "text-white" },
        { icon: <NotebookText size={20} />, label: "Buat Jadwal", onClick: jadwal, color: "bg-yellow-300 text-gray-800" },
        { icon: <Camera size={20} />, label: "Dokumentasi", onClick: dokum, color: "text-white" },
        { icon: <ListChecks size={20} />, label: "Absensi", onClick: absensi, color: "text-white" },
    ];

    return (
        <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="pt-5 px-4 md:px-10 flex justify-between items-center relative z-50"
        >
            <h1 className="text-2xl font-bold text-white md:hidden">Ekskul App</h1>
            <button 
                onClick={toggleMenu} 
                className="text-white md:hidden p-2 z-50"
                aria-label="Toggle Menu"
            >
                {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
            <div className="hidden md:flex gap-5 mx-auto">
                {menuItems.map((item, index) => (
                    <button 
                        key={index}
                        className={`w-60 ${item.color} text-base font-semibold rounded-xl shadow-xl flex items-center justify-center gap-4 px-3 py-2 h-10 transition duration-300 ease-in-out hover:opacity-80`} 
                        onClick={item.onClick}
                    >
                        {item.icon}{item.label}
                    </button>
                ))}
            </div>

            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }} 
                    className="md:hidden fixed inset-0 z-40 bg-blue-400/95 pt-20"
                >
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.3, ease: easeOut }}
                        className="flex flex-col gap-5 p-5"
                    >
                        {menuItems.map((item, index) => (
                            <button 
                                key={index}
                                className={`w-full ${item.color} text-xl font-semibold rounded-xl flex items-center justify-start gap-5 px-5 py-4 h-16 shadow-lg`} 
                                onClick={item.onClick}
                            >
                                {item.icon}{item.label}
                            </button>
                        ))}
                    </motion.div>
                </motion.div>
            )}
        </motion.div>
    );
}

function Card() {
    const [id, setId] = useState("");  
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tanggal, setTanggal] = useState("");
    const [waktu, setWaktu] = useState("");
    const [location, setLocation] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [feedback, setFeedback] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFeedback(null);

        if (!title || !tanggal || !waktu || !location) {
            setFeedback({ type: "error", message: "Semua kolom wajib diisi." });
            return;
        }

        const scheduleDate = `${tanggal}T${waktu}:00Z`;

        const scheduleData = {

            title,
            description,
            scheduleDate,
            location,
        };

        setIsLoading(true);

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${DUMMY_TOKEN}`,
                },
                body: JSON.stringify(scheduleData),
            });

            if (response.ok) {
                setFeedback({ type: "success", message: "Jadwal berhasil dibuat!" });
                setTitle("");
                setDescription("");
                setTanggal("");
                setWaktu("");
                setLocation("");
            } else {
                const errorData = await response.json();
                setFeedback({ type: "error", message: `Gagal membuat jadwal: ${errorData.message || "Terjadi kesalahan."}` });
            }
        } catch (error) {
            console.error("Error submitting schedule:", error);
            setFeedback({ type: "error", message: "Koneksi gagal. Pastikan server berjalan di localhost:5000." });
        } finally {
            setIsLoading(false);
            setTimeout(() => setFeedback(null), 5000);
        }
    };

    return (
        <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl px-4 md:px-0 mx-auto">
            <motion.div
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-white rounded-2xl w-full md:w-1/2 shadow-xl p-6"
            >
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 text-center">
                    Buat Jadwal Baru
                </h2>

                {feedback && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-3 mb-4 rounded-lg flex items-center gap-2 ${
                            feedback.type === "success"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                        }`}
                    >
                        {feedback.type === "success" ? <CheckCircle size={20} /> : <XCircle size={20} />}
                        <span className="text-sm font-medium">{feedback.message}</span>
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <input
                        type="text"
                        placeholder="Nama Kegiatan"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        disabled={isLoading}
                        className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    />
                    <textarea
                        placeholder="Deskripsi kegiatan"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        disabled={isLoading}
                        className="w-full h-24 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
                    />
                    <div className="flex gap-4">
                        <input
                            type="date"
                            value={tanggal}
                            onChange={(e) => setTanggal(e.target.value)}
                            required
                            disabled={isLoading}
                            className="w-1/2 h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        />
                        <input
                            type="time"
                            value={waktu}
                            onChange={(e) => setWaktu(e.target.value)}
                            required
                            disabled={isLoading}
                            className="w-1/2 h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="Lokasi Kegiatan"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                        disabled={isLoading}
                        className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    />

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-12 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition shadow-lg mt-4 flex items-center justify-center disabled:bg-blue-300"
                    >
                        {isLoading ? (
                            <svg
                                className="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                        ) : (
                            "Buat Jadwal"
                        )}
                    </button>
                </form>
            </motion.div>

            <motion.div
                initial={{ x: 200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-white rounded-2xl w-full md:w-1/2 min-h-[300px] shadow-xl flex flex-col text-center justify-center items-center p-6"
            >
                <div className="text-2xl font-extrabold text-gray-400 p-8">
                    Daftar Jadwal Ekskul
                </div>
                <p className="text-gray-500 text-sm">
                    Jadwal yang baru dibuat akan muncul di sini setelah berhasil dikirim.
                </p>
            </motion.div>
        </div>
    );
}

export default function Jadwal() {
    return (
        <div className="min-h-screen bg-gradient-to-br bg-blue-400 pb-10 font-sans">
            <Navbar />
            <div className="flex pt-10">
                <Card />
            </div>
        </div>
    );
}
