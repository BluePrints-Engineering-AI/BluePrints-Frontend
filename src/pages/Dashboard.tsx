import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {chatBots.map((bot) => (
          <Card 
            key={bot.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-medium">{bot.name}</CardTitle>
              <Bot className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Messages:</span>
                      <span className="font-medium">{bot.totalMessages}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Usage Time:</span>
                      <span className="font-medium">{bot.usageTime}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Storage:</span>
                      <span className="font-medium">{bot.storageUsed}GB / {bot.storageLimit}GB</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Documents:</span>
                      <span className="font-medium">{bot.documentsCount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Last Used:</span>
                      <span className="font-medium">{bot.lastUsed}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Training Documents</h4>
                  <div className="space-y-1">
                    {bot.documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-blue-600" />
                          <span>{doc.name}</span>
                        </div>
                        <span className="text-muted-foreground">{doc.size}MB</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate(`/chat/${bot.id}`)}
                  >
                    Open Chat
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle document upload
                    }}
                  >
                    Add Document
                  </Button>
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