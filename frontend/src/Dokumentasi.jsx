import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Navbar(){
     const navigate = useNavigate();
    
        const dokum = () => {
        navigate("/dokumentasi")
        }
        const absensi = () => {
        navigate("/absen")
        }
        const home = () => {
        navigate("/home")
        }
        const jadwal = () => {
        navigate("/jadwal")
        }

    return(
    <motion.div 
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    transition={{ duration: 1.4, ease: "easeOut"}}
    className="pt-5 flex justify-center">
        <div className="bg-[rgba(243,244,246,0.2)] shadow-2xl rounded-full p-1 w-100 flex justify-between">
            <button onClick={home} className="text-xs sm:text-base bg-transparent rounded-full w-20">Home</button>
            <button onClick={jadwal} className="text-xs sm:text-base bg-transparent rounded-full">Buat Jadwal</button>
            <button onClick={dokum} className="text-xs sm:text-base bg-gray-100 p-1 rounded-full">Dokumentasi</button>
            <button onClick={absensi} className="text-xs sm:text-base bg-transparent rounded-full w-20">Absensi</button>
        </div> 
    </motion.div>
    )
}


export default function Dokum(){
    return(
        <div className="h-screen bg-white">
            <Navbar />
            <p className="text-4xl font-extrabold text-center pt-20">Simpel? Memang</p>
        </div>
     )
}