import React, { useEffect, useState } from "react";
import {
	BrowserRouter,
	Routes,
	Route,
	Navigate,
	useNavigate,
} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import sessionManager from "./utils/utils.jsx";
import Ekstrakurikuler from "./pages/Ekstrakurikuler.jsx";
import EkstrakurikulerDetail from "./pages/EkstrakurikulerDetail.jsx";
import MyProfile from "./pages/MyProfile.jsx";


const useTokenValidation = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const validateToken = async () => {
			const token = sessionManager.getToken();
			if (!token) return;

			try {
				if (sessionManager.isTokenExpiringSoon()) {
					sessionManager.removeToken();
					navigate("/");
					return;
				}
			} catch (error) {
				console.error("Token validation failed:", error);
				sessionManager.removeToken();
				navigate("/");
			}
		};

		validateToken();

		const interval = setInterval(validateToken, 60000);

		return () => clearInterval(interval);
	}, [navigate]);
};

const ProtectedRoute = ({ children }) => {
	useTokenValidation();
	const token = sessionManager.getToken();
	return token ? children : <Navigate to="/" replace />;
};

const PublicRoute = ({ children }) => {
	const token = sessionManager.getToken();
	return !token ? children : <Navigate to="/home" replace />;
};

function App() {
	const [darkMode, setDarkMode] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		initializeApp();
	}, []);

	const initializeApp = () => {
		try {
			console.log("Initializing app...");

			const savedTheme = sessionManager.getTheme();
			const systemPrefersDark = window.matchMedia(
				"(prefers-color-scheme: dark)"
			).matches;

			console.log("Saved theme:", savedTheme);
			console.log("System prefers dark:", systemPrefersDark);

			if (savedTheme !== null) {
				setDarkMode(savedTheme);
				console.log("Using saved theme:", savedTheme);
			} else {
				setDarkMode(systemPrefersDark);
				console.log("Using system theme:", systemPrefersDark);
			}

			setIsLoading(false);

			return () => {
				window.removeEventListener("beforeunload", handleBeforeUnload);
			};
		} catch (error) {
			console.error("Error initializing app:", error);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (!isLoading) {
			console.log("Saving theme:", darkMode);

			sessionManager.setTheme(darkMode);

			if (darkMode) {
				document.body.classList.add("dark");
				document.body.classList.remove("light");
				document.documentElement.classList.add("dark");
				document.documentElement.classList.remove("light");
			} else {
				document.body.classList.add("light");
				document.body.classList.remove("dark");
				document.documentElement.classList.add("light");
				document.documentElement.classList.remove("dark");
			}
		}
	}, [darkMode, isLoading]);

	const toggleDarkMode = () => {
		console.log("Toggling dark mode to:", !darkMode);
		setDarkMode(!darkMode);
	};

	const handleLogin = (token, expiredAt, rememberMe = false) => {
		sessionManager.setToken(token, expiredAt, rememberMe);
		sessionManager.setRememberMe(rememberMe);
		const savedToken = sessionManager.getToken();
		console.log("App: Token saved successfully:", !!savedToken);
	};

	const handleLogout = () => {
		sessionManager.removeToken();
		sessionManager.setRememberMe(false);
	};

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-900">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
					<p className="mt-4 text-gray-600 dark:text-gray-300">Loading...</p>
				</div>
			</div>
		);
	}

	return (
		<BrowserRouter>
			<div className={darkMode ? "dark" : "light"}>
				<div
					className={`min-h-screen overflow-auto transition-colors duration-300 ${
						darkMode ? "bg-slate-900 text-white" : "bg-white text-slate-900"
					}`}
				>
					<Navbar
						darkMode={darkMode}
						toggleDarkMode={toggleDarkMode}
						onLogout={handleLogout}
					/>

					<main className="pt-16">
						<Routes>
							<Route
								path="/"
								element={
									<PublicRoute>
										<Landing darkMode={darkMode} />
									</PublicRoute>
								}
							/>
							<Route
								path="/login"
								element={
									<PublicRoute>
										<Login darkMode={darkMode} onLogin={handleLogin} />
									</PublicRoute>
								}
							/>
							<Route
								path="/home"
								element={
									<ProtectedRoute>
										<Home darkMode={darkMode} onLogout={handleLogout} />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/ekskuls"
								element={
									<ProtectedRoute>
										<Ekstrakurikuler darkMode={darkMode} />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/ekskul/:id"
								element={
									<ProtectedRoute>
										<EkstrakurikulerDetail darkMode={darkMode} />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/profile/:id"
								element={
									<ProtectedRoute>
										<Profile darkMode={darkMode} />
									</ProtectedRoute>
								}
							/>
							<Route path="*" element={<Navigate to="/" replace />} />
						</Routes>
					</main>
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
