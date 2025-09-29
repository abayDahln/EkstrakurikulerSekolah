using System;
using System.Collections.Generic;

namespace EkstrakurikulerSekolah.Models;

public partial class Point
{
    public int Id { get; set; }

    public int MemberId { get; set; }

    public int Points { get; set; }
    public string Title { get; set; } = null!;

    public DateTime? CreatedAt { get; set; }

    public virtual Member? Member { get; set; } = null!;
}
