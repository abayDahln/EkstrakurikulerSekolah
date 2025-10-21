import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { easeOut, motion } from "framer-motion";
import { House, NotebookText, Camera, ListChecks, Menu, X } from "lucide-react";

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
        { icon: <Camera size={20} />, label: "Dokumentasi", onClick: dokum, color: "bg-yellow-300" },
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

function Card(){
    const imagePlaceholders = Array.from({ length: 10 }, (_, i) => i);

    return(
        <motion.div
        initial={{y:1000, opacity:0}}
        animate={{y:0, opacity:1}}
        transition={{duration:1.4, ease:"easeOut"}}
        className="flex flex-col bg-white rounded-xl w-full max-w-5xl min-h-[500px] shadow-2xl p-4 mx-4 sm:mx-auto" 
        >
           <span className="font-bold text-xl mb-4">Data Dokumentasi</span>
           <div 
                className="grid gap-4 overflow-y-auto pb-4"
                style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))' }}
           >
                {imagePlaceholders.map((_, index) => (
                    <div 
                        key={index} 
        
                        className="rounded-lg w-full h-32 border-4 border-gray-300 bg-gray-100 flex items-center justify-center text-gray-500 text-xs"
                    >
                        Image {index + 1}
                    </div>
                ))}
           </div>
        </motion.div>
    )
}

export default function Dokum(){
    return(
        <div className="min-h-screen bg-blue-400">
            <Navbar />
            <div className="flex justify-center pt-20 pb-10 sm:pt-10">
                <Card />
            </div>
        </div>
     )
}