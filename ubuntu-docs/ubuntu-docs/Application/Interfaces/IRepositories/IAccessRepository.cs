using ubuntu_docs.Domain.Entities;

namespace ubuntu_docs.Application.Interfaces.IRepositories
{
    public interface IAccessRepository
    {
        Task<UserServiceProviderEntity?> GetAsync(Guid userId, Guid serviceProviderId);

        Task<bool> ExistsAsync(Guid userId, Guid serviceProviderId);

        Task AddAsync(UserServiceProviderEntity entity);

        Task UpdateAsync(UserServiceProviderEntity entity);

        Task<bool> HasActiveAccessAsync(Guid userId, Guid serviceProviderId);
    }
}
