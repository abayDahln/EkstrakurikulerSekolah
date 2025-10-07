import React from "react";

function Navbar(){
    return(
    <div className="pt-5 flex justify-center">
        <div className="bg-[rgba(243,244,246,0.2)] shadow-2xl rounded-full p-1 w-150 flex justify-between">
            <button className="bg-gray-100 p-1 rounded-full w-20">Home</button>
            <button className="bg-transparent rounded-full">Buat Jadwal</button>
            <button className="bg-transparent rounded-full">Dokumentasi</button>
            <button className="bg-transparent rounded-full w-20">Absensi</button>
        </div> 
    </div>
    )
}

function Ekskul(){
    return(
        <div className="flex flex-col pt-30 gap-3">
            <h1 className="text-4xl font-extrabold flex justify-center">Ekskul SMKN10 Jakarta</h1>
            <h3 className="text-2xl font-semibold flex justify-center">Selamat Datang [Nama]</h3>

            <div className=""></div>

        </div>
    )
}


export default function Home(){
    return(
        <div className="h-screen bg-white">
            <Navbar />
            <Ekskul />
        </div>
     )
}