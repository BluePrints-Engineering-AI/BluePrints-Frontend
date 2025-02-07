
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Plus, Bot, MessageSquare, Clock, Database, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Document {
  id: string;
  name: string;
  size: number;
  uploadedAt: string;
}

interface ChatBot {
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

      {/* Storage Usage */}
      <Card className="mb-8 bg-white shadow-lg animate-fade-up">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium text-[#2463EB]">Storage Usage</CardTitle>
          <Database className="h-4 w-4 text-[#2463EB]" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Progress value={storagePercentage} className="h-2 bg-[#2463EB]/20 [&>[role=progressbar]]:bg-[#2463EB]" />
            <p className="text-sm text-gray-600">
              {totalStorageUsed.toFixed(1)}GB / {totalStorageLimit}GB used
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow animate-fade-up">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#2463EB]">Total Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-[#2463EB]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#2463EB]">{totalMessages}</div>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow animate-fade-up delay-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#2463EB]">Usage Time</CardTitle>
            <Clock className="h-4 w-4 text-[#2463EB]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#2463EB]">{totalUsageTime}</div>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow animate-fade-up delay-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#2463EB]">Total Documents</CardTitle>
            <Database className="h-4 w-4 text-[#2463EB]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#2463EB]">{totalDocuments}</div>
          </CardContent>
        </Card>
      </div>

      {/* ChatBots Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {chatBots.map((bot, index) => (
          <Card 
            key={bot.id}
            className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer animate-fade-up"
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => navigate(`/chat/${bot.id}`)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-medium text-[#2463EB]">{bot.name}</CardTitle>
              <Bot className="h-5 w-5 text-[#2463EB]" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Messages:</span>
                      <span className="font-medium text-[#2463EB]">{bot.totalMessages}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Usage Time:</span>
                      <span className="font-medium text-[#2463EB]">{bot.usageTime}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Storage:</span>
                      <span className="font-medium text-[#2463EB]">{bot.storageUsed}GB / {bot.storageLimit}GB</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Documents:</span>
                      <span className="font-medium text-[#2463EB]">{bot.documentsCount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Last Used:</span>
                      <span className="font-medium text-[#2463EB]">{bot.lastUsed}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-[#2463EB]">Training Documents</h4>
                  <div className="space-y-1">
                    {bot.documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between text-sm p-2 bg-[#2463EB]/5 rounded-lg hover:bg-[#2463EB]/10 transition-colors">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-[#2463EB]" />
                          <span className="text-[#2463EB]">{doc.name}</span>
                        </div>
                        <span className="text-gray-600">{doc.size}MB</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <Progress 
                    value={(bot.storageUsed / bot.storageLimit) * 100} 
                    className="h-1.5 bg-[#2463EB]/20 [&>[role=progressbar]]:bg-[#2463EB]"
                  />
                  <p className="text-xs text-gray-600 mt-1">Storage Usage</p>
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

