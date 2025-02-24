
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Bot, FileText, Send, Upload, Edit2, Check, X, Trash2 } from "lucide-react";
import { ChatBot } from "@/types/database";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ChatBotCardProps {
  bot: ChatBot;
  index: number;
  onUpdate: (id: string, updates: Partial<ChatBot>) => void;
  onDelete: (id: string) => void;
}

export const ChatBotCard = ({ bot, index, onUpdate, onDelete }: ChatBotCardProps) => {
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(bot.name);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Upload file to storage
      const filePath = `${user.id}/${bot.id}/${crypto.randomUUID()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('chatbot_files')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Create file record in database
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
      // Trigger a refetch of the chatbots data
      window.location.reload();
    } catch (error: any) {
      toast.error('Failed to upload file: ' + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    // Implement chat functionality here
    console.log(`Sending message to ${bot.name}:`, message);
    setMessage("");
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

  const handleCancelEdit = () => {
    setNewName(bot.name);
    setIsEditing(false);
  };

  return (
    <Card 
      className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="h-8"
                autoFocus
              />
              <Button
                size="sm"
                variant="ghost"
                onClick={handleUpdateName}
                className="h-8 w-8 p-0"
              >
                <Check className="h-4 w-4 text-green-500" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleCancelEdit}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          ) : (
            <>
              <CardTitle className="text-xl font-medium text-[#2463EB]">
                {bot.name}
              </CardTitle>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsEditing(true)}
                className="h-8 w-8 p-0"
              >
                <Edit2 className="h-4 w-4 text-gray-400 hover:text-[#2463EB]" />
              </Button>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-[#2463EB]" />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0"
              >
                <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-500" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Chatbot</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete {bot.name}? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* File Upload Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#2463EB]">Upload Documents</label>
            <div className="flex items-center gap-2">
              <Input
                type="file"
                className="flex-1"
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx,.txt"
                disabled={isUploading}
              />
              <Button variant="outline" disabled={isUploading}>
                <Upload className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Documents List */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-[#2463EB]">Stored Documents</h4>
            <div className="space-y-1">
              {bot.documents?.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between text-sm p-2 bg-[#2463EB]/5 rounded-lg">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#2463EB]" />
                    <span className="text-[#2463EB]">{doc.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-600">{doc.size.toFixed(2)}MB</span>
                    <span className="text-gray-600 text-xs">
                      {new Date(doc.uploadedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
              {(!bot.documents || bot.documents.length === 0) && (
                <div className="text-sm text-gray-500 italic">
                  No documents uploaded yet
                </div>
              )}
            </div>
          </div>

          {/* Chat Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#2463EB]">Chat with Bot</label>
            <div className="flex items-center gap-2">
              <Input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleSendMessage}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Storage Usage */}
          <div className="pt-4">
            <Progress 
              value={(bot.storageUsed || 0) / (bot.storageLimit || 1) * 100} 
              className="h-1.5 bg-[#2463EB]/20 [&>[role=progressbar]]:bg-[#2463EB]"
            />
            <p className="text-xs text-gray-600 mt-1">
              Storage: {(bot.storageUsed || 0).toFixed(2)}GB / {(bot.storageLimit || 0).toFixed(2)}GB
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
