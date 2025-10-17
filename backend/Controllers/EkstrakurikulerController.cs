using System.Security.Claims;
using EkstrakurikulerSekolah.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EkstrakurikulerSekolah.Controllers
{
    [ApiController]
    [Route("api/extracurricular")]
    [Authorize(Roles = "siswa")]
    public class EkstrakurikulerController : ControllerBase
    {
        private readonly EkskulDbContext _context;
        

        public EkstrakurikulerController(EkskulDbContext context)
        {
            _context = context;
            

        }
        [HttpGet]
        public async Task<IActionResult> GetEkskuls([FromQuery] string? search)
        {

            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdString) || !int.TryParse(userIdString, out var userId))
            {
                return Unauthorized(new ApiResponse<object>(401, "Unauthorized", null));
            }


            var baseQuery = _context.Extracurriculars.AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                var lower = search.ToLower();
                baseQuery = baseQuery.Where(x =>
                    (x.Name ?? "").ToLower().Contains(lower) ||
                    (x.Description ?? "").ToLower().Contains(lower));
            }


            var result = await baseQuery
                .Select(x => new
                {
                    x.Id,
                    x.Name,
                    x.Description,
                    x.ImageUrl,
                    Pembina = new
                    {
                        Id = x.PembinaId,
                        Name = _context.Users.Where(u => u.Id == x.PembinaId)
                            .Select(u => u.Name).FirstOrDefault(),
                        Profile = _context.Users.Where(u => u.Id == x.PembinaId)
                                .Select(u => u.ProfileUrl).FirstOrDefault()
                    },
                    IsMember = x.Members.Any(m => m.UserId == userId)
                })
                .ToListAsync();

            return Ok(new ApiResponse<object>(200, "success", result));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEkskulDetail(int id)
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdString) || !int.TryParse(userIdString, out var userId))
            {
                return Unauthorized(new ApiResponse<object>(401, "Unauthorized", null));
            }

            var ekskul = await _context.Extracurriculars
                .Where(x => x.Id == id)
                .Select(x => new
                {
                    x.Id,
                    x.Name,
                    x.Description,
                    x.ImageUrl,

                    Pembinas = _context.Users.Where(y => y.Id == x.PembinaId)
                        .Select(p => new {
                            Id = p.Id,
                            Name = p.Name,
                            profile = p.ProfileUrl
                        }).ToList(),

                 
                    Members = x.Members
                        .Select(m => new {
                            Id = m.User.Id,
                            Name = m.User.Name,
                            profile = m.User.ProfileUrl
                        }).ToList(),

                   
                    IsMember = x.Members.Any(m => m.UserId == userId)
                })
                .FirstOrDefaultAsync();

            if (ekskul == null)
                return NotFound(new ApiResponse<object>(404, "Ekskul tidak ditemukan", null));

            return Ok(new ApiResponse<object>(200, "success", ekskul));
        }

        [HttpPost("{id}/join")]
        public async Task<IActionResult> JoinEkskul(int id)
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdString) || !int.TryParse(userIdString, out var userId))
            {
                return Unauthorized(new ApiResponse<object>(401, "Unauthorized", null));
            }

            var ekskul = await _context.Extracurriculars
                .FirstOrDefaultAsync(x => x.Id == id);
            if (ekskul == null)
                return NotFound(new ApiResponse<object>(404, "Ekskul tidak ditemukan", null));

            var alreadyMember = await _context.Members
                .AnyAsync(m => m.UserId == userId && m.ExtracurricularId == id);
            if (alreadyMember)
                return BadRequest(new ApiResponse<object>(400, "Kamu sudah join ekskul ini", null));

            var member = new Member
            {
                UserId = userId,
                ExtracurricularId = id,
                JoinDate = DateOnly.FromDateTime(DateTime.Now),
                Status = "active" 
            };

            _context.Members.Add(member);

            await _context.SaveChangesAsync();

            var pointService = new PointService(_context);
            await pointService.AddJoinExtracurricularPoints(member.Id, id);

            return Ok(new ApiResponse<object>(200, "Berhasil join ekskul"));
        }

    }
}
