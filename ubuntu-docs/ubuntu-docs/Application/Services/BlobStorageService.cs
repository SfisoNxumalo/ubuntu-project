using ubuntu_docs.Application.Interfaces.IServices;

namespace ubuntu_docs.Application.Services
{
    public class BlobStorageService : IBlobStorageService
    {
        public Task<(string Url, string BlobName)> UploadAsync(Stream stream, string fileName, string contentType)
        {
            throw new NotImplementedException();
        }
    }
}
