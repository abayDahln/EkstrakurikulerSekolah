using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using EkstrakurikulerSekolah.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace EkstrakurikulerSekolah.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly EkskulDbContext _context;
        private readonly IConfiguration _configuration;
        public AuthController(EkskulDbContext context, IConfiguration config)
        {
            _context = context;
            _configuration = config;
        }

        public class LoginDto
        {
            public string Email { get; set; } = null!;
            public string Password { get; set; } = null!;
        }
        public class RegisterRequest
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

        [HttpPost("login/siswa")]
        public async Task<IActionResult> LoginSiswa(LoginDto dto)
        {
            string password = HashPassword(dto.Password);
            var siswa = await _context.Users.FirstOrDefaultAsync(x => x.Role == "siswa" && x.Email == dto.Email && x.PasswordHash == password);

            if (siswa == null)
                return Unauthorized(new ApiResponse<object>(401, "invalid username or password"));


            var claims = new[] {
                new Claim(ClaimTypes.Name, siswa.Name),
                new Claim(ClaimTypes.Role, "siswa"),
                new Claim(ClaimTypes.NameIdentifier, siswa.Id.ToString()),
            };

            var responseData = new
            {
                Token = GenerateJwtToken(claims),
                Role = "siswa",
                ExpiredAt = DateTime.UtcNow.AddMinutes(120)
            };
            return Ok(new ApiResponse<object>(200, "success", responseData));
        }
        [HttpPost("login/pembina")]
        public async Task<IActionResult> LoginPembina(LoginDto dto)
        {
            string password = HashPassword(dto.Password);
            var pembina = await _context.Users.FirstOrDefaultAsync(x => x.Role == "pembina" && x.Email == dto.Email && x.PasswordHash == password);

            if (pembina == null)
                return Unauthorized(new ApiResponse<object>(401, "invalid email or password"));


            var claims = new[] {
                new Claim(ClaimTypes.Name, pembina.Name),
                new Claim(ClaimTypes.Role, "pembina"),
                new Claim(ClaimTypes.NameIdentifier, pembina.Id.ToString()),
            };

            var responseData = new
            {
                Token = GenerateJwtToken(claims),
                Role = "pembina",
                ExpiredAt = DateTime.UtcNow.AddMinutes(120)
            };
            return Ok(new ApiResponse<object>(200, "success", responseData));
        }

        private string GenerateJwtToken(IEnumerable<Claim> claims)
        {
            var jwtSettings = _configuration.GetSection("Jwt");
            var key = Encoding.UTF8.GetBytes(jwtSettings["Key"]!);

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokendesciptor = new SecurityTokenDescriptor
            {
                Subject = new System.Security.Claims.ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(15),
                Issuer = jwtSettings["Issuer"],
                Audience = jwtSettings["Audience"],
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokendesciptor);
            return tokenHandler.WriteToken(token);
        }

        [HttpPost("register/siswa")]
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
                CreatedAt = Convert.ToDateTime(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")),
            };
            _context.Users.Add(student);

            await _context.SaveChangesAsync();
            return Ok(new ApiResponse<object>(201, "success", new { student.Name, student.Email }));
        }
    }
}
