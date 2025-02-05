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
import { FileText, Slack, MessageCircle, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Document {
  id: string;
  name: string;
  size: string;
  lastModified: string;
}

const Dashboard = () => {
  const { toast } = useToast();
  const [documents] = useState<Document[]>([
    {
      id: "1",
      name: "Engineering Specs.pdf",
      size: "2.4 MB",
      lastModified: "2024-02-20",
    },
    {
      id: "2",
      name: "Product Manual.docx",
      size: "1.8 MB",
      lastModified: "2024-02-19",
    },
  ]);

  const storageUsed = 4.2; // GB
  const storageLimit = 10; // GB
  const storagePercentage = (storageUsed / storageLimit) * 100;

  const handleIntegration = (platform: "slack" | "discord") => {
    toast({
      title: "Integration Started",
      description: `Redirecting to ${platform} authorization...`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="grid gap-6">
        {/* Storage Card */}
        <Card>
          <CardHeader>
            <CardTitle>Storage Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={storagePercentage} className="mb-2" />
            <p className="text-sm text-gray-600">
              {storageUsed}GB used of {storageLimit}GB
            </p>
          </CardContent>
        </Card>

        {/* Documents Table */}
        <Card>
          <CardHeader>
            <CardTitle>Documents</CardTitle>
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
                {documents.map((doc) => (
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
            <CardTitle>Integrations</CardTitle>
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
      </div>
    </div>
  );
};

export default Dashboard;