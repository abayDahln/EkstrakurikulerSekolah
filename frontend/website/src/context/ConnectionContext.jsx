import React, { createContext, useContext, useState, useEffect } from "react";

const ConnectionContext = createContext();

export const ConnectionProvider = ({ children }) => {
    const [isServerDown, setIsServerDown] = useState(false);
    const [isOffline, setIsOffline] = useState(!navigator.onLine);

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

    const retryConnection = () => {
        setIsServerDown(false);
        window.dispatchEvent(new CustomEvent("retry-connection"));
    };

    const isDemo = localStorage.getItem("demoMode") === "true";
    const effectiveIsServerDown = isDemo ? false : isServerDown;

    return (
        <ConnectionContext.Provider value={{ isServerDown: effectiveIsServerDown, setIsServerDown, isOffline, retryConnection }}>
            {children}
        </ConnectionContext.Provider>
    );
};

export const useConnection = () => {
    const context = useContext(ConnectionContext);
    if (!context) {
        throw new Error("useConnection must be used within a ConnectionProvider");
    }
    return context;
};
