import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../components/Sidebar.jsx";
import Calendar from "../components/Calendar.jsx";

const SkeletonCard = ({ darkMode }) => (
	<div
		className={`rounded-2xl shadow-lg p-5 ${
			darkMode ? "bg-slate-800" : "bg-white"
		}`}
	>
		<div
			className={`h-8 w-16 rounded animate-pulse mb-2 ${
				darkMode ? "bg-slate-700" : "bg-slate-200"
			}`}
		/>
		<div
			className={`h-3 w-24 rounded animate-pulse ${
				darkMode ? "bg-slate-700" : "bg-slate-200"
			}`}
		/>
	</div>
);

const SkeletonEkskulItem = ({ darkMode }) => (
	<div className="flex items-center gap-4">
		<div
			className={`w-16 h-16 rounded-xl animate-pulse ${
				darkMode ? "bg-slate-700" : "bg-slate-200"
			}`}
		/>
		<div className="flex-1">
			<div
				className={`h-4 w-32 rounded animate-pulse mb-2 ${
					darkMode ? "bg-slate-700" : "bg-slate-200"
				}`}
			/>
			<div
				className={`h-2 rounded-full animate-pulse ${
					darkMode ? "bg-slate-700" : "bg-slate-200"
				}`}
			/>
		</div>
	</div>
);

const SkeletonMemberRow = ({ darkMode }) => (
	<div className="grid grid-cols-4 items-center py-3">
		<div className="flex items-center gap-3">
			<div
				className={`w-10 h-10 rounded-full animate-pulse ${
					darkMode ? "bg-slate-700" : "bg-slate-200"
				}`}
			/>
			<div className="space-y-2">
				<div
					className={`h-3 w-24 rounded animate-pulse ${
						darkMode ? "bg-slate-700" : "bg-slate-200"
					}`}
				/>
				<div
					className={`h-2 w-32 rounded animate-pulse ${
						darkMode ? "bg-slate-700" : "bg-slate-200"
					}`}
				/>
			</div>
		</div>
		<div
			className={`h-6 w-20 rounded-full animate-pulse ${
				darkMode ? "bg-slate-700" : "bg-slate-200"
			}`}
		/>
		<div
			className={`h-3 w-24 rounded animate-pulse ${
				darkMode ? "bg-slate-700" : "bg-slate-200"
			}`}
		/>
		<div
			className={`h-6 w-16 rounded-full animate-pulse ml-auto ${
				darkMode ? "bg-slate-700" : "bg-slate-200"
			}`}
		/>
	</div>
);

const SkeletonScheduleItem = ({ darkMode }) => (
	<li className="flex items-center gap-3">
		<div
			className={`w-10 h-10 rounded-lg animate-pulse ${
				darkMode ? "bg-slate-700" : "bg-slate-200"
			}`}
		/>
		<div className="flex-1 space-y-2">
			<div
				className={`h-3 w-full rounded animate-pulse ${
					darkMode ? "bg-slate-700" : "bg-slate-200"
				}`}
			/>
			<div
				className={`h-2 w-3/4 rounded animate-pulse ${
					darkMode ? "bg-slate-700" : "bg-slate-200"
				}`}
			/>
		</div>
	</li>
);

const Home = ({ darkMode }) => {
	const [scheduleData, setScheduleData] = useState([]);
	const [activeMenu, setActiveMenu] = useState(1);
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
	const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
	const [dashboardData, setDashboardData] = useState(null);
	const [isServerDown, setIsServerDown] = useState(false);
	const [allMembers, setAllMembers] = useState([]);
	const [memberFilter, setMemberFilter] = useState("points");
	const [isInitialLoad, setIsInitialLoad] = useState(true);

	const API_URL = "http://localhost:5000";
	const intervalRef = useRef(null);

	const toUTCDateStr = (dateInput) => {
		const d = new Date(dateInput);
		const year = d.getUTCFullYear();
		const month = String(d.getUTCMonth() + 1).padStart(2, "0");
		const day = String(d.getUTCDate()).padStart(2, "0");
		return `${year}-${month}-${day}`;
	};

	const fetchAllData = async () => {
		try {
			// Fetch dashboard data dengan fetchWithAuth
			const dashboardResponse = await fetchWithAuth(
				`${API_URL}/api/pembina/dashboard`
			);
			const dashboardResult = await dashboardResponse.json();

			if (dashboardResult.status === 200) {
				setDashboardData(dashboardResult.data);
				setIsServerDown(false);
			} else if (dashboardResult.status === 401) {
				// Handle case where response is 200 but status indicates unauthorized
				throw new Error("Unauthorized");
			}

			// Fetch member data
			const memberResponse = await fetchWithAuth(
				`${API_URL}/api/pembina/member`
			);
			const memberResult = await memberResponse.json();

			if (memberResult.status === 200) {
				const membersWithEkskul = memberResult.data.map((member) => ({
					...member,
					ekskul: member.extracurricular?.name || "-",
				}));
				setAllMembers(membersWithEkskul);
			} else if (memberResult.status === 401) {
				throw new Error("Unauthorized");
			}

			// Fetch schedule data
			const scheduleResponse = await fetchWithAuth(
				`${API_URL}/api/pembina/schedule`
			);
			const scheduleResult = await scheduleResponse.json();

			if (scheduleResult.status === 200 && Array.isArray(scheduleResult.data)) {
				const utcSchedules = scheduleResult.data.map((item) => ({
					...item,
					utcDate: toUTCDateStr(item.scheduleDate),
				}));
				setScheduleData(utcSchedules);
			} else if (scheduleResult.status === 401) {
				throw new Error("Unauthorized");
			}

			// Setelah fetch pertama berhasil, set initial load false
			if (isInitialLoad) {
				setIsInitialLoad(false);
			}
		} catch (error) {
			console.error("Error fetching data:", error);

			// Handle unauthorized errors specifically
			if (
				error.message.includes("Unauthorized") ||
				error.message.includes("No token")
			) {
				sessionManager.removeToken();
				// Tidak perlu set state karena akan redirect
				return;
			}

			// Handle other errors (network, server down, etc.)
			setIsServerDown(true);
			setDashboardData(null);
			setAllMembers([]);
			setScheduleData([]);

			// Tetap set initial load false meskipun error
			if (isInitialLoad) {
				setIsInitialLoad(false);
			}
		}
	};

	const fetchWithAuth = async (url, options = {}) => {
		const token = sessionManager.getToken();

		// Jika token tidak ada, redirect ke login
		if (!token) {
			sessionManager.removeToken();
			window.location.href = "/";
			throw new Error("No token found");
		}

		const headers = {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
			...options.headers,
		};

		try {
			const response = await fetch(url, { ...options, headers });

			// Handle unauthorized response
			if (response.status === 401) {
				sessionManager.removeToken();
				window.location.href = "/";
				throw new Error("Unauthorized - Token expired or invalid");
			}

			return response;
		} catch (error) {
			// Jika error network atau lainnya yang berhubungan dengan auth
			if (
				error.message.includes("Unauthorized") ||
				error.message.includes("No token")
			) {
				throw error;
			}
			// Untuk error lainnya, biarkan handled oleh caller
			throw error;
		}
	};

	useEffect(() => {
		// Fetch pertama kali
		fetchAllData();

		// Setup interval untuk auto-fetch setiap 1 detik
		intervalRef.current = setInterval(() => {
			fetchAllData();
		}, 1000);

		// Cleanup interval saat unmount
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, []);

	useEffect(() => {
		const isValidDay =
			typeof selectedDate === "number" &&
			selectedDate >= 1 &&
			selectedDate <= 31;
		if (isValidDay) return;

		const today = new Date();
		setSelectedDate(today.getDate());
		setSelectedMonth(today.getMonth());
		setSelectedYear(today.getFullYear());
	}, [selectedDate]);

	const filteredMembers = [...allMembers].sort((a, b) => {
		if (memberFilter === "name") {
			const nameA = a.name?.toLowerCase() || "";
			const nameB = b.name?.toLowerCase() || "";
			return nameA.localeCompare(nameB);
		}

		if (memberFilter === "joinDate") {
			const dateA = new Date(a.joinDate || 0);
			const dateB = new Date(b.joinDate || 0);
			return dateB - dateA;
		}

		const pointsA = a.totalPoints ?? 0;
		const pointsB = b.totalPoints ?? 0;
		return pointsB - pointsA;
	});

	const selectedFullDate = new Date(
		Date.UTC(selectedYear, selectedMonth, selectedDate)
	);
	const selectedDateStr = toUTCDateStr(selectedFullDate);

	const filteredSchedules = Array.isArray(scheduleData)
		? scheduleData.filter((s) => s.utcDate === selectedDateStr)
		: [];

	const selectedDateLabel = selectedFullDate.toLocaleDateString("id-ID", {
		day: "2-digit",
		month: "long",
		year: "numeric",
	});
	const AnimatedWrapper = ({ children, delay = 0 }) => {
		if (!isInitialLoad) return children;

		return (
			<motion.div
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay }}
			>
				{children}
			</motion.div>
		);
	};

	return (
		<div
			className={`min-h-screen transition-colors duration-300 ${
				darkMode
					? "bg-slate-900"
					: "bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50"
			}`}
			style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
		>
			<Sidebar
				darkMode={darkMode}
				activeMenu={activeMenu}
				setActiveMenu={setActiveMenu}
			/>

			<div
				className="transition-all duration-300"
				style={{ marginLeft: "280px" }}
			>
				<div className="p-8">
					{/* Header */}
					<div className="flex items-center justify-between mb-8">
						<div>
							<h1
								className={`text-3xl font-bold mb-1 ${
									darkMode ? "text-white" : "text-slate-900"
								}`}
							>
								Dashboard
							</h1>
							<p
								className={`text-sm ${
									darkMode ? "text-slate-400" : "text-slate-500"
								}`}
							>
								Pembina Ekstrakurikuler
							</p>
						</div>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
						{/* Left Column - Main Content */}
						<div className="lg:col-span-2 space-y-6">
							{/* Stats Cards */}
							<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
								{!dashboardData ? (
									<>
										<SkeletonCard darkMode={darkMode} />
										<SkeletonCard darkMode={darkMode} />
										<SkeletonCard darkMode={darkMode} />
										<SkeletonCard darkMode={darkMode} />
									</>
								) : (
									<>
										<AnimatedWrapper delay={0}>
											<div
												className={`rounded-2xl shadow-lg p-5 ${
													darkMode ? "bg-slate-800" : "bg-white"
												}`}
											>
												<h3
													className={`text-3xl font-bold mb-1 ${
														darkMode ? "text-white" : "text-slate-900"
													}`}
												>
													{dashboardData?.totalEkskul || 0}
												</h3>
												<p
													className={`text-xs ${
														darkMode ? "text-slate-400" : "text-slate-500"
													}`}
												>
													Total Ekskul
												</p>
											</div>
										</AnimatedWrapper>

										<AnimatedWrapper delay={0.1}>
											<div
												className={`rounded-2xl shadow-lg p-5 ${
													darkMode ? "bg-slate-800" : "bg-white"
												}`}
											>
												<h3
													className={`text-3xl font-bold mb-1 ${
														darkMode ? "text-white" : "text-slate-900"
													}`}
												>
													{dashboardData?.totalMember || 0}
												</h3>
												<p
													className={`text-xs ${
														darkMode ? "text-slate-400" : "text-slate-500"
													}`}
												>
													Total Member
												</p>
											</div>
										</AnimatedWrapper>

										<AnimatedWrapper delay={0.2}>
											<div
												className={`rounded-2xl shadow-lg p-5 ${
													darkMode ? "bg-slate-800" : "bg-white"
												}`}
											>
												<h3
													className={`text-3xl font-bold mb-1 ${
														darkMode ? "text-white" : "text-slate-900"
													}`}
												>
													{dashboardData?.totalJadwal || 0}
												</h3>
												<p
													className={`text-xs ${
														darkMode ? "text-slate-400" : "text-slate-500"
													}`}
												>
													Total Jadwal
												</p>
											</div>
										</AnimatedWrapper>

										<AnimatedWrapper delay={0.3}>
											<div
												className={`rounded-2xl shadow-lg p-5 ${
													darkMode ? "bg-slate-800" : "bg-white"
												}`}
											>
												<h3
													className={`text-3xl font-bold mb-1 ${
														darkMode ? "text-white" : "text-slate-900"
													}`}
												>
													{allMembers.reduce(
														(sum, m) => sum + m.totalPoints,
														0
													)}
												</h3>
												<p
													className={`text-xs ${
														darkMode ? "text-slate-400" : "text-slate-500"
													}`}
												>
													Total Poin
												</p>
											</div>
										</AnimatedWrapper>
									</>
								)}
							</div>

							{/* Ekstrakurikuler Overview */}
							<div
								className={`rounded-2xl shadow-lg p-6 ${
									darkMode ? "bg-slate-800" : "bg-white"
								}`}
							>
								<h2
									className={`text-xl font-bold mb-6 ${
										darkMode ? "text-white" : "text-slate-900"
									}`}
								>
									Ekstrakurikuler Overview
								</h2>

								<div className="space-y-4">
									{!dashboardData?.ekskulList ? (
										<>
											<SkeletonEkskulItem darkMode={darkMode} />
											<SkeletonEkskulItem darkMode={darkMode} />
											<SkeletonEkskulItem darkMode={darkMode} />
										</>
									) : dashboardData.ekskulList.length === 0 ? (
										<p
											className={`text-sm ${
												darkMode ? "text-slate-400" : "text-slate-500"
											}`}
										>
											No ekstrakurikuler data available.
										</p>
									) : (
										dashboardData.ekskulList.map((ekskul) => (
											<div key={ekskul.id} className="flex items-center gap-4">
												<img
													src={`${API_URL}/${ekskul.imageUrl}`}
													alt={ekskul.name}
													className="w-16 h-16 rounded-xl object-cover"
												/>
												<div className="flex-1">
													<div className="flex items-center justify-between mb-2">
														<h3
															className={`font-bold ${
																darkMode ? "text-white" : "text-slate-900"
															}`}
														>
															{ekskul.name}
														</h3>
														<span
															className={`text-sm font-semibold ${
																darkMode ? "text-slate-300" : "text-slate-600"
															}`}
														>
															{ekskul.totalMember} siswa
														</span>
													</div>
													<div
														className={`h-2 rounded-full overflow-hidden ${
															darkMode ? "bg-slate-700" : "bg-slate-200"
														}`}
													>
														<div
															className="h-full rounded-full transition-all duration-500"
															style={{
																width: `${
																	(ekskul.totalMember /
																		dashboardData.totalMember) *
																	100
																}%`,
																background: [
																	"#0ea5e9",
																	"#06b6d4",
																	"#3b82f6",
																	"#2563eb",
																	"#0284c7",
																][ekskul.id % 5],
															}}
														/>
													</div>
												</div>
											</div>
										))
									)}
								</div>
							</div>

							{/* Member List */}
							<div
								className={`rounded-2xl shadow-lg p-6 ${
									darkMode ? "bg-slate-800" : "bg-white"
								}`}
							>
								<div className="flex items-center justify-between mb-5">
									<h2
										className={`text-xl font-bold ${
											darkMode ? "text-white" : "text-slate-900"
										}`}
									>
										List Members
									</h2>
									<select
										value={memberFilter}
										onChange={(e) => setMemberFilter(e.target.value)}
										className={`text-sm rounded-lg px-3 py-1.5 outline-none border ${
											darkMode
												? "bg-slate-700 border-slate-600 text-white"
												: "bg-slate-100 border-slate-300 text-slate-800"
										} focus:ring-2 focus:ring-sky-500`}
									>
										<option value="points">Points</option>
										<option value="name">Name</option>
										<option value="joinDate">Join Date</option>
									</select>
								</div>

								<div
									className={`grid grid-cols-4 font-semibold text-sm pb-3 border-b ${
										darkMode
											? "border-slate-700 text-slate-400"
											: "border-slate-300 text-slate-600"
									}`}
								>
									<div>Member</div>
									<div>Ekskul</div>
									<div>Join Date</div>
									<div className="text-right">Points</div>
								</div>

								<div className="divide-y divide-slate-700/30 mt-2">
									{allMembers.length === 0 ? (
										<>
											<SkeletonMemberRow darkMode={darkMode} />
											<SkeletonMemberRow darkMode={darkMode} />
											<SkeletonMemberRow darkMode={darkMode} />
										</>
									) : (
										filteredMembers.map((member) => (
											<div
												key={member.id}
												className={`grid grid-cols-4 items-center py-3 rounded-xl transition-all ${
													darkMode
														? "hover:bg-slate-700/50"
														: "hover:bg-slate-100"
												}`}
												style={{
													paddingLeft: "0.25rem",
													paddingRight: "0.25rem",
												}}
											>
												<div className="flex items-center gap-3">
													<img
														src={`${API_URL}/${member.profileUrl}`}
														alt={member.name}
														className="w-10 h-10 rounded-full object-cover"
													/>
													<div>
														<h4
															className={`font-semibold capitalize ${
																darkMode ? "text-white" : "text-slate-900"
															}`}
														>
															{member.name}
														</h4>
														<p
															className={`text-xs ${
																darkMode ? "text-slate-400" : "text-slate-500"
															}`}
														>
															{member.email}
														</p>
													</div>
												</div>

												<div
													className={`flex items-center justify-start px-4 py-1.5 rounded-full font-semibold w-fit ${
														darkMode
															? "bg-emerald-900/50 text-emerald-300"
															: "bg-emerald-100 text-emerald-700"
													}`}
												>
													{member.ekskul}
												</div>

												<div
													className={`text-sm ${
														darkMode ? "text-slate-300" : "text-slate-700"
													}`}
												>
													{member.joinDate
														? new Date(member.joinDate).toLocaleDateString(
																"id-ID",
																{
																	day: "2-digit",
																	month: "short",
																	year: "numeric",
																}
														  )
														: "-"}
												</div>

												<div
													className={`text-sm font-bold px-4 py-1.5 rounded-full text-right ml-auto w-fit ${
														darkMode
															? "bg-sky-900/50 text-sky-300"
															: "bg-sky-100 text-sky-600"
													}`}
												>
													{member.totalPoints} pts
												</div>
											</div>
										))
									)}
								</div>
							</div>
						</div>

						{/* Right Column - Calendar & Activities */}
						<div className="space-y-6">
							<Calendar
								darkMode={darkMode}
								selectedDate={selectedDate}
								selectedMonth={selectedMonth}
								selectedYear={selectedYear}
								onDateSelect={(day, month, year) => {
									setSelectedDate(day);
									setSelectedMonth(month);
									setSelectedYear(year);
								}}
								scheduleData={scheduleData}
							/>

							{/* Activities */}
							<div
								className={`rounded-2xl shadow-lg p-6 ${
									darkMode ? "bg-slate-800" : "bg-white"
								}`}
							>
								<h3
									className={`text-xl font-bold mb-4 ${
										darkMode ? "text-white" : "text-slate-800"
									}`}
								>
									Kegiatan Pada {selectedDateLabel}
								</h3>

								{scheduleData.length === 0 ? (
									<ul className="space-y-3">
										<SkeletonScheduleItem darkMode={darkMode} />
										<SkeletonScheduleItem darkMode={darkMode} />
									</ul>
								) : filteredSchedules.length === 0 ? (
									<p
										className={`${
											darkMode ? "text-slate-400" : "text-slate-500"
										}`}
									>
										Tidak ada kegiatan pada tanggal ini.
									</p>
								) : (
									<ul className="space-y-3">
										{filteredSchedules.map((item) => (
											<li key={item.id} className="flex items-center gap-3">
												<img
													src={`${API_URL}/${item.extracurricular.imageUrl}`}
													alt={item.extracurricular.name}
													className="w-10 h-10 rounded-lg object-cover"
												/>
												<div>
													<p
														className={`font-semibold ${
															darkMode ? "text-white" : "text-slate-800"
														}`}
													>
														{item.title}
													</p>
													<p
														className={`text-sm ${
															darkMode ? "text-slate-400" : "text-slate-500"
														}`}
													>
														{item.extracurricular.name} •{" "}
														{new Date(item.scheduleDate).toLocaleTimeString(
															"id-ID",
															{
																hour: "2-digit",
																minute: "2-digit",
															}
														)}
													</p>
												</div>
											</li>
										))}
									</ul>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
