using ubuntu_docs.Application.DTOs;

namespace ubuntu_docs.Application.Interfaces.IServices
{
    
    public interface IDocumentQAService
    {
        Task<AskQuestionResponseDto> AskAsync(AskQuestionDto dto);
    }
}
