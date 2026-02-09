import React, { useEffect, useState, createContext, useContext } from "react";
import {
    Routes,
    Route,
    Navigate,
    useNavigate,
    useLocation
} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import sessionManager from "./utils/utils.jsx";
import Ekstrakurikuler from "./pages/Ekstrakurikuler.jsx";
import EkstrakurikulerDetail from "./pages/EkstrakurikulerDetail.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Jadwal from "./pages/Jadwal.jsx";
import JadwalDetail from "./pages/JadwalDetail.jsx";
import Certificate from "./pages/Certificate.jsx";
import ErrorStatus from "./components/ErrorStatus.jsx";
import config from "./config/config.js";
import { SplashScreen } from "@capacitor/splash-screen";


import { ConnectionContext, fetchWithTimeout } from "./utils/connectionContext.jsx";

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
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isOffline, setIsOffline] = useState(!navigator.onLine);
    const [isServerDown, setIsServerDown] = useState(false);

    const location = useLocation();

    useEffect(() => {
        const handleOnline = () => setIsOffline(false);
        const handleOffline = () => setIsOffline(true);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    const checkServerStatus = async () => {
        if (sessionManager.isDemoMode()) {
            setIsServerDown(false);
            return true;
        }
        try {
            const response = await fetchWithTimeout(`${config.API_URL}/profile`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${sessionManager.getToken()}`,
                    'Accept': 'application/json'
                },
                timeout: 5000
            });

            if (response.status === 500) {
                setIsServerDown(true);
                return false;
            }

            setIsServerDown(false);
            return true;
        } catch (error) {
            setIsServerDown(true);
            return false;
        }
    };

    const handleRetry = async () => {
        if (!navigator.onLine) {
            setIsOffline(true);
            return;
        }
        setIsOffline(false);

        setIsLoading(true);
        const serverOk = await checkServerStatus();
        if (serverOk) {
            window.location.reload();
        } else {
            setIsLoading(false);
        }
    };

    const hideSidebarRoutes = ["/", "/login", "/download"];
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
            SplashScreen.hide();

            return () => {
                window.removeEventListener("beforeunload", handleBeforeUnload);
            };
        } catch (error) {
            console.error("Error initializing app:", error);
            setIsLoading(false);
        }
    };

    const handleBeforeUnload = () => {
    }

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

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    const handleLogin = (token, expiredAt, rememberMe = false) => {
        sessionManager.setToken(token, expiredAt, rememberMe);
        sessionManager.setRememberMe(rememberMe);
        // Force refresh or state update if needed
    };

    const handleLogout = () => {
        sessionManager.removeToken();
        sessionManager.setRememberMe(false);
        sessionStorage.removeItem("isDemoMode");
    };

    if ((isOffline || isServerDown) && !sessionManager.isDemoMode()) {
        return (
            <ErrorStatus
                isOffline={isOffline}
                isServerDown={isServerDown}
                onRetry={handleRetry}
                darkMode={darkMode}
            />
        );
    }

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
        <ConnectionContext.Provider value={{ setIsServerDown, isServerDown, isOffline }}>
            <div className={darkMode ? "dark" : "light"}>
                <ScrollToTop />
                <div
                    className={`min-h-screen overflow-auto transition-colors duration-300 ${darkMode ? "bg-slate-900 text-white" : "bg-white text-slate-900"
                        }`}
                >
                    {!["/", "/register", "/login"].includes(location.pathname) && (
                        <Navbar
                            darkMode={darkMode}
                            setActiveMenu={setActiveMenu}
                            toggleDarkMode={toggleDarkMode}
                            onLogout={handleLogout}
                            toggleSidebar={toggleSidebar}
                            isSidebarOpen={isSidebarOpen}
                        />
                    )}

                    {shouldShowSidebar && (
                        <>
                            {isSidebarOpen && (
                                <div
                                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-55 transition-opacity duration-300"
                                    onClick={closeSidebar}
                                />
                            )}
                            <Sidebar
                                darkMode={darkMode}
                                initialMenu={activeMenu}
                                isOpen={isSidebarOpen}
                                onClose={closeSidebar}
                            />
                        </>
                    )}
                    <main
                        className="min-h-screen"
                        style={{
                            paddingTop: location.pathname === "/" || location.pathname === "/register"
                                ? "0rem"
                                : "calc(4rem + env(safe-area-inset-top))"
                        }}
                    >
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <PublicRoute>
                                        <Login darkMode={darkMode} onLogin={handleLogin} />
                                    </PublicRoute>
                                }
                            />
                            <Route
                                path="/register"
                                element={
                                    <PublicRoute>
                                        <Register darkMode={darkMode} onLogin={handleLogin} />
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
        </ConnectionContext.Provider>
    );
}

export default App;
