using ubuntu_docs.Application.Interfaces.IRepositories;
using ubuntu_docs.Data;
using ubuntu_docs.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ubuntu_docs.Infrastructure.Repositories
{
    public class ServiceProviderRepository : IServiceProviderRepository
    {
        private readonly UbuntuContext _context;

        public ServiceProviderRepository(UbuntuContext context)
        {
            _context = context;
        }

        public async Task<ServiceProviderEntity> CreateAsync(ServiceProviderEntity entity)
        {
            entity.Id = Guid.NewGuid();
            entity.CreatedAt = DateTime.UtcNow;

            await _context.ServiceProviders.AddAsync(entity);
            await _context.SaveChangesAsync();

            return entity;
        }

        public async Task<IEnumerable<ServiceProviderEntity>> GetAllAsync()
        {
            return await _context.ServiceProviders
                .Where(x => !x.IsDeleted)
                .ToListAsync();
        }

        public async Task<ServiceProviderEntity?> GetByIdAsync(Guid id)
        {
            return await _context.ServiceProviders
                .FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted);
        }

        public async Task<IEnumerable<ServiceProviderEntity>> GetByUserIdAsync(Guid userId)
        {
            return await _context.UserServiceProviders
                .Where(x => x.UserId == userId && x.IsActive)
                .Select(x => x.ServiceProvider)
                .Where(sp => !sp.IsDeleted)
                .ToListAsync();
        }
    }
}
