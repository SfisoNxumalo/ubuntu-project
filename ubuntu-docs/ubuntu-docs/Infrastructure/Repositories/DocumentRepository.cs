using Microsoft.EntityFrameworkCore;
using ubuntu_docs.Application.DTOs;
using ubuntu_docs.Application.Interfaces.IRepositories;
using ubuntu_docs.Data;
using ubuntu_docs.Domain.Entities;

namespace ubuntu_docs.Infrastructure.Repositories
{
    public class DocumentRepository : IDocumentRepository
    {

        private readonly UbuntuContext _context;

        public DocumentRepository(UbuntuContext context)
        {
            _context = context;
        }

        public async Task<DocumentEntity> CreateAsync(DocumentEntity entity)
        {
            entity.Id = Guid.NewGuid();
            entity.CreatedAt = DateTime.UtcNow;

            await _context.Documents.AddAsync(entity);
            await _context.SaveChangesAsync();

            return entity;
        }

        public async Task<DocumentEntity?> GetByIdAsync(Guid id)
        {
            return await _context.Documents
                .FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted);
        }

        public async Task<IEnumerable<DocumentEntity>> GetByUserIdAsync(Guid userId)
        {
            return await _context.UserDocuments
                .Where(ud => ud.UserId == userId)
                .Select(ud => ud.Document)
                .Where(d => !d.IsDeleted)
                .ToListAsync();
        }

        public async Task<IEnumerable<DocumentEntity>> GetByServiceProviderIdAsync(Guid serviceProviderId)
        {
            return await _context.Documents
                .Where(d => d.ServiceProviderId == serviceProviderId && !d.IsDeleted)
                .ToListAsync();
        }

        //public async Task<IEnumerable<DocumentResponseDto>> GetDocumentAndUserDetailsAsync(Guid providerID)
        //{
        //    return await _context.UserDocuments
        //        .Where(ud => ud.ServiceProviderId == providerID && !ud.IsDeleted)
        //        .Select(ud => new DocumentResponseDto { 
        //           Id = ud.Id,
        //           FileName = ud.Document.FileName,
        //           User = ud.User.FirstName + ud.User.LastName,
        //           AssignedAt = ud.AssignedAt,
        //           Status = ud.IsRead,
        //        })
        //        .ToListAsync();
        //}
    }
}
