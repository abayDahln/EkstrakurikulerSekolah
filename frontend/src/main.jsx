import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import App from './Page/Landing/Landing.jsx';
import Log from './Page/Login/Login.jsx';
import Home from './Page/Home/Home.jsx';
import Jadwal from './Page/Jadwal/Jadwal.jsx';
import Dokum from './Page/Dokumentasi/Dokum.jsx';
import Absen from './Page/Absen/Absen.jsx';
import ProtectedRoute from './utils/ProtectedRoute.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />

        <Route path="/login" element={<Log />} />

        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/jadwal" 
          element={
            <ProtectedRoute>
              <Jadwal />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/dokumentasi" 
          element={
            <ProtectedRoute>
              <Dokum />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/absen" 
          element={
            <ProtectedRoute>
              <Absen />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
