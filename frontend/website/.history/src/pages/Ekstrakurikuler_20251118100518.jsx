import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Sidebar from "../components/Sidebar";

const SkeletonCard = ({ darkMode }) => (
	<div
		className={`rounded-2xl shadow-lg overflow-hidden ${
			darkMode ? "bg-slate-800" : "bg-white"
		}`}
	>
		<div
			className={`h-48 animate-pulse ${
				darkMode ? "bg-slate-700" : "bg-slate-200"
			}`}
		/>
		<div className="p-6 space-y-3">
			<div
				className={`h-6 w-3/4 rounded animate-pulse ${
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
			<div className="flex items-center gap-3 pt-3">
				<div
					className={`w-10 h-10 rounded-full animate-pulse ${
						darkMode ? "bg-slate-700" : "bg-slate-200"
					}`}
				/>
				<div
					className={`h-4 w-32 rounded animate-pulse ${
						darkMode ? "bg-slate-700" : "bg-slate-200"
					}`}
				/>
			</div>
		</div>
	</div>
);

const AnimatedEkskulCard = ({ ekskul, darkMode, index, navigate, API_URL }) => {
	const [hasAnimated, setHasAnimated] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setHasAnimated(true);
		}, 1000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<motion.div
			initial={hasAnimated ? false : { y: 20, opacity: 0 }}
			animate={hasAnimated ? false : { y: 0, opacity: 1 }}
			transition={{ delay: index * 0.1 }}
			className="h-full"
		>
			<div
				onClick={() => navigate(`/ekskul/${ekskul.id}`)}
				className={`cursor-pointer rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col h-full ${
					darkMode ? "bg-slate-800" : "bg-white"
				}`}
			>
				<div className="relative h-48 overflow-hidden group flex-shrink-0">
					<img
						src={`${API_URL}/${ekskul.imageUrl}`}
						alt={ekskul.name}
						className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
						onError={(e) => {
							e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'%3E%3Crect fill='%23${
								darkMode ? "475569" : "e2e8f0"
							}' width='400' height='200'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='%23${
								darkMode ? "94a3b8" : "64748b"
							}'%3E${ekskul.name}%3C/text%3E%3C/svg%3E`;
						}}
					/>
				</div>

				<div className="p-6 flex flex-col flex-grow">
					<h3
						className={`text-xl font-bold mb-3 line-clamp-2 ${
							darkMode ? "text-white" : "text-slate-900"
						}`}
					>
						{ekskul.name}
					</h3>

					<div className="mb-4 flex-grow">
						<p
							className={`text-sm line-clamp-3 ${
								darkMode ? "text-slate-300" : "text-slate-600"
							}`}
							style={{
								display: "-webkit-box",
								WebkitLineClamp: 3,
								WebkitBoxOrient: "vertical",
								overflow: "hidden",
							}}
						>
							{ekskul.description}
						</p>
					</div>

					<div className="flex items-center gap-3 pt-3 border-t border-slate-700/30 mt-auto">
						<div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
							<img
								src={`${API_URL}/${ekskul.pembina.profile}`}
								alt={ekskul.pembina.name}
								className="w-full h-full object-cover"
								onError={(e) => {
									e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Crect fill='%23${
										darkMode ? "475569" : "e2e8f0"
									}' width='40' height='40'/%3E%3Ctext x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='16' fill='%23${
										darkMode ? "94a3b8" : "64748b"
									}'%3E${ekskul.pembina.name?.charAt(0) || "P"}%3C/text%3E%3C/svg%3E`;
								}}
							/>
						</div>
						<div className="flex-1 min-w-0">
							<p
								className={`text-xs font-semibold ${
									darkMode ? "text-slate-400" : "text-slate-500"
								}`}
							>
								Pembina
							</p>
							<p
								className={`text-sm font-bold truncate ${
									darkMode ? "text-white" : "text-slate-900"
								}`}
							>
								{ekskul.pembina.name}
							</p>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

const Ekstrakurikuler = ({ darkMode }) => {
	const [ekskulList, setEkskulList] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [isServerDown, setIsServerDown] = useState(false);
	const navigate = useNavigate();

	const API_URL = "http://localhost:5000";

	useEffect(() => {
		let isMounted = true;

		const fetchEkskulList = async () => {
			try {
				setIsLoading(true);
				setIsServerDown(false);

				const token =
					localStorage.getItem("token") || sessionStorage.getItem("token");

				const response = await fetch(`${API_URL}/api/extracurricular`, {
					headers: { Authorization: `Bearer ${token}` },
				});

				if (!response.ok) throw new Error("Server tidak merespons");

				const result = await response.json();

				if (isMounted) {
					setEkskulList(result.data || []);
				}
			} catch (error) {
				console.error(error);
				if (isMounted) {
					setIsServerDown(true);
					setEkskulList([]);
				}
			} finally {
				if (isMounted) setIsLoading(false);
			}
		};

		setTimeout(() => {
			fetchEkskulList();
		}, 1000);

		return () => {
			isMounted = false;
		};
	}, []);

	const filteredEkskul = ekskulList.filter((item) =>
		item.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		
		<div className="p-8">
			<div className="mb-8">
				<h1
					className={`text-3xl font-bold mb-2 ${
						darkMode ? "text-white" : "text-slate-900"
					}`}
				>
					Ekstrakurikuler
				</h1>
				<p
					className={`text-sm ${
						darkMode ? "text-slate-400" : "text-slate-500"
					}`}
				>
					Lihat semua ekstrakurikuler yang ada
				</p>
			</div>

			<div className="mb-8">
				<div className="relative max-w-md">
					<Search
						className={`absolute left-4 top-1/2 -translate-y-1/2 text-xl ${
							darkMode ? "text-slate-400" : "text-slate-500"
						}`}
						size={20}
					/>
					<input
						type="text"
						placeholder="Cari ekstrakurikuler..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all ${
							darkMode
								? "bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-sky-600"
								: "bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-sky-400"
						} focus:outline-none focus:ring-4 ${
							darkMode ? "focus:ring-sky-900/50" : "focus:ring-sky-100"
						}`}
					/>
				</div>
			</div>

			{/* Content */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{isLoading ? (
					[...Array(6)].map((_, i) => (
						<SkeletonCard key={i} darkMode={darkMode} />
					))
				) : isServerDown ? (
					<div className="col-span-full text-center py-16">
						<div className="text-6xl mb-4">⚠️</div>
						<h3
							className={`text-xl font-bold mb-2 ${
								darkMode ? "text-white" : "text-slate-900"
							}`}
						>
							Server Tidak Dapat Dihubungi
						</h3>
						<p
							className={`${
								darkMode ? "text-slate-400" : "text-slate-500"
							}`}
						>
							Pastikan backend sedang berjalan dan koneksi aktif.
						</p>
					</div>
				) : filteredEkskul.length > 0 ? (
					filteredEkskul.map((ekskul, index) => (
						<AnimatedEkskulCard
							key={ekskul.id}
							ekskul={ekskul}
							darkMode={darkMode}
							index={index}
							navigate={navigate}
							API_URL={API_URL}
						/>
					))
				) : (
					<div className="col-span-full text-center py-16">
						<div className="text-6xl mb-4">🔍</div>
						<h3
							className={`text-xl font-bold mb-2 ${
								darkMode ? "text-white" : "text-slate-900"
							}`}
						>
							Tidak ada hasil
						</h3>
						<p
							className={`${
								darkMode ? "text-slate-400" : "text-slate-500"
							}`}
						>
							Coba cari dengan kata kunci lain
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default Ekstrakurikuler;