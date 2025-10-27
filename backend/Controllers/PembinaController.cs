using System;
using System.Linq;
using System.Security.Claims;
using EkstrakurikulerSekolah.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EkstrakurikulerSekolah.Controllers
{
    [ApiController]
    [Route("api/pembina")]
    [Authorize(Roles = "pembina")]
    public class PembinaController : ControllerBase
    {
        private readonly EkskulDbContext _context;
        private readonly IWebHostEnvironment _environment;
        private readonly string _outputFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "public", "certificate");

        public PembinaController(EkskulDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }
        private int GetPembinaId()
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdString) || !int.TryParse(userIdString, out var userId))
                throw new UnauthorizedAccessException("User tidak terautentikasi");

            return userId;
        }

        [HttpPost("certificate")]
        public async Task<IActionResult> UploadCertificate(IFormFile image,[FromForm] string name)
        {
            try
            {
                if (image == null || image.Length == 0)
                    return BadRequest(new ApiResponse<object>(400, "File sertifikat harus diunggah", null));

                if (string.IsNullOrWhiteSpace(name))
                    return BadRequest(new ApiResponse<object>(400, "Nama penerima harus diisi", null));

                var allowedExtensions = new[] { ".png" };
                var fileExtension = Path.GetExtension(image.FileName).ToLowerInvariant();
                if (!allowedExtensions.Contains(fileExtension))
                    return BadRequest(new ApiResponse<object>(400, "Format file harus PNG", null));

                const long maxFileSize = 15 * 1024 * 1024;
                if (image.Length > maxFileSize)
                    return BadRequest(new ApiResponse<object>(400, "Ukuran file maksimal 15MB", null));

                if (!Directory.Exists(_outputFolder))
                    Directory.CreateDirectory(_outputFolder);

                var safeName = string.Concat(name.Split(Path.GetInvalidFileNameChars())).Replace(" ", "_");
                var fileName = $"{safeName}_{Guid.NewGuid():N}.png";
                var outputPath = Path.Combine(_outputFolder, fileName);

                using var stream = System.IO.File.Create(outputPath);
                await image.CopyToAsync(stream);

                var fileUrl = $"public/certificate/{fileName}";
                return Ok(new ApiResponse<object>(200, "Sertifikat berhasil diunggah", new { fileUrl }));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<object>(500, "Terjadi kesalahan saat mengunggah sertifikat", null));
            }
        }

        private async Task<List<int>> GetPembinaExtracurricularIds()
        {
            var pembinaId = GetPembinaId(); 
            return await _context.Extracurriculars
                .Where(e => e.PembinaId == pembinaId)
                .Select(e => e.Id)
                .ToListAsync();
        }

        public class ScheduleRequest
        {
            public int ExtracuriculaId { get; set; }
            public string Title { get; set; }
            public string Description { get; set; } 
            public DateTime ScheduleDate { get; set; }
            public string Location { get; set; } 

        }

        [HttpPost("schedule")]
        public async Task<IActionResult> AddSchedule([FromBody] ScheduleRequest req)
        {
            try
            {
                if (req == null)
                    return BadRequest(new ApiResponse<object>(400, "Request tidak valid", null));

                if (req.ExtracuriculaId <= 0)
                    return BadRequest(new ApiResponse<object>(400, "Extracurricular ID tidak valid", null));

                if (string.IsNullOrWhiteSpace(req.Title))
                    return BadRequest(new ApiResponse<object>(400, "Title harus diisi", null));

                if (string.IsNullOrWhiteSpace(req.Description))
                    return BadRequest(new ApiResponse<object>(400, "Description harus diisi", null));

                if (string.IsNullOrWhiteSpace(req.Location))
                    return BadRequest(new ApiResponse<object>(400, "Location harus diisi", null));

                if (req.ScheduleDate == default)
                    return BadRequest(new ApiResponse<object>(400, "Schedule date harus diisi", null));

                if (req.ScheduleDate <= DateTime.Now)
                    return BadRequest(new ApiResponse<object>(400, "Schedule date harus di masa depan", null));

                var pembinaId = GetPembinaId();
                var pembinaExtracurricularIds = await GetPembinaExtracurricularIds();

                if (!pembinaExtracurricularIds.Any(id => id == req.ExtracuriculaId))
                {
                    return BadRequest(new ApiResponse<object>(400, "Tidak ada akses ke ekskul ini", null));
                }

                var schedule = new Schedule
                {
                    ExtracurricularId = req.ExtracuriculaId,
                    Title = req.Title,
                    Description = req.Description,
                    ScheduleDate = req.ScheduleDate,
                    Location = req.Location,
                    CreatedBy = pembinaId
                };

                _context.Schedules.Add(schedule);
                await _context.SaveChangesAsync();

                return Ok(new ApiResponse<object>(200, "Schedule berhasil ditambahkan", new
                {
                    schedule.Id,
                    schedule.ExtracurricularId,
                    schedule.Title,
                    schedule.Description,
                    schedule.ScheduleDate,
                    schedule.Location,
                    schedule.CreatedBy
                }));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<object>(500, "Terjadi kesalahan internal server", null));
            }
        }

        public class DocumentationRequest
        {
            public int ScheduleId { get; set; }
            public string? Title { get; set; }
        }


        [HttpPost("documentation")]
        public async Task<IActionResult> UploadDocumentation(IFormFile File, [FromForm] DocumentationRequest req)
        {
            try
            {
                var pembinaId = GetPembinaId(); 
                var pembinaExtracurricularIds = await GetPembinaExtracurricularIds();

               
                var schedule = await _context.Schedules
                    .Include(s => s.Extracurricular)
                    .FirstOrDefaultAsync(s => s.Id == req.ScheduleId &&
                                             pembinaExtracurricularIds.Any(x => x == s.ExtracurricularId));

                if (schedule == null)
                    return NotFound(new ApiResponse<object>(404, "Jadwal tidak ditemukan atau tidak ada akses", null));

              
                if (File == null || File.Length == 0)
                    return BadRequest(new ApiResponse<object>(400, "File tidak valid", null));

                if (File.Length > 10 * 1024 * 1024)
                    return BadRequest(new ApiResponse<object>(400, "Ukuran file maksimal 10MB", null));

               
                var allowedExtensions = new[] { ".png", ".jpg", ".jpeg" };
                var fileExtension = Path.GetExtension(File.FileName).ToLower();
                if (!allowedExtensions.Contains(fileExtension))
                    return BadRequest(new ApiResponse<object>(400, "Format file tidak didukung", null));

                string fileName = null;

                try
                {
                   
                    fileName = $"{Guid.NewGuid():N}{fileExtension}";
                    var folderPath = Path.Combine(_environment.WebRootPath, "public", "documentation");
                    Directory.CreateDirectory(folderPath);

                    var fullPath = Path.Combine(folderPath, fileName);

                    
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                        await File.CopyToAsync(stream);

                    var documentation = new ActivityDocumentation
                    {
                        UserId = pembinaId, 
                        ScheduleId = req.ScheduleId, 
                        DocumentationTitle = req.Title,
                        FileUrl = $"public/documentation/{fileName}",
                        SubmittedAt = Convert.ToDateTime(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"))
                    };

                    _context.ActivityDocumentations.Add(documentation);
                    await _context.SaveChangesAsync();

                    var baseUrl = $"{Request.Scheme}://{Request.Host}";
                    var fullFileUrl = $"{baseUrl}/{documentation.FileUrl}";

                    return Ok(new ApiResponse<object>(201, "Dokumentasi berhasil diupload", new
                    {
                        documentation.Id,
                        documentation.DocumentationTitle,
                        documentation.FileUrl,
                        FullFileUrl = fullFileUrl,
                        documentation.SubmittedAt,
                        Schedule = new
                        {
                            schedule.Id,
                            schedule.Title,
                            Extracurricular = new
                            {
                                schedule.Extracurricular.Id,
                                schedule.Extracurricular.Name,
                                schedule.Extracurricular.ImageUrl
                            }
                        }
                    }));
                }
                catch (Exception ex)
                {
                    if (!string.IsNullOrEmpty(fileName))
                    {
                        try
                        {
                            var newFilePath = Path.Combine(_environment.WebRootPath, "public", "documentation", fileName);
                            if (System.IO.File.Exists(newFilePath))
                                System.IO.File.Delete(newFilePath);
                        }
                        catch (Exception cleanupEx)
                        {
                            Console.WriteLine($"Error cleanup: {cleanupEx.Message}");
                        }
                    }
                    throw;
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<object>(500, "Terjadi kesalahan saat upload dokumentasi", null));
            }
        }

        [HttpGet("my-extracurricular")]
        public async Task<IActionResult> GetEkskulSaya()
        {
            try
            {
                var pembinaId = GetPembinaId();

                var ekskulList = await _context.Extracurriculars
                    .Where(e => e.PembinaId == pembinaId)
                    .Select(e => new
                    {
                        e.Id,
                        e.Name,
                        e.Description,
                        e.ImageUrl,
                        TotalSiswa = e.Members.Count(m => m.Status == "active"),
                        TotalJadwal = e.Schedules.Count,
                        Pembina = new
                        {
                            e.Pembina.Id,
                            e.Pembina.Name
                        }
                    })
                    .ToListAsync();

                return Ok(new ApiResponse<object>(200, "success", ekskulList));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<object>(500, "Terjadi kesalahan saat mengambil data ekskul", null));
            }
        }

        [HttpGet("member/{extracurricularId}")]
        public async Task<IActionResult> GetSiswa(int extracurricularId) 
        {
            try
            {
                var pembinaId = GetPembinaId();
                var pembinaExtracurricularIds = await GetPembinaExtracurricularIds();

                if (!pembinaExtracurricularIds.Any(id => id == extracurricularId))
                {
                    return BadRequest(new ApiResponse<object>(400, "Tidak ada akses ke ekskul ini", null));
                }

                var siswaList = await _context.Members
                    .Where(m => m.Status == "active" &&
                               m.ExtracurricularId == extracurricularId && 
                               pembinaExtracurricularIds.Any(id => id == m.ExtracurricularId))
                    .Select(m => new
                    {
                        MemberId = m.Id,
                        UserId = m.User.Id,
                        Name = m.User.Name,
                        Email = m.User.Email,
                        ProfileUrl = m.User.ProfileUrl,
                        Extracurricular = new
                        {
                            m.Extracurricular.Id,
                            m.Extracurricular.Name
                        },
                        JoinDate = m.JoinDate,
                        Status = m.Status,
                        TotalAttendances = _context.Attendances.Count(a => a.MemberId == m.Id),
                        TotalReports = _context.ActivityReports.Count(r => r.MemberId == m.Id),
                        TotalPoints = _context.Points.Where(p => p.MemberId == m.Id).Sum(p => (int?)p.Points) ?? 0
                    })
                    .ToListAsync();

                return Ok(new ApiResponse<object>(200, "success", siswaList));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<object>(500, "Terjadi kesalahan saat mengambil data siswa", null));
            }
        }
        [HttpGet("schedule")]
        public async Task<IActionResult> GetSchedules()
        {
            try
            {
                var pembinaId = GetPembinaId();
                var pembinaExtracurricularIds = await GetPembinaExtracurricularIds();

                var schedules = await _context.Schedules
                    .Where(s => pembinaExtracurricularIds.Any(id => id == s.ExtracurricularId))
                    .Include(s => s.Extracurricular)
                    .OrderBy(s => s.ScheduleDate)
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
                            s.Extracurricular.ImageUrl
                        }
                    })
                    .ToListAsync();
                return Ok(new ApiResponse<object>(200, "success", schedules));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<object>(500, "Terjadi kesalahan saat mengambil data", null));
            }
        }

        [HttpGet("schedule/{scheduleId}")]
        public async Task<IActionResult> GetScheduleDetail(int scheduleId, [FromQuery] string? search)
        {
            try
            {
                var pembinaId = GetPembinaId();
                var pembinaExtracurricularIds = await GetPembinaExtracurricularIds();

                var schedule = await _context.Schedules
                    .Include(s => s.Extracurricular)
                    .FirstOrDefaultAsync(s => s.Id == scheduleId &&
                                             pembinaExtracurricularIds.Any(x => x == s.ExtracurricularId));

                if (schedule == null)
                    return NotFound(new ApiResponse<object>(404, "Jadwal tidak ditemukan atau tidak ada akses", null));


                var members = await _context.Members
                    .Where(m => m.ExtracurricularId == schedule.ExtracurricularId && m.Status == "active")
                    .Include(m => m.User).ToListAsync();

                if (!string.IsNullOrEmpty(search))
                    members = members.Where(x => x.User.Name.ToLower().Contains(search.ToLower())).ToList();
    

                var attendances = await _context.Attendances
                    .Where(a => a.ScheduleId == scheduleId)
                    .ToListAsync();

                var attendanceData = members.Select(member =>
                {
                    var attendance = attendances.FirstOrDefault(a => a.MemberId == member.Id);
                    return new
                    {
                        MemberId = member.Id,
                        UserId = member.User.Id,
                        Name = member.User.Name,
                        ProfileUrl = member.User.ProfileUrl,
                        Status = attendance?.Status ?? "alfa",
                        AttendanceTime = attendance?.AttendanceTime,
                        IsPresent = attendance?.Status == "hadir"
                    };
                }).ToList();

                return Ok(new ApiResponse<object>(200, "success", new
                {
                    Schedule = new
                    {
                        schedule.Id,
                        schedule.Title,
                        schedule.ScheduleDate,
                        schedule.Location,
                        Extracurricular = new
                        {
                            schedule.Extracurricular.Id,
                            schedule.Extracurricular.Name
                        }
                    },
                    AttendanceSummary = new
                    {
                        TotalMembers = members.Count,
                        Present = attendanceData.Count(a => a.Status == "hadir"),
                        Sick = attendanceData.Count(a => a.Status == "sakit"),
                        Izin = attendanceData.Count(a => a.Status == "izin"),
                        Alpha = attendanceData.Count(a => a.Status == "alfa")
                    },
                    AttendanceData = attendanceData,
                    ReportData = await _context.ActivityReports
                        .Where(r => r.ScheduleId == scheduleId)
                        .Include(r => r.Member)
                        .ThenInclude(m => m.User)
                        .Select(r => new
                        {
                            r.Id,
                            r.ReportTitle,
                            r.ReportText,
                            UserId = r.Member.User.Id,
                            MemberName = r.Member.User.Name,
                            Profile = r.Member.User.ProfileUrl,
                            r.SubmittedAt
                        })
                        .ToListAsync(),
                    DocumentatioData = await _context.ActivityDocumentations
                        .Where(d => d.ScheduleId == scheduleId)
                        .Include(d => d.User)
                        .Select(d => new
                        {
                            d.Id,
                            d.DocumentationTitle,
                            d.FileUrl,
                            UserId = d.User.Id,
                            UserName = d.User.Name,
                            Profile = d.User.ProfileUrl,
                            d.SubmittedAt
                        })
                        .ToListAsync()
                }));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<object>(500, "Terjadi kesalahan saat mengambil data", null));
            }
        }

        [HttpGet("dashboard/{extracurricularId}")]
        public async Task<IActionResult> GetDashboardByEkskul(int extracurricularId)
        {
            try
            {
                var pembinaId = GetPembinaId();
                var pembinaExtracurricularIds = await GetPembinaExtracurricularIds();

                if (!pembinaExtracurricularIds.Any(id => id == extracurricularId))
                {
                    return BadRequest(new ApiResponse<object>(400, "Tidak ada akses ke ekskul ini", null));
                }

                var dashboardData = new
                {
                    Ekskul = await _context.Extracurriculars
                        .Where(e => e.Id == extracurricularId)
                        .Select(e => new
                        {
                            e.Id,
                            e.Name,
                            e.Description,
                            e.ImageUrl,
                            TotalMember = e.Members.Count(m => m.Status == "active"),
                            TotalJadwal = e.Schedules.Count
                        })
                        .FirstOrDefaultAsync(),

                    ListJadwal = await _context.Schedules
                        .Where(s => s.ExtracurricularId == extracurricularId)
                        .OrderBy(s => s.ScheduleDate)
                        .Take(5)
                        .Select(s => new
                        {
                            s.Id,
                            s.Title,
                            s.ScheduleDate,
                            s.Location,
                            ExpectedAttendees = s.Extracurricular.Members.Count(m => m.Status == "active")
                        })
                        .ToListAsync(),

                    ListMember = await _context.Members
                        .Where(m => m.ExtracurricularId == extracurricularId && m.Status == "active")
                        .OrderByDescending(m => m.JoinDate)
                        .Select(m => new
                        {
                            m.User.Name,
                            m.User.ProfileUrl,
                            m.JoinDate
                        })
                        .ToListAsync()
                };

                return Ok(new ApiResponse<object>(200, "success", dashboardData));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<object>(500, "Terjadi kesalahan saat mengambil data dashboard", null));
            }
        }

    }
}