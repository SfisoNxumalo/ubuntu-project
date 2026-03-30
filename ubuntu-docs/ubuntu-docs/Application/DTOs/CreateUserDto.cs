namespace ubuntu_docs.Application.DTOs
{
    public class CreateUserDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }

        public string Email { get; set; }
        public string Password { get; set; }

        public string Phone { get; set; }
        public string Province { get; set; }
    }
}
