# 🎓 Ekstrakurikuler Sekolah - Web App (Pembina)

![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.14-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.23.24-FF0080?style=for-the-badge&logo=framer&logoColor=white)

Platform manajemen ekstrakurikuler berbasis web untuk **Pembina**. Dibangun dengan React + Vite dan dilengkapi animasi modern menggunakan Framer Motion, sistem dark mode, serta penanganan error offline yang robust.

---

## 📋 Daftar Isi

- [Fitur](#-fitur)
- [Tech Stack](#-tech-stack)
- [Prasyarat](#-prasyarat)
- [Instalasi](#-instalasi)
- [Konfigurasi](#-konfigurasi)
- [Menjalankan Aplikasi](#-menjalankan-aplikasi)
- [Struktur Project](#-struktur-project)
- [Scripts](#-scripts)
- [Fitur Detail](#-fitur-detail)
- [Environment](#-environment)
- [Build untuk Production](#-build-untuk-production)
- [Docker](#-docker)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Fitur

### 🔐 Autentikasi & Keamanan
- **Login Pembina** dengan token JWT
- **Token Management** dengan auto-refresh dan expiry detection
- **Session Persistence** dengan opsi "Remember Me"
- **Protected Routes** untuk halaman yang memerlukan autentikasi

### 📊 Dashboard & Manajemen
- **Dashboard Real-time** dengan statistik lengkap
- **Manajemen Ekstrakurikuler** (view, create, update)
- **Manajemen Jadwal** dengan kalender terintegrasi
- **Manajemen Sertifikat** dengan upload dan preview
- **Manajemen Anggota** dengan sistem poin dan absensi

### 🎨 UI/UX
- **Dark Mode / Light Mode** dengan transisi smooth
- **Responsive Design** (mobile, tablet, desktop)
- **Skeleton Loaders** untuk pengalaman loading yang lebih baik
- **Smooth Animations** menggunakan Framer Motion
- **Glassmorphism** dan gradient modern
- **Interactive Charts** dengan Recharts

### 🌐 Network & Error Handling
- **Offline Detection** otomatis
- **Connection Timeout** (10 detik default)
- **Retry Mechanism** untuk koneksi gagal
- **Global Error Status** dengan UI yang informatif
- **Auto-polling** data dengan interval 60 detik

### 📅 Fitur Khusus
- **Calendar Component** dengan highlight jadwal
- **Documentation Upload** untuk kegiatan
- **Certificate Generation** untuk anggota
- **Member Statistics** dengan visualisasi grafik
- **Schedule Management** dengan status tracking

---

## 🛠️ Tech Stack

### Core
- **React 19.1.1** - Library UI
- **Vite 7.1.7** - Build tool & dev server
- **React Router DOM 7.9.3** - Routing & navigation

### Styling & Animation
- **Tailwind CSS 4.1.14** - Utility-first CSS framework
- **Framer Motion 12.23.24** - Animation library
- **Lucide React 0.546.0** - Icon library
- **React Icons 5.5.0** - Icon library

### Data & Visualization
- **Recharts 3.3.0** - Chart library
- **Axios 1.12.2** - HTTP client

### Development
- **ESLint 9.36.0** - Linting
- **Capacitor 7.4.3** - Native mobile capabilities

---

## 📦 Prasyarat

Pastikan Anda telah menginstall:

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 atau **yarn** >= 1.22.0
- **Backend API** sudah berjalan di `http://localhost:5000`

---

## 🚀 Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/your-username/ekstrakurikuler-sekolah.git
cd ekstrakurikuler-sekolah/frontend/website
```

### 2. Install Dependencies

```bash
npm install
```

atau menggunakan yarn:

```bash
yarn install
```

---

## ⚙️ Konfigurasi

### 1. File Konfigurasi

Edit file `src/config/config.js` untuk menyesuaikan dengan environment Anda:

```javascript
const config = {
    BASE_URL: "http://localhost:5000",
    API_URL: "http://localhost:5000/api",
    DOWNLOAD_LINKS: {
        ANDROID: "https://drive.google.com/file/d/xxx/ekstrakurikuler.apk",
        IOS: "https://apps.apple.com/id/app/ekstrakurikuler-sekolah",
        DESKTOP: "https://drive.google.com/file/d/xxx/ekstrakurikuler-pembina.exe",
        WEB: "/login"
    }
};

export default config;
```

### 2. Environment Variables (Optional)

Jika Anda ingin menggunakan environment variables, buat file `.env` di root folder:

```env
VITE_BASE_URL=http://localhost:5000
VITE_API_URL=http://localhost:5000/api
```

Kemudian update `config.js`:

```javascript
const config = {
    BASE_URL: import.meta.env.VITE_BASE_URL || "http://localhost:5000",
    API_URL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
    // ...
};
```

---

## 🏃 Menjalankan Aplikasi

### Development Mode

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

---

## 📁 Struktur Project

```
frontend/website/
├── public/                     # Static assets
│   └── logo.svg
├── src/
│   ├── assets/                 # Images, fonts, dll
│   │   ├── favicon.svg
│   │   ├── logo.svg
│   │   └── landing-logo.svg
│   ├── components/             # Reusable components
│   │   ├── Calendar.jsx
│   │   ├── ErrorStatus.jsx
│   │   ├── Navbar.jsx
│   │   └── Sidebar.jsx
│   ├── config/                 # Configuration files
│   │   └── config.js
│   ├── context/                # React Context
│   │   └── ConnectionContext.jsx
│   ├── pages/                  # Page components
│   │   ├── Certificate.jsx
│   │   ├── Download.jsx
│   │   ├── Ekstrakurikuler.jsx
│   │   ├── EkstrakurikulerDetail.jsx
│   │   ├── Home.jsx
│   │   ├── Jadwal.jsx
│   │   ├── JadwalDetail.jsx
│   │   ├── Landing.jsx
│   │   ├── Login.jsx
│   │   ├── MyProfile.jsx
│   │   └── Profile.jsx
│   ├── utils/                  # Utility functions
│   │   └── utils.jsx
│   ├── App.jsx                 # Main app component
│   ├── index.css               # Global styles
│   └── main.jsx                # Entry point
├── .dockerignore
├── .gitignore
├── Dockerfile
├── eslint.config.js
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

---

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Jalankan development server |
| `npm run build` | Build untuk production |
| `npm run preview` | Preview production build |
| `npm run lint` | Check code dengan ESLint |

---

## 🎯 Fitur Detail

### 1. Connection Error Handling

Aplikasi dilengkapi dengan sistem penanganan error yang robust:

```javascript
// Automatic timeout detection (10 seconds)
// Offline detection via browser API
// Global retry mechanism
// Visual error status component
```

**Features:**
- Deteksi offline otomatis
- Timeout 10 detik untuk setiap request
- Tombol "Coba Lagi" yang memicu refetch
- UI error yang informatif dan menarik

### 2. Dark Mode

Toggle antara dark dan light mode dengan animasi smooth:

```javascript
// Persistent theme preference
// Smooth color transitions
// Consistent styling across all pages
```

### 3. Session Management

Sistem autentikasi dengan fitur lengkap:

```javascript
// JWT token storage
// Auto token expiry detection
// Remember me functionality
// Secure logout mechanism
```

### 4. Real-time Polling

Data diperbarui secara otomatis:

```javascript
// 60-second polling interval
// Automatic data refresh
// Background sync
```

---

## 🌍 Environment

### Development
- **Port:** 5173
- **API:** http://localhost:5000
- **Hot Reload:** Enabled

### Production
- **Build Output:** `dist/`
- **Optimized Assets:** Minified & compressed
- **Code Splitting:** Automatic

---

## 🏗️ Build untuk Production

### 1. Build Project

```bash
npm run build
```

Output akan tersimpan di folder `dist/`

### 2. Test Production Build

```bash
npm run preview
```

### 3. Deploy ke Server

Upload seluruh isi folder `dist/` ke web server Anda (Nginx, Apache, dll)

#### Nginx Configuration Example

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/ekstrakurikuler/frontend/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # API Proxy (optional)
    location /api {
        proxy_pass http://localhost:5000/api;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 🐳 Docker

### Build Docker Image

```bash
docker build -t ekstrakurikuler-frontend .
```

### Run Container

```bash
docker run -d -p 3000:80 --name ekstrakurikuler-web ekstrakurikuler-frontend
```

### Docker Compose (with Backend)

```yaml
version: '3.8'

services:
  frontend:
    build: ./frontend/website
    ports:
      - "3000:80"
    depends_on:
      - backend
    environment:
      - VITE_API_URL=http://backend:5000/api

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
```

---

## 🤝 Contributing

Kami menerima kontribusi! Silakan ikuti langkah berikut:

1. Fork repository ini
2. Buat branch baru (`git checkout -b feature/amazing-feature`)
3. Commit perubahan (`git commit -m 'Add some amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Buat Pull Request

### Coding Standards

- Gunakan **ES6+ syntax**
- Follow **ESLint rules**
- Gunakan **Prettier** untuk formatting
- Tambahkan **PropTypes** untuk component props
- Buat **dokumentasi** untuk fitur baru

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

- **Developer:** [Your Name]
- **Designer:** [Designer Name]
- **Project Manager:** [PM Name]

---

## 📞 Support

Jika Anda mengalami masalah atau memiliki pertanyaan:

- **Email:** support@ekstrakurikuler.com
- **Issue Tracker:** [GitHub Issues](https://github.com/your-username/ekstrakurikuler-sekolah/issues)
- **Documentation:** [Wiki](https://github.com/your-username/ekstrakurikuler-sekolah/wiki)

---

## 🙏 Acknowledgments

- Icon library oleh [Lucide](https://lucide.dev) dan [React Icons](https://react-icons.github.io/react-icons/)
- Chart library oleh [Recharts](https://recharts.org)
- Animation library oleh [Framer Motion](https://www.framer.com/motion/)
- Styling framework oleh [Tailwind CSS](https://tailwindcss.com)

---

**Made with ❤️ for better education management**