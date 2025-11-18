import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCalendar, FiPlus, FiSearch, FiX, FiMapPin, FiClock, FiUser } from "react-icons/fi";

// Skeleton & Sidebar components sama seperti sebelumnya...
const SkeletonCard = ({ darkMode }) => (
  <div className={`rounded-xl p-4 ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-lg`}>
    <div className={`h-6 w-3/4 rounded animate-pulse mb-3 ${darkMode ? 'bg-slate-700' : 'bg-slate-200'}`} />
    <div className={`h-4 w-full rounded animate-pulse mb-2 ${darkMode ? 'bg-slate-700' : 'bg-slate-200'}`} />
  </div>
);

const Sidebar = ({ darkMode, activeMenu, setActiveMenu }) => {
  const menuItems = [
    { id: 1, icon: '🏠', label: 'Dashboard' },
    { id: 2, icon: '🎯', label: 'Ekstrakurikuler' },
    { id: 3, icon: '📅', label: 'Jadwal' },
    { id: 4, icon: '👥', label: 'Anggota' },
    { id: 5, icon: '🎓', label: 'Sertifikat' },
  ];

  return (
    <div className={`fixed left-0 top-0 h-screen w-[280px] z-40 ${
      darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
    } border-r shadow-lg`}>
      <div className="p-4 border-b border-inherit">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${
            darkMode ? 'bg-gradient-to-br from-sky-700 to-cyan-700' : 'bg-gradient-to-br from-sky-400 to-cyan-500'
          }`}>
            <span className="text-white text-xl font-bold">E</span>
          </div>
          <span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>EkskulApp</span>
        </div>
      </div>
      
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <button key={item.id} onClick={() => setActiveMenu(item.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
            activeMenu === item.id ? darkMode ? 'bg-gradient-to-r from-sky-700 to-cyan-700 text-white shadow-lg' : 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-lg' : darkMode ? 'hover:bg-slate-700 text-slate-300' : 'hover:bg-slate-100 text-slate-600'
          }`}>
            <span className="text-2xl">{item.icon}</span>
            <span className="font-semibold text-sm">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

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

  const handleSubmit = async () => {
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
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={`w-full max-w-2xl rounded-2xl shadow-2xl ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Buat Jadwal Baru</h2>
          <button onClick={onClose} className={`p-2 rounded-lg ${darkMode ? 'hover:bg-slate-700' : 'hover:bg-slate-100'}`}>
            <FiX className={`text-xl ${darkMode ? 'text-white' : 'text-slate-900'}`} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Ekstrakurikuler</label>
            <select value={formData.extracurricularId} onChange={(e) => setFormData({...formData, extracurricularId: e.target.value})} className={`w-full p-3 rounded-xl border-2 ${darkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-200'}`} required>
              <option value="">Pilih Ekstrakurikuler</option>
              {ekskulList.map(ekskul => (
                <option key={ekskul.id} value={ekskul.id}>{ekskul.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Judul Kegiatan</label>
            <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className={`w-full p-3 rounded-xl border-2 ${darkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-200'}`} required />
          </div>

          <div>
            <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Deskripsi</label>
            <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows={3} className={`w-full p-3 rounded-xl border-2 ${darkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-200'}`} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Tanggal & Waktu</label>
              <input type="datetime-local" value={formData.scheduleDate} onChange={(e) => setFormData({...formData, scheduleDate: e.target.value})} className={`w-full p-3 rounded-xl border-2 ${darkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-200'}`} required />
            </div>

            <div>
              <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Lokasi</label>
              <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className={`w-full p-3 rounded-xl border-2 ${darkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-200'}`} required />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button onClick={onClose} className={`flex-1 py-3 rounded-xl font-semibold ${darkMode ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-slate-200 hover:bg-slate-300 text-slate-700'}`}>Batal</button>
            <button onClick={handleSubmit} disabled={loading} className={`flex-1 py-3 rounded-xl font-semibold text-white ${loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-gradient-to-r from-sky-500 to-cyan-500 hover:shadow-lg'}`}>
              {loading ? 'Memproses...' : 'Buat Jadwal'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Main Component - Continuing in next message due to length

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

  const fetchScheduleData = async (search = '') => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const url = search ? `${API_URL}/api/schedule?search=${encodeURIComponent(search)}` : `${API_URL}/api/schedule`;
      const response = await fetch(url, { headers: { Authorization: `Bearer ${token}` }});
      const result = await response.json();
      if (result.status === 200) {
        setScheduleList(result.data);
        setIsServerDown(false);
      }
      if (isInitialLoad) setIsInitialLoad(false);
    } catch (error) {
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
      if (result.status === 200) setEkskulList(result.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchScheduleData();
    fetchEkskulList();
    intervalRef.current = setInterval(() => fetchScheduleData(searchQuery), 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => fetchScheduleData(searchQuery), 500);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  return (
    <div className={`min-h-screen ${darkMode ? "bg-slate-900" : "bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50"}`} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Sidebar darkMode={darkMode} activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      <div style={{ marginLeft: "280px" }} className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className={`text-3xl font-bold mb-2 flex items-center gap-3 ${darkMode ? "text-white" : "text-slate-900"}`}>
                <FiCalendar /> Jadwal Kegiatan
              </h1>
              <p className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}>Kelola jadwal ekstrakurikuler</p>
            </div>
            <button onClick={() => setIsCreateModalOpen(true)} className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-sky-500 to-cyan-500 hover:shadow-lg">
              <FiPlus className="text-xl" /> Buat Jadwal
            </button>
          </div>

          <div className="mb-6">
            <div className="relative max-w-md">
              <FiSearch className={`absolute left-4 top-1/2 -translate-y-1/2 text-xl ${darkMode ? 'text-slate-400' : 'text-slate-500'}`} />
              <input type="text" placeholder="Cari jadwal..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'}`} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isServerDown || scheduleList.length === 0 ? (
              <><SkeletonCard darkMode={darkMode} /><SkeletonCard darkMode={darkMode} /><SkeletonCard darkMode={darkMode} /></>
            ) : (
              scheduleList.map((schedule) => (
                <div key={schedule.id} onClick={() => window.location.href = `/jadwal/${schedule.id}`} className={`rounded-xl p-6 shadow-lg cursor-pointer hover:scale-105 ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
                  <div className="flex items-start gap-4 mb-4">
                    <img src={`${API_URL}/${schedule.extracurricular.imageUrl}`} alt={schedule.extracurricular.name} className="w-16 h-16 rounded-xl object-cover" />
                    <div>
                      <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-slate-900'}`}>{schedule.title}</h3>
                      <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{schedule.extracurricular.name}</p>
                    </div>
                  </div>
                  <p className={`text-sm mb-4 line-clamp-2 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{schedule.description}</p>
                  <div className="space-y-2">
                    <div className={`flex items-center gap-2 text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      <FiClock /> {new Date(schedule.scheduleDate).toLocaleString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div className={`flex items-center gap-2 text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      <FiMapPin /> {schedule.location}
                    </div>
                    <div className={`flex items-center gap-2 text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      <FiUser /> {schedule.extracurricular.pembina.name}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isCreateModalOpen && (
          <CreateScheduleModal darkMode={darkMode} isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} onSuccess={() => fetchScheduleData(searchQuery)} ekskulList={ekskulList} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Jadwal;