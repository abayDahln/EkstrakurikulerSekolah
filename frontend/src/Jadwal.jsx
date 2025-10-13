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
            <button onClick={jadwal} className="text-xs sm:text-base bg-gray-100 p-1 rounded-full">Buat Jadwal</button>
            <button onClick={dokum} className="text-xs sm:text-base bg-transparent rounded-full">Dokumentasi</button>
            <button onClick={absensi} className="text-xs sm:text-base bg-transparent rounded-full w-20">Absensi</button>
        </div> 
    </div>
    )
}

function Formulir(){
    return(
        <div className="sm:w-200 sm:ml-15 mt-20 pl-7 w-80 bg-green-300 rounded shadow-2xl">
            <form>
                <div className="flex flex-col">
                <p className="font-bold">Nama Kegiatan</p>
                <input 
                    type="text" 
                    placeholder="Masukkan Nama Kegiatan"
                    className="bg-gray-100 rounded shadow-xl w-70 sm:w-150 sm:h-10 text-center">
                </input>
                </div>
                <div>
                <p className="font-bold">Waktu Kegiataan</p>
                <input 
                    type="date" 
                    className="bg-gray-100 rounded shadow-xl w-70 sm:w-150 sm:h-10 text-center">
                </input>
                </div>
                <div className="flex">
                    <button className="bg-blue-300 shadow-xl rounded mt-5 w-40 sm:w-50 p-1">Buat Jadwal</button>
                </div>
            </form>
        </div>
    )
}


export default function Jadwal(){
    return(
        <div className="h-screen bg-white">
            <Navbar />
            <Formulir />
        </div>
     )
}