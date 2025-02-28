import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bot, Send, Image as ImageIcon } from 'lucide-react';

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

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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
    
    // Simulate bot response with a delay
    setTimeout(() => {
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
          content: `I received your message: "${input.trim()}". This is a placeholder response. In a real implementation, this would connect to an AI service.`,
          role: 'assistant',
          type: 'text'
        };
      }
      
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
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
            <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-3 rounded-lg ${
                    msg.role === 'user'
                      ? 'ml-auto bg-blue-100 dark:bg-blue-900 dark:text-blue-100 max-w-[80%]'
                      : 'mr-auto bg-gray-100 dark:bg-gray-800 dark:text-gray-200 max-w-[80%]'
                  }`}
                >
                  {msg.type === 'text' ? (
                    <p>{msg.content}</p>
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
            <div className="border-t p-4 flex gap-2 bg-background fixed bottom-0 left-0 right-0">
              <Input
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
                autoFocus
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={isLoading || !input.trim()}
                className="hover:bg-blue-100 dark:hover:bg-blue-800 hover:text-blue-600 dark:hover:text-blue-300 transition-all duration-200"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoboDocs;