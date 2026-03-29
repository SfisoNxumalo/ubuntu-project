namespace ubuntu_docs.Application.Interfaces.IServices
{
    public interface IBlobStorageService
    {
        Task<(string Url, string BlobName)> UploadAsync(Guid docId, Stream stream, string fileName, string contentType);
    }
}
