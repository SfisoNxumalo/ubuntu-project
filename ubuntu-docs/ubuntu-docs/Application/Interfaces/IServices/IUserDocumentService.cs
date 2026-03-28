using ubuntu_docs.Application.DTOs;

namespace ubuntu_docs.Application.Interfaces.IServices
{
    public interface IUserDocumentService
    {
        Task<IEnumerable<UserDocumentDto>> GetByUserIdAsync(Guid userId);

        Task<IEnumerable<UserDocumentDto>> GetByServiceProviderIdAsync(Guid serviceProviderId);

        Task<bool> MarkAsReadAsync(Guid userDocumentId);
    }
}
