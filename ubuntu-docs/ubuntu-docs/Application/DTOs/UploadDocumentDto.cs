namespace ubuntu_docs.Application.DTOs
{
    public class UploadDocumentDto
    {
        public IFormFile File { get; set; }

        public Guid ServiceProviderId { get; set; }
    }
}
