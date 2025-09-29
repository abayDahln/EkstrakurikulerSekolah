using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using EkstrakurikulerSekolah.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace EkstrakurikulerSekolah.Controllers
{
    [ApiController]
    [Route("api/login")]
    public class LoginController : ControllerBase
    {
        private readonly EkskulDbContext _context;
        private readonly IConfiguration _configuration;
        public LoginController(EkskulDbContext context, IConfiguration config)
        {
            _context = context;
            _configuration = config;
        }

        public class LoginDto
        {
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
                ExpireaAt = DateTime.UtcNow.AddMinutes(120)
            };
            return Ok(new ApiResponse<object>(200, "success", responseData));
        }
        [HttpPost("pembina")]
        public async Task<IActionResult> LoginPembina(LoginDto dto)
        {
            var siswa = await _context.Users.FirstOrDefaultAsync(x => x.Role == "pembina" && x.Email == dto.Email && x.PasswordHash == dto.Password);

            if (siswa == null)
                return Unauthorized(new ApiResponse<object>(401, "invalid username or password"));


            var claims = new[] {
                new Claim(ClaimTypes.Name, siswa.Name),
                new Claim(ClaimTypes.Role, "pembina"),
                new Claim(ClaimTypes.NameIdentifier, siswa.Id.ToString()),
            };

            var responseData = new
            {
                Token = GenerateJwtToken(claims),
                Role = "siswa",
                ExpireaAt = DateTime.UtcNow.AddMinutes(120)
            };
            return Ok(new ApiResponse<object>(200, "success", responseData));
        }

        private string GenerateJwtToken(IEnumerable<Claim> claims)
        {
            var jwtSettings = _configuration.GetSection("Jwt");
            var key = Encoding.ASCII.GetBytes(jwtSettings["Key"]!);

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokendesciptor = new SecurityTokenDescriptor
            {
                Subject = new System.Security.Claims.ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(30),
                Issuer = jwtSettings["Issuer"],
                Audience = jwtSettings["Audience"],
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokendesciptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
