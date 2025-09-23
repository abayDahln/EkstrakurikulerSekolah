using System;
using System.Collections.Generic;
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

    public virtual DbSet<Attendance> Attendances { get; set; }

    public virtual DbSet<Certificate> Certificates { get; set; }

    public virtual DbSet<Extracurricular> Extracurriculars { get; set; }

    public virtual DbSet<ExtracurricularPembina> ExtracurricularPembinas { get; set; }

    public virtual DbSet<Member> Members { get; set; }

    public virtual DbSet<Point> Points { get; set; }

    public virtual DbSet<Schedule> Schedules { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseNpgsql("Host=localhost;Database=ekskul_db;Username=postgres;Password=admin");

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

            entity.HasOne(d => d.Pembina).WithMany(p => p.Extracurriculars)
                .HasForeignKey(d => d.PembinaId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("extracurriculars_pembina_id_fkey");
        });

        modelBuilder.Entity<ExtracurricularPembina>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("extracurricular_pembina_pkey");

            entity.ToTable("extracurricular_pembina");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.ExtracurricularId).HasColumnName("extracurricular_id");
            entity.Property(e => e.PembinaId).HasColumnName("pembina_id");

            entity.HasOne(d => d.Extracurricular).WithMany(p => p.ExtracurricularPembinas)
                .HasForeignKey(d => d.ExtracurricularId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("extracurricular_pembina_extracurricular_id_fkey");

            entity.HasOne(d => d.Pembina).WithMany(p => p.ExtracurricularPembinas)
                .HasForeignKey(d => d.PembinaId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("extracurricular_pembina_pembina_id_fkey");
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

            entity.HasIndex(e => e.MemberId, "points_member_id_key").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.LastUpdated)
                .HasDefaultValueSql("now()")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("last_updated");
            entity.Property(e => e.MemberId).HasColumnName("member_id");
            entity.Property(e => e.Points)
                .HasDefaultValue(0)
                .HasColumnName("points");

            entity.HasOne(d => d.Member).WithOne(p => p.Point)
                .HasForeignKey<Point>(d => d.MemberId)
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
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
