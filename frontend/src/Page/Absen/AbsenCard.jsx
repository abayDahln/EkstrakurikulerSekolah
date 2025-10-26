import React, { useState, useEffect} from "react";
import { motion } from "framer-motion";
import { ModalTambahAbsen } from "./AbsenModal";
import { CirclePlus } from "lucide-react";

export function Card() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataAbsen, setDataAbsen] = useState([]);

    const API_URL = "http://localhost:5000/api/absensi";

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await fetch(API_URL);
            const json = await res.json();
            setDataAbsen(json);
        } catch (error) {
            console.error("Gagal memuat data:", error);
        }
    };

    const handleAddAbsen = async (newData) => {
        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newData),
            });
            const result = await res.json();
            setDataAbsen((prev) => [...prev, result]);
        } catch (error) {
            console.error("Gagal menambahkan data:", error);
        }
    };

    return (
        <motion.div
            initial={{ y: 1000, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="bg-white rounded-xl w-full max-w-4xl min-h-fit shadow-2xl mx-4">
            <div className="flex justify-between pl-4 pr-4 pt-4 text-center">
                <span className="font-bold text-xl">Data Absen</span>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-24 text-sm h-8 sm:w-40 bg-yellow-300 sm:text-xl font-bold rounded-lg flex justify-center items-center gap-1 sm:gap-2 hover:bg-yellow-400 transition duration-200">
                    <CirclePlus color="#4b87b4" strokeWidth={3} />Tambah
                </button>
            </div>

            <div className="p-4 overflow-x-auto">
                <table className="min-w-full border border-gray-200 divide-y divide-gray-200 shadow-md rounded-lg">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase border-r">No</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase border-r">Nama</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase border-r">Tanggal</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {dataAbsen.length > 0 ? (
                            dataAbsen.map((item, index) => (
                                <tr key={item.id || index}>
                                    <td className="px-6 py-4 text-sm text-gray-900 border-r">{index + 1}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900 border-r">{item.nama}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900 border-r">{item.tanggal}</td>
                                    <td className="px-6 py-4 text-sm font-medium">{item.status}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-4 text-gray-500">Belum ada data</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <ModalTambahAbsen
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddAbsen}
            />
        </motion.div>
    );
}