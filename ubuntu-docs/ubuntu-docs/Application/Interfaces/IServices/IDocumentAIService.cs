namespace ubuntu_docs.Application.Interfaces.IServices
{
    public interface IDocumentAIService
    {
        Task<string> AskQuestionAsync(string prompt, string content, string question);
    }
}
