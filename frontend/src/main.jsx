import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Log from './Login.jsx'
import Home from './Home.jsx'
import Jadwal from './Jadwal.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/login" element={<Log />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/jadwal" element={<Jadwal />}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
