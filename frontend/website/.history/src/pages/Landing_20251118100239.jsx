import React from "react";
import { motion } from "framer-motion";

export default function Landing({ darkMode }) {
	const features = [
		{
			icon: "🎯",
			title: "Pilih Ekstrakurikuler",
			description:
				"Jelajahi berbagai pilihan ekstrakurikuler yang tersedia dan temukan yang sesuai dengan minat Anda",
		},
		{
			icon: "✅",
			title: "Absensi Digital",
			description:
				"Sistem absensi otomatis yang memudahkan tracking kehadiran dan izin siswa",
		},
		{
			icon: "📊",
			title: "Point System",
			description:
				"Dapatkan poin untuk setiap aktivitas dan raih sertifikat keaktifan secara otomatis",
		},
		{
			icon: "🎓",
			title: "Sertifikat Otomatis",
			description:
				"Sertifikat digital dihasilkan otomatis ketika mencapai 100 poin aktivitas",
		},
		{
			icon: "📅",
			title: "Jadwal Terintegrasi",
			description:
				"Lihat jadwal kegiatan, submit laporan, dan dokumentasi dengan mudah",
		},
		{
			icon: "👥",
			title: "Dashboard Pembina",
			description:
				"Kelola anggota, buat jadwal, dan monitor progress dengan dashboard lengkap",
		},
	];

	const stats = [
		{ number: "19jt+", label: "Siswa Aktif" },
		{ number: "67+", label: "Ekstrakurikuler" },
		{ number: "271+", label: "Sertifikat Terbit" },
		{ number: "99.99%", label: "Kepuasan" },
	];

	const handleNavigate = (path) => {
		alert(`Navigasi ke: ${path}`);
	};

	return (
		<div
			className={`min-h-screen transition-colors duration-500 ${
				darkMode
					? "bg-slate-900"
					: "bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50"
			}`}
			style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
		>
			<section id="hero" className="pt-32 pb-20 px-4 sm:px-6">
				<div className="container mx-auto max-w-6xl">
					<motion.div
						initial={{ y: 50, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.8 }}
						className="text-center"
					>
						<div
							className={`inline-block mb-4 px-4 py-2 rounded-full text-sm font-semibold ${
								darkMode
									? "bg-sky-900/50 text-sky-300"
									: "bg-sky-100 text-sky-600"
							}`}
						>
							✨ Platform Manajemen Ekstrakurikuler Modern
						</div>

						<h1
							className={`text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 leading-tight ${
								darkMode ? "text-white" : "text-slate-900"
							}`}
						>
							Sistem Informasi
							<br />
							<span
								className={`bg-clip-text text-transparent ${
									darkMode
										? "bg-gradient-to-r from-sky-400 to-cyan-300"
										: "bg-gradient-to-r from-sky-500 to-cyan-400"
								}`}
							>
								Ekstrakurikuler Sekolah
							</span>
						</h1>

						<p
							className={`text-lg sm:text-xl mb-10 max-w-3xl mx-auto leading-relaxed ${
								darkMode ? "text-slate-300" : "text-slate-600"
							}`}
						>
							Platform digital terpadu untuk siswa dan pembina dalam mengelola
							kegiatan ekstrakurikuler. Dengan sistem point otomatis dan
							sertifikat digital yang terintegrasi.
						</p>

						<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={() => handleNavigate("/")}
								className={`flex items-center gap-3 text-lg font-bold py-4 px-8 rounded-full shadow-2xl transition-all duration-300
                  ${
										darkMode
											? "bg-gradient-to-r from-blue-900 to-slate-800 hover:shadow-blue-800/50 text-white"
											: "bg-gradient-to-r from-sky-400 to-cyan-300 hover:shadow-sky-500/50 text-white"
									}`}
							>
								<span>Download Aplikasi Android</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
								>
									<path
										fill="currentColor"
										d="m14.975 3.019l.96-1.732a.193.193 0 0 0-.338-.187l-.97 1.75a6.54 6.54 0 0 0-5.253 0l-.97-1.75a.193.193 0 0 0-.34.187l.96 1.732a5.55 5.55 0 0 0-3.092 4.876h12.137a5.55 5.55 0 0 0-3.094-4.876M9.2 5.674a.507.507 0 1 1 .507-.506a.507.507 0 0 1-.507.506m5.602 0a.507.507 0 1 1 .507-.506a.507.507 0 0 1-.507.506M5.93 17.171A1.467 1.467 0 0 0 7.4 18.64h.973v3a1.36 1.36 0 1 0 2.721 0v-3h1.814v3a1.36 1.36 0 1 0 2.72 0v-3h.974a1.467 1.467 0 0 0 1.468-1.468V8.375H5.93Zm-1.867-9.03a1.36 1.36 0 0 0-1.36 1.361v5.669a1.36 1.36 0 1 0 2.72 0V9.502a1.36 1.36 0 0 0-1.36-1.36m15.872 0a1.36 1.36 0 0 0-1.36 1.361v5.669a1.36 1.36 0 1 0 2.72 0v-5.67a1.36 1.36 0 0 0-1.36-1.36"
									/>
								</svg>
							</motion.button>

							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={() => handleNavigate("/")}
								className={`flex items-center gap-3 text-lg font-bold py-4 px-8 rounded-full shadow-2xl transition-all duration-300
                  ${
										darkMode
											? "bg-gradient-to-r from-slate-800 to-blue-900 hover:shadow-blue-800/50 text-white"
											: "bg-gradient-to-r from-slate-100 via-blue-100 to-blue-200 hover:shadow-blue-300/50 text-slate-800"
									}`}
							>
								<span>Download Aplikasi iOS</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
								>
									<path
										fill="currentColor"
										d="M17.05 20.28c-.98.95-2.05.8-3.08.35c-1.09-.46-2.09-.48-3.24 0c-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8c1.18-.24 2.31-.93 3.57-.84c1.51.12 2.65.72 3.4 1.8c-3.12 1.87-2.38 5.98.48 7.13c-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25c.29 2.58-2.34 4.5-3.74 4.25"
									/>
								</svg>
							</motion.button>
						</div>
					</motion.div>
				</div>
			</section>

			<section
				className={`py-12 transition-colors duration-300 ${
					darkMode ? "bg-slate-800/50" : "bg-white/50"
				}`}
			>
				<div className="container mx-auto px-4 sm:px-6">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
						{stats.map((stat, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.1 }}
								viewport={{ once: true }}
								className="text-center"
							>
								<div
									className={`text-4xl font-bold bg-clip-text text-transparent mb-2 ${
										darkMode
											? "bg-gradient-to-r from-sky-400 to-cyan-300"
											: "bg-gradient-to-r from-sky-500 to-cyan-400"
									}`}
								>
									{stat.number}
								</div>
								<div
									className={`font-medium ${
										darkMode ? "text-slate-300" : "text-slate-600"
									}`}
								>
									{stat.label}
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			<section className="py-20 px-4 sm:px-6">
				<div className="container mx-auto max-w-6xl">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="text-center mb-16"
					>
						<h2
							className={`text-4xl sm:text-5xl font-bold mb-4 ${
								darkMode ? "text-white" : "text-slate-900"
							}`}
						>
							Fitur Unggulan
						</h2>
						<p
							className={`text-xl max-w-2xl mx-auto ${
								darkMode ? "text-slate-300" : "text-slate-600"
							}`}
						>
							Kelola ekstrakurikuler dengan mudah menggunakan fitur-fitur modern
							dan terintegrasi
						</p>
					</motion.div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{features.map((feature, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.1 }}
								viewport={{ once: true }}
								whileHover={{ y: -10 }}
								className={`p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 ${
									darkMode
										? "bg-slate-800 border-slate-700 hover:border-sky-600"
										: "bg-white border-transparent hover:border-sky-300"
								}`}
							>
								<div className="text-5xl mb-4">{feature.icon}</div>
								<h3
									className={`text-xl font-bold mb-3 ${
										darkMode ? "text-white" : "text-slate-900"
									}`}
								>
									{feature.title}
								</h3>
								<p
									className={`leading-relaxed ${
										darkMode ? "text-slate-300" : "text-slate-600"
									}`}
								>
									{feature.description}
								</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* How It Works Section */}
			<section
				className={`py-20 px-4 sm:px-6 text-white ${
					darkMode
						? "bg-gradient-to-br from-sky-800 to-cyan-800"
						: "bg-gradient-to-br from-sky-500 to-cyan-500"
				}`}
			>
				<div className="container mx-auto max-w-6xl">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="text-center mb-16"
					>
						<h2 className="text-4xl sm:text-5xl font-bold mb-4">
							Cara Kerja Point System
						</h2>
						<p
							className={`text-xl max-w-2xl mx-auto ${
								darkMode ? "text-sky-200" : "text-sky-100"
							}`}
						>
							Raih poin untuk setiap aktivitas dan dapatkan sertifikat otomatis
						</p>
					</motion.div>

					<div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
						{[
							{
								icon: "➕",
								title: "Join Ekskul",
								desc: "Dapatkan first point",
							},
							{
								icon: "✅",
								title: "Absen Hadir",
								desc: "Tambah poin kehadiran",
							},
							{
								icon: "📝",
								title: "Submit Report",
								desc: "Poin untuk laporan",
							},
							{ icon: "🎓", title: "100 Poin", desc: "Sertifikat otomatis!" },
						].map((step, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, scale: 0.8 }}
								whileInView={{ opacity: 1, scale: 1 }}
								transition={{ delay: index * 0.15 }}
								viewport={{ once: true }}
								className="text-center"
							>
								<div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center text-4xl backdrop-blur-sm">
									{step.icon}
								</div>
								<h3 className="text-xl font-bold mb-2">{step.title}</h3>
								<p className={darkMode ? "text-sky-200" : "text-sky-100"}>
									{step.desc}
								</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* User Types Section */}
			<section className="py-20 px-4 sm:px-6">
				<div className="container mx-auto max-w-6xl">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="text-center mb-16"
					>
						<h2
							className={`text-4xl sm:text-5xl font-bold mb-4 ${
								darkMode ? "text-white" : "text-slate-900"
							}`}
						>
							Untuk Siapa Aplikasi Ini?
						</h2>
					</motion.div>

					<div className="grid md:grid-cols-2 gap-8">
						<motion.div
							initial={{ opacity: 0, x: -50 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							className={`p-8 rounded-3xl shadow-2xl text-white ${
								darkMode
									? "bg-gradient-to-br from-sky-700 to-cyan-700"
									: "bg-gradient-to-br from-sky-500 to-cyan-500"
							}`}
						>
							<div className="text-6xl mb-4">👨‍🎓</div>
							<h3 className="text-3xl font-bold mb-6">Untuk Siswa</h3>
							<ul className="space-y-4">
								{[
									"Cari & join ekstrakurikuler favorit",
									"Absensi kehadiran dengan mudah",
									"Submit laporan kegiatan",
									"Track poin dan progress",
									"Download sertifikat digital",
									"Lihat jadwal kegiatan",
								].map((item, i) => (
									<li key={i} className="flex items-start gap-3">
										<span className="text-xl">✓</span>
										<span className="text-lg">{item}</span>
									</li>
								))}
							</ul>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, x: 50 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							className={`p-8 rounded-3xl shadow-2xl text-white ${
								darkMode
									? "bg-gradient-to-br from-cyan-700 to-sky-700"
									: "bg-gradient-to-br from-cyan-500 to-sky-500"
							}`}
						>
							<div className="text-6xl mb-4">👨‍🏫</div>
							<h3 className="text-3xl font-bold mb-6">Untuk Pembina</h3>
							<ul className="space-y-4">
								{[
									"Kelola member ekstrakurikuler",
									"Buat jadwal kegiatan",
									"Monitor absensi real-time",
									"Dashboard statistik lengkap",
									"Upload dokumentasi",
									"Terbitkan sertifikat tambahan",
								].map((item, i) => (
									<li key={i} className="flex items-start gap-3">
										<span className="text-xl">✓</span>
										<span className="text-lg">{item}</span>
									</li>
								))}
							</ul>
						</motion.div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 px-4 sm:px-6 bg-gradient-to-r from-sky-500 via-cyan-500 to-sky-400">
				<div className="container mx-auto max-w-4xl text-center text-white">
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
					>
						<h2 className="text-4xl sm:text-5xl font-bold mb-6">
							Siap Memulai?
						</h2>
						<p className="text-xl mb-10 text-sky-100">
							Download aplikasi sekarang dan join ekstrakurikuler dengan lebih
							mudah!
						</p>

						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={() => {
									document
										.querySelector("#hero")
										?.scrollIntoView({ behavior: "smooth" });
								}}
								className="bg-white text-sky-600 text-lg font-bold py-4 px-10 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-3 mx-auto sm:mx-0"
							>
								<span className="text-2xl">📥</span>
								Download Sekarang
							</motion.button>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Footer */}
			<footer
				className={`py-12 px-4 sm:px-6 transition-colors duration-300 ${
					darkMode ? "bg-slate-900" : "bg-slate-800"
				} text-white`}
			>
				<div className="container mx-auto max-w-6xl">
					<div className="grid md:grid-cols-3 gap-8 mb-8">
						<div>
							<div className="flex items-center gap-2 mb-4">
								<div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
									<span className="text-white text-xl font-bold">E</span>
								</div>
								<span className="text-xl font-bold">EkskulApp</span>
							</div>
							<p className={darkMode ? "text-slate-300" : "text-slate-400"}>
								Platform manajemen ekstrakurikuler modern untuk sekolah digital
							</p>
						</div>

						<div>
							<h4 className="font-bold mb-4">Quick Links</h4>
							<ul
								className={`space-y-2 ${
									darkMode ? "text-slate-300" : "text-slate-400"
								}`}
							>
								<li className="hover:text-white cursor-pointer transition">
									Tentang
								</li>
								<li className="hover:text-white cursor-pointer transition">
									Fitur
								</li>
								<li className="hover:text-white cursor-pointer transition">
									FAQ
								</li>
								<li className="hover:text-white cursor-pointer transition">
									Kontak
								</li>
							</ul>
						</div>

						<div>
							<h4 className="font-bold mb-4">Kontak</h4>
							<ul
								className={`space-y-2 ${
									darkMode ? "text-slate-300" : "text-slate-400"
								}`}
							>
								<li>📧 info@ekskulapp.com</li>
								<li>📱 +62 812-3456-7890</li>
								<li>📍 Jakarta, Indonesia</li>
							</ul>
						</div>
					</div>

					<div
						className={`border-t pt-8 text-center ${
							darkMode
								? "border-slate-700 text-slate-300"
								: "border-slate-700 text-slate-400"
						}`}
					>
						<p>© 2024 EkskulApp</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
