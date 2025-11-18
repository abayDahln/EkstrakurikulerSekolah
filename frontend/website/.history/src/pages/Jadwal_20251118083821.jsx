import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	FiCalendar,
	FiPlus,
	FiSearch,
	FiX,
	FiMapPin,
	FiClock,
	FiUser,
} from "react-icons/fi";

// Skeleton Component yang sesuai dengan card asli
const SkeletonCard = ({ darkMode }) => (
	<div
		className={`rounded-xl p-6 shadow-lg h-full flex flex-col ${
			darkMode ? "bg-slate-800" : "bg-white"
		}`}
	>
		<div className="flex items-start gap-4 mb-4 flex-shrink-0">
			<div
				className={`w-16 h-16 rounded-xl animate-pulse ${
					darkMode ? "bg-slate-700" : "bg-slate-200"
				}`}
			/>
			<div className="flex-1">
				<div
					className={`h-6 w-3/4 rounded animate-pulse mb-2 ${
						darkMode ? "bg-slate-700" : "bg-slate-200"
					}`}
				/>
				<div
					className={`h-4 w-1/2 rounded animate-pulse ${
						darkMode ? "bg-slate-700" : "bg-slate-200"
					}`}
				/>
			</div>
		</div>

		<div className="flex-grow space-y-2 mb-4">
			<div
				className={`h-4 w-full rounded animate-pulse ${
					darkMode ? "bg-slate-700" : "bg-slate-200"
				}`}
			/>
			<div
				className={`h-4 w-5/6 rounded animate-pulse ${
					darkMode ? "bg-slate-700" : "bg-slate-200"
				}`}
			/>
		</div>

		<div className="space-y-2 flex-shrink-0">
			<div className="flex items-center gap-2">
				<div
					className={`h-4 w-4 rounded animate-pulse ${
						darkMode ? "bg-slate-700" : "bg-slate-200"
					}`}
				/>
				<div
					className={`h-4 w-2/3 rounded animate-pulse ${
						darkMode ? "bg-slate-700" : "bg-slate-200"
					}`}
				/>
			</div>
			<div className="flex items-center gap-2">
				<div
					className={`h-4 w-4 rounded animate-pulse ${
						darkMode ? "bg-slate-700" : "bg-slate-200"
					}`}
				/>
				<div
					className={`h-4 w-1/2 rounded animate-pulse ${
						darkMode ? "bg-slate-700" : "bg-slate-200"
					}`}
				/>
			</div>
			<div className="flex items-center gap-2">
				<div
					className={`h-4 w-4 rounded animate-pulse ${
						darkMode ? "bg-slate-700" : "bg-slate-200"
					}`}
				/>
				<div
					className={`h-4 w-2/5 rounded animate-pulse ${
						darkMode ? "bg-slate-700" : "bg-slate-200"
					}`}
				/>
			</div>
		</div>
	</div>
);

// Komponen terpisah untuk card dengan animasi sekali saja
const AnimatedScheduleCard = ({
	schedule,
	darkMode,
	index,
	hasAnimated,
	onCardClick,
	API_URL,
}) => {
	return (
		<motion.div
			initial={hasAnimated ? false : { y: 20, opacity: 0 }}
			animate={hasAnimated ? false : { y: 0, opacity: 1 }}
			transition={{ delay: index * 0.1 }}
			className="h-full"
		>
			<div
				onClick={() => onCardClick(schedule.id)}
				className={`cursor-pointer rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col h-full ${
					darkMode ? "bg-slate-800" : "bg-white"
				}`}
			>
				{/* Header dengan gambar dan judul */}
				<div className="flex items-start gap-4 mb-4 flex-shrink-0">
					<img
						src={`${API_URL}/${schedule.extracurricular.imageUrl}`}
						alt={schedule.extracurricular.name}
						className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
						onError={(e) => {
							e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Crect fill='%23${
								darkMode ? "475569" : "e2e8f0"
							}' width='64' height='64'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='12' fill='%23${
								darkMode ? "94a3b8" : "64748b"
							}'%3E${schedule.extracurricular.name}%3C/text%3E%3C/svg%3E`;
						}}
					/>
					<div className="flex-1 min-w-0">
						<h3
							className={`font-bold text-lg mb-1 line-clamp-2 ${
								darkMode ? "text-white" : "text-slate-900"
							}`}
						>
							{schedule.title}
						</h3>
						<p
							className={`text-sm line-clamp-1 ${
								darkMode ? "text-slate-400" : "text-slate-500"
							}`}
						>
							{schedule.extracurricular.name}
						</p>
					</div>
				</div>

				{/* Deskripsi - bagian yang bisa grow */}
				<div className="flex-grow mb-4">
					<p
						className={`text-sm ${
							darkMode ? "text-slate-300" : "text-slate-600"
						}`}
					>
						{schedule.description}
					</p>
				</div>

				{/* Info detail - selalu di bagian bawah */}
				<div className="space-y-2 flex-shrink-0">
					<div
						className={`flex items-center gap-2 text-sm ${
							darkMode ? "text-slate-400" : "text-slate-500"
						}`}
					>
						<FiClock className="flex-shrink-0" />
						<span className="truncate">
							{new Date(schedule.scheduleDate).toLocaleString("id-ID", {
								day: "numeric",
								month: "long",
								year: "numeric",
								hour: "2-digit",
								minute: "2-digit",
							})}
						</span>
					</div>

					<div
						className={`flex items-center gap-2 text-sm ${
							darkMode ? "text-slate-400" : "text-slate-500"
						}`}
					>
						<FiMapPin className="flex-shrink-0" />
						<span className="truncate">{schedule.location}</span>
					</div>

					<div
						className={`flex items-center gap-2 text-sm ${
							darkMode ? "text-slate-400" : "text-slate-500"
						}`}
					>
						<FiUser className="flex-shrink-0" />
						<span className="truncate">
							{schedule.extracurricular.pembina.name}
						</span>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

// Create Schedule Modal (tetap sama)
const CreateScheduleModal = ({
	darkMode,
	isOpen,
	onClose,
	onSuccess,
	ekskulList,
}) => {
	const [formData, setFormData] = useState({
		extracurricularId: "",
		title: "",
		description: "",
		scheduleDate: "",
		location: "",
	});
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const token =
				localStorage.getItem("token") || sessionStorage.getItem("token");
			const response = await fetch(
				"http://localhost:5000/api/pembina/schedule",
				{
					method: "POST",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						...formData,
						extracurricularId: parseInt(formData.extracurricularId),
					}),
				}
			);

			if (response.ok) {
				alert("Jadwal berhasil dibuat!");
				onSuccess();
				onClose();
				setFormData({
					extracurricularId: "",
					title: "",
					description: "",
					scheduleDate: "",
					location: "",
				});
			}
		} catch (error) {
			console.error("Error:", error);
			alert("Gagal membuat jadwal");
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
				className={`w-full max-w-2xl rounded-2xl shadow-2xl ${
					darkMode ? "bg-slate-800" : "bg-white"
				}`}
			>
				<div className="flex items-center justify-between p-6 border-b border-slate-700">
					<h2
						className={`text-2xl font-bold ${
							darkMode ? "text-white" : "text-slate-900"
						}`}
					>
						Buat Jadwal Baru
					</h2>
					<button
						onClick={onClose}
						className={`p-2 rounded-lg ${
							darkMode ? "hover:bg-slate-700" : "hover:bg-slate-100"
						}`}
					>
						<FiX
							className={`text-xl ${
								darkMode ? "text-white" : "text-slate-900"
							}`}
						/>
					</button>
				</div>

				<form onSubmit={handleSubmit} className="p-6 space-y-4">
					<div>
						<label
							className={`block text-sm font-semibold mb-2 ${
								darkMode ? "text-slate-300" : "text-slate-700"
							}`}
						>
							Ekstrakurikuler
						</label>
						<select
							value={formData.extracurricularId}
							onChange={(e) =>
								setFormData({ ...formData, extracurricularId: e.target.value })
							}
							className={`w-full p-3 rounded-xl border-2 ${
								darkMode
									? "bg-slate-700 border-slate-600 text-white"
									: "bg-white border-slate-200"
							} focus:outline-none focus:ring-4 ${
								darkMode ? "focus:ring-sky-900/50" : "focus:ring-sky-100"
							}`}
							required
						>
							<option value="">Pilih Ekstrakurikuler</option>
							{ekskulList.map((ekskul) => (
								<option key={ekskul.id} value={ekskul.id}>
									{ekskul.name}
								</option>
							))}
						</select>
					</div>

					<div>
						<label
							className={`block text-sm font-semibold mb-2 ${
								darkMode ? "text-slate-300" : "text-slate-700"
							}`}
						>
							Judul Kegiatan
						</label>
						<input
							type="text"
							value={formData.title}
							onChange={(e) =>
								setFormData({ ...formData, title: e.target.value })
							}
							className={`w-full p-3 rounded-xl border-2 ${
								darkMode
									? "bg-slate-700 border-slate-600 text-white"
									: "bg-white border-slate-200"
							} focus:outline-none focus:ring-4 ${
								darkMode ? "focus:ring-sky-900/50" : "focus:ring-sky-100"
							}`}
							required
						/>
					</div>

					<div>
						<label
							className={`block text-sm font-semibold mb-2 ${
								darkMode ? "text-slate-300" : "text-slate-700"
							}`}
						>
							Deskripsi
						</label>
						<textarea
							value={formData.description}
							onChange={(e) =>
								setFormData({ ...formData, description: e.target.value })
							}
							rows={3}
							className={`w-full p-3 rounded-xl border-2 ${
								darkMode
									? "bg-slate-700 border-slate-600 text-white"
									: "bg-white border-slate-200"
							} focus:outline-none focus:ring-4 ${
								darkMode ? "focus:ring-sky-900/50" : "focus:ring-sky-100"
							}`}
							required
						/>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div>
							<label
								className={`block text-sm font-semibold mb-2 ${
									darkMode ? "text-slate-300" : "text-slate-700"
								}`}
							>
								Tanggal & Waktu
							</label>
							<input
								type="datetime-local"
								value={formData.scheduleDate}
								onChange={(e) =>
									setFormData({ ...formData, scheduleDate: e.target.value })
								}
								className={`w-full p-3 rounded-xl border-2 ${
									darkMode
										? "bg-slate-700 border-slate-600 text-white"
										: "bg-white border-slate-200"
								} focus:outline-none focus:ring-4 ${
									darkMode ? "focus:ring-sky-900/50" : "focus:ring-sky-100"
								}`}
								required
							/>
						</div>

						<div>
							<label
								className={`block text-sm font-semibold mb-2 ${
									darkMode ? "text-slate-300" : "text-slate-700"
								}`}
							>
								Lokasi
							</label>
							<input
								type="text"
								value={formData.location}
								onChange={(e) =>
									setFormData({ ...formData, location: e.target.value })
								}
								className={`w-full p-3 rounded-xl border-2 ${
									darkMode
										? "bg-slate-700 border-slate-600 text-white"
										: "bg-white border-slate-200"
								} focus:outline-none focus:ring-4 ${
									darkMode ? "focus:ring-sky-900/50" : "focus:ring-sky-100"
								}`}
								required
							/>
						</div>
					</div>

					<div className="flex gap-3 pt-4">
						<button
							type="button"
							onClick={onClose}
							className={`flex-1 py-3 rounded-xl font-semibold ${
								darkMode
									? "bg-slate-700 hover:bg-slate-600 text-white"
									: "bg-slate-200 hover:bg-slate-300 text-slate-700"
							}`}
						>
							Batal
						</button>
						<button
							type="submit"
							disabled={loading}
							className={`flex-1 py-3 rounded-xl font-semibold text-white ${
								loading
									? "bg-slate-400 cursor-not-allowed"
									: "bg-gradient-to-r from-sky-500 to-cyan-500 hover:shadow-lg"
							}`}
						>
							{loading ? "Memproses..." : "Buat Jadwal"}
						</button>
					</div>
				</form>
			</motion.div>
		</div>
	);
};

// Main Jadwal Component
const Jadwal = ({ darkMode }) => {
	const [scheduleList, setScheduleList] = useState([]);
	const [ekskulList, setEkskulList] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [isServerDown, setIsServerDown] = useState(false);
	const [hasAnimated, setHasAnimated] = useState(false);

	const API_URL = "http://localhost:5000";
	const searchTimeoutRef = useRef(null);

	// Set animasi selesai setelah waktu tertentu
	useEffect(() => {
		const timer = setTimeout(() => {
			setHasAnimated(true);
		}, 2000);

		return () => clearTimeout(timer);
	}, []);

	// Fetch data seperti di komponen Ekstrakurikuler - hanya sekali
	useEffect(() => {
		let isMounted = true;

		const fetchData = async () => {
			try {
				setIsLoading(true);
				setIsServerDown(false);

				const token =
					localStorage.getItem("token") || sessionStorage.getItem("token");

				// Fetch schedule data
				const scheduleResponse = await fetch(`${API_URL}/api/schedule`, {
					headers: { Authorization: `Bearer ${token}` },
				});

				if (!scheduleResponse.ok) throw new Error("Server tidak merespons");

				const scheduleResult = await scheduleResponse.json();

				if (isMounted && scheduleResult.status === 200) {
					setScheduleList(scheduleResult.data || []);
				}

				// Fetch ekskul list untuk modal
				const ekskulResponse = await fetch(
					`${API_URL}/api/pembina/my-extracurricular`,
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);

				if (ekskulResponse.ok) {
					const ekskulResult = await ekskulResponse.json();
					if (isMounted && ekskulResult.status === 200) {
						setEkskulList(ekskulResult.data || []);
					}
				}
			} catch (error) {
				console.error("Error:", error);
				if (isMounted) {
					setIsServerDown(true);
					setScheduleList([]);
				}
			} finally {
				if (isMounted) setIsLoading(false);
			}
		};

		// Delay loading untuk efek visual
		setTimeout(() => {
			fetchData();
		}, 1000);

		return () => {
			isMounted = false;
		};
	}, []);

	// Handle search dengan debounce
	useEffect(() => {
		if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

		searchTimeoutRef.current = setTimeout(() => {
			if (searchQuery.trim() !== "") {
				handleSearch(searchQuery);
			} else {
				// Jika search kosong, reload data asli
				fetchOriginalData();
			}
		}, 500);

		return () => clearTimeout(searchTimeoutRef.current);
	}, [searchQuery]);

	const fetchOriginalData = async () => {
		try {
			const token =
				localStorage.getItem("token") || sessionStorage.getItem("token");
			const response = await fetch(`${API_URL}/api/schedule`, {
				headers: { Authorization: `Bearer ${token}` },
			});

			if (response.ok) {
				const result = await response.json();
				if (result.status === 200) {
					setScheduleList(result.data || []);
				}
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const handleSearch = async (search) => {
		try {
			const token =
				localStorage.getItem("token") || sessionStorage.getItem("token");
			const response = await fetch(
				`${API_URL}/api/schedule?search=${encodeURIComponent(search)}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);

			if (response.ok) {
				const result = await response.json();
				if (result.status === 200) {
					setScheduleList(result.data || []);
				}
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const handleCardClick = (scheduleId) => {
		window.location.href = `/jadwal/${scheduleId}`;
	};

	const refreshData = () => {
		fetchOriginalData();
	};

	// Show loading state
	const showLoading = isLoading;
	// Show empty state when no results
	const showEmptyState =
		!showLoading && scheduleList.length === 0 && !isServerDown;
	// Show error state when server is down
	const showErrorState = isServerDown && !showLoading;

	return (
		<div>
			<div className="p-8">
				<div className="max-w-7xl mx-auto">
					{/* Header */}
					<div className="flex items-center justify-between mb-8">
						<div>
							<h1
								className={`text-3xl font-bold mb-2 flex items-center gap-3 ${
									darkMode ? "text-white" : "text-slate-900"
								}`}
							>
								<FiCalendar />
								Jadwal Kegiatan
							</h1>
							<p
								className={`text-sm ${
									darkMode ? "text-slate-400" : "text-slate-500"
								}`}
							>
								Kelola jadwal ekstrakurikuler
							</p>
						</div>

						<button
							onClick={() => setIsCreateModalOpen(true)}
							className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-sky-500 to-cyan-500 hover:shadow-lg transition-all"
						>
							<FiPlus className="text-xl" />
							Buat Jadwal
						</button>
					</div>

					{/* Search */}
					<div className="mb-6">
						<div className="relative max-w-md">
							<FiSearch
								className={`absolute left-4 top-1/2 -translate-y-1/2 text-xl ${
									darkMode ? "text-slate-400" : "text-slate-500"
								}`}
							/>
							<input
								type="text"
								placeholder="Cari jadwal..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all ${
									darkMode
										? "bg-slate-800 border-slate-700 text-white placeholder-slate-500"
										: "bg-white border-slate-200 text-slate-900 placeholder-slate-400"
								} focus:outline-none focus:ring-4 ${
									darkMode ? "focus:ring-sky-900/50" : "focus:ring-sky-100"
								}`}
							/>
						</div>
					</div>

					{/* Schedule List */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{showLoading ? (
							// Show skeleton during loading - semua card sama tinggi
							<>
								<SkeletonCard darkMode={darkMode} />
								<SkeletonCard darkMode={darkMode} />
								<SkeletonCard darkMode={darkMode} />
							</>
						) : showErrorState ? (
							// Show error state
							<div className="col-span-3 text-center py-12">
								<div
									className={`text-6xl mb-4 ${
										darkMode ? "text-slate-600" : "text-slate-300"
									}`}
								>
									⚠️
								</div>
								<h3
									className={`text-xl font-bold mb-2 ${
										darkMode ? "text-white" : "text-slate-900"
									}`}
								>
									Server Tidak Dapat Diakses
								</h3>
								<p className={darkMode ? "text-slate-400" : "text-slate-500"}>
									Silakan coba lagi beberapa saat.
								</p>
							</div>
						) : showEmptyState ? (
							// Show empty state
							<div className="col-span-3 text-center py-12">
								<div
									className={`text-6xl mb-4 ${
										darkMode ? "text-slate-600" : "text-slate-300"
									}`}
								>
									📅
								</div>
								<h3
									className={`text-xl font-bold mb-2 ${
										darkMode ? "text-white" : "text-slate-900"
									}`}
								>
									{searchQuery ? "Jadwal Tidak Ditemukan" : "Belum Ada Jadwal"}
								</h3>
								<p className={darkMode ? "text-slate-400" : "text-slate-500"}>
									{searchQuery
										? `Tidak ada jadwal yang sesuai dengan "${searchQuery}"`
										: "Buat jadwal pertama untuk memulai"}
								</p>
							</div>
						) : (
							// Show schedule list dengan animasi sekali saja
							scheduleList.map((schedule, index) => (
								<AnimatedScheduleCard
									key={schedule.id}
									schedule={schedule}
									darkMode={darkMode}
									index={index}
									hasAnimated={hasAnimated}
									onCardClick={handleCardClick}
									API_URL={API_URL}
								/>
							))
						)}
					</div>
				</div>
			</div>

			{/* Create Modal */}
			<AnimatePresence>
				{isCreateModalOpen && (
					<CreateScheduleModal
						darkMode={darkMode}
						isOpen={isCreateModalOpen}
						onClose={() => setIsCreateModalOpen(false)}
						onSuccess={refreshData}
						ekskulList={data?.data?.ekskulList || []}
					/>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Jadwal;
