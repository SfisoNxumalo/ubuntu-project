namespace ubuntu_docs.Application.DTOs
{
    public class UploadAndAssignDocumentDto
    {
        public IFormFile File { get; set; }

        public Guid ServiceProviderId { get; set; }
        public Guid UserId { get; set; }

        public string ContactPerson { get; set; }
    }
}
