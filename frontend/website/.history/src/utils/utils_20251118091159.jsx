import React from "react";

const sessionManager = {
	getToken: () => {
		try {
			// SELALU baca dari localStorage
			const token = localStorage.getItem("token");
			const expiredAt = localStorage.getItem("expiredAt");
			const rememberMe = sessionManager.getRememberMe();

			if (!token || !expiredAt) {
				return null;
			}

			// Check expiration
			const now = Date.now();
			const exp = Date.parse(expiredAt);

			if (isNaN(exp) || now > exp) {
				sessionManager.removeToken();
				return null;
			}

			console.log("✅ Token valid");
			return token;
		} catch (error) {
			console.error("Error getting token:", error);
			return null;
		}
	},

	setToken: (token, expiredAt, rememberMe = false) => {
		try {
			// If expiredAt is not provided from API, set to 1 day from now
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
            localStorage.removeItem("rememberMe")
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

            const result = rememberMe === "true";
            return result;             

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
};

export default sessionManager;
