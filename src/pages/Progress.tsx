
import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChevronDown, ChevronUp, Award, Calendar, CheckCircle, BookOpen, Target, TrendingUp } from "lucide-react";

const activityData = [
  { day: "Mon", hours: 1.2 },
  { day: "Tue", hours: 0.8 },
  { day: "Wed", hours: 2.1 },
  { day: "Thu", hours: 1.5 },
  { day: "Fri", hours: 0.9 },
  { day: "Sat", hours: 2.3 },
  { day: "Sun", hours: 1.7 },
];

const modules = [
  {
    id: 1,
    title: "Getting Started with Code Documentation",
    total: 5,
    completed: 3,
    progress: 60,
  },
  {
    id: 2,
    title: "Best Practices for Code Comments",
    total: 4,
    completed: 0,
    progress: 0,
  },
  {
    id: 3,
    title: "Creating API Documentation",
    total: 6,
    completed: 0,
    progress: 0,
  },
  {
    id: 4,
    title: "Documentation for Open Source Projects",
    total: 5,
    completed: 1,
    progress: 20,
  },
];

const achievements = [
  {
    id: 1,
    title: "Documentation Novice",
    description: "Completed your first documentation module",
    icon: Award,
    date: "2 days ago",
    unlocked: true,
  },
  {
    id: 2,
    title: "Consistent Learner",
    description: "Logged in for 5 consecutive days",
    icon: Calendar,
    date: "Yesterday",
    unlocked: true,
  },
  {
    id: 3,
    title: "Community Contributor",
    description: "Posted 10 helpful responses in the community forum",
    icon: CheckCircle,
    date: null,
    unlocked: false,
    progress: 30,
  },
  {
    id: 4,
    title: "Documentation Expert",
    description: "Complete all core documentation modules",
    icon: BookOpen,
    date: null,
    unlocked: false,
    progress: 20,
  },
];

const Progress = () => {
  const [openModuleId, setOpenModuleId] = useState<number | null>(null);
  
  const toggleModule = (id: number) => {
    if (openModuleId === id) {
      setOpenModuleId(null);
    } else {
      setOpenModuleId(id);
    }
  };

  const overallProgress = Math.round(
    (modules.reduce((acc, module) => acc + module.completed, 0) / 
    modules.reduce((acc, module) => acc + module.total, 0)) * 100
  );

  return (
    <Layout 
      title="Learning Progress" 
      subtitle="Track your learning journey and achievements"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Overall Learning Progress</CardTitle>
              <CardDescription>Your documentation skills development</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Documentation Mastery</span>
                  <span>{overallProgress}%</span>
                </div>
                <Progress value={overallProgress} className="h-2" />
              </div>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={activityData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="hours" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4 text-center text-sm text-muted-foreground">
                <p>Weekly learning activity (hours per day)</p>
              </div>
            </CardContent>
          </Card>
          
          <div className="mb-6">
            <h2 className="text-xl font-medium mb-4">Learning Modules</h2>
            <div className="space-y-4">
              {modules.map((module) => (
                <Collapsible 
                  key={module.id}
                  open={openModuleId === module.id}
                  onOpenChange={() => toggleModule(module.id)}
                >
                  <Card>
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{module.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{module.completed} of {module.total} lessons completed</span>
                            <span>·</span>
                            <span>{module.progress}%</span>
                          </div>
                        </div>
                        
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" size="sm" className="gap-1">
                            {openModuleId === module.id ? (
                              <>
                                <ChevronUp className="h-4 w-4" />
                                Hide Details
                              </>
                            ) : (
                              <>
                                <ChevronDown className="h-4 w-4" />
                                Show Details
                              </>
                            )}
                          </Button>
                        </CollapsibleTrigger>
                      </div>
                      
                      <div className="mt-2">
                        <Progress value={module.progress} className="h-2" />
                      </div>
                    </div>
                    
                    <CollapsibleContent>
                      <CardContent className="pt-0 border-t">
                        <ul className="space-y-2">
                          {Array.from({ length: module.total }).map((_, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              {idx < module.completed ? (
                                <CheckCircle className="h-4 w-4 text-primary" />
                              ) : (
                                <div className="h-4 w-4 rounded-full border border-muted-foreground/30" />
                              )}
                              <span className={idx < module.completed ? "" : "text-muted-foreground"}>
                                Lesson {idx + 1}: {idx === 0 ? "Introduction" : `Advanced Concept ${idx}`}
                              </span>
                            </li>
                          ))}
                        </ul>
                        
                        <div className="mt-4">
                          <Button className="gap-2">
                            <BookOpen className="h-4 w-4" />
                            {module.completed > 0 ? "Continue" : "Start"} Module
                          </Button>
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <Tabs defaultValue="achievements">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="achievements">
                <Award className="h-4 w-4 mr-2" />
                Achievements
              </TabsTrigger>
              <TabsTrigger value="stats">
                <TrendingUp className="h-4 w-4 mr-2" />
                Stats
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="achievements">
              <Card>
                <CardHeader>
                  <CardTitle>Your Achievements</CardTitle>
                  <CardDescription>Badges and milestones you've earned</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {achievements.map((achievement) => (
                    <div 
                      key={achievement.id}
                      className={`flex items-start gap-3 p-3 rounded-lg border ${
                        achievement.unlocked ? "bg-primary/5" : ""
                      }`}
                    >
                      <div className={`p-2 rounded-full ${
                        achievement.unlocked ? "bg-primary/20" : "bg-muted"
                      }`}>
                        <achievement.icon className={`h-5 w-5 ${
                          achievement.unlocked ? "text-primary" : "text-muted-foreground"
                        }`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{achievement.title}</h4>
                          {achievement.unlocked && (
                            <Badge variant="outline" className="text-xs bg-primary/10 border-primary/20">
                              Unlocked
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        {achievement.unlocked ? (
                          <p className="text-xs text-muted-foreground mt-1">Earned {achievement.date}</p>
                        ) : (
                          <div className="mt-2">
                            <div className="flex justify-between text-xs mb-1">
                              <span>Progress</span>
                              <span>{achievement.progress}%</span>
                            </div>
                            <Progress value={achievement.progress} className="h-1.5" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="stats">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Statistics</CardTitle>
                  <CardDescription>Your activity metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span>Total Learning Time</span>
                      <span className="font-medium">12.4 hours</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span>Lessons Completed</span>
                      <span className="font-medium">4 of 20</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span>Quizzes Completed</span>
                      <span className="font-medium">2</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span>Forum Posts</span>
                      <span className="font-medium">3</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span>Daily Streak</span>
                      <span className="font-medium">5 days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Current Level</span>
                      <span className="font-medium">Beginner</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Learning Goals</CardTitle>
              <CardDescription>Set and track your objectives</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Complete first module</p>
                    <p className="text-xs text-muted-foreground">Achieved 2 days ago</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Document a personal project</p>
                    <p className="text-xs text-muted-foreground">In progress - 30%</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Learn API documentation</p>
                    <p className="text-xs text-muted-foreground">Not started</p>
                  </div>
                </li>
              </ul>
              
              <Button variant="outline" className="w-full mt-4">
                Set New Goal
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Progress;
