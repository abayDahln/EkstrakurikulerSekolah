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
        { icon: <House />, label: "Home", onClick: home, active: true, color: "bg-yellow-300" },
        { icon: <NotebookText />, label: "Buat Jadwal", onClick: jadwal, active: false, color: "text-white" },
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

function Card(){
    return(
        <motion.div
        initial={{y:1000, opacity:0}}
        animate={{y:0, opacity:1}}
        transition={{duration:1.4, ease:"easeOut"}}
        className="bg-white w-200 h-110 mx-4 p-8 rounded-xl flex flex-col justify-center items-center text-center shadow-2xl">
            <div className="flex flex-col gap-5">
                <div className="font-bold text-3xl">Halo, Pembina [Nama Ekskul]</div>
                <div className="font-semibold text-xl">Atur Jadwal Ekstrakurikermu dengan Mudah!</div>
                <div>Pastikan setiap kegiatan ekstrakurikuler berjalan teratur tanpa bentrok dengan ekstrakurikuler lain. Ayo Amati Kegiatan dan buat Jadwal untuk ekstrakurikuler</div>
            </div>
        </motion.div>
    )
}

export default function Home(){
    return(
        <div className="min-h-screen bg-blue-400">
            <Navbar />
            <div className="flex justify-center pt-40 sm:pt-20">
            <Card />
            </div>
        </div>
    )
}