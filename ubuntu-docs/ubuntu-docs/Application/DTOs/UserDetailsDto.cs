using System.ComponentModel.DataAnnotations;

namespace ubuntu_docs.Application.DTOs
{
    public class UserDetailsDto
    {
        public Guid Id { get; set; }

        public required string FullName { get; set; }

        [Required]
        public required string Email { get; set; }

        [Required]
        public required string PhoneNumber { get; set; }

        public string Token { get; set; }
        public string Role { get; set; }
    }
}
