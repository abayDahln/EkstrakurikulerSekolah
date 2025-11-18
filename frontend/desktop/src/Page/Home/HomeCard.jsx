import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getToken } from "../../utils/utils";

const API_URL = "http://localhost:5000/api/profile";

export function Card() {
  const token = getToken();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        if (json.status === 200) {
          setProfile(json.data);
        }
      } catch (error) {
        console.error("Gagal memuat profil");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-blue-600 text-xl font-semibold">
        Memuat data...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600 text-lg font-semibold">
        Gagal memuat profil.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="mt-15 mb-15 sm:mt-10 sm:mb-10  rounded-xl bg-gradient-to-br from-blue-500 to-blue-400 text-white px-6 py-16"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold drop-shadow-lg">
          Selamat Datang, <span className="text-yellow-300">{profile.name}</span> 👋
        </h1>
        <p className="text-lg mt-3 opacity-90">
          Ini adalah halaman utama aplikasi <b>EkskulHub</b>
        </p>
      </div>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white text-gray-800 rounded-2xl shadow-2xl max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 p-8"
      >
        <div className="flex-shrink-0">
          <img
            src={`http://localhost:5000/${profile.profileUrl}`}
            alt={profile.name}
            className="w-36 h-36 rounded-full object-cover border-4 border-blue-500 shadow-lg"
            onError={(e) => (e.target.src = "/default-avatar.png")}
          />
        </div>

        
        <div className="flex flex-col justify-center text-center md:text-left gap-3">
          <h2 className="text-2xl font-bold text-blue-700">{profile.name}</h2>

          <p className="bg-blue-100 text-blue-700 inline-block px-4 py-1 rounded-full font-medium capitalize w-fit mx-auto md:mx-0">
            {profile.role}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-3 mt-2">
            <p className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium capitalize w-fit mx-auto md:mx-0">
              Total Ekskul: {profile.activityStats.totalManagedExtracurriculars}
            </p>
            <p className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium capitalize w-fit mx-auto md:mx-0">
              Total Jadwal Dibuat: {profile.activityStats.totalSchedulesCreated}
            </p>
            <p className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium capitalize w-fit mx-auto md:mx-0">
              Total Absensi: {profile.activityStats.totalAttendanceRecords}
            </p>
            <p className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium capitalize w-fit mx-auto md:mx-0">
              Total Jadwal Mendatang: {profile.activityStats.upcomingSchedules}
            </p>
          </div>
        </div>

      </motion.div>

      {profile.managedExtracurriculars.length > 0 && (
        <div className="mt-16 max-w-5xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-8">Ekskul yang Dikelola</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {profile.managedExtracurriculars.map((ex) => (
              <motion.div
                key={ex.id}
                whileHover={{ scale: 1.05 }}
                className="bg-white text-gray-800 p-5 rounded-2xl shadow-xl flex flex-col items-center text-center"
              >
                <img
                  src={`http://localhost:5000/${ex.imageUrl}`}
                  alt={ex.name}
                  className="w-32 h-32 object-cover rounded-xl mb-4"
                  onError={(e) => (e.target.src = "/default-eksul.jpg")}
                />
                <h4 className="text-xl font-semibold text-blue-700">{ex.name}</h4>
                <p className="text-gray-600 text-sm mt-2 line-clamp-2">{ex.description}</p>
                <div className="mt-4 text-sm text-gray-700">
                  <p>👥 {ex.totalMembers} anggota</p>
                  <p>📅 {ex.totalSchedules} jadwal</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}