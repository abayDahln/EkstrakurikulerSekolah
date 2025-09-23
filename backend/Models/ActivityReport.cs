using System;
using System.Collections.Generic;

namespace EkstrakurikulerSekolah.Models;

public partial class ActivityReport
{
    public int Id { get; set; }

    public int? MemberId { get; set; }

    public int? ScheduleId { get; set; }

    public string ReportTitle { get; set; } = null!;

    public string? ReportText { get; set; }

    public string? FileUrl { get; set; }

    public DateTime? SubmittedAt { get; set; }

    public virtual Member? Member { get; set; }

    public virtual Schedule? Schedule { get; set; }
}
