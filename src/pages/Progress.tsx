
import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProgressIndicator } from "@/components/ui/progress";
import { CheckCircle2, Clock, Award, BookOpen, Code, FileText } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';

// Sample data for the charts
const weeklyProgressData = [
  { name: 'Mon', progress: 20 },
  { name: 'Tue', progress: 40 },
  { name: 'Wed', progress: 30 },
  { name: 'Thu', progress: 70 },
  { name: 'Fri', progress: 50 },
  { name: 'Sat', progress: 80 },
  { name: 'Sun', progress: 90 },
];

const modulesData = [
  { name: 'Basics', completed: 80, total: 100 },
  { name: 'Advanced', completed: 45, total: 100 },
  { name: 'Expert', completed: 20, total: 100 },
];

interface AchievementProps {
  icon: React.ElementType;
  title: string;
  description: string;
  progress: number;
}

const Achievement = ({ icon: Icon, title, description, progress }: AchievementProps) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="bg-primary/10 p-2 rounded-full">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-lg">{title}</h3>
            <p className="text-sm text-muted-foreground mb-3">{description}</p>
            <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
              <div 
                className="bg-primary h-full rounded-full" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-muted-foreground mt-1 text-right">{progress}%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Progress = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const achievements = [
    {
      icon: BookOpen,
      title: "Documentation Master",
      description: "Complete 50 documentation exercises",
      progress: 70
    },
    {
      icon: Code,
      title: "Code Commentator",
      description: "Add helpful comments to 100 code snippets",
      progress: 45
    },
    {
      icon: FileText,
      title: "README Wizard",
      description: "Create 25 comprehensive README files",
      progress: 20
    },
    {
      icon: Award,
      title: "Community Contributor",
      description: "Help 30 community members with their documentation",
      progress: 60
    }
  ];

  const statsCards = [
    {
      title: "Completed Lessons",
      value: "32",
      description: "Out of 50 total lessons",
      icon: CheckCircle2,
      color: "text-green-500",
      change: "+5 this week"
    },
    {
      title: "Hours Studied",
      value: "48",
      description: "Total learning time",
      icon: Clock,
      color: "text-blue-500",
      change: "+3.5 this week"
    },
    {
      title: "Achievements",
      value: "12",
      description: "Badges earned so far",
      icon: Award,
      color: "text-amber-500",
      change: "+2 this week"
    }
  ];

  return (
    <Layout title="Learning Progress" subtitle="Track your journey and achievements">
      <Tabs 
        defaultValue="overview" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {statsCards.map((card, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{card.title}</p>
                      <h3 className="text-2xl font-bold">{card.value}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{card.description}</p>
                    </div>
                    <div className={`bg-primary/10 p-2 rounded-full ${card.color}`}>
                      <card.icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-xs font-medium text-muted-foreground">
                      {card.change}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Weekly Progress</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={weeklyProgressData}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="progress" stroke="#6c5ce7" fill="#6c5ce7" fillOpacity={0.2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Module Completion</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {modulesData.map((module, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{module.name}</span>
                      <span className="text-sm text-muted-foreground">{module.completed}%</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-primary h-full rounded-full" 
                        style={{ width: `${module.completed}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <Achievement 
                key={index}
                icon={achievement.icon}
                title={achievement.title}
                description={achievement.description}
                progress={achievement.progress}
              />
            ))}
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Achievements</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-muted p-2 rounded-full">
                    <Code className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium">Documentation Expert</h3>
                    <p className="text-sm text-muted-foreground">Complete 100 documentation exercises</p>
                    <div className="w-full bg-secondary h-2 rounded-full overflow-hidden mt-2">
                      <div 
                        className="bg-muted-foreground h-full rounded-full" 
                        style={{ width: "10%" }}
                      ></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 text-right">10%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Learning Time Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { category: 'Documentation', hours: 12 },
                      { category: 'Code Comments', hours: 8 },
                      { category: 'READMEs', hours: 15 },
                      { category: 'API Docs', hours: 6 },
                      { category: 'Tutorials', hours: 7 }
                    ]}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="hours" fill="#6c5ce7" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Progress;
