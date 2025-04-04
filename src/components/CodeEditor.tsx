
import { useRef, useState } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import { Card } from "@/components/ui/card";
import { SupportedLanguage } from "@/lib/constants";

interface CodeEditorProps {
  language: SupportedLanguage;
  value: string;
  onChange: (value: string) => void;
}

const CodeEditor = ({ language, value, onChange }: CodeEditorProps) => {
  const editorRef = useRef<any>(null);
  const [isEditorReady, setIsEditorReady] = useState(false);

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
    setIsEditorReady(true);
    editor.focus();
  };

  return (
    <Card className="overflow-hidden border border-border flex-1 h-full min-h-[400px]">
      <Editor
        height="100%"
        defaultLanguage="javascript"
        language={language}
        value={value}
        onChange={(value) => onChange(value || "")}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontFamily: "JetBrains Mono, Menlo, Monaco, Courier New, monospace",
          fontSize: 14,
          lineHeight: 21,
          automaticLayout: true,
          scrollBeyondLastLine: false,
          smoothScrolling: true,
          cursorBlinking: "smooth",
          folding: true,
          formatOnPaste: true,
          formatOnType: true,
          tabSize: 2,
          wordWrap: "on",
          theme: "vs-dark",
          renderLineHighlight: "all",
        }}
      />
    </Card>
  );
};

export default CodeEditor;
