import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { motion } from "framer-motion";
import { FiUser, FiMail, FiAward, FiCalendar, FiUsers, FiTrendingUp, FiArrowLeft, FiTarget, FiCheckCircle } from "react-icons/fi";
import Sidebar from "../components/Sidebar.jsx"

// Skeleton Component
const SkeletonProfile = ({ darkMode }) => (
  <div className="space-y-6">
    <div className={`h-32 w-32 rounded-full animate-pulse mx-auto ${darkMode ? 'bg-slate-700' : 'bg-slate-200'}`} />
    <div className={`h-6 w-48 rounded animate-pulse mx-auto ${darkMode ? 'bg-slate-700' : 'bg-slate-200'}`} />
  </div>
);



// Main User Profile Component
const UserProfile = ({ darkMode }) => {
  const [activeMenu, setActiveMenu] = useState(4);
  const [profileData, setProfileData] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isServerDown, setIsServerDown] = useState(false);
  const [use]

  const { id } = useParams();
  const API_URL = "http://localhost:5000";
  const intervalRef = useRef(null);

  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/profile/${id}`, { 
        headers: { Authorization: `Bearer ${token}` }
      });
      const result = await response.json();
      
      if (result.status === 200) {
        setProfileData(result.data);
        setIsServerDown(false);
      }
      if (isInitialLoad) setIsInitialLoad(false);
    } catch (error) {
      console.error("Error:", error);
      setIsServerDown(true);
      setProfileData(null);
      if (isInitialLoad) setIsInitialLoad(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
    intervalRef.current = setInterval(fetchProfileData, 1000);
    return () => clearInterval(intervalRef.current);
  }, [id]);

  const handleBack = () => {
    window.history.back();
  };

  const AnimatedWrapper = ({ children, delay = 0 }) => 
    !isInitialLoad ? children : (
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay }}>
        {children}
      </motion.div>
    );

  const isPembina = profileData?.role === 'pembina';

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? "bg-slate-900" : "bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50"
    }`} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Sidebar darkMode={darkMode} activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      <div className="transition-all duration-300" style={{ marginLeft: "280px" }}>
        <div className="p-8">
          <div className="max-w-6xl mx-auto">
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

            {isServerDown || !profileData ? <SkeletonProfile darkMode={darkMode} /> : (
              <div className="space-y-6">
                {/* Header Profile - Center */}
                <AnimatedWrapper>
                  <div className={`rounded-2xl shadow-lg p-8 ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
                    <div className="flex flex-col items-center text-center">
                      <img
                        src={`${API_URL}/${profileData.profileUrl}`}
                        alt={profileData.name}
                        className="w-40 h-40 rounded-full object-cover border-4 border-sky-500 mb-4 shadow-xl"
                      />

                      <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                        {profileData.name}
                      </h1>
                      
                      <p className={`text-lg mb-3 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        {profileData.email}
                      </p>

                      <div className={`inline-block px-6 py-2 rounded-full font-semibold text-lg ${
                        isPembina
                          ? darkMode ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-100 text-purple-600'
                          : darkMode ? 'bg-sky-900/50 text-sky-300' : 'bg-sky-100 text-sky-600'
                      }`}>
                        <FiAward className="inline mr-2 mb-1" />
                        {isPembina ? 'Pembina' : 'Siswa'}
                      </div>

                      <div className={`mt-6 flex items-center justify-center gap-2 text-sm ${
                        darkMode ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        <FiCalendar />
                        Bergabung sejak {new Date(profileData.createdAt).toLocaleDateString('id-ID', { 
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </div>
                    </div>
                  </div>
                </AnimatedWrapper>

                {/* Info & Stats - Horizontal Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Card - Personal Info */}
                  <AnimatedWrapper delay={0.1}>
                    <div className={`rounded-2xl shadow-lg p-6 h-full ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
                      <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                        Informasi Pribadi
                      </h3>

                      <div className="space-y-5">
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            darkMode ? 'bg-sky-900/50' : 'bg-sky-100'
                          }`}>
                            <FiUser className="text-sky-500" />
                          </div>
                          <div className="flex-1">
                            <label className={`block text-sm font-semibold mb-1 ${
                              darkMode ? 'text-slate-400' : 'text-slate-500'
                            }`}>
                              Nama Lengkap
                            </label>
                            <p className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                              {profileData.name}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            darkMode ? 'bg-purple-900/50' : 'bg-purple-100'
                          }`}>
                            <FiMail className="text-purple-500" />
                          </div>
                          <div className="flex-1">
                            <label className={`block text-sm font-semibold mb-1 ${
                              darkMode ? 'text-slate-400' : 'text-slate-500'
                            }`}>
                              Email
                            </label>
                            <p className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                              {profileData.email}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            darkMode ? 'bg-green-900/50' : 'bg-green-100'
                          }`}>
                            <FiAward className="text-green-500" />
                          </div>
                          <div className="flex-1">
                            <label className={`block text-sm font-semibold mb-1 ${
                              darkMode ? 'text-slate-400' : 'text-slate-500'
                            }`}>
                              Role
                            </label>
                            <p className={`text-lg font-medium capitalize ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                              {profileData.role}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AnimatedWrapper>

                  {/* Right Card - Statistics */}
                  <AnimatedWrapper delay={0.2}>
                    <div className={`rounded-2xl shadow-lg p-6 h-full ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
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
                              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${
                                darkMode ? 'bg-sky-900/50' : 'bg-sky-100'
                              }`}>
                                <FiTarget className="text-xl text-sky-500" />
                              </div>
                              <p className={`text-3xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                                {profileData.activityStats?.totalManagedExtracurriculars || 0}
                              </p>
                              <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                Ekskul Dikelola
                              </p>
                            </div>

                            <div className={`p-4 rounded-xl ${darkMode ? 'bg-slate-700/50' : 'bg-slate-50'}`}>
                              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${
                                darkMode ? 'bg-purple-900/50' : 'bg-purple-100'
                              }`}>
                                <FiCalendar className="text-xl text-purple-500" />
                              </div>
                              <p className={`text-3xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                                {profileData.activityStats?.totalSchedulesCreated || 0}
                              </p>
                              <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                Jadwal Dibuat
                              </p>
                            </div>

                            <div className={`p-4 rounded-xl ${darkMode ? 'bg-slate-700/50' : 'bg-slate-50'}`}>
                              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${
                                darkMode ? 'bg-green-900/50' : 'bg-green-100'
                              }`}>
                                <FiUsers className="text-xl text-green-500" />
                              </div>
                              <p className={`text-3xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                                {profileData.activityStats?.totalStudents || 0}
                              </p>
                              <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                Total Siswa
                              </p>
                            </div>

                            <div className={`p-4 rounded-xl ${darkMode ? 'bg-slate-700/50' : 'bg-slate-50'}`}>
                              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${
                                darkMode ? 'bg-orange-900/50' : 'bg-orange-100'
                              }`}>
                                <span className="text-2xl">⏰</span>
                              </div>
                              <p className={`text-3xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                                {profileData.activityStats?.upcomingSchedules || 0}
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
                              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${
                                darkMode ? 'bg-sky-900/50' : 'bg-sky-100'
                              }`}>
                                <FiTarget className="text-xl text-sky-500" />
                              </div>
                              <p className={`text-3xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                                {profileData.activityStats?.joinedExtracurriculars || 0}
                              </p>
                              <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                Ekskul Diikuti
                              </p>
                            </div>

                            <div className={`p-4 rounded-xl ${darkMode ? 'bg-slate-700/50' : 'bg-slate-50'}`}>
                              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${
                                darkMode ? 'bg-yellow-900/50' : 'bg-yellow-100'
                              }`}>
                                <span className="text-2xl">⭐</span>
                              </div>
                              <p className={`text-3xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                                {profileData.activityStats?.totalPoints || 0}
                              </p>
                              <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                Total Poin
                              </p>
                            </div>

                            <div className={`p-4 rounded-xl ${darkMode ? 'bg-slate-700/50' : 'bg-slate-50'}`}>
                              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${
                                darkMode ? 'bg-green-900/50' : 'bg-green-100'
                              }`}>
                                <FiCheckCircle className="text-xl text-green-500" />
                              </div>
                              <p className={`text-3xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                                {profileData.activityStats?.totalAttendances || 0}
                              </p>
                              <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                Kehadiran
                              </p>
                            </div>

                            <div className={`p-4 rounded-xl ${darkMode ? 'bg-slate-700/50' : 'bg-slate-50'}`}>
                              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${
                                darkMode ? 'bg-purple-900/50' : 'bg-purple-100'
                              }`}>
                                <span className="text-2xl">📝</span>
                              </div>
                              <p className={`text-3xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                                {profileData.activityStats?.totalReports || 0}
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
                </div>

                {/* Ekstrakurikuler List - Full Width Bottom */}
                <AnimatedWrapper delay={0.3}>
                  <div className={`rounded-2xl shadow-lg p-6 ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
                    <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      {isPembina ? 'Ekstrakurikuler yang Dikelola' : 'Ekstrakurikuler yang Diikuti'}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {(isPembina ? profileData.managedExtracurriculars : profileData.extracurriculars)?.map((ekskul) => (
                        <div
                          key={ekskul.id}
                          className={`rounded-xl overflow-hidden transition-all hover:scale-105 ${
                            darkMode ? 'bg-slate-700/50 hover:bg-slate-700' : 'bg-slate-50 hover:bg-slate-100'
                          }`}
                          onClick={navigate}
                        >
                          <img
                            src={`${API_URL}/${ekskul.imageUrl}`}
                            alt={ekskul.name}
                            className="w-full h-40 object-cover"
                          />
                          <div className="p-4">
                            <h4 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                              {ekskul.name}
                            </h4>
                            <p className={`text-sm mb-3 line-clamp-2 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                              {ekskul.description}
                            </p>
                            
                            {isPembina ? (
                              <div className="flex flex-wrap gap-2">
                                <span className={`text-xs px-3 py-1.5 rounded-full flex items-center gap-1 ${
                                  darkMode ? 'bg-sky-900/50 text-sky-300' : 'bg-sky-100 text-sky-600'
                                }`}>
                                  <FiUsers className="text-xs" />
                                  {ekskul.totalMembers} anggota
                                </span>
                                <span className={`text-xs px-3 py-1.5 rounded-full flex items-center gap-1 ${
                                  darkMode ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-100 text-purple-600'
                                }`}>
                                  <FiCalendar className="text-xs" />
                                  {ekskul.totalSchedules} jadwal
                                </span>
                              </div>
                            ) : (
                              <div className="space-y-2">
                                <div className="flex flex-wrap gap-2">
                                  <span className={`text-xs px-3 py-1.5 rounded-full ${
                                    darkMode ? 'bg-yellow-900/50 text-yellow-300' : 'bg-yellow-100 text-yellow-600'
                                  }`}>
                                    ⭐ {ekskul.totalPoints} poin
                                  </span>
                                  <span className={`text-xs px-3 py-1.5 rounded-full capitalize ${
                                    ekskul.status === 'active'
                                      ? darkMode ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-600'
                                      : darkMode ? 'bg-gray-900/50 text-gray-300' : 'bg-gray-100 text-gray-600'
                                  }`}>
                                    {ekskul.status}
                                  </span>
                                </div>
                                {ekskul.pembina && (
                                  <div className={`text-xs flex items-center gap-1 ${
                                    darkMode ? 'text-slate-400' : 'text-slate-500'
                                  }`}>
                                    <FiUser className="text-xs" />
                                    {ekskul.pembina.name}
                                  </div>
                                )}
                                <div className={`text-xs ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                                  <FiCalendar className="inline text-xs mr-1" />
                                  {new Date(ekskul.joinDate).toLocaleDateString('id-ID', { 
                                    day: 'numeric', 
                                    month: 'short', 
                                    year: 'numeric' 
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimatedWrapper>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;