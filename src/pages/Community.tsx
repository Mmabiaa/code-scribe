
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Heart, Share, Clock, Search } from "lucide-react";

const discussionTopics = [
  {
    id: 1,
    title: "Best practices for documenting React components?",
    author: {
      name: "Alex Johnson",
      avatar: "AJ"
    },
    replies: 24,
    likes: 15,
    category: "React",
    timeAgo: "3 hours ago",
    excerpt: "I'm working on a large React project and want to ensure our documentation is consistent and helpful. What approaches do you recommend for..."
  },
  {
    id: 2,
    title: "How to document API endpoints effectively?",
    author: {
      name: "Sarah Lee",
      avatar: "SL"
    },
    replies: 18,
    likes: 22,
    category: "API",
    timeAgo: "1 day ago",
    excerpt: "I'm building a REST API and looking for the most effective way to document the endpoints so that other developers can easily understand..."
  },
  {
    id: 3,
    title: "Tools for generating documentation from TypeScript",
    author: {
      name: "Michael Chen",
      avatar: "MC"
    },
    replies: 32,
    likes: 41,
    category: "TypeScript",
    timeAgo: "2 days ago",
    excerpt: "I'm looking for recommendations on tools that can automatically generate good documentation from TypeScript code. We have a large codebase..."
  }
];

const Community = () => {
  return (
    <Layout 
      title="Community Forums" 
      subtitle="Connect with fellow learners, ask questions, and share knowledge"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div className="relative w-full max-w-md">
              <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
              <Input 
                placeholder="Search discussions..." 
                className="pl-10"
              />
            </div>
            <Button>Start Discussion</Button>
          </div>
          
          <Tabs defaultValue="popular">
            <TabsList>
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
            </TabsList>
            
            <TabsContent value="popular" className="space-y-4 mt-4">
              {discussionTopics.map((topic) => (
                <Card key={topic.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src={`https://avatars.dicebear.com/api/initials/${topic.author.avatar}.svg`} />
                        <AvatarFallback>{topic.author.avatar}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{topic.author.name}</span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {topic.timeAgo}
                          </span>
                          <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                            {topic.category}
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-medium mb-2">{topic.title}</h3>
                        <p className="text-muted-foreground mb-4">{topic.excerpt}</p>
                        
                        <div className="flex items-center gap-4">
                          <Button variant="ghost" size="sm" className="gap-1">
                            <MessageCircle className="h-4 w-4" /> {topic.replies}
                          </Button>
                          <Button variant="ghost" size="sm" className="gap-1">
                            <Heart className="h-4 w-4" /> {topic.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="gap-1">
                            <Share className="h-4 w-4" /> Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="recent">
              <div className="py-8 text-center text-muted-foreground">
                Same discussions but sorted by date
              </div>
            </TabsContent>
            
            <TabsContent value="unanswered">
              <div className="py-8 text-center text-muted-foreground">
                Discussions without answers would appear here
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Community Stats</CardTitle>
              <CardDescription>Our growing community</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Members</span>
                  <span className="font-medium">3,247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Discussions</span>
                  <span className="font-medium">1,842</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Replies</span>
                  <span className="font-medium">8,924</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active today</span>
                  <span className="font-medium">245</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Popular Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">JavaScript</Button>
                <Button variant="outline" size="sm">React</Button>
                <Button variant="outline" size="sm">TypeScript</Button>
                <Button variant="outline" size="sm">API</Button>
                <Button variant="outline" size="sm">Documentation</Button>
                <Button variant="outline" size="sm">Best Practices</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Community;
