using ubuntu_docs.Domain.Entities;

namespace ubuntu_docs.Application.Interfaces.IRepositories
{
    public interface IUserDocumentRepository
    {
        Task<UserDocumentEntity> CreateAsync(UserDocumentEntity entity);

        Task<UserDocumentEntity?> GetByIdAsync(Guid id);

        Task<IEnumerable<UserDocumentEntity>> GetByUserIdAsync(Guid userId);

        Task<IEnumerable<UserDocumentEntity>> GetByServiceProviderIdAsync(Guid serviceProviderId);

        Task UpdateAsync(UserDocumentEntity entity);
    }
}
