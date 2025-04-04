
interface ExecuteCodeOptions {
  code: string;
  language: string;
}

interface ExecuteCodeResult {
  output: string[];
  error: boolean;
}

// Function to execute JavaScript code in a safe environment
const executeJavaScript = (code: string): ExecuteCodeResult => {
  const output: string[] = [];
  let error = false;

  // Save the original console methods
  const originalLog = console.log;
  const originalError = console.error;
  const originalWarn = console.warn;
  const originalInfo = console.info;

  try {
    // Override console methods to capture output
    console.log = (...args) => {
      output.push(args.map(arg => formatOutput(arg)).join(' '));
    };
    console.error = (...args) => {
      error = true;
      output.push(`Error: ${args.map(arg => formatOutput(arg)).join(' ')}`);
    };
    console.warn = (...args) => {
      output.push(`Warning: ${args.map(arg => formatOutput(arg)).join(' ')}`);
    };
    console.info = (...args) => {
      output.push(`Info: ${args.map(arg => formatOutput(arg)).join(' ')}`);
    };

    // Execute the code using Function constructor
    const result = new Function(code)();

    // If there's a result and it's not undefined, add it to output
    if (result !== undefined) {
      output.push(`Return value: ${formatOutput(result)}`);
    }

    // If no output was generated, add a success message
    if (output.length === 0) {
      output.push("Code executed successfully with no output.");
    }
  } catch (err: any) {
    error = true;
    output.push(`Execution Error: ${err.message}`);
  } finally {
    // Restore original console methods
    console.log = originalLog;
    console.error = originalError;
    console.warn = originalWarn;
    console.info = originalInfo;
  }

  return { output, error };
};

// Helper function to format different types of output
const formatOutput = (value: any): string => {
  if (typeof value === 'object') {
    try {
      return JSON.stringify(value, null, 2);
    } catch {
      return String(value);
    }
  }
  return String(value);
};

// Mock execution for other languages
const mockExecution = (code: string, language: string): ExecuteCodeResult => {
  return {
    output: [
      `Executing ${language} code:`,
      "------------------------",
      "Note: Full execution is only supported for JavaScript in this version.",
      "Other languages are in preview mode and will display this message instead.",
      "------------------------",
      "Code preview:",
      code.split("\n").slice(0, 5).join("\n") + (code.split("\n").length > 5 ? "\n..." : "")
    ],
    error: false
  };
};

// Main execute code function
export const executeCode = async ({ 
  code, 
  language 
}: ExecuteCodeOptions): Promise<ExecuteCodeResult> => {
  // Add a small delay to simulate processing time
  await new Promise(resolve => setTimeout(resolve, 500));

  if (language === 'javascript') {
    return executeJavaScript(code);
  }

  // For other languages, use mock execution
  return mockExecution(code, language);
};
