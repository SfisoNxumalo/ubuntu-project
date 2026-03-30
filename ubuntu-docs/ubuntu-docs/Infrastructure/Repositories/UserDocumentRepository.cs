using Microsoft.EntityFrameworkCore;
using ubuntu_docs.Application.Interfaces.IRepositories;
using ubuntu_docs.Data;
using ubuntu_docs.Domain.Entities;

namespace ubuntu_docs.Infrastructure.Repositories
{
    public class UserDocumentRepository : IUserDocumentRepository
    {
        private readonly UbuntuContext _context;

        public UserDocumentRepository(UbuntuContext context)
        {
            _context = context;
        }

        public async Task<UserDocumentEntity> CreateAsync(UserDocumentEntity entity)
        {
            entity.Id = Guid.NewGuid();
            entity.CreatedAt = DateTime.UtcNow;

            await _context.UserDocuments.AddAsync(entity);
            await _context.SaveChangesAsync();

            return entity;
        }

        public async Task<UserDocumentEntity?> GetByIdAsync(Guid id)
        {
            return await _context.UserDocuments
                .Include(x => x.Document)
                .Include(x => x.User)
                .FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted);
        }

        public async Task<IEnumerable<UserDocumentEntity>> GetByUserIdAsync(Guid userId)
        {
            return await _context.UserDocuments
                .Include(x => x.Document)
                .Where(x => x.UserId == userId && !x.IsDeleted)
                .ToListAsync();
        }

        public async Task<IEnumerable<UserDocumentEntity>> GetByServiceProviderIdAsync(Guid serviceProviderId)
        {
            return await _context.UserDocuments
                .Include(x => x.Document)
                .Include(x => x.User)
                .Where(x => x.ServiceProviderId == serviceProviderId && !x.IsDeleted)
                .ToListAsync();
        }

        public async Task UpdateAsync(UserDocumentEntity entity)
        {
            entity.UpdatedAt = DateTime.UtcNow;

            _context.UserDocuments.Update(entity);
            await _context.SaveChangesAsync();
        }
    }
}
