namespace ubuntu_docs.Application.DTOs
{
    public class DocumentDto
    {
        public Guid Id { get; set; }
        public string FileName { get; set; }
        public string FileUrl { get; set; }

        public string ContentType { get; set; }
        public long FileSize { get; set; }

        public string? Summary { get; set; }
    }
}
