import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bot, Send, Image as ImageIcon, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  type: 'text' | 'image';
}

const RoboDocs = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m RoboDocs. How can I help you today?',
      role: 'assistant',
      type: 'text'
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const responseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [lastMessageId, setLastMessageId] = useState<string>('1');

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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
      role: 'user',
      type: 'text'
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Store input for later use
    const currentInput = input.trim();
    
    // Simulate bot response with a delay
    responseTimeoutRef.current = setTimeout(() => {
      // Randomly decide if response should be text or image (80% text, 20% image)
      const isImageResponse = Math.random() < 0.2;
      
      let botMessage: Message;
      
      if (isImageResponse) {
        botMessage = {
          id: (Date.now() + 1).toString(),
          // Use a placeholder image
          content: 'https://via.placeholder.com/400x300?text=RoboDocs+Image+Response',
          role: 'assistant',
          type: 'image'
        };
      } else {
        botMessage = {
          id: (Date.now() + 1).toString(),
          content: `I received your message: "${currentInput}". This is a placeholder response. In a real implementation, this would connect to an AI service.`,
          role: 'assistant',
          type: 'text'
        };
      }
      
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
      responseTimeoutRef.current = null;
    }, 1000);
  };

  const handleStopResponse = () => {
    if (responseTimeoutRef.current) {
      clearTimeout(responseTimeoutRef.current);
      responseTimeoutRef.current = null;
    }
    setIsLoading(false);
  };

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const handleApproveMessage = (id: string) => {
    // In a real app, you would send this feedback to your backend
    console.log(`Message ${id} approved`);
  };

  const handleDisapproveMessage = (id: string) => {
    // In a real app, you would send this feedback to your backend
    console.log(`Message ${id} disapproved`);
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
                    msg.role === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`p-3 rounded-lg inline-block ${
                      msg.role === 'user'
                        ? 'bg-blue-100 dark:bg-blue-900 dark:text-blue-100 font-semibold'
                        : 'bg-gray-100 dark:bg-gray-800 dark:text-gray-200 font-semibold'
                    }`}
                  >
                    {msg.type === 'text' ? (
                      <p className="whitespace-pre-wrap break-words">{msg.content}</p>
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
                          style={{ maxHeight: '300px' }}
                        />
                      </div>
                    )}
                  </div>
                  
                  {msg.role === 'assistant' && (
                    <div 
                      className={`flex gap-1 mt-1 ${
                        msg.id === lastMessageId 
                          ? 'opacity-100' 
                          : 'opacity-0 group-hover:opacity-100'
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
                        className="h-6 w-6"
                      >
                        <ThumbsUp className="h-3 w-3" />
                      </Button>
                      <Button
                        onClick={() => handleDisapproveMessage(msg.id)}
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                      >
                        <ThumbsDown className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="mr-auto bg-gray-100 dark:bg-gray-800 dark:text-gray-200 p-3 rounded-lg">
                  <div className="flex space-x-2 items-center">
                    <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              )}
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
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button 
                  onClick={isLoading ? handleStopResponse : handleSendMessage} 
                  disabled={isLoading ? false : !input.trim()}
                  className={`transition-all duration-200 w-10 p-0 ${
                    isLoading 
                      ? 'bg-red-100 hover:bg-red-200 text-red-600 dark:bg-red-900 dark:hover:bg-red-800 dark:text-red-300' 
                      : 'hover:bg-blue-100 dark:hover:bg-blue-800 hover:text-blue-600 dark:hover:text-blue-300'
                  }`}
                >
                  {isLoading ? (
                    <div className="h-4 w-4 relative">
                      <div className="absolute inset-0 rounded-sm bg-current"></div>
                    </div>
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
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