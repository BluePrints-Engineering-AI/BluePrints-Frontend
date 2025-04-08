import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Bot,
  Send,
  Image as ImageIcon,
  Copy,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  type: "text" | "image";
  feedback?: "like" | "dislike";
}

const RoboDocs = () => {
  const { roboDocsChat } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm RoboDocs. How can I help you today?",
      role: "assistant",
      type: "text",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [lastMessageId, setLastMessageId] = useState<string>("1");

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when loading state changes
  useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus();
    }
  }, [isLoading]);

  // Update last message ID when messages change
  useEffect(() => {
    if (messages.length > 0) {
      setLastMessageId(messages[messages.length - 1].id);
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: "user",
      type: "text",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Store input for later use
    const currentInput = input.trim();

    const { error, response } = await roboDocsChat(currentInput);

    let botMessage: Message;

    if (error) {
      console.error("Error processing request: ", error);
      botMessage = {
        id: (Date.now() + 1).toString(),
        content: "There was an error processing your request.",
        role: "assistant",
        type: "text",
      };
    } else {
      botMessage = {
        id: (Date.now() + 1).toString(),
        content: response.response ?? "Response is null",
        role: "assistant",
        type: "text",
      };
    }

    setMessages((prev) => [...prev, botMessage]);
  };

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const handleApproveMessage = (id: string) => {
    // Update message feedback - toggle if already liked
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === id) {
          // If already liked, remove feedback, otherwise set to like
          return {
            ...msg,
            feedback: msg.feedback === "like" ? undefined : "like",
          };
        }
        return msg;
      })
    );
    console.log(`Message ${id} feedback updated`);
  };

  const handleDisapproveMessage = (id: string) => {
    // Update message feedback - toggle if already disliked
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === id) {
          // If already disliked, remove feedback, otherwise set to dislike
          return {
            ...msg,
            feedback: msg.feedback === "dislike" ? undefined : "dislike",
          };
        }
        return msg;
      })
    );
    console.log(`Message ${id} feedback updated`);
  };

  return (
    <div className="fixed inset-0 flex flex-col pt-16">
      <Card className="flex-1 w-full rounded-none shadow-none border-0 overflow-hidden">
        <CardHeader className="border-b">
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-blue-500" />
            <span>RoboDocs Assistant</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 h-full flex flex-col relative">
          <div className="absolute inset-0 flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-28">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.role === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`p-3 rounded-lg inline-block ${
                      msg.role === "user"
                        ? "bg-blue-100 dark:bg-blue-900 dark:text-blue-100 font-semibold"
                        : "bg-gray-100 dark:bg-gray-800 dark:text-gray-200 font-semibold"
                    }`}
                  >
                    {msg.type === "text" ? (
                      <p className="whitespace-pre-wrap break-words">
                        {msg.content}
                      </p>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mb-1">
                          <ImageIcon className="h-4 w-4" />
                          <span>Image</span>
                        </div>
                        <img
                          src={msg.content}
                          alt="AI generated"
                          className="max-w-full rounded-md"
                          style={{ maxHeight: "300px" }}
                        />
                      </div>
                    )}
                  </div>

                  {msg.role === "assistant" && (
                    <div
                      className={`flex gap-1 mt-1 ${
                        msg.id === lastMessageId
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      } transition-opacity`}
                    >
                      <Button
                        onClick={() => handleCopyMessage(msg.content)}
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button
                        onClick={() => handleApproveMessage(msg.id)}
                        variant="ghost"
                        size="icon"
                        className={`h-6 w-6 ${
                          msg.feedback === "like" ? "text-green-600" : ""
                        }`}
                      >
                        <ThumbsUp className="h-3 w-3" />
                      </Button>
                      <Button
                        onClick={() => handleDisapproveMessage(msg.id)}
                        variant="ghost"
                        size="icon"
                        className={`h-6 w-6 ${
                          msg.feedback === "dislike" ? "text-red-600" : ""
                        }`}
                      >
                        <ThumbsDown className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-2xl mx-auto px-4">
              <div className="bg-background border rounded-lg p-3 flex gap-2 shadow-[0_0_40px_rgba(59,130,246,0.15)] font-semibold">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!input.trim()}
                  className="transition-all duration-200 w-10 p-0 hover:bg-blue-100 dark:hover:bg-blue-800 hover:text-blue-600 dark:hover:text-blue-300"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoboDocs;
