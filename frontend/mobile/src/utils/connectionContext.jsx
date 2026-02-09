import React, { createContext, useContext } from "react";

export const ConnectionContext = createContext();

export const useConnection = () => useContext(ConnectionContext);

export const fetchWithTimeout = async (resource, options = {}) => {
    const { timeout = 10000 } = options;

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(resource, {
            ...options,
            signal: controller.signal
        });
        clearTimeout(id);
        return response;
    } catch (error) {
        clearTimeout(id);
        throw error;
    }
};
