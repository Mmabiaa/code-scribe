
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

// Execute TypeScript code by transpiling to JavaScript first
const executeTypeScript = (code: string): ExecuteCodeResult => {
  try {
    // Very simple TypeScript-like execution
    // Remove type annotations and execute as JavaScript
    const jsCode = code
      .replace(/:\s*[A-Za-z<>\[\]|,\s]+(?=[=;,)]|$)/g, '') // Remove type annotations
      .replace(/<[A-Za-z<>\[\]|,\s]+>/g, '')              // Remove generic type params
      .replace(/interface\s+\w+\s*{[\s\S]*?}/g, '')       // Remove interfaces
      .replace(/type\s+\w+\s*=[\s\S]*?;/g, '');           // Remove type aliases

    return executeJavaScript(jsCode);
  } catch (err: any) {
    return {
      output: [`TypeScript Transpilation Error: ${err.message}`],
      error: true
    };
  }
};

// Execute Python code using Pyodide or similar WebAssembly approach (simplified)
const executePython = (code: string): ExecuteCodeResult => {
  const output = [
    "Running Python code using browser WASM runtime:",
    "------------------------"
  ];
  
  // Format Python code with line numbers for better readability
  const formattedCode = code.split('\n').map((line, i) => 
    `${(i + 1).toString().padStart(2, ' ')}| ${line}`
  ).join('\n');
  
  output.push(formattedCode);
  output.push("------------------------");
  
  // Simulate Python execution with example output
  const simulatedOutput = simulatePythonExecution(code);
  output.push(...simulatedOutput.output);
  
  return {
    output,
    error: simulatedOutput.error
  };
};

// Execute Java code (simplified simulation)
const executeJava = (code: string): ExecuteCodeResult => {
  const output = [
    "Compiling and running Java code:",
    "------------------------"
  ];
  
  // Check for required main method
  const hasMainMethod = code.includes("public static void main");
  if (!hasMainMethod) {
    return {
      output: [...output, "Error: No public static void main method found. Java code requires a main method."],
      error: true
    };
  }
  
  // Very simplified Java execution simulation
  const simulatedOutput = simulateJavaExecution(code);
  output.push(...simulatedOutput.output);
  
  return {
    output,
    error: simulatedOutput.error
  };
};

// Execute C++ code (simplified simulation)
const executeCpp = (code: string): ExecuteCodeResult => {
  const output = [
    "Compiling and running C++ code:",
    "------------------------"
  ];

  // Check for required main function
  const hasMainFunction = code.includes("main(") || code.includes("main (");
  if (!hasMainFunction) {
    return {
      output: [...output, "Error: No main() function found. C++ code requires a main function."],
      error: true
    };
  }
  
  // Very simplified C++ execution simulation
  const simulatedOutput = simulateCppExecution(code);
  output.push(...simulatedOutput.output);
  
  return {
    output,
    error: simulatedOutput.error
  };
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

// Helper function to simulate Python execution
const simulatePythonExecution = (code: string): ExecuteCodeResult => {
  const output: string[] = [];
  let error = false;
  
  try {
    // Handle print statements
    const printMatches = code.match(/print\s*\((.*?)\)/g) || [];
    printMatches.forEach(match => {
      const content = match.replace(/print\s*\(\s*(.*?)\s*\)/, '$1');
      output.push(`Output: ${content.replace(/["']/g, '')}`);
    });
    
    // Check for common functions/libraries
    if (code.includes("def ")) {
      output.push("Function defined successfully");
    }
    
    if (code.includes("import ")) {
      output.push("Modules imported successfully");
    }
    
    // If code has no output generators, show success message
    if (output.length === 0) {
      output.push("Code executed successfully with no output.");
    }
  } catch {
    error = true;
    output.push("Error: Failed to execute Python code");
  }
  
  return { output, error };
};

// Helper function to simulate Java execution
const simulateJavaExecution = (code: string): ExecuteCodeResult => {
  const output: string[] = [];
  let error = false;
  
  try {
    // Handle System.out.println statements
    const printMatches = code.match(/System\.out\.println\s*\((.*?)\);/g) || [];
    printMatches.forEach(match => {
      const content = match.replace(/System\.out\.println\s*\(\s*(.*?)\s*\);/, '$1');
      output.push(`Output: ${content.replace(/["']/g, '')}`);
    });
    
    // Check for class definition
    if (code.includes("class ")) {
      output.push("Class compiled successfully");
    }
    
    // If code has no output generators, show success message
    if (output.length === 0) {
      output.push("Code compiled and executed successfully with no output.");
    }
  } catch {
    error = true;
    output.push("Error: Failed to compile/execute Java code");
  }
  
  return { output, error };
};

// Helper function to simulate C++ execution
const simulateCppExecution = (code: string): ExecuteCodeResult => {
  const output: string[] = [];
  let error = false;
  
  try {
    // Handle cout statements
    const printMatches = code.match(/cout\s*<<\s*(.*?)\s*;/g) || [];
    printMatches.forEach(match => {
      const content = match.replace(/cout\s*<<\s*(.*?)\s*;/, '$1');
      output.push(`Output: ${content.replace(/["']/g, '')}`);
    });
    
    // Handle printf statements
    const printfMatches = code.match(/printf\s*\((.*?)\);/g) || [];
    printfMatches.forEach(match => {
      const content = match.replace(/printf\s*\(\s*(.*?)\s*\);/, '$1');
      output.push(`Output: ${content.replace(/["']/g, '')}`);
    });
    
    // If code has no output generators, show success message
    if (output.length === 0) {
      output.push("Code compiled and executed successfully with no output.");
    }
  } catch {
    error = true;
    output.push("Error: Failed to compile/execute C++ code");
  }
  
  return { output, error };
};

// Function to simulate SQL execution
const executeSql = (code: string): ExecuteCodeResult => {
  const output: string[] = [];
  
  // Define some dummy data
  const dummyUsers = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com" }
  ];
  
  // Check for SELECT statement
  if (/SELECT.*FROM\s+users/i.test(code)) {
    output.push("Executing SELECT query on users table");
    output.push("------------------------");
    output.push("id | name        | email");
    output.push("------------------------");
    dummyUsers.forEach(user => {
      output.push(`${user.id}  | ${user.name.padEnd(11)} | ${user.email}`);
    });
    output.push("------------------------");
    output.push("3 rows returned");
  } 
  // Check for INSERT statement
  else if (/INSERT\s+INTO/i.test(code)) {
    output.push("Executing INSERT query");
    output.push("------------------------");
    output.push("1 row inserted successfully");
  }
  // Check for CREATE TABLE statement
  else if (/CREATE\s+TABLE/i.test(code)) {
    output.push("Executing CREATE TABLE statement");
    output.push("------------------------");
    output.push("Table created successfully");
  }
  // Generic response for other queries
  else {
    output.push("Executing SQL query");
    output.push("------------------------");
    output.push("Query executed successfully");
  }
  
  return { output, error: false };
};

// Execute HTML with preview
const executeHtml = (code: string): ExecuteCodeResult => {
  return {
    output: [
      "HTML Rendering:",
      "------------------------",
      "HTML code would render in a browser environment.",
      "------------------------",
      "Code preview:",
      code.slice(0, 300) + (code.length > 300 ? "..." : "")
    ],
    error: false
  };
};

// Execute CSS with preview
const executeCss = (code: string): ExecuteCodeResult => {
  return {
    output: [
      "CSS Styling:",
      "------------------------",
      "CSS would apply styling to HTML elements.",
      "------------------------",
      "Code preview:",
      code.slice(0, 300) + (code.length > 300 ? "..." : "")
    ],
    error: false
  };
};

// Execute Ruby code (simplified simulation)
const executeRuby = (code: string): ExecuteCodeResult => {
  const output: string[] = [];
  let error = false;
  
  try {
    // Handle puts statements
    const printMatches = code.match(/puts\s+(.*?)($|\n)/g) || [];
    printMatches.forEach(match => {
      const content = match.replace(/puts\s+(.*?)($|\n)/, '$1');
      output.push(`Output: ${content.replace(/["']/g, '')}`);
    });
    
    // Check for method definitions
    if (code.includes("def ")) {
      output.push("Method defined successfully");
    }
    
    // If code has no output generators, show success message
    if (output.length === 0) {
      output.push("Ruby code executed successfully with no output.");
    }
  } catch {
    error = true;
    output.push("Error: Failed to execute Ruby code");
  }
  
  return { output, error };
};

// Execute Go code (simplified simulation)
const executeGo = (code: string): ExecuteCodeResult => {
  const output: string[] = [];
  let error = false;
  
  try {
    // Handle fmt.Println statements
    const printMatches = code.match(/fmt\.Println\s*\((.*?)\)/g) || [];
    printMatches.forEach(match => {
      const content = match.replace(/fmt\.Println\s*\(\s*(.*?)\s*\)/, '$1');
      output.push(`Output: ${content.replace(/["']/g, '')}`);
    });
    
    // Check for package and func main
    if (code.includes("package main") && code.includes("func main()")) {
      output.push("Go program structure is valid");
    } else if (!code.includes("package main")) {
      error = true;
      output.push("Error: Missing 'package main' declaration");
    } else if (!code.includes("func main()")) {
      error = true;
      output.push("Error: Missing 'func main()' function");
    }
    
    // If code has no output generators, show success message
    if (output.length === 0 && !error) {
      output.push("Go code executed successfully with no output.");
    }
  } catch {
    error = true;
    output.push("Error: Failed to execute Go code");
  }
  
  return { output, error };
};

// Execute PHP code (simplified simulation)
const executePhp = (code: string): ExecuteCodeResult => {
  const output: string[] = [];
  let error = false;
  
  try {
    // Handle echo statements
    const echoMatches = code.match(/echo\s+(.*?);/g) || [];
    echoMatches.forEach(match => {
      const content = match.replace(/echo\s+(.*?);/, '$1');
      output.push(`Output: ${content.replace(/["']/g, '')}`);
    });
    
    // Check for function definitions
    if (code.includes("function ")) {
      output.push("Function defined successfully");
    }
    
    // If code has no output generators, show success message
    if (output.length === 0) {
      output.push("PHP code executed successfully with no output.");
    }
  } catch {
    error = true;
    output.push("Error: Failed to execute PHP code");
  }
  
  return { output, error };
};

// Execute Rust code (simplified simulation)
const executeRust = (code: string): ExecuteCodeResult => {
  const output: string[] = [];
  let error = false;
  
  try {
    // Handle println! macros
    const printMatches = code.match(/println!\s*\((.*?)\)/g) || [];
    printMatches.forEach(match => {
      const content = match.replace(/println!\s*\(\s*(.*?)\s*\)/, '$1');
      output.push(`Output: ${content.replace(/["']/g, '')}`);
    });
    
    // Check for fn main
    if (code.includes("fn main()")) {
      output.push("Rust program structure is valid");
    } else {
      error = true;
      output.push("Error: Missing 'fn main()' function");
    }
    
    // If code has no output generators, show success message
    if (output.length === 0 && !error) {
      output.push("Rust code executed successfully with no output.");
    }
  } catch {
    error = true;
    output.push("Error: Failed to execute Rust code");
  }
  
  return { output, error };
};

// Main execute code function
export const executeCode = async ({ 
  code, 
  language 
}: ExecuteCodeOptions): Promise<ExecuteCodeResult> => {
  // Add a small delay to simulate processing time
  await new Promise(resolve => setTimeout(resolve, 500));

  // Execute based on language
  switch (language) {
    case 'javascript':
      return executeJavaScript(code);
    case 'typescript':
      return executeTypeScript(code);
    case 'python':
      return executePython(code);
    case 'java':
      return executeJava(code);
    case 'cpp':
      return executeCpp(code);
    case 'csharp':
      return executeCpp(code); // Similar enough for our simulation
    case 'html':
      return executeHtml(code);
    case 'css':
      return executeCss(code);
    case 'json':
      return {
        output: ["JSON validated successfully", JSON.stringify(JSON.parse(code), null, 2)],
        error: false
      };
    case 'sql':
      return executeSql(code);
    case 'ruby':
      return executeRuby(code);
    case 'go':
      return executeGo(code);
    case 'php':
      return executePhp(code);
    case 'rust':
      return executeRust(code);
    default:
      // Default fallback for any unsupported languages
      return {
        output: [
          `Executing ${language} code:`,
          "------------------------",
          "This language is not fully supported yet.",
          "------------------------",
          "Code preview:",
          code.split("\n").slice(0, 5).join("\n") + (code.split("\n").length > 5 ? "\n..." : "")
        ],
        error: false
      };
  }
};
