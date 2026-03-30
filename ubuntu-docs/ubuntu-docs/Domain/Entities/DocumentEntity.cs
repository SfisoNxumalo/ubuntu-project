namespace ubuntu_docs.Domain.Entities
{
    public class DocumentEntity : BaseEntity
    {
        public required string FileName { get; set; }
        public required string FileUrl { get; set; } // Azure Blob URL
        public required string BlobName { get; set; } // Unique name in blob storage
        public required string ContentType { get; set; } // e.g. application/pdf
        public long FileSize { get; set; }

        public required Guid ServiceProviderId { get; set; }
        public ServiceProviderEntity ServiceProvider { get; set; }

        public string? Summary { get; set; }

        public string? Content { get; set; } // Extracted PDF text

        public ICollection<UserDocumentEntity>? UserDocuments { get; set; }
    }
}
