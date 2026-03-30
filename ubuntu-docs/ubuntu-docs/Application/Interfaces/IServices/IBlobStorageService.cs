namespace ubuntu_docs.Application.Interfaces.IServices
{
    /// <summary>
    /// Provides blob storage operations for uploading document files.
    /// </summary>
    public interface IBlobStorageService
    {
        Task<(string Url, string BlobName)> UploadAsync(Guid docId, Stream stream, string fileName, string contentType);
    }
}
