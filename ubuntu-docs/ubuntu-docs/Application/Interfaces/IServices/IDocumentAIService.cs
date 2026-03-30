namespace ubuntu_docs.Application.Interfaces.IServices
{
    /// <summary>
    /// Provides the operations for interacting with an LLM module
    /// </summary>
    public interface IDocumentAIService
    {
        Task<string> AskQuestionAsync(string prompt);
    }
}
