using ubuntu_docs.Application.DTOs;

namespace ubuntu_docs.Application.Interfaces.IServices
{
    public interface IServiceProviderService
    {
        Task<ServiceProviderDto> CreateAsync(CreateServiceProviderDto dto);

        Task<IEnumerable<ServiceProviderDto>> GetAllAsync();

        Task<IEnumerable<ServiceProviderDto>> GetByUserIdAsync(Guid userId);
    }
}
