namespace ubuntu_docs.Application.DTOs
{
    public class AskQuestionDto
    {
        public Guid UserId { get; set; }
        public Guid DocumentId { get; set; }
        public string Question { get; set; }
    }
}
