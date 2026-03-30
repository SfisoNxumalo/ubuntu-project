namespace ubuntu_docs.Application.DTOs
{
    public class CreateServiceProviderDto
    {
        public string CompanyName { get; set; }
        public string RegistrationNumber { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }

        public string Password { get; set; }

        public string Address { get; set; }
        public string City { get; set; }
        public string Country { get; set; }

        public string ContactPersonName { get; set; }
        public string LogoUrl { get; set; }
        public string Industry { get; set; }
    }
}
