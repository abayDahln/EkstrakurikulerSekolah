using System.Security.Claims;
using System.Text.RegularExpressions;
using EkstrakurikulerSekolah.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EkstrakurikulerSekolah.Controllers
{
    [ApiController]
    [Route("api/profile")]
    [Authorize]
    public class ProfileController : ControllerBase
    {
        private readonly EkskulDbContext _context;
        private readonly IWebHostEnvironment _env;

        public ProfileController(EkskulDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        [HttpGet]
        public async Task<IActionResult> GetProfile()
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdString) || !int.TryParse(userIdString, out var userId))
                return Unauthorized();

            var user = await _context.Users
                .Where(u => u.Id == userId)
                .Select(u => new
                {
                    u.Id,
                    u.Name,
                    u.Email,
                    u.ProfileUrl,
                    u.Role,
                    u.CreatedAt,
                 
                    Extracurriculars = u.Members
                        .Where(m => m.Status == "active")
                        .Select(m => new
                        {
                            m.Extracurricular.Id,
                            m.Extracurricular.Name,
                            m.Extracurricular.Description,
                            JoinDate = m.JoinDate,
                            Status = m.Status,
                            Pembina = new
                            {
                                Id = m.Extracurricular.PembinaId,
                                Name = _context.Users
                                    .Where(p => p.Id == m.Extracurricular.PembinaId)
                                    .Select(p => p.Name)
                                    .FirstOrDefault()
                            }
                        }).ToList(),

                    ActivityStats = new
                    {
                        TotalAttendances = _context.Attendances
                        .Count(a => _context.Members
                            .Any(m => m.Id == a.MemberId && m.UserId == userId)),
                                        TotalReports = _context.ActivityReports
                        .Count(r => _context.Members
                            .Any(m => m.Id == r.MemberId && m.UserId == userId)),
                                        TotalDocumentations = _context.ActivityDocumentations
                        .Count(d => d.UserId == userId),
                                        JoinedExtracurriculars = u.Members.Count(m => m.Status == "active"),
                                        CreatedSchedules = u.Schedules.Count(),
                                        // Total poin dari tabel points - melalui member
                                        TotalPoints = u.Members
                        .SelectMany(m => m.Point)
                        .Sum(p => p.Points)
                    },

                    RecentActivities = _context.Attendances
                        .Where(a => _context.Members.Any(m => m.Id == a.MemberId && m.UserId == userId))
                        .OrderByDescending(a => a.AttendanceTime)
                        .Take(15)
                        .Select(a => new
                        {
                            Type = "Attendance",
                            ScheduleTitle = a.Schedule.Title,
                            Extracurricular = a.Schedule.Extracurricular.Name,
                            Status = a.Status,
                            Date = a.AttendanceTime,
                            Location = a.Schedule.Location
                        })
                        .ToList(),
                    PointDetails = u.Members
                        .SelectMany(m => m.Point)
                        .OrderByDescending(p => p.CreatedAt)
                        .Select(p => new
                        {
                            p.Id,
                            p.Points,
                            p.Title,
                            p.CreatedAt,
                            Extracurricular = p.Member.ExtracurricularId != null ? new
                            {
                                Id = p.Member.ExtracurricularId,
                                Name = _context.Extracurriculars
                                    .Where(e => e.Id == p.Member.ExtracurricularId)
                                    .Select(e => e.Name)
                                    .FirstOrDefault()
                            } : null
                        })
                        .ToList()
                })
                .FirstOrDefaultAsync();

            if (user == null)
                return NotFound(new ApiResponse<object>(404, "User tidak ditemukan", null));

            return Ok(new ApiResponse<object>(200, "success", user));
        }

        [HttpPut]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileRequest request)
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdString) || !int.TryParse(userIdString, out var userId))
                return Unauthorized();

            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                return NotFound(new ApiResponse<object>(404, "User tidak ditemukan", null));

            
            if (request == null)
                return BadRequest(new ApiResponse<object>(400, "Data request tidak valid", null));

           
            if (!string.IsNullOrEmpty(request.Name))
            {
                if (request.Name.Length > 100)
                    return BadRequest(new ApiResponse<object>(400, "Nama maksimal 100 karakter", null));

                user.Name = request.Name;
            }

         
            if (!string.IsNullOrEmpty(request.Email))
            {
                if (request.Email.Length > 255)
                    return BadRequest(new ApiResponse<object>(400, "Email maksimal 255 karakter", null));

                
                var emailExists = await _context.Users
                    .AnyAsync(u => u.Email == request.Email && u.Id != userId);

                if (emailExists)
                    return Conflict(new ApiResponse<object>(409, "Email sudah digunakan", null));

                Regex email = new Regex(@"^+.+@.+\..+$");

                if (!email.IsMatch(request.Email))
                {
                    return BadRequest(new ApiResponse<object>(400, "format email salah"));
                }


                user.Email = request.Email;
            }

            try
            {
                _context.Users.Update(user);
                await _context.SaveChangesAsync();

                return Ok(new ApiResponse<object>(200, "Profile berhasil diupdate", new
                {
                    user.Name,
                    user.Email
                }));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<object>(500, "Terjadi kesalahan saat update profile", null));
            }
        }

        [HttpPut("photo")]
        public async Task<IActionResult> UpdateProfilePhoto(IFormFile image)
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdString) || !int.TryParse(userIdString, out var userId))
                return Unauthorized();

            if (image == null || image.Length <= 0)
                return BadRequest(new ApiResponse<object>(400, "File tidak valid", null));

            if (image.Length > 10 * 1024 * 1024)
                return BadRequest(new ApiResponse<object>(400, "Ukuran file maksimal 10MB", null));

            var allowedExtensions = new[] { ".png", ".jpg", ".jpeg" };
            var fileExtension = Path.GetExtension(image.FileName).ToLower();
            if (!allowedExtensions.Contains(fileExtension))
                return BadRequest(new ApiResponse<object>(400, "Format file tidak didukung. Gunakan PNG, JPG, atau JPEG", null));

            var allowedMimeTypes = new[] { "image/png", "image/jpeg", "image/jpg" };
            if (!allowedMimeTypes.Contains(image.ContentType.ToLower()))
                return BadRequest(new ApiResponse<object>(400, "Tipe file tidak didukung", null));

            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                return NotFound(new ApiResponse<object>(404, "User tidak ditemukan", null));

            string oldFileName = null;
            string newFileName = null;

            try
            {
                // Simpan nama file lama
                if (!string.IsNullOrEmpty(user.ProfileUrl))
                    oldFileName = Path.GetFileName(user.ProfileUrl);

                // Generate nama file baru
                newFileName = $"{Guid.NewGuid().ToString().Split('-')[0]}{fileExtension}";
                var folderPath = Path.Combine(_env.WebRootPath, "public", "profile");
                Directory.CreateDirectory(folderPath);

                var fullPath = Path.Combine(folderPath, newFileName);

                // Simpan file baru
                using (var stream = new FileStream(fullPath, FileMode.Create))
                    await image.CopyToAsync(stream);

                // Update database
                user.ProfileUrl = $"public/profile/{newFileName}";
                _context.Users.Update(user);
                await _context.SaveChangesAsync();

                // Hapus file lama
                if (!string.IsNullOrEmpty(oldFileName))
                {
                    try
                    {
                        var oldFilePath = Path.Combine(folderPath, oldFileName);
                        if (System.IO.File.Exists(oldFilePath))
                            System.IO.File.Delete(oldFilePath);
                    }
                    catch (Exception deleteEx)
                    {
                        Console.WriteLine($"Warning: Gagal hapus file lama: {deleteEx.Message}");
                    }
                }

                var baseUrl = $"{Request.Scheme}://{Request.Host}";
                var fullProfileUrl = $"{baseUrl}/{user.ProfileUrl}";

                return Ok(new ApiResponse<object>(200, "Foto profil berhasil diupdate", new
                {
                    ProfileUrl = user.ProfileUrl,
                    FullProfileUrl = fullProfileUrl
                }));
            }
            catch (Exception ex)
            {
                // Cleanup file baru jika error
                if (!string.IsNullOrEmpty(newFileName))
                {
                    try
                    {
                        var newFilePath = Path.Combine(_env.WebRootPath, "public", "profile", newFileName);
                        if (System.IO.File.Exists(newFilePath))
                            System.IO.File.Delete(newFilePath);
                    }
                    catch (Exception cleanupEx)
                    {
                        Console.WriteLine($"Error cleanup: {cleanupEx.Message}");
                    }
                }

                return StatusCode(500, new ApiResponse<object>(500, "Terjadi kesalahan saat upload foto", null));
            }
        }

    }

    
    public class UpdateProfileRequest
    {
        public string? Name { get; set; }
        public string? Email { get; set; }
    }

    public class UpdateProfilePhotoRequest
    {
        public string ProfileUrl { get; set; } = string.Empty;
    }
}
