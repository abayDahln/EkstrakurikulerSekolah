# 🎓 Ekstrakurikuler Sekolah API

<div align="center">

[![.NET](https://img.shields.io/badge/.NET-8.0-512BD4?style=for-the-badge&logo=dotnet)](https://dotnet.microsoft.com/)
[![C#](https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=c-sharp&logoColor=white)](https://docs.microsoft.com/en-us/dotnet/csharp/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)](https://jwt.io/)
[![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white)](https://swagger.io/)

### 🚀 Backend API untuk Manajemen Ekstrakurikuler Sekolah

*Sistem digital terintegrasi untuk siswa dan pembina ekstrakurikuler dengan point system otomatis dan certificate generation*

[📖 Documentation](#-api-documentation) • [🔧 Installation](#-instalasi) • [🎯 Features](#-fitur-utama) • [💬 Contact](#-kontak)

---

![Swagger Documentation](https://res.cloudinary.com/dueixuonp/image/upload/v1760971347/ss_debug_1_alsyt3.png)

</div>

## 📋 Daftar Isi

- [Tentang Project](#-tentang-project)
- [Fitur Utama](#-fitur-utama)
- [Teknologi yang Digunakan](#%EF%B8%8F-teknologi-yang-digunakan)
- [Prasyarat](#-prasyarat)
- [Instalasi](#-instalasi)
- [Konfigurasi](#%EF%B8%8F-konfigurasi)
- [Cara Menjalankan](#-cara-menjalankan)
- [Struktur Project](#-struktur-project)
- [API Documentation](#-api-documentation)
- [Screenshot](#-screenshot)
- [Kontak](#-kontak)

## 🚀 Tentang Project

<table>
<tr>
<td>

**Ekstrakurikuler Sekolah API** adalah backend REST API yang dibangun untuk mengelola kegiatan ekstrakurikuler di lingkungan sekolah. API ini menyediakan layanan untuk siswa dan pembina dalam melakukan berbagai aktivitas seperti pendaftaran ekstrakurikuler, absensi, pelaporan kegiatan, hingga penerbitan sertifikat secara otomatis.

### 🎯 Latar Belakang

Project ini dikembangkan untuk memudahkan manajemen ekstrakurikuler di sekolah dengan sistem digital yang terintegrasi. Siswa dapat dengan mudah memilih dan bergabung dengan ekstrakurikuler, sementara pembina dapat mengelola anggota dan kegiatan ekstrakurikuler mereka secara efisien.

</td>
</tr>
</table>

### 👥 Target Pengguna

<div align="center">

| 👨‍🎓 Siswa | 👨‍🏫 Pembina |
|:---:|:---:|
| Join ekstrakurikuler | Kelola anggota |
| Absensi kegiatan | Buat jadwal |
| Laporan aktivitas | Upload dokumentasi |
| Dapatkan sertifikat | Terbitkan sertifikat |

</div>

## ✨ Fitur Utama

<table>
<tr>
<td width="50%">

### 🔐 Authentication & Authorization
- 🔑 **Login Siswa** - Autentikasi dengan JWT token
- 🔑 **Login Pembina** - Akses khusus pembina
- 📝 **Register Siswa** - Pendaftaran akun baru
- 🛡️ **Role-based Access** - Keamanan berlapis

</td>
<td width="50%">

### 🏆 Sistem Point & Sertifikat
- ⭐ **Point System** - Tracking aktivitas
- 🎖️ **Auto Certificate** - Sertifikat otomatis
- 📜 **Certificate Management** - Kelola sertifikat
- 📊 **Activity Tracking** - Monitor progress

</td>
</tr>
</table>

<details>
<summary><b>👨‍🎓 Fitur Siswa (Klik untuk expand)</b></summary>

### 📚 Manajemen Ekstrakurikuler
- ✅ Lihat daftar ekstrakurikuler tersedia
- 🔍 Cari ekstrakurikuler berdasarkan keyword
- 📖 Lihat detail lengkap ekstrakurikuler
- ➕ Join ekstrakurikuler (dapat first point!)

### 📅 Manajemen Jadwal
- 📆 Lihat jadwal kegiatan
- ✅ Absensi kehadiran/izin/sakit
- 📝 Submit laporan kegiatan
- 🔔 Notifikasi jadwal (coming soon)

### 👤 Profil & Sertifikat
- 👁️ Lihat profil lengkap
- ✏️ Edit data profil
- 📸 Upload foto profil
- 🎓 Lihat koleksi sertifikat

</details>

<details>
<summary><b>👨‍🏫 Fitur Pembina (Klik untuk expand)</b></summary>

### 🎯 Manajemen Ekstrakurikuler
- 📊 Dashboard statistik real-time
- 👥 Lihat daftar member
- 📋 Kelola absensi
- 📈 Monitor progress anggota

### 📅 Manajemen Kegiatan
- ➕ Buat jadwal baru
- 📸 Upload dokumentasi
- 🏆 Upload sertifikat lomba/event
- 📝 Kelola laporan kegiatan

### 👤 Profil
- 👁️ Lihat profil
- ✏️ Edit data profil
- 📸 Upload foto profil

</details>

---

### 🎯 Fitur Unggulan: Smart Point System

<div align="center">

```
┌─────────────────────────────────────────────────────────────┐
│                    POINT SYSTEM FLOW                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  📝 Join Ekstrakurikuler  →  🎁 First Point Granted        │
│                                                             │
│  ✅ Absensi Hadir         →  ⭐ Attendance Point Added     │
│                                                             │
│  📄 Submit Report         →  ⭐ Report Point Added         │
│                                                             │
│  🎯 Reach 100 Points      →  🎓 Auto Generate Certificate  │
│                                                             │
│  🏆 Win Competition       →  📜 Bonus Certificate          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

</div>

## 🛠️ Teknologi yang Digunakan

<div align="center">

### Core Technologies

[![C Sharp](https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=c-sharp&logoColor=white)](https://docs.microsoft.com/en-us/dotnet/csharp/)
[![.NET Core](https://img.shields.io/badge/.NET%20Core-8.0-512BD4?style=for-the-badge&logo=dotnet)](https://dotnet.microsoft.com/)
[![ASP.NET Core](https://img.shields.io/badge/ASP.NET%20Core-512BD4?style=for-the-badge&logo=dotnet)](https://docs.microsoft.com/en-us/aspnet/core/)
[![Entity Framework](https://img.shields.io/badge/Entity%20Framework-512BD4?style=for-the-badge&logo=dotnet)](https://docs.microsoft.com/en-us/ef/core/)

### Database & Authentication

[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)](https://jwt.io/)

### Documentation & Tools

[![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white)](https://swagger.io/)
[![NuGet](https://img.shields.io/badge/NuGet-004880?style=for-the-badge&logo=nuget&logoColor=white)](https://www.nuget.org/)
[![Visual Studio](https://img.shields.io/badge/Visual%20Studio-5C2D91?style=for-the-badge&logo=visual-studio&logoColor=white)](https://visualstudio.microsoft.com/)

</div>

---

<table>
<tr>
<td width="33%">

### 🔧 Backend Framework
- **C#** - Language
- **.NET Core 8.0** - Runtime
- **ASP.NET Core Web API** - Framework
- **Entity Framework Core** - ORM

</td>
<td width="33%">

### 💾 Database
- **PostgreSQL** - RDBMS
- **Npgsql** - EF Provider

### 🔐 Security
- **JWT** - Authentication
- **ASP.NET Core Auth** - Middleware

</td>
<td width="33%">

### 🛠️ Development Tools
- **.NET SDK 8.0.121** - SDK
- **.NET CLI** - Command Line
- **Visual Studio 2022** - IDE
- **NuGet** - Package Manager

</td>
</tr>
</table>

### 📦 Main NuGet Packages

```xml
🔐 Microsoft.AspNetCore.Authentication.JwtBearer
🗃️ Microsoft.EntityFrameworkCore.Design
🔨 Microsoft.EntityFrameworkCore.Tools
🐘 Npgsql.EntityFrameworkCore.PostgreSQL
🖼️ SixLabors.ImageSharp
✍️ SixLabors.Fonts
📖 Swashbuckle.AspNetCore
```

## 📦 Prasyarat

Sebelum memulai, pastikan Anda telah menginstall:

### 1. .NET SDK 8.0.121

<details>
<summary><b>Windows</b></summary>

#### GUI Installation
1. Buka [https://dotnet.microsoft.com/en-us/download/dotnet/8.0](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
2. Download dan install **.NET SDK 8.0.121 for Windows**

![.NET SDK Windows](https://res.cloudinary.com/dueixuonp/image/upload/v1760959307/for_windows_jyngr8.png)

#### Command Prompt / PowerShell
```powershell
# Install .NET SDK
winget install Microsoft.DotNet.SDK.8

# Cek versi
dotnet --version
```

#### Install Entity Framework Core Tools
```powershell
# Install dotnet-ef globally
dotnet tool install --global dotnet-ef
```

**Pastikan sudah ada di PATH environment variable:**

Path default: `%USERPROFILE%\.dotnet\tools`

Biasanya sudah otomatis ditambahkan. Jika belum, tambahkan manual:
1. Buka **System Properties** → **Environment Variables**
2. Edit **Path** di User Variables
3. Tambahkan: `C:\Users\YourUsername\.dotnet\tools`

**Cek Versi EF Core Tools:**
```powershell
dotnet ef --version
```

</details>

<details>
<summary><b>macOS</b></summary>

#### GUI Installation
1. Buka [https://dotnet.microsoft.com/en-us/download/dotnet/8.0](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
2. Download dan install **.NET SDK 8.0.121 for macOS**

![.NET SDK macOS](https://res.cloudinary.com/dueixuonp/image/upload/v1760959307/for_macos_t7hpfu.png)

#### Terminal (Manual)

**Apple Silicon (ARM64):**
```bash
curl -o dotnet-sdk.pkg https://download.visualstudio.microsoft.com/download/pr/98c2b707-2e16-4c9b-bb6b-8e2f7aefbb1a/7b093ed14d7e1a74bbfd598e3ce02c22/dotnet-sdk-8.0.121-osx-arm64.pkg
sudo installer -pkg dotnet-sdk.pkg -target /
```

**Intel (x64):**
```bash
curl -o dotnet-sdk.pkg https://download.visualstudio.microsoft.com/download/pr/70723da0-44ff-49f0-8f92-d74e21c3a733/d174c2830f30a7a63f5159a6f69cc98f/dotnet-sdk-8.0.121-osx-x64.pkg
sudo installer -pkg dotnet-sdk.pkg -target /
```

**Tambahkan ke PATH (Opsional):**
```bash
# Apple Silicon (ARM64)
export PATH=$PATH:/opt/homebrew/share/dotnet
export DOTNET_ROOT=/opt/homebrew/share/dotnet

# Intel (x64)
export PATH=$PATH:/usr/local/share/dotnet
export DOTNET_ROOT=/usr/local/share/dotnet
```

**Cek Versi:**
```bash
dotnet --version
```

**Install Entity Framework Core Tools (dotnet-ef)**
Untuk dapat menggunakan perintah `dotnet ef` (seperti `migrations` dan `database update`), instal EF Core Tools secara global:

```bash
dotnet tool install --global dotnet-ef
```

**Tambahkan ke PATH jika belum otomatis:**
```bash
export PATH=$PATH:$HOME/.dotnet/tools
```

**Permanent (Opsional):**
```bash
echo 'export PATH="$PATH:$HOME/.dotnet/tools"' >> ~/.zshrc
source ~/.zshrc
```

**Cek Versi EF Core Tools:**
```bash
dotnet ef --version
```


#### Homebrew

**Install .NET SDK:**
```bash
# Install Homebrew (jika belum ada)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install .NET SDK
brew install --cask dotnet-sdk@8
```

**Tambahkan ke PATH (Opsional):**
```bash
# Apple Silicon (ARM64)
export PATH=$PATH:/opt/homebrew/share/dotnet
export DOTNET_ROOT=/opt/homebrew/share/dotnet

# Intel (x64)
export PATH=$PATH:/usr/local/share/dotnet
export DOTNET_ROOT=/usr/local/share/dotnet
```

**Permanent PATH (Opsional):**
```bash
# Untuk Apple Silicon (ARM64) dengan zsh
echo 'export PATH="$PATH:/opt/homebrew/share/dotnet"' >> ~/.zshrc
echo 'export DOTNET_ROOT=/opt/homebrew/share/dotnet' >> ~/.zshrc

# Reload konfigurasi
source ~/.zshrc
```

**Cek Versi:**
```bash
dotnet --version
```

**Install Entity Framework Core Tools (dotnet-ef)**
Untuk dapat menggunakan perintah `dotnet ef` (seperti `migrations` dan `database update`), instal EF Core Tools secara global:

```bash
dotnet tool install --global dotnet-ef
```

**Tambahkan ke PATH jika belum otomatis:**
```bash
export PATH=$PATH:$HOME/.dotnet/tools
```

**Permanent (Opsional):**
```bash
echo 'export PATH="$PATH:$HOME/.dotnet/tools"' >> ~/.zshrc
source ~/.zshrc
```
atau
```bash
echo 'export PATH="$PATH:$HOME/.dotnet/tools"' >> ~/.bashrc
source ~/.bashrc
```

**Cek Versi EF Core Tools:**
```bash
dotnet ef --version
```
</details>

<details>
<summary><b>Linux</b></summary>

#### GUI Installation
1. Buka [https://dotnet.microsoft.com/en-us/download/dotnet/8.0](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
2. Download dan install **.NET SDK 8.0.121** untuk distribusi Linux Anda

![.NET SDK Linux](https://res.cloudinary.com/dueixuonp/image/upload/v1760959324/for_linux_c5wepw.png)

#### Ubuntu / Debian (APT)
```bash
# Install dependencies
sudo apt update
sudo apt install -y wget apt-transport-https software-properties-common

# Tambahkan Microsoft package repository
wget https://packages.microsoft.com/config/ubuntu/24.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
rm packages-microsoft-prod.deb

# Install .NET SDK
sudo apt update
sudo apt install -y dotnet-sdk-8.0

# Cek versi
dotnet --version
```

#### Fedora / CentOS / RHEL (DNF/YUM)
```bash
# Install dependencies
sudo dnf install -y wget

# Tambahkan Microsoft package repository
sudo rpm -Uvh https://packages.microsoft.com/config/fedora/40/packages-microsoft-prod.rpm

# Install .NET SDK
sudo dnf update -y
sudo dnf install -y dotnet-sdk-8.0

# Cek versi
dotnet --version
```

#### Arch Linux (Pacman)
```bash
# Install .NET SDK
sudo pacman -Syu dotnet-sdk

# Cek versi
dotnet --version
```

#### OpenSUSE
```bash
# Tambahkan Microsoft repo dan install
sudo zypper ar https://packages.microsoft.com/config/opensuse/15/prod.repo
sudo zypper ref
sudo zypper install -y dotnet-sdk-8.0

# Cek versi
dotnet --version
```

**Install Entity Framework Core Tools (dotnet-ef)**
Untuk dapat menggunakan perintah `dotnet ef` (seperti `migrations` dan `database update`), instal EF Core Tools secara global:

```bash
dotnet tool install --global dotnet-ef
```

**Tambahkan ke PATH jika belum otomatis:**
```bash
export PATH=$PATH:$HOME/.dotnet/tools
```

**Permanent (Opsional):**
```bash
echo 'export PATH="$PATH:$HOME/.dotnet/tools"' >> ~/.zshrc
source ~/.zshrc
```
atau
```bash
echo 'export PATH="$PATH:$HOME/.dotnet/tools"' >> ~/.bashrc
source ~/.bashrc
```

**Cek Versi EF Core Tools:**
```bash
dotnet ef --version
```
</details>

### 2. PostgreSQL Database

Download dan install PostgreSQL dari [https://www.postgresql.org/download/](https://www.postgresql.org/download/)

### 3. Visual Studio Community 2022 (Opsional)

<details>
<summary><b>Windows Only</b></summary>

1. Buka [https://visualstudio.microsoft.com/vs/community/](https://visualstudio.microsoft.com/vs/community/)
2. Download installer

![Visual Studio](https://res.cloudinary.com/dueixuonp/image/upload/v1760708434/visual_studio_ypm1fh.png)

3. Jalankan installer dan pilih workload:
   - ✅ **ASP.NET and web development**
   - ✅ **.NET desktop development**
   - ⭕ **Data storage and processing** (opsional)
4. Klik **Install** dan tunggu hingga selesai
5. Buka Visual Studio dan jalankan project
</details>

## 🔧 Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/abayDahln/ekstrakurikuler-sekolah-api.git
cd ekstrakurikuler-sekolah-api/backend
```

### 2. Restore Dependencies

```bash
# Install semua package yang dibutuhkan
dotnet restore
```

### 3. Build Project

```bash
# Compile project untuk memastikan semua package terinstall
dotnet build
```

## ⚙️ Konfigurasi

### 1. Setup Database Connection

Edit file `appsettings.json` dan sesuaikan connection string PostgreSQL:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=ekstrakurikuler_db;Username=postgres;Password=your_password"
  },
  "Jwt": {
    "Key": "your-secret-key-here-min-32-characters",
    "Issuer": "EkstrakurikulerAPI",
    "Audience": "EkstrakurikulerClient",
    "ExpireDays": 7
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```

![appsettings.json](https://res.cloudinary.com/dueixuonp/image/upload/v1760712211/appsetting_kfypdt.png)

**Parameter Connection String:**
- `Host`: Alamat server PostgreSQL (default: localhost)
- `Port`: Port PostgreSQL (default: 5432)
- `Database`: Nama database
- `Username`: Username PostgreSQL
- `Password`: Password PostgreSQL

### 2. Database Migration

```bash
# Buat migration untuk database schema
dotnet ef migrations add InitialDatabase

# Apply migration ke database
dotnet ef database update
```

## 🚀 Cara Menjalankan

### 💻 Development Mode

<table>
<tr>
<td width="50%">

#### 🔙 Backend
```bash
# Jalankan aplikasi
dotnet run
```

**Server akan berjalan di:**
- 🌐 **API Endpoint**: `http://localhost:5000/api/`
- 📁 **Static Files**: `http://localhost:5000/public/`
- 📖 **Swagger Docs**: `http://localhost:5000/swagger/index.html`

</td>
<td width="50%">

#### 🎯 Quick Access

| Service | URL |
|---------|-----|
| 🔌 API | `localhost:5000/api` |
| 🖼️ Images | `localhost:5000/public` |
| 📚 Docs | `localhost:5000/swagger` |

**Status Check:**
```bash
# Test API
curl http://localhost:5000/api

# Open Swagger
open http://localhost:5000/swagger
```

</td>
</tr>
</table>

### 🏭 Production Build

```bash
# Build untuk production (Coming Soon)
dotnet publish -c Release -o ./publish
```

> 💡 **Tip**: Gunakan `dotnet watch run` untuk auto-reload saat development!

## 📁 Struktur Project

```
backend/
│
├── .gitignore
├── appsettings.json              # Konfigurasi aplikasi dan connection string
├── EkstrakurikulerSekolah.http   # HTTP request examples
├── README.md
├── Program.cs                    # Entry point aplikasi
│
├── Connected Services/           # External services configuration
│
├── Dependencies/
│   ├── Analyzers/               # Code analyzers
│   ├── Frameworks/              # .NET frameworks
│   └── Packages/                # NuGet packages
│
├── Properties/
│   └── launchSettings.json      # Debug & runtime configuration
│
├── wwwroot/
│   ├── font/                    # Font files untuk certificate
│   ├── public/                  # Public files (images, uploads)
│   └── template/                # Certificate templates
│
├── Controllers/                 # API Controllers
│   ├── AuthController.cs        # Authentication endpoints
│   ├── CertificateController.cs # Certificate management
│   ├── EkstrakurikulerController.cs # Extracurricular CRUD
│   ├── PembinaController.cs     # Pembina-specific endpoints
│   ├── ProfileController.cs     # User profile management
│   └── ScheduleController.cs    # Schedule & attendance
│
├── Migrations/                  # EF Core migrations
│
└── Models/                      # Data models & services
    ├── ActivityDocumentation.cs # Documentation model
    ├── ActivityReport.cs        # Activity report model
    ├── ApiResponse.cs           # Standard API response
    ├── Attendance.cs            # Attendance model
    ├── Certificate.cs           # Certificate model
    ├── CertificateService.cs    # Certificate generation service
    ├── ClaimsPrincipalExtentions.cs # JWT claims helper
    ├── EkskulDbContext.cs       # Database context
    ├── Extracurricular.cs       # Extracurricular model
    ├── Member.cs                # Member relationship model
    ├── Point.cs                 # Point system model
    ├── PointService.cs          # Point calculation service
    ├── Schedule.cs              # Schedule model
    └── User.cs                  # User model
```

### Penjelasan Folder Utama

- **Controllers/**: Berisi endpoint utama Web API untuk handle HTTP requests
- **Models/**: Berisi entity classes, database context, dan service/helper classes
- **Migrations/**: File migrasi Entity Framework Core untuk update database schema
- **wwwroot/**: Static files seperti font, images, dan template sertifikat
- **Properties/**: Konfigurasi runtime seperti port dan environment
- **Dependencies/**: Package dan library yang digunakan project

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication

#### Login Siswa
```http
POST /api/auth/login/siswa
Content-Type: application/json

{
  "username": "nisn_siswa",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login berhasil",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": 1,
      "name": "John Doe",
      "role": "Siswa"
    }
  }
}
```

#### Login Pembina
```http
POST /api/auth/login/pembina
Content-Type: application/json

{
  "username": "nip_pembina",
  "password": "password123"
}
```

#### Register Siswa
```http
POST /api/auth/register/siswa
Content-Type: application/json

{
  "nisn": "1234567890",
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "class": "XII IPA 1"
}
```

---

### Ekstrakurikuler

#### Get All Ekstrakurikuler
```http
GET /api/extracurricular
Authorization: Bearer {token}
```

#### Search Ekstrakurikuler
```http
GET /api/extracurricular?search={keyword}
Authorization: Bearer {token}
```

#### Get Detail Ekstrakurikuler
```http
GET /api/extracurricular/{id}
Authorization: Bearer {token}
```

#### Join Ekstrakurikuler
```http
POST /api/extracurricular/{id}/join
Authorization: Bearer {token}
```

---

### Schedule

#### Get All Schedule
```http
GET /api/schedule
Authorization: Bearer {token}
```

#### Search Schedule
```http
GET /api/schedule?search={keyword}
Authorization: Bearer {token}
```

#### Get Detail Schedule
```http
GET /api/schedule/{id}
Authorization: Bearer {token}
```

#### Submit Attendance
```http
POST /api/schedule/attendance
Authorization: Bearer {token}
Content-Type: application/json

{
  "scheduleId": 1,
  "status": "hadir"  // hadir, izin, sakit
}
```

#### Submit Activity Report
```http
POST /api/schedule/report
Authorization: Bearer {token}
Content-Type: application/json

{
  "scheduleId": 1,
  "description": "Latihan rutin...",
  "achievements": "Berhasil menyelesaikan..."
}
```

---

### Certificate

#### Get My Certificates
```http
GET /api/certificate
Authorization: Bearer {token}
```

#### Search Certificates
```http
GET /api/certificate?search={keyword}
Authorization: Bearer {token}
```

---

### Profile

#### Get My Profile
```http
GET /api/profile
Authorization: Bearer {token}
```

#### Update Profile
```http
PUT /api/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "John Doe Updated",
  "email": "john.new@example.com",
  "phone": "081234567890"
}
```

#### Update Profile Photo
```http
PUT /api/profile/photo
Authorization: Bearer {token}
Content-Type: multipart/form-data

photo: [file]
```

---

### Pembina Endpoints

#### Get My Ekstrakurikuler
```http
GET /api/pembina/my-extracurricular
Authorization: Bearer {token}
```

#### Get Members
```http
GET /api/pembina/member
Authorization: Bearer {token}
```

#### Get Attendance by Schedule
```http
GET /api/pembina/attendance/{scheduleId}
Authorization: Bearer {token}
```

#### Get Dashboard Statistics
```http
GET /api/pembina/dashboard/{ekstrakurikulerId}
Authorization: Bearer {token}
```

#### Create Schedule
```http
POST /api/pembina/schedule
Authorization: Bearer {token}
Content-Type: application/json

{
  "ekstrakurikulerId": 1,
  "title": "Latihan Rutin",
  "description": "Latihan mingguan...",
  "date": "2024-02-01",
  "startTime": "14:00",
  "endTime": "16:00",
  "location": "Lapangan Basket"
}
```

#### Upload Certificate
```http
POST /api/pembina/certificate
Authorization: Bearer {token}
Content-Type: multipart/form-data

userId: 1
type: "Juara 1 Lomba"
description: "Juara 1 Basket Antar Sekolah"
file: [file]
```

#### Upload Documentation
```http
POST /api/pembina/documentation
Authorization: Bearer {token}
Content-Type: multipart/form-data

scheduleId: 1
description: "Dokumentasi latihan..."
images: [file1, file2, ...]
```

---

### Response Format

Semua endpoint menggunakan format response standar:

**Success Response:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error message",
  "errors": [ ... ]
}
```

### Swagger Documentation

Untuk dokumentasi API yang lebih lengkap dan interaktif, buka:
```
http://localhost:5000/swagger/index.html
```

## 📸 Screenshot

<div align="center">

### 📖 Swagger API Documentation

![Swagger UI](https://res.cloudinary.com/dueixuonp/image/upload/v1760971347/ss_debug_1_alsyt3.png)

*Interactive API documentation with Swagger UI - Test endpoints directly from browser*

---

### 🔌 API Endpoints Overview

![API Endpoints](https://res.cloudinary.com/dueixuonp/image/upload/v1760971348/ss_debug_2_ab72fa.png)

*Complete list of available endpoints with request/response schemas*

---

### ✨ Features Highlight

<table>
<tr>
<td align="center" width="33%">
<img src="https://img.icons8.com/fluency/96/000000/api-settings.png" width="64"/>
<br><b>RESTful API</b>
<br>Clean & scalable architecture
</td>
<td align="center" width="33%">
<img src="https://img.icons8.com/fluency/96/000000/lock.png" width="64"/>
<br><b>JWT Auth</b>
<br>Secure authentication
</td>
<td align="center" width="33%">
<img src="https://img.icons8.com/fluency/96/000000/database.png" width="64"/>
<br><b>PostgreSQL</b>
<br>Robust database
</td>
</tr>
<tr>
<td align="center" width="33%">
<img src="https://img.icons8.com/fluency/96/000000/certificate.png" width="64"/>
<br><b>Auto Certificate</b>
<br>Smart point system
</td>
<td align="center" width="33%">
<img src="https://img.icons8.com/fluency/96/000000/api.png" width="64"/>
<br><b>Swagger Docs</b>
<br>Interactive documentation
</td>
<td align="center" width="33%">
<img src="https://img.icons8.com/fluency/96/000000/web.png" width="64"/>
<br><b>Multi-Platform</b>
<br>Web & Android support
</td>
</tr>
</table>

</div>

## 🔒 Security Features

- **JWT Authentication**: Token-based authentication untuk secure API access
- **Role-based Authorization**: Siswa dan Pembina memiliki akses yang berbeda
- **Password Hashing**: Password di-hash sebelum disimpan ke database
- **CORS Configuration**: Cross-Origin Resource Sharing untuk keamanan

## 🎯 Business Logic

### Point System Flow
1. Siswa join ekstrakurikuler → Dapat **first point**
2. Siswa absen hadir pada schedule → Dapat **attendance point**
3. Siswa submit report kegiatan → Dapat **report point**
4. Total point mencapai **100** → Sistem otomatis generate **Certificate of Participation**

### Access Control
- **Siswa**: Hanya bisa akses data ekstrakurikuler yang diikuti
- **Pembina**: Hanya bisa akses ekstrakurikuler yang dibina

## 🐛 Known Issues & Roadmap

<table>
<tr>
<td width="50%">

### ⚠️ Current Limitations
- ⏳ Production build belum tersedia
- 📧 Email notification belum diimplementasikan
- 📱 Mobile push notification coming soon

</td>
<td width="50%">

### 🚀 Future Features
- [ ] 📧 Email notification untuk certificate
- [ ] 📄 Export certificate to PDF
- [ ] 🔔 Real-time notification (SignalR)
- [ ] 📊 Dashboard analytics dengan chart
- [ ] 🏫 Integration dengan sistem akademik
- [ ] 📱 Mobile app support enhancement

</td>
</tr>
</table>

---

## 📝 Changelog

<details>
<summary><b>Version 1.0.0 (2024) - Current Release 🎉</b></summary>

### ✅ Features Implemented
- ✅ Authentication & Authorization (JWT)
- ✅ CRUD Ekstrakurikuler
- ✅ Schedule & Attendance management
- ✅ Point system implementation
- ✅ Auto certificate generation
- ✅ Profile management with photo upload
- ✅ Swagger documentation
- ✅ Multi-platform support (Web & Android)

### 🔧 Technical Improvements
- ✅ Entity Framework Core migrations
- ✅ PostgreSQL database integration
- ✅ Role-based access control
- ✅ Image processing for certificates
- ✅ RESTful API design

</details>

---

## 📄 Lisensi

<div align="center">

```
MIT License

Copyright (c) 2024 Abby Dahlan Havizh

Bebas untuk digunakan, dimodifikasi, dan didistribusikan
```

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

</div>

---

## 👤 Kontak

<div align="center">

### 💬 Let's Connect!

**Abby Dahlan Havizh**

[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:abby11dahlan@gmail.com)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/abayy_____________/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/abayDahln)

---

### 💖 Support This Project

<table>
<tr>
<td align="center">
⭐ Star this repo
</td>
<td align="center">
🔄 Share with others
</td>
<td align="center">
🐛 Report issues
</td>
<td align="center">
💡 Suggest features
</td>
</tr>
</table>

---

<img src="https://img.icons8.com/fluency/48/000000/code.png"/> **Made with ❤️ by Abby Dahlan Havizh** <img src="https://img.icons8.com/fluency/48/000000/code.png"/>

*Building digital solutions for better education management*

⭐ **If this project helps you, please give it a star!** ⭐

</div>