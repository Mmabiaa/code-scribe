
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, BookOpen, Award, BarChart, Clock, Calendar } from "lucide-react";

const ProgressPage = () => {
  // Sample data for learning progress
  const courses = [
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
  ];

  const achievements = [
    { id: 1, title: "First Module Complete", date: "Apr 3, 2025", icon: CheckCircle },
    { id: 2, title: "Documentation Expert", date: "Mar 28, 2025", icon: Award },
    { id: 3, title: "Community Contributor", date: "Mar 15, 2025", icon: BookOpen }
  ];

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
                    <span>27%</span>
                  </div>
                  <Progress value={27} className="h-2" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                      <BookOpen className="h-8 w-8 text-primary mb-2" />
                      <p className="text-2xl font-bold">7</p>
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
                      <p className="text-2xl font-bold">3</p>
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
                    <Button className="self-start">
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
              <Button variant="outline" className="w-full">
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
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">Advanced Documentation Patterns</p>
                      <Badge variant="outline" className="ml-2">Workshop</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">April 10, 2025 • 2:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">Q&A with Documentation Experts</p>
                      <Badge variant="outline" className="ml-2">Webinar</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">April 15, 2025 • 1:00 PM</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
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
