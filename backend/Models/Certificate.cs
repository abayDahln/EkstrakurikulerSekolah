using System;
using System.Collections.Generic;

namespace EkstrakurikulerSekolah.Models;

public partial class Certificate
{
    public int Id { get; set; }

    public int? MemberId { get; set; }

    public string CertificateName { get; set; } = null!;

    public string? CertificateUrl { get; set; }

    public DateTime? IssuedAt { get; set; }

    public virtual Member? Member { get; set; }
}
