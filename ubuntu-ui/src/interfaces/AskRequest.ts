export type AskRequest = { 
  userId: string;
  documentId: string;
  question: string;
}

export type AskResponse = {
    documentId: string;
    answer: string;
}