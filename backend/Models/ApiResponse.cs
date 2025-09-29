using System.Security.Cryptography;
using System.Text;

namespace EkstrakurikulerSekolah.Models
{
    public class ApiResponse<T>
    {
        public string Title { get; set; }
        public int Status { get; set; }
        
        public T? Data { get; set; }

        public ApiResponse(int responseCode, string message, T? data = default)
        {
            
            Title = message;
            Status = responseCode;
            Data = data;
        }

        
    }
}
