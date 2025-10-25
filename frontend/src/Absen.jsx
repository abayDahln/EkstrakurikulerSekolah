import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, easeOut } from "framer-motion";
import { House, NotebookText, Camera, ListChecks, CirclePlus, Menu, X } from "lucide-react";

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
        { icon: <NotebookText size={20} />, label: "Buat Jadwal", onClick: jadwal, color: "text-white" },
        { icon: <Camera size={20} />, label: "Dokumentasi", onClick: dokum, color: "text-white" },
        { icon: <ListChecks size={20} />, label: "Absensi", onClick: absensi, color: "bg-yellow-300" },
    ];

    return (
        <div>
        <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="pt-5 px-4 pb-5 md:px-10 flex justify-between items-center relative z-50"
        >
            <h1 className="text-2xl font-bold text-white md:hidden">Ekskul App</h1>
            <button onClick={toggleMenu} className="text-white md:hidden p-2 z-50">
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
                    className="md:hidden fixed inset-0 z-40 bg-blue-400/95 pt-20"
                >
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
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
        <motion.div 
        initial={{y: -100, opacity: 0}}
        animate={{y: 0, opacity: 1}}
        transition={{duration: 0.7, ease: "easeOut"}}
        className="w-full border border-white"></motion.div>
    </div>
    );
}

function ModalTambahAbsen({ isOpen, onClose, onSubmit }) {
    const [nama, setNama] = useState("");
    const [tanggal, setTanggal] = useState("");
    const [status, setStatus] = useState("");

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newData = { nama, tanggal, status };
        await onSubmit(newData); // kirim ke parent (Card)
        setNama("");
        setTanggal("");
        setStatus("");
        onClose();
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-2xl p-6 w-96"
            >
                <h2 className="text-xl font-bold mb-4 text-center">Tambah Data Absen</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        type="text"
                        placeholder="Nama"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <input
                        type="date"
                        value={tanggal}
                        onChange={(e) => setTanggal(e.target.value)}
                        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    >
                        <option value="">Pilih Status</option>
                        <option value="Hadir">Hadir</option>
                        <option value="Absen">Absen</option>
                        <option value="Izin">Izin</option>
                    </select>

                    <div className="flex justify-between mt-4">
                        <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition">Batal</button>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">Simpan</button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
}

function Card() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataAbsen, setDataAbsen] = useState([]);

    const API_URL = "http://localhost:5000/api/absensi";

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await fetch(API_URL);
            const json = await res.json();
            setDataAbsen(json);
        } catch (error) {
            console.error("Gagal memuat data:", error);
        }
    };

    const handleAddAbsen = async (newData) => {
        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newData),
            });
            const result = await res.json();
            setDataAbsen((prev) => [...prev, result]);
        } catch (error) {
            console.error("Gagal menambahkan data:", error);
        }
    };

    return (
        <motion.div
            initial={{ y: 1000, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="bg-white rounded-xl w-full max-w-4xl min-h-fit shadow-2xl mx-4"
        >
            <div className="flex justify-between pl-4 pr-4 pt-4 text-center">
                <span className="font-bold text-xl">Data Absen</span>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-24 text-sm h-8 sm:w-40 bg-yellow-300 sm:text-xl font-bold rounded-lg flex justify-center items-center gap-1 sm:gap-2 hover:bg-yellow-400 transition duration-200"
                >
                    <CirclePlus color="#4b87b4" strokeWidth={3} />Tambah
                </button>
            </div>

            <div className="p-4 overflow-x-auto">
                <table className="min-w-full border border-gray-200 divide-y divide-gray-200 shadow-md rounded-lg">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase border-r">No</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase border-r">Nama</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase border-r">Tanggal</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {dataAbsen.length > 0 ? (
                            dataAbsen.map((item, index) => (
                                <tr key={item.id || index}>
                                    <td className="px-6 py-4 text-sm text-gray-900 border-r">{index + 1}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900 border-r">{item.nama}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900 border-r">{item.tanggal}</td>
                                    <td className="px-6 py-4 text-sm font-medium">{item.status}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-4 text-gray-500">Belum ada data</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <ModalTambahAbsen
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddAbsen}
            />
        </motion.div>
    );
}

export default function Absen() {
    return (
        <div className="min-h-screen bg-blue-400">
            <Navbar />
            <div className="flex justify-center pr-3 pl-3 pt-20 pb-10 sm:pt-10">
                <Card />
            </div>
        </div>
    );
}
