using ubuntu_docs.Domain.Entities;

namespace ubuntu_docs.Application.Interfaces.IRepositories
{
    public interface IServiceProviderRepository
    {
        Task<ServiceProviderEntity> CreateAsync(ServiceProviderEntity entity);

        Task<IEnumerable<ServiceProviderEntity>> GetAllAsync();

        Task<ServiceProviderEntity?> GetByIdAsync(Guid id);

        Task<IEnumerable<ServiceProviderEntity>> GetByUserIdAsync(Guid userId);

        Task<IEnumerable<UserEntity>> GetUsersByServiceProviderIdAsync(Guid serviceProviderId);
    }
}
