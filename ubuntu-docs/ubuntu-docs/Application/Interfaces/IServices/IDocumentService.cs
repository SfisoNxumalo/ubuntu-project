using ubuntu_docs.Application.DTOs;

namespace ubuntu_docs.Application.Interfaces.IServices
{
    public interface IDocumentService
    {
        Task<Guid> UploadAndAssignAsync(UploadAndAssignDocumentDto dto);

        Task<DocumentResponseDto?> GetByIdAsync(Guid id);

        Task<IEnumerable<DocumentDto>> GetByUserIdAsync(Guid userId);

        Task<IEnumerable<DocumentDto>> GetByServiceProviderIdAsync(Guid serviceProviderId);
    }
}
