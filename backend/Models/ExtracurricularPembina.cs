using System;
using System.Collections.Generic;

namespace EkstrakurikulerSekolah.Models;

public partial class ExtracurricularPembina
{
    public int Id { get; set; }

    public int? ExtracurricularId { get; set; }

    public int? PembinaId { get; set; }

    public virtual Extracurricular? Extracurricular { get; set; }

    public virtual User? Pembina { get; set; }
}
