import React from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="pt-5 flex justify-center">
        <div className="bg-[rgba(243,244,246,0.2)] shadow-2xl rounded-full p-1 w-100 flex justify-between">
            <button onClick={home} className="text-xs sm:text-base bg-transparent rounded-full w-20">Home</button>
            <button onClick={jadwal} className="text-xs sm:text-base bg-transparent rounded-full">Buat Jadwal</button>
            <button onClick={dokum}className="text-xs sm:text-base bg-transparent rounded-full">Dokumentasi</button>
            <button pnClick={absensi} className="text-xs sm:text-base bg-gray-100 p-1 rounded-full w-20">Absensi</button>
        </div> 
    </div>
    )
}


export default function Absen(){
    return(
        <div className="h-screen bg-white">
            <Navbar />
        </div>
     )
}