
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import CodeEditor from "@/components/CodeEditor";
import OutputConsole from "@/components/OutputConsole";
import Toolbar from "@/components/Toolbar";
import { executeCode } from "@/lib/codeExecutionService";
import { DEFAULT_CODE_SNIPPETS, DEFAULT_LANGUAGE, SupportedLanguage } from "@/lib/constants";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookText, 
  Users, 
  Share2, 
  Sparkles, 
  Library, 
  Target, 
  HelpCircle, 
  Video,
  UserPlus,
  LayoutTemplate,
  Code
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const FeatureCard = ({ icon: Icon, title, description, path }) => {
  return (
    <div className="border rounded-lg p-6 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-primary/10 p-2 rounded-full">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <h3 className="font-medium text-lg">{title}</h3>
      </div>
      <p className="text-muted-foreground text-sm flex-grow">{description}</p>
      <div className="mt-4">
        <Button variant="outline" size="sm" asChild>
          <Link to={path}>Explore</Link>
        </Button>
      </div>
    </div>
  );
};

const Index = () => {
  const [language, setLanguage] = useState<SupportedLanguage>(DEFAULT_LANGUAGE);
  const [code, setCode] = useState(DEFAULT_CODE_SNIPPETS[DEFAULT_LANGUAGE]);
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const handleLanguageChange = (newLanguage: SupportedLanguage) => {
    setLanguage(newLanguage);
    setCode(DEFAULT_CODE_SNIPPETS[newLanguage]);
    setOutput([]);
  };

  const handleRunCode = async () => {
    if (isRunning) return;
    
    setIsRunning(true);
    setOutput([]);
    
    try {
      const result = await executeCode({ code, language });
      setOutput(result.output);
      
      if (result.error) {
        toast({
          title: "Execution Error",
          description: "Your code encountered an error during execution.",
          variant: "destructive"
        });
      } else if (language === 'javascript' || language === 'typescript' || language === 'json') {
        // Full execution notification only for fully supported languages
        toast({
          title: "Execution Complete",
          description: "Your code executed successfully."
        });
      } else {
        // Simulation notice for other languages
        toast({
          title: "Simulation Mode",
          description: `${language} execution is running in simulation mode.`
        });
      }
    } catch (error) {
      setOutput(["An unexpected error occurred while executing your code."]);
      toast({
        title: "System Error",
        description: "There was a problem executing your code.",
        variant: "destructive"
      });
    } finally {
      setIsRunning(false);
    }
  };

  const features = [
    {
      icon: BookText,
      title: "Interactive Learning",
      description: "Guided tutorials to learn code documentation through practical exercises.",
      path: "/learn"
    },
    {
      icon: Users,
      title: "Community Forums",
      description: "Discuss, ask questions, and collaborate with fellow learners.",
      path: "/community"
    },
    {
      icon: Share2,
      title: "Collaboration Tools",
      description: "Work together in real-time on documentation projects.",
      path: "/collaborate"
    },
    {
      icon: Sparkles,
      title: "AI Assistant",
      description: "Get intelligent suggestions to improve your documentation.",
      path: "/assistant"
    },
    {
      icon: Library,
      title: "Resource Library",
      description: "Access curated learning materials and references.",
      path: "/resources"
    },
    {
      icon: Target,
      title: "Progress Tracking",
      description: "Monitor your learning journey and earn achievements.",
      path: "/progress"
    },
    {
      icon: HelpCircle,
      title: "Quizzes & Assessments",
      description: "Test your knowledge and get instant feedback.",
      path: "/quizzes"
    },
    {
      icon: Video,
      title: "Live Workshops",
      description: "Join expert-led sessions and webinars.",
      path: "/workshops"
    },
    {
      icon: UserPlus,
      title: "Mentorship",
      description: "Connect with mentors or become one to help others.",
      path: "/mentorship"
    },
    {
      icon: LayoutTemplate,
      title: "Project Showcase",
      description: "Share your work and receive community feedback.",
      path: "/showcase"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-6">
      <Toolbar 
        language={language}
        onLanguageChange={handleLanguageChange}
        onRun={handleRunCode}
        isRunning={isRunning}
      />
      
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="editor" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            Code Editor
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome to CodeScribe v2</h1>
            <p className="text-muted-foreground">Your comprehensive platform for collaborative learning and code documentation</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="editor">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1">
            <div className="flex flex-col h-[calc(100vh-200px)]">
              <CodeEditor 
                language={language} 
                value={code} 
                onChange={setCode}
              />
            </div>
            <div className="flex flex-col h-[calc(100vh-200px)]">
              <OutputConsole output={output} loading={isRunning} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <footer className="mt-6 text-center text-sm text-muted-foreground">
        <Separator className="mb-4" />
        <p>CodeScribe v2 - Collaborative Learning Platform &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Index;
