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
            <button onClick={jadwal} className="text-xs sm:text-base bg-yellow-200 p-1 rounded-full">Buat Jadwal</button>
            <button onClick={dokum} className="text-xs sm:text-base bg-transparent rounded-full">Dokumentasi</button>
            <button onClick={absensi} className="text-xs sm:text-base bg-transparent rounded-full w-20">Absensi</button>
        </div> 
    </motion.div>
    )
}

function Formulir(){
    return(
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 mt-20 px-10 pb-10">
          
          <motion.div 
          initial={{ x: -200, opacity: 0}}
          animate={{ x: 0, opacity: 1}}
          transition={{ duration: 1.4, ease: "easeOut"}}
          className="flex-1 flex flex-col justify-center text-center md:text-left">
            <h3 className="text-3xl font-extrabold mb-4 text-gray-800">
              Atur Jadwal Ekstrakurikermu dengan Mudah!
            </h3>
            <p className="text-white font-semibold leading-relaxed">
              Pastikan setiap kegiatan ekstrakurikuler berjalan teratur tanpa bentrok dengan yang lain. 
              Isi form di samping untuk membuat, mengedit, atau mengatur jadwal ekskul sesuai kebutuhan.
            </p>
          </motion.div>

          <motion.div 
          initial={{ x: 200, opacity: 0}}
          animate={{ x: 0, opacity: 1}}
          transition={{ duration: 1.4, ease: "easeOut"}}
          className="flex-1 bg-gray-50 rounded-2xl shadow-2xl p-8 flex flex-col justify-center">
            <form className="space-y-6">
              <div>
                <p className="font-bold mb-1">Nama Kegiatan</p>
                <input 
                  type="text"
                  placeholder="Masukkan Nama Kegiatan"
                  className="bg-gray-100 rounded w-full sm:h-10 p-2 text-center shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"/>
              </div>
              <div>
                <p className="font-bold mb-1">Tanggal</p>
                <input 
                  type="date"
                  className="bg-gray-100 rounded w-full sm:h-10 p-2 text-center shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"/>
              </div>
              <div>
                <p className="font-bold mb-1">Jam</p>
                <input 
                  type="text"
                  placeholder="Jam dilaksanakan"
                  className="bg-gray-100 rounded w-full sm:h-10 p-2 text-center shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"/>
              </div>

              <div className="flex justify-center">
                <button 
                  type="submit" 
                  className="bg-blue-400 hover:bg-blue-500 transition text-white font-semibold rounded shadow-lg w-full sm:w-40 p-2">
                  Buat Jadwal
                </button>
              </div>
            </form>
          </motion.div>
        </div>

    )
}

export default function Jadwal(){
    return(
        <div className="h-screen bg-blue-300">
            <Navbar />
            <Formulir />

        </div>
     )
}