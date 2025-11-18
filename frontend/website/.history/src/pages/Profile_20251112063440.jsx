import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiAward, FiCalendar, FiUsers, FiTrendingUp, FiArrowLeft, FiTarget, FiCheckCircle } from "react-icons/fi";
import Sidebar form 

// Skeleton Component
const SkeletonProfile = ({ darkMode }) => (
  <div className="space-y-6">
    <div className={`h-32 w-32 rounded-full animate-pulse mx-auto ${darkMode ? 'bg-slate-700' : 'bg-slate-200'}`} />
    <div className={`h-6 w-48 rounded animate-pulse mx-auto ${darkMode ? 'bg-slate-700' : 'bg-slate-200'}`} />
    <div className={`h-4 w-64 rounded animate-pulse mx-auto ${darkMode ? 'bg-slate-700' : 'bg-slate-200'}`} />
  </div>
);


// Main User Profile Component
const UserProfile = ({ darkMode, userId = 4 }) => {
  const [activeMenu, setActiveMenu] = useState(6); // Default ke menu Profile
  const [profileData, setProfileData] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isServerDown, setIsServerDown] = useState(false);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:5000";
  const intervalRef = useRef(null);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      
      if (!token) {
        console.error("Token tidak ditemukan");
        setIsServerDown(true);
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_URL}/api/profile/${userId}`, { 
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.status === 200 && result.data) {
        setProfileData(result.data);
        setIsServerDown(false);
      } else {
        throw new Error(result.message || "Data tidak valid");
      }
      
    } catch (error) {
      console.error("Error fetching profile data:", error);
      setIsServerDown(true);
      setProfileData(null);
    } finally {
      setLoading(false);
      if (isInitialLoad) setIsInitialLoad(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
    
    // Polling setiap 30 detik untuk update data
    intervalRef.current = setInterval(fetchProfileData, 30000);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [userId]);

  const handleBack = () => {
    window.history.back();
  };

  const AnimatedWrapper = ({ children, delay = 0 }) => 
    !isInitialLoad ? children : (
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay }}>
        {children}
      </motion.div>
    );

  // Validasi role dengan lebih robust
  const isPembina = profileData?.role === 'pembina';
  const isSiswa = profileData?.role === 'siswa';

  // Data fallback untuk menghindari error
  const activityStats = profileData?.activityStats || {};
  const extracurriculars = profileData?.extracurriculars || [];
  const managedExtracurriculars = profileData?.managedExtracurriculars || [];

  if (loading) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-slate-900" : "bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50"
      }`} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <Sidebar darkMode={darkMode} activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
        <div className="transition-all duration-300" style={{ marginLeft: "280px" }}>
          <div className="p-8">
            <div className="max-w-5xl mx-auto">
              <SkeletonProfile darkMode={darkMode} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isServerDown || !profileData) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-slate-900" : "bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50"
      }`} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <Sidebar darkMode={darkMode} activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
        <div className="transition-all duration-300" style={{ marginLeft: "280px" }}>
          <div className="p-8">
            <div className="max-w-5xl mx-auto text-center">
              <div className={`p-8 rounded-2xl ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
                <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  Gagal memuat data profil
                </h2>
                <p className={`mb-4 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Terjadi kesalahan saat memuat data pengguna.
                </p>
                <button
                  onClick={fetchProfileData}
                  className={`px-4 py-2 rounded-lg font-semibold ${
                    darkMode 
                      ? 'bg-sky-600 hover:bg-sky-700 text-white' 
                      : 'bg-sky-500 hover:bg-sky-600 text-white'
                  }`}
                >
                  Coba Lagi
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? "bg-slate-900" : "bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50"
    }`} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Sidebar darkMode={darkMode} activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      <div className="transition-all duration-300" style={{ marginLeft: "280px" }}>
        <div className="p-8">
          <div className="max-w-5xl mx-auto">
            {/* Back Button */}
            <button
              onClick={handleBack}
              className={`flex items-center gap-2 mb-6 px-4 py-2 rounded-lg transition-colors ${
                darkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-600'
              }`}
            >
              <FiArrowLeft className="text-xl" />
              <span className="font-semibold">Kembali</span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Card */}
              <AnimatedWrapper>
                <div className={`rounded-2xl shadow-lg p-6 ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
                  <div className="text-center">
                    <img
                      src={`${API_URL}/${profileData.profileUrl}`}
                      alt={profileData.name}
                      className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-sky-500 mb-4"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profileData.name)}&background=0ea5e9&color=fff&size=128`;
                      }}
                    />

                    <h2 className={`text-2xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      {profileData.name}
                    </h2>
                    <p className={`text-sm mb-4 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      {profileData.email}
                    </p>

                    <div className={`inline-block px-4 py-2 rounded-full font-semibold ${
                      isPembina
                        ? darkMode ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-100 text-purple-600'
                        : darkMode ? 'bg-sky-900/50 text-sky-300' : 'bg-sky-100 text-sky-600'
                    }`}>
                      <FiAward className="inline mr-1 mb-1" />
                      {isPembina ? 'Pembina' : 'Siswa'}
                    </div>

                    <div className={`mt-6 pt-6 border-t ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
                      <p className={`text-xs flex items-center justify-center gap-1 mb-1 ${
                        darkMode ? 'text-slate-500' : 'text-slate-400'
                      }`}>
                        <FiCalendar className="text-xs" />
                        Bergabung sejak
                      </p>
                      <p className={`font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        {profileData.createdAt ? new Date(profileData.createdAt).toLocaleDateString('id-ID', { 
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric' 
                        }) : 'Tidak tersedia'}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedWrapper>

              {/* Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Info Card */}
                <AnimatedWrapper delay={0.1}>
                  <div className={`rounded-2xl shadow-lg p-6 ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
                    <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      Informasi Pribadi
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className={`block text-sm font-semibold mb-2 flex items-center gap-2 ${
                          darkMode ? 'text-slate-400' : 'text-slate-500'
                        }`}>
                          <FiUser /> Nama Lengkap
                        </label>
                        <p className={`text-lg ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                          {profileData.name}
                        </p>
                      </div>

                      <div>
                        <label className={`block text-sm font-semibold mb-2 flex items-center gap-2 ${
                          darkMode ? 'text-slate-400' : 'text-slate-500'
                        }`}>
                          <FiMail /> Email
                        </label>
                        <p className={`text-lg ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                          {profileData.email}
                        </p>
                      </div>

                      <div>
                        <label className={`block text-sm font-semibold mb-2 flex items-center gap-2 ${
                          darkMode ? 'text-slate-400' : 'text-slate-500'
                        }`}>
                          <FiAward /> Role
                        </label>
                        <p className={`text-lg capitalize ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                          {profileData.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </AnimatedWrapper>

                {/* Statistics - Different for Pembina & Siswa */}
                <AnimatedWrapper delay={0.2}>
                  <div className={`rounded-2xl shadow-lg p-6 ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
                    <h3 className={`text-xl font-bold mb-6 flex items-center gap-2 ${
                      darkMode ? 'text-white' : 'text-slate-900'
                    }`}>
                      <FiTrendingUp /> Statistik Aktivitas
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                      {isPembina ? (
                        <>
                          {/* Pembina Stats */}
                          <div className={`p-4 rounded-xl ${darkMode ? 'bg-slate-700/50' : 'bg-slate-50'}`}>
                            <div className="flex items-center gap-2 mb-2">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                darkMode ? 'bg-sky-900/50' : 'bg-sky-100'
                              }`}>
                                <FiTarget className="text-lg text-sky-500" />
                              </div>
                            </div>
                            <p className={`text-2xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                              {activityStats.totalManagedExtracurriculars || 0}
                            </p>
                            <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                              Ekskul Dikelola
                            </p>
                          </div>

                          <div className={`p-4 rounded-xl ${darkMode ? 'bg-slate-700/50' : 'bg-slate-50'}`}>
                            <div className="flex items-center gap-2 mb-2">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                darkMode ? 'bg-purple-900/50' : 'bg-purple-100'
                              }`}>
                                <FiCalendar className="text-lg text-purple-500" />
                              </div>
                            </div>
                            <p className={`text-2xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                              {activityStats.totalSchedulesCreated || 0}
                            </p>
                            <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                              Jadwal Dibuat
                            </p>
                          </div>

                          <div className={`p-4 rounded-xl ${darkMode ? 'bg-slate-700/50' : 'bg-slate-50'}`}>
                            <div className="flex items-center gap-2 mb-2">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                darkMode ? 'bg-green-900/50' : 'bg-green-100'
                              }`}>
                                <FiUsers className="text-lg text-green-500" />
                              </div>
                            </div>
                            <p className={`text-2xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                              {activityStats.totalStudents || 0}
                            </p>
                            <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                              Total Siswa
                            </p>
                          </div>

                          <div className={`p-4 rounded-xl ${darkMode ? 'bg-slate-700/50' : 'bg-slate-50'}`}>
                            <div className="flex items-center gap-2 mb-2">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                darkMode ? 'bg-orange-900/50' : 'bg-orange-100'
                              }`}>
                                <span className="text-lg">⏰</span>
                              </div>
                            </div>
                            <p className={`text-2xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                              {activityStats.upcomingSchedules || 0}
                            </p>
                            <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                              Jadwal Mendatang
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Siswa Stats */}
                          <div className={`p-4 rounded-xl ${darkMode ? 'bg-slate-700/50' : 'bg-slate-50'}`}>
                            <div className="flex items-center gap-2 mb-2">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                darkMode ? 'bg-sky-900/50' : 'bg-sky-100'
                              }`}>
                                <FiTarget className="text-lg text-sky-500" />
                              </div>
                            </div>
                            <p className={`text-2xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                              {activityStats.joinedExtracurriculars || 0}
                            </p>
                            <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                              Ekskul Diikuti
                            </p>
                          </div>

                          <div className={`p-4 rounded-xl ${darkMode ? 'bg-slate-700/50' : 'bg-slate-50'}`}>
                            <div className="flex items-center gap-2 mb-2">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                darkMode ? 'bg-yellow-900/50' : 'bg-yellow-100'
                              }`}>
                                <span className="text-lg">⭐</span>
                              </div>
                            </div>
                            <p className={`text-2xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                              {activityStats.totalPoints || 0}
                            </p>
                            <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                              Total Poin
                            </p>
                          </div>

                          <div className={`p-4 rounded-xl ${darkMode ? 'bg-slate-700/50' : 'bg-slate-50'}`}>
                            <div className="flex items-center gap-2 mb-2">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                darkMode ? 'bg-green-900/50' : 'bg-green-100'
                              }`}>
                                <FiCheckCircle className="text-lg text-green-500" />
                              </div>
                            </div>
                            <p className={`text-2xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                              {activityStats.totalAttendances || 0}
                            </p>
                            <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                              Kehadiran
                            </p>
                          </div>

                          <div className={`p-4 rounded-xl ${darkMode ? 'bg-slate-700/50' : 'bg-slate-50'}`}>
                            <div className="flex items-center gap-2 mb-2">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                darkMode ? 'bg-purple-900/50' : 'bg-purple-100'
                              }`}>
                                <span className="text-lg">📝</span>
                              </div>
                            </div>
                            <p className={`text-2xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                              {activityStats.totalReports || 0}
                            </p>
                            <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                              Laporan
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </AnimatedWrapper>

                {/* Ekstrakurikuler List */}
                <AnimatedWrapper delay={0.3}>
                  <div className={`rounded-2xl shadow-lg p-6 ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
                    <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      {isPembina ? 'Ekstrakurikuler yang Dikelola' : 'Ekstrakurikuler yang Diikuti'}
                    </h3>

                    <div className="space-y-4">
                      {(isPembina ? managedExtracurriculars : extracurriculars)?.length > 0 ? (
                        (isPembina ? managedExtracurriculars : extracurriculars).map((ekskul) => (
                          <div
                            key={ekskul.id}
                            className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                              darkMode ? 'bg-slate-700/50 hover:bg-slate-700' : 'bg-slate-50 hover:bg-slate-100'
                            }`}
                          >
                            <img
                              src={`${API_URL}/${ekskul.imageUrl}`}
                              alt={ekskul.name}
                              className="w-16 h-16 rounded-xl object-cover"
                              onError={(e) => {
                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(ekskul.name)}&background=0ea5e9&color=fff&size=64`;
                              }}
                            />
                            <div className="flex-1">
                              <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                                {ekskul.name}
                              </h4>
                              <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                {ekskul.description}
                              </p>
                              
                              {isPembina ? (
                                <div className="flex gap-3 mt-2">
                                  <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
                                    darkMode ? 'bg-sky-900/50 text-sky-300' : 'bg-sky-100 text-sky-600'
                                  }`}>
                                    <FiUsers className="text-xs" />
                                    {ekskul.totalMembers || 0} anggota
                                  </span>
                                  <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
                                    darkMode ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-100 text-purple-600'
                                  }`}>
                                    <FiCalendar className="text-xs" />
                                    {ekskul.totalSchedules || 0} jadwal
                                  </span>
                                </div>
                              ) : (
                                <div className="flex gap-3 mt-2">
                                  <span className={`text-xs px-2 py-1 rounded-full ${
                                    darkMode ? 'bg-yellow-900/50 text-yellow-300' : 'bg-yellow-100 text-yellow-600'
                                  }`}>
                                    ⭐ {ekskul.totalPoints || 0} poin
                                  </span>
                                  <span className={`text-xs px-2 py-1 rounded-full capitalize ${
                                    ekskul.status === 'active'
                                      ? darkMode ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-600'
                                      : darkMode ? 'bg-gray-900/50 text-gray-300' : 'bg-gray-100 text-gray-600'
                                  }`}>
                                    {ekskul.status || 'unknown'}
                                  </span>
                                  <span className={`text-xs px-2 py-1 rounded-full ${
                                    darkMode ? 'bg-sky-900/50 text-sky-300' : 'bg-sky-100 text-sky-600'
                                  }`}>
                                    📅 Bergabung: {ekskul.joinDate ? new Date(ekskul.joinDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Tidak tersedia'}
                                  </span>
                                </div>
                              )}

                              {!isPembina && ekskul.pembina && (
                                <div className={`mt-2 text-xs ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                                  👨‍🏫 Pembina: {ekskul.pembina.name}
                                </div>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className={`text-center py-8 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                          {isPembina 
                            ? 'Belum mengelola ekstrakurikuler' 
                            : 'Belum mengikuti ekstrakurikuler'
                          }
                        </div>
                      )}
                    </div>
                  </div>
                </AnimatedWrapper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;