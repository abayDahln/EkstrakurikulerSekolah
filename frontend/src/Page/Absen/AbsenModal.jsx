import React, { useState, useEffect} from "react";
import { motion } from "framer-motion";

export function ModalTambahAbsen({ isOpen, onClose, onSubmit }) {
    const [nama, setNama] = useState("");
    const [tanggal, setTanggal] = useState("");
    const [status, setStatus] = useState("");

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newData = { nama, tanggal, status };
        await onSubmit(newData);
        setNama("");
        setTanggal("");
        setStatus("");
        onClose();
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" >
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-2xl p-6 w-96">

                <h2 className="text-xl font-bold mb-4 text-center">Tambah Data Absen</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        type="text"
                        placeholder="Nama"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required />
                    <input
                        type="date"
                        value={tanggal}
                        onChange={(e) => setTanggal(e.target.value)}
                        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required />
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required >
                        <option value="">Pilih Status</option>
                        <option value="Hadir">Hadir</option>
                        <option value="Absen">Absen</option>
                        <option value="Izin">Izin</option>
                    </select>

                    <div className="flex justify-between mt-4">
                        <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition">Batal</button>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">Simpan</button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
}
