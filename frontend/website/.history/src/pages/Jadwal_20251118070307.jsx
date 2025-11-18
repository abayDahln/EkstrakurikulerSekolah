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
		className={`rounded-xl p-6 shadow-lg ${
			darkMode ? "bg-slate-800" : "bg-white"
		}`}
	>
		<div className="flex items-start gap-4 mb-4">
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

		<div
			className={`h-4 w-full rounded animate-pulse mb-2 ${
				darkMode ? "bg-slate-700" : "bg-slate-200"
			}`}
		/>
		<div
			className={`h-4 w-5/6 rounded animate-pulse mb-4 ${
				darkMode ? "bg-slate-700" : "bg-slate-200"
			}`}
		/>

		<div className="space-y-2">
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
	const [isLoading, setIsLoading] = useState(false);
	const [isSearching, setIsSearching] = useState(false);
	const [isInitialLoad, setIsInitialLoad] = useState(true);
	const [isServerDown, setIsServerDown] = useState(false);

	const API_URL = "http://localhost:5000";
	const intervalRef = useRef(null);
	const searchTimeoutRef = useRef(null);

	const fetchScheduleData = async (search = "", isSearch = false) => {
		if (isSearch) {
			setIsSearching(true);
		} else {
			setIsLoading(true);
		}

		try {
			const token =
				localStorage.getItem("token") || sessionStorage.getItem("token");
			const url = search
				? `${API_URL}/api/schedule?search=${encodeURIComponent(search)}`
				: `${API_URL}/api/schedule`;

			const response = await fetch(url, {
				headers: { Authorization: `Bearer ${token}` },
			});
			const result = await response.json();

			if (result.status === 200) {
				setScheduleList(result.data);
				setIsServerDown(false);
			} else {
				setScheduleList([]);
			}
			
			if (isInitialLoad) setIsInitialLoad(false);
		} catch (error) {
			console.error("Error:", error);
			setIsServerDown(true);
			setScheduleList([]);
			if (isInitialLoad) setIsInitialLoad(false);
		} finally {
			setIsLoading(false);
			setIsSearching(false);
		}
	};

	const fetchEkskulList = async () => {
		try {
			const token =
				localStorage.getItem("token") || sessionStorage.getItem("token");
			const response = await fetch(
				`${API_URL}/api/pembina/my-extracurricular`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			const result = await response.json();
			if (result.status === 200) {
				setEkskulList(result.data);
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	useEffect(() => {
		fetchScheduleData();
		fetchEkskulList();

		// Hanya fetch data secara periodik ketika tidak sedang search
		intervalRef.current = setInterval(() => {
			if (!searchQuery.trim()) {
				fetchScheduleData();
			}
		}, 5000); // Reduced to 5 seconds for better performance

		return () => {
			clearInterval(intervalRef.current);
			if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
		};
	}, []);

	useEffect(() => {
		if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
		
		searchTimeoutRef.current = setTimeout(() => {
			if (searchQuery.trim() !== "") {
				fetchScheduleData(searchQuery, true);
			} else {
				fetchScheduleData("", true);
			}
		}, 500);
		
		return () => clearTimeout(searchTimeoutRef.current);
	}, [searchQuery]);

	const handleCardClick = (scheduleId) => {
		window.location.href = `/jadwal/${scheduleId}`;
	};

	const AnimatedWrapper = ({ children, delay = 0 }) =>
		!isInitialLoad ? (
			children
		) : (
			<motion.div
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay }}
			>
				{children}
			</motion.div>
		);

	// Show loading state
	const showLoading = isInitialLoad || isLoading || isSearching;
	// Show empty state when no results
	const showEmptyState = !showLoading && scheduleList.length === 0 && !isServerDown;
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
							{isSearching && (
								<div className="absolute right-4 top-1/2 -translate-y-1/2">
									<div className="animate-spin rounded-full h-5 w-5 border-2 border-sky-500 border-t-transparent"></div>
								</div>
							)}
						</div>
					</div>

					{/* Schedule List */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{showLoading ? (
							// Show skeleton during loading
							<>
								<SkeletonCard darkMode={darkMode} />
								<SkeletonCard darkMode={darkMode} />
								<SkeletonCard darkMode={darkMode} />
							</>
						) : showErrorState ? (
							// Show error state
							<div className="col-span-3 text-center py-12">
								<div className={`text-6xl mb-4 ${darkMode ? "text-slate-600" : "text-slate-300"}`}>⚠️</div>
								<h3 className={`text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-slate-900"}`}>
									Server Tidak Dapat Diakses
								</h3>
								<p className={darkMode ? "text-slate-400" : "text-slate-500"}>
									Silakan coba lagi beberapa saat.
								</p>
							</div>
						) : showEmptyState ? (
							// Show empty state
							<div className="col-span-3 text-center py-12">
								<div className={`text-6xl mb-4 ${darkMode ? "text-slate-600" : "text-slate-300"}`}>📅</div>
								<h3 className={`text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-slate-900"}`}>
									{searchQuery ? "Jadwal Tidak Ditemukan" : "Belum Ada Jadwal"}
								</h3>
								<p className={darkMode ? "text-slate-400" : "text-slate-500"}>
									{searchQuery 
										? `Tidak ada jadwal yang sesuai dengan "${searchQuery}"` 
										: "Buat jadwal pertama untuk memulai"}
								</p>
							</div>
						) : (
							// Show schedule list
							scheduleList.map((schedule, index) => (
								<AnimatedWrapper key={schedule.id} delay={index * 0.1}>
									<div
										onClick={() => handleCardClick(schedule.id)}
										className={`rounded-xl p-6 shadow-lg cursor-pointer transition-all hover:scale-105 hover:shadow-2xl ${
											darkMode ? "bg-slate-800" : "bg-white"
										}`}
									>
										<div className="flex items-start gap-4 mb-4">
											<img
												src={`${API_URL}/${schedule.extracurricular.imageUrl}`}
												alt={schedule.extracurricular.name}
												className="w-16 h-16 rounded-xl object-cover"
											/>
											<div className="flex-1">
												<h3
													className={`font-bold text-lg mb-1 ${
														darkMode ? "text-white" : "text-slate-900"
													}`}
												>
													{schedule.title}
												</h3>
												<p
													className={`text-sm ${
														darkMode ? "text-slate-400" : "text-slate-500"
													}`}
												>
													{schedule.extracurricular.name}
												</p>
											</div>
										</div>

										<p
											className={`text-sm mb-4 line-clamp-2 ${
												darkMode ? "text-slate-300" : "text-slate-600"
											}`}
										>
											{schedule.description}
										</p>

										<div className="space-y-2">
											<div
												className={`flex items-center gap-2 text-sm ${
													darkMode ? "text-slate-400" : "text-slate-500"
												}`}
											>
												<FiClock />
												{new Date(schedule.scheduleDate).toLocaleString(
													"id-ID",
													{
														day: "numeric",
														month: "long",
														year: "numeric",
														hour: "2-digit",
														minute: "2-digit",
													}
												)}
											</div>

											<div
												className={`flex items-center gap-2 text-sm ${
													darkMode ? "text-slate-400" : "text-slate-500"
												}`}
											>
												<FiMapPin />
												{schedule.location}
											</div>

											<div
												className={`flex items-center gap-2 text-sm ${
													darkMode ? "text-slate-400" : "text-slate-500"
												}`}
											>
												<FiUser />
												{schedule.extracurricular.pembina.name}
											</div>
										</div>
									</div>
								</AnimatedWrapper>
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
						onSuccess={() => fetchScheduleData(searchQuery)}
						ekskulList={ekskulList}
					/>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Jadwal;