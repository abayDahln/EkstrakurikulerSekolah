import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { easeOut, motion } from "framer-motion";
import { House, NotebookText, Camera, ListChecks, Menu, X, ChevronRight, ChevronLeft } from "lucide-react";


function Navbar() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const dokum = () => { navigate("/dokumentasi"); setIsOpen(false); }
    const absensi = () => { navigate("/absen"); setIsOpen(false); }
    const home = () => { navigate("/home"); setIsOpen(false); }
    const jadwal = () => { navigate("/jadwal"); setIsOpen(false); }

    const toggleMenu = () => setIsOpen(!isOpen);

    const menuItems = [
        { icon: <House size={20} />, label: "Home", onClick: home, color: "bg-yellow-300" },
        { icon: <NotebookText size={20} />, label: "Buat Jadwal", onClick: jadwal, color: "text-white" },
        { icon: <Camera size={20} />, label: "Dokumentasi", onClick: dokum, color: "text-white" },
        { icon: <ListChecks size={20} />, label: "Absensi", onClick: absensi, color: "text-white" },
    ];

    return (
            <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="pt-5 px-4 md:px-10 flex justify-between items-center relative z-50">
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
                        className={`w-60 ${item.color} text-base font-semibold rounded-xl shadow-xl flex items-center justify-center gap-4 px-3 py-2 h-10 transition duration-300 ease-in-out hover:opacity-80`} 
                        onClick={item.onClick}>
                        {item.icon}{item.label}
                    </button>
                ))}
            </div>

            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }} 
                    className="md:hidden fixed inset-0 z-40 bg-blue-400/95 pt-20">
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.3, ease: easeOut }}
                        className="flex flex-col gap-5 p-5">
                        {menuItems.map((item, index) => (
                            <button 
                                key={index}
                                className={`w-full ${item.color} text-xl font-semibold rounded-xl flex items-center justify-start gap-5 px-5 py-4 h-16 shadow-lg`} 
                                onClick={item.onClick}>
                                {item.icon}{item.label}
                            </button>
                        ))}
                    </motion.div>
                </motion.div>
            )}
        </motion.div>
    );
}

function Card(){

    return(
        <motion.div 
        initial={{y: 1000, opacity: 0}}
        animate={{y: 0, opacity: 1}}
        transition={{duration: 1, ease: "easeOut"}}
        className="bg-white w-full min-h-screen gap-15">
            <div 
            className="flex flex-col items-center justify-center gap-2 pt-20 sm:pt-30">
                <span className="text-4xl sm:text-6xl font-semibold text-center">Selamat Datang di</span>
                <span className="text-white pr-5 pl-5 rounded-md bg-blue-500 text-center text-4xl sm:text-5xl font-semibold">EkskulHub</span>
            </div>
            <div className="flex sm:flex-row flex-col gap-4 sm:gap-10 justify-center pt-10 font-semibold text-xl sm:text-2xl items-center">
                <button className="block sm:hidden text-white bg-blue-900 text-center w-65 pt-2 pb-2 pl-5 pr-5 rounded-md">Mulai Sekarang</button>
                <button className="block sm:hidden border border-blue-900 w-65 pt-2 pl-5 pr-5 pb-2 rounded-md">Pelajari Lebih Lanjut</button>

                <button className="hidden sm:block text-white bg-blue-900 pl-5 pr-5 pt-2 pb-2 text-center rounded-md">Mulai Sekarang</button>
                <button className="hidden sm:block border border-blue-900 pl-5 pr-5 pt-2 pb-2 rounded-md">Pelajari Lebih Lanjut</button>
            </div>
        </motion.div>
    )
}

export default function Home(){
    return(
        <div className="min-h-screen bg-blue-400">
            <Navbar />
            <div className="flex justify-center pt-8 sm:pt-8">
            <Card />
            </div>
        </div>
    )
}