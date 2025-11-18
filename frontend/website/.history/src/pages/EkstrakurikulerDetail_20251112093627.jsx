import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { FaUsers, FaStar, FaChartBar, FaTrophy } from "react-icons/fa";
import Sidebar from "../components/Sidebar";

const SkeletonDetail = ({ darkMode }) => (
	<div className="space-y-8 max-w-7xl">
		{/* Hero Section */}
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
			{/* Image Skeleton */}
			<div
				className={`h-96 rounded-2xl animate-pulse ${
					darkMode ? "bg-slate-700" : "bg-slate-200"
				}`}
			/>

			<div className="flex flex-col justify-center space-y-4">
				<div
					className={`h-10 w-2/3 rounded animate-pulse ${
						darkMode ? "bg-slate-700" : "bg-slate-200"
					}`}
				/>
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
				<div
					className={`rounded-xl p-6 mt-4 animate-pulse ${
						darkMode ? "bg-slate-800" : "bg-white"
					} shadow-lg`}
				>
					<div className="flex items-center gap-4">
						<div
							className={`w-16 h-16 rounded-full ${
								darkMode ? "bg-slate-700" : "bg-slate-200"
							}`}
						/>
						<div className="flex-1 space-y-2">
							<div
								className={`h-4 w-1/2 rounded ${
									darkMode ? "bg-slate-700" : "bg-slate-200"
								}`}
							/>
							<div
								className={`h-3 w-1/3 rounded ${
									darkMode ? "bg-slate-700" : "bg-slate-200"
								}`}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>

		{/* Main Content */}
		<div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
			<div
				className={`rounded-2xl shadow-lg p-6 ${
					darkMode ? "bg-slate-800" : "bg-white"
				}`}
			>
				<div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
					<div
						className={`h-6 w-32 rounded ${
							darkMode ? "bg-slate-700" : "bg-slate-200"
						} animate-pulse`}
					/>
					<div
						className={`h-8 w-36 rounded ${
							darkMode ? "bg-slate-700" : "bg-slate-200"
						} animate-pulse`}
					/>
				</div>

				<div className="space-y-4">
					{Array(4)
						.fill(0)
						.map((_, i) => (
							<div
								key={i}
								className={`rounded-xl p-4 flex items-center gap-4 animate-pulse ${
									darkMode ? "bg-slate-700/50" : "bg-slate-100"
								}`}
							>
								<div
									className={`w-14 h-14 rounded-full ${
										darkMode ? "bg-slate-600" : "bg-slate-300"
									}`}
								/>
								<div className="flex-1 space-y-2">
									<div
										className={`h-4 w-1/2 rounded ${
											darkMode ? "bg-slate-600" : "bg-slate-300"
										}`}
									/>
									<div
										className={`h-3 w-1/3 rounded ${
											darkMode ? "bg-slate-600" : "bg-slate-300"
										}`}
									/>
								</div>
							</div>
						))}
				</div>
			</div>

			<div className="space-y-6">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{Array(4)
						.fill(0)
						.map((_, i) => (
							<div
								key={i}
								className={`rounded-xl p-6 shadow-lg animate-pulse ${
									darkMode ? "bg-slate-800" : "bg-white"
								}`}
							>
								<div
									className={`w-12 h-12 rounded-xl mb-4 ${
										darkMode ? "bg-slate-700" : "bg-slate-200"
									}`}
								/>
								<div
									className={`h-6 w-1/3 mb-2 rounded ${
										darkMode ? "bg-slate-700" : "bg-slate-200"
									}`}
								/>
								<div
									className={`h-3 w-1/2 rounded ${
										darkMode ? "bg-slate-700" : "bg-slate-200"
									}`}
								/>
							</div>
						))}
				</div>
			</div>
		</div>
	</div>
);


const EkstrakurikulerDetail = ({ darkMode }) => {
	const [ekskulDetail, setEkskulDetail] = useState(null);
	const [isInitialLoad, setIsInitialLoad] = useState(true);
	const [isServerDown, setIsServerDown] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [sortBy, setSortBy] = useState("name");

	const { id } = useParams();
	const navigate = useNavigate();
	const API_URL = "http://localhost:5000";
	const intervalRef = useRef(null);

	const fetchEkskulDetail = async () => {
		try {
			const token =
				localStorage.getItem("token") || sessionStorage.getItem("token");
			const headers = { Authorization: `Bearer ${token}` };

			const response = await fetch(`${API_URL}/api/extracurricular/${id}`, {
				headers,
			});

			if (!response.ok) {
				throw new Error("Failed to fetch data");
			}

			const result = await response.json();

			if (result.status === 200) {
				setEkskulDetail(result.data);
				setIsServerDown(false);
			} else {
				throw new Error(result.message || "Failed to fetch data");
			}
		} catch (error) {
			console.error("Error fetching ekstrakurikuler detail:", error);
			setIsServerDown(true);
			setEkskulDetail(null);
		} finally {
			setIsLoading(false);
			if (isInitialLoad) {
				setIsInitialLoad(false);
			}
		}
	};

	useEffect(() => {
		if (!id) {
			console.error("No ID provided in URL");
			return;
		}

    setTimeout(() => {
      fetchEkskulDetail();
    }, 1000);
		

		intervalRef.current = setInterval(() => {
			fetchEkskulDetail();
		}, 2000);

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, []);

	const sortedMembers = React.useMemo(() => {
		if (!ekskulDetail?.members) return [];

		let members = [...ekskulDetail.members];

		switch (sortBy) {
			case "name":
				members.sort((a, b) => a.name.localeCompare(b.name));
				break;
			case "points":
				members.sort((a, b) => (b.totalPoints || 0) - (a.totalPoints || 0));
				break;
			case "joinDate":
				members.sort(
					(a, b) => new Date(b.joinDate || 0) - new Date(a.joinDate || 0)
				);
				break;
			default:
				break;
		}

		return members;
	}, [ekskulDetail?.members, sortBy]);

	const handleBack = () => {
		navigate("/ekskuls");
	};

	const handleProfileClick = (id) => {
		navigate(`/profile/${id}`);
	};

	// Format date
	const formatJoinDate = (dateString) => {
		if (!dateString) return "Tidak tersedia";
		const date = new Date(dateString);
		return date.toLocaleDateString("id-ID", {
			day: "numeric",
			month: "long",
			year: "numeric",
		});
	};

	const handleImageError = (e, fallbackText = "E") => {
		e.currentTarget.onerror = null;
		e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%2338bdf8' width='100' height='100'/%3E%3Ctext x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='36' font-family='Arial'%3E${fallbackText}%3C/text%3E%3C/svg%3E`;
	};

	const handleMemberImageError = (e, fallbackText = "M") => {
		e.currentTarget.onerror = null;
		e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Crect fill='%2338bdf8' width='48' height='48'/%3E%3Ctext x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='18' font-family='Arial'%3E${fallbackText}%3C/text%3E%3C/svg%3E`;
	};

	if (isLoading) {
		return (
			<div
				className={`min-h-screen transition-colors duration-300 ${
					darkMode
						? "bg-slate-900"
						: "bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50"
				}`}
			>
				<Sidebar darkMode={darkMode} initialMenu={2} />
				<div
					className="transition-all duration-300"
					style={{ marginLeft: "280px" }}
				>
					<div className="p-8">
						<SkeletonDetail darkMode={darkMode} />
					</div>
				</div>
			</div>
		);
	}

	return (
		<div
			className={`min-h-screen transition-colors duration-300 ${
				darkMode
					? "bg-slate-900"
					: "bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50"
			}`}
			style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
		>
			<Sidebar darkMode={darkMode} initialMenu={3} />

			<div
				className="transition-all duration-300"
				style={{ marginLeft: "280px" }}
			>
				<div className="p-8">
					{/* Back Button */}
					<motion.button
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.4 }}
						onClick={handleBack}
						className={`cursor-pointer flex items-center gap-2 mb-6 px-4 py-2 rounded-lg transition-colors ${
							darkMode
								? "hover:bg-slate-800 text-slate-300"
								: "hover:bg-slate-100 text-slate-600"
						}`}
					>
						<span className="text-3xl">←</span>
						<span className="font-semibold mt-1.5">Back</span>
					</motion.button>

					{isServerDown || !ekskulDetail ? (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							className="text-center py-16"
						>
							<div className="text-6xl mb-4">⚠️</div>
							<h3
								className={`text-xl font-bold mb-2 ${
									darkMode ? "text-white" : "text-slate-900"
								}`}
							>
								{isServerDown
									? "Server Tidak Dapat Dihubungi"
									: "Data Tidak Ditemukan"}
							</h3>
							<p
								className={`${
									darkMode ? "text-slate-400" : "text-slate-500"
								} mb-4`}
							>
								{isServerDown
									? "Pastikan backend sedang berjalan dan koneksi aktif."
									: "Ekstrakurikuler dengan ID tersebut tidak ditemukan."}
							</p>
							<button
								onClick={handleBack}
								className={`px-6 py-2 rounded-lg font-semibold ${
									darkMode
										? "bg-sky-600 hover:bg-sky-700 text-white"
										: "bg-sky-500 hover:bg-sky-600 text-white"
								}`}
							>
								Kembali ke Daftar Ekskul
							</button>
						</motion.div>
					) : (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							className="max-w-7xl"
						>
							{/* Hero Section */}
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
								{/* Image */}
								<div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
									<img
										src={`${API_URL}/${ekskulDetail.imageUrl}`}
										alt={ekskulDetail.name}
										className="w-full h-full object-cover"
										onError={(e) =>
											handleImageError(e, ekskulDetail.name?.charAt(0) || "E")
										}
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
								</div>

								{/* Info */}
								<div className="flex flex-col justify-center">
									<h1
										className={`text-4xl font-extrabold mb-4 ${
											darkMode ? "text-white" : "text-slate-900"
										}`}
									>
										{ekskulDetail.name}
									</h1>

									<p
										className={`text-lg mb-6 leading-relaxed ${
											darkMode ? "text-slate-300" : "text-slate-600"
										}`}
									>
										{ekskulDetail.description}
									</p>

									{/* Pembina Card */}
									{ekskulDetail.pembinas &&
										ekskulDetail.pembinas.length > 0 && (
											<div
												className={`rounded-xl p-6 mb-6 ${
													darkMode ? "bg-slate-800" : "bg-white"
												} shadow-lg cursor-pointer hover:scale-105 transition-transform`}
												onClick={() =>
													handleProfileClick(ekskulDetail.pembinas)
												}
											>
												<p
													className={`text-sm font-semibold mb-3 ${
														darkMode ? "text-slate-400" : "text-slate-500"
													}`}
												>
													Pembina
												</p>
												<div className="flex items-center gap-4">
													<img
														src={`${API_URL}/${
															ekskulDetail.pembinas[0].profile || ""
														}`}
														alt={ekskulDetail.pembinas[0].name}
														className="w-16 h-16 rounded-full object-cover"
														onError={(e) =>
															handleImageError(
																e,
																ekskulDetail.pembinas[0].name?.charAt(0) || "P"
															)
														}
													/>
													<div>
														<h3
															className={`text-xl font-bold ${
																darkMode ? "text-white" : "text-slate-900"
															}`}
														>
															{ekskulDetail.pembinas[0].name}
														</h3>
														<p
															className={`text-sm ${
																darkMode ? "text-slate-400" : "text-slate-500"
															}`}
														>
															Pembina Ekstrakurikuler
														</p>
													</div>
												</div>
											</div>
										)}
								</div>
							</div>

							{/* Main Content - 50:50 Layout */}
							<div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
								{/* Left Column - Members List */}
								<div
									className={`rounded-2xl shadow-lg p-6 ${
										darkMode ? "bg-slate-800" : "bg-white"
									}`}
								>
									<div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
										<h2
											className={`text-2xl font-bold ${
												darkMode ? "text-white" : "text-slate-900"
											}`}
										>
											Members
										</h2>

										{/* Sort Dropdown */}
										<select
											value={sortBy}
											onChange={(e) => setSortBy(e.target.value)}
											className={`px-4 py-2 rounded-lg border transition-colors pl-3 ${
												darkMode
													? "bg-slate-700 border-slate-600 text-white focus:border-sky-500"
													: "bg-white border-slate-300 text-slate-900 focus:border-sky-400"
											}`}
										>
											<option value="name">Name</option>
											<option value="points">Points</option>
											<option value="joinDate">Join Date</option>
										</select>
									</div>

									{sortedMembers.length > 0 ? (
										<div className="space-y-4">
											{sortedMembers.map((member) => (
												<div
													key={member.id}
													className={`rounded-xl p-4 transition-all hover:scale-105 cursor-pointer ${
														darkMode
															? "bg-slate-700/50 hover:bg-slate-700"
															: "bg-slate-50 hover:bg-slate-100"
													}`}
													onClick={() => handleMemberClick(member.id)}
												>
													<div className="flex items-center gap-4">
														<img
															src={`${API_URL}/${member.profile || ""}`}
															alt={member.name}
															className="w-14 h-14 rounded-full object-cover flex-shrink-0"
															onError={(e) =>
																handleMemberImageError(
																	e,
																	member.name?.charAt(0) || "M"
																)
															}
														/>
														<div className="flex-1 min-w-0">
															<div className="flex items-center justify-between mb-1">
																<h4
																	className={`font-bold truncate ${
																		darkMode ? "text-white" : "text-slate-900"
																	}`}
																>
																	{member.name}
																</h4>
																<span
																	className={`px-2 py-1 rounded-full text-xs font-semibold ${
																		darkMode
																			? "bg-sky-900 text-sky-200"
																			: "bg-sky-100 text-sky-800"
																	}`}
																>
																	{member.totalPoints || 0} Poin
																</span>
															</div>
															<p
																className={`text-sm ${
																	darkMode ? "text-slate-400" : "text-slate-500"
																}`}
															>
																Bergabung: {formatJoinDate(member.joinDate)}
															</p>
														</div>
													</div>
												</div>
											))}
										</div>
									) : (
										<div className="text-center py-12">
											<div className="text-5xl mb-4">👥</div>
											<p
												className={`${
													darkMode ? "text-slate-400" : "text-slate-500"
												}`}
											>
												Belum ada anggota
											</p>
										</div>
									)}
								</div>

								{/* Right Column - Stats */}
								<div className="space-y-6">
									{/* Stats Cards */}
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div
											className={`rounded-xl p-6 ${
												darkMode ? "bg-slate-800" : "bg-white"
											} shadow-lg`}
										>
											<div
												className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center ${
													darkMode ? "bg-sky-900/50" : "bg-sky-100"
												}`}
											>
												<FaUsers
													className={`text-xl ${
														darkMode ? "text-sky-400" : "text-sky-600"
													}`}
												/>
											</div>
											<h3
												className={`text-3xl font-bold mb-1 ${
													darkMode ? "text-white" : "text-slate-900"
												}`}
											>
												{ekskulDetail.members?.length || 0}
											</h3>
											<p
												className={`text-sm ${
													darkMode ? "text-slate-400" : "text-slate-500"
												}`}
											>
												Total Anggota
											</p>
										</div>

										<div
											className={`rounded-xl p-6 ${
												darkMode ? "bg-slate-800" : "bg-white"
											} shadow-lg`}
										>
											<div
												className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center ${
													darkMode ? "bg-purple-900/50" : "bg-purple-100"
												}`}
											>
												<FaStar
													className={`text-xl ${
														darkMode ? "text-purple-400" : "text-purple-600"
													}`}
												/>
											</div>
											<h3
												className={`text-3xl font-bold mb-1 ${
													darkMode ? "text-white" : "text-slate-900"
												}`}
											>
												{ekskulDetail.members?.reduce(
													(sum, m) => sum + (m.totalPoints || 0),
													0
												) || 0}
											</h3>
											<p
												className={`text-sm ${
													darkMode ? "text-slate-400" : "text-slate-500"
												}`}
											>
												Total Points
											</p>
										</div>

										<div
											className={`rounded-xl p-6 ${
												darkMode ? "bg-slate-800" : "bg-white"
											} shadow-lg`}
										>
											<div
												className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center ${
													darkMode ? "bg-green-900/50" : "bg-green-100"
												}`}
											>
												<FaChartBar
													className={`text-xl ${
														darkMode ? "text-green-400" : "text-green-600"
													}`}
												/>
											</div>
											<h3
												className={`text-3xl font-bold mb-1 ${
													darkMode ? "text-white" : "text-slate-900"
												}`}
											>
												{ekskulDetail.members?.filter(
													(m) => (m.totalPoints || 0) >= 100
												).length || 0}
											</h3>
											<p
												className={`text-sm ${
													darkMode ? "text-slate-400" : "text-slate-500"
												}`}
											>
												Anggota Aktif (≥100 pts)
											</p>
										</div>

										<div
											className={`rounded-xl p-6 ${
												darkMode ? "bg-slate-800" : "bg-white"
											} shadow-lg`}
										>
											<div
												className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center ${
													darkMode ? "bg-orange-900/50" : "bg-orange-100"
												}`}
											>
												<FaTrophy
													className={`text-xl ${
														darkMode ? "text-orange-400" : "text-orange-600"
													}`}
												/>
											</div>
											<h3
												className={`text-3xl font-bold mb-1 ${
													darkMode ? "text-white" : "text-slate-900"
												}`}
											>
												{Math.round(
													ekskulDetail.members?.reduce(
														(sum, m) => sum + (m.totalPoints || 0),
														0
													) / (ekskulDetail.members?.length || 1)
												) || 0}
											</h3>
											<p
												className={`text-sm ${
													darkMode ? "text-slate-400" : "text-slate-500"
												}`}
											>
												Rata-rata Poin
											</p>
										</div>
									</div>
								</div>
							</div>
						</motion.div>
					)}
				</div>
			</div>
		</div>
	);
};

export default EkstrakurikulerDetail;
