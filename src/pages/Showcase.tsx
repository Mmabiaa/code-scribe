
import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Eye, MessageSquare, Heart, Share2, LayoutTemplate, Plus, Search, Filter, ThumbsUp, User } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const projects = [
  {
    id: 1,
    title: "API Documentation Portal",
    description: "A comprehensive documentation portal for REST APIs with interactive examples",
    author: "Alex Johnson",
    authorImage: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=60",
    tags: ["API", "REST", "Developer Experience"],
    views: 342,
    comments: 12,
    likes: 48,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 2,
    title: "SDK Documentation Template",
    description: "A clean, responsive template for documenting software development kits",
    author: "Maria Garcia",
    authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60",
    tags: ["SDK", "Template", "Responsive"],
    views: 215,
    comments: 8,
    likes: 36,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 3,
    title: "Code Examples Library",
    description: "A collection of well-documented code examples across multiple programming languages",
    author: "James Wilson",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60",
    tags: ["Code Examples", "Multi-language", "Beginner Friendly"],
    views: 178,
    comments: 5,
    likes: 27,
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 4,
    title: "Interactive Release Notes",
    description: "An interactive approach to creating engaging software release notes",
    author: "Sarah Lee",
    authorImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60",
    tags: ["Release Notes", "Interactive", "Product Updates"],
    views: 126,
    comments: 3,
    likes: 19,
    image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  }
];

const myProjects = [
  {
    id: 101,
    title: "My Developer Guide Template",
    description: "A template for creating comprehensive developer guides with navigation and search",
    status: "Published",
    tags: ["Template", "Developer Guide", "Navigation"],
    views: 87,
    comments: 4,
    likes: 12,
    lastEdited: "3 days ago",
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  }
];

const ProjectCard = ({ project, isMyProject = false }) => {
  const handleLike = () => {
    toast({
      title: "Project Liked",
      description: `You liked "${project.title}"`,
    });
  };

  const handleComment = () => {
    toast({
      title: "Add Comment",
      description: `Opening comment section for "${project.title}"`,
    });
  };

  const handleShare = () => {
    toast({
      title: "Share Project",
      description: `Sharing options for "${project.title}"`,
    });
  };

  const handleEdit = () => {
    toast({
      title: "Edit Project",
      description: `Opening editor for "${project.title}"`,
    });
  };

  return (
    <Card className="flex flex-col h-full">
      <div className="aspect-video w-full overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{project.title}</CardTitle>
            {isMyProject && (
              <Badge variant={project.status === "Published" ? "outline" : "secondary"} className="mt-1">
                {project.status}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
        
        {!isMyProject && (
          <div className="flex items-center gap-2 mb-4">
            <div className="h-6 w-6 rounded-full overflow-hidden">
              <img 
                src={project.authorImage} 
                alt={project.author} 
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-sm font-medium">{project.author}</span>
          </div>
        )}
        
        <div className="flex flex-wrap gap-1 mb-2">
          {project.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center gap-4 text-muted-foreground text-sm mt-auto">
          <div className="flex items-center gap-1">
            <Eye className="h-3.5 w-3.5" />
            <span>{project.views}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>{project.comments}</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="h-3.5 w-3.5" />
            <span>{project.likes}</span>
          </div>
          {isMyProject && (
            <div className="ml-auto text-xs">
              Edited {project.lastEdited}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        {isMyProject ? (
          <div className="flex w-full gap-2">
            <Button variant="outline" className="flex-1" onClick={handleEdit}>Edit</Button>
            <Button className="flex-1">View</Button>
          </div>
        ) : (
          <div className="flex w-full gap-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={handleLike}
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={handleComment}
            >
              <MessageSquare className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Button className="flex-1">View Project</Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

const ShowcasePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddProjectDialog, setShowAddProjectDialog] = useState(false);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    toast({
      title: "Project Added",
      description: "Your project has been added to the showcase",
    });
    setShowAddProjectDialog(false);
  };

  // Filter projects based on search query
  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <Layout title="Project Showcase" subtitle="Share your work and receive community feedback">
      <Tabs defaultValue="community" className="w-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <TabsList className="mb-0">
            <TabsTrigger value="community">Community Projects</TabsTrigger>
            <TabsTrigger value="my-projects">My Projects</TabsTrigger>
          </TabsList>

          <div className="flex gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search projects..." 
                className="pl-10 min-w-[200px]"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <Button variant="outline" className="gap-1">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button onClick={() => setShowAddProjectDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </div>
        </div>
        
        <TabsContent value="community" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="my-projects" className="mt-0">
          {myProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myProjects.map((project) => (
                <ProjectCard key={project.id} project={project} isMyProject={true} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <LayoutTemplate className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No projects yet</h3>
              <p className="text-muted-foreground mb-6">You haven't added any projects to the showcase yet.</p>
              <Button onClick={() => setShowAddProjectDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Project
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={showAddProjectDialog} onOpenChange={setShowAddProjectDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Project</DialogTitle>
            <DialogDescription>
              Share your documentation project with the community
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddProject} className="space-y-4 pt-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Project Title
              </label>
              <Input id="title" placeholder="Enter a title for your project" />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">
                Description
              </label>
              <Textarea
                id="description"
                placeholder="Describe your project..."
                rows={3}
              />
            </div>
            
            <div>
              <label htmlFor="tags" className="block text-sm font-medium mb-1">
                Tags (comma separated)
              </label>
              <Input id="tags" placeholder="e.g., API, Template, Guide" />
            </div>
            
            <div>
              <label htmlFor="projectUrl" className="block text-sm font-medium mb-1">
                Project URL
              </label>
              <Input id="projectUrl" placeholder="https://example.com/your-project" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                Cover Image
              </label>
              <div className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-muted/50">
                <div className="flex flex-col items-center">
                  <Plus className="h-8 w-8 text-muted-foreground mb-2" />
                  <span className="text-sm font-medium">Upload image</span>
                  <span className="text-xs text-muted-foreground mt-1">
                    Recommended: 1200x675px
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4 pt-2">
              <Button type="button" variant="outline" className="flex-1" onClick={() => setShowAddProjectDialog(false)}>
                Cancel
              </Button>
              <Button type="submit" className="flex-1">Add Project</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default ShowcasePage;
