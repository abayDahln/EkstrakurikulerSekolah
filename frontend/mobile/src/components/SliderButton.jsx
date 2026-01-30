import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { ChevronRight, Loader2 } from "lucide-react";

const SliderButton = ({
    onConfirm,
    isLoading,
    disabled,
    text = "Konfirmasi Kehadiran",
    darkMode,
    successText = "Memproses..."
}) => {
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [maxWidth, setMaxWidth] = useState(0);
    const containerRef = useRef(null);
    const x = useMotionValue(0);

    useEffect(() => {
        if (containerRef.current) {
            setMaxWidth(containerRef.current.offsetWidth - 56 - 8);
        }
    }, []);

    const opacity = useTransform(x, [0, maxWidth * 0.5], [1, 0]);

    const handleDragEnd = async (event, info) => {
        if (disabled || isLoading) {
            animate(x, 0, { type: "spring", stiffness: 300, damping: 30 });
            return;
        }

        const currentX = x.get();
        if (currentX > maxWidth * 0.5) {
            await animate(x, maxWidth, { type: "spring", stiffness: 400, damping: 40 });
            setIsConfirmed(true);
            onConfirm();
        } else {
            // Snap back to start
            animate(x, 0, { type: "spring", stiffness: 300, damping: 30 });
        }
    };

    useEffect(() => {
        if (!isLoading && isConfirmed) {
            const timer = setTimeout(() => {
                setIsConfirmed(false);
                x.set(0);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [isLoading, isConfirmed, x]);

    useEffect(() => {
        if (disabled) {
            x.set(0);
            setIsConfirmed(false);
        }
    }, [disabled, x]);

    return (
        <div
            ref={containerRef}
            className={`relative w-full h-16 rounded-full p-1 flex items-center overflow-hidden transition-all duration-300 ${disabled
                ? (darkMode ? "bg-slate-800 opacity-50" : "bg-slate-100 opacity-50")
                : isConfirmed
                    ? "bg-emerald-500"
                    : (darkMode ? "bg-slate-800" : "bg-sky-500/80")
                }`}
        >
            <motion.div
                style={{ opacity }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
                <span className="text-white font-bold text-sm tracking-tight opacity-70">
                    {text}
                </span>
            </motion.div>

            <motion.div
                drag={!disabled && !isLoading && !isConfirmed ? "x" : false}
                dragConstraints={{ left: 0, right: maxWidth }}
                dragElastic={0.05}
                dragMomentum={false}
                onDragEnd={handleDragEnd}
                style={{ x }}
                className={`z-10 w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-colors ${isConfirmed
                    ? "bg-white text-emerald-500"
                    : disabled
                        ? (darkMode ? "bg-slate-700 text-slate-500" : "bg-slate-200 text-slate-400")
                        : "bg-white text-sky-500 cursor-grab active:cursor-grabbing"
                    }`}
            >
                {isLoading ? (
                    <Loader2 size={24} className="animate-spin" />
                ) : isConfirmed ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}><ChevronRight size={24} /></motion.div>
                ) : (
                    <ChevronRight size={24} />
                )}
            </motion.div>

            {isConfirmed && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                    <span className="text-white font-black text-sm ml-10">
                        {successText}
                    </span>
                </motion.div>
            )}
        </div>
    );
};

export default SliderButton;
