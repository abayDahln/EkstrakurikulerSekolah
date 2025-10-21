import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { easeOut, motion } from "framer-motion";
import { House, NotebookText, Camera, ListChecks, CirclePlus, Menu, X } from "lucide-react";

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
        { icon: <NotebookText />, label: "Buat Jadwal", onClick: jadwal, active: false, color: "text-white" },
        { icon: <Camera />, label: "Dokumentasi", onClick: dokum, active: false, color: "text-white" },
        { icon: <ListChecks />, label: "Absensi", onClick: absensi, active: false, color: "bg-yellow-300" },
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
                        onClick={item.onClick}>
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
                                onClick={item.onClick}>
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
        className="bg-white rounded-xl w-full max-w-4xl min-h-fit shadow-2xl mx-4"> 
            <div className="flex justify-between pl-4 pr-4 pt-4 text-center">
            <span className="font-bold text-xl">Data Absen</span>
            <button 
                className="w-24 text-sm h-8 sm:w-40 bg-yellow-300 sm:text-xl font-bold rounded-lg flex justify-center items-center gap-1 sm:gap-2 hover:bg-yellow-400 transition duration-200">
                <CirclePlus color="#4b87b4" strokeWidth={3} />Tambah
            </button>
            </div>
            <div className="p-4 overflow-x-auto">
              <table className="min-w-full border border-gray-200 divide-y divide-gray-200 shadow-md rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">No</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">Nama</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">Tanggal</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">1</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">Nara</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">14/10/2025</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Hadir</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">2</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">Risma</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">14/10/2025</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Absen</td>
                  </tr>
                </tbody>
              </table>
            </div>
        </motion.div>
    )
}




export default function Absen(){
    return(
        <div className="min-h-screen bg-blue-400">
            <Navbar />
            <div className="flex justify-center pr-3 pl-3 pt-20 pb-10 sm:pt-10"> 
                <Card />
            </div>
        </div>
    )
}