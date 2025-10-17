using Microsoft.EntityFrameworkCore;

namespace EkstrakurikulerSekolah.Models
{
    public class PointService
    {
        private readonly EkskulDbContext _context;

        public PointService(EkskulDbContext context)
        {
            _context = context;
        }

        public async Task AddJoinExtracurricularPoints(int MemberId, int extracurricularId)
        {
            var point = new Point
            {
                MemberId = MemberId,
                Points = 5,
                Title = "bergabung",
                CreatedAt = Convert.ToDateTime(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"))
            };

            _context.Points.Add(point);
            await _context.SaveChangesAsync();
        }

        public async Task AddAttendancePoints(int MemberId, string status)
        {
            int points = status.ToLower() switch
            {
                "hadir" => 2,
                "sakit" => 1,
                "izin" => 1,
                _ => 0
            };

            if (points > 0)
            {
                var statusText = status.ToLower() == "hadir" ? "Hadir" :
                               status.ToLower() == "sakit" ? "Sakit" : "Izin";

                var point = new Point
                {
                    MemberId = MemberId,
                    Points = points,
                    Title = $"{statusText}",
                    CreatedAt = Convert.ToDateTime(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"))
                };

                _context.Points.Add(point);
                await _context.SaveChangesAsync();
            }
        }

        public async Task AddReportPoints(int memberId)
        {
            var point = new Point
            {
                MemberId = memberId,
                Points = 3,
                Title = "mengupload",
                CreatedAt = Convert.ToDateTime(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"))
            };

            _context.Points.Add(point);
            await _context.SaveChangesAsync();
        }

        public async Task<int> GetUserTotalPoints(int userId, int ekskulId)
        {
            return await _context.Points
                .Where(p => p.MemberId == _context.Members.Where(x => x.UserId == userId && x.ExtracurricularId == ekskulId).Select(x => x.Id).FirstOrDefault())
                .SumAsync(p => p.Points);
        }

        public async Task<int> GetMemberPointsInExtracurricular(int memberId, int extracurricularId)
        {
            return await _context.Points
                .Where(p => p.MemberId == memberId &&
                           _context.Members.Any(m => m.Id == memberId && m.ExtracurricularId == extracurricularId))
                .SumAsync(p => p.Points);
        }

        public async Task<int> GetMemberTotalPoints(int memberId)
        {
            return await _context.Points
                .Where(p => p.MemberId == memberId)
                .SumAsync(p => p.Points);
        }


        public async Task<List<Point>> GetMemberPointHistory(int memberId)
        {
            return await _context.Points
                .Where(p => p.MemberId == memberId)
                .OrderByDescending(p => p.CreatedAt)
                .ToListAsync();
        }
    }
}
