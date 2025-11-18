namespace EkstrakurikulerSekolah.Models
{
    public class ActivityDocumentation
    {
        public int Id { get; set; }

        public int? UserId { get; set; }

        public int? ScheduleId { get; set; }

        public string DocumentationTitle { get; set; } = null!;

        public string? FileUrl { get; set; }

        public DateTime? SubmittedAt { get; set; }

        public virtual User? User { get; set; }

        public virtual Schedule? Schedule { get; set; }
    }
}
