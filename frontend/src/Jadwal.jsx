import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { easeOut, motion } from "framer-motion";
import { House, NotebookText, Camera, ListChecks, Menu, X } from "lucide-react";

function Navbar() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const dokum = () => { navigate("/dokumentasi"); setIsOpen(false); }
    const absensi = () => { navigate("/absen"); setIsOpen(false); }
    const home = () => { navigate("/home"); setIsOpen(false); }
    const jadwal = () => { navigate("/jadwal"); setIsOpen(false); }
    
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const menuItems = [
        { icon: <House />, label: "Home", onClick: home, active: true, color: "text-white" },
        { icon: <NotebookText />, label: "Buat Jadwal", onClick: jadwal, active: false, color: "bg-yellow-300" },
        { icon: <Camera />, label: "Dokumentasi", onClick: dokum, active: false, color: "text-white" },
        { icon: <ListChecks />, label: "Absensi", onClick: absensi, active: false, color: "text-white" },
    ];


    return (
        <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="pt-5 px-4 md:px-10 flex justify-between items-center relative">
            <h1 className="text-2xl font-bold text-white md:hidden">Ekskul App</h1> 
            <button 
                onClick={toggleMenu} 
                className="text-white md:hidden p-2 z-50"
                aria-label="Toggle Menu">
                {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
            <div className="hidden md:flex gap-5 mx-auto">
                {menuItems.map((item, index) => (
                    <button 
                        key={index}
                        className={`w-60 ${item.color} text-2xl font-semibold rounded shadow-xl flex items-center justify-center gap-4 px-3 py-2 h-10 transition duration-300 ease-in-out hover:opacity-80`} 
                        onClick={item.onClick}
                    >
                        {item.icon}{item.label}
                    </button>
                ))}
            </div>
            {isOpen && (
                <div className="md:hidden fixed inset-0 z-40 bg-blue-400/95 pt-20">
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
                                className={`w-full ${item.color} text-3xl font-semibold rounded flex items-center justify-start gap-5 px-5 py-4 h-16 shadow-lg`} 
                                onClick={item.onClick}
                            >
                                {item.icon}{item.label}
                            </button>
                        ))}
                    </motion.div>
                </div>
            )}
        </motion.div>
    );
}

function Card() {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Jadwal submitted!");
    };

    return (
        <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl px-4 md:px-0 mx-auto">
            <motion.div
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.4, ease: "easeOut" }}
                className="bg-white rounded-2xl w-full md:w-1/2 shadow-xl p-6"
            >
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 text-center">Buat Jadwal Baru</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <input className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" type="text" placeholder="Nama Kegiatan" required />
                    <input className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" type="date" required />
                    <input className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" type="time" required />

                    <button type="submit" className="w-full h-12 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition shadow-lg mt-4">Buat Jadwal</button>
                </form>
            </motion.div>

            <motion.div
                initial={{ x: 200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.4, ease: "easeOut" }}
                className="bg-white rounded-2xl w-full md:w-1/2 min-h-[300px] md:min-h-[450px] shadow-xl flex text-center justify-center items-center p-6"
            >
                <div className="text-2xl font-extrabold text-gray-400 p-8">Tidak Ada Jadwal Yang Dibuat</div>
            </motion.div>
        </div>
    );
}


export default function Jadwal() {
    return (
        <div className="min-h-screen bg-blue-400 pb-10 font-sans">
            <Navbar />
            <div className="flex pt-10">
                <Card />
            </div>
        </div>
    );
}
