
import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OutputConsoleProps {
  output: string[];
  loading: boolean;
}

const OutputConsole = ({ output, loading }: OutputConsoleProps) => {
  const consoleEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [output]);

  return (
    <Card className="border border-border h-full flex flex-col">
      <CardHeader className="py-3 px-4 border-b border-border">
        <CardTitle className="text-sm font-medium flex items-center">
          Console Output
          {loading && (
            <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-0.5 rounded animate-pulse-opacity">Running...</span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex-1 overflow-auto">
        <pre className="text-sm p-4 font-mono h-full overflow-auto bg-editor-bg text-editor-text">
          {output.length > 0 ? (
            output.map((line, index) => (
              <div key={index} className="mb-1">
                {line}
              </div>
            ))
          ) : (
            <span className="text-muted-foreground">Code execution results will appear here</span>
          )}
          <div ref={consoleEndRef} />
        </pre>
      </CardContent>
    </Card>
  );
};

export default OutputConsole;
