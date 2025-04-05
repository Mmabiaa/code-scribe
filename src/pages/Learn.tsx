
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Play, BookOpen, CheckCircle } from "lucide-react";

const modules = [
  {
    id: 1,
    title: "Getting Started with Code Documentation",
    description: "Learn the basics of code documentation and why it matters",
    lessons: 5,
    completed: 3,
    progress: 60,
    image: "https://images.unsplash.com/photo-1516414447565-b14be0adf13e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29kZSUyMGRvY3VtZW50YXRpb258ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 2,
    title: "Best Practices for Code Comments",
    description: "Discover how to write clear, concise, and helpful code comments",
    lessons: 4,
    completed: 0,
    progress: 0,
    image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29kZXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 3,
    title: "Creating API Documentation",
    description: "Learn how to document APIs effectively for other developers",
    lessons: 6,
    completed: 0,
    progress: 0,
    image: "https://images.unsplash.com/photo-1617042375876-a13e36732a04?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGFwaXxlbnwwfHwwfHx8MA%3D%3D"
  }
];

const Learn = () => {
  return (
    <Layout title="Interactive Learning" subtitle="Learn documentation skills through guided exercises">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-medium mb-4">Learning Modules</h2>
          <div className="space-y-6">
            {modules.map((module) => (
              <Card key={module.id}>
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/3">
                    <img 
                      src={module.image} 
                      alt={module.title} 
                      className="h-full object-cover rounded-l-lg"
                    />
                  </div>
                  <div className="w-full md:w-2/3 p-6">
                    <CardTitle className="text-lg">{module.title}</CardTitle>
                    <CardDescription className="mt-2">{module.description}</CardDescription>
                    
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>{module.completed} of {module.lessons} lessons completed</span>
                        <span>{module.progress}%</span>
                      </div>
                      <Progress value={module.progress} className="h-2" />
                    </div>
                    
                    <div className="mt-4">
                      <Button className="gap-2">
                        <Play className="h-4 w-4" />
                        {module.completed > 0 ? "Continue" : "Start"} Learning
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Your Learning Progress</CardTitle>
              <CardDescription>Keep track of your journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Overall completion</span>
                    <span>23%</span>
                  </div>
                  <Progress value={23} className="h-2" />
                </div>
                
                <div className="pt-4 space-y-3">
                  <h4 className="text-sm font-medium">Recent Achievements</h4>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Completed first lesson</p>
                      <p className="text-sm text-muted-foreground">2 days ago</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button variant="outline" className="gap-2 w-full">
                    <BookOpen className="h-4 w-4" />
                    View Learning Path
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Learn;
