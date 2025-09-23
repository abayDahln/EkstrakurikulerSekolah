using System;
using System.Collections.Generic;

namespace EkstrakurikulerSekolah.Models;

public partial class User
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string PasswordHash { get; set; } = null!;

    public string Role { get; set; } = null!;

    public DateTime? CreatedAt { get; set; }

    public virtual ICollection<ExtracurricularPembina> ExtracurricularPembinas { get; set; } = new List<ExtracurricularPembina>();

    public virtual ICollection<Extracurricular> Extracurriculars { get; set; } = new List<Extracurricular>();

    public virtual ICollection<Member> Members { get; set; } = new List<Member>();

    public virtual ICollection<Schedule> Schedules { get; set; } = new List<Schedule>();
}
