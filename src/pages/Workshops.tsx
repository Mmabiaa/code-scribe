
import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Video, Users, Clock, Calendar as CalendarIcon } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const upcomingWorkshops = [
  {
    id: 1,
    title: "Advanced Documentation Patterns",
    description: "Learn best practices for documenting complex systems and architectures",
    date: "April 10, 2025",
    time: "2:00 PM - 4:00 PM",
    host: "Dr. Jane Smith",
    spots: 25,
    spotsLeft: 8,
    type: "Workshop",
    tags: ["Advanced", "Architecture"]
  },
  {
    id: 2,
    title: "Q&A with Documentation Experts",
    description: "Live Q&A session with industry experts on documentation challenges",
    date: "April 15, 2025",
    time: "1:00 PM - 2:30 PM",
    host: "Documentation Panel",
    spots: 100,
    spotsLeft: 42,
    type: "Webinar",
    tags: ["Q&A", "Expert Session"]
  },
  {
    id: 3,
    title: "Documentation for Open Source Projects",
    description: "How to create effective documentation for community projects",
    date: "April 22, 2025",
    time: "3:00 PM - 5:00 PM",
    host: "Mark Johnson",
    spots: 50,
    spotsLeft: 15,
    type: "Workshop",
    tags: ["Open Source", "Community"]
  }
];

const pastWorkshops = [
  {
    id: 101,
    title: "Introduction to API Documentation",
    description: "Fundamentals of documenting APIs for developers",
    date: "March 25, 2025",
    recording: true,
    host: "Alex Chen",
    type: "Workshop",
    tags: ["API", "Beginner"]
  },
  {
    id: 102,
    title: "Documentation Tools Comparison",
    description: "Review of popular documentation tools and when to use them",
    date: "March 18, 2025",
    recording: true,
    host: "Sarah Williams",
    type: "Webinar",
    tags: ["Tools", "Comparison"]
  },
  {
    id: 103,
    title: "Documentation Metrics and Analytics",
    description: "How to measure the effectiveness of your documentation",
    date: "March 5, 2025",
    recording: false,
    host: "David Lee",
    type: "Workshop",
    tags: ["Analytics", "Advanced"]
  }
];

const WorkshopCard = ({ workshop, isPast = false }) => {
  const handleRegister = () => {
    toast({
      title: "Registration Successful",
      description: `You've been registered for "${workshop.title}"`,
    });
  };

  const handleWatchRecording = () => {
    toast({
      title: "Accessing Recording",
      description: `Opening recording for "${workshop.title}"`,
    });
  };

  const handleJoinWaitlist = () => {
    toast({
      title: "Added to Waitlist",
      description: `You've been added to the waitlist for "${workshop.title}"`,
    });
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Badge variant="outline" className="mb-2">
            {workshop.type}
          </Badge>
          {!isPast && (
            <div className="text-sm text-muted-foreground">
              {workshop.spotsLeft > 0 
                ? `${workshop.spotsLeft} spots left` 
                : "Waitlist only"}
            </div>
          )}
        </div>
        <CardTitle className="text-lg">{workshop.title}</CardTitle>
        <CardDescription>{workshop.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div className="flex items-center gap-2 text-sm">
          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          <span>{workshop.date}</span>
        </div>
        
        {!isPast && (
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{workshop.time}</span>
          </div>
        )}
        
        <div className="flex items-center gap-2 text-sm">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span>Host: {workshop.host}</span>
        </div>
        
        {isPast && (
          <div className="flex items-center gap-2 text-sm">
            <Video className="h-4 w-4 text-muted-foreground" />
            <span>{workshop.recording ? "Recording available" : "No recording available"}</span>
          </div>
        )}
        
        <div className="flex flex-wrap gap-2 mt-2">
          {workshop.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        {isPast ? (
          workshop.recording ? (
            <Button variant="outline" className="w-full" onClick={handleWatchRecording}>
              <Video className="h-4 w-4 mr-2" />
              Watch Recording
            </Button>
          ) : (
            <Button variant="outline" className="w-full" disabled>
              No Recording Available
            </Button>
          )
        ) : workshop.spotsLeft > 0 ? (
          <Button className="w-full" onClick={handleRegister}>
            Register Now
          </Button>
        ) : (
          <Button variant="outline" className="w-full" onClick={handleJoinWaitlist}>
            Join Waitlist
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

const WorkshopsPage = () => {
  const [selectedTab, setSelectedTab] = useState("upcoming");

  return (
    <Layout title="Live Workshops" subtitle="Join expert-led sessions and webinars">
      <Tabs defaultValue="upcoming" className="w-full" onValueChange={setSelectedTab}>
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past Recordings</TabsTrigger>
          </TabsList>
          
          {selectedTab === "upcoming" && (
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              Add to Calendar
            </Button>
          )}
        </div>
        
        <TabsContent value="upcoming" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingWorkshops.map((workshop) => (
              <WorkshopCard key={workshop.id} workshop={workshop} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="past" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastWorkshops.map((workshop) => (
              <WorkshopCard key={workshop.id} workshop={workshop} isPast={true} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default WorkshopsPage;
