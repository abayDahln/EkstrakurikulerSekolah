# 🏫 Ekskul Sekolah

<div align="center">

[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Vue.js](https://img.shields.io/badge/Vue.js-3.5.24-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![.NET](https://img.shields.io/badge/.NET-8.0-512BD4?style=for-the-badge&logo=dotnet)](https://dotnet.microsoft.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Capacitor](https://img.shields.io/badge/Capacitor-8.0-119EFF?style=for-the-badge&logo=capacitor&logoColor=white)](https://capacitorjs.com/)

### 🚀 Sistem Digital Terintegrasi untuk Manajemen Ekstrakurikuler Sekolah

*Platform lengkap untuk siswa dan pembina dalam mengelola kegiatan ekstrakurikuler dengan point system otomatis dan certificate generation*

[📱 Mobile App](#-frontend-mobile) • [🌐 Web App](#-frontend-website) • [💻 Desktop App](#-frontend-desktop) • [🔧 Backend API](#-backend)

---

![Project Banner](https://github.com/user-attachments/assets/e6667d5a-6317-4a84-b64a-abf562c54ffc)

</div>

## 📋 Daftar Isi

- [Tentang Project](#-tentang-project)
- [Fitur Utama](#-fitur-utama)
- [Struktur Project](#-struktur-project)
- [Tech Stack](#%EF%B8%8F-tech-stack)
- [Quick Start](#-quick-start)
- [Frontend - Website](#-frontend-website)
- [Frontend - Mobile](#-frontend-mobile)
- [Frontend - Desktop](#-frontend-desktop)
- [Backend - API](#-backend)
- [Deployment](#-deployment)
- [Dokumentasi](#-dokumentasi)
- [Kontributor](#-kontributor)

## 🚀 Tentang Project

**Ekstrakurikuler Sekolah** adalah platform digital komprehensif yang dirancang untuk memudahkan manajemen kegiatan ekstrakurikuler di sekolah. Sistem ini menyediakan aplikasi untuk berbagai platform (Web, Mobile, Desktop) yang terhubung dengan satu backend API yang sama.

### 🎯 Latar Belakang

Mengelola ekstrakurikuler secara manual sering kali memakan waktu dan rentan kesalahan. Platform ini hadir untuk:
- ✅ Memudahkan siswa dalam memilih dan bergabung dengan ekstrakurikuler
- ✅ Membantu pembina mengelola anggota dan kegiatan secara efisien
- ✅ Otomasi sistem poin dan penerbitan sertifikat
- ✅ Menyediakan akses multi-platform untuk kemudahan pengguna

### 👥 Target Pengguna

<div align="center">

| 👨‍🎓 Siswa | 👨‍🏫 Pembina |
|:---:|:---:|
| **Platform:** Mobile & Web | **Platform:** Desktop & Web |
| Daftar & join ekstrakurikuler | Kelola anggota & kegiatan |
| Absensi & laporan kegiatan | Buat jadwal & dokumentasi |
| Lihat profil & sertifikat | Terbitkan sertifikat |
| Tracking point otomatis | Monitor progress siswa |

</div>

## ✨ Fitur Utama

### 🔐 Authentication & Authorization
- 🔑 **Login Multi-Role** - Siswa dan Pembina memiliki akses tersendiri
- 📝 **Register Siswa** - Pendaftaran akun baru untuk siswa
- 🛡️ **JWT Authentication** - Keamanan dengan token-based authentication
- 👤 **Profile Management** - Manajemen profil dengan upload foto

### 📚 Manajemen Ekstrakurikuler
- 📋 **CRUD Ekstrakurikuler** - Create, Read, Update, Delete untuk pembina
- 🔍 **Search & Filter** - Cari ekstrakurikuler berdasarkan keyword
- 📖 **Detail Lengkap** - Informasi lengkap setiap ekstrakurikuler
- ➕ **Join System** - Siswa dapat bergabung dengan ekstrakurikuler

### 📅 Manajemen Jadwal & Kegiatan
- 🗓️ **Calendar View** - Tampilan kalender untuk jadwal kegiatan
- ✅ **Absensi Digital** - Absensi hadir/izin/sakit online
- 📝 **Laporan Kegiatan** - Submit laporan aktivitas
- 📸 **Dokumentasi** - Upload foto dokumentasi kegiatan

### 🏆 Smart Point System
- ⭐ **Auto Point Calculation** - Sistem poin otomatis
- 📊 **Point Tracking** - Monitor progress poin real-time
- 🎯 **Point Milestones**:
  - Join ekstrakurikuler → First Point
  - Absensi hadir → Attendance Point
  - Submit report → Report Point
  - Reach 100 Points → Auto Certificate

### 🎓 Certificate Management
- 📜 **Auto Generate** - Sertifikat otomatis saat mencapai 100 poin
- 🏆 **Manual Upload** - Upload sertifikat lomba/event oleh pembina
- 🖼️ **Certificate Gallery** - Lihat koleksi sertifikat
- 💾 **Download Feature** - Download sertifikat dalam format image

### 📊 Dashboard & Analytics
- 📈 **Real-time Statistics** - Statistik kegiatan terkini
- 👥 **Member Management** - Kelola daftar anggota
- 📋 **Activity Reports** - Laporan kegiatan lengkap
- 🎯 **Performance Tracking** - Monitor performa siswa

## 🗂️ Struktur Project

```
EkstrakurikulerSekolah/
│
├── backend/                         # Backend API (.NET Core)
│   ├── Controllers/                # API Controllers
│   │   ├── AuthController.cs       # Authentication endpoints
│   │   ├── CertificateController.cs # Certificate management
│   │   ├── EkstrakurikulerController.cs # Extracurricular CRUD
│   │   ├── PembinaController.cs    # Pembina-specific endpoints
│   │   ├── ProfileController.cs    # User profile management
│   │   └── ScheduleController.cs   # Schedule & attendance
│   │
│   ├── Models/                     # Data models & services
│   │   ├── User.cs                 # User model
│   │   ├── Extracurricular.cs      # Extracurricular model
│   │   ├── Schedule.cs             # Schedule model
│   │   ├── Attendance.cs           # Attendance model
│   │   ├── Certificate.cs          # Certificate model
│   │   ├── Point.cs                # Point system model
│   │   ├── Member.cs               # Member relationship model
│   │   ├── ActivityReport.cs       # Activity report model
│   │   ├── ActivityDocumentation.cs # Documentation model
│   │   ├── EkskulDbContext.cs      # Database context
│   │   ├── CertificateService.cs   # Certificate generation service
│   │   └── PointService.cs         # Point calculation service
│   │
│   ├── Migrations/                 # EF Core migrations
│   ├── wwwroot/                    # Static files
│   │   ├── public/                 # Uploaded files (images, etc)
│   │   ├── template/               # Certificate templates
│   │   └── font/                   # Fonts untuk certificate
│   │
│   ├── Program.cs                  # Entry point aplikasi
│   ├── appsettings.json            # Configuration
│   └── README.md                   # Backend documentation
│
├── frontend/                        # Frontend Applications
│   │
│   ├── website/                    # Web Application (React + Vite)
│   │   ├── src/
│   │   │   ├── components/         # Reusable components
│   │   │   │   ├── Navbar.jsx      # Navigation bar
│   │   │   │   ├── Sidebar.jsx     # Sidebar navigation
│   │   │   │   ├── Calendar.jsx    # Calendar component
│   │   │   │   └── Loading.jsx     # Loading component
│   │   │   │
│   │   │   ├── pages/              # Page components
│   │   │   │   ├── Login.jsx       # Login page
│   │   │   │   ├── Register.jsx    # Register page
│   │   │   │   ├── Dashboard.jsx   # Dashboard page
│   │   │   │   ├── Ekstrakurikuler.jsx # Ekstrakurikuler list
│   │   │   │   ├── EkstrakurikulerDetail.jsx # Detail page
│   │   │   │   ├── Jadwal.jsx      # Schedule page
│   │   │   │   ├── JadwalDetail.jsx # Schedule detail
│   │   │   │   ├── Profile.jsx     # Public profile
│   │   │   │   ├── MyProfile.jsx   # User profile
│   │   │   │   ├── Certificate.jsx # Certificate page
│   │   │   │   └── Download.jsx    # Download page
│   │   │   │
│   │   │   ├── context/            # React context
│   │   │   │   └── AuthContext.jsx # Authentication context
│   │   │   │
│   │   │   ├── config/             # Configuration
│   │   │   │   └── api.js          # API configuration
│   │   │   │
│   │   │   ├── utils/              # Utility functions
│   │   │   │   └── formatDate.js   # Date formatting
│   │   │   │
│   │   │   ├── App.jsx             # Main app component
│   │   │   ├── main.jsx            # Entry point
│   │   │   └── index.css           # Global styles
│   │   │
│   │   ├── package.json            # Dependencies
│   │   └── vite.config.js          # Vite configuration
│   │
│   ├── mobile/                     # Mobile Application (React + Capacitor)
│   │   ├── src/
│   │   │   ├── components/         # Mobile components
│   │   │   ├── pages/              # Mobile pages
│   │   │   ├── App.jsx             # Main app component
│   │   │   └── main.jsx            # Entry point
│   │   │
│   │   ├── android/                # Android build files
│   │   ├── capacitor.config.ts     # Capacitor configuration
│   │   └── package.json            # Dependencies
│   │
│   └── desktop/                    # Desktop Application (Vue.js)
│       ├── src/
│       │   ├── components/         # Desktop components
│       │   ├── views/              # Desktop views
│       │   ├── router/             # Vue Router
│       │   ├── App.vue             # Main app component
│       │   └── main.js             # Entry point
│       │
│       ├── package.json            # Dependencies
│       └── vite.config.js          # Vite configuration
│
├── .github/                        # GitHub configuration
├── .gitignore                      # Git ignore file
└── README.md                       # Project documentation (this file)
```

## 🛠️ Tech Stack

### 🔙 Backend
[![.NET Core](https://img.shields.io/badge/.NET%20Core-8.0-512BD4?style=flat-square&logo=dotnet)](https://dotnet.microsoft.com/)
[![C#](https://img.shields.io/badge/C%23-239120?style=flat-square&logo=c-sharp&logoColor=white)](https://docs.microsoft.com/en-us/dotnet/csharp/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Entity Framework](https://img.shields.io/badge/Entity%20Framework-512BD4?style=flat-square&logo=dotnet)](https://docs.microsoft.com/en-us/ef/core/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=JSON%20web%20tokens&logoColor=white)](https://jwt.io/)
[![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=flat-square&logo=Swagger&logoColor=white)](https://swagger.io/)

- **Framework:** ASP.NET Core Web API 8.0
- **Language:** C#
- **Database:** PostgreSQL 16+
- **ORM:** Entity Framework Core
- **Authentication:** JWT Bearer Token
- **API Documentation:** Swagger/OpenAPI
- **Image Processing:** ImageSharp
- **Certificate Generation:** ImageSharp + Custom Fonts

### 🌐 Frontend - Website (Siswa & Pembina)
[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=flat-square&logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.14-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.23.24-0055FF?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion/)

- **Framework:** React 19.1.1
- **Build Tool:** Vite 7.1.7
- **Styling:** Tailwind CSS 4.1.14
- **Routing:** React Router DOM 7.9.3
- **Animation:** Framer Motion 12.23.24
- **HTTP Client:** Axios 1.12.2
- **Charts:** Recharts 3.3.0
- **Icons:** Lucide React, React Icons

### 📱 Frontend - Mobile (Siswa)
[![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=flat-square&logo=react&logoColor=white)](https://reactjs.org/)
[![Capacitor](https://img.shields.io/badge/Capacitor-8.0.1-119EFF?style=flat-square&logo=capacitor&logoColor=white)](https://capacitorjs.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.18-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

- **Framework:** React 19.2.3
- **Mobile Runtime:** Capacitor 8.0.1
- **Build Tool:** Vite 5.4.2
- **Styling:** Tailwind CSS 4.1.18
- **Routing:** React Router DOM 7.13.0
- **Animation:** Framer Motion 12.29.0
- **Native Features:** Camera Plugin, Splash Screen
- **Target Platform:** Android (iOS Coming Soon)

### 💻 Frontend - Desktop (Pembina)
[![Vue.js](https://img.shields.io/badge/Vue.js-3.5.24-4FC08D?style=flat-square&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![PrimeVue](https://img.shields.io/badge/PrimeVue-4.5.4-41B883?style=flat-square)](https://primevue.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.18-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

- **Framework:** Vue.js 3.5.24
- **Build Tool:** Vite 7.2.4
- **UI Library:** PrimeVue 4.5.4
- **Styling:** Tailwind CSS 4.1.18
- **Routing:** Vue Router 4.6.4
- **Icons:** PrimeIcons 7.0.0
- **Themes:** PrimeUI Themes 2.0.3

## 🚀 Quick Start

### Prasyarat

Pastikan Anda telah menginstall:
- **Node.js** 18+ dan **npm** 9+
- **.NET SDK** 8.0.121
- **PostgreSQL** 16+
- **Git**

### Clone Repository

```bash
git clone https://github.com/abayDahln/EkstrakurikulerSekolah.git
cd EkstrakurikulerSekolah
```

### Setup Backend

```bash
cd backend

# Restore dependencies
dotnet restore

# Setup database connection di appsettings.json
# Edit: ConnectionStrings.DefaultConnection

# Run migrations
dotnet ef database update

# Run backend
dotnet run
```

Backend akan berjalan di: `http://localhost:5000`
- API: `http://localhost:5000/api`
- Swagger: `http://localhost:5000/swagger`

### Setup Frontend Website

```bash
cd frontend/website

# Install dependencies
npm install

# Setup API URL di src/config/api.js
# Edit: baseURL sesuai dengan backend URL

# Run development server
npm run dev
```

Website akan berjalan di: `http://localhost:5173`

### Setup Frontend Mobile

```bash
cd frontend/mobile

# Install dependencies
npm install

# Setup API URL di src/config/api.js

# Run development server
npm run dev

# Build untuk Android
npx cap sync android
npx cap open android
```

### Setup Frontend Desktop

```bash
cd frontend/desktop

# Install dependencies
npm install

# Setup API URL di src/config/api.js

# Run development server
npm run dev
```

Desktop akan berjalan di: `http://localhost:5174`

## 🌐 Frontend - Website

### Teknologi
- React 19.1.1 + Vite 7.1.7
- Tailwind CSS 4.1.14 untuk styling
- Framer Motion untuk animasi
- React Router DOM untuk routing
- Axios untuk HTTP client
- Recharts untuk data visualization

### Fitur Website
- ✅ Responsive design untuk mobile dan desktop
- ✅ Dark mode support (coming soon)
- ✅ Real-time data fetching
- ✅ Form validation
- ✅ Image upload dengan preview
- ✅ PDF/Image certificate viewer
- ✅ Calendar view untuk jadwal
- ✅ Search dan filter functionality
- ✅ Error handling dengan retry mechanism
- ✅ Loading states untuk better UX

### Halaman Utama
- `/login` - Login page untuk siswa dan pembina
- `/register` - Register page untuk siswa baru
- `/dashboard` - Dashboard dengan statistik
- `/ekstrakurikuler` - Daftar ekstrakurikuler
- `/ekstrakurikuler/:id` - Detail ekstrakurikuler
- `/jadwal` - Kalender jadwal kegiatan
- `/jadwal/:id` - Detail jadwal dengan absensi
- `/profile/:id` - Public profile page
- `/my-profile` - User profile dengan edit
- `/certificate` - Halaman kelola sertifikat
- `/download` - Download aplikasi mobile/desktop

### Development

```bash
cd frontend/website

# Install dependencies
npm install

# Run dev server
npm run dev

# Build untuk production
npm run build

# Preview production build
npm run preview
```

### Environment Variables

Buat file `.env` di `frontend/website/`:
```env
VITE_API_URL=http://localhost:5000/api
```

## 📱 Frontend - Mobile

### Teknologi
- React 19.2.3 + Capacitor 8.0.1
- Tailwind CSS 4.1.18
- React Router DOM untuk navigasi
- Capacitor Camera untuk foto
- Capacitor Splash Screen

### Fitur Mobile App
- ✅ Native Android app menggunakan Capacitor
- ✅ Camera integration untuk foto profil
- ✅ Offline handling dengan retry
- ✅ Touch-friendly UI components
- ✅ Pull-to-refresh functionality
- ✅ Native splash screen
- ✅ Bottom navigation
- ✅ Swipe gestures

### Target Platform
- ✅ **Android** (Tersedia)
- 🔜 **iOS** (Coming Soon)

### Development

```bash
cd frontend/mobile

# Install dependencies
npm install

# Run di browser
npm run dev

# Sync dengan Capacitor
npx cap sync

# Build Android
npm run build
npx cap sync android
npx cap open android

# Run di Android emulator/device
npx cap run android
```

### Build APK

```bash
# Build production
npm run build
npx cap sync android
npx cap copy android

# Buka Android Studio
npx cap open android

# Di Android Studio:
# Build > Build Bundle(s) / APK(s) > Build APK(s)
```

## 💻 Frontend - Desktop

### Teknologi
- Vue.js 3.5.24
- PrimeVue 4.5.4 UI Library
- Tailwind CSS 4.1.18
- Vue Router 4.6.4
- Vite 7.2.4

### Fitur Desktop App
- ✅ PrimeVue UI components
- ✅ Data tables dengan sorting/filtering
- ✅ Advanced form components
- ✅ File upload dengan drag & drop
- ✅ Toast notifications
- ✅ Dialog/Modal components
- ✅ Multi-level menus

### Development

```bash
cd frontend/desktop

# Install dependencies
npm install

# Run dev server
npm run dev

# Build untuk production
npm run build

# Preview production build
npm run preview
```

### Build Desktop Executable

Untuk build desktop executable menggunakan Electron (Coming Soon):

```bash
# Install Electron (akan ditambahkan)
npm install --save-dev electron electron-builder

# Build executable
npm run build:desktop
```

## 🔧 Backend

### Teknologi
- ASP.NET Core Web API 8.0
- Entity Framework Core dengan PostgreSQL
- JWT Authentication
- Swagger untuk API documentation
- ImageSharp untuk image processing
- Custom certificate generation

### API Endpoints

#### Authentication
```http
POST /api/auth/login/siswa        # Login siswa
POST /api/auth/login/pembina      # Login pembina
POST /api/auth/register/siswa     # Register siswa baru
```

#### Ekstrakurikuler
```http
GET    /api/extracurricular                # Get all ekstrakurikuler
GET    /api/extracurricular/{id}           # Get detail
POST   /api/extracurricular/{id}/join      # Join ekstrakurikuler
GET    /api/extracurricular?search={query} # Search
```

#### Schedule
```http
GET    /api/schedule                       # Get all schedules
GET    /api/schedule/{id}                  # Get detail
POST   /api/schedule                       # Create schedule (Pembina)
POST   /api/schedule/{id}/attendance       # Absensi
POST   /api/schedule/{id}/report           # Submit report
POST   /api/schedule/{id}/documentation    # Upload dokumentasi
```

#### Profile
```http
GET    /api/profile                        # Get my profile
PUT    /api/profile                        # Update profile
POST   /api/profile/photo                  # Upload foto profil
GET    /api/profile/{userId}               # Get user profile
```

#### Certificate
```http
GET    /api/certificate                    # Get my certificates
GET    /api/certificate/{id}               # Get certificate detail
POST   /api/certificate                    # Create certificate (Pembina)
```

#### Pembina
```http
GET    /api/pembina/ekstrakurikuler        # Get my ekstrakurikuler
GET    /api/pembina/members/{ekskulId}     # Get members
GET    /api/pembina/statistics             # Get statistics
POST   /api/pembina/schedule               # Create schedule
```

### Development

```bash
cd backend

# Restore dependencies
dotnet restore

# Run migrations
dotnet ef migrations add InitialCreate
dotnet ef database update

# Run dengan auto-reload
dotnet watch run

# Build
dotnet build

# Run tests (coming soon)
dotnet test
```

### Database Schema

#### Users
- Id, Name, Email, Password (hashed), Role, ProfilePhotoUrl, CreatedAt

#### Extracurriculars
- Id, Name, Description, Category, ImageUrl, PembinaId, CreatedAt

#### Members
- Id, UserId, ExtracurricularId, Points, JoinedAt

#### Schedules
- Id, ExtracurricularId, Title, Description, StartTime, EndTime, Location

#### Attendances
- Id, ScheduleId, UserId, Status, CreatedAt

#### ActivityReports
- Id, ScheduleId, UserId, Content, CreatedAt

#### ActivityDocumentations
- Id, ScheduleId, ImageUrl, UploadedBy, CreatedAt

#### Certificates
- Id, UserId, ExtracurricularId, Title, ImageUrl, IssuedDate

#### Points
- Id, MemberId, Points, Source, CreatedAt

### Environment Configuration

Edit `backend/appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=ekstrakurikuler_db;Username=postgres;Password=your_password"
  },
  "Jwt": {
    "Key": "your-secret-key-min-32-characters-long",
    "Issuer": "EkstrakurikulerAPI",
    "Audience": "EkstrakurikulerClient",
    "ExpireDays": 7
  }
}
```

## 🚀 Deployment

### Backend Deployment

#### Deploy ke Railway / Render
```bash
# Build production
dotnet publish -c Release -o ./publish

# Deploy ke cloud platform
# Konfigurasi environment variables:
# - ConnectionStrings__DefaultConnection
# - Jwt__Key
# - Jwt__Issuer
# - Jwt__Audience
```

### Frontend Website Deployment

#### Deploy ke Vercel
```bash
cd frontend/website

# Build
npm run build

# Deploy
vercel --prod
```

#### Deploy ke Netlify
```bash
cd frontend/website

# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

### Mobile App Deployment

#### Google Play Store
1. Build signed APK/AAB di Android Studio
2. Upload ke Google Play Console
3. Ikuti proses review dan publishing

### Desktop App Deployment

#### GitHub Releases
1. Build executable untuk Windows/Mac/Linux
2. Upload ke GitHub Releases
3. Distribute download link

## 📖 Dokumentasi

### API Documentation
- **Swagger UI:** `http://localhost:5000/swagger`
- **Backend README:** [`/backend/README.md`](./backend/README.md)

### Design Resources
- **Figma Design:** [Ekskul Design](...)
- **Architecture Diagram:** See image in this README

### User Guides
- **Panduan Siswa:** Coming Soon
- **Panduan Pembina:** Coming Soon
- **FAQ:** Coming Soon

## 🤝 Kontributor

### Development Team
- **Backend Developer:** [@abayDahln](https://github.com/abayDahln)
- **Frontend Developer (Website):** [@abayDahln](https://github.com/abayDahln)
- **Frontend Developer (Mobile):** [@abayDahln](https://github.com/abayDahln)
- **Frontend Developer (Desktop):** [@Nabixka](https://github.com/Nabixka)

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Kontak

Jika ada pertanyaan atau saran, silakan hubungi:
- **Email:** your-email@example.com
- **GitHub Issues:** [Create an issue](...)

---

<div align="center">

### ⭐ Jika project ini bermanfaat, jangan lupa berikan star!

**Made with ❤️ by Development Team**

[![GitHub](...)](...)

</div>
