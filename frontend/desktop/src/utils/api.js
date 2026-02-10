import { getDemoMode, removeToken } from "./helper";
import mockData from "../data/mockData";

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
    const isDemo = getDemoMode();

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
            removeToken();
            window.location.href = "/";
        }

        return response;
    } catch (error) {
        clearTimeout(id);
        throw error;
    }
};

export const fetchWithAuth = async (url, options = {}, timeout = 10000) => {
    const token = localStorage.getItem("token");
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
    if (path.startsWith("data:") || path.startsWith("http") || path.startsWith("/src") || path.startsWith("blob:")) return path;

    if (getDemoMode()) {
        return path;
    }

    const API_URL = import.meta.env.VITE_API_URL;
    const baseUrl = API_URL ? API_URL.replace(/\/$/, "") : "";
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `${baseUrl}${cleanPath}`;
};
