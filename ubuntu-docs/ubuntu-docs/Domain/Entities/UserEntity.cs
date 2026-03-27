using System.Reflection;

namespace ubuntu_docs.Domain.Entities
{
    public class UserEntity : BaseEntity
    {
        public required string FirstName { get; set; }

        public required string LastName { get; set; }

        public required string Gender { get; set; }

        public required DateTime DateOfBirth { get; set; }

        public required string Email { get; set; }

        public required string PasswordHash { get; set; }

        public required string Role { get; set; }

        public required string Phone { get; set; }

        public required string Province { get; set; }

        public ICollection<UserDocumentEntity> UserDocuments { get; set; }
    }
}
