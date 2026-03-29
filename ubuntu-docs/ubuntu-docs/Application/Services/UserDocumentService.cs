using ubuntu_docs.Application.DTOs;
using ubuntu_docs.Application.Interfaces.IRepositories;
using ubuntu_docs.Application.Interfaces.IServices;
using ubuntu_docs.Domain.Entities;

namespace ubuntu_docs.Application.Services
{
    public class UserDocumentService : IUserDocumentService
    {
        private readonly IUserDocumentRepository _repository;

        public UserDocumentService(IUserDocumentRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<UserDocumentDto>> GetByUserIdAsync(Guid userId)
        {
            var list = await _repository.GetByUserIdAsync(userId);

            return list.Select(Map);
        }

        public async Task<IEnumerable<UserDocumentDto>> GetByServiceProviderIdAsync(Guid serviceProviderId)
        {
            var list = await _repository.GetByServiceProviderIdAsync(serviceProviderId);

            return list.Select(Map);
        }

        public async Task<bool> MarkAsReadAsync(Guid userDocumentId)
        {
            var entity = await _repository.GetByIdAsync(userDocumentId);

            if (entity == null)
                return false;

            entity.IsRead = true;

            await _repository.UpdateAsync(entity);

            return true;
        }

        private static UserDocumentDto Map(UserDocumentEntity x)
        {
            return new UserDocumentDto
            {
                Id = x.Id,
                UserId = x.UserId,
                User = x.User?.FirstName + " " + x.User?.LastName,
                DocumentId = x.DocumentId,
                FileName = x.Document?.FileName,
                FileUrl = x.Document?.FileUrl,
                IsRead = x.IsRead,
                AssignedAt = x.AssignedAt,
                ContactPerson = x.ContactPerson
            };
        }
    }
}
