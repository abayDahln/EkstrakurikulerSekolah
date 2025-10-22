import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import Log from './Login.jsx'
import Home from './Home.jsx';
import Jadwal from './Jadwal.jsx';
import Dokum from './Dokumentasi.jsx';
import Absen from './Absen.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Log />} />
        <Route path="/home" element={<Home />} />
        <Route path="/jadwal" element={<Jadwal />} />
        <Route path="/dokumentasi" element={<Dokum />} />
        <Route path="/absen" element={<Absen />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)