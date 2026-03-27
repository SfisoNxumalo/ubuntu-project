using ubuntu_docs.Application.DTOs;

namespace ubuntu_docs.Application.Interfaces.IServices
{
    public interface IAccessService
    {
        Task<bool> GrantAccessAsync(GrantAccessDto dto);

        Task<bool> RevokeAccessAsync(Guid userId, Guid serviceProviderId);

        Task<bool> HasAccessAsync(Guid userId, Guid serviceProviderId);
    }
}
