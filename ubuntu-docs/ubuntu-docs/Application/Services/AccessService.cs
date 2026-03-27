using ubuntu_docs.Application.DTOs;
using ubuntu_docs.Data;
using ubuntu_docs.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using ubuntu_docs.Application.Interfaces.IRepositories;
using ubuntu_docs.Application.Interfaces.IServices;

namespace ubuntu_docs.Application.Services
{
    public class AccessService : IAccessService
    {
        private readonly IAccessRepository _repository;

        public AccessService(IAccessRepository repository)
        {
            _repository = repository;
        }

        public async Task<bool> GrantAccessAsync(GrantAccessDto dto)
        {
            var existing = await _repository.GetAsync(dto.UserId, dto.ServiceProviderId);

            if (existing != null)
            {
                if (!existing.IsActive)
                {
                    existing.IsActive = true;
                    existing.UpdatedAt = DateTime.UtcNow;

                    await _repository.UpdateAsync(existing);
                }

                return true;
            }

            var access = new UserServiceProviderEntity
            {
                Id = Guid.NewGuid(),
                UserId = dto.UserId,
                ServiceProviderId = dto.ServiceProviderId,
                CreatedAt = DateTime.UtcNow,
                IsActive = true
            };

            await _repository.AddAsync(access);

            return true;
        }

        public async Task<bool> RevokeAccessAsync(Guid userId, Guid serviceProviderId)
        {
            var existing = await _repository.GetAsync(userId, serviceProviderId);

            if (existing == null)
                return false;

            existing.IsActive = false;
            existing.UpdatedAt = DateTime.UtcNow;

            await _repository.UpdateAsync(existing);

            return true;
        }

        public async Task<bool> HasAccessAsync(Guid userId, Guid serviceProviderId)
        {
            return await _repository.HasActiveAccessAsync(userId, serviceProviderId);
        }
    }
}
