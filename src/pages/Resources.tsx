
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, BookOpen, Video, FileText, Download, ExternalLink } from "lucide-react";

const resourceCategories = [
  {
    title: "Documentation Guides",
    description: "Comprehensive guides on code documentation best practices",
    items: [
      {
        title: "Writing Effective Function Comments",
        type: "Article",
        author: "Documentation Experts",
        length: "10 min read",
        image: "https://images.unsplash.com/photo-1516414447565-b14be0adf13e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29kZSUyMGRvY3VtZW50YXRpb258ZW58MHx8MHx8fDA%3D"
      },
      {
        title: "API Documentation Standards",
        type: "Guide",
        author: "API Documentation Team",
        length: "15 min read",
        image: "https://images.unsplash.com/photo-1617042375876-a13e36732a04?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGFwaXxlbnwwfHwwfHx8MA%3D%3D"
      },
      {
        title: "Documentation for Open Source Projects",
        type: "Whitepaper",
        author: "Open Source Foundation",
        length: "12 min read",
        image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29kZXxlbnwwfHwwfHx8MA%3D%3D"
      }
    ]
  },
  {
    title: "Video Tutorials",
    description: "Visual guides and tutorials on documentation techniques",
    items: [
      {
        title: "Getting Started with JSDoc",
        type: "Video",
        author: "Documentation Academy",
        length: "22 minutes",
        image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29kZXxlbnwwfHwwfHx8MA%3D%3D"
      },
      {
        title: "Documentation Workflows for Teams",
        type: "Webinar",
        author: "Team Collaboration Experts",
        length: "45 minutes",
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29kZXxlbnwwfHwwfHx8MA%3D%3D"
      },
      {
        title: "Advanced TypeScript Documentation",
        type: "Tutorial Series",
        author: "TypeScript Masters",
        length: "3 episodes",
        image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dHlwZXNjcmlwdHxlbnwwfHwwfHx8MA%3D%3D"
      }
    ]
  },
  {
    title: "Templates & Tools",
    description: "Ready-to-use templates and documentation tools",
    items: [
      {
        title: "API Documentation Template",
        type: "Template",
        author: "CodeScribe Team",
        length: "5 files",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvZGV8ZW58MHx8MHx8fDA%3D"
      },
      {
        title: "Documentation Style Guide",
        type: "Resource",
        author: "Style Guide Collective",
        length: "20 pages",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvZGV8ZW58MHx8MHx8fDA%3D"
      },
      {
        title: "Documentation Generator Tools",
        type: "Tool Collection",
        author: "Developer Tools Inc.",
        length: "12 tools",
        image: "https://images.unsplash.com/photo-1580894736036-7a68513f1f4b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHRvb2xzfGVufDB8fDB8fHww"
      }
    ]
  }
];

const ResourceCard = ({ resource }) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="h-40 overflow-hidden">
        <img 
          src={resource.image} 
          alt={resource.title} 
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
            {resource.type}
          </span>
          <span className="text-xs text-muted-foreground">
            {resource.length}
          </span>
        </div>
        <h3 className="font-medium mb-1">{resource.title}</h3>
        <p className="text-sm text-muted-foreground mb-3">By {resource.author}</p>
        <Button variant="outline" size="sm" className="w-full gap-1">
          <ExternalLink className="h-3.5 w-3.5" /> Access Resource
        </Button>
      </CardContent>
    </Card>
  );
};

const Resources = () => {
  return (
    <Layout 
      title="Resource Library" 
      subtitle="Access our curated collection of documentation guides, templates, and learning materials"
    >
      <div className="mb-6 flex items-center justify-between">
        <div className="relative max-w-md w-full">
          <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
          <Input 
            placeholder="Search resources..." 
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-1">
            <BookOpen className="h-4 w-4" /> All Types
          </Button>
          <Button variant="outline" className="gap-1">
            <Download className="h-4 w-4" /> Download All
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="guides">Documentation Guides</TabsTrigger>
          <TabsTrigger value="videos">Video Tutorials</TabsTrigger>
          <TabsTrigger value="templates">Templates & Tools</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          {resourceCategories.map((category, index) => (
            <div key={index} className="mb-10">
              <div className="mb-4">
                <h2 className="text-xl font-medium">{category.title}</h2>
                <p className="text-muted-foreground">{category.description}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((resource, idx) => (
                  <ResourceCard key={idx} resource={resource} />
                ))}
              </div>
            </div>
          ))}
        </TabsContent>
        
        {resourceCategories.map((category, index) => (
          <TabsContent key={index} value={category.title.toLowerCase().split(' ')[0]}>
            <div className="mb-4">
              <h2 className="text-xl font-medium">{category.title}</h2>
              <p className="text-muted-foreground">{category.description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((resource, idx) => (
                <ResourceCard key={idx} resource={resource} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </Layout>
  );
};

export default Resources;
