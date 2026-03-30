namespace ubuntu_docs.Application.DTOs
{
    public class DocumentResponseDto
    {
        public Guid Id { get; set; }
        public string FileName { get; set; }
        public string FileUrl { get; set; }

        public string ContentType { get; set; }
        public long FileSize { get; set; }

        public string? Summary { get; set; }

        public string content { get; set; }
    }
}
