
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import CodeEditor from "@/components/CodeEditor";
import OutputConsole from "@/components/OutputConsole";
import Toolbar from "@/components/Toolbar";
import { executeCode } from "@/lib/codeExecutionService";
import { DEFAULT_CODE_SNIPPETS, DEFAULT_LANGUAGE, SupportedLanguage } from "@/lib/constants";
import { Separator } from "@/components/ui/separator";

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
      } else if (language !== 'javascript') {
        toast({
          title: "Preview Mode",
          description: `Full execution for ${language} is coming soon!`
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

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-6">
      <Toolbar 
        language={language}
        onLanguageChange={handleLanguageChange}
        onRun={handleRunCode}
        isRunning={isRunning}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1">
        <div className="flex flex-col h-[calc(100vh-150px)]">
          <CodeEditor 
            language={language} 
            value={code} 
            onChange={setCode}
          />
        </div>
        <div className="flex flex-col h-[calc(100vh-150px)]">
          <OutputConsole output={output} loading={isRunning} />
        </div>
      </div>
      
      <footer className="mt-6 text-center text-sm text-muted-foreground">
        <Separator className="mb-4" />
        <p>CodeScribe - Online Code Editor &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Index;
