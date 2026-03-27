using ubuntu_docs.Application.DTOs;

namespace ubuntu_docs.Application.Interfaces.IServices
{
    public interface IUserService
    {
        Task<UserDto> CreateUserAsync(CreateUserDto dto);

        Task<UserDto?> GetUserByIdAsync(Guid id);

        Task<IEnumerable<UserDto>> GetAllUsersAsync();

        Task<UserDto?> GetUserByEmailAsync(string email);

        Task<bool> DeleteUserAsync(Guid id);
    }
}
