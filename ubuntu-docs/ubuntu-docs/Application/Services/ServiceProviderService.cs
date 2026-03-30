using Microsoft.AspNetCore.Identity;
using ubuntu_docs.Application.DTOs;
using ubuntu_docs.Application.Interfaces.IRepositories;
using ubuntu_docs.Application.Interfaces.IServices;
using ubuntu_docs.Domain.Entities;
using ubuntu_docs.Infrastructure.Repositories;

namespace ubuntu_docs.Application.Services
{
    public class ServiceProviderService : IServiceProviderService
    {
        private readonly IServiceProviderRepository _repository;
        private readonly ITokenService _tokenService;

        public ServiceProviderService(IServiceProviderRepository repository, ITokenService tokenService)
        {
            _repository = repository;
            _tokenService = tokenService;
        }

        public async Task<ServiceProviderDto> CreateAsync(CreateServiceProviderDto dto)
        {
            var entity = new ServiceProviderEntity
            {
                CompanyName = dto.CompanyName,
                RegistrationNumber = dto.RegistrationNumber,
                Email = dto.Email,
                PhoneNumber = dto.PhoneNumber,
                Address = dto.Address,
                City = dto.City,
                Country = dto.Country,
                ContactPersonName = dto.ContactPersonName,
                LogoUrl = dto.LogoUrl,
                Industry = dto.Industry,
                PasswordHash = dto.Password
            };

            var hasher = new PasswordHasher<ServiceProviderEntity>();
            entity.PasswordHash = hasher.HashPassword(entity, entity.PasswordHash);

            var created = await _repository.CreateAsync(entity);

            return MapToDto(created);
        }

        public async Task<IEnumerable<ServiceProviderDto>> GetAllAsync()
        {
            var list = await _repository.GetAllAsync();

            return list.Select(MapToDto);
        }

        public async Task<ServiceProviderDto> GetById(Guid id)
        {
            var ser = await _repository.GetByIdAsync(id);

            return MapToDto(ser);
        }

        public async Task<IEnumerable<ServiceProviderDto>> GetByUserIdAsync(Guid userId)
        {
            var list = await _repository.GetByUserIdAsync(userId);

            return list.Select(MapToDto);
        }

        private static ServiceProviderDto MapToDto(ServiceProviderEntity entity)
        {
            return new ServiceProviderDto
            {
                Id = entity.Id,
                CompanyName = entity.CompanyName,
                Email = entity.Email,
                PhoneNumber = entity.PhoneNumber,
                City = entity.City,
                Country = entity.Country,
                Industry = entity.Industry,
                Logo = entity.LogoUrl
            };
        }

        public async Task<IEnumerable<ProviderUserDto>> GetUsersByServiceProviderIdAsync(Guid serviceProviderId)
        {
            var users = await _repository.GetUsersByServiceProviderIdAsync(serviceProviderId);

            return users.Select(u => new ProviderUserDto
            {
                Id = u.Id,
                FirstName = u.FirstName,
                LastName = u.LastName,
                Email = u.Email,
                Phone = u.Phone,
                Province = u.Province
            });
        }


        public async Task<AuthModel> Login(AuthDTO user)
        {

            if (string.IsNullOrWhiteSpace(user.email) || string.IsNullOrWhiteSpace(user.password))
            {
                throw new Exception(
                   string.IsNullOrWhiteSpace(user.email) ? "Email is required" : "Password is required"
                );
            }

            var userFound = await _repository.GetByEmailAsync(user.email);

            if (userFound == null) return null;


            var hasher = new PasswordHasher<ServiceProviderEntity>();
            var result = hasher.VerifyHashedPassword(userFound, userFound.PasswordHash, user.password);

            if (result == PasswordVerificationResult.Failed)
                throw new Exception("Invalid credentials");

            var userLoginDetails = new UserDetailsDto
            {
                Id = userFound.Id,
                Email = userFound.Email,
                FullName = userFound.Country,
                PhoneNumber = userFound.PhoneNumber,
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
