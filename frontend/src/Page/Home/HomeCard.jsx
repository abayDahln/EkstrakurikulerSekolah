import React from "react"
import { motion } from "framer-motion"

export function Card(){

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