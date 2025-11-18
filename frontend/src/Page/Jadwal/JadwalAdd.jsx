import React, { useState, useEffect } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { getToken } from "../../utils/utils";

const API_BASE = "http://localhost:5000/api/pembina";

const Input = ({ className = "", ...props }) => (
  <input
    {...props}
    className={`w-full h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm text-gray-700 ${className}`}
  />
);

export function ScheduleManager() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    tanggal: "",
    location: "",
  });

  const [ekskulList, setEkskulList] = useState([]);
  const [selectedEkskul, setSelectedEkskul] = useState("");
  const [jadwalList, setJadwalList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const token = getToken();

  useEffect(() => {
    if (!token) return;

    const fetchEkskul = async () => {
      try {
        const res = await fetch(`${API_BASE}/my-extracurricular`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();

        if (json.status === 200) {
          setEkskulList(json.data);
          if (json.data.length > 0 && !selectedEkskul)
            setSelectedEkskul(String(json.data[0].id));
        } else {
          setFeedback({ type: "error", message: "Gagal memuat daftar ekskul." });
        }
      } catch {
        setFeedback({ type: "error", message: "Gagal terhubung ke server." });
      }
    };
    fetchEkskul();
  }, [token]);

  const fetchJadwal = async () => {
    try {
      const res = await fetch(`${API_BASE}/schedule`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();

      if (json.status === 200 && Array.isArray(json.data)) {
        const today = new Date();
        const filtered = json.data
          .filter((j) => {
            const jadwalDate = new Date(j.scheduleDate);
            return jadwalDate >= new Date(today.setHours(0, 0, 0, 0));
          })
          .sort((a, b) => new Date(a.scheduleDate) - new Date(b.scheduleDate));

        const finalList = selectedEkskul
          ? filtered.filter(
              (j) => j.extracurricular.id === parseInt(selectedEkskul)
            )
          : filtered;

        setJadwalList(finalList);
      } else setJadwalList([]);
    } catch {
      setJadwalList([]);
    }
  };

  useEffect(() => {
    if (token) fetchJadwal();
  }, [token, selectedEkskul]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFeedback(null);

    try {
      const res = await fetch(`${API_BASE}/schedule`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          extracuriculaId: parseInt(selectedEkskul),
          title: form.title,
          description: form.description,
          scheduleDate: form.tanggal,
          location: form.location,
        }),
      });

      const data = await res.json();
      if (res.ok && (data.status === 200 || data.status === 201)) {
        setFeedback({ type: "success", message: "Jadwal berhasil dibuat!" });
        setForm({ title: "", description: "", tanggal: "", location: "" });
        fetchJadwal(); 
      } else throw new Error(data.message || "Gagal membuat jadwal.");
    } catch (err) {
      setFeedback({ type: "error", message: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl px-4 md:px-0 mx-auto">
      <motion.div
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white rounded-2xl w-full md:w-1/2 shadow-xl p-6"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Buat Jadwal Baru
        </h2>

        {feedback && (
          <div
            className={`p-3 mb-4 rounded-xl flex items-center gap-2 ${
              feedback.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {feedback.type === "success" ? <CheckCircle /> : <XCircle />}
            <span>{feedback.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <select
            value={selectedEkskul}
            onChange={(e) => setSelectedEkskul(e.target.value)}
            className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">
              {ekskulList.length === 0 ? "Memuat Ekskul..." : "-- Pilih Ekskul --"}
            </option>
            {ekskulList.map((ex) => (
              <option key={ex.id} value={ex.id}>
                {ex.name}
              </option>
            ))}
          </select>

          <Input
            placeholder="Nama Kegiatan"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <textarea
            placeholder="Deskripsi kegiatan"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full h-24 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
          <Input
            type="datetime-local"
            value={form.tanggal}
            onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
          />
          <Input
            placeholder="Lokasi Kegiatan"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
          >
            {isLoading ? "Menyimpan..." : "Buat Jadwal"}
          </button>
        </form>
      </motion.div>

      <motion.div
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white rounded-2xl w-full md:w-1/2 shadow-xl p-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Jadwal Ekskul yang Akan Datang
        </h2>

        <div className="max-h-[500px] overflow-y-auto">
          {jadwalList.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {jadwalList.map((jadwal) => {
                const jadwalDate = new Date(jadwal.scheduleDate);
                const isToday =
                  jadwalDate.toDateString() === new Date().toDateString();

                return (
                  <li key={jadwal.id} className="py-3 px-2">
                    <strong className="text-blue-600">{jadwal.title}</strong>{" "}
                    {isToday && (
                      <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full ml-1">
                        Hari Ini
                      </span>
                    )}
                    <p className="text-sm text-gray-600">
                      {new Date(jadwal.scheduleDate).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}{" "}
                    </p>
                    <p className="text-sm text-gray-500">{jadwal.location}</p>
                    <p className="text-xs text-gray-400 italic">
                      {jadwal.extracurricular?.name}
                    </p>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-center text-gray-500 py-6">
              Tidak ada jadwal yang akan datang.
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
