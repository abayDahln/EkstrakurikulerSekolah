using System.Security.Claims;
using EkstrakurikulerSekolah.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EkstrakurikulerSekolah.Controllers
{
    [ApiController]
    [Route("api/schedule")]
    public class ScheduleController : ControllerBase
    {
        private readonly EkskulDbContext _context;

        public ScheduleController(EkskulDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetMySchedules([FromQuery] string? search)
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdString) || !int.TryParse(userIdString, out var userId))
                return Unauthorized();

           
            var userExtracurricularIds = await _context.Members
                .Where(m => m.UserId == userId && m.Status == "active")
                .Select(m => m.ExtracurricularId)
                .ToListAsync();

            var baseQuery = _context.Schedules
                .Where(s => userExtracurricularIds.Contains(s.ExtracurricularId));

            if (!string.IsNullOrEmpty(search))
            {
                var lower = search.ToLower();
                baseQuery = baseQuery.Where(s =>
                    (s.Title ?? "").ToLower().Contains(lower) ||
                    (s.Description ?? "").ToLower().Contains(lower) ||
                    (s.Location ?? "").ToLower().Contains(lower));
            }

            var schedules = await baseQuery
                .Select(s => new
                {
                    s.Id,
                    s.Title,
                    s.Description,
                    s.ScheduleDate,
                    s.Location,
                    Extracurricular = new
                    {
                        s.Extracurricular.Id,
                        s.Extracurricular.Name,
                        Pembina = new
                        {
                            Id = s.Extracurricular.PembinaId,
                            Name = _context.Users.Where(u => u.Id == s.Extracurricular.PembinaId)
                                   .Select(u => u.Name).FirstOrDefault()
                        }
                    },
                    IsAbsent = _context.Attendances
                        .Any(a => a.ScheduleId == s.Id &&
                                 _context.Members.Any(m => m.Id == a.MemberId && m.UserId == userId)),
                    IsReported = _context.ActivityReports
                        .Any(r => r.ScheduleId == s.Id &&
                                 _context.Members.Any(m => m.Id == r.MemberId && m.UserId == userId))
                })
                .ToListAsync();

            return Ok(new ApiResponse<object>(200, "success", schedules));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetScheduleDetail(
            int id,
            [FromQuery] string? attendanceSearch,
            [FromQuery] string? reportSearch)
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdString) || !int.TryParse(userIdString, out var userId))
                return Unauthorized();

            var schedule = await _context.Schedules
                .Where(s => s.Id == id)
                .Select(s => new
                {
                    s.Id,
                    s.Title,
                    s.Description,
                    s.ScheduleDate,
                    s.Location,
                    Extracurricular = new
                    {
                        s.Extracurricular.Id,
                        s.Extracurricular.Name,
                        Pembina = new
                        {
                            Id = s.Extracurricular.PembinaId,
                            Name = _context.Users.Where(u => u.Id == s.Extracurricular.PembinaId)
                                   .Select(u => u.Name).FirstOrDefault(),
                            ProfileUrl = _context.Users.Where(u => u.Id == s.Extracurricular.PembinaId)
                                           .Select(u => u.ProfileUrl).FirstOrDefault()
                        }
                    },
                    CreatedBy = new
                    {
                        Id = s.CreatedBy,
                        Name = _context.Users.Where(u => u.Id == s.CreatedBy)
                               .Select(u => u.Name).FirstOrDefault(),
                        ProfileUrl = _context.Users.Where(u => u.Id == s.CreatedBy)
                                       .Select(u => u.ProfileUrl).FirstOrDefault()
                    },
                   
                    Attendees = _context.Attendances
                        .Where(a => a.ScheduleId == s.Id)
                        .Join(_context.Members,
                            a => a.MemberId,
                            m => m.Id,
                            (a, m) => new { a, m })
                        .Join(_context.Users,
                            x => x.m.UserId,
                            u => u.Id,
                            (x, u) => new { x.a, x.m, u })
                        .Where(x => string.IsNullOrEmpty(attendanceSearch) ||
                                   (x.u.Name ?? "").ToLower().Contains(attendanceSearch.ToLower()))
                        .Select(x => new
                        {
                            x.a.Id,
                            Member = new
                            {
                                MemberId = x.m.Id,
                                UserId = x.u.Id,
                                Name = x.u.Name,
                                Profile = x.u.ProfileUrl
                            },
                            x.a.Status,
                            x.a.AttendanceTime
                        }).ToList(),
                    
                    Reports = _context.ActivityReports
                        .Where(r => r.ScheduleId == s.Id)
                        .Join(_context.Members,
                            r => r.MemberId,
                            m => m.Id,
                            (r, m) => new { r, m })
                        .Join(_context.Users,
                            x => x.m.UserId,
                            u => u.Id,
                            (x, u) => new { x.r, x.m, u })
                        .Where(x => string.IsNullOrEmpty(reportSearch) ||
                                   (x.u.Name ?? "").ToLower().Contains(reportSearch.ToLower()) ||
                                   (x.r.ReportTitle ?? "").ToLower().Contains(reportSearch.ToLower()) ||
                                   (x.r.ReportText ?? "").ToLower().Contains(reportSearch.ToLower()))
                        .Select(x => new
                        {
                            x.r.Id,
                            Member = new
                            {
                                MemberId = x.m.Id,
                                UserId = x.u.Id,
                                Name = x.u.Name,
                                Profile = x.u.ProfileUrl
                            },
                            x.r.ReportTitle,
                            x.r.ReportText,
                            x.r.SubmittedAt
                        }).ToList(),
                 
                    Documentations = _context.ActivityDocumentations
                        .Where(d => d.ScheduleId == s.Id)
                        .Join(_context.Users,
                            d => d.UserId,
                            u => u.Id,
                            (d, u) => new { d, u })
                        .Select(x => new
                        {
                            x.d.Id,
                            x.d.DocumentationTitle,
                            x.d.FileUrl,
                            x.d.SubmittedAt,
                            UploadedBy = new
                            {
                                Id = x.u.Id,
                                Name = x.u.Name,
                                Profile = x.u.ProfileUrl,
                                Role = x.u.Role
                            }
                        }).ToList(),
                 
                    IsAbsent = _context.Attendances
                        .Any(a => a.ScheduleId == s.Id &&
                                 _context.Members.Any(m => m.Id == a.MemberId && m.UserId == userId)),
                    IsReported = _context.ActivityReports
                        .Any(r => r.ScheduleId == s.Id &&
                                 _context.Members.Any(m => m.Id == r.MemberId && m.UserId == userId)),
                    MyReport = _context.ActivityReports
                        .Where(r => r.ScheduleId == s.Id &&
                                   _context.Members.Any(m => m.Id == r.MemberId && m.UserId == userId))
                        .Select(r => new { r.ReportTitle, r.ReportText, r.SubmittedAt })
                        .FirstOrDefault()
                })
                .FirstOrDefaultAsync();

            if (schedule == null)
                return NotFound(new ApiResponse<object>(404, "Jadwal tidak ditemukan", null));

            return Ok(new ApiResponse<object>(200, "success", schedule));
        }


    }
}
