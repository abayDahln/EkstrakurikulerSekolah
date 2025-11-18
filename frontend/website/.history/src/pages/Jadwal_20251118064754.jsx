import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCalendar, FiPlus, FiSearch, FiX, FiMapPin, FiClock, FiUser } from "react-icons/fi";

// Skeleton Component
const SkeletonCard = ({ darkMode }) => (
  <div className={`rounded-xl p-4 ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-lg`}>
    <div className={`h-6 w-3/4 rounded animate-pulse mb-3 ${darkMode ? 'bg-slate-700' : 'bg-slate-200'}`} />
    <div className={`h-4 w-full rounded animate-pulse mb-2 ${darkMode ? 'bg-slate-700' : 'bg-slate-200'}`} />
    <div className={`h-4 w-5/6 rounded animate-pulse ${darkMode ? 'bg-slate-700' : 'bg-slate-200'}`} />
  </div>
);


// Create Schedule Modal
const CreateScheduleModal = ({ darkMode, isOpen, onClose, onSuccess, ekskulList }) => {
  const [formData, setFormData] = useState({
    extracurricularId: '',
    title: '',
    description: '',
    scheduleDate: '',
    location: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const response = await fetch('http://localhost:5000/api/pembina/schedule', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          extracurricularId: parseInt(formData.extracurricularId)
        })
      });

      if (response.ok) {
        alert('Jadwal berhasil dibuat!');
        onSuccess();
        onClose();
        setFormData({ extracurricularId: '', title: '', description: '', scheduleDate: '', location: '' });
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Gagal membuat jadwal');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className={`w-full max-w-2xl rounded-2xl shadow-2xl ${darkMode ? 'bg-slate-800' : 'bg-white'}`}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Buat Jadwal Baru
          </h2>
          <button onClick={onClose} className={`p-2 rounded-lg ${darkMode ? 'hover:bg-slate-700' : 'hover:bg-slate-100'}`}>
            <FiX className={`text-xl ${darkMode ? 'text-white' : 'text-slate-900'}`} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              Ekstrakurikuler
            </label>
            <select
              value={formData.extracurricularId}
              onChange={(e) => setFormData({...formData, extracurricularId: e.target.value})}
              className={`w-full p-3 rounded-xl border-2 ${
                darkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-200'
              } focus:outline-none focus:ring-4 ${darkMode ? 'focus:ring-sky-900/50' : 'focus:ring-sky-100'}`}
              required
            >
              <option value="">Pilih Ekstrakurikuler</option>
              {ekskulList.map(ekskul => (
                <option key={ekskul.id} value={ekskul.id}>{ekskul.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              Judul Kegiatan
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className={`w-full p-3 rounded-xl border-2 ${
                darkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-200'
              } focus:outline-none focus:ring-4 ${darkMode ? 'focus:ring-sky-900/50' : 'focus:ring-sky-100'}`}
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              Deskripsi
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={3}
              className={`w-full p-3 rounded-xl border-2 ${
                darkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-200'
              } focus:outline-none focus:ring-4 ${darkMode ? 'focus:ring-sky-900/50' : 'focus:ring-sky-100'}`}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Tanggal & Waktu
              </label>
              <input
                type="datetime-local"
                value={formData.scheduleDate}
                onChange={(e) => setFormData({...formData, scheduleDate: e.target.value})}
                className={`w-full p-3 rounded-xl border-2 ${
                  darkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-200'
                } focus:outline-none focus:ring-4 ${darkMode ? 'focus:ring-sky-900/50' : 'focus:ring-sky-100'}`}
                required
              />
            </div>

            <div>
              <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Lokasi
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className={`w-full p-3 rounded-xl border-2 ${
                  darkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-200'
                } focus:outline-none focus:ring-4 ${darkMode ? 'focus:ring-sky-900/50' : 'focus:ring-sky-100'}`}
                required
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 py-3 rounded-xl font-semibold ${
                darkMode ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
              }`}
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 py-3 rounded-xl font-semibold text-white ${
                loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-gradient-to-r from-sky-500 to-cyan-500 hover:shadow-lg'
              }`}
            >
              {loading ? 'Memproses...' : 'Buat Jadwal'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

// Main Jadwal Component
const Jadwal = ({ darkMode }) => {
  const [activeMenu, setActiveMenu] = useState(3);
  const [scheduleList, setScheduleList] = useState([]);
  const [ekskulList, setEkskulList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isServerDown, setIsServerDown] = useState(false);

  const API_URL = "http://localhost:5000";
  const intervalRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  const fetchScheduleData = async (search = '') => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const url = search 
        ? `${API_URL}/api/schedule?search=${encodeURIComponent(search)}`
        : `${API_URL}/api/schedule`;

      const response = await fetch(url, { 
        headers: { Authorization: `Bearer ${token}` }
      });
      const result = await response.json();
      
      if (result.status === 200) {
        setScheduleList(result.data);
        setIsServerDown(false);
      }
      if (isInitialLoad) setIsInitialLoad(false);
    } catch (error) {
      console.error('Error:', error);
      setIsServerDown(true);
      setScheduleList([]);
      if (isInitialLoad) setIsInitialLoad(false);
    }
  };

  const fetchEkskulList = async () => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/pembina/my-extracurricular`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const result = await response.json();
      if (result.status === 200) {
        setEkskulList(result.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchScheduleData();
    fetchEkskulList();

    intervalRef.current = setInterval(() => {
      fetchScheduleData(searchQuery);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      fetchScheduleData(searchQuery);
    }, 500);
    return () => clearTimeout(searchTimeoutRef.current);
  }, [searchQuery]);

  const handleCardClick = (scheduleId) => {
    // Navigate to detail
    window.location.href = `/jadwal/${scheduleId}`;
  };

  const AnimatedWrapper = ({ children, delay = 0 }) => 
    !isInitialLoad ? children : (
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay }}>
        {children}
      </motion.div>
    );

  return (
    
    <div>

    </div>
        

      {/* Create Modal */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <CreateScheduleModal
            darkMode={darkMode}
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onSuccess={() => fetchScheduleData(searchQuery)}
            ekskulList={ekskulList}
          />
        )}
      </AnimatePresence>
  );
};

export default Jadwal;