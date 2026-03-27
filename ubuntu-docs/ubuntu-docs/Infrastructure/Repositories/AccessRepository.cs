using ubuntu_docs.Application.Interfaces.IRepositories;
using ubuntu_docs.Data;
using ubuntu_docs.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ubuntu_docs.Infrastructure.Repositories
{

    // Responsible for assigning service providers access to uplaod a document to a user 
    public class AccessRepository : IAccessRepository
    {
        private readonly UbuntuContext _context;

        public AccessRepository(UbuntuContext context)
        {
            _context = context;
        }

        public async Task<UserServiceProviderEntity?> GetAsync(Guid userId, Guid serviceProviderId)
        {
            return await _context.UserServiceProviders
                .FirstOrDefaultAsync(x =>
                    x.UserId == userId &&
                    x.ServiceProviderId == serviceProviderId);
        }

        public async Task<bool> ExistsAsync(Guid userId, Guid serviceProviderId)
        {
            return await _context.UserServiceProviders
                .AnyAsync(x =>
                    x.UserId == userId &&
                    x.ServiceProviderId == serviceProviderId);
        }

        public async Task AddAsync(UserServiceProviderEntity entity)
        {
            await _context.UserServiceProviders.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(UserServiceProviderEntity entity)
        {
            _context.UserServiceProviders.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> HasActiveAccessAsync(Guid userId, Guid serviceProviderId)
        {
            return await _context.UserServiceProviders
                .AnyAsync(x =>
                    x.UserId == userId &&
                    x.ServiceProviderId == serviceProviderId &&
                    x.IsActive);
        }
    }
}
