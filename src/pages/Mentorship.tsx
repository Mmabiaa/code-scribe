
import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UserPlus, MessageSquare, Search, Calendar, Star, Filter } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const mentors = [
  {
    id: 1,
    name: "Alex Johnson",
    title: "Senior Technical Writer at TechCorp",
    bio: "10+ years experience in API documentation and developer guides",
    expertise: ["API Documentation", "Developer Experience", "Technical Writing"],
    rating: 4.9,
    reviewCount: 24,
    availability: "Evenings & Weekends",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=60"
  },
  {
    id: 2,
    name: "Sarah Williams",
    title: "Documentation Lead at DevTools Inc.",
    bio: "Specializing in open source project documentation and community engagement",
    expertise: ["Open Source", "Community Management", "Documentation Systems"],
    rating: 4.7,
    reviewCount: 18,
    availability: "Weekday Afternoons",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60"
  },
  {
    id: 3,
    name: "Miguel Rodriguez",
    title: "Senior Developer Advocate",
    bio: "Expert in creating developer-friendly documentation and tutorials",
    expertise: ["Tutorials", "SDK Documentation", "Video Content"],
    rating: 4.8,
    reviewCount: 32,
    availability: "Flexible",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60"
  },
  {
    id: 4,
    name: "Lisa Chen",
    title: "Documentation Architect at CloudSoft",
    bio: "Specializing in cloud infrastructure and platform documentation",
    expertise: ["Cloud Services", "System Architecture", "Technical Diagrams"],
    rating: 4.6,
    reviewCount: 15,
    availability: "Weekday Mornings",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60"
  }
];

const myMentors = [
  {
    id: 2,
    name: "Sarah Williams",
    title: "Documentation Lead at DevTools Inc.",
    bio: "Specializing in open source project documentation and community engagement",
    expertise: ["Open Source", "Community Management", "Documentation Systems"],
    nextSession: "Apr 12, 2025 • 2:00 PM",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60"
  }
];

const myMentees = [
  {
    id: 101,
    name: "James Wilson",
    title: "Junior Technical Writer",
    bio: "Learning how to create effective API documentation",
    focus: "API Documentation Best Practices",
    nextSession: "Apr 10, 2025 • 4:00 PM",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60"
  }
];

const MentorshipPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("find");
  const [showMentorForm, setShowMentorForm] = useState(false);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleConnect = (mentorId) => {
    const mentor = mentors.find(m => m.id === mentorId);
    toast({
      title: "Connection Request Sent",
      description: `Your request to connect with ${mentor.name} has been sent.`,
    });
  };

  const handleSchedule = (personId, isMentor = true) => {
    const person = isMentor 
      ? myMentors.find(m => m.id === personId) 
      : myMentees.find(m => m.id === personId);
    
    toast({
      title: "Session Scheduling",
      description: `Opening scheduler to book a session with ${person.name}`,
    });
  };

  const handleMessage = (personId, isMentor = true) => {
    const person = isMentor 
      ? myMentors.find(m => m.id === personId) 
      : myMentees.find(m => m.id === personId);
    
    toast({
      title: "Message Sent",
      description: `Opening chat with ${person.name}`,
    });
  };

  const handleBecomeMentor = (e) => {
    e.preventDefault();
    toast({
      title: "Application Submitted",
      description: "Your application to become a mentor has been submitted for review.",
    });
    setShowMentorForm(false);
  };

  // Filter mentors based on search query
  const filteredMentors = mentors.filter(mentor => 
    mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    mentor.expertise.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
    mentor.bio.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout title="Mentorship Program" subtitle="Connect with mentors or become one to help others">
      <Tabs defaultValue="find" className="w-full" onValueChange={setSelectedTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="find">Find a Mentor</TabsTrigger>
          <TabsTrigger value="my-mentors">My Mentors</TabsTrigger>
          <TabsTrigger value="my-mentees">My Mentees</TabsTrigger>
          <TabsTrigger value="become">Become a Mentor</TabsTrigger>
        </TabsList>
        
        <TabsContent value="find" className="mt-0">
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by name, expertise or keywords..." 
                className="pl-10"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <Button variant="outline" className="gap-2 whitespace-nowrap">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMentors.map((mentor) => (
              <Card key={mentor.id} className="flex flex-col h-full">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="h-14 w-14 rounded-full overflow-hidden">
                      <img 
                        src={mentor.image} 
                        alt={mentor.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{mentor.name}</CardTitle>
                      <CardDescription className="line-clamp-1">{mentor.title}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground mb-4">{mentor.bio}</p>
                  
                  <div className="mb-4">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-medium">{mentor.rating}</span>
                      <span className="text-muted-foreground text-sm">({mentor.reviewCount} reviews)</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <Calendar className="inline h-3 w-3 mr-1" />
                      Available: {mentor.availability}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-2">
                    {mentor.expertise.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => handleConnect(mentor.id)}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Connect
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="my-mentors" className="mt-0">
          {myMentors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myMentors.map((mentor) => (
                <Card key={mentor.id} className="flex flex-col h-full">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="h-14 w-14 rounded-full overflow-hidden">
                        <img 
                          src={mentor.image} 
                          alt={mentor.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{mentor.name}</CardTitle>
                        <CardDescription className="line-clamp-1">{mentor.title}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground mb-4">{mentor.bio}</p>
                    
                    <div className="p-2 bg-muted rounded-md mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Next session: {mentor.nextSession}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mt-2">
                      {mentor.expertise.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={() => handleMessage(mentor.id)}>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button className="flex-1" onClick={() => handleSchedule(mentor.id)}>
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No mentors yet</h3>
              <p className="text-muted-foreground mb-6">You haven't connected with any mentors yet.</p>
              <Button onClick={() => setSelectedTab("find")}>Find a Mentor</Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="my-mentees" className="mt-0">
          {myMentees.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myMentees.map((mentee) => (
                <Card key={mentee.id} className="flex flex-col h-full">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="h-14 w-14 rounded-full overflow-hidden">
                        <img 
                          src={mentee.image} 
                          alt={mentee.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{mentee.name}</CardTitle>
                        <CardDescription className="line-clamp-1">{mentee.title}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground mb-4">{mentee.bio}</p>
                    
                    <div className="p-2 bg-muted rounded-md mb-4">
                      <div className="flex items-center gap-2 text-sm font-medium mb-1">
                        Focus area:
                      </div>
                      <div className="text-sm">{mentee.focus}</div>
                    </div>
                    
                    <div className="p-2 bg-muted rounded-md">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Next session: {mentee.nextSession}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={() => handleMessage(mentee.id, false)}>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button className="flex-1" onClick={() => handleSchedule(mentee.id, false)}>
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No mentees yet</h3>
              <p className="text-muted-foreground mb-6">You're not mentoring anyone yet.</p>
              <Button onClick={() => setSelectedTab("become")}>Become a Mentor</Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="become" className="mt-0">
          {showMentorForm ? (
            <Card>
              <CardHeader>
                <CardTitle>Become a Mentor</CardTitle>
                <CardDescription>
                  Share your documentation expertise with others in the community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBecomeMentor} className="space-y-4">
                  <div>
                    <label htmlFor="expertise" className="block text-sm font-medium mb-1">
                      Areas of Expertise
                    </label>
                    <Input id="expertise" placeholder="e.g., API Documentation, Technical Writing" />
                  </div>
                  
                  <div>
                    <label htmlFor="experience" className="block text-sm font-medium mb-1">
                      Years of Experience
                    </label>
                    <Input id="experience" type="number" min="1" placeholder="e.g., 5" />
                  </div>
                  
                  <div>
                    <label htmlFor="availability" className="block text-sm font-medium mb-1">
                      Availability
                    </label>
                    <Input id="availability" placeholder="e.g., Weekday evenings, Weekend mornings" />
                  </div>
                  
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium mb-1">
                      Mentor Bio
                    </label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about your experience and what you can offer mentees..."
                      rows={4}
                    />
                  </div>
                  
                  <div className="flex gap-4 pt-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setShowMentorForm(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="flex-1">Submit Application</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          ) : (
            <div className="max-w-2xl mx-auto text-center py-12">
              <h3 className="text-2xl font-semibold mb-4">Share Your Knowledge</h3>
              <p className="text-muted-foreground mb-6">
                Become a mentor and help others improve their documentation skills.
                Share your expertise and give back to the community.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="p-4 border rounded-lg text-center">
                  <h4 className="font-medium mb-2">Build Your Network</h4>
                  <p className="text-sm text-muted-foreground">Connect with motivated learners and expand your professional network</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <h4 className="font-medium mb-2">Enhance Your Skills</h4>
                  <p className="text-sm text-muted-foreground">Teaching others is one of the best ways to solidify your own knowledge</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <h4 className="font-medium mb-2">Earn Recognition</h4>
                  <p className="text-sm text-muted-foreground">Gain badges and become a recognized expert in the community</p>
                </div>
              </div>
              <Button onClick={() => setShowMentorForm(true)}>Apply to Become a Mentor</Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default MentorshipPage;
