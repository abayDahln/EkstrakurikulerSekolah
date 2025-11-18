import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getToken } from "../../utils/utils";

const API_URL = "http://localhost:5000/api/pembina";

export function Card() {
  const token = getToken();
  const [EkskulList, setEkskulList] = useState([]);
  const [ScheduleList, setScheduleList] = useState([]);
  const [selectedEkskul, setSelectedEkskul] = useState("");
  const [selectedSchedule, setSelectedSchedule] = useState("");
  const [documentation, setDocumentation] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);

  useEffect(() => {
    const fetchEkskul = async () => {
      try {
        const res = await fetch(`${API_URL}/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        if (json.status === 200) {
          setEkskulList(json.data.ekskulList);
          if (json.data.ekskulList && json.data.ekskulList.length > 0) {
            setEkskulList(json.data.ekskulList);
            setSelectedEkskul(String(json.data.ekskulList[0].id));
          }
        }
      } catch {
        setFeedback({ type: "error", message: "Gagal memuat ekskul." });
      }
    };
    fetchEkskul();
  }, [token]);

  useEffect(() => {
    if (!selectedEkskul) return;

    const fetchSchedule = async () => {
      try {
        const res = await fetch(`${API_URL}/schedule`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();

        if (json.status === 200 && Array.isArray(json.data)) {
          const filtered = json.data.filter(
            (j) => j.extracurricular?.id === parseInt(selectedEkskul)
          );
          setScheduleList(filtered);
          if (filtered.length > 0)
            setSelectedSchedule(String(filtered[filtered.length - 1].id));
        }
      } catch {
        setFeedback({ type: "error", message: "Gagal memuat jadwal." });
      }
    };

    fetchSchedule();
  }, [selectedEkskul, token]);

  useEffect(() => {
    if (!selectedSchedule) return;

    const fetchDocumentation = async () => {
      try {
        const res = await fetch(`${API_URL}/schedule/${selectedSchedule}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();

        if (json.status === 200 && json.data) {
          const docs =
            json.data.documentatioData ||
            json.data.documentationData ||
            [];
          setDocumentation(docs);
        } else {
          setDocumentation([]);
          setFeedback({ type: "error", message: "Tidak ada dokumentasi." });
        }
      } catch {
        setFeedback({
          type: "error",
          message: "Gagal memuat dokumentasi.",
        });
      }
    };

    fetchDocumentation();
  }, [selectedSchedule, token]);

  return (
    <motion.div
      initial={{ y: 1000, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="flex flex-col bg-white rounded-xl w-full max-w-5xl min-h-[200px] shadow-2xl p-4 mx-4 sm:mx-auto"
    >
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-4">
        <span className="font-bold text-xl">Data Dokumentasi</span>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <select
            value={selectedEkskul}
            onChange={(e) => setSelectedEkskul(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none w-full sm:w-auto"
          >
            {EkskulList.length > 0 ? (
              EkskulList.map((ex) => (
                <option key={ex.id} value={ex.id}>
                  {ex.name}
                </option>
              ))
            ) : (
              <option value="">Memuat ekskul...</option>
            )}
          </select>

          <select
            value={selectedSchedule}
            onChange={(e) => setSelectedSchedule(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none w-full sm:w-auto"
          >
            {ScheduleList.length > 0 ? (
              ScheduleList.slice()
                .reverse()
                .map((j) => (
                  <option key={j.id} value={j.id}>
                    {new Date(j.scheduleDate).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}{" "}
                    - {j.title}
                  </option>
                ))
            ) : (
              <option value="">Tidak ada jadwal</option>
            )}
          </select>
        </div>
      </div>

      {feedback && (
        <div
          className={`p-3 mb-4 rounded-lg text-sm ${
            feedback.type === "error"
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {feedback.message}
        </div>
      )}

      <div
        className="
          grid 
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-4 
          overflow-y-auto 
          pb-4
          max-h-[500px]
        "
      >
        {documentation.length > 0 ? (
          documentation.map((doc, index) => (
            <div
              key={doc.id || index}
              className="relative rounded-lg overflow-hidden shadow border-2 border-black group"
            >
              <img
                src={`http://localhost:5000/${doc.fileUrl}`}
                alt={doc.documentationTitle || "Dokumentasi"}
                className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() =>
                  setPreviewImg(`http://localhost:5000/${doc.fileUrl}`)
                }
              />
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-10 col-span-full">
            Tidak ada dokumentasi untuk jadwal ini.
          </div>
        )}
      </div>

      {previewImg && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50"
          onClick={() => setPreviewImg(null)}
        >
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            src={previewImg}
            className="max-w-[90%] max-h-[90%] rounded-lg shadow-2xl border-2 border-white"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </motion.div>
  );
}