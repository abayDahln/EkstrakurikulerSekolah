import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Login = ({ darkMode, onLogin }) => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rememberMe, setRememberMe] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const API_URL = "http://localhost:5000/api/auth/login/pembina";

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		try {
			const response = await fetch(`${API_URL}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});

			const responseBody = await response.json();

			if (!response.ok) {
				throw new Error(responseBody.message || "Login gagal");
			}

			const token = responseBody.data?.token;
			const expiredAt = responseBody.data?.expiredAt;
			if (!token) throw new Error("Token tidak ditemukan dalam response");
			if (!expiredAt)
				throw new Error("ExpiredAt tidak ditemukan dalam response");

			if (onLogin) {
				onLogin(token, expiredAt, rememberMe);
			}
			await new Promise((resolve) => setTimeout(resolve, 100));

			navigate("/home");
		} catch (err) {
			setError(err.message || "Terjadi kesalahan saat login");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div
			className={`fixed inset-0 flex items-center justify-between overflow-hidden transition-colors duration-300 ${
				darkMode
					? "bg-slate-900"
					: "bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50"
			}`}
			style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
		>
			<div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32 z-10 h-full pt-20">
				<motion.div
					initial={{ x: -100, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ duration: 0.8, ease: "easeOut" }}
					className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-md"
				>
					

					<motion.h1
						initial={{ y: -20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.2 }}
						className={`text-4xl sm:text-5xl font-extrabold mb-3 ${
							darkMode ? "text-white" : "text-slate-900"
						}`}
					>
						Selamat Datang
					</motion.h1>

					<motion.p
						initial={{ y: -20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.3 }}
						className={`text-lg mb-8 ${
							darkMode ? "text-slate-300" : "text-slate-600"
						}`}
					>
						Login sebagai pembina ekstrakurikuler
					</motion.p>

					<motion.form
						onSubmit={handleSubmit}
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.4 }}
						className="space-y-5"
					>
						<div>
							<label
								htmlFor="email"
								className={`block text-sm font-semibold mb-2 ${
									darkMode ? "text-slate-300" : "text-slate-700"
								}`}
							>
								Email
							</label>
							<motion.input
								id="email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="nama@email.com"
								className={`w-full p-4 rounded-xl shadow-sm border-2 transition-all duration-300 ${
									darkMode
										? "bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-sky-600"
										: "bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-sky-400"
								} focus:outline-none focus:ring-4 ${
									darkMode ? "focus:ring-sky-900/50" : "focus:ring-sky-100"
								}`}
								whileFocus={{ scale: 1.01 }}
								disabled={loading}
								required
							/>
						</div>

						<div>
							<label
								htmlFor="password"
								className={`block text-sm font-semibold mb-2 ${
									darkMode ? "text-slate-300" : "text-slate-700"
								}`}
							>
								Password
							</label>
							<motion.input
								id="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="••••••••"
								className={`w-full p-4 rounded-xl shadow-sm border-2 transition-all duration-300 ${
									darkMode
										? "bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-sky-600"
										: "bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-sky-400"
								} focus:outline-none focus:ring-4 ${
									darkMode ? "focus:ring-sky-900/50" : "focus:ring-sky-100"
								}`}
								whileFocus={{ scale: 1.01 }}
								disabled={loading}
								required
							/>
						</div>

						<div className="flex items-center justify-between">
							<div className="flex items-center">
								<input
									type="checkbox"
									id="rememberMe"
									checked={rememberMe}
									onChange={(e) => setRememberMe(e.target.checked)}
									className={`w-4 h-4 rounded transition-colors ${
										darkMode
											? "bg-slate-800 border-slate-700"
											: "bg-white border-slate-300"
									}`}
									disabled={loading}
								/>
								<label
									htmlFor="rememberMe"
									className={`ml-2 text-sm font-medium ${
										darkMode ? "text-slate-300" : "text-slate-700"
									}`}
								>
									Ingat saya
								</label>
							</div>

							<a
								href="#"
								className={`text-sm font-semibold ${
									darkMode
										? "text-sky-400 hover:text-sky-300"
										: "text-sky-600 hover:text-sky-700"
								} transition-colors`}
							>
								Lupa password?
							</a>
						</div>

						{error && (
							<motion.div
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								className="p-4 rounded-xl bg-red-100 border border-red-300 text-red-700 text-sm"
							>
								{error}
							</motion.div>
						)}

						<motion.button
							type="submit"
							className={`w-full py-4 px-6 rounded-xl font-bold text-white text-lg shadow-lg transition-all duration-300 ${
								loading
									? "bg-slate-400 cursor-not-allowed"
									: darkMode
									? "bg-gradient-to-r from-sky-700 to-cyan-700 hover:shadow-sky-700/50"
									: "bg-gradient-to-r from-sky-500 to-cyan-500 hover:shadow-sky-500/50 hover:shadow-xl"
							}`}
							whileHover={!loading ? { scale: 1.02, y: -2 } : {}}
							whileTap={!loading ? { scale: 0.98 } : {}}
							disabled={loading}
						>
							{loading ? (
								<span className="flex items-center justify-center gap-2">
									<svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
										<circle
											className="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											strokeWidth="4"
											fill="none"
										/>
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										/>
									</svg>
									Memproses...
								</span>
							) : (
								"Login"
							)}
						</motion.button>
					</motion.form>

					<p
						className={`mt-8 text-center text-sm ${
							darkMode ? "text-slate-400" : "text-slate-600"
						}`}
					>
						Belum punya akun?{" "}
						<a
							href="#"
							className={`font-semibold ${
								darkMode
									? "text-sky-400 hover:text-sky-300"
									: "text-sky-600 hover:text-sky-700"
							} transition-colors`}
						>
							Hubungi admin
						</a>
					</p>
				</motion.div>
			</div>

			<div className="hidden lg:block lg:w-1/2 h-full relative overflow-hidden">
				<div className="inset-0 absolute flex items-center justify-center mt-20 ">
					{[
						{ size: 1200, opacity: 0.54 },
						{ size: 1100, opacity: 0.5 },
						{ size: 1000, opacity: 0.46 },
						{ size: 900, opacity: 0.42 },
						{ size: 800, opacity: 0.38 },
						{ size: 700, opacity: 0.34 },
						{ size: 600, opacity: 0.3 },
						{ size: 500, opacity: 0.26 },
						{ size: 400, opacity: 0.22 },
						{ size: 300, opacity: 0.18 },
						{ size: 200, opacity: 0.14 },
						{ size: 100, opacity: 0.1 },
					].map((ring, index) => (
						<motion.div
							key={index}
							initial={{ scale: 0, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{
								duration: 1.5 + index * 0.1,
								delay: index * 0.05,
								ease: "easeOut",
							}}
							className={`absolute rounded-full border-[1.5px] transition-all duration-900 ${
								darkMode
									? "border-cyan-500/10 bg-gradient-to-b from-blue-800/10 via-cyan-500/10 to-blue-800/10"
									: "border-cyan-500/10 bg-blue-500/10"
							}`}
							style={{
								width: `${ring.size * 2}px`,
								height: `${ring.size}px`,
								opacity: ring.opacity,
								left: `${100 + index * 70}px`,
							}}
						/>
					))}
				</div>
			</div>

			{/* Mobile Decorative Elements */}
			<div className="lg:hidden absolute inset-0 overflow-hidden pointer-events-none">
				<motion.div
					initial={{ scale: 0, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ duration: 1 }}
					className={`absolute w-[300px] h-[300px] rounded-full ${
						darkMode ? "bg-sky-900/20" : "bg-sky-200/30"
					}`}
					style={{ right: "-150px", top: "-150px" }}
				/>

				<motion.div
					initial={{ scale: 0, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ duration: 1.2, delay: 0.1 }}
					className={`absolute w-[250px] h-[250px] rounded-full ${
						darkMode ? "bg-blue-800/30" : "bg-blue-300/40"
					}`}
					style={{ right: "-100px", bottom: "-125px" }}
				/>
			</div>
		</div>
	);
};

export default Login;
