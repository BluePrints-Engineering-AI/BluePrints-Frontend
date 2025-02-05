import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Bot, MessageSquare, Clock, Database } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ChatBot {
  id: string;
  name: string;
  documentsCount: number;
  lastUsed: string;
  storageUsed: number;
  storageLimit: number;
}

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
    },
    {
      id: "2",
      name: "Sales Assistant Bot",
      documentsCount: 3,
      lastUsed: "2024-02-21",
      storageUsed: 3.1,
      storageLimit: 10,
    },
  ];

  const totalMessages = 2543;
  const totalUsageTime = "45h 23m";
  const totalDocuments = chatBots.reduce((acc, bot) => acc + bot.documentsCount, 0);

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Create New ChatBot
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMessages}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usage Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsageTime}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDocuments}</div>
          </CardContent>
        </Card>
      </div>

      {/* ChatBots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chatBots.map((bot) => (
          <Card 
            key={bot.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate(`/chat/${bot.id}`)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-medium">{bot.name}</CardTitle>
              <Bot className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Documents:</span>
                  <span className="font-medium">{bot.documentsCount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Storage Used:</span>
                  <span className="font-medium">{bot.storageUsed}GB / {bot.storageLimit}GB</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Last Used:</span>
                  <span className="font-medium">{bot.lastUsed}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;