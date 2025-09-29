# 🏫 Sistem Informasi Ekstrakurikuler Sekolah – Backend API

Backend ini dibangun dengan **ASP.NET Core Web API** dan **PostgreSQL** sebagai basis data untuk mengelola kegiatan ekstrakurikuler di sekolah.

## 📋 Fitur Utama

- **Autentikasi JWT**  
  Pembina / Admin login untuk mendapatkan token JWT. Endpoint dilindungi `[Authorize]`.

- **Manajemen Pembina**  
  CRUD pembina, pembina hanya terkait dengan ekskul yang dilatihnya.

- **Manajemen Ekskul**  
  CRUD data ekskul, termasuk nama dan pembina.

- **Manajemen Anggota Siswa**  
  CRUD siswa dan pendaftaran ke ekskul tertentu.

- **Jadwal Kegiatan**  
  Pembina membuat jadwal kegiatan.

- **Absensi Kegiatan**  
  Pembina mencatat absensi anggota setiap kegiatan.

- **Dokumentasi Kegiatan**  
  Pembina upload dokumentasi kegiatan.

- **Laporan Anggota**  
  Anggota upload laporan kegiatan.

- **Poin Keaktifan**  
  Sistem otomatis memberi poin keaktifan siswa yang dapat dikonversi menjadi sertifikat.

## 🗃️ Struktur Database

Menggunakan PostgreSQL. Database default: `ekskul_db`.

Tabel utama:
- `pembina`
- `ekskul`
- `siswa`
- `anggota_ekskul`
- `jadwal_kegiatan`
- `absensi`
- `dokumentasi`
- `laporan_kegiatan`
- `poin_keaktifan`


## 🛠️ Teknologi

- [ASP.NET Core 8 Web API](https://learn.microsoft.com/aspnet/core/)
- [Entity Framework Core](https://learn.microsoft.com/ef/core/)
- [Npgsql EFCore Provider (PostgreSQL)](https://www.npgsql.org/efcore/)
- [JWT Bearer Authentication](https://learn.microsoft.com/aspnet/core/security/authentication/jwt)

