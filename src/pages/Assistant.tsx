
import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Sparkles, Code, BookOpen, FileText } from "lucide-react";

interface Message {
  id: number;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

const Assistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! I'm your AI documentation assistant. How can I help you today?",
      sender: "assistant",
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      content: newMessage,
      sender: "user",
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setNewMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        content: "I'm analyzing your code documentation. Based on best practices, I suggest adding more context to your function descriptions and including parameter types in your comments.",
        sender: "assistant",
        timestamp: new Date()
      };
      setMessages(prevMessages => [...prevMessages, aiResponse]);
    }, 1000);
  };

  const assistantCapabilities = [
    {
      icon: Code,
      title: "Code Analysis",
      description: "Analyze your code and suggest documentation improvements"
    },
    {
      icon: BookOpen,
      title: "Learning Resources",
      description: "Recommend resources based on your documentation needs"
    },
    {
      icon: FileText,
      title: "Template Generation",
      description: "Generate documentation templates for your specific code"
    }
  ];

  return (
    <Layout 
      title="AI Documentation Assistant" 
      subtitle="Get smart suggestions to improve your code documentation"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border h-[calc(100vh-250px)] flex flex-col">
            <CardContent className="p-4 flex-1 overflow-y-auto">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div 
                      className={`flex gap-3 max-w-[80%] ${
                        message.sender === "user" 
                          ? "flex-row-reverse" 
                          : "flex-row"
                      }`}
                    >
                      <Avatar>
                        {message.sender === "assistant" ? (
                          <>
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              <Sparkles className="h-4 w-4" />
                            </AvatarFallback>
                          </>
                        ) : (
                          <>
                            <AvatarImage src="https://avatars.dicebear.com/api/initials/user.svg" />
                            <AvatarFallback>U</AvatarFallback>
                          </>
                        )}
                      </Avatar>
                      <div 
                        className={`rounded-lg p-3 ${
                          message.sender === "assistant" 
                            ? "bg-secondary text-secondary-foreground" 
                            : "bg-primary text-primary-foreground"
                        }`}
                      >
                        <p>{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input 
                  placeholder="Ask something about code documentation..." 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-lg mb-2">AI Capabilities</h3>
                  <div className="space-y-4">
                    {assistantCapabilities.map((capability, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <capability.icon className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{capability.title}</h4>
                          <p className="text-sm text-muted-foreground">{capability.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-2">Try asking</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start" onClick={() => setNewMessage("How can I document my API endpoints?")}>
                      How can I document my API endpoints?
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => setNewMessage("What are best practices for TypeScript documentation?")}>
                      What are best practices for TypeScript documentation?
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => setNewMessage("Can you review my function documentation?")}>
                      Can you review my function documentation?
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Assistant;
