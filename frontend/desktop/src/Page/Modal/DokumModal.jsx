import React, { useState, useEffect } from "react";
import { getToken } from "../../utils/utils";

export default function DokumModal({ isOpen, onClose }) {
  const [scheduleId, setScheduleId] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [scheduleList, setScheduleList] = useState([]);

  const token = getToken();

  useEffect(() => {
    if (isOpen) fetchSchedules();
  }, [isOpen]);

  const fetchSchedules = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/pembina/schedule", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (json.status === 200) {
        setScheduleList(json.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !scheduleId || !title) {
      alert("Semua field wajib diisi!");
      return;
    }

    const formData = new FormData();
    formData.append("File", file);
    formData.append("ScheduleId", scheduleId);
    formData.append("Title", title);

    try {
      const res = await fetch("http://localhost:5000/api/pembina/documentation", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const json = await res.json();

      if (json.status === 201) {
        alert("Berhasil upload dokumentasi!");
        onClose();
      } else {
        alert(json.message || "Gagal upload dokumentasi");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat upload dokumentasi");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-[999]">
      <div className="bg-white rounded-xl shadow-lg w-[380px]">
        <div className="rounded-tl-xl rounded-tr-xl p-3 bg-blue-500">
            <h2 className="text-xl font-semibold text-center text-white">Upload Dokumentasi</h2>
        </div>
        <div className="p-3">
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-medium pt-3 pl-3">Pilih Jadwal</label>
          <select
            value={scheduleId}
            onChange={(e) => setScheduleId(e.target.value)}
            className="w-full border rounded-lg p-2 mb-4"
            required >
            <option value="">-- Pilih Jadwal --</option>
            {scheduleList.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title} — {new Date(item.scheduleDate).toLocaleDateString()}
              </option>
            ))}
          </select>

          <label className="block mb-2 font-medium">Judul Dokumentasi</label>
          <input
            type="text"
            className="w-full border rounded-lg p-2 mb-4"
            placeholder="Contoh: Kegiatan Latihan Hari Ini"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required />
          <label className="block mb-2 font-medium">Upload Foto</label>
          <input
            type="file"
            className="w-full mb-4 bg-gray-200 rounded-lg border py-1 px-3"
            accept=".jpg,.jpeg,.png"
            onChange={(e) => setFile(e.target.files[0])}
            required />
          <div className="flex justify-end p-3">
            <button
              type="button"
              className="px-4 py-2 mr-2 rounded-lg bg-gray-300"
              onClick={onClose} >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white" >
              Upload
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
}
