namespace ubuntu_docs.Application.DTOs
{
    public class UserDto
    {
        public Guid Id { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string Email { get; set; }
        public string Phone { get; set; }

        public string Role { get; set; }
    }

    public class ProviderUserDto
    {
        public Guid Id { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string Email { get; set; }
        public string Phone { get; set; }

        public string Province { get; set; }

        public int DocumentCount { get; set; }
    }
}
