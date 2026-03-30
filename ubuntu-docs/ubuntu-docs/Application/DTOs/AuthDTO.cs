using System.ComponentModel.DataAnnotations;

namespace ubuntu_docs.Application.DTOs
{
    public class AuthDTO
    {
        [Required]
        public required string email { get; set; }

        [Required]
        public required string password { get; set; }
    }
}
