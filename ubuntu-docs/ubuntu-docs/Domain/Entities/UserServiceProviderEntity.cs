namespace ubuntu_docs.Domain.Entities
{
    public class UserServiceProviderEntity : BaseEntity
    {
        public required Guid UserId { get; set; }
        public UserEntity User { get; set; }

        public required Guid ServiceProviderId { get; set; }
        public ServiceProviderEntity ServiceProvider { get; set; }

        public bool IsActive { get; set; } = true;
    }
}
