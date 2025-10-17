using System;
using System.Collections.Generic;
using System.Data;
using System.Xml.Linq;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace EkstrakurikulerSekolah.Models;

public partial class EkskulDbContext : DbContext
{
    public EkskulDbContext()
    {
    }

    public EkskulDbContext(DbContextOptions<EkskulDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<ActivityReport> ActivityReports { get; set; }
    public virtual DbSet<ActivityDocumentation> ActivityDocumentations { get; set; }

    public virtual DbSet<Attendance> Attendances { get; set; }

    public virtual DbSet<Certificate> Certificates { get; set; }

    public virtual DbSet<Extracurricular> Extracurriculars { get; set; }

    public virtual DbSet<Member> Members { get; set; }

    public virtual DbSet<Point> Points { get; set; }

    public virtual DbSet<Schedule> Schedules { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ActivityReport>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("activity_reports_pkey");

            entity.ToTable("activity_reports");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.FileUrl).HasColumnName("file_url");
            entity.Property(e => e.MemberId).HasColumnName("member_id");
            entity.Property(e => e.ReportText).HasColumnName("report_text");
            entity.Property(e => e.ReportTitle)
                .HasMaxLength(150)
                .HasColumnName("report_title");
            entity.Property(e => e.ScheduleId).HasColumnName("schedule_id");
            entity.Property(e => e.SubmittedAt)
                .HasDefaultValueSql("now()")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("submitted_at");

            entity.HasOne(d => d.Member).WithMany(p => p.ActivityReports)
                .HasForeignKey(d => d.MemberId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("activity_reports_member_id_fkey");

            entity.HasOne(d => d.Schedule).WithMany(p => p.ActivityReports)
                .HasForeignKey(d => d.ScheduleId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("activity_reports_schedule_id_fkey");
        });

        modelBuilder.Entity<ActivityDocumentation>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("activity_documentations_pkey");

            entity.ToTable("activity_documentations");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.ScheduleId).HasColumnName("schedule_id");

            entity.Property(e => e.DocumentationTitle)
                .HasMaxLength(150)
                .HasColumnName("documentation_title");

            entity.Property(e => e.FileUrl).HasColumnName("file_url");

            entity.Property(e => e.SubmittedAt)
                .HasDefaultValueSql("now()")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("submitted_at");

            entity.HasOne(d => d.User).WithMany() 
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("activity_documentations_user_id_fkey");

            entity.HasOne(d => d.Schedule).WithMany() 
                .HasForeignKey(d => d.ScheduleId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("activity_documentations_schedule_id_fkey");
        });


        modelBuilder.Entity<Attendance>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("attendances_pkey");

            entity.ToTable("attendances");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AttendanceTime)
                .HasDefaultValueSql("now()")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("attendance_time");
            entity.Property(e => e.MemberId).HasColumnName("member_id");
            entity.Property(e => e.ScheduleId).HasColumnName("schedule_id");
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .HasDefaultValueSql("'present'::character varying")
                .HasColumnName("status");

            entity.HasOne(d => d.Member).WithMany(p => p.Attendances)
                .HasForeignKey(d => d.MemberId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("attendances_member_id_fkey");

            entity.HasOne(d => d.Schedule).WithMany(p => p.Attendances)
                .HasForeignKey(d => d.ScheduleId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("attendances_schedule_id_fkey");
        });

        modelBuilder.Entity<Certificate>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("certificates_pkey");

            entity.ToTable("certificates");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CertificateName)
                .HasMaxLength(150)
                .HasColumnName("certificate_name");
            entity.Property(e => e.CertificateUrl).HasColumnName("certificate_url");
            entity.Property(e => e.IssuedAt)
                .HasDefaultValueSql("now()")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("issued_at");
            entity.Property(e => e.MemberId).HasColumnName("member_id");

            entity.HasOne(d => d.Member).WithMany(p => p.Certificates)
                .HasForeignKey(d => d.MemberId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("certificates_member_id_fkey");
        });

        modelBuilder.Entity<Extracurricular>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("extracurriculars_pkey");

            entity.ToTable("extracurriculars");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasColumnName("name");
            entity.Property(e => e.PembinaId).HasColumnName("pembina_id");
            entity.Property(e => e.ImageUrl)    
                .HasMaxLength(300)             
                .HasColumnName("image_url");

            entity.HasOne(d => d.Pembina).WithMany(p => p.Extracurriculars)
                .HasForeignKey(d => d.PembinaId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("extracurriculars_pembina_id_fkey");
        });

        modelBuilder.Entity<Member>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("members_pkey");

            entity.ToTable("members");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.ExtracurricularId).HasColumnName("extracurricular_id");
            entity.Property(e => e.JoinDate)
                .HasDefaultValueSql("CURRENT_DATE")
                .HasColumnName("join_date");
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .HasDefaultValueSql("'active'::character varying")
                .HasColumnName("status");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Extracurricular).WithMany(p => p.Members)
                .HasForeignKey(d => d.ExtracurricularId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("members_extracurricular_id_fkey");

            entity.HasOne(d => d.User).WithMany(p => p.Members)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("members_user_id_fkey");
        });

        modelBuilder.Entity<Point>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("points_pkey");

            entity.ToTable("points");

            entity.Property(e => e.Id).HasColumnName("id");

            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("now()")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("created_at");

            entity.Property(e => e.MemberId).HasColumnName("member_id");

            entity.Property(e => e.Points)
                .HasDefaultValue(0)
                .HasColumnName("points");

            entity.Property(e => e.Title)
                .HasColumnName("title")
                .HasColumnType("character varying(200)");

            entity.HasOne(d => d.Member)
                .WithMany(p => p.Point)
                .HasForeignKey(d => d.MemberId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("points_member_id_fkey");
        });


        modelBuilder.Entity<Schedule>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("schedules_pkey");

            entity.ToTable("schedules");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedBy).HasColumnName("created_by");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.ExtracurricularId).HasColumnName("extracurricular_id");
            entity.Property(e => e.Location)
                .HasMaxLength(150)
                .HasColumnName("location");
            entity.Property(e => e.ScheduleDate)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("schedule_date");
            entity.Property(e => e.Title)
                .HasMaxLength(150)
                .HasColumnName("title");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.Schedules)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("schedules_created_by_fkey");

            entity.HasOne(d => d.Extracurricular).WithMany(p => p.Schedules)
                .HasForeignKey(d => d.ExtracurricularId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("schedules_extracurricular_id_fkey");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("users_pkey");

            entity.ToTable("users");

            entity.HasIndex(e => e.Email, "users_email_key").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("now()")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("created_at");
            entity.Property(e => e.Email)
                .HasMaxLength(150)
                .HasColumnName("email");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasColumnName("name");
            entity.Property(e => e.PasswordHash).HasColumnName("password_hash");
            entity.Property(e => e.Role)
                .HasMaxLength(20)
                .HasColumnName("role");
            entity.Property(e => e.ProfileUrl)    
                .HasMaxLength(300)             
                .HasColumnName("profile_url");
        });

        OnModelCreatingPartial(modelBuilder);



        modelBuilder.Entity<User>().HasData(
            new User
            {
                Id = 1,
                Name = "Budi Pranowo S.Pd.",
                Email = "budi@sekolah.id",
                PasswordHash = "3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2",
                Role = "pembina",
                CreatedAt = DateTime.Parse("2025-09-23 13:27:45"),
                ProfileUrl = "public/profile/profile_1.jpg"
            },
            new User
            {
                Id = 2,
                Name = "Wati Sulastri M.Pd.",
                Email = "wati@sekolah.id",
                PasswordHash = "3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2",
                Role = "pembina",
                CreatedAt = DateTime.Parse("2025-09-23 13:27:45"),
                ProfileUrl = "public/profile/profile_2.jpg"
            },
            new User
            {
                Id = 3,
                Name = "Rudi Gunawan S.Pd.",
                Email = "rudi@sekolah.id",
                PasswordHash = "3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2",
                Role = "pembina",
                CreatedAt = DateTime.Parse("2025-09-23 13:27:45"),
                ProfileUrl = "public/profile/profile_3.jpg"
            },
            new User
            {
                Id = 4,
                Name = "Andiansyah",
                Email = "andi@sekolah.id",
                PasswordHash = "3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2",
                Role = "siswa",
                CreatedAt = DateTime.Parse("2025-09-23 13:27:45"),
                ProfileUrl = "public/profile/profile_4.jpg"
            },
            new User
            {
                Id = 5,
                Name = "Siti Sarifah",
                Email = "siti@sekolah.id",
                PasswordHash = "3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2",
                Role = "siswa",
                CreatedAt = DateTime.Parse("2025-09-23 13:27:45"),
                ProfileUrl = "public/profile/profile_5.jpg"
            },
            new User
            {
                Id = 6,
                Name = "Jokowi",
                Email = "joko@sekolah.id",
                PasswordHash = "3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2",
                Role = "siswa",
                CreatedAt = DateTime.Parse("2025-09-23 13:27:45"),
                ProfileUrl = "public/profile/profile_6.jpg"
            },
            new User
            {
                Id = 7,
                Name = "Mira Fitri",
                Email = "mira@sekolah.id",
                PasswordHash = "3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2",
                Role = "siswa",
                CreatedAt = DateTime.Parse("2025-09-23 13:27:45"),
                ProfileUrl = "public/profile/profile_7.jpg"
            },
            new User
            {
                Id = 8,
                Name = "Dewi Azzahra",
                Email = "dewi@sekolah.id",
                PasswordHash = "3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2",
                Role = "siswa",
                CreatedAt = DateTime.Parse("2025-09-23 13:27:45"),
                ProfileUrl = "public/profile/profile_8.jpg"
            },
            new User
            {
                Id = 9,
                Name = "Rina Putri",
                Email = "rina@sekolah.id",
                PasswordHash = "3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2",
                Role = "siswa",
                CreatedAt = DateTime.Parse("2025-09-23 13:27:45"),
                ProfileUrl = "public/profile/profile_9.jpg"
            },
            new User
            {
                Id = 10,
                Name = "Muhammad Bayu",
                Email = "bayu@sekolah.id",
                PasswordHash = "3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2",
                Role = "siswa",
                CreatedAt = DateTime.Parse("2025-09-23 13:27:45"),
                ProfileUrl = "public/profile/profile_10.jpg"
            },
            new User
            {
                Id = 11,
                Name = "Lia Sari",
                Email = "lia@sekolah.id",
                PasswordHash = "3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2",
                Role = "siswa",
                CreatedAt = DateTime.Parse("2025-09-23 13:27:45"),
                ProfileUrl = "public/profile/profile_11.jpg"
            },
            new User
            {
                Id = 12,
                Name = "Ahmad Fahri",
                Email = "fahri@sekolah.id",
                PasswordHash = "3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2",
                Role = "siswa",
                CreatedAt = DateTime.Parse("2025-09-23 13:27:45"),
                ProfileUrl = "public/profile/profile_12.jpg"
            },
            new User
            {
                Id = 13,
                Name = "Indah Rahmawati",
                Email = "indah@sekolah.id",
                PasswordHash = "3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2",
                Role = "siswa",
                CreatedAt = DateTime.Parse("2025-09-23 13:27:45"),
                ProfileUrl = "public/profile/profile_13.jpg"
            }
        );

        modelBuilder.Entity<Extracurricular>().HasData(
            new Extracurricular
            {
                Id = 1,
                Name = "Pramuka",
                Description = "Ekskul Pramuka untuk siswa yang ingin belajar tentang kepanduan dan kegiatan luar ruangan.",
                PembinaId = 1,
                ImageUrl = "public/extracurricular/extracurricular_pramuka.jpg"
            },
            new Extracurricular
            {
                Id = 2,
                Name = "Paskibra",
                Description = "Ekskul Paskibra untuk siswa yang ingin belajar tentang baris-berbaris dan upacara bendera.",
                PembinaId = 2,
                ImageUrl = "public/extracurricular/extracurricular_paskibra.jpg"

            },
            new Extracurricular
            {
                Id = 3,
                Name = "KIR",
                Description = "Ekskul Kelompok Ilmiah Remaja untuk mengembangkan bakat, kreativitas, dan keterampilan ilmiah remaja.",
                PembinaId = 3,
                ImageUrl = "public/extracurricular/extracurricular_kir.jpg"
            },
            new Extracurricular
            {
                Id = 4,
                Name = "Padus",
                Description = "Ekskul Paduan Suara untuk melakukan kegiatan seni pertunjukan, ibadah keagamaan, dan hiburan.",
                PembinaId = 2,
                ImageUrl = "public/extracurricular/extracurricular_padus.jpg"
            },
            new Extracurricular
            {
                Id = 5,
                Name = "Basket",
                Description = "Ekskul Basket untuk siswa yang suka bermain bola basket dan ingin pengembangan bakat.",
                PembinaId = 1,
                ImageUrl = "public/extracurricular/extracurricular_basket.jpg"
            }
        );

        modelBuilder.Entity<Member>().HasData(
             
            new Member { Id = 1, UserId = 4, ExtracurricularId = 1, JoinDate = DateOnly.Parse("2025-09-23"), Status = "active" },  // Andi
            new Member { Id = 2, UserId = 8, ExtracurricularId = 1, JoinDate = DateOnly.Parse("2025-09-23"), Status = "active" },  // Dewi
            new Member { Id = 3, UserId = 11, ExtracurricularId = 1, JoinDate = DateOnly.Parse("2025-09-23"), Status = "active" }, // Lia

            
            new Member { Id = 4, UserId = 5, ExtracurricularId = 2, JoinDate = DateOnly.Parse("2025-09-23"), Status = "active" },   // Siti
            new Member { Id = 5, UserId = 9, ExtracurricularId = 2, JoinDate = DateOnly.Parse("2025-09-23"), Status = "active" },   // Rina
            new Member { Id = 6, UserId = 13, ExtracurricularId = 2, JoinDate = DateOnly.Parse("2025-09-23"), Status = "active" },  // Indah

            
            new Member { Id = 7, UserId = 6, ExtracurricularId = 3, JoinDate = DateOnly.Parse("2025-09-23"), Status = "active" },   // Joko
            new Member { Id = 8, UserId = 10, ExtracurricularId = 3, JoinDate = DateOnly.Parse("2025-09-23"), Status = "active" },  // Bayu
            new Member { Id = 9, UserId = 13, ExtracurricularId = 3, JoinDate = DateOnly.Parse("2025-09-23"), Status = "active" },  // Indah (ikut 2 ekskul)

            
            new Member { Id = 10, UserId = 7, ExtracurricularId = 4, JoinDate = DateOnly.Parse("2025-09-23"), Status = "active" },  // Mira
            new Member { Id = 11, UserId = 10, ExtracurricularId = 4, JoinDate = DateOnly.Parse("2025-09-23"), Status = "active" }, // Bayu (ikut 2 ekskul)

            
            new Member { Id = 12, UserId = 5, ExtracurricularId = 5, JoinDate = DateOnly.Parse("2025-09-23"), Status = "active" },  // Siti (ikut 2 ekskul)
            new Member { Id = 13, UserId = 9, ExtracurricularId = 5, JoinDate = DateOnly.Parse("2025-09-23"), Status = "active" },  // Rina (ikut 2 ekskul)
            new Member { Id = 14, UserId = 12, ExtracurricularId = 5, JoinDate = DateOnly.Parse("2025-09-23"), Status = "active" }  // Fahri
        );

        modelBuilder.Entity<Schedule>().HasData(
            new Schedule
            {
                Id = 1,
                ExtracurricularId = 1, 
                Title = "Latihan Pramuka Mingguan",
                Description = "Latihan rutin pramuka setiap minggu untuk meningkatkan keterampilan dan pengetahuan anggota.",
                ScheduleDate = DateTime.Parse("2025-09-25 15:00:00"),
                Location = "Lapangan Sekolah",
                CreatedBy = 1 
            },
            new Schedule
            {
                Id = 2,
                ExtracurricularId = 2, 
                Title = "Latihan Paskibra Persiapan Upacara",
                Description = "Latihan intensif paskibra menjelang upacara bendera untuk memastikan kesiapan anggota.",
                ScheduleDate = DateTime.Parse("2025-09-26 16:00:00"),
                Location = "Aula Sekolah",
                CreatedBy = 2 
            },
            new Schedule
            {
                Id = 3,
                ExtracurricularId = 3,
                Title = "Workshop KIR: Penelitian Sederhana",
                Description = "Workshop untuk anggota KIR tentang cara melakukan penelitian sederhana dan presentasi hasilnya.",
                ScheduleDate = DateTime.Parse("2025-09-27 14:00:00"),
                Location = "Laboratorium IPA",
                CreatedBy = 3 
            },
            new Schedule
            {
                Id = 4,
                ExtracurricularId = 4, 
                Title = "Latihan Padus untuk Acara Sekolah",
                Description = "Latihan paduan suara untuk persiapan tampil di acara sekolah berikutnya.",
                ScheduleDate = DateTime.Parse("2025-09-28 15:30:00"),
                Location = "Ruang Musik",
                CreatedBy = 2 
            },
            new Schedule
            {
                Id = 5,
                ExtracurricularId = 5, 
                Title = "Pertandingan Persahabatan Basket",
                Description = "Pertandingan persahabatan antara tim basket sekolah dengan tim dari sekolah lain.",
                ScheduleDate = DateTime.Parse("2025-09-29 17:00:00"),
                Location = "Lapangan Basket Sekolah",
                CreatedBy = 1 
            }
        );

        modelBuilder.Entity<Point>().HasData(
            
            new Point { Id = 1, MemberId = 1, Title = "bergabung", Points = 5, CreatedAt = DateTime.Parse("2025-09-23 16:00:00") },
            new Point { Id = 2, MemberId = 2, Title = "bergabung", Points = 5, CreatedAt = DateTime.Parse("2025-09-23 16:00:00") },
            new Point { Id = 3, MemberId = 3, Title = "bergabung", Points = 5, CreatedAt = DateTime.Parse("2025-09-23 16:00:00") },
            new Point { Id = 4, MemberId = 4, Title = "bergabung", Points = 5, CreatedAt = DateTime.Parse("2025-09-23 16:00:00") },
            new Point { Id = 5, MemberId = 5, Title = "bergabung", Points = 5, CreatedAt = DateTime.Parse("2025-09-23 16:00:00") },
            new Point { Id = 6, MemberId = 6, Title = "bergabung", Points = 5, CreatedAt = DateTime.Parse("2025-09-23 16:00:00") },
            new Point { Id = 7, MemberId = 7, Title = "bergabung", Points = 5, CreatedAt = DateTime.Parse("2025-09-23 16:00:00") },
            new Point { Id = 8, MemberId = 8, Title = "bergabung", Points = 5, CreatedAt = DateTime.Parse("2025-09-23 16:00:00") },
            new Point { Id = 9, MemberId = 9, Title = "bergabung", Points = 5, CreatedAt = DateTime.Parse("2025-09-23 16:00:00") },
            new Point { Id = 10, MemberId = 10, Title = "bergabung", Points = 5, CreatedAt = DateTime.Parse("2025-09-23 16:00:00") },
            new Point { Id = 11, MemberId = 11, Title = "bergabung", Points = 5, CreatedAt = DateTime.Parse("2025-09-23 16:00:00") },
            new Point { Id = 12, MemberId = 12, Title = "bergabung", Points = 5, CreatedAt = DateTime.Parse("2025-09-23 16:00:00") },
            new Point { Id = 13, MemberId = 13, Title = "bergabung", Points = 5, CreatedAt = DateTime.Parse("2025-09-23 16:00:00") },
            new Point { Id = 14, MemberId = 14, Title = "bergabung", Points = 5, CreatedAt = DateTime.Parse("2025-09-23 16:00:00") },

           
         
            new Point { Id = 15, MemberId = 1, Title = "hadir", Points = 2, CreatedAt = DateTime.Parse("2025-09-25 15:05:00") }, // Andi - hadir
            new Point { Id = 16, MemberId = 2, Title = "hadir", Points = 2, CreatedAt = DateTime.Parse("2025-09-25 15:10:00") }, // Dewi - hadir
            new Point { Id = 17, MemberId = 3, Title = "sakit", Points = 1, CreatedAt = DateTime.Parse("2025-09-25 15:15:00") }, // Lia - sakit

           
            new Point { Id = 18, MemberId = 4, Title = "hadir", Points = 2, CreatedAt = DateTime.Parse("2025-09-26 16:05:00") }, // Siti - hadir
            new Point { Id = 19, MemberId = 5, Title = "hadir", Points = 2, CreatedAt = DateTime.Parse("2025-09-26 16:10:00") }, // Rina - hadir
            new Point { Id = 20, MemberId = 6, Title = "izin", Points = 1, CreatedAt = DateTime.Parse("2025-09-26 16:15:00") },  // Indah - izin

           
            new Point { Id = 21, MemberId = 7, Title = "hadir", Points = 2, CreatedAt = DateTime.Parse("2025-09-27 14:05:00") }, // Joko - hadir
            new Point { Id = 22, MemberId = 8, Title = "hadir", Points = 2, CreatedAt = DateTime.Parse("2025-09-27 14:10:00") }, // Bayu - hadir
            new Point { Id = 23, MemberId = 9, Title = "hadir", Points = 2, CreatedAt = DateTime.Parse("2025-09-27 14:15:00") }, // Indah - hadir

          
            new Point { Id = 24, MemberId = 10, Title = "hadir", Points = 2, CreatedAt = DateTime.Parse("2025-09-28 15:35:00") }, // Mira - hadir
            new Point { Id = 25, MemberId = 11, Title = "sakit", Points = 1, CreatedAt = DateTime.Parse("2025-09-28 15:40:00") }, // Bayu - sakit

            
            new Point { Id = 26, MemberId = 12, Title = "hadir", Points = 2, CreatedAt = DateTime.Parse("2025-09-29 17:05:00") }, // Siti - hadir
            new Point { Id = 27, MemberId = 13, Title = "hadir", Points = 2, CreatedAt = DateTime.Parse("2025-09-29 17:10:00") }, // Rina - hadir
            new Point { Id = 28, MemberId = 14, Title = "hadir", Points = 2, CreatedAt = DateTime.Parse("2025-09-29 17:15:00") }, // Fahri - hadir

           
            new Point { Id = 29, MemberId = 1, Title = "mengupload", Points = 3, CreatedAt = DateTime.Parse("2025-09-25 17:00:00") },  // Andi upload laporan Pramuka
            new Point { Id = 30, MemberId = 7, Title = "mengupload", Points = 3, CreatedAt = DateTime.Parse("2025-09-27 16:00:00") },  // Joko upload laporan KIR
            new Point { Id = 31, MemberId = 12, Title = "mengupload", Points = 3, CreatedAt = DateTime.Parse("2025-09-29 19:00:00") }   // Siti upload laporan Basket
        );

        modelBuilder.Entity<Attendance>().HasData(
            
            new Attendance { Id = 1, MemberId = 1, ScheduleId = 1, Status = "hadir", AttendanceTime = DateTime.Parse("2025-09-25 15:05:00") },
            new Attendance { Id = 2, MemberId = 2, ScheduleId = 1, Status = "hadir", AttendanceTime = DateTime.Parse("2025-09-25 15:10:00") },
            new Attendance { Id = 3, MemberId = 3, ScheduleId = 1, Status = "sakit", AttendanceTime = DateTime.Parse("2025-09-25 15:15:00") }, 

           
            new Attendance { Id = 4, MemberId = 4, ScheduleId = 2, Status = "hadir", AttendanceTime = DateTime.Parse("2025-09-26 16:05:00") }, 
            new Attendance { Id = 5, MemberId = 5, ScheduleId = 2, Status = "hadir", AttendanceTime = DateTime.Parse("2025-09-26 16:10:00") },
            new Attendance { Id = 6, MemberId = 6, ScheduleId = 2, Status = "izin", AttendanceTime = DateTime.Parse("2025-09-26 16:15:00") },

            
            new Attendance { Id = 7, MemberId = 7, ScheduleId = 3, Status = "hadir", AttendanceTime = DateTime.Parse("2025-09-27 14:05:00") },
            new Attendance { Id = 8, MemberId = 8, ScheduleId = 3, Status = "hadir", AttendanceTime = DateTime.Parse("2025-09-27 14:10:00") }, 
            new Attendance { Id = 9, MemberId = 9, ScheduleId = 3, Status = "hadir", AttendanceTime = DateTime.Parse("2025-09-27 14:15:00") },

           
            new Attendance { Id = 10, MemberId = 10, ScheduleId = 4, Status = "hadir", AttendanceTime = DateTime.Parse("2025-09-28 15:35:00") },
            new Attendance { Id = 11, MemberId = 11, ScheduleId = 4, Status = "sakit", AttendanceTime = DateTime.Parse("2025-09-28 15:40:00") }, 

            
            new Attendance { Id = 12, MemberId = 12, ScheduleId = 5, Status = "hadir", AttendanceTime = DateTime.Parse("2025-09-29 17:05:00") }, 
            new Attendance { Id = 13, MemberId = 13, ScheduleId = 5, Status = "hadir", AttendanceTime = DateTime.Parse("2025-09-29 17:10:00") }, 
            new Attendance { Id = 14, MemberId = 14, ScheduleId = 5, Status = "hadir", AttendanceTime = DateTime.Parse("2025-09-29 17:15:00") } 
        );

        modelBuilder.Entity<ActivityReport>().HasData(
            new ActivityReport
            {
                Id = 1,
                MemberId = 1,
                ScheduleId = 1,
                ReportTitle = "Laporan Latihan Pramuka Mingguan",
                ReportText = "Pada latihan pramuka minggu ini, kami belajar tentang tali-temali dan navigasi dasar. Anggota sangat antusias dan aktif berpartisipasi.",
                FileUrl = null,
                SubmittedAt = DateTime.Parse("2025-09-25 17:00:00")
            },
            new ActivityReport {
                Id = 4,
                MemberId = 4, 
                ScheduleId = 2, 
                ReportTitle = "Laporan Latihan Paskibra Persiapan Upacara",
                ReportText = "Latihan paskibra berjalan lancar. Kami fokus pada formasi dan disiplin baris-berbaris. Semua anggota menunjukkan kemajuan yang baik.",
                FileUrl = null,
                SubmittedAt = DateTime.Parse("2025-09-26 18:00:00")
            },
            new ActivityReport
            {
                Id = 2,
                MemberId = 7, 
                ScheduleId = 3, 
                ReportTitle = "Laporan Workshop KIR",
                ReportText = "Workshop penelitian sederhana berjalan dengan baik. Kami belajar metode penelitian dasar dan presentasi hasil.",
                FileUrl = null,
                SubmittedAt = DateTime.Parse("2025-09-27 16:00:00")
            },
            new ActivityReport
            {
                Id = 3,
                MemberId = 12, 
                ScheduleId = 5, 
                ReportTitle = "Laporan Pertandingan Persahabatan Basket",
                ReportText = "Pertandingan persahabatan melawan tim dari sekolah lain berjalan dengan sangat baik. Kami menang dengan skor 30-25.",
                FileUrl = null,
                SubmittedAt = DateTime.Parse("2025-09-29 19:00:00")
            },
            new ActivityReport
            {
                Id = 5,
                MemberId = 10, 
                ScheduleId = 4, 
                ReportTitle = "Laporan Latihan Padus untuk Acara Sekolah",
                ReportText = "Latihan paduan suara berjalan lancar. Kami mempersiapkan beberapa lagu untuk acara sekolah berikutnya.",
                FileUrl = null,
                SubmittedAt = DateTime.Parse("2025-09-28 17:00:00")
            }
        );

        modelBuilder.Entity<Certificate>().HasData(
            new Certificate
            {
                Id = 1,
                MemberId = 1,
                CertificateName = "Sertifikat Keaktifan Pramuka 2025",
                CertificateUrl = "public/certificate/Andiansyah_f89b46168abd4f09bd641b0e11a59141.png",
            },
            new Certificate
            {
                Id = 2,
                MemberId = 12, 
                CertificateName = "Sertifikat Juara 1 Basket Putri 2045",
                CertificateUrl = "public/certificate/Siti_Sarifah_b6014b86e55e4c8cb9ea6e6314b43536.png",
            },
            new Certificate
            {
                Id = 3,
                MemberId = 7, 
                CertificateName = "Sertifikat Keaktifan KIR 2025",
                CertificateUrl = "public/certificate/Jokowi_4022eaa24efb42f79b1237f8bdb239e9.png",
            }
        );

        modelBuilder.Entity<ActivityDocumentation>().HasData(
            new ActivityDocumentation
            {
                Id = 1,
                ScheduleId = 1, 
                UserId = 1,
                FileUrl = "public/documentation/pramuka1.jpg",
                DocumentationTitle = "Foto kegiatan tali-temali dalam latihan pramuka.",
                SubmittedAt = DateTime.Parse("2025-09-29 16:00:00")
            },
            new ActivityDocumentation
            {
                Id = 2,
                ScheduleId = 2,
                UserId = 2,
                FileUrl = "public/documentation/paskibra1.jpg",
                DocumentationTitle = "Foto latihan baris-berbaris paskibra.",
                SubmittedAt = DateTime.Parse("2025-09-29 15:00:00")
            },
            new ActivityDocumentation
            {
                Id = 3,
                ScheduleId = 3,
                UserId = 3,
                FileUrl = "public/documentation/kir1.jpg",
                DocumentationTitle = "Foto workshop penelitian sederhana KIR.",
                SubmittedAt = DateTime.Parse("2025-09-29 19:00:00")
            },
            new ActivityDocumentation
            {
                Id = 4,
                ScheduleId = 4,
                UserId = 2,
                FileUrl = "public/documentation/padus1.jpg",
                DocumentationTitle = "Foto latihan paduan suara Padus.",
                SubmittedAt = DateTime.Parse("2025-09-29 17:00:00")
            },
            new ActivityDocumentation
            {
                Id = 5,
                ScheduleId = 5,
                UserId = 1,
                FileUrl = "public/documentation/basket1.jpg",
                DocumentationTitle = "Foto pertandingan persahabatan basket.",
                SubmittedAt = DateTime.Parse("2025-09-29 18:00:00")
            }
        );
    }



    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
