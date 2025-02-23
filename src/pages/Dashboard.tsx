
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, MessageSquare, Clock, Database } from "lucide-react";
import { StorageCard } from "@/components/dashboard/StorageCard";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ChatBotCard } from "@/components/dashboard/ChatBotCard";
import { useProfile } from "@/hooks/use-profile";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const Dashboard = () => {
  const { profile } = useProfile(true);

  const { data: chatbots = [], refetch: refetchChatbots } = useQuery({
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

  const handleCreateChatbot = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('chatbots')
        .insert({
          name: `ChatBot ${chatbots.length + 1}`,
          user_id: user.id
        })
        .select()
        .single();

      if (error) throw error;

      toast.success('Chatbot created successfully');
      refetchChatbots();
    } catch (error: any) {
      toast.error('Failed to create chatbot: ' + error.message);
    }
  };

  // Calculate total storage used across all chatbot files
  const totalStorageUsed = chatbots.reduce((acc, bot) => {
    const botFiles = bot.chatbot_files || [];
    return acc + botFiles.reduce((sum, file) => sum + (file.file_size || 0), 0);
  }, 0);

  // Convert bytes to GB for display
  const storageUsedGB = totalStorageUsed / (1024 * 1024 * 1024);
  const storageLimitGB = (profile?.storage_limit || 0) / (1024 * 1024 * 1024);
  const storagePercentage = (storageUsedGB / storageLimitGB) * 100;

  const totalDocuments = chatbots.reduce((acc, bot) => {
    return acc + (bot.chatbot_files?.length || 0);
  }, 0);

  return (
    <div className="container mx-auto px-4 py-24 bg-gradient-to-b from-white to-[#2463EB]/5">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#2463EB]">Dashboard</h1>
        <Button 
          onClick={handleCreateChatbot}
          className="flex items-center gap-2 bg-[#2463EB] hover:bg-[#2463EB]/90"
        >
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
          value={chatbots.length} 
          Icon={MessageSquare} 
        />
        <StatsCard 
          title="Usage Time" 
          value="Active" 
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
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
