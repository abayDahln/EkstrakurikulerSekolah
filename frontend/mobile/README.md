# 📱 Ekstrakurikuler Sekolah - Mobile App (Siswa)

<div align="center">

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Capacitor](https://img.shields.io/badge/Capacitor-8-119EFF?style=for-the-badge&logo=capacitor&logoColor=white)](https://capacitorjs.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

### 🎯 Frontend Mobile untuk Manajemen Ekstrakurikuler Sekolah

*Progressive Web App (PWA) yang dapat dijalankan sebagai aplikasi native di Android dan iOS dengan Capacitor*

[📖 Documentation](#-api-integration) • [🔧 Installation](#-instalasi) • [🎯 Features](#-fitur-utama) • [📱 Build Mobile](#-build-untuk-mobile)

---

</div>

## 📋 Daftar Isi

- [Tentang Project](#-tentang-project)
- [Fitur Utama](#-fitur-utama)
- [Tech Stack](#%EF%B8%8F-tech-stack)
- [Prasyarat](#-prasyarat)
- [Instalasi](#-instalasi)
- [Konfigurasi](#%EF%B8%8F-konfigurasi)
- [Menjalankan Aplikasi](#-menjalankan-aplikasi)
- [Build untuk Mobile](#-build-untuk-mobile)
- [Struktur Project](#-struktur-project)
- [API Integration](#-api-integration)
- [Komponen Utama](#-komponen-utama)
- [Error Handling](#-error-handling)
- [Troubleshooting](#-troubleshooting)

## 🚀 Tentang Project

<table>
<tr>
<td>

**Ekstrakurikuler Sekolah Mobile App** adalah aplikasi frontend mobile yang dibangun dengan React dan Vite, dirancang khusus untuk siswa dalam mengelola kegiatan ekstrakurikuler mereka. Aplikasi ini dapat dijalankan sebagai Progressive Web App (PWA) atau dikompilasi menjadi aplikasi native menggunakan Capacitor.

### 🎯 Tujuan

Project ini bertujuan untuk memberikan akses mudah bagi siswa untuk:
- 📋 Melihat dan bergabung dengan ekstrakurikuler
- 📅 Mengecek jadwal kegiatan
- ✅ Melakukan absensi
- 📊 Memonitor poin aktivitas
- 🎓 Mengakses sertifikat digital

</td>
</tr>
</table>

### 👥 Target Pengguna

<div align="center">

| 👨‍🎓 Siswa |
|:---:|
| ✅ Browse ekstrakurikuler |
| ➕ Join ekstrakurikuler |
| 📅 Lihat jadwal |
| ✔️ Absensi kegiatan |
| 📝 Submit laporan |
| 🎖️ Kumpulkan poin |
| 🎓 Download sertifikat |
| 👤 Kelola profil |

</div>

## ✨ Fitur Utama

<table>
<tr>
<td width="50%">

### 🔐 Authentication
- 🔑 **Login Sistem** - JWT-based authentication
- 📝 **Register Siswa** - Pendaftaran akun baru
- 🔄 **Auto Login** - Remember me functionality
- 🔒 **Protected Routes** - Route guards
- ⏱️ **Token Management** - Auto token validation

</td>
<td width="50%">

### 🎨 User Experience
- 🌓 **Dark Mode** - Toggle theme
- 📱 **Responsive Design** - Mobile-first
- 🎭 **Smooth Animations** - Framer Motion
- ⚡ **Fast Navigation** - React Router v7
- 🔄 **Real-time Updates** - Auto refresh data
- 🎯 **Offline Detection** - Network status

</td>
</tr>
</table>

<details>
<summary><b>📚 Fitur Ekstrakurikuler (Klik untuk expand)</b></summary>

### 🎯 Manajemen Ekstrakurikuler
- 📋 **Daftar Ekskul** - Browse semua ekstrakurikuler
- 🔍 **Pencarian Real-time** - Search dengan debounce
- 📖 **Detail Lengkap** - Info ekskul, pembina, anggota
- ➕ **Join Ekskul** - Bergabung dengan konfirmasi
- 🎨 **Card Design** - Modern UI dengan image fallback
- 👥 **Member List** - Lihat daftar anggota
- ✅ **Status Badge** - Indikator sudah join

### 📅 Manajemen Jadwal
- 📆 **Calendar View** - Kalender interaktif
- 🗓️ **Date Navigation** - Navigasi hari/bulan
- 📋 **Schedule List** - Daftar jadwal by date
- 🔔 **Schedule Detail** - Info lengkap kegiatan
- ✅ **Attendance** - Hadir/Izin/Sakit dengan slider
- 📝 **Report Submission** - Upload laporan kegiatan
- 📎 **Document Upload** - Multiple file support
- 🔄 **Auto Refresh** - Update otomatis setiap 5 detik

### 👤 Profil & Data
- 👁️ **View Profile** - Info lengkap siswa
- ✏️ **Edit Profile** - Update nama & email
- 📸 **Upload Photo** - Ganti foto profil
- 📊 **Activity Stats** - Total poin, hadir, ekskul
- 🏆 **Point History** - Riwayat perolehan poin
- 📜 **My Ekskul** - Daftar ekskul yang diikuti

### 🎓 Sertifikat
- 📋 **Certificate List** - Daftar semua sertifikat
- 🔍 **Search Certificate** - Cari berdasarkan keyword
- 👁️ **Preview** - Lihat preview sertifikat
- ⬇️ **Download** - Download sertifikat PNG
- 🎨 **Grid Layout** - Tampilan card modern

</details>

---

## 🛠️ Tech Stack

<div align="center">

### Core Technologies

[![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

### Styling & UI

[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.18-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Lucide Icons](https://img.shields.io/badge/Lucide-0.563-000000?style=for-the-badge)](https://lucide.dev/)
[![React Icons](https://img.shields.io/badge/React_Icons-5.5-E91E63?style=for-the-badge)](https://react-icons.github.io/react-icons/)

### Mobile Runtime

[![Capacitor](https://img.shields.io/badge/Capacitor-8.0.1-119EFF?style=for-the-badge&logo=capacitor&logoColor=white)](https://capacitorjs.com/)
[![PWA](https://img.shields.io/badge/PWA-Enabled-5A0FC8?style=for-the-badge&logo=pwa)](https://web.dev/progressive-web-apps/)

</div>

---

<table>
<tr>
<td width="33%">

### 🔧 Frontend Framework
- **React 19.2.3** - UI Library
- **Vite 5.4.2** - Build tool
- **React Router DOM 7.13** - Routing
- **JSX** - Component syntax

</td>
<td width="33%">

### 🎨 Styling
- **Tailwind CSS 4.1.18** - Utility-first CSS
- **PostCSS** - CSS processing
- **Plus Jakarta Sans** - Custom font
- **Dark Mode** - Theme support

</td>
<td width="33%">

### 📦 State & Data
- **React Hooks** - State management
- **Context API** - Global state
- **Fetch API** - HTTP requests
- **Session Storage** - Token storage

</td>
</tr>
</table>

### 📦 Key Dependencies

```json
{
  "react": "^19.2.3",
  "react-dom": "^19.2.3",
  "react-router-dom": "^7.13.0",
  "framer-motion": "^12.29.0",
  "lucide-react": "^0.563.0",
  "react-icons": "^5.5.0",
  "@capacitor/core": "^8.0.1",
  "@capacitor/camera": "latest",
  "@capacitor/splash-screen": "latest",
  "@tailwindcss/postcss": "^4.1.18"
}
```

## 📦 Prasyarat

Sebelum memulai, pastikan Anda telah menginstall:

### 1. Node.js & npm

<details>
<summary><b>Windows</b></summary>

#### GUI Installation
1. Download dari [https://nodejs.org/](https://nodejs.org/)
2. Pilih **LTS version** (Long Term Support)
3. Jalankan installer dan ikuti petunjuk
4. Restart terminal/command prompt

#### Verifikasi
```powershell
node --version
npm --version
```

</details>

<details>
<summary><b>macOS</b></summary>

#### Homebrew
```bash
# Install Node.js & npm
brew install node

# Verifikasi
node --version
npm --version
```

#### Manual Download
1. Download dari [https://nodejs.org/](https://nodejs.org/)
2. Install .pkg file
3. Restart terminal

</details>

<details>
<summary><b>Linux</b></summary>

#### Ubuntu/Debian
```bash
# Update package list
sudo apt update

# Install Node.js & npm
sudo apt install nodejs npm

# Verifikasi
node --version
npm --version
```

#### Using NodeSource (Latest Version)
```bash
# Setup NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -

# Install Node.js
sudo apt install -y nodejs

# Verifikasi
node --version
npm --version
```

#### Fedora/CentOS
```bash
sudo dnf install nodejs npm
```

</details>

### 2. Git (Opsional)

Download dari [https://git-scm.com/](https://git-scm.com/)

### 3. Code Editor (Rekomendasii)

- [Visual Studio Code](https://code.visualstudio.com/)
- [WebStorm](https://www.jetbrains.com/webstorm/)

## 🔧 Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/abayDahln/ekstrakurikuler-sekolah-api.git
cd ekstrakurikuler-sekolah-api/frontend/mobile
```

### 2. Install Dependencies

```bash
npm install
```

**Output yang diharapkan:**
```
added 500+ packages in 30s
```

### 3. Verifikasi Installation

```bash
# Check installed packages
npm list --depth=0

# Test build
npm run build
```

## ⚙️ Konfigurasi

### 1. Setup API Configuration

Edit file `src/config/config.js`:

```javascript
const config = {
    // Base URL untuk API backend
    API_URL: "http://localhost:5000/api",
    
    // Base URL untuk static files (images, uploads)
    BASE_URL: "http://localhost:5000"
};

export default config;
```

**Untuk production:**
```javascript
const config = {
    API_URL: "https://your-api-domain.com/api",
    BASE_URL: "https://your-api-domain.com"
};
```

### 2. Environment Variables (Opsional)

Buat file `.env` di root project:

```env
VITE_API_URL=http://localhost:5000/api
VITE_BASE_URL=http://localhost:5000
```

Update `config.js`:
```javascript
const config = {
    API_URL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
    BASE_URL: import.meta.env.VITE_BASE_URL || "http://localhost:5000"
};
```

### 3. Capacitor Configuration

Edit `capacitor.config.json`:

```json
{
  "appId": "com.sekolah.ekstrakurikuler",
  "appName": "Ekskul Sekolah",
  "webDir": "dist",
  "bundledWebRuntime": false,
  "server": {
    "androidScheme": "https"
  }
}
```

## 🚀 Menjalankan Aplikasi

### 💻 Development Mode (Browser)

```bash
# Jalankan development server
npm run dev
```

**Aplikasi akan berjalan di:**
- 🌐 **Local**: `http://localhost:5173`
- 🌐 **Network**: `http://192.168.x.x:5173`

**Hot Module Replacement (HMR) aktif** - Perubahan akan langsung terlihat di browser!

### 🔍 Preview Production Build

```bash
# Build untuk production
npm run build

# Preview hasil build
npm run preview
```

### 🛠️ Development Tips

```bash
# Run dengan port custom
npm run dev -- --port 3000

# Open browser otomatis
npm run dev -- --open

# Clear cache dan rebuild
rm -rf node_modules dist
npm install
npm run dev
```

## 📱 Build untuk Mobile

Project ini menggunakan **Capacitor** untuk deployment ke Android/iOS.

### 📋 Prerequisites untuk Mobile Build

<table>
<tr>
<td width="50%">

#### 🤖 Android
- ✅ **Android Studio** (latest)
- ✅ **Java JDK 17+**
- ✅ **Android SDK** (API 33+)
- ✅ **Gradle** (included in Android Studio)

[Download Android Studio](https://developer.android.com/studio)

</td>
<td width="50%">

#### 🍎 iOS (macOS only)
- ✅ **Xcode** (latest)
- ✅ **CocoaPods**
- ✅ **iOS SDK**
- ✅ **macOS** (required)

[Download Xcode](https://developer.apple.com/xcode/)

</td>
</tr>
</table>

### 🔨 Build Process

#### 1. Build Web Assets

```bash
# Build React app untuk production
npm run build
```

Output akan ada di folder `dist/`

#### 2. Initialize Capacitor (First Time Only)

```bash
# Install Capacitor CLI (jika belum)
npm install -g @capacitor/cli

# Initialize Capacitor
npx cap init

# Ikuti prompt:
# App name: Ekskul Sekolah
# App ID: com.sekolah.ekstrakurikuler
# Web directory: dist
```

#### 3. Add Platform

```bash
# Tambahkan platform Android
npx cap add android

# Tambahkan platform iOS (macOS only)
npx cap add ios
```

#### 4. Sync Web Assets ke Native Project

```bash
# Sync semua perubahan
npx cap sync

# Atau sync per platform
npx cap sync android
npx cap sync ios
```

#### 5. Open Native IDE

<details>
<summary><b>🤖 Android - Android Studio</b></summary>

```bash
# Buka project di Android Studio
npx cap open android
```

**Di Android Studio:**
1. Tunggu Gradle sync selesai
2. Pilih device/emulator
3. Klik **Run** (▶️) atau tekan `Shift + F10`
4. APK akan diinstall ke device

**Build APK/AAB:**
1. **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
2. APK akan tersimpan di `android/app/build/outputs/apk/`

**Generate Signed APK:**
1. **Build** → **Generate Signed Bundle / APK**
2. Pilih **APK** atau **Android App Bundle**
3. Create atau pilih keystore
4. Isi key alias dan password
5. Pilih **release** build variant
6. Klik **Finish**

</details>

<details>
<summary><b>🍎 iOS - Xcode (macOS only)</b></summary>

```bash
# Buka project di Xcode
npx cap open ios
```

**Di Xcode:**
1. Pilih development team di Signing & Capabilities
2. Pilih device/simulator
3. Klik **Run** (▶️) atau tekan `Cmd + R`
4. App akan diinstall ke device

**Build untuk App Store:**
1. **Product** → **Archive**
2. Tunggu archive selesai
3. **Distribute App** → **App Store Connect**
4. Upload ke TestFlight atau App Store

</details>

### 🔄 Update Native App

Setiap kali ada perubahan di kode React:

```bash
# 1. Build ulang web assets
npm run build

# 2. Sync ke native project
npx cap sync

# 3. (Opsional) Copy hanya file tertentu
npx cap copy
```

### 📋 Common Capacitor Commands

```bash
# Lihat status platform
npx cap ls

# Update Capacitor ke versi terbaru
npm install @capacitor/cli@latest @capacitor/core@latest

# Update platform tertentu
npm install @capacitor/android@latest
npm install @capacitor/ios@latest

# Remove platform
npx cap remove android
npx cap remove ios
```

## 📁 Struktur Project

```
frontend/mobile/
│
├── .gitignore                   # Git ignore rules
├── capacitor.config.json        # Capacitor configuration
├── package.json                 # Dependencies & scripts
├── package-lock.json            # Lockfile
├── postcss.config.js            # PostCSS config
├── tailwind.config.js           # Tailwind configuration
├── vite.config.ts               # Vite build configuration
├── README.md                    # Documentation
│
├── dist/                        # Production build output (generated)
├── android/                     # Android native project (generated)
├── ios/                         # iOS native project (generated)
├── node_modules/                # Dependencies (generated)
│
├── public/                      # Static assets
│   └── manifest.json            # PWA manifest
│
└── src/                         # Source code
    │
    ├── main.jsx                 # Entry point
    ├── App.jsx                  # Main app component & routing
    ├── index.css                # Global styles & Tailwind
    ├── index.html               # HTML template
    │
    ├── assets/                  # Images, fonts, etc
    │   ├── imgs/
    │   │   └── ekskul_logo.png
    │   └── icon/
    │       └── ekskul_logo.ico
    │
    ├── components/              # Reusable UI components
    │   ├── Navbar.jsx           # Top navigation bar
    │   ├── Sidebar.jsx          # Side navigation menu
    │   ├── ErrorStatus.jsx      # Error/offline screen
    │   ├── CustomDialog.jsx     # Modal dialog
    │   └── SliderButton.jsx     # Attendance slider
    │
    ├── pages/                   # Route pages
    │   ├── Login.jsx            # Login page
    │   ├── Register.jsx         # Registration page
    │   ├── Home.jsx             # Dashboard/home
    │   ├── Ekstrakurikuler.jsx  # Ekskul list
    │   ├── EkstrakurikulerDetail.jsx  # Ekskul detail
    │   ├── Jadwal.jsx           # Schedule calendar
    │   ├── JadwalDetail.jsx     # Schedule detail
    │   ├── Certificate.jsx      # Certificate list
    │   └── MyProfile.jsx        # User profile
    │
    ├── config/                  # Configuration files
    │   └── config.js            # API endpoints config
    │
    └── utils/                   # Utility functions
        └── utils.jsx            # Session manager & helpers
```

### 📂 Penjelasan Folder Utama

- **`src/pages/`**: Halaman-halaman utama aplikasi, masing-masing merupakan route di React Router
- **`src/components/`**: Komponen UI yang dapat digunakan kembali di berbagai halaman
- **`src/config/`**: File konfigurasi seperti URL API backend
- **`src/utils/`**: Fungsi helper seperti session management, token handling
- **`src/assets/`**: File statis seperti gambar, logo, dan ikon
- **`dist/`**: Folder hasil build production (digenerate oleh Vite)
- **`android/` & `ios/`**: Native project folders (digenerate oleh Capacitor)

## 🔌 API Integration

### Base Configuration

File: `src/config/config.js`

```javascript
const config = {
    API_URL: "http://localhost:5000/api",
    BASE_URL: "http://localhost:5000"
};

export default config;
```

### Fetch dengan Timeout

File: `src/App.jsx`

```javascript
export const fetchWithTimeout = async (resource, options = {}) => {
    const { timeout = 10000 } = options; // Default 10 detik
    
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    
    try {
        const response = await fetch(resource, {
            ...options,
            signal: controller.signal
        });
        clearTimeout(id);
        return response;
    } catch (error) {
        clearTimeout(id);
        throw error;
    }
};
```

### Authentication Headers

```javascript
import sessionManager from "../utils/utils.jsx";

const token = sessionManager.getToken();

const response = await fetchWithTimeout(`${config.API_URL}/endpoint`, {
    headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "accept": "*/*"
    },
    timeout: 10000
});
```

### Session Management

File: `src/utils/utils.jsx`

```javascript
const sessionManager = {
    // Token management
    setToken: (token, expiredAt, rememberMe) => { ... },
    getToken: () => { ... },
    removeToken: () => { ... },
    
    // Token validation
    isTokenExpiringSoon: (bufferMinutes = 5) => { ... },
    
    // Theme management
    setTheme: (darkMode) => { ... },
    getTheme: () => { ... },
    
    // Remember me
    setRememberMe: (remember) => { ... },
    getRememberMe: () => { ... }
};

export default sessionManager;
```

### Error Handling

```javascript
try {
    const response = await fetchWithTimeout(url, options);
    
    if (response.ok) {
        const data = await response.json();
        // Handle success
    } else if (response.status === 500) {
        // Server down atau database error
        setIsServerDown(true);
    } else {
        // Handle other errors
        console.error("Request failed:", response.status);
    }
} catch (error) {
    if (error.name === 'TypeError' || error.message === 'Failed to fetch') {
        // Network error atau timeout
        setIsServerDown(true);
    }
    console.error("Error:", error);
}
```

## 🧩 Komponen Utama

### 1. App.jsx - Main Router

```javascript
// Routing, authentication guards, global states
<Routes>
    <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
    <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
    {/* ... more routes */}
</Routes>
```

### 2. Navbar.jsx - Top Navigation

```javascript
// Features:
- Dark mode toggle
- Menu button (conditional)
- Logo dengan navigation
- Responsive design
```

### 3. Sidebar.jsx - Navigation Menu

```javascript
// Features:
- Animated slide drawer
- Active route indicator
- Profile quick access
- Auto-close on navigation
- Real-time profile update
```

### 4. ErrorStatus.jsx - Error Handling UI

```javascript
// Features:
- Offline detection
- Server down notification
- Retry mechanism
- Dark mode support
```

### 5. CustomDialog.jsx - Modal Dialog

```javascript
// Features:
- Animated entrance/exit
- Backdrop blur
- Customizable content
- Auto focus management
```

### 6. SliderButton.jsx - Attendance Slider

```javascript
// Features:
- Swipe to confirm
- Visual feedback
- Reset on cancel
- Smooth animation
```

## 🛡️ Error Handling

### Network Error Detection

```javascript
// Di App.jsx - Global error handling
const [isOffline, setIsOffline] = useState(!navigator.onLine);
const [isServerDown, setIsServerDown] = useState(false);

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
```

### Server Status Check

```javascript
const checkServerStatus = async () => {
    try {
        const response = await fetchWithTimeout(`${config.API_URL}/profile`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${sessionManager.getToken()}`,
                'Accept': 'application/json'
            },
            timeout: 5000
        });
        
        if (response.status === 500) {
            setIsServerDown(true);
            return false;
        }
        
        setIsServerDown(false);
        return true;
    } catch (error) {
        setIsServerDown(true);
        return false;
    }
};
```

### Connection Context

```javascript
export const ConnectionContext = createContext();
export const useConnection = () => useContext(ConnectionContext);

// Di component lain:
const { setIsServerDown } = useConnection();
```

## 🔧 Troubleshooting

<details>
<summary><b>❌ Port 5173 sudah digunakan</b></summary>

```bash
# Ganti port
npm run dev -- --port 3000
```

Atau edit `package.json`:
```json
{
  "scripts": {
    "dev": "vite --port 3000"
  }
}
```

</details>

<details>
<summary><b>❌ Module not found error</b></summary>

```bash
# Clear cache dan reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
```

</details>

<details>
<summary><b>❌ CORS Error saat development</b></summary>

Pastikan backend API Anda sudah setup CORS:

```csharp
// Di backend Program.cs
builder.Services.AddCors(options => {
    options.AddPolicy("AllowAll", builder => {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

app.UseCors("AllowAll");
```

</details>

<details>
<summary><b>❌ Build failed: Out of memory</b></summary>

```bash
# Increase Node memory
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build

# Windows PowerShell
$env:NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

</details>

<details>
<summary><b>❌ Capacitor sync error</b></summary>

```bash
# Clean dan rebuild
rm -rf android ios
npx cap add android
npx cap add ios
npx cap sync
```

</details>

<details>
<summary><b>❌ Android build: SDK not found</b></summary>

1. Buka Android Studio
2. **Tools** → **SDK Manager**
3. Install **Android SDK Platform 33+**
4. Set `ANDROID_HOME` environment variable:
   ```bash
   # Windows
   ANDROID_HOME=C:\Users\YourName\AppData\Local\Android\Sdk
   
   # macOS/Linux
   export ANDROID_HOME=$HOME/Library/Android/sdk
   ```

</details>

<details>
<summary><b>❌ iOS build: Developer account required</b></summary>

1. Buka Xcode
2. **Preferences** → **Accounts**
3. Tambahkan Apple ID Anda
4. Di project → **Signing & Capabilities**
5. Pilih team dan provisioning profile

</details>

<details>
<summary><b>🔍 Enable Debug Mode</b></summary>

```javascript
// Di src/config/config.js
const config = {
    API_URL: "http://localhost:5000/api",
    BASE_URL: "http://localhost:5000",
    DEBUG: true // Enable debug logs
};

// Di component
if (config.DEBUG) {
    console.log("Debug:", data);
}
```

</details>

## 🎨 Customization

### Change Theme Colors

Edit `tailwind.config.js`:

```javascript
export default {
    theme: {
        extend: {
            colors: {
                primary: "#YOUR_COLOR",
                secondary: "#YOUR_COLOR",
            }
        }
    }
}
```

### Change Font

1. Update `src/index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Your+Font:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

2. Update `tailwind.config.js`:
```javascript
fontFamily: {
    sans: ['"Your Font"', 'sans-serif'],
}
```

### Change App Name & Logo

1. **Logo**: Replace `src/assets/imgs/ekskul_logo.png`
2. **App Name**: Edit `src/index.html` title
3. **Capacitor**: Edit `capacitor.config.json` appName

## 📊 Performance Tips

- ✅ Lazy load components dengan `React.lazy()`
- ✅ Minimize bundle size dengan `vite-plugin-compression`
- ✅ Optimize images dengan WebP format
- ✅ Use React.memo untuk prevent re-renders
- ✅ Debounce search inputs
- ✅ Implement virtual scrolling untuk long lists


## 📄 License

Project ini menggunakan [MIT License](LICENSE)

## 💬 Kontak

**Developer**: Tim Pengembang Ekstrakurikuler Sekolah

- 📧 Email: ...
- 🌐 Website: [...](...)
- 💼 GitHub: [...](...)

---

<div align="center">

### ⭐ Jangan lupa beri star jika project ini bermanfaat!

**Made with ❤️ using React, Vite, and Tailwind CSS**

</div>
