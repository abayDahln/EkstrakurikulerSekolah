import React, { useEffect, useState } from "react";
import {
	Routes,
	Route,
	Navigate,
	useNavigate,
	useLocation
} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Download from "./pages/Download.jsx";
import Home from "./pages/Home.jsx";
import sessionManager from "./utils/utils.jsx";
import Ekstrakurikuler from "./pages/Ekstrakurikuler.jsx";
import EkstrakurikulerDetail from "./pages/EkstrakurikulerDetail.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import Profile from "./pages/Profile.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Jadwal from "./pages/Jadwal.jsx";
import JadwalDetail from "./pages/JadwalDetail.jsx";
import Certificate from "./pages/Certificate.jsx";
import { ConnectionProvider, useConnection } from "./context/ConnectionContext.jsx";
import ErrorStatus from "./components/ErrorStatus.jsx";


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

const ScrollToTop = () => {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
};

const PublicRoute = ({ children }) => {
	const token = sessionManager.getToken();
	return !token ? children : <Navigate to="/home" replace />;
};

function App() {
	const [activeMenu, setActiveMenu] = useState(1);
	const [darkMode, setDarkMode] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const location = useLocation();

	const hideSidebarRoutes = ["/", "/login"];
	const shouldShowSidebar =
		sessionManager.getToken() && !hideSidebarRoutes.includes(location.pathname);

	useEffect(() => {
		initializeApp();
	}, []);

	const initializeApp = () => {

		try {

			const savedTheme = sessionManager.getTheme();
			const systemPrefersDark = window.matchMedia(
				"(prefers-color-scheme: dark)"
			).matches;


			if (savedTheme !== null) {
				setDarkMode(savedTheme);
			} else {
				setDarkMode(systemPrefersDark);
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
		setDarkMode(!darkMode);
	};

	const handleLogin = (token, expiredAt, rememberMe = false) => {
		sessionManager.setToken(token, expiredAt, rememberMe);
		sessionManager.setRememberMe(rememberMe);
		const savedToken = sessionManager.getToken();
	};

	const handleLogout = () => {
		sessionManager.removeToken();
		sessionManager.setRememberMe(false);
	};

	return (
		<ConnectionProvider>
			<AppContent
				darkMode={darkMode}
				setDarkMode={setDarkMode}
				isLoading={isLoading}
				activeMenu={activeMenu}
				setActiveMenu={setActiveMenu}
				toggleDarkMode={toggleDarkMode}
				handleLogin={handleLogin}
				handleLogout={handleLogout}
				shouldShowSidebar={shouldShowSidebar}
				location={location}
			/>
		</ConnectionProvider>
	);
}

function AppContent({
	darkMode,
	isLoading,
	activeMenu,
	setActiveMenu,
	toggleDarkMode,
	handleLogout,
	handleLogin,
	shouldShowSidebar,
	location
}) {
	const { isServerDown, isOffline, retryConnection } = useConnection();

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
		<div className={darkMode ? "dark" : "light"}>
			<ScrollToTop />
			{isOffline && (
				<ErrorStatus
					darkMode={darkMode}
					type="offline"
					onRetry={() => window.location.reload()}
				/>
			)}
			{isServerDown && !isOffline && (
				<ErrorStatus
					darkMode={darkMode}
					type="server"
					onRetry={retryConnection}
				/>
			)}
			<div
				className={`min-h-screen overflow-auto transition-colors duration-300 ${darkMode ? "bg-slate-900 text-white" : "bg-white text-slate-900"
					}`}
			>
				<Navbar
					darkMode={darkMode}
					setActiveMenu={setActiveMenu}
					toggleDarkMode={toggleDarkMode}
					onLogout={handleLogout}
				/>

				{shouldShowSidebar && (
					<Sidebar darkMode={darkMode} initialMenu={activeMenu} />
				)}
				<main
					className="pt-16"
					style={{
						marginLeft: shouldShowSidebar ? "280px" : "0",
					}}
				>
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
							path="/download"
							element={
								<PublicRoute>
									<Download darkMode={darkMode} />
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
							path="/profile"
							element={
								<ProtectedRoute>
									<MyProfile darkMode={darkMode} onLogout={handleLogout} />
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
						<Route
							path="/certificates"
							element={
								<ProtectedRoute>
									<Certificate darkMode={darkMode} />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/jadwal"
							element={
								<ProtectedRoute>
									<Jadwal darkMode={darkMode} />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/jadwal/:id"
							element={
								<ProtectedRoute>
									<JadwalDetail darkMode={darkMode} />
								</ProtectedRoute>
							}
						/>
						<Route path="*" element={<Navigate to="/" replace />} />
					</Routes>
				</main>
			</div>
		</div>
	);
}

export default App;
