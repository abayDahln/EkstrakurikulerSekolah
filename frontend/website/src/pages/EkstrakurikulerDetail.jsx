import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { FaUsers, FaStar, FaChartBar, FaTrophy } from "react-icons/fa";
import config from "../config/config";
import { fetchWithAuth, getImageUrl } from "../utils/utils";
import { useConnection } from "../context/ConnectionContext";

const SkeletonDetail = ({ darkMode }) => (
	<div className="space-y-6">
		<div className={`rounded-2xl shadow-lg p-6 ${darkMode ? "bg-slate-800" : "bg-white"}`}>
			<div className="flex flex-col md:flex-row gap-8">
				<div className={`w-full md:w-1/3 aspect-video rounded-xl animate-pulse ${darkMode ? "bg-slate-700" : "bg-slate-200"}`} />
				<div className="flex-1 space-y-4">
					<div className={`h-10 w-2/3 rounded-lg animate-pulse ${darkMode ? "bg-slate-700" : "bg-slate-200"}`} />
					<div className="space-y-2">
						<div className={`h-4 w-full rounded animate-pulse ${darkMode ? "bg-slate-700" : "bg-slate-200"}`} />
						<div className={`h-4 w-5/6 rounded animate-pulse ${darkMode ? "bg-slate-700" : "bg-slate-200"}`} />
					</div>
					<div className="flex items-center gap-3">
						<div className={`w-12 h-12 rounded-full animate-pulse ${darkMode ? "bg-slate-700" : "bg-slate-200"}`} />
						<div className={`h-6 w-32 rounded animate-pulse ${darkMode ? "bg-slate-700" : "bg-slate-200"}`} />
					</div>
				</div>
			</div>
		</div>

		<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
			{[...Array(3)].map((_, i) => (
				<div key={i} className={`rounded-2xl shadow-lg p-6 ${darkMode ? "bg-slate-800" : "bg-white"}`}>
					<div className={`h-8 w-24 rounded animate-pulse mb-2 ${darkMode ? "bg-slate-700" : "bg-slate-200"}`} />
					<div className={`h-4 w-32 rounded animate-pulse ${darkMode ? "bg-slate-700" : "bg-slate-200"}`} />
				</div>
			))}
		</div>
	</div>
);

const EkstrakurikulerDetail = ({ darkMode }) => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [ekskul, setEkskul] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isInitialLoad, setIsInitialLoad] = useState(true);
	const { isServerDown, setIsServerDown } = useConnection();
	const [sortBy, setSortBy] = useState("points");
	const API_URL = config.BASE_URL;
	const intervalRef = useRef(null);

	const fetchDetail = async () => {
		try {
			const response = await fetchWithAuth(`${API_URL}/api/extracurricular/${id}`);
			if (!response.ok) throw new Error("Gagal mengambil detail ekskul");
			const result = await response.json();
			if (result.status === 200) {
				setEkskul(result.data);
				setIsServerDown(false);
			}
		} catch (error) {
			console.error("Error:", error);
			setIsServerDown(true);
		} finally {
			setIsLoading(false);
			if (isInitialLoad) setIsInitialLoad(false);
		}
	};

	useEffect(() => {
		fetchDetail();
		const handleRetry = () => fetchDetail();
		window.addEventListener("retry-connection", handleRetry);
		intervalRef.current = setInterval(fetchDetail, 60000);
		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
			window.removeEventListener("retry-connection", handleRetry);
		};
	}, [id]);

	const sortedMembers = React.useMemo(() => {
		if (!ekskul?.members) return [];
		let members = [...ekskul.members];
		switch (sortBy) {
			case "name":
				members.sort((a, b) => a.name.localeCompare(b.name));
				break;
			case "points":
				members.sort((a, b) => (b.totalPoints || 0) - (a.totalPoints || 0));
				break;
			case "joinDate":
				members.sort((a, b) => new Date(b.joinDate || 0) - new Date(a.joinDate || 0));
				break;
			default:
				break;
		}
		return members;
	}, [ekskul?.members, sortBy]);

	const handleBack = () => navigate("/ekskuls");
	const handleProfileClick = (id) => navigate(`/profile/${id}`);

	const formatJoinDate = (dateString) => {
		if (!dateString) return "Tidak tersedia";
		return new Date(dateString).toLocaleDateString("id-ID", {
			day: "numeric",
			month: "long",
			year: "numeric",
		});
	};

	if (isLoading && isInitialLoad) {
		return (
			<div className="p-8">
				<button onClick={handleBack} className={`flex items-center gap-2 mb-6 px-4 py-2 rounded-lg transition-colors ${darkMode ? "hover:bg-slate-800 text-slate-300" : "hover:bg-slate-100 text-slate-600"}`}>
					<span className="text-2xl">←</span>
					<span className="font-semibold">Back</span>
				</button>
				<SkeletonDetail darkMode={darkMode} />
			</div>
		);
	}

	return (
		<div className="p-8">
			<button onClick={handleBack} className={`flex items-center gap-2 mb-6 px-4 py-2 rounded-lg transition-colors ${darkMode ? "hover:bg-slate-800 text-slate-300" : "hover:bg-slate-100 text-slate-600"}`}>
				<span className="text-2xl">←</span>
				<span className="font-semibold">Back</span>
			</button>

			{isServerDown || !ekskul ? (
				<div className="text-center py-16">
					<div className="text-6xl mb-4">⚠️</div>
					<h3 className={`text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-slate-900"}`}>
						{isServerDown ? "Server Tidak Dapat Dihubungi" : "Data Tidak Ditemukan"}
					</h3>
					<p className={`${darkMode ? "text-slate-400" : "text-slate-500"} mb-4`}>
						{isServerDown ? "Pastikan backend sedang berjalan dan koneksi aktif." : "Ekstrakurikuler tidak ditemukan."}
					</p>
					<button onClick={handleBack} className="px-6 py-2 rounded-lg font-semibold bg-sky-500 hover:bg-sky-600 text-white">
						Kembali ke Daftar Ekskul
					</button>
				</div>
			) : (
				<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
						<div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
							<img
								src={getImageUrl(ekskul.imageUrl)}
								alt={ekskul.name}
								className="w-full h-full object-cover"
								onError={(e) => { e.target.src = "https://placehold.co/800x600?text=No+Image"; }}
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
						</div>

						<div className="flex flex-col justify-center">
							<h1 className={`text-4xl font-extrabold mb-4 ${darkMode ? "text-white" : "text-slate-900"}`}>{ekskul.name}</h1>
							<p className={`text-lg mb-6 leading-relaxed ${darkMode ? "text-slate-300" : "text-slate-600"}`}>{ekskul.description}</p>
							{ekskul.pembina && (
								<div className={`rounded-xl p-6 mb-6 ${darkMode ? "bg-slate-800" : "bg-white"} shadow-lg cursor-pointer hover:scale-105 transition-transform`} onClick={() => handleProfileClick(ekskul.pembina.id)}>
									<p className={`text-sm font-semibold mb-3 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>Pembina</p>
									<div className="flex items-center gap-4">
										<img
											src={getImageUrl(ekskul.pembina.profile)}
											alt={ekskul.pembina.name}
											className="w-16 h-16 rounded-full object-cover"
											onError={(e) => { e.target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(ekskul.pembina.name); }}
										/>
										<div>
											<h3 className={`text-xl font-bold ${darkMode ? "text-white" : "text-slate-900"}`}>{ekskul.pembina.name}</h3>
											<p className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}>Pembina Ekstrakurikuler</p>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>

					<div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
						<div className={`rounded-2xl shadow-lg p-6 ${darkMode ? "bg-slate-800" : "bg-white"}`}>
							<div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
								<h2 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-slate-900"}`}>Members</h2>
								<select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={`px-4 py-2 rounded-lg border transition-colors ${darkMode ? "bg-slate-700 border-slate-600 text-white focus:border-sky-500" : "bg-white border-slate-300 text-slate-900 focus:border-sky-400"}`}>
									<option value="name">Name</option>
									<option value="points">Points</option>
									<option value="joinDate">Join Date</option>
								</select>
							</div>

							<div className="space-y-4">
								{sortedMembers.length > 0 ? sortedMembers.map((member) => (
									<div key={member.id} className={`rounded-xl p-4 transition-all hover:scale-105 cursor-pointer ${darkMode ? "bg-slate-700/50 hover:bg-slate-700" : "bg-slate-50 hover:bg-slate-100"}`} onClick={() => handleProfileClick(member.id)}>
										<div className="flex items-center gap-4">
											<img
												src={getImageUrl(member.profile)}
												alt={member.name}
												className="w-14 h-14 rounded-full object-cover flex-shrink-0"
												onError={(e) => { e.target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(member.name); }}
											/>
											<div className="flex-1 min-w-0">
												<div className="flex items-center justify-between mb-1">
													<h4 className={`font-bold truncate ${darkMode ? "text-white" : "text-slate-900"}`}>{member.name}</h4>
													<span className={`px-2 py-1 rounded-full text-xs font-semibold ${darkMode ? "bg-sky-900 text-sky-200" : "bg-sky-100 text-sky-800"}`}>{member.totalPoints || 0} Poin</span>
												</div>
												<p className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}>Bergabung: {formatJoinDate(member.joinDate)}</p>
											</div>
										</div>
									</div>
								)) : (
									<div className="text-center py-12">
										<div className="text-5xl mb-4">👥</div>
										<p className={`${darkMode ? "text-slate-400" : "text-slate-500"}`}>Belum ada anggota</p>
									</div>
								)}
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className={`rounded-xl p-6 ${darkMode ? "bg-slate-800" : "bg-white"} shadow-lg`}>
								<div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center ${darkMode ? "bg-sky-900/50" : "bg-sky-100"}`}>
									<FaUsers className={`text-xl ${darkMode ? "text-sky-400" : "text-sky-600"}`} />
								</div>
								<h3 className={`text-3xl font-bold mb-1 ${darkMode ? "text-white" : "text-slate-900"}`}>{ekskul.members?.length || 0}</h3>
								<p className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}>Total Anggota</p>
							</div>

							<div className={`rounded-xl p-6 ${darkMode ? "bg-slate-800" : "bg-white"} shadow-lg`}>
								<div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center ${darkMode ? "bg-purple-900/50" : "bg-purple-100"}`}>
									<FaStar className={`text-xl ${darkMode ? "text-purple-400" : "text-purple-600"}`} />
								</div>
								<h3 className={`text-3xl font-bold mb-1 ${darkMode ? "text-white" : "text-slate-900"}`}>
									{ekskul.members?.reduce((sum, m) => sum + (m.totalPoints || 0), 0) || 0}
								</h3>
								<p className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}>Total Points</p>
							</div>

							<div className={`rounded-xl p-6 ${darkMode ? "bg-slate-800" : "bg-white"} shadow-lg`}>
								<div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center ${darkMode ? "bg-green-900/50" : "bg-green-100"}`}>
									<FaChartBar className={`text-xl ${darkMode ? "text-green-400" : "text-green-600"}`} />
								</div>
								<h3 className={`text-3xl font-bold mb-1 ${darkMode ? "text-white" : "text-slate-900"}`}>
									{ekskul.members?.filter((m) => (m.totalPoints || 0) >= 100).length || 0}
								</h3>
								<p className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}>Anggota Aktif (≥100 pts)</p>
							</div>

							<div className={`rounded-xl p-6 ${darkMode ? "bg-slate-800" : "bg-white"} shadow-lg`}>
								<div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center ${darkMode ? "bg-orange-900/50" : "bg-orange-100"}`}>
									<FaTrophy className={`text-xl ${darkMode ? "text-orange-400" : "text-orange-600"}`} />
								</div>
								<h3 className={`text-3xl font-bold mb-1 ${darkMode ? "text-white" : "text-slate-900"}`}>
									{Math.round(ekskul.members?.reduce((sum, m) => sum + (m.totalPoints || 0), 0) / (ekskul.members?.length || 1)) || 0}
								</h3>
								<p className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}>Rata-rata Poin</p>
							</div>
						</div>
					</div>
				</motion.div>
			)}
		</div>
	);
};

export default EkstrakurikulerDetail;
