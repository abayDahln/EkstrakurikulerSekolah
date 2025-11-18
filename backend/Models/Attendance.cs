using System;
using System.Collections.Generic;

namespace EkstrakurikulerSekolah.Models;

public partial class Attendance
{
    public int Id { get; set; }

    public int? ScheduleId { get; set; }

    public int? MemberId { get; set; }

    public string? Status { get; set; }

    public DateTime? AttendanceTime { get; set; }

    public virtual Member? Member { get; set; }

    public virtual Schedule? Schedule { get; set; }
}
