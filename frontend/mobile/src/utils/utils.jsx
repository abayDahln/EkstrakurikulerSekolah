import React from "react";
import config from "../config/config.js";

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

    getUser: () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return null;

            if (token === "dummy-demo-token") {
                return {
                    id: 1,
                    name: "Andiansyah",
                    role: "siswa"
                };
            }

            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            const payload = JSON.parse(jsonPayload);
            return {
                id: parseInt(payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] || payload.id || payload.sub),
                name: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || payload.name,
                role: payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || payload.role
            };
        } catch (error) {
            console.error("Error decoding token:", error);
            return null;
        }
    },

    isDemoMode: () => {
        return config.IS_DEMO_MODE || sessionStorage.getItem("isDemoMode") === "true";
    }
};

export const getFullImageUrl = (url) => {
    if (!url) return "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=250&fit=crop";

    // If it's already an absolute URL, data URL, blob, or a Vite processed asset path
    if (
        url.startsWith("http") ||
        url.startsWith("data:") ||
        url.startsWith("blob:") ||
        url.startsWith("/") ||
        url.includes("static/js") || // Capacitor assets sometimes look like this
        url.startsWith("capacitor://") ||
        url.startsWith("http://localhost")
    ) {
        return url;
    }

    // Otherwise prepend BASE_URL
    return `${config.BASE_URL}/${url}`;
};

export default sessionManager;
