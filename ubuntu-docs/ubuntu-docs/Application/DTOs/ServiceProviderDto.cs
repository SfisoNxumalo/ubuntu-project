namespace ubuntu_docs.Application.DTOs
{
    public class ServiceProviderDto
    {
        public Guid Id { get; set; }
        public string CompanyName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }

        public string City { get; set; }
        public string Country { get; set; }

        public string Industry { get; set; }
    }
}
