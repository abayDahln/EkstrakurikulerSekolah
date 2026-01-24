using System;
using System.IO;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using EkstrakurikulerSekolah.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SixLabors.Fonts;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Drawing.Processing;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp.Processing;

public interface ICertificateService
{
    Task<CertificateResult> GenerateCertificateWithRecordAsync(string name, int? ekskulId, int? studentId);
}

public class CertificateService : ICertificateService
{
    private readonly string _templatePath;
    private readonly string _outputFolder;
    private readonly string _fontPathName;
    private readonly string _fontPathDesc;
    private readonly EkskulDbContext _context;
    private static FontFamily _cachedGreatVibes;
    private static FontFamily _cachedRegularFont;

    public CertificateService(IWebHostEnvironment env, EkskulDbContext context)
    {
        FontCollection _fontCollection = new FontCollection();

        _templatePath = Path.Combine(env.WebRootPath, "template", "certificate-template.png");
        _outputFolder = Path.Combine(env.WebRootPath, "public", "certificate");
        _fontPathName = Path.Combine(env.WebRootPath, "font", "GreatVibes-Regular.ttf");
        _fontPathDesc = Path.Combine(env.WebRootPath, "font", "Quattrocento-Regular.ttf");

        _cachedGreatVibes = _fontCollection.Add(_fontPathName);
        _cachedRegularFont = _fontCollection.Add(_fontPathDesc);

        _context = context;
    }

    public CertificateService(string templatePath, string outputFolder, string fontPathName, string fontPathDesc, EkskulDbContext context)
    {
        _templatePath = templatePath;
        _outputFolder = outputFolder;
        _fontPathName = fontPathName;
        _fontPathDesc = fontPathDesc;
        _context = context;
    }


    public async Task<CertificateResult> GenerateCertificateWithRecordAsync(string name, int? ekskulId, int? studentId)
    {
        return await GenerateCertificateInternalAsync(name, ekskulId, studentId);
    }

    private async Task<CertificateResult> GenerateCertificateInternalAsync(string name, int? ekskulId, int? studentId)
    {
        try
        {
            ValidatePaths();
            ValidateRequest(name, ekskulId);

            using var image = Image.Load<Rgba32>(_templatePath);
            await ProcessCertificateImageAsync(image, name, ekskulId);

            var (fileName, filePath) = SaveCertificateImage(image, name);

            Certificate certificateRecord = null;
            certificateRecord = await CreateCertificateRecordAsync(
                ekskulId,
                studentId,
                fileName
            );
            

            return new CertificateResult
            {
                FileUrl = $"public/certificate/{fileName}",
                Message = "Sertifikat berhasil dibuat",
                Status = "success"
            };
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[CERTIFICATE ERROR] {ex}");
            return new CertificateResult
            {
                Message = $"Gagal membuat sertifikat: {ex.Message}",
                Status = "error"
            };
        }
    }

    private async Task<Certificate> CreateCertificateRecordAsync(int? ekskulId, int? studentId, string fileName)
    {
        var student = await _context.Users.FindAsync(studentId);
        if (student == null)
            throw new ArgumentException($"Student dengan ID {studentId} tidak ditemukan");

        var extracurricular = await _context.Extracurriculars.FindAsync(ekskulId);
        if (extracurricular == null)
            throw new ArgumentException($"Extracurricular tidak ditemukan");

        
        var certificate = new Certificate
        {
            MemberId = _context.Members.Where(x => x.UserId == studentId && x.ExtracurricularId == extracurricular.Id)
               .Select(x => x.Id)
               .FirstOrDefault(),
            CertificateName = "Sertifikat Ekstrakurikuler " + extracurricular.Name + " " + DateTime.Now.Year,
            CertificateUrl = $"public/certificate/{fileName}",
            IssuedAt = Convert.ToDateTime(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"))
        };

        _context.Certificates.Add(certificate);
        await _context.SaveChangesAsync();

        return certificate;
    }

    private void ValidatePaths()
    {
        if (!System.IO.File.Exists(_templatePath))
            throw new FileNotFoundException("Template sertifikat tidak ditemukan.");

        if (!System.IO.File.Exists(_fontPathName))
            throw new FileNotFoundException("Font nama tidak ditemukan.");

        if (!System.IO.File.Exists(_fontPathDesc))
            throw new FileNotFoundException("Font deskripsi tidak ditemukan.");
    }

    private void ValidateRequest(string name, int? ekskulId)
    {
        var ekskul = _context.Extracurriculars.Any(e => e.Id == ekskulId);


        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException("Nama penerima harus diisi.");

        if (!ekskul)
            throw new ArgumentException("Ekstrakurikuler tidak ditemukan.");
    }

    private async Task ProcessCertificateImageAsync(Image<Rgba32> image, string name, int? ekskulId)
    {
        var nameFont = _cachedGreatVibes.CreateFont(200, FontStyle.Regular);
        var descFont = _cachedRegularFont.CreateFont(30, FontStyle.Regular);

        var ekskulName = await _context.Extracurriculars.Where(x => x.Id == ekskulId).Select(x => x.Name).FirstOrDefaultAsync();

        string nameText = name.Trim();
        string descText = $"Atas partisipasi aktif dalam mengikuti kegiatan ekstrakurikuler {ekskulName} selama belajar di sekolah.";

        float centerX = image.Width / 2f;

        var nameSize = TextMeasurer.MeasureSize(nameText, new TextOptions(nameFont));
        var descSize = TextMeasurer.MeasureSize(descText, new TextOptions(descFont));

        const float yName = 560;
        const float yDesc = 830;

        image.Mutate(ctx =>
        {
            ctx.DrawText(nameText, nameFont, Color.Parse("#bb8331"), new PointF(centerX - nameSize.Width / 2f, yName));
            ctx.DrawText(descText, descFont, Color.Black, new PointF(centerX - descSize.Width / 2f, yDesc));
        });
    }

    private (string fileName, string filePath) SaveCertificateImage(Image<Rgba32> image, string recipientName)
    {
        if (!Directory.Exists(_outputFolder))
            Directory.CreateDirectory(_outputFolder);

        string safeName = "certificate";
        if (!string.IsNullOrWhiteSpace(recipientName))
        {
            var name = recipientName.Trim();
            name = string.Concat(name.Split(Path.GetInvalidFileNameChars()));
            name = Regex.Replace(name, "[^A-Za-z0-9_-]", "_");
            if (name.Length > 50) name = name.Substring(0, 50);
            name = name.Trim('_', '-');
            if (!string.IsNullOrWhiteSpace(name))
                safeName = name;
        }

        var fileName = $"{safeName}_{Guid.NewGuid():N}.png";
        var outputPath = Path.Combine(_outputFolder, fileName);

        image.Save(outputPath);

        return (fileName, outputPath);
    }
}

public class CertificateResult
{
    public string Status { get; set; }
    public string Message { get; set; }
    public string FileUrl { get; set; }
}