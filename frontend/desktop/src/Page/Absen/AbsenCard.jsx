import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getToken } from "../../utils/utils";

const API_URL = "http://localhost:5000/api/pembina";
const DEFAULT_AVATAR = "/orang.png";

export function Card() {
  const token = getToken();

  const [feedback, setFeedback] = useState(null);
  const [EkskulList, setEkskulList] = useState([]);
  const [ScheduleList, setScheduleList] = useState([]);

  const [selectedEkskul, setSelectedEkskul] = useState("");
  const [selectedSchedule, setSelectedSchedule] = useState("");

  const [attendance, setAttendance] = useState([]);
  const [summary, setSummary] = useState(null);

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
            setSelectedEkskul(String(json.data.ekskulList[0].id));
          }
        } else {
          setFeedback({ type: "error", message: "Gagal memuat daftar ekskul." });
        }
      } catch {
        setFeedback({ type: "error", message: "Gagal terhubung ke server." });
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
            (item) => item.extracurricular?.id === parseInt(selectedEkskul)
          );
          setScheduleList(filtered);

          if (filtered.length > 0) {
            setSelectedSchedule(String(filtered[filtered.length - 1].id));
          } else {
            setSelectedSchedule("");
          }
        } else {
          setScheduleList([]);
        }
      } catch {
        setFeedback({
          type: "error",
          message: "Gagal memuat daftar jadwal.",
        });
      }
    };

    fetchSchedule();
  }, [selectedEkskul, token]);

  useEffect(() => {
    if (!selectedSchedule) return;

    const fetchAbsen = async () => {
      try {
        const res = await fetch(`${API_URL}/schedule/${selectedSchedule}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();

        if (json.status === 200) {
          setAttendance(json.data.attendanceData || []);
          setSummary(json.data.attendanceSummary || null);
        } else {
          setFeedback({
            type: "error",
            message: "Gagal memuat data absensi.",
          });
        }
      } catch {
        setFeedback({
          type: "error",
          message: "Gagal terhubung ke server.",
        });
      }
    };

    fetchAbsen();
  }, [selectedSchedule, token]);

  return (
    <motion.div
      initial={{ y: 1000, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.4, ease: "easeOut" }}
      className="bg-white rounded-xl w-full max-w-4xl min-h-fit shadow-2xl mx-auto"
    >
      <div className="flex flex-col sm:flex-row justify-between items-center px-4 pt-4 gap-3">
        <span className="font-bold text-xl">Data Absen</span>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full"
            value={selectedEkskul}
            onChange={(e) => setSelectedEkskul(e.target.value)}
          >
            {EkskulList.length > 0 ? (
              EkskulList.map((ex) => (
                <option key={ex.id} value={ex.id}>
                  {ex.name}
                </option>
              ))
            ) : (
              <option value="">Memuat Ekskul...</option>
            )}
          </select>

          <select
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full"
            value={selectedSchedule}
            onChange={(e) => setSelectedSchedule(e.target.value)}
          >
            {ScheduleList.length > 0 ? (
              ScheduleList.slice().reverse().map((e) => (
                <option key={e.id} value={e.id}>
                  {new Date(e.scheduleDate).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}{" "}
                  - {e.title}
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
          className={`mx-4 mt-3 p-3 rounded-lg text-sm ${
            feedback.type === "error"
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {feedback.message}
        </div>
      )}

      {summary && (
        <div className="flex flex-wrap justify-around items-center p-4 text-sm font-medium text-gray-700">
          <div>Total Anggota: {summary.totalMembers}</div>
          <div>Hadir: {summary.present}</div>
          <div>Sakit: {summary.sick}</div>
          <div>Izin: {summary.izin}</div>
          <div>Alfa: {summary.alpha}</div>
        </div>
      )}

      <div className="p-4 overflow-x-auto">
        <table className="min-w-full border border-gray-200 divide-y divide-gray-200 shadow-md rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase border-r">
                No
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase border-r">
                Nama
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase border-r">
                Waktu Absen
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200 text-center">
            {attendance.length > 0 ? (
              attendance.map((item, idx) => (
                <tr key={item.memberId}>
                  <td className="px-4 py-3 border-r">{idx + 1}</td>

                  <td className="px-4 py-3 border-r text-left">
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          item.profileUrl
                            ? `http://localhost:5000/${item.profileUrl}`
                            : DEFAULT_AVATAR
                        }
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = DEFAULT_AVATAR;
                        }}
                        className="rounded-full w-10 h-10 hidden sm:block"
                        alt="profile" />
                      <span className="whitespace-normal break-words text-sm">
                        {item.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-3 border-r text-left">
                    {item.attendanceTime
                      ? new Date(item.attendanceTime).toLocaleTimeString(
                          "id-ID",
                          { hour: "2-digit", minute: "2-digit" }
                        )
                      : "-"}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.status === "hadir"
                          ? "bg-green-100 text-green-700"
                          : item.status === "sakit"
                          ? "bg-yellow-100 text-yellow-700"
                          : item.status === "izin"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-4 text-gray-500">
                  Tidak ada data absensi.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
