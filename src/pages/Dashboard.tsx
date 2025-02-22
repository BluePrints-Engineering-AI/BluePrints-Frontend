
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, MessageSquare, Clock, Database } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { StorageCard } from "@/components/dashboard/StorageCard";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ChatBotCard } from "@/components/dashboard/ChatBotCard";
import { ChatBot } from "@/types/dashboard";

const Dashboard = () => {
  const navigate = useNavigate();

  // Mock data - in a real app this would come from your backend
  const chatBots: ChatBot[] = [
    {
      id: "1",
      name: "Customer Support Bot",
      documentsCount: 5,
      lastUsed: "2024-02-20",
      storageUsed: 4.2,
      storageLimit: 10,
      totalMessages: 1234,
      usageTime: "23h 45m",
      documents: [
        {
          id: "doc1",
          name: "Support Manual.pdf",
          size: 2.1,
          uploadedAt: "2024-02-15",
        },
        {
          id: "doc2",
          name: "FAQs.pdf",
          size: 1.5,
          uploadedAt: "2024-02-16",
        },
      ],
    },
    {
      id: "2",
      name: "Sales Assistant Bot",
      documentsCount: 3,
      lastUsed: "2024-02-21",
      storageUsed: 3.1,
      storageLimit: 10,
      totalMessages: 856,
      usageTime: "15h 30m",
      documents: [
        {
          id: "doc3",
          name: "Product Catalog.pdf",
          size: 1.8,
          uploadedAt: "2024-02-18",
        },
        {
          id: "doc4",
          name: "Price List.pdf",
          size: 0.8,
          uploadedAt: "2024-02-19",
        },
      ],
    },
  ];

  const totalMessages = chatBots.reduce((acc, bot) => acc + bot.totalMessages, 0);
  const totalUsageTime = "45h 23m";
  const totalDocuments = chatBots.reduce((acc, bot) => acc + bot.documentsCount, 0);
  const totalStorageUsed = chatBots.reduce((acc, bot) => acc + bot.storageUsed, 0);
  const totalStorageLimit = chatBots.reduce((acc, bot) => acc + bot.storageLimit, 0);
  const storagePercentage = (totalStorageUsed / totalStorageLimit) * 100;

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
        totalStorageUsed={totalStorageUsed}
        totalStorageLimit={totalStorageLimit}
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {chatBots.map((bot, index) => (
          <ChatBotCard
            key={bot.id}
            bot={bot}
            index={index}
            onClick={() => navigate(`/chat/${bot.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
