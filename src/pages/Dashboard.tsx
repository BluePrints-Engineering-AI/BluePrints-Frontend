
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, MessageSquare, Clock, Database, Upload, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { StorageCard } from "@/components/dashboard/StorageCard";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ChatBotCard } from "@/components/dashboard/ChatBotCard";
import { ChatBot } from "@/types/dashboard";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useProfile } from "@/hooks/use-profile";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const navigate = useNavigate();
  const [message, setMessage] = React.useState("");
  const { profile } = useProfile(true);

  const { data: chatbots = [] } = useQuery({
    queryKey: ['chatbots'],
    queryFn: async () => {
      const { data: chatbots, error } = await supabase
        .from('chatbots')
        .select(`
          *,
          chatbot_files (*)
        `)
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id);

      if (error) throw error;
      return chatbots;
    },
  });

  // Calculate total storage used across all chatbot files
  const totalStorageUsed = chatbots.reduce((acc, bot) => {
    const botFiles = bot.chatbot_files || [];
    return acc + botFiles.reduce((sum, file) => sum + (file.file_size || 0), 0);
  }, 0);

  // Convert bytes to GB for display
  const storageUsedGB = totalStorageUsed / (1024 * 1024 * 1024);
  const storageLimitGB = (profile?.storage_limit || 0) / (1024 * 1024 * 1024);
  const storagePercentage = (storageUsedGB / storageLimitGB) * 100;

  const totalMessages = chatbots.length * 100; // Example - you might want to store this in the database
  const totalUsageTime = "45h 23m"; // Example - you might want to store this in the database
  const totalDocuments = chatbots.reduce((acc, bot) => {
    return acc + (bot.chatbot_files?.length || 0);
  }, 0);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Handle file upload logic here
      console.log("Uploading file:", file.name);
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle sending message to chatbot
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <div className="container mx-auto px-4 py-24 bg-gradient-to-b from-white to-[#2463EB]/5">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#2463EB]">Dashboard</h1>
        <Button className="flex items-center gap-2 bg-[#2463EB] hover:bg-[#2463EB]/90">
          <Plus className="w-4 h-4" /> Create New ChatBot
        </Button>
      </div>

      <StorageCard 
        storagePercentage={storagePercentage}
        totalStorageUsed={storageUsedGB}
        totalStorageLimit={storageLimitGB}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard 
          title="Total Messages" 
          value={totalMessages} 
          Icon={MessageSquare} 
        />
        <StatsCard 
          title="Usage Time" 
          value={totalUsageTime} 
          Icon={Clock}
          className="delay-100"
        />
        <StatsCard 
          title="Total Documents" 
          value={totalDocuments} 
          Icon={Database}
          className="delay-200"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* File Upload Card */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Upload Documents</h2>
          <div className="flex items-center gap-4">
            <Input
              type="file"
              className="flex-1"
              onChange={handleUpload}
              accept=".pdf,.doc,.docx,.txt"
            />
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </Button>
          </div>
        </Card>

        {/* Chatbot Card */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Chat with Assistant</h2>
          <div className="flex items-center gap-4">
            <Input
              type="text"
              placeholder="Ask me anything..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSendMessage}>
              <Send className="w-4 h-4 mr-2" />
              Send
            </Button>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {chatbots.map((bot: any, index: number) => (
          <ChatBotCard
            key={bot.id}
            bot={{
              ...bot,
              documentsCount: bot.chatbot_files?.length || 0,
              storageUsed: (bot.chatbot_files?.reduce((sum: number, file: any) => sum + (file.file_size || 0), 0) || 0) / (1024 * 1024 * 1024),
              storageLimit: storageLimitGB,
              documents: bot.chatbot_files?.map((file: any) => ({
                id: file.id,
                name: file.file_name,
                size: file.file_size / (1024 * 1024), // Convert to MB
                uploadedAt: file.uploaded_at
              })) || []
            }}
            index={index}
            onClick={() => navigate(`/chat/${bot.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
