
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface ChatInputProps {
  message: string;
  onMessageChange: (message: string) => void;
  onSend: () => void;
}

export const ChatInput = ({ message, onMessageChange, onSend }: ChatInputProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-[#2463EB]">Chat with Bot</label>
      <div className="flex items-center gap-2">
        <Input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          className="flex-1"
        />
        <Button onClick={onSend}>
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
