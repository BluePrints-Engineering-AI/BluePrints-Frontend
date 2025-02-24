
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChatBot, ChatMessage } from "@/types/database";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ChatBotHeader } from "./chatbot-card/ChatBotHeader";
import { FileUpload } from "./chatbot-card/FileUpload";
import { DocumentsList } from "./chatbot-card/DocumentsList";
import { ChatInput } from "./chatbot-card/ChatInput";
import { StorageUsage } from "./chatbot-card/StorageUsage";

interface ChatBotCardProps {
  bot: ChatBot;
  index: number;
  onUpdate: (id: string, updates: Partial<ChatBot>) => void;
  onDelete: (id: string) => void;
}

export const ChatBotCard = ({ bot, index, onUpdate, onDelete }: ChatBotCardProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(bot.name);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data, error } = await supabase
          .from('chat_messages')
          .select('id, content, role, created_at, chatbot_id')
          .eq('chatbot_id', bot.id)
          .order('created_at', { ascending: true });

        if (error) throw error;
        setMessages(data as ChatMessage[]);
      } catch (error: any) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [bot.id]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const filePath = `${user.id}/${bot.id}/${crypto.randomUUID()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('chatbot_files')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { error: dbError } = await supabase
        .from('chatbot_files')
        .insert({
          chatbot_id: bot.id,
          file_name: file.name,
          file_path: filePath,
          file_size: file.size,
        });

      if (dbError) throw dbError;

      toast.success('File uploaded successfully');
      window.location.reload();
    } catch (error: any) {
      toast.error('Failed to upload file: ' + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpdateName = async () => {
    if (!newName.trim()) {
      toast.error('Name cannot be empty');
      return;
    }

    try {
      const { error } = await supabase
        .from('chatbots')
        .update({ name: newName })
        .eq('id', bot.id);

      if (error) throw error;

      onUpdate(bot.id, { name: newName });
      toast.success('Chatbot name updated successfully');
      setIsEditing(false);
    } catch (error: any) {
      toast.error('Failed to update name: ' + error.message);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      const { data: userMessage, error: userError } = await supabase
        .from('chat_messages')
        .insert({
          chatbot_id: bot.id,
          content: message.trim(),
          role: 'user' as const
        })
        .select('id, content, role, created_at, chatbot_id')
        .single();

      if (userError) throw userError;

      setMessages(prev => [...prev, userMessage as ChatMessage]);
      setMessage("");

      const { data: botMessage, error: botError } = await supabase
        .from('chat_messages')
        .insert({
          chatbot_id: bot.id,
          content: "I am a chatbot assistant. How can I help you today?",
          role: 'assistant' as const
        })
        .select('id, content, role, created_at, chatbot_id')
        .single();

      if (botError) throw botError;

      setMessages(prev => [...prev, botMessage as ChatMessage]);
    } catch (error: any) {
      toast.error('Failed to send message: ' + error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from('chatbots')
        .delete()
        .eq('id', bot.id);

      if (error) throw error;

      onDelete(bot.id);
      toast.success('Chatbot deleted successfully');
    } catch (error: any) {
      toast.error('Failed to delete chatbot: ' + error.message);
    }
  };

  return (
    <Card 
      className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <ChatBotHeader
        name={bot.name}
        isEditing={isEditing}
        newName={newName}
        onEdit={() => setIsEditing(true)}
        onUpdate={handleUpdateName}
        onCancel={() => {
          setNewName(bot.name);
          setIsEditing(false);
        }}
        onDelete={handleDelete}
        onNameChange={setNewName}
      />
      <CardContent>
        <div className="space-y-4">
          <FileUpload
            isUploading={isUploading}
            onFileUpload={handleFileUpload}
          />
          <DocumentsList documents={bot.documents} />
          
          <div className="space-y-2">
            <div className="h-48 overflow-y-auto space-y-2 p-2 bg-gray-50 rounded-lg">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-2 rounded-lg ${
                    msg.role === 'user' 
                      ? 'bg-blue-100 ml-auto max-w-[80%]' 
                      : 'bg-gray-100 mr-auto max-w-[80%]'
                  }`}
                >
                  {msg.content}
                </div>
              ))}
              {messages.length === 0 && (
                <div className="text-center text-gray-500 py-4">
                  No messages yet. Start a conversation!
                </div>
              )}
            </div>
          </div>
          
          <ChatInput
            message={message}
            onMessageChange={setMessage}
            onSend={handleSendMessage}
          />
          <StorageUsage
            storageUsed={bot.storageUsed || 0}
            storageLimit={bot.storageLimit || 1}
          />
        </div>
      </CardContent>
    </Card>
  );
};
