import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	FaHome,
	FaTasks,
	FaCalendarAlt,
	FaUsers,
	FaChartBar,
	
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar({ darkMode, initialMenu = 1 }) {
	const [profile, setProfile] = useState(null);
	const [loading, setLoading] = useState(true);
	const [hasAnimated, setHasAnimated] = useState(false);
	const [activeMenu, setActiveMenu] = useState(initialMenu);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (!hasAnimated) setHasAnimated(true);
	}, [hasAnimated]);

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
				} else {
					console.error("Failed to fetch profile:", response.status);
				}
			} catch (error) {
				console.error("Error fetching profile:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchProfile();
	}, []);

	useEffect(() => {
		const currentPath = location.pathname;

		if (currentPath === "/home" || currentPath === "/") {
			setActiveMenu(1);
		} else if (
			currentPath === "/ekskuls" ||
			currentPath.startsWith("/ekskul/")
		) {
			setActiveMenu(2);
		} else if (currentPath === "/jadwal") {
			setActiveMenu(3);
		} else if (currentPath === "/profile") {
			setActiveMenu(4);
		} else if (currentPath === "/laporan") {
			setActiveMenu(5);
		}
	}, [location.pathname]);

	const handleMenuClick = (menuId) => {
		setActiveMenu(menuId);

		switch (menuId) {
			case 1:
				navigate("/home");
				break;
			case 2:
				navigate("/ekskuls");
				break;
			case 3:
				navigate("/jadwal");
				break;
			case 4:
				navigate("/profile");
				break;
			case 5:
				navigate("/laporan");
				break;
			default:
				navigate("/home");
		}
	};

	const menuItems = [
		{ id: 1, icon: <FaHome />, label: "Dashboard" },
		{ id: 2, icon: <FaTasks />, label: "Ekstrakurikuler" },
		{ id: 3, icon: <FaCalendarAlt />, label: "Jadwal" },
		{ id: 4, icon: <FaUsers />, label: "Anggota" },
		{ id: 5, icon: <FaChartBar />, label: "Laporan" },
	];

	const indicatorVariants = {
		initial: {
			opacity: 0,
			scale: 0.8,
		},
		animate: {
			opacity: 1,
			scale: 1,
			transition: {
				type: "spring",
				stiffness: 400,
				damping: 30,
			},
		},
		exit: {
			opacity: 0,
			scale: 0.8,
			transition: { duration: 0.2 },
		},
	};

	const buttonVariants = {
		hover: {
			scale: 1.02,
			transition: { duration: 0.2 },
		},
		tap: {
			scale: 0.98,
		},
	};

	return (
		<aside
			className={`fixed top-0 left-0 h-screen w-64 flex flex-col justify-between z-40 shadow-lg border-r 
      ${
				darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"
			}`}
		>
			{/* Header */}
			<div className="flex items-center gap-3 p-5 border-b border-inherit">
				<div
					className={`w-10 h-9 rounded-xl flex items-center justify-center shadow-md ${
						darkMode ? "bg-slate-700" : "bg-slate-100"
					}`}
				>
					<span
						className={`font-bold ${
							darkMode ? "text-white" : "text-slate-800"
						}`}
					>
						E
					</span>
				</div>
				<h1
					className={`font-bold text-lg ${
						darkMode ? "text-white" : "text-slate-800"
					}`}
				>
					EkskulApp
				</h1>
			</div>

			{/* Menu */}
			<nav className="relative flex-1 p-4 space-y-2 overflow-y-auto">
				{menuItems.map((item) => (
					<motion.button
						key={item.id}
						onClick={() => handleMenuClick(item.id)}
						variants={buttonVariants}
						whileHover="hover"
						whileTap="tap"
						className={`relative w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left
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
								transition={{
									type: "spring",
									stiffness: 400,
									damping: 30,
								}}
								className={`absolute inset-0 rounded-xl -z-10 ${
									darkMode
										? "bg-gradient-to-r from-sky-700 to-cyan-700 shadow-lg"
										: "bg-gradient-to-r from-sky-500 to-cyan-500 shadow-lg"
								}`}
							/>
						)}

						<span className="text-lg relative z-10">{item.icon}</span>
						<span className="font-medium text-sm relative z-10">
							{item.label}
						</span>
					</motion.button>
				))}
			</nav>

			{/* User Info */}
			<div
				className={`p-5 border-t flex items-center gap-3 ${
					darkMode ? "border-slate-700" : "border-slate-200"
				}`}
				// onClick={navigate("profile")}
			>
				{loading ? (
					<motion.div
						initial={hasAnimated ? false : { x: -50, opacity: 0 }}
  						animate={{ x: 0, opacity: 1 }}
						transition={{
							repeat: Infinity,
							duration: 1.5,
							repeatType: "reverse",
						}}
						className={`w-10 h-10 rounded-full ${
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
						className="w-10 h-10 rounded-full object-cover border-2 border-sky-400"
						onError={(e) => {
							e.currentTarget.onerror = null;
							e.currentTarget.src =
								"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect fill='%2338bdf8' width='40' height='40'/%3E%3Ctext x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='18' font-family='Arial'%3E" +
								(profile?.name?.charAt(0).toUpperCase() || "E") +
								"%3C/text%3E%3C/svg%3E";
						}}
					/>
				) : (
					<motion.div
						initial={hasAnimated ? false : { opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.3 }}
						className={`w-10 h-10 rounded-full flex items-center justify-center 
            			${darkMode ? "bg-sky-600" : "bg-sky-400"}`}
					>
						<span className="text-white font-semibold">
							{profile?.name?.charAt(0).toUpperCase() || "E"}
						</span>
					</motion.div>
				)}

				<motion.div
					initial={hasAnimated ? false : {opacity: 1, x: 0	} }
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.4 }}
					className="flex-1 min-w-0"
				>
					<p
						className={`font-semibold text-sm truncate ${
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