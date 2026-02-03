# Ekskul-Hub – Desktop App

Aplikasi desktop berbasis **Vue 3 + Vite + Electron**  
Digunakan untuk manajemen data ekstrakurikuler sekolah.

---

## 📦 Teknologi
- Vue 3
- Vite
- Electron
- Electron Builder
- Tailwind CSS
- Vue-Router
- PrimeVue

---

## 📁 Struktur Project
```
desktop/
├─ src/ # Source code Vue
├─ public/ # File static publik
├─ dist/ # Hasil build Vite (auto)
├─ electron/
│ └─ main.cjs # Main process Electron
├─ build/
│ └─ icon.ico # Icon installer (opsional)
├─ package.json
├─ vite.config.js
└─ README.md

```

---

## ⚙️ Prasyarat
Pastikan sudah terinstall:
- **Node.js (LTS)**
- **npm**

Cek versi:
```bash
node -v
npm -v

```

## 📥 Install Dependency
Jalankan di root Project:
```bash
npm install

```

## 🌐 Konfigurasi Environment
Sesuaikan .ENV dengan URL backend

## ▶️ Menjalankan Aplikasi Desktop
```bash
npm run desktop

```

## 🏗️ Build Installer
Jalankan Di Windows PowerShell sebagai admin
```bash
# Your Project directory
cd C:\Users\Name\EkstrakurikulerSekolah\frontend\desktop

npm run dist
```