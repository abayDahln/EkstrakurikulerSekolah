import { useNavigate } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login"); // pindah ke halaman login
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Selamat Datang di Website Saya</h1>
      <p>Ini adalah landing page sederhana React.</p>
      <button
        onClick={handleLoginClick}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Masuk ke Login
      </button>
    </div>
  );
}
