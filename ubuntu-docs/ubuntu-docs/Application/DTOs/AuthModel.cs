namespace ubuntu_docs.Application.DTOs
{
    public class AuthModel
    {
        public UserDetailsDto UserDetails { get; set; }
        public string RefreshToken { get; set; }
    }
}
