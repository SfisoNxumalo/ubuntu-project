using ubuntu_docs.Application.Interfaces.IServices;
using UglyToad.PdfPig;
using UglyToad.PdfPig.Content;

namespace ubuntu_docs.Application.Services
{
    /// <summary>
    /// Implementation of pdf text extraction service
    /// Reason: It would be easier for our LLM to process text than a document with formatting
    /// </summary>
    public class PdfPigExtractionService : IPdfExtractionService
    {
        public async Task<string> ExtractTextAsync(Stream fileStream)
        {
            // PdfPig works synchronously, so wrap in Task
            return await Task.Run(() =>
            {
                using var document = PdfDocument.Open(fileStream);

                var text = "";

                foreach (Page page in document.GetPages())
                {
                    text += page.Text + Environment.NewLine;
                }

                return CleanText(text);
            });
        }

        private string CleanText(string text)
        {
            if (string.IsNullOrWhiteSpace(text))
                return string.Empty;


            text = text.Replace("\r", " ");
            text = text.Replace("\n", " ");
            text = text.Replace("  ", " ");

            return text.Trim();
        }
    }
}
