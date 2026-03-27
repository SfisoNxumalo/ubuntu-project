namespace ubuntu_docs.Application.DTOs
{
    public class GrantAccessDto
    {
        public Guid UserId { get; set; }
        public Guid ServiceProviderId { get; set; }
    }
}
