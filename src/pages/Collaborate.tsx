
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Users, Clock, FileCode } from "lucide-react";

const activeProjects = [
  {
    id: 1,
    name: "API Documentation Project",
    members: 4,
    lastActive: "2 hours ago",
    progress: "In Progress",
    language: "JavaScript"
  },
  {
    id: 2,
    name: "React Component Library Docs",
    members: 3,
    lastActive: "Yesterday",
    progress: "In Review",
    language: "TypeScript"
  }
];

const Collaborate = () => {
  return (
    <Layout 
      title="Real-Time Collaboration" 
      subtitle="Work together with others on documentation projects"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-medium">Active Projects</h2>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Project
            </Button>
          </div>
          
          <div className="space-y-4">
            {activeProjects.map((project) => (
              <Card key={project.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">{project.name}</h3>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>{project.members} members</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>Last active {project.lastActive}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <FileCode className="h-4 w-4" />
                          <span>{project.language}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-2">
                        {Array(project.members).fill(0).map((_, idx) => (
                          <Avatar key={idx} className="border-2 border-background">
                            <AvatarImage src={`https://avatars.dicebear.com/api/initials/${idx + 1}.svg`} />
                            <AvatarFallback>{(idx + 1).toString()[0]}</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <Button>Open Project</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
              <Button variant="outline" size="lg" className="gap-2">
                <Plus className="h-4 w-4" />
                Create a New Project
              </Button>
              <p className="mt-2 text-sm text-muted-foreground">
                or join an existing project with an invite code
              </p>
            </div>
          </div>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Collaboration Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Real-time editing</h3>
                  <p className="text-sm text-muted-foreground">
                    Edit documentation together with multiple collaborators simultaneously
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <FileCode className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Code & documentation sync</h3>
                  <p className="text-sm text-muted-foreground">
                    Automatically keep documentation in sync with code changes
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Version history</h3>
                  <p className="text-sm text-muted-foreground">
                    Track changes and revert to previous versions when needed
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Collaborate;
