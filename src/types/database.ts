
export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  company: string | null;
  tier: 'free' | 'premium';
  storage_limit: number;
  created_at: string;
  updated_at: string | null;
  avatar_url: string | null;
  email: string | null;
  provider: string | null;
}

export interface ChatBot {
  id: string;
  name: string;
  user_id: string;
  created_at: string;
}

export interface ChatBotFile {
  id: string;
  chatbot_id: string;
  file_name: string;
  file_path: string;
  file_size: number;
  uploaded_at: string;
}
