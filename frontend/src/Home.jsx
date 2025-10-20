import React from "react";
import { useNavigate } from "react-router-dom";
import { easeOut, motion } from "framer-motion";

function Navbar(){
    const navigate = useNavigate()

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
    className="flex justify-evenly pt-5">
            <button onClick={home} className="text-xs sm:text-base w-75 bg-yellow-200 p-1">Home</button>
            <button onClick={jadwal} className="text-xs sm:text-xl rounded-full">Buat Jadwal</button>
            <button onClick={dokum} className="text-xs sm:text-xl rounded-full">Dokumentasi</button>
            <button onClick={absensi} className="text-xs sm:text-base">Absensi</button>
    </motion.div>
    )
}

function Ekskul(){
    return(
        <motion.div 
        initial={{ y: 500, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="flex flex-col pt-30 gap-3">
            <h1 className="text-4xl font-extrabold flex justify-center text-center">Ekskul SMKN10 Jakarta</h1>
            <h3 className="text-2xl font-semibold flex justify-center text-center">Selamat Datang [Nama]</h3>

        </motion.div>
    )
}


export default function Home(){
    return(
        <div className="h-screen bg-blue-300">
            <Navbar />
            <Ekskul />
        </div>
     )
}