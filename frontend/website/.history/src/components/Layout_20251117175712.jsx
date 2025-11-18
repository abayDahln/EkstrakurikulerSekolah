import second from 'first'
import Sidebar from "../components/Sidebar";

export default function MainLayout({ children, darkMode }) {
    return (
        <div
            className={`min-h-screen transition-colors duration-300 ${
                darkMode
                    ? "bg-slate-900"
                    : "bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50"
            }`}
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
            <Sidebar darkMode={darkMode} />

            <div
                className="transition-all duration-300"
                style={{ marginLeft: "280px" }}
            >
                <div className="p-8">{children}</div>
            </div>
        </div>
    );
}
