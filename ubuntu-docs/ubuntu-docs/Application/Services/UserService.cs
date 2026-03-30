using Microsoft.AspNetCore.Identity;
using ubuntu_docs.Application.DTOs;
using ubuntu_docs.Application.Interfaces.IRepositories;
using ubuntu_docs.Application.Interfaces.IServices;
using ubuntu_docs.Domain.Entities;

namespace ubuntu_docs.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly ITokenService _tokenService;



        public UserService(IUserRepository userRepository, ITokenService tokenService)
        {
            _userRepository = userRepository;
            _tokenService = tokenService;
        }

        public async Task<UserDto> CreateUserAsync(CreateUserDto dto)
        {

            var user = new UserEntity
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Gender = dto.Gender,
                DateOfBirth = dto.DateOfBirth,
                Email = dto.Email,
                PasswordHash = dto.Password,
                Phone = dto.Phone,
                Province = dto.Province,
                Role = "User"
            };

            var hasher = new PasswordHasher<UserEntity>();
            user.PasswordHash = hasher.HashPassword(user, user.PasswordHash);

            var createdUser = await _userRepository.CreateAsync(user);

            return MapToDto(createdUser);
        }

        public async Task<UserDto?> GetUserByIdAsync(Guid id)
        {
            var user = await _userRepository.GetByIdAsync(id);

            if (user == null) return null;

            return MapToDto(user);
        }

        public async Task<IEnumerable<UserDto>> GetAllUsersAsync()
        {
            var users = await _userRepository.GetAllAsync();

            return users.Select(u => MapToDto(u));
        }

        public async Task<UserDto?> GetUserByEmailAsync(string email)
        {
            var user = await _userRepository.GetByEmailAsync(email);

            if (user == null) return null;

            return MapToDto(user);
        }

        public async Task<bool> DeleteUserAsync(Guid id)
        {
            var user = await _userRepository.GetByIdAsync(id);

            if (user == null) return false;

            await _userRepository.DeleteAsync(id);

            return true;
        }


        private static UserDto MapToDto(UserEntity user)
        {
            return new UserDto
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Phone = user.Phone,
                Role = user.Role
            };
        }

        public async Task<AuthModel> Login(AuthDTO user)
        {
            
            if (string.IsNullOrWhiteSpace(user.email) || string.IsNullOrWhiteSpace(user.password))
            {
                throw new Exception(
                   string.IsNullOrWhiteSpace(user.email) ? "Email is required" : "Password is required"
                );
            }

            var userFound = await _userRepository.GetByEmailAsync(user.email);

            if (userFound == null) return null;


            var hasher = new PasswordHasher<UserEntity>();
            var result = hasher.VerifyHashedPassword(userFound, userFound.PasswordHash, user.password);

            if (result == PasswordVerificationResult.Failed)
                throw new Exception("Invalid credentials");

            var userLoginDetails = new UserDetailsDto
            {
                Id = userFound.Id,
                Email = userFound.Email,
                FullName = userFound.FirstName + " " + userFound.LastName,
                PhoneNumber = userFound.Phone,
                Role = userFound.Role,
            };

            userLoginDetails.Token = _tokenService.GenerateAccessToken(userLoginDetails);
            var refreshtoken = _tokenService.GenerateRefreshToken(userLoginDetails.Id);

            var userDetails = new AuthModel
            {
                UserDetails = userLoginDetails,
                RefreshToken = refreshtoken
            };

            return userDetails;
        }
    }
}
