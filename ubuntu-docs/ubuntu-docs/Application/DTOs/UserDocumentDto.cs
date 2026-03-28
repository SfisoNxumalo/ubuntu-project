namespace ubuntu_docs.Application.DTOs
{
    public class UserDocumentDto
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }
        public Guid DocumentId { get; set; }

        public string FileName { get; set; }
        public string FileUrl { get; set; }

        public bool IsRead { get; set; }

        public DateTime AssignedAt { get; set; }

        public string ContactPerson { get; set; }
    }
}
