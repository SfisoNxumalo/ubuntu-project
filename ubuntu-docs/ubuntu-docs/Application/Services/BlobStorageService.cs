using Azure.Storage.Blobs;
using ubuntu_docs.Application.Interfaces.IServices;

namespace ubuntu_docs.Application.Services
{
    /// <summary>
    /// Azure Blob Storage implementation of  
    /// responsible for uploading document files to a configured blob container.
    /// </summary>
    public class BlobStorageService : IBlobStorageService
    {
        private readonly BlobContainerClient _container;

        public BlobStorageService(IConfiguration config)
        {
            var connectionString = config["AzureBlob:ConnectionString"];
            var containerName = config["AzureBlob:ContainerName"];

            var client = new BlobServiceClient(connectionString);
            _container = client.GetBlobContainerClient(containerName);
        }

        public async Task<(string Url, string BlobName)> UploadAsync(Guid docId, Stream stream, string fileName, string contentType)
        {
            var blobName = $"{docId}-{fileName}";
            var blobClient = _container.GetBlobClient(blobName);

            await blobClient.UploadAsync(stream, overwrite: true);

            return (blobClient.Uri.ToString(), blobName);
        }
    }
}
