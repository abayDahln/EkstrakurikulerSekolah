# Ekskul-Hub – Desktop App

Aplikasi desktop berbasis **Vue 3 + Vite + Tauri**  
Digunakan untuk manajemen data ekstrakurikuler sekolah.

---

## 📦 Teknologi
- Vue 3
- Vite
- Tauri (Next Gen Desktop Framework)
- Rust (Backend)
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
├─ src-tauri/ # Konfigurasi & Backend Tauri (Rust)
├─ package.json
├─ vite.config.js
└─ README.md
```

---

## ⚙️ Prasyarat
Pastikan sudah terinstall:
- **Node.js (LTS)**
- **Rust (v1.75+)** - [Install via rustup](https://rustup.rs/)
- **Visual Studio Build Tools 2022** (dengan workload C++)

Cek versi:
```bash
node -v
npm -v
rustc --version
```

## 📥 Install Dependency
Jalankan di root Project:
```bash
npm install
```

## 🌐 Konfigurasi Environment
Sesuaikan `.env` dengan URL backend.

## ▶️ Menjalankan Aplikasi Desktop (Dev Mode)
```bash
npm run tauri:dev
```

## 🏗️ Build Installer (Production)
```bash
npm run tauri:build
```

Hasil build (installer .msi & .exe) akan berada di folder:
`src-tauri/target/release/bundle/`

---

## 🚀 Keunggulan Tauri
- **Ukuran Sangat Kecil**: Installer ~3MB (vs ~100MB Electron).
- **Performa Tinggi**: Menggunakan native webview masing-masing OS.
- **Keamanan Lebih Baik**: Memisahkan context frontend dan backend secara ketat.
