using System;
using System.Collections.Generic;

namespace EkstrakurikulerSekolah.Models;

public partial class Extracurricular
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public int? PembinaId { get; set; }

    public string? ImageUrl { get; set; }

    public virtual ICollection<Member> Members { get; set; } = new List<Member>();

    public virtual User? Pembina { get; set; }

    public virtual ICollection<Schedule> Schedules { get; set; } = new List<Schedule>();
}
