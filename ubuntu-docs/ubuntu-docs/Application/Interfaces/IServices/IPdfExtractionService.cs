namespace ubuntu_docs.Application.Interfaces.IServices
{
    public interface IPdfExtractionService
    {
        Task<string> ExtractTextAsync(Stream fileStream);
    }
}
