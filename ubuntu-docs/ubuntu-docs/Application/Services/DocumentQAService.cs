using ubuntu_docs.Application.DTOs;
using ubuntu_docs.Application.Interfaces.IRepositories;
using ubuntu_docs.Application.Interfaces.IServices;

namespace ubuntu_docs.Application.Services
{
    public class DocumentQAService : IDocumentQAService
    {
        private readonly IDocumentRepository _documentRepository;
        private readonly IUserDocumentRepository _userDocumentRepository;
        private readonly IDocumentAIService _aiService;

        public DocumentQAService(
            IDocumentRepository documentRepository,
            IUserDocumentRepository userDocumentRepository,
            IDocumentAIService aiService)
        {
            _documentRepository = documentRepository;
            _userDocumentRepository = userDocumentRepository;
            _aiService = aiService;
        }

        public async Task<AskQuestionResponseDto> AskAsync(AskQuestionDto dto)
        {  
            var userDocs = await _userDocumentRepository.GetByUserIdAsync(dto.UserId);

            var hasAccess = userDocs.Any(x => x.DocumentId == dto.DocumentId);

            if (!hasAccess)
                throw new Exception("User does not have access to this document");

            var document = await _documentRepository.GetByIdAsync(dto.DocumentId);

            if (document == null)
                throw new Exception("Document not found");

            if (string.IsNullOrWhiteSpace(document.Content))
                throw new Exception("Document content not available");

            var content = document.Content;

            if (content.Length > 10000)
                content = content.Substring(0, 10000);


            var fullPrompt = $@"

Document Content:
{content}

User Question:
{dto.Question}
";

            var answer = await _aiService.AskQuestionAsync(fullPrompt);

            return new AskQuestionResponseDto
            {
                DocumentId = dto.DocumentId,
                Answer = answer
            };
        }
    }
}
