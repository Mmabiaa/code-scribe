
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, BookOpen, Award, BarChart, Clock, Calendar } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const ProgressPage = () => {
  const navigate = useNavigate();
  // Sample data for learning progress
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Getting Started with Documentation",
      completed: 5,
      total: 8,
      percentComplete: 62,
      lastAccessed: "2 days ago"
    },
    {
      id: 2,
      title: "Advanced Documentation Techniques",
      completed: 2,
      total: 10,
      percentComplete: 20,
      lastAccessed: "1 week ago"
    },
    {
      id: 3,
      title: "API Documentation Fundamentals",
      completed: 0,
      total: 6,
      percentComplete: 0,
      lastAccessed: "Not started"
    }
  ]);

  const achievements = [
    { id: 1, title: "First Module Complete", date: "Apr 3, 2025", icon: CheckCircle },
    { id: 2, title: "Documentation Expert", date: "Mar 28, 2025", icon: Award },
    { id: 3, title: "Community Contributor", date: "Mar 15, 2025", icon: BookOpen }
  ];
  
  const upcomingEvents = [
    {
      id: 1,
      title: "Advanced Documentation Patterns",
      type: "Workshop",
      date: "April 10, 2025",
      time: "2:00 PM"
    },
    {
      id: 2,
      title: "Q&A with Documentation Experts",
      type: "Webinar",
      date: "April 15, 2025",
      time: "1:00 PM"
    }
  ];

  const handleContinueCourse = (courseId, isStarted) => {
    // In a real app, this would navigate to the specific course content
    toast({
      title: isStarted ? "Continuing Course" : "Starting Course",
      description: `You're ${isStarted ? "continuing" : "starting"} the course now.`,
    });
    
    // Navigate to learn page as a placeholder
    navigate("/learn");
  };

  const handleViewAllAchievements = () => {
    toast({
      title: "View All Achievements",
      description: "Navigating to achievements page...",
    });
    // This would navigate to a dedicated achievements page in a full implementation
  };

  const handleViewAllEvents = () => {
    toast({
      title: "View All Events",
      description: "Navigating to events calendar...",
    });
    // This would navigate to a events calendar in a full implementation
  };

  const calculateOverallProgress = () => {
    const totalCompleted = courses.reduce((sum, course) => sum + course.completed, 0);
    const totalLessons = courses.reduce((sum, course) => sum + course.total, 0);
    return Math.round((totalCompleted / totalLessons) * 100);
  };

  return (
    <Layout title="Your Learning Progress" subtitle="Track your journey and achievements">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Overall Progress</CardTitle>
              <CardDescription>Your learning journey across all courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Total Course Completion</span>
                    <span>{calculateOverallProgress()}%</span>
                  </div>
                  <Progress value={calculateOverallProgress()} className="h-2" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                      <BookOpen className="h-8 w-8 text-primary mb-2" />
                      <p className="text-2xl font-bold">{courses.reduce((sum, course) => sum + course.completed, 0)}</p>
                      <p className="text-sm text-muted-foreground">Lessons Completed</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                      <Clock className="h-8 w-8 text-primary mb-2" />
                      <p className="text-2xl font-bold">12.5</p>
                      <p className="text-sm text-muted-foreground">Hours Spent</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                      <Award className="h-8 w-8 text-primary mb-2" />
                      <p className="text-2xl font-bold">{achievements.length}</p>
                      <p className="text-sm text-muted-foreground">Achievements</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-xl font-semibold mb-4">Your Courses</h2>
          <div className="space-y-4">
            {courses.map((course) => (
              <Card key={course.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div className="space-y-2">
                      <h3 className="font-medium">{course.title}</h3>
                      <div className="text-sm text-muted-foreground">Last accessed: {course.lastAccessed}</div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{course.completed} of {course.total} lessons</span>
                          <span>{course.percentComplete}%</span>
                        </div>
                        <Progress value={course.percentComplete} className="h-2" />
                      </div>
                    </div>
                    <Button 
                      className="self-start"
                      onClick={() => handleContinueCourse(course.id, course.completed > 0)}
                    >
                      {course.completed > 0 ? "Continue" : "Start"} Course
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>Badges and milestones you've reached</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map((achievement) => {
                  const Icon = achievement.icon;
                  return (
                    <div key={achievement.id} className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{achievement.title}</p>
                        <p className="text-sm text-muted-foreground">{achievement.date}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleViewAllAchievements}
              >
                View All Achievements
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Workshops and webinars</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{event.title}</p>
                        <Badge variant="outline" className="ml-2">{event.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{event.date} • {event.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleViewAllEvents}
              >
                View All Events
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ProgressPage;
