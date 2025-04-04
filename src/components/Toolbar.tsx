
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import { SupportedLanguage } from "@/lib/constants";

interface ToolbarProps {
  language: SupportedLanguage;
  onLanguageChange: (language: SupportedLanguage) => void;
  onRun: () => void;
  isRunning: boolean;
}

const Toolbar = ({ language, onLanguageChange, onRun, isRunning }: ToolbarProps) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold">CodeScribe</h1>
        <div className="bg-primary/20 text-primary text-xs px-2 py-1 rounded">
          Beta
        </div>
      </div>
      <div className="flex items-center gap-2">
        <LanguageSelector 
          language={language} 
          onChange={(value) => onLanguageChange(value as SupportedLanguage)} 
        />
        <Button 
          onClick={onRun} 
          disabled={isRunning}
          className="gap-2"
        >
          <Play className="h-4 w-4" />
          Run Code
        </Button>
      </div>
    </div>
  );
};

export default Toolbar;
