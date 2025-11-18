using System;
using System.Collections.Generic;

namespace EkstrakurikulerSekolah.Models;

public partial class Schedule
{
    public int Id { get; set; }

    public int? ExtracurricularId { get; set; }

    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public DateTime ScheduleDate { get; set; }

    public string? Location { get; set; }

    public int? CreatedBy { get; set; }

    public virtual ICollection<ActivityReport> ActivityReports { get; set; } = new List<ActivityReport>();

    public virtual ICollection<Attendance> Attendances { get; set; } = new List<Attendance>();

    public virtual User? CreatedByNavigation { get; set; }

    public virtual Extracurricular? Extracurricular { get; set; }
}
