import config from "../config/config";
import mockData from "../data/mockData";

export const sessionManager = {
	getToken: () => {
		try {
			const token = localStorage.getItem("token");
			const expiredAt = localStorage.getItem("expiredAt");

			if (!token || !expiredAt) return null;

			const now = Date.now();
			const exp = Date.parse(expiredAt);

			if (isNaN(exp) || now > exp) {
				sessionManager.removeToken();
				return null;
			}
			return token;
		} catch (error) {
			console.error("Error getting token:", error);
			return null;
		}
	},

	setToken: (token, expiredAt, rememberMe = false) => {
		try {
			let finalExpiredAt = expiredAt;
			if (!expiredAt) {
				const oneDayFromNow = new Date();
				oneDayFromNow.setDate(oneDayFromNow.getDate() + 1);
				finalExpiredAt = oneDayFromNow.toISOString();
			}

			if (!rememberMe) {
				const twentyFoursFromNow = new Date();
				twentyFoursFromNow.setHours(twentyFoursFromNow.getHours() + 24);
				finalExpiredAt = twentyFoursFromNow.toISOString();
			}

			localStorage.setItem("token", token);
			localStorage.setItem("expiredAt", finalExpiredAt);
			localStorage.setItem("rememberMe", rememberMe.toString());
		} catch (error) {
			console.error("Error setting token:", error);
		}
	},

	removeToken: () => {
		try {
			localStorage.removeItem("token");
			localStorage.removeItem("expiredAt");
			localStorage.removeItem("rememberMe");
			sessionStorage.removeItem("token");
			sessionStorage.removeItem("expiredAt");
		} catch (error) {
			console.error("Error removing token:", error);
		}
	},

	getTheme: () => {
		try {
			const saved = localStorage.getItem("darkMode");
			if (saved !== null) return JSON.parse(saved);
			return null;
		} catch (error) {
			console.error("Error getting theme:", error);
			return null;
		}
	},

	setTheme: (isDark) => {
		try {
			localStorage.setItem("darkMode", JSON.stringify(isDark));
		} catch (error) {
			console.error("Error setting theme:", error);
		}
	},

	getRememberMe: () => {
		try {
			const rememberMe = localStorage.getItem("rememberMe");
			if (rememberMe === null || rememberMe === undefined) return false;
			return rememberMe === "true";
		} catch (error) {
			console.error("Error getting remember me:", error);
			return false;
		}
	},

	setRememberMe: (remember) => {
		try {
			localStorage.setItem("rememberMe", remember.toString());
		} catch (error) {
			console.error("Error setting remember me:", error);
		}
	},

	isTokenExpiringSoon: () => {
		try {
			const expiredAt =
				sessionStorage.getItem("expiredAt") ||
				localStorage.getItem("expiredAt");
			if (!expiredAt) return true;

			const now = Date.now();
			const exp = Date.parse(expiredAt);
			const fiveMinutes = 5 * 60 * 1000;

			return exp - now <= fiveMinutes;
		} catch (error) {
			console.error("Error checking token expiration:", error);
			return true;
		}
	},

	getDemoMode: () => {
		return localStorage.getItem("demoMode") === "true";
	},

	setDemoMode: (isDemo) => {
		localStorage.setItem("demoMode", isDemo);
		if (!isDemo) {
			// If turning off demo mode, we might want to ensure token is valid or removed? 
			// But usually this just sets the flag.
		}
	}
};

const getMockResponse = (url) => {
	// Auth endpoints
	if (url.endsWith("/auth/login/pembina")) return mockData.auth.login;

	// Pembina specific endpoints
	if (url.endsWith("/api/pembina/dashboard")) return mockData.pembina.dashboard;
	if (url.endsWith("/api/pembina/member")) return mockData.pembina.members;
	if (url.endsWith("/api/pembina/profile")) return mockData.pembina.profile;
	if (url.endsWith("/api/pembina/certificate")) return mockData.pembina.certificates;

	// Schedule endpoints
	if (url.includes("/api/pembina/schedule/")) {
		const id = url.split("/").pop();
		return mockData.scheduleDetails[id] || { status: 404, message: "Schedule not found" };
	}
	if (url.endsWith("/api/pembina/schedule") || url.endsWith("/api/schedule")) return mockData.pembina.schedule;

	// Extracurricular endpoints
	if (url.includes("/api/extracurricular/")) {
		const id = url.split("/").pop();
		return mockData.extracurriculars[id] || { status: 404, message: "Ekskul not found" };
	}
	if (url.endsWith("/api/extracurricular")) return mockData.extracurriculars.all;

	// Profile endpoints
	if (url.includes("/api/profile/")) {
		const id = url.split("/").pop();
		return mockData.students[id] || { status: 404, message: "Profile not found" };
	}

	// Action endpoints (that usually return success in demo mode)
	if (url.includes("/api/pembina/attendance") ||
		url.includes("/api/pembina/documentation") ||
		url.includes("/api/pembina/report") ||
		url.includes("/api/pembina/certificate")) {
		return { status: 200, message: "Demo mode: Action simulated successfully", data: {} };
	}

	return { status: 404, message: "Mock endpoint not found" };
};

export const fetchWithTimeout = async (url, options = {}, timeout = 10000) => {
	const isDemo = sessionManager.getDemoMode();

	if (isDemo) {
		await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate latency

		const method = options.method || "GET";
		const isLogin = url.includes("/auth/login/pembina");

		if (method !== "GET" && !isLogin) {
			return {
				ok: true,
				status: 200,
				json: async () => ({ status: 200, message: "Demo mode: Action simulated successfully", data: {} }),
				blob: async () => new Blob(),
			};
		}

		const data = getMockResponse(url);
		return {
			ok: data.status >= 200 && data.status < 300,
			status: data.status,
			json: async () => data,
			blob: async () => new Blob(),
		};
	}

	const controller = new AbortController();
	const id = setTimeout(() => controller.abort(), timeout);
	try {
		const response = await fetch(url, {
			...options,
			signal: controller.signal,
		});
		clearTimeout(id);

		if ((response.status === 401 || response.status === 403) && !url.includes("/auth/")) {
			sessionManager.removeToken();
			window.location.href = "/";
		}

		return response;
	} catch (error) {
		clearTimeout(id);
		throw error;
	}
};

export const fetchWithAuth = async (url, options = {}, timeout = 10000) => {
	const token = localStorage.getItem("token") || sessionStorage.getItem("token");
	const headers = { ...options.headers };

	if (token) {
		headers["Authorization"] = `Bearer ${token}`;
	}

	if (options.body && !(options.body instanceof FormData) && !headers["Content-Type"]) {
		headers["Content-Type"] = "application/json";
	}

	return fetchWithTimeout(url, { ...options, headers }, timeout);
};

export const getImageUrl = (path) => {
	if (!path) return "";
	if (path.startsWith("data:") || path.startsWith("http")) return path;

	// In demo mode, paths from mockData are likely already resolved imports (e.g. /assets/...)
	// or relative paths that work with the bundler.
	// If not demo mode, prepend API URL.
	if (sessionManager.getDemoMode()) {
		// If path doesn't start with slash and no stored path, maybe it needs one? 
		// But usually imports start with /src or /assets or just hashed filename in build.
		return path;
	}

	// Ensure clean slash handling
	const baseUrl = config.BASE_URL.replace(/\/$/, "");
	const cleanPath = path.startsWith("/") ? path : `/${path}`;
	return `${baseUrl}${cleanPath}`;
};



