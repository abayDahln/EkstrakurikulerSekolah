import React from "react";
import { motion } from "framer-motion";

export function Card(){
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