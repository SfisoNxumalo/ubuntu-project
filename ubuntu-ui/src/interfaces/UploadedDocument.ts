export type UploadedDocument = {
  id: string;
  fileName: string;
  fileUrl: string;
  contentType: string;
  fileSize: number;
  summary: string | null;
  content: string;
}