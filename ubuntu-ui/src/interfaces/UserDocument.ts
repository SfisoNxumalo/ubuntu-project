export interface UserDocument {
  id: string;
  userId: string; 
  documentId: string;
  fileName: string;
  user: string; 
  fileUrl: string;
  isRead: boolean;
  assignedAt: string;
  contactPerson: string;
}