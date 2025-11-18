using System;
using System.IO;
using System.Security.Claims;
using EkstrakurikulerSekolah.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SixLabors.Fonts;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Drawing.Processing;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp.Processing;

[Route("api/certificate")]
[ApiController]
public class CertificateController : ControllerBase
{
    private readonly EkskulDbContext _context;
    public CertificateController(EkskulDbContext context)
    {
        _context = context;
    }
    [Authorize(Roles = "siswa")]
    [HttpGet]
    public async Task<IActionResult> GetCertificates([FromQuery] string? search)
    {
        try
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdString) || !int.TryParse(userIdString, out var userId))
            {
                return Unauthorized(new ApiResponse<object>(401, "Unauthorized", null));
            }

            var certificates = await _context.Certificates
                .Include(c => c.Member)
                    .ThenInclude(m => m.User) 
                .Include(c => c.Member)
                    .ThenInclude(m => m.Extracurricular) 
                .Where(c => c.Member.UserId == userId &&
                           (string.IsNullOrEmpty(search) ||
                            c.CertificateName.Contains(search) ||
                            c.Member.Extracurricular.Name.Contains(search)))
                .Select(c => new
                {
                    c.Id,
                    c.CertificateName,
                    UserName = c.Member.User.Name, 
                    ExtracurricularName = c.Member.Extracurricular.Name,
                    c.CertificateUrl,
                    c.IssuedAt
                })
                .ToListAsync();

            return Ok(new ApiResponse<object>(200, "success", certificates));
        }
        catch (Exception ex)
        {
            return StatusCode(500, new ApiResponse<object>(500, $"Internal server error: {ex.Message}", null));
        }
    }

    public class testRequest()
    {
        public int userId { get; set; }
        public int ekskulId { get; set; }
        public string title { get; set; }
        public int point { get; set; }
    }

    [Authorize(Roles = "pembina")]
    [HttpPost("test-point")]
    public IActionResult Generate([FromBody] testRequest req)
    {
        var b = _context.Members
            .Include(m => m.User)
            .Include(m => m.Extracurricular)
            .FirstOrDefault(m => m.UserId == req.userId && m.ExtracurricularId == req.ekskulId);

        var a = new EkstrakurikulerSekolah.Models.Point()
        {
            MemberId = b.Id,
            Points = req.point,
            Title = req.title,
            CreatedAt = DateTime.Now
        };

        _context.Points.Add(a);
        _context.SaveChanges();
        return Ok("success");
    }

        //[HttpPost("generate")]
        //public IActionResult GenerateCertificate([FromBody] CertificateRequest request)
        //{
        //    if (!System.IO.File.Exists(_templatePath))
        //        return NotFound("Template sertifikat tidak ditemukan.");
        //    if (!System.IO.File.Exists(_fontPathName))
        //        return NotFound("Font tidak ditemukan di wwwroot/font.");
        //    if (!System.IO.File.Exists(_fontPathDesc))
        //        return NotFound("Font tidak ditemukan di wwwroot/font.");
        //    if (!Directory.Exists(_outputFolder))
        //        Directory.CreateDirectory(_outputFolder);

        //    using var image = Image.Load<Rgba32>(_templatePath);

        //    var fc = new FontCollection();
        //    var greatVibes = fc.Add(_fontPathName);
        //    var regularFont = fc.Add(_fontPathDesc);

        //    var nameFont = greatVibes.CreateFont(200, FontStyle.Regular);
        //    var descFont = regularFont.CreateFont(30, FontStyle.Regular);

        //    string nameText = request.RecipientName ?? "";
        //    string descText = $"Atas partisipasi aktif dalam mengikuti kegiatan ekstrakurikuler {request.ExtracurricularName} selama belajar di sekolah.";

        //    float centerX = image.Width / 2f;

        //    var textOptions = new TextOptions(nameFont);
        //    var nameSize = TextMeasurer.MeasureSize(nameText, textOptions);
        //    var descSize = TextMeasurer.MeasureSize(descText, new TextOptions(descFont));

        //    const float yName = 560;
        //    const float yDesc = 830;

        //    image.Mutate(ctx =>
        //    {
        //        ctx.DrawText(nameText, nameFont, Color.Parse("#bb8331"), new PointF(centerX - nameSize.Width / 2f, yName));
        //        ctx.DrawText(descText, descFont, Color.Black, new PointF(centerX - descSize.Width / 2f, yDesc));
        //    });

        //    var safeName = string.IsNullOrWhiteSpace(nameText) ? "certificate" : string.Concat(nameText.Split(Path.GetInvalidFileNameChars())).Replace(" ", "_");
        //    var fileName = $"{safeName}_{Guid.NewGuid():N}.png";
        //    var outputPath = Path.Combine(_outputFolder, fileName);
        //    image.Save(outputPath);

        //    var fileUrl = $"public/certificate/{fileName}";
        //    return Ok(new { message = "Sertifikat berhasil dibuat", fileUrl });
        //}

        //public class CertificateRequest
        //{
        //    public string RecipientName { get; set; }
        //    public string ExtracurricularName { get; set; }
        //}


    }
