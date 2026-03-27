using Microsoft.EntityFrameworkCore;
using ubuntu_docs.Application.Interfaces.IRepositories;
using ubuntu_docs.Data;
using ubuntu_docs.Domain.Entities;

namespace ubuntu_docs.Infrastructure.Repositories
{
    //This repository is used to perform the CRUD operations for a user
    public class UserRepository : IUserRepository
    {
        private readonly UbuntuContext _context;

        public UserRepository(UbuntuContext context)
        {
            _context = context;
        }

        public async Task<UserEntity> CreateAsync(UserEntity user)
        {
            user.Id = Guid.NewGuid();
            user.CreatedAt = DateTime.UtcNow;

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }

        public async Task<UserEntity?> GetByIdAsync(Guid id)
        {
            return await _context.Users
                .Include(u => u.UserDocuments)
                    .ThenInclude(ud => ud.Document)
                .FirstOrDefaultAsync(u => u.Id == id && !u.IsDeleted);
        }

        public async Task<UserEntity?> GetByEmailAsync(string email)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.Email == email && !u.IsDeleted);
        }

        public async Task<IEnumerable<UserEntity>> GetAllAsync()
        {
            return await _context.Users
                .Where(u => !u.IsDeleted)
                .ToListAsync();
        }

        public async Task UpdateAsync(UserEntity user)
        {
            user.UpdatedAt = DateTime.UtcNow;

            _context.Users.Update(user);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null) return;

            user.IsDeleted = true;
            user.UpdatedAt = DateTime.UtcNow;

            _context.Users.Update(user);
            await _context.SaveChangesAsync();
        }
    }
}
