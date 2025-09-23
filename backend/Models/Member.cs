using System;
using System.Collections.Generic;

namespace EkstrakurikulerSekolah.Models;

public partial class Member
{
    public int Id { get; set; }

    public int? UserId { get; set; }

    public int? ExtracurricularId { get; set; }

    public DateOnly? JoinDate { get; set; }

    public string? Status { get; set; }

    public virtual ICollection<ActivityReport> ActivityReports { get; set; } = new List<ActivityReport>();

    public virtual ICollection<Attendance> Attendances { get; set; } = new List<Attendance>();

    public virtual ICollection<Certificate> Certificates { get; set; } = new List<Certificate>();

    public virtual Extracurricular? Extracurricular { get; set; }

    public virtual Point? Point { get; set; }

    public virtual User? User { get; set; }
}
