import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
	FaHome,
	FaTasks,
	FaCalendarAlt,
	FaUsers,
	FaChartBar,
	FaUserCircle,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar({ darkMode, initialMenu = 1 }) {
	const [profile, setProfile] = useState(null);
	const [loading, setLoading] = useState(true);
	const [hasAnimated, setHasAnimated] = useState(false);
	const [activeMenu, setActiveMenu] = useState(initialMenu);
	const navigate = useNavigate();
	const location = useLocation();

	// Trigger animasi hanya sekali
	useEffect(() => {
		if (!hasAnimated) setHasAnimated(true);
	}, [hasAnimated]);

	// Fetch data profil di atas
	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const cached = sessionStorage.getItem("profile");
				if (cached) {
					setProfile(JSON.parse(cached));
					setLoading(false);
					return;
				}

				const token = localStorage.getItem("token");
				const response = await fetch("http://localhost:5000/api/profile", {
					headers: { Authorization: `Bearer ${token}`, accept: "*/*" },
				});

				if (response.ok) {
					const data = await response.json();
					setProfile(data.data);
					sessionStorage.setItem("profile", JSON.stringify(data.data));
				}
			} catch (error) {
				console.error("Error fetching profile:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchProfile();
	}, []);

	// Aktifkan menu berdasarkan URL
	useEffect(() => {
		const currentPath = location.pathname;
		if (currentPath === "/home" || currentPath === "/") setActiveMenu(1);
		else if (currentPath.startsWith("/ekskul")) setActiveMenu(2);
		else if (currentPath === "/jadwal") setActiveMenu(3);
		else if (currentPath === "/anggota") setActiveMenu(4);
		else if (currentPath === "/laporan") setActiveMenu(5);
	}, [location.pathname]);

	const handleMenuClick = (menuId) => {
		setActiveMenu(menuId);
		const routes = ["/home", "/ekskuls", "/jadwal", "/anggota", "/laporan"];
		navigate(routes[menuId - 1] || "/home");
	};

	const menuItems = [
		{ id: 1, icon: <FaHome />, label: "Dashboard" },
		{ id: 2, icon: <FaTasks />, label: "Ekstrakurikuler" },
		{ id: 3, icon: <FaCalendarAlt />, label: "Jadwal" },
		{ id: 4, icon: <FaUsers />, label: "Anggota" },
		{ id: 5, icon: <FaChartBar />, label: "Laporan" },
	];

	const buttonVariants = {
		hover: { scale: 1.03 },
		tap: { scale: 0.97 },
	};

	return (
		<aside
			className={`fixed top-0 left-0 h-screen w-60 md:w-64 flex flex-col justify-between z-40 border-r shadow-lg transition-all duration-300
				${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}
		>
			{/* Header */}
			<div className="flex items-center gap-3 p-4 md:p-5 border-b border-inherit">
				<div
					className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-md ${
						darkMode ? "bg-slate-700" : "bg-slate-100"
					}`}
				>
					<span
						className={`font-bold text-lg ${
							darkMode ? "text-white" : "text-slate-800"
						}`}
					>
						E
					</span>
				</div>
				<h1
					className={`font-bold text-lg truncate ${
						darkMode ? "text-white" : "text-slate-800"
					}`}
				>
					EkskulApp
				</h1>
			</div>

			{/* Menu Navigasi */}
			<nav className="relative flex-1 p-3 md:p-4 space-y-1 md:space-y-2 overflow-y-auto">
				{menuItems.map((item) => (
					<motion.button
						key={item.id}
						onClick={() => handleMenuClick(item.id)}
						variants={buttonVariants}
						whileHover="hover"
						whileTap="tap"
						className={`relative w-full flex items-center gap-3 px-3 py-2 md:px-4 md:py-3 rounded-xl transition-all text-left
							${
								darkMode
									? activeMenu === item.id
										? "text-white"
										: "text-slate-300 hover:bg-slate-700 hover:text-white"
									: activeMenu === item.id
									? "text-white"
									: "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
							}
							${activeMenu === item.id ? "font-semibold" : ""}
						`}
					>
						{activeMenu === item.id && (
							<motion.div
								layoutId="activeIndicator"
								layout
								transition={{ type: "spring", stiffness: 400, damping: 30 }}
								className={`absolute inset-0 rounded-xl -z-10 ${
									darkMode
										? "bg-gradient-to-r from-sky-700 to-cyan-700 shadow-md"
										: "bg-gradient-to-r from-sky-500 to-cyan-500 shadow-md"
								}`}
							/>
						)}
						<span className="text-lg">{item.icon}</span>
						<span className="text-sm font-medium">{item.label}</span>
					</motion.button>
				))}
			</nav>

			{/* User Info */}
			<div
				onClick={() => navigate("/profile")}
				className={`p-4 md:p-5 border-t flex items-center gap-3 cursor-pointer hover:bg-opacity-10 transition-colors
					${darkMode ? "border-slate-700 hover:bg-slate-700/40" : "border-slate-200 hover:bg-slate-100/60"}`}
			>
				{/* Foto profil */}
				{loading ? (
					<motion.div
						initial={hasAnimated ? false : { x: -50, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
						className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${
							darkMode ? "bg-slate-700" : "bg-slate-200"
						}`}
					/>
				) : profile?.profileUrl ? (
					<motion.img
						initial={hasAnimated ? false : { opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.3 }}
						src={`http://localhost:5000/${profile.profileUrl}`}
						alt={profile?.name || "Profile"}
						className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-sky-400"
						onError={(e) => {
							e.currentTarget.onerror = null;
							e.currentTarget.src = "";
						}}
					/>
				) : (
					<motion.div
						initial={hasAnimated ? false : { opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.3 }}
						className="text-sky-400"
					>
						<FaUserCircle size={42} />
					</motion.div>
				)}

				{/* Info Nama + Role */}
				<motion.div
					initial={hasAnimated ? false : { opacity: 0, x: -10 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.4 }}
					className="flex-1 min-w-0"
				>
					<p
						className={`font-semibold text-sm md:text-base truncate ${
							darkMode ? "text-white" : "text-slate-800"
						}`}
					>
						{loading ? "Memuat..." : profile?.name || "Pembina Ekskul"}
					</p>
					<p
						className={`text-xs truncate ${
							darkMode ? "text-slate-400" : "text-slate-500"
						}`}
					>
						{loading ? "Loading..." : profile?.role || "Admin"}
					</p>
				</motion.div>
			</div>
		</aside>
	);
}
