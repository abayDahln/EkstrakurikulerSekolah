import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Bell,
    MapPin,
    Calendar as CalendarIcon,
    X,
    Loader2,
    CalendarDays,
    User
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import sessionManager from "../utils/utils.jsx";
import config from "../config/config.js";
import { useConnection, fetchWithTimeout } from "../App.jsx";

const Jadwal = ({ darkMode }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedDate, setSelectedDate] = useState(() => {
        const saved = sessionStorage.getItem("jadwal_selectedDate");
        return saved ? new Date(saved) : new Date();
    });
    const [calendarStartDate, setCalendarStartDate] = useState(() => {
        const saved = sessionStorage.getItem("jadwal_calendarStartDate");
        return saved ? new Date(saved) : new Date();
    });
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [viewDate, setViewDate] = useState(new Date());
    const { setIsServerDown } = useConnection();

    useEffect(() => {
        if (location.state?.fromNotification) {
            const today = new Date();
            setSelectedDate(today);
            setCalendarStartDate(today);
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    useEffect(() => {
        if (showDatePicker) {
            setViewDate(new Date(selectedDate));
        }
    }, [showDatePicker, selectedDate]);

    useEffect(() => {
        sessionStorage.setItem("jadwal_selectedDate", selectedDate.toISOString());
    }, [selectedDate]);

    useEffect(() => {
        sessionStorage.setItem("jadwal_calendarStartDate", calendarStartDate.toISOString());
    }, [calendarStartDate]);

    const getDaysInMonth = (year, month) => {
        const date = new Date(year, month, 1);
        const days = [];
        let firstDayOfMonth = date.getDay();
        firstDayOfMonth = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

        const prevMonthLastDay = new Date(year, month, 0).getDate();
        for (let i = firstDayOfMonth - 1; i >= 0; i--) {
            const d = new Date(year, month - 1, prevMonthLastDay - i);
            days.push({
                day: d.getDate(),
                month: d.getMonth(),
                year: d.getFullYear(),
                currentMonth: false
            });
        }

        const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
        for (let i = 1; i <= lastDayOfMonth; i++) {
            days.push({
                day: i,
                month: month,
                year: year,
                currentMonth: true
            });
        }

        const remainingSlots = 42 - days.length;
        for (let i = 1; i <= remainingSlots; i++) {
            const d = new Date(year, month + 1, i);
            days.push({
                day: d.getDate(),
                month: d.getMonth(),
                year: d.getFullYear(),
                currentMonth: false
            });
        }

        return days;
    };

    const calendarGrid = getDaysInMonth(viewDate.getFullYear(), viewDate.getMonth());

    const fetchSchedules = async (silent = false) => {
        if (!silent) setLoading(true);
        try {
            const token = sessionManager.getToken();
            const response = await fetchWithTimeout(`${config.API_URL}/schedule?_=${Date.now()}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "accept": "*/*"
                },
                timeout: 10000
            });

            if (response.ok) {
                const result = await response.json();
                setSchedules(result.data || []);
                if (silent) console.log("Jadwal diperbarui secara otomatis:", new Date().toLocaleTimeString());
            } else if (response.status === 500) {
                setIsServerDown(true);
            } else {
                if (!silent) setError("Gagal memuat jadwal");
            }
        } catch (err) {
            if (!silent) {
                if (err.name === 'TypeError' || err.message === 'Failed to fetch') {
                    setIsServerDown(true);
                }
                setError("Kesalahan koneksi internet");
                console.error("Fetch schedule error:", err);
            }
        } finally {
            if (!silent) setLoading(false);
        }
    };

    useEffect(() => {
        fetchSchedules();

        const interval = setInterval(() => {
            fetchSchedules(true);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const filteredActivities = schedules.filter(item => {
        const itemDate = new Date(item.scheduleDate);
        return itemDate.toDateString() === selectedDate.toDateString();
    });

    const getWeekDays = (startDate) => {
        return Array.from({ length: 7 }, (_, i) => {
            const d = new Date(startDate);
            d.setDate(startDate.getDate() + i);
            return d;
        });
    };

    const weekDays = getWeekDays(calendarStartDate);

    const formattedDate = selectedDate.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });

    const shiftMonth = (amount) => {
        const newDate = new Date(selectedDate);
        newDate.setMonth(newDate.getMonth() + amount);
        setSelectedDate(newDate);
        setCalendarStartDate(newDate);
    };

    const shiftDay = (amount) => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() + amount);
        setSelectedDate(newDate);

        if (amount > 0) {
            setCalendarStartDate(newDate);
        } else {
            const newStart = new Date(newDate);
            newStart.setDate(newDate.getDate() - 6);
            setCalendarStartDate(newStart);
        }
    };

    useEffect(() => {
        if (!loading) {
            const savedScroll = sessionStorage.getItem("jadwal_scrollPos");
            if (savedScroll) {
                setTimeout(() => {
                    window.scrollTo({ top: parseInt(savedScroll), behavior: 'auto' });
                }, 50);
            }
        }
    }, [loading]);

    useEffect(() => {
        const handleScroll = () => {
            sessionStorage.setItem("jadwal_scrollPos", window.scrollY.toString());
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const getFullImageUrl = (url) => {
        if (!url) return "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=250&fit=crop";
        if (url.startsWith("http")) return url;
        return `${config.BASE_URL}/${url}`;
    };

    return (
        <div className={`min-h-screen pb-32 transition-colors duration-300 ${darkMode ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-900"}`}>
    
            <div className={`px-6 pt-12 pb-8 rounded-b-[2.5rem] shadow-sm transition-colors ${darkMode ? "bg-slate-800" : "bg-white"}`}>
                <div className="flex items-center justify-between mb-8">
                    <div className="flex gap-1">
                        <button
                            onClick={() => shiftMonth(-1)}
                            className={`p-2 rounded-full transition-colors ${darkMode ? "hover:bg-slate-700" : "hover:bg-slate-100"}`}
                            title="Bulan Sebelumnya"
                        >
                            <ChevronLeft size={20} />
                        </button>
                    </div>

                    <div className="flex flex-col items-center gap-0.5">
                        <button
                            onClick={() => setShowDatePicker(true)}
                            className="flex items-center gap-2 pb-2 font-bold text-sm hover:text-sky-500 transition-colors"
                        >
                            <CalendarIcon size={16} className="text-sky-500" />
                            <span>{formattedDate}</span>
                        </button>
                        <button
                            onClick={() => {
                                const today = new Date();
                                setSelectedDate(today);
                                setCalendarStartDate(today);
                            }}
                            className={`text-[10px] font-bold px-3 py-1 rounded-full transition-all ${darkMode ? "bg-slate-700 text-slate-400 hover:text-white" : "bg-slate-100 text-slate-500 hover:bg-sky-500 hover:text-white"}`}
                        >
                            Hari Ini
                        </button>
                    </div>

                    <div className="flex gap-1">
                        <button
                            onClick={() => shiftMonth(1)}
                            className={`p-2 rounded-full transition-colors ${darkMode ? "hover:bg-slate-700" : "hover:bg-slate-100"}`}
                            title="Bulan Berikutnya"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                <div className="flex justify-between items-center gap-5">
                    <button
                        onClick={() => shiftDay(-1)}
                        className={`w-10 h-10 flex items-center justify-center rounded-full transition-all active:scale-90 ${darkMode ? "bg-slate-800 hover:bg-slate-700 text-slate-300" : "bg-white border border-slate-100 hover:bg-slate-50 text-slate-600 shadow-sm"}`}
                    >
                        <ChevronLeft size={20} />
                    </button>

                    <div className="flex-1 flex justify-between">
                        {weekDays.map((day, idx) => {
                            const isSelected = day.toDateString() === selectedDate.toDateString();
                            const isToday = day.toDateString() === new Date().toDateString();

                            return (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedDate(day)}
                                    className="flex flex-col items-center gap-2"
                                >
                                    <span className={`text-[10px] font-bold uppercase tracking-wider ${isSelected ? "text-sky-500" : "text-slate-400"}`}>
                                        {day.toLocaleDateString('en-US', { weekday: 'short' }).substring(0, 2)}
                                    </span>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${isSelected
                                        ? "bg-sky-500 text-white shadow-lg shadow-sky-500/30 scale-110"
                                        : isToday
                                            ? "bg-sky-500/20 text-sky-500"
                                            : `${darkMode ? "hover:bg-slate-700" : "hover:bg-slate-100"}`
                                        }`}>
                                        {day.getDate()}
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    <button
                        onClick={() => shiftDay(1)}
                        className={`w-10 h-10 flex items-center justify-center rounded-full transition-all active:scale-90 ${darkMode ? "bg-slate-800 hover:bg-slate-700 text-slate-300" : "bg-white border border-slate-100 hover:bg-slate-50 text-slate-600 shadow-sm"}`}
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            <div className="px-6 mt-10">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-xl ${darkMode ? "bg-slate-800" : "bg-white shadow-sm"}`}>
                            <CalendarDays size={18} className="text-sky-500" />
                        </div>
                        <h2 className="text-xl font-bold tracking-tight">Jadwal Ekskul</h2>
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 opacity-50">
                        <Loader2 size={40} className="animate-spin text-sky-500 mb-4" />
                        <p className="text-sm font-medium">Memuat jadwal...</p>
                    </div>
                ) : filteredActivities.length > 0 ? (
                    <div className={`relative pl-14 space-y-12 after:content-[''] after:absolute after:left-4 after:top-2 after:bottom-2 after:w-0.5 after:rounded-full ${darkMode ? "after:bg-slate-700" : "after:bg-slate-300"}`}>
                        {filteredActivities.map((activity, idx) => {
                            const dateObj = new Date(activity.scheduleDate);
                            const startTime = dateObj.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

                            return (
                                <div key={activity.id} className="relative">
                                    <div className="absolute -left-13.5 top-0 flex flex-col items-center ">
                                        <span className={`text-[10px] font-bold ${darkMode ? "text-slate-300" : "text-slate-400"}`}>
                                            {startTime}
                                        </span>
                                        <div className={`w-3 h-3 rounded-full mt-2 border-2 ${darkMode ? "bg-slate-900 border-sky-500" : "bg-white border-sky-500"} z-10`} />
                                    </div>

                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        onClick={() => navigate(`/jadwal/${activity.id}`)}
                                        className={`rounded-[2.5rem] overflow-hidden border transition-all hover:shadow-2xl cursor-pointer ${darkMode ? "bg-slate-800/80 border-slate-800" : "bg-white border-white shadow-xl shadow-slate-100 ring-1 ring-sky-600/20"}`}
                                    >
                                        <div className="h-44 relative group cursor-pointer overflow-hidden">
                                            <img
                                                src={getFullImageUrl(activity.extracurricular?.imageUrl)}
                                                alt={activity.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                                            <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between gap-4">
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-white font-bold text-xl leading-tight mb-2 drop-shadow-md truncate">
                                                        {activity.title}
                                                    </h3>
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex items-center gap-1.5 text-white/80">
                                                            <MapPin size={14} className="text-sky-400" />
                                                            <span className="text-xs font-medium truncate">{activity.location}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="px-4 py-1.5 bg-sky-500/90 backdrop-blur-md rounded-full shadow-md shadow-sky-300/20 shrink-0">
                                                    <span className="text-[12px] font-bold text-white">
                                                        {activity.extracurricular?.name}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-6">
                                            <p className={`text-xs leading-relaxed mb-6 line-clamp-2 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                                                {activity.description}
                                            </p>

                                            <div className={`flex items-center justify-between border-t pt-5 ${darkMode ? "border-slate-500/40" : "border-slate-500/20"}`}>
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-8 h-8 rounded-full overflow-hidden border flex items-center justify-center ${darkMode ? "border-slate-800 bg-slate-100" : "border-slate-500/20 bg-slate-700"}`}>
                                                        {activity.extracurricular?.pembina?.profileUrl ? (
                                                            <img
                                                                src={getFullImageUrl(activity.extracurricular.pembina.profileUrl)}
                                                                alt={activity.extracurricular.pembina.name}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <User size={16} className="text-slate-400" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className={`text-[10px] font-bold tracking-tighter ${darkMode ? "text-slate-500" : "text-slate-400"}`}>Pembina</p>
                                                        <p className="text-xs font-bold">{activity.extracurricular?.pembina?.name || "Guru Pembina"}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center mb-6 ${darkMode ? "bg-slate-800" : "bg-slate-100"}`}>
                            <CalendarIcon size={32} className="text-slate-300" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Tidak Ada Jadwal</h3>
                        <p className={`text-sm px-10 ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
                            Belum ada aktivitas atau tugas yang dijadwalkan untuk tanggal ini.
                        </p>
                    </div>
                )}
            </div>

            <AnimatePresence>
                {showDatePicker && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowDatePicker(false)}
                            className="absolute inset-0 bg-black/70 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            className={`relative w-full max-w-sm rounded-[2.5rem] p-6 shadow-2xl border ${darkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-slate-100 text-slate-900"}`}
                        >
                            <div className="flex items-center justify-between mb-6 px-2">
                                <div className="flex flex-col">
                                    <h3 className="text-xl font-black text-sky-500 leading-tight">
                                        {viewDate.toLocaleDateString('id-ID', { month: 'long' })}
                                    </h3>
                                    <div className="flex items-center gap-1">
                                        <select
                                            value={viewDate.getFullYear()}
                                            onChange={(e) => setViewDate(new Date(parseInt(e.target.value), viewDate.getMonth(), 1))}
                                            className={`bg-transparent text-sm font-bold outline-none cursor-pointer hover:text-sky-500 transition-colors appearance-none ${darkMode ? "text-slate-400" : "text-slate-500"}`}
                                        >
                                            {Array.from({ length: 11 }, (_, i) => {
                                                const year = new Date().getFullYear() - 5 + i;
                                                return <option key={year} value={year} className={darkMode ? "bg-slate-900 text-white" : "bg-white text-slate-900"}>{year}</option>
                                            })}
                                        </select>
                                        <ChevronRight size={12} className="rotate-90 opacity-40 translate-y-0.5" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => setViewDate(new Date(viewDate.getFullYear() - 1, viewDate.getMonth(), 1))}
                                        className={`p-2 rounded-full transition-colors ${darkMode ? "hover:bg-slate-800 text-slate-500" : "hover:bg-slate-100 text-slate-400"}`}
                                        title="Tahun Sebelumnya"
                                    >
                                        <ChevronsLeft size={18} />
                                    </button>
                                    <button
                                        onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))}
                                        className={`p-2 rounded-full transition-colors ${darkMode ? "hover:bg-slate-800 text-sky-500" : "hover:bg-slate-100 text-sky-500"}`}
                                        title="Bulan Sebelumnya"
                                    >
                                        <ChevronLeft size={18} />
                                    </button>
                                    <button
                                        onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))}
                                        className={`p-2 rounded-full transition-colors ${darkMode ? "hover:bg-slate-800 text-sky-500" : "hover:bg-slate-100 text-sky-500"}`}
                                        title="Bulan Berikutnya"
                                    >
                                        <ChevronRight size={18} />
                                    </button>
                                    <button
                                        onClick={() => setViewDate(new Date(viewDate.getFullYear() + 1, viewDate.getMonth(), 1))}
                                        className={`p-2 rounded-full transition-colors ${darkMode ? "hover:bg-slate-800 text-slate-500" : "hover:bg-slate-100 text-slate-400"}`}
                                        title="Tahun Berikutnya"
                                    >
                                        <ChevronsRight size={18} />
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-7 gap-1 mb-2">
                                {["S", "S", "R", "K", "J", "S", "M"].map((day, i) => (
                                    <div key={i} className="h-10 flex items-center justify-center text-[10px] font-black text-slate-400">
                                        {day}
                                    </div>
                                ))}
                                {calendarGrid.map((dateObj, i) => {
                                    const isSelected = selectedDate.getDate() === dateObj.day &&
                                        selectedDate.getMonth() === dateObj.month &&
                                        selectedDate.getFullYear() === dateObj.year;

                                    const isToday = new Date().toDateString() === new Date(dateObj.year, dateObj.month, dateObj.day).toDateString();

                                    return (
                                        <button
                                            key={i}
                                            disabled={!dateObj.currentMonth}
                                            onClick={() => {
                                                const newDate = new Date(dateObj.year, dateObj.month, dateObj.day);
                                                setSelectedDate(newDate);
                                                setCalendarStartDate(newDate);
                                                setShowDatePicker(false);
                                            }}
                                            className={`h-10 w-10 mx-auto rounded-full flex items-center justify-center text-sm font-bold transition-all relative
                                                ${!dateObj.currentMonth ? "opacity-0 pointer-events-none" : ""}
                                                ${isSelected
                                                    ? "bg-sky-500 text-white shadow-lg shadow-sky-500/30 scale-105"
                                                    : isToday
                                                        ? "text-sky-500 underline decoration-2 underline-offset-4"
                                                        : darkMode ? "hover:bg-slate-800" : "hover:bg-slate-100"
                                                }
                                            `}
                                        >
                                            {dateObj.day}
                                        </button>
                                    );
                                })}
                            </div>

                            <button
                                onClick={() => setShowDatePicker(false)}
                                className={`w-full mt-4 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all
                                    ${darkMode ? "bg-slate-800 text-slate-400" : "bg-slate-100 text-slate-500 hover:bg-sky-500 hover:text-white"}`}
                            >
                                Tutup
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Jadwal;
