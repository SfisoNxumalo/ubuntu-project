namespace ubuntu_docs.Domain.Entities
{
    public class ServiceProviderEntity : BaseEntity
    {
        public required string CompanyName { get; set; }
        public required string RegistrationNumber { get; set; }
        public required string Email { get; set; }
        public required string PhoneNumber { get; set; }

        public required string PasswordHash { get; set; }

        public required string Role { get; set; }

        public required string Address { get; set; }
        public required string City { get; set; }
        public required string Country { get; set; }

        public required string ContactPersonName { get; set; }

        public required string LogoUrl { get; set; }

        public required string Industry { get; set; }

        public ICollection<UserDocumentEntity> UserDocuments { get; set; } = new List<UserDocumentEntity>();
        public ICollection<DocumentEntity> Documents { get; set; } = new List<DocumentEntity>();

        public ICollection<UserServiceProviderEntity> UserAccesses { get; set; } = new List<UserServiceProviderEntity>();
    }
}
