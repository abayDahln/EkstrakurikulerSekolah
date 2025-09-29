using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using EkstrakurikulerSekolah.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EkstrakurikulerSekolah.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RegisterController : ControllerBase
    {
        private readonly EkskulDbContext _context;

        public RegisterController(EkskulDbContext context)
        {
            _context = context;
        }

        public class RegisterRequest()
        {
            public string Name { get; set; } = null!;
            public string Email { get; set; } = null!;
            public string Password { get; set; } = null!;

        }

        public static string HashPassword(string password)
        {
            var sb = new StringBuilder();

            using (var sha512 = SHA512.Create())
            {
                var bytes = sha512.ComputeHash(Encoding.UTF8.GetBytes(password));

                for (int i = 0; i < bytes.Length; i++)
                {
                    sb.Append(bytes[i].ToString("x2"));
                }
            }

            string result = sb.ToString();


            return result;
        }

        [HttpPost("siswa")]
        public async Task<IActionResult> RegisterSiswa([FromBody] RegisterRequest dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Email) || string.IsNullOrWhiteSpace(dto.Password))
                return BadRequest(new ApiResponse<object>(400, "data harus di isi"));

            Regex email = new Regex(@"^+.+@.+\..+$");

            if (!email.IsMatch(dto.Email))
            {
                return BadRequest(new ApiResponse<object>(400, "format email salah"));
            }

            var EmailExisting = await _context.Users.FirstOrDefaultAsync(s => s.Email == dto.Email && s.Role == "siswa");
            if (EmailExisting != null)
            {
                return Conflict(new ApiResponse<object>(409, "Email sudah digunakan"));
            }
           
            string pw = HashPassword(dto.Password);
            var student = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                PasswordHash = pw,
                Role = "siswa",
                CreatedAt = DateTime.Now,
            };
            _context.Users.Add(student);

            await _context.SaveChangesAsync();
            return Ok(new ApiResponse<object>(201, "success", new { student.Name, student.Email }));
        }

    }
}
