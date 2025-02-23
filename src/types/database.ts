
export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  company: string | null;
  tier: 'free' | 'premium';  // Note: this is lowercase
  storage_limit: number;
  created_at: string;
  updated_at: string | null;
  email: string | null;
  provider: string | null;
  avatar_url?: string | null;
  full_name?: string | null;
}

export interface ChatBot {
  id: string;
  name: string;
  user_id: string;
  created_at: string;
  chatbot_files?: ChatBotFile[];
  documents?: {
    id: string;
    name: string;
    size: number;
    uploadedAt: string;
  }[];
  documentsCount?: number;
  storageUsed?: number;
  storageLimit?: number;
}

export interface ChatBotFile {
  id: string;
  chatbot_id: string;
  file_name: string;
  file_path: string;
  file_size: number;
  uploaded_at: string;
}
