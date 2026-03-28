namespace ubuntu_docs.Domain.Entities
{
    public class UserDocumentEntity : BaseEntity
    {
        public required Guid UserId { get; set; }
        public  UserEntity User { get; set; }

        public required Guid DocumentId { get; set; }
        public DocumentEntity Document { get; set; }

        public required Guid ServiceProviderId { get; set; }
        public ServiceProviderEntity ServiceProvider { get; set; }

        public required DateTime AssignedAt { get; set; }
        public required bool IsRead { get; set; } = false;

        public required string ContactPerson {  get; set; }

    }
}
