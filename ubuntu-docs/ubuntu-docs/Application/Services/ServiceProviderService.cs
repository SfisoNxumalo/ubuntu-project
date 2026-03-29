using ubuntu_docs.Application.DTOs;
using ubuntu_docs.Application.Interfaces.IRepositories;
using ubuntu_docs.Application.Interfaces.IServices;
using ubuntu_docs.Domain.Entities;

namespace ubuntu_docs.Application.Services
{
    public class ServiceProviderService : IServiceProviderService
    {
        private readonly IServiceProviderRepository _repository;

        public ServiceProviderService(IServiceProviderRepository repository)
        {
            _repository = repository;
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

        public async Task<IEnumerable<UserDto>> GetUsersByServiceProviderIdAsync(Guid serviceProviderId)
        {
            var users = await _repository.GetUsersByServiceProviderIdAsync(serviceProviderId);

            return users.Select(u => new UserDto
            {
                Id = u.Id,
                FirstName = u.FirstName,
                LastName = u.LastName,
                Email = u.Email,
                Phone = u.Phone
            });
        }
    }
}
