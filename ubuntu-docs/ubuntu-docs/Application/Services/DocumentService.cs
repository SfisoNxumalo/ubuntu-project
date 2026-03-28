using ubuntu_docs.Application.DTOs;
using ubuntu_docs.Application.Interfaces.IRepositories;
using ubuntu_docs.Application.Interfaces.IServices;
using ubuntu_docs.Domain.Entities;

namespace ubuntu_docs.Application.Services
{
    public class DocumentService : IDocumentService
    {
        private readonly IDocumentRepository _documentRepository;
        private readonly IUserDocumentRepository _userDocumentRepository;
        private readonly IPdfExtractionService _pdfService;
        private readonly IBlobStorageService _blobService;
        private readonly IAccessService _accessService;

        public DocumentService(
            IDocumentRepository documentRepository,
            IUserDocumentRepository userDocumentRepository,
            IPdfExtractionService pdfService,
            IBlobStorageService blobService,
            IAccessService accessService)
        {
            _documentRepository = documentRepository;
            _userDocumentRepository = userDocumentRepository;
            _pdfService = pdfService;
            _blobService = blobService;
            _accessService = accessService;
        }

        public async Task<Guid> UploadAndAssignAsync(UploadAndAssignDocumentDto dto)
        {
            // 🔥 Validate access
            var hasAccess = await _accessService.HasAccessAsync(dto.UserId, dto.ServiceProviderId);

            if (!hasAccess)
                throw new Exception("Service provider does not have access to this user");

            using var stream = dto.File.OpenReadStream();

            // 1. Extract content
            var content = await _pdfService.ExtractTextAsync(stream);

            if (string.IsNullOrWhiteSpace(content))
                throw new Exception("Failed to extract content");

            stream.Position = 0;

            // 2. Upload to blob
            var (url, blobName) = await _blobService.UploadAsync(
                stream,
                dto.File.FileName,
                dto.File.ContentType
            );

            // 3. Save document
            var document = new DocumentEntity
            {
                FileName = dto.File.FileName,
                FileUrl = url,
                BlobName = blobName,
                ContentType = dto.File.ContentType,
                FileSize = dto.File.Length,
                ServiceProviderId = dto.ServiceProviderId,
                Content = content
            };

            var createdDoc = await _documentRepository.CreateAsync(document);

            
            var userDoc = new UserDocumentEntity
            {
                Id = Guid.NewGuid(),
                UserId = dto.UserId,
                DocumentId = createdDoc.Id,
                ServiceProviderId = dto.ServiceProviderId,
                AssignedAt = DateTime.UtcNow,
                IsRead = false,
                ContactPerson = dto.ContactPerson,
                CreatedAt = DateTime.UtcNow
            };

            await _userDocumentRepository.CreateAsync(userDoc);

            return createdDoc.Id;
        }

        public async Task<DocumentDto?> GetByIdAsync(Guid id)
        {
            var doc = await _documentRepository.GetByIdAsync(id);

            if (doc == null) return null;

            return Map(doc);
        }

        public async Task<IEnumerable<DocumentDto>> GetByUserIdAsync(Guid userId)
        {
            var docs = await _documentRepository.GetByUserIdAsync(userId);

            return docs.Select(Map);
        }

        public async Task<IEnumerable<DocumentDto>> GetByServiceProviderIdAsync(Guid serviceProviderId)
        {
            var docs = await _documentRepository.GetByServiceProviderIdAsync(serviceProviderId);

            return docs.Select(Map);
        }

        private static DocumentDto Map(DocumentEntity d)
        {
            return new DocumentDto
            {
                Id = d.Id,
                FileName = d.FileName,
                FileUrl = d.FileUrl,
                ContentType = d.ContentType,
                FileSize = d.FileSize,
                Summary = d.Summary
            };
        }
    }
}
