
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Bot, FileText } from "lucide-react";
import { ChatBot } from "@/types/dashboard";

interface ChatBotCardProps {
  bot: ChatBot;
  onClick: () => void;
  index: number;
}

export const ChatBotCard = ({ bot, onClick, index }: ChatBotCardProps) => {
  return (
    <Card 
      className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer animate-fade-up"
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={onClick}
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
  );
};
