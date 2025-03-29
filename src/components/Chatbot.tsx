
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, X, Minimize, Maximize } from "lucide-react";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
};

const generateBotResponse = async (message: string): Promise<string> => {
  // This is a simple mock response function
  // In a real application, you would call an AI service API here
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
  
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
    return "Hello! How can I help you with Value M's cloud services today?";
  }
  
  if (lowerMessage.includes("aws") || lowerMessage.includes("amazon")) {
    return "Value M provides comprehensive AWS services including migration, optimization, and managed services. Would you like to know more?";
  }
  
  if (lowerMessage.includes("azure") || lowerMessage.includes("microsoft")) {
    return "Our Azure cloud solutions help businesses leverage Microsoft's cloud platform for maximum efficiency and scalability.";
  }
  
  if (lowerMessage.includes("google") || lowerMessage.includes("gcp")) {
    return "Value M's Google Cloud experts can help you implement and optimize GCP services for your business needs.";
  }
  
  if (lowerMessage.includes("salesforce")) {
    return "We offer end-to-end Salesforce implementation, customization, and support services to maximize your CRM effectiveness.";
  }
  
  if (lowerMessage.includes("oracle")) {
    return "Value M provides Oracle Cloud Infrastructure services to help you migrate and optimize your applications in the Oracle Cloud.";
  }
  
  if (lowerMessage.includes("service") || lowerMessage.includes("help") || lowerMessage.includes("support")) {
    return "Value M offers cloud services across AWS, Azure, Google Cloud, Salesforce, and Oracle. How can we assist you with your cloud needs?";
  }
  
  if (lowerMessage.includes("contact") || lowerMessage.includes("speak")) {
    return "You can reach our team at contact@valuemtcc.com or visit our website at www.valuemtcc.com for more information.";
  }
  
  return "I'm here to help with any questions about Value M's cloud services. We specialize in AWS, Azure, Google Cloud, Salesforce, and Oracle solutions. What would you like to know?";
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Hi there! I'm Value M's virtual assistant. How can I help you with our cloud services today?",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await generateBotResponse(input);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: response,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: "I'm sorry, I couldn't process your request. Please try again later.",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <Card className={cn(
          "w-[350px] shadow-lg transition-all duration-300 ease-in-out",
          isMinimized ? "h-[60px]" : "h-[450px]"
        )}>
          <CardHeader className="px-4 py-3 flex flex-row items-center justify-between space-y-0 border-b">
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              <h3 className="font-medium text-sm">Value M Assistant</h3>
            </div>
            <div className="flex items-center space-x-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7" 
                onClick={toggleMinimize}
              >
                {isMinimized ? <Maximize className="h-4 w-4" /> : <Minimize className="h-4 w-4" />}
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7" 
                onClick={toggleChat}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          {!isMinimized && (
            <>
              <CardContent className="p-0 h-[320px]">
                <ScrollArea className="h-full p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          "flex",
                          message.sender === "user" ? "justify-end" : "justify-start"
                        )}
                      >
                        <div
                          className={cn(
                            "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                            message.sender === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          )}
                        >
                          {message.text}
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="max-w-[80%] rounded-lg px-3 py-2 text-sm bg-muted">
                          <div className="flex items-center space-x-1">
                            <div className="h-2 w-2 rounded-full bg-secondary animate-pulse-slow"></div>
                            <div className="h-2 w-2 rounded-full bg-secondary animate-pulse-slow delay-150"></div>
                            <div className="h-2 w-2 rounded-full bg-secondary animate-pulse-slow delay-300"></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </CardContent>
              
              <CardFooter className="p-3 border-t">
                <form
                  className="flex w-full items-center space-x-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                >
                  <Input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    disabled={!input.trim() || isLoading}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </>
          )}
        </Card>
      ) : (
        <Button
          onClick={toggleChat}
          className="rounded-full w-12 h-12 shadow-lg"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

export default Chatbot;
