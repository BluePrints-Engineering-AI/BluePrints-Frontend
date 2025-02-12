
export interface Document {
  id: string;
  name: string;
  size: number;
  uploadedAt: string;
}

export interface ChatBot {
  id: string;
  name: string;
  documentsCount: number;
  lastUsed: string;
  storageUsed: number;
  storageLimit: number;
  totalMessages: number;
  usageTime: string;
  documents: Document[];
}
