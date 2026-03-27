using ubuntu_docs.Domain.Entities;

namespace ubuntu_docs.Application.Interfaces.IRepositories
{
    public interface IUserRepository
    {
        Task<UserEntity> CreateAsync(UserEntity user);

        Task<UserEntity?> GetByIdAsync(Guid id);

        Task<UserEntity?> GetByEmailAsync(string email);

        Task<IEnumerable<UserEntity>> GetAllAsync();

        Task UpdateAsync(UserEntity user);

        Task DeleteAsync(Guid id);
    }
}
