import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText, Slack, MessageCircle, Trash2, Bot } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Document {
  id: string;
  name: string;
  size: string;
  lastModified: string;
}

interface ChatBot {
  id: string;
  name: string;
  documents: Document[];
  storageUsed: number;
  storageLimit: number;
}

const Dashboard = () => {
  const { toast } = useToast();
  const [selectedBot, setSelectedBot] = useState<string>("1");
  
  const [chatBots] = useState<ChatBot[]>([
    {
      id: "1",
      name: "Customer Support Bot",
      documents: [
        {
          id: "1",
          name: "Support Manual.pdf",
          size: "2.4 MB",
          lastModified: "2024-02-20",
        },
        {
          id: "2",
          name: "FAQ.docx",
          size: "1.8 MB",
          lastModified: "2024-02-19",
        },
      ],
      storageUsed: 4.2,
      storageLimit: 10,
    },
    {
      id: "2",
      name: "Sales Assistant Bot",
      documents: [
        {
          id: "3",
          name: "Product Catalog.pdf",
          size: "3.1 MB",
          lastModified: "2024-02-21",
        },
      ],
      storageUsed: 3.1,
      storageLimit: 10,
    },
  ]);

  const selectedChatBot = chatBots.find(bot => bot.id === selectedBot);

  const handleIntegration = (platform: "slack" | "discord") => {
    toast({
      title: "Integration Started",
      description: `Redirecting to ${platform} authorization for ${selectedChatBot?.name}...`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="grid gap-6">
        {/* ChatBot Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Your ChatBots</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedBot} onValueChange={setSelectedBot}>
              <TabsList className="w-full justify-start">
                {chatBots.map((bot) => (
                  <TabsTrigger key={bot.id} value={bot.id} className="flex items-center gap-2">
                    <Bot className="w-4 h-4" />
                    {bot.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>

        {selectedChatBot && (
          <>
            {/* Storage Card */}
            <Card>
              <CardHeader>
                <CardTitle>Storage Usage - {selectedChatBot.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress 
                  value={(selectedChatBot.storageUsed / selectedChatBot.storageLimit) * 100} 
                  className="mb-2" 
                />
                <p className="text-sm text-gray-600">
                  {selectedChatBot.storageUsed}GB used of {selectedChatBot.storageLimit}GB
                </p>
              </CardContent>
            </Card>

            {/* Documents Table */}
            <Card>
              <CardHeader>
                <CardTitle>Training Documents - {selectedChatBot.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Last Modified</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedChatBot.documents.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          {doc.name}
                        </TableCell>
                        <TableCell>{doc.size}</TableCell>
                        <TableCell>{doc.lastModified}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              toast({
                                title: "Document Deleted",
                                description: "The document has been removed.",
                              });
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Integrations Card */}
            <Card>
              <CardHeader>
                <CardTitle>Integrations - {selectedChatBot.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex gap-4">
                <Button
                  onClick={() => handleIntegration("slack")}
                  className="flex items-center gap-2"
                >
                  <Slack className="w-4 h-4" />
                  Connect to Slack
                </Button>
                <Button
                  onClick={() => handleIntegration("discord")}
                  className="flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Connect to Discord
                </Button>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;