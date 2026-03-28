using ubuntu_docs.Domain.Entities;

namespace ubuntu_docs.Application.Interfaces.IRepositories
{
    public interface IDocumentRepository
    {
        Task<DocumentEntity> CreateAsync(DocumentEntity entity);

        Task<DocumentEntity?> GetByIdAsync(Guid id);

        Task<IEnumerable<DocumentEntity>> GetByUserIdAsync(Guid userId);

        Task<IEnumerable<DocumentEntity>> GetByServiceProviderIdAsync(Guid serviceProviderId);
    }
}
