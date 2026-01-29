using System.Linq;
using System.Security.Claims;
using EkstrakurikulerSekolah.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EkstrakurikulerSekolah.Controllers
{
    [ApiController]
    [Route("api/schedule")]
    public class ScheduleController : ControllerBase
    {
        private readonly EkskulDbContext _context;
        private readonly ICertificateService _certificateService;
        public ScheduleController(EkskulDbContext context, ICertificateService certificateService)
        {
            _context = context;
            _certificateService = certificateService;
        }

        [Authorize(Roles = "pembina,siswa")]
        [HttpGet]
        public async Task<IActionResult> GetMySchedules([FromQuery] string? search)
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var userRole = User.FindFirstValue(ClaimTypes.Role);

            if (string.IsNullOrEmpty(userIdString) || !int.TryParse(userIdString, out var userId))
            {
                return Unauthorized(new ApiResponse<object>(401, "Unauthorized", null));
            }

            IQueryable<int> userExtracurricularIdsQuery;

            if (userRole == "siswa")
            {
                userExtracurricularIdsQuery = _context.Members
                    .Where(m => m.UserId == userId && m.Status == "active")
                    .Select(m => m.ExtracurricularId.Value);
            }
            else if (userRole == "pembina")
            {
                userExtracurricularIdsQuery = _context.Extracurriculars
                    .Where(e => e.PembinaId == userId)
                    .Select(e => e.Id);
            }
            else
            {
                return Forbid();
            }

            var baseQuery = from s in _context.Schedules
                            join eid in userExtracurricularIdsQuery on s.ExtracurricularId equals eid
                            select s;

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
                        Id = s.Extracurricular.Id,
                        Name = s.Extracurricular.Name,
                        ImageUrl = s.Extracurricular.ImageUrl,
                        Pembina = new
                        {
                            Id = s.Extracurricular.PembinaId,
                            Name = _context.Users.Where(u => u.Id == s.Extracurricular.PembinaId)
                                   .Select(u => u.Name).FirstOrDefault(),
                            ProfileUrl = _context.Users.Where(u => u.Id == s.Extracurricular.PembinaId)
                                   .Select(u => u.ProfileUrl).FirstOrDefault()
                        }
                    }
                })
                .OrderByDescending(s => s.ScheduleDate)
                .ToListAsync();

            return Ok(new ApiResponse<object>(200, "success", schedules));
        }

        [Authorize(Roles = "pembina,siswa")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetScheduleDetail(int id, [FromQuery] string? attendanceSearch, [FromQuery] string? reportSearch)
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var userRole = User.FindFirstValue(ClaimTypes.Role);

            if (string.IsNullOrEmpty(userIdString) || !int.TryParse(userIdString, out var userId))
            {
                return Unauthorized(new ApiResponse<object>(401, "Unauthorized", null));
            }

            var hasAccess = await _context.Schedules
                .Where(s => s.Id == id)
                .Select(s => new
                {
                    Schedule = s,
                    IsAllowed = userRole == "siswa" ?
                        _context.Members.Any(m => m.UserId == userId &&
                                                m.ExtracurricularId == s.ExtracurricularId &&
                                                m.Status == "active") :
                        _context.Extracurriculars.Any(e => e.Id == s.ExtracurricularId &&
                                                         e.PembinaId == userId)
                })
                .FirstOrDefaultAsync();

            if (hasAccess == null || !hasAccess.IsAllowed)
            {
                return NotFound(new ApiResponse<object>(404, "Tidak ada akses ke jadwal ini", null));
            }

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

                    IsAbsent = userRole == "siswa" ?
                        (bool?)_context.Attendances
                            .Any(a => a.ScheduleId == s.Id &&
                                     _context.Members.Any(m => m.Id == a.MemberId && m.UserId == userId)) :
                        null,
                    Absent = userRole == "siswa" ?
                        _context.Attendances
                            .Where(a => a.ScheduleId == s.Id &&
                                       _context.Members.Any(m => m.Id == a.MemberId && m.UserId == userId))
                            .Select(a => a.Status)
                            .FirstOrDefault() :
                        null,
                    IsReported = userRole == "siswa" ?
                        (bool?)_context.ActivityReports
                            .Any(r => r.ScheduleId == s.Id &&
                                     _context.Members.Any(m => m.Id == r.MemberId && m.UserId == userId)) :
                        null,

                    IsDocumented = userRole == "pembina" ?
                        (bool?)_context.ActivityDocumentations
                            .Any(d => d.ScheduleId == s.Id && d.UserId == userId) :
                        null,

                    MyReport = userRole == "siswa" ?
                        _context.ActivityReports
                            .Where(r => r.ScheduleId == s.Id &&
                                       _context.Members.Any(m => m.Id == r.MemberId && m.UserId == userId))
                            .Select(r => new { r.ReportTitle, r.ReportText, r.SubmittedAt })
                            .FirstOrDefault() :
                        null
                })
                .FirstOrDefaultAsync();

            if (schedule == null)
                return NotFound(new ApiResponse<object>(404, "Jadwal tidak ditemukan", null));

            return Ok(new ApiResponse<object>(200, "success", schedule));
        }

        [Authorize(Roles = "siswa")]
        [HttpPost("attendance")]
        public async Task<IActionResult> PostAttendance([FromBody] PostAttendanceRequest request)
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdString) || !int.TryParse(userIdString, out var userId))
            {
                return Unauthorized(new ApiResponse<object>(401, "Unauthorized", null));
            }


            if (request == null)
                return BadRequest(new ApiResponse<object>(400, "Data request tidak valid", null));

            if (request.ScheduleId <= 0)
                return BadRequest(new ApiResponse<object>(400, "ScheduleId tidak valid", null));

            
            var allowedStatus = new[] { "hadir", "izin", "sakit" };
            if (string.IsNullOrEmpty(request.Status) || !allowedStatus.Contains(request.Status.ToLower()))
            {
                return BadRequest(new ApiResponse<object>(400, "Status tidak valid. Gunakan: hadir, izin, atau sakit", null));
            }

            try
            {

                var schedule = await _context.Schedules
                    .FirstOrDefaultAsync(s => s.Id == request.ScheduleId);

                if (schedule == null)
                    return NotFound(new ApiResponse<object>(404, "Jadwal tidak ditemukan", null));


                var member = await _context.Members
                    .Include(m => m.User)
                    .FirstOrDefaultAsync(m => m.UserId == userId &&
                                              m.ExtracurricularId == schedule.ExtracurricularId &&
                                              m.Status == "active");

                                if (member == null)
                                    return BadRequest(new ApiResponse<object>(400, "Anda bukan member dari ekskul ini", null));


                var existingAttendance = await _context.Attendances
                    .FirstOrDefaultAsync(a => a.ScheduleId == request.ScheduleId &&
                                             a.MemberId == member.Id);

                if (existingAttendance != null)
                {
                    return BadRequest(new ApiResponse<object>(400, "Anda sudah melakukan absen untuk jadwal ini", new
                    {
                        existingAttendance.Id,
                        existingAttendance.Status,
                        existingAttendance.AttendanceTime
                    }));
                }

                
                var attendance = new Attendance
                {
                    ScheduleId = request.ScheduleId,
                    MemberId = member.Id,
                    Status = request.Status.ToLower(),
                    AttendanceTime = Convert.ToDateTime(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"))
                };

                _context.Attendances.Add(attendance);
                await _context.SaveChangesAsync();

                var pointService = new PointService(_context);
                await pointService.AddAttendancePoints(member.Id, request.Status);

                int pointsEarned = request.Status.ToLower() switch
                {
                    "hadir" => 2,
                    "sakit" => 1,
                    "izin" => 1,
                    _ => 0
                };

                var totalPointsOverall = await pointService.GetMemberTotalPoints(member.Id);

                string? message = null;

                if (totalPointsOverall >= 100)
                {

                    message = await CreateCertificate(member.User.Name, member.ExtracurricularId, member.UserId);

                }

                var createdAttendance = await _context.Attendances
                    .Where(a => a.Id == attendance.Id)
                    .Select(a => new
                    {
                        a.Id,
                        a.ScheduleId,
                        Schedule = new
                        {
                            a.Schedule.Title,
                            a.Schedule.Description,
                            a.Schedule.ScheduleDate,
                            a.Schedule.Location
                        },
                        Extracurricular = new
                        {
                            Id = a.Schedule.Extracurricular.Id,
                            Name = a.Schedule.Extracurricular.Name,
                            ImageUrl = a.Schedule.Extracurricular.ImageUrl,
                        },
                        a.Status,
                        a.AttendanceTime,
                        Member = new
                        {
                            member.Id,
                            User = new
                            {
                                member.User.Id,
                                member.User.Name,
                                member.User.ProfileUrl
                            }
                        },
                        PointsEarned = pointsEarned,
                        TotalPointsOverall = totalPointsOverall,
                        CertificateMessage = message

                    })
                    .FirstOrDefaultAsync();


                return Ok(new ApiResponse<object>(201, "Absen berhasil dicatat", createdAttendance));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<object>(500, "Terjadi kesalahan saat melakukan absen", null));
            }
        }

        [Authorize(Roles = "siswa")]
        [HttpPost("report")]
        public async Task<IActionResult> PostReport([FromBody] PostReportRequest request)
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdString) || !int.TryParse(userIdString, out var userId))
            {
                return Unauthorized(new ApiResponse<object>(401, "Unauthorized", null));
            }

            if (request == null)
                return BadRequest(new ApiResponse<object>(400, "Data request tidak valid", null));

            if (string.IsNullOrEmpty(request.ReportTitle))
                return BadRequest(new ApiResponse<object>(400, "Judul laporan tidak boleh kosong", null));

            if (string.IsNullOrEmpty(request.ReportText))
                return BadRequest(new ApiResponse<object>(400, "Isi laporan tidak boleh kosong", null));

            if (request.ScheduleId <= 0)
                return BadRequest(new ApiResponse<object>(400, "ScheduleId tidak valid", null));

            try
            {
                var schedule = await _context.Schedules
                    .FirstOrDefaultAsync(s => s.Id == request.ScheduleId);

                if (schedule == null)
                    return NotFound(new ApiResponse<object>(404, "Jadwal tidak ditemukan", null));

                var member = await _context.Members
                    .Include(m => m.User)
                    .FirstOrDefaultAsync(m => m.UserId == userId &&
                                              m.ExtracurricularId == schedule.ExtracurricularId &&
                                              m.Status == "active");

                if (member == null)
                    return BadRequest(new ApiResponse<object>(400, "Anda bukan member dari ekskul ini", null));

                var existingReport = await _context.ActivityReports
                    .FirstOrDefaultAsync(r => r.ScheduleId == request.ScheduleId &&
                                             r.MemberId == member.Id);

                if (existingReport != null)
                {
                    return BadRequest(new ApiResponse<object>(400, "Anda sudah membuat laporan untuk jadwal ini", new
                    {
                        existingReport.Id,
                        existingReport.ReportTitle,
                        existingReport.SubmittedAt
                    }));
                }

                var report = new ActivityReport
                {
                    MemberId = member.Id,
                    ScheduleId = request.ScheduleId,
                    ReportTitle = request.ReportTitle,
                    ReportText = request.ReportText,
                    FileUrl = null,
                    SubmittedAt = Convert.ToDateTime(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"))
                };

                _context.ActivityReports.Add(report);
                await _context.SaveChangesAsync();

                var pointService = new PointService(_context);
                await pointService.AddReportPoints(member.Id);

                var totalPointsOverall = await pointService.GetMemberTotalPoints(member.Id);

                string? message = "Poin anda kurang untuk mendapatkan sertifikat.";

                if (totalPointsOverall >= 100)
                {
                    message = await CreateCertificate(member.User.Name, member.ExtracurricularId, member.UserId);
                    
                }


                var createdReport = await _context.ActivityReports
                    .Where(r => r.Id == report.Id)
                    .Select(r => new
                    {
                        r.Id,
                        r.ScheduleId,
                        Schedule = new
                        {
                            r.Schedule.Title,
                            r.Schedule.Description,
                            r.Schedule.ScheduleDate,
                            r.Schedule.Location
                        },
                        Extracurricular = new
                        {
                            r.Schedule.Extracurricular.Id,
                            r.Schedule.Extracurricular.Name
                        },
                        r.ReportTitle,
                        r.ReportText,
                        r.FileUrl,
                        r.SubmittedAt,
                        Member = new
                        {
                            member.Id,
                            User = new
                            {
                                member.User.Id,
                                member.User.Name,
                                member.User.ProfileUrl
                            }
                        },
                        PointsEarned = 3,
                        TotalPointsOverall = totalPointsOverall,
                        CertificateMessage = message
                    })
                    .FirstOrDefaultAsync();

                return Ok(new ApiResponse<object>(201, "Laporan berhasil dibuat", createdReport));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<object>(500, "Terjadi kesalahan saat membuat laporan", null));
            }
        }

        internal async Task<string> CreateCertificate(string name, int? extracurricularId, int? userId)
        {
            var cert = _context.Certificates.Any(c => c.MemberId == userId && c.CertificateName.Contains("Keaktifan"));

            if (cert)
            {
                return "Anda sudah mendapatkan sertifikat keaktifan sebelumnya.";
            }

            var result = await _certificateService.GenerateCertificateWithRecordAsync(name, extracurricularId, userId);

            if (result.Status == "success")
            {
                return result.Message;
            }
            else
            {
                return "Poin anda kurang untuk mendapatkan sertifikat.";
            }
        }

        public class PostAttendanceRequest
        {
            public int ScheduleId { get; set; }
            public string Status { get; set; } = string.Empty;
        }

        public class PostReportRequest
        {
            public int ScheduleId { get; set; }
            public string ReportTitle { get; set; } = string.Empty;
            public string ReportText { get; set; } = string.Empty;
        }

    }
}
