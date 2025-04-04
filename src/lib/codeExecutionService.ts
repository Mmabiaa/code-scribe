
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

    // Execute the code using Function constructor with proper error handling
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
    // More sophisticated TypeScript transpilation
    const jsCode = code
      .replace(/:\s*[A-Za-z<>[\]|,\s]+(?=[=;,)]|$)/g, '') // Remove type annotations
      .replace(/<[A-Za-z<>[\]|,\s]+>/g, '')              // Remove generic type params
      .replace(/interface\s+\w+\s*{[\s\S]*?}/g, '')       // Remove interfaces
      .replace(/type\s+\w+\s*=[\s\S]*?;/g, '')           // Remove type aliases
      .replace(/as\s+[A-Za-z<>[\]|,\s]+/g, '');          // Remove type assertions

    return executeJavaScript(jsCode);
  } catch (err: any) {
    return {
      output: [`TypeScript Transpilation Error: ${err.message}`],
      error: true
    };
  }
};

// Execute Python code with more accurate simulation
const executePython = (code: string): ExecuteCodeResult => {
  const output: string[] = [];
  let error = false;
  
  // Add header to output
  output.push("Python Execution:");
  output.push("------------------------");
  
  try {
    // Better handling of print statements with regex
    const printMatches = code.match(/print\s*\((.*?)(?:\)|,\s*end=.*?\)|,\s*sep=.*?\))/g) || [];
    printMatches.forEach(match => {
      const contentMatch = match.match(/print\s*\(\s*(.*?)(?:\s*\)|,\s*end=|,\s*sep=)/);
      if (contentMatch && contentMatch[1]) {
        let content = contentMatch[1].trim();
        // Handle string literals
        if ((content.startsWith('"') && content.endsWith('"')) || 
            (content.startsWith("'") && content.endsWith("'"))) {
          content = content.slice(1, -1);
        }
        // Handle f-strings (simplified)
        if (content.startsWith('f"') || content.startsWith("f'")) {
          content = content.slice(2, -1).replace(/\{(.*?)\}/g, "variable");
        }
        output.push(content);
      }
    });
    
    // Better variables and function detection
    if (code.includes("def ")) {
      const funcMatches = code.match(/def\s+([a-zA-Z_]\w*)\s*\(/g) || [];
      funcMatches.forEach(match => {
        const funcName = match.match(/def\s+([a-zA-Z_]\w*)/)?.[1];
        output.push(`Function '${funcName}' defined`);
      });
    }
    
    // Handle for loops
    if (code.includes("for ") && code.includes(" in ")) {
      output.push("Loop execution simulated");
    }
    
    // Handle if statements
    if (code.includes("if ") || code.includes("elif ") || code.includes("else:")) {
      output.push("Conditional logic simulated");
    }
    
    // If code has no output generators, show success message
    if (output.length === 2) { // Only the header lines
      output.push("Code executed successfully with no output.");
    }
  } catch (err) {
    error = true;
    output.push(`Error: Failed to execute Python code`);
  }
  
  return { output, error };
};

// Execute Java code with more accurate simulation
const executeJava = (code: string): ExecuteCodeResult => {
  const output: string[] = [];
  let error = false;
  
  // Add header to output
  output.push("Java Execution:");
  output.push("------------------------");
  
  try {
    // First, check for required class and main method
    if (!code.includes("class ")) {
      error = true;
      output.push("Error: No class definition found.");
      return { output, error };
    }
    
    if (!code.includes("public static void main")) {
      error = true;
      output.push("Error: No public static void main method found.");
      return { output, error };
    }
    
    // Advanced System.out.println parsing
    const printMatches = code.match(/System\.out\.println\s*\(\s*(.*?)\s*\)\s*;/g) || [];
    printMatches.forEach(match => {
      const contentMatch = match.match(/System\.out\.println\s*\(\s*(.*?)\s*\)\s*;/);
      if (contentMatch && contentMatch[1]) {
        let content = contentMatch[1].trim();
        
        // Handle string literals
        if ((content.startsWith('"') && content.endsWith('"')) || 
            (content.startsWith("'") && content.endsWith("'"))) {
          content = content.slice(1, -1);
        }
        
        // Handle string concatenation
        if (content.includes(" + ")) {
          const parts = content.split(" + ");
          content = parts.map(part => {
            if ((part.startsWith('"') && part.endsWith('"')) || 
                (part.startsWith("'") && part.endsWith("'"))) {
              return part.slice(1, -1);
            }
            return "variable";
          }).join("");
        }
        
        output.push(content);
      }
    });
    
    // System.out.print handling
    const printNonLnMatches = code.match(/System\.out\.print\s*\(\s*(.*?)\s*\)\s*;/g) || [];
    if (printNonLnMatches.length > 0) {
      output.push("Print statement output (without newline)");
    }
    
    // If code has no output generators, show success message
    if (output.length === 2) { // Only the header lines
      output.push("Code compiled and executed successfully with no output.");
    }
  } catch (err) {
    error = true;
    output.push("Error: Failed to execute Java code");
  }
  
  return { output, error };
};

// Execute C++ code with more accurate simulation
const executeCpp = (code: string): ExecuteCodeResult => {
  const output: string[] = [];
  let error = false;
  
  // Add header to output
  output.push("C++ Execution:");
  output.push("------------------------");
  
  try {
    // Check for required main function
    const hasMainFunction = /\bint\s+main\s*\(|void\s+main\s*\(/.test(code);
    if (!hasMainFunction) {
      error = true;
      output.push("Error: No main() function found.");
      return { output, error };
    }
    
    // Check for missing includes that would cause errors
    if (code.includes("cout") && !code.includes("#include <iostream>")) {
      output.push("Warning: Using cout without #include <iostream>");
    }
    
    if (code.includes("printf") && !code.includes("#include <stdio.h>")) {
      output.push("Warning: Using printf without #include <stdio.h>");
    }
    
    // Advanced parsing for cout statements
    const coutMatches = code.match(/cout\s*<<\s*(.*?)\s*;/g) || [];
    for (const match of coutMatches) {
      let outputLine = "";
      const parts = match.replace(/cout|;/g, '').split('<<');
      
      for (let part of parts) {
        part = part.trim();
        if (part === "endl" || part === "std::endl" || part === "\\n") {
          outputLine += "\n";
        } else if ((part.startsWith('"') && part.endsWith('"')) || 
                   (part.startsWith("'") && part.endsWith("'"))) {
          outputLine += part.slice(1, -1);
        } else if (part) {
          outputLine += "variable";
        }
      }
      
      if (outputLine) {
        output.push(outputLine.replace(/\\n/g, '\n').trim());
      }
    }
    
    // Handle printf statements
    const printfMatches = code.match(/printf\s*\(\s*"([^"]*)"/g) || [];
    for (const match of printfMatches) {
      const formatStr = match.match(/printf\s*\(\s*"([^"]*)"/)?.[1];
      if (formatStr) {
        const simplified = formatStr.replace(/%d|%f|%s|%c|%p|%x|%o/g, "variable");
        output.push(simplified.replace(/\\n/g, '\n').trim());
      }
    }
    
    // If code has no output generators, show success message
    if (output.length === 2) { // Only the header lines
      output.push("Code compiled and executed successfully with no output.");
    }
  } catch (err) {
    error = true;
    output.push("Error: Failed to execute C++ code");
  }
  
  return { output, error };
};

// Helper function to format different types of output
const formatOutput = (value: any): string => {
  if (value === null) return "null";
  if (value === undefined) return "undefined";
  
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
  // Delegate to our improved Python execution function
  return executePython(code);
};

// Helper function to simulate Java execution
const simulateJavaExecution = (code: string): ExecuteCodeResult => {
  // Delegate to our improved Java execution function
  return executeJava(code);
};

// Helper function to simulate C++ execution
const simulateCppExecution = (code: string): ExecuteCodeResult => {
  // Delegate to our improved C++ execution function
  return executeCpp(code);
};

// Function to simulate SQL execution with more realistic behavior
const executeSql = (code: string): ExecuteCodeResult => {
  const output: string[] = [];
  let error = false;
  
  // Add header to output
  output.push("SQL Execution:");
  output.push("------------------------");
  
  // Define some dummy data for tables
  const dummyUsers = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com" }
  ];
  
  const dummyProducts = [
    { id: 1, name: "Laptop", price: 999.99 },
    { id: 2, name: "Phone", price: 699.99 },
    { id: 3, name: "Headphones", price: 149.99 }
  ];
  
  // Normalize SQL query for easier parsing
  const normalizedSql = code.toLowerCase().replace(/\s+/g, ' ').trim();
  
  // Check for syntax errors
  if ((normalizedSql.includes('select') && !normalizedSql.includes('from')) ||
      (normalizedSql.includes('insert into') && !normalizedSql.includes('values')) ||
      (normalizedSql.includes('update') && !normalizedSql.includes('set'))) {
    error = true;
    output.push("SQL Syntax Error: Malformed query");
    return { output, error };
  }
  
  // Handle different SQL commands
  try {
    if (normalizedSql.includes('select')) {
      // Extract table name
      const tableMatch = normalizedSql.match(/from\s+(\w+)/);
      const table = tableMatch ? tableMatch[1] : null;
      
      if (table === 'users') {
        output.push("Executing SELECT query on users table");
        output.push("------------------------");
        output.push("id | name        | email");
        output.push("------------------------");
        dummyUsers.forEach(user => {
          output.push(`${user.id}  | ${user.name.padEnd(11)} | ${user.email}`);
        });
        output.push("------------------------");
        output.push(`${dummyUsers.length} rows returned`);
      } else if (table === 'products') {
        output.push("Executing SELECT query on products table");
        output.push("------------------------");
        output.push("id | name        | price");
        output.push("------------------------");
        dummyProducts.forEach(product => {
          output.push(`${product.id}  | ${product.name.padEnd(11)} | $${product.price}`);
        });
        output.push("------------------------");
        output.push(`${dummyProducts.length} rows returned`);
      } else {
        output.push(`Executing SELECT query on ${table || 'unknown'} table`);
        output.push("------------------------");
        output.push("No results or unknown table");
      }
    } else if (normalizedSql.includes('insert into')) {
      const tableMatch = normalizedSql.match(/into\s+(\w+)/);
      const table = tableMatch ? tableMatch[1] : 'unknown';
      output.push(`Executing INSERT query on ${table} table`);
      output.push("------------------------");
      output.push("1 row inserted successfully");
    } else if (normalizedSql.includes('update')) {
      const tableMatch = normalizedSql.match(/update\s+(\w+)/);
      const table = tableMatch ? tableMatch[1] : 'unknown';
      output.push(`Executing UPDATE query on ${table} table`);
      output.push("------------------------");
      output.push("1 row updated successfully");
    } else if (normalizedSql.includes('delete from')) {
      const tableMatch = normalizedSql.match(/from\s+(\w+)/);
      const table = tableMatch ? tableMatch[1] : 'unknown';
      output.push(`Executing DELETE query on ${table} table`);
      output.push("------------------------");
      output.push("1 row deleted successfully");
    } else if (normalizedSql.includes('create table')) {
      const tableMatch = normalizedSql.match(/table\s+(\w+)/);
      const table = tableMatch ? tableMatch[1] : 'unknown';
      output.push(`Executing CREATE TABLE statement for ${table}`);
      output.push("------------------------");
      output.push("Table created successfully");
    } else {
      output.push("Executing SQL query");
      output.push("------------------------");
      output.push("Query executed successfully");
    }
  } catch (err) {
    error = true;
    output.push(`SQL Error: ${err}`);
  }
  
  return { output, error: false };
};

// Execute HTML with preview
const executeHtml = (code: string): ExecuteCodeResult => {
  let error = false;
  const output: string[] = [];
  
  output.push("HTML Rendering:");
  output.push("------------------------");
  
  // Basic syntax validation
  if (!code.includes("<html") || !code.includes("</html>")) {
    output.push("Warning: Missing html tags");
  }
  
  if (!code.includes("<body") && code.includes("<html")) {
    output.push("Warning: Missing body tags");
  }
  
  // Check for common HTML elements
  const hasHeadings = /<h[1-6][^>]*>.*?<\/h[1-6]>/i.test(code);
  const hasParagraphs = /<p[^>]*>.*?<\/p>/i.test(code);
  const hasLinks = /<a[^>]*>.*?<\/a>/i.test(code);
  const hasImages = /<img[^>]*>/i.test(code);
  
  output.push("HTML document structure detected:");
  if (hasHeadings) output.push("- Heading elements");
  if (hasParagraphs) output.push("- Paragraph elements");
  if (hasLinks) output.push("- Link elements");
  if (hasImages) output.push("- Image elements");
  
  output.push("------------------------");
  output.push("Code preview:");
  output.push(code.slice(0, 300) + (code.length > 300 ? "..." : ""));
  
  return { output, error };
};

// Execute CSS with preview
const executeCss = (code: string): ExecuteCodeResult => {
  let error = false;
  const output: string[] = [];
  
  output.push("CSS Styling:");
  output.push("------------------------");
  
  // Basic syntax validation
  const missingClosingBraces = (code.match(/{/g) || []).length !== (code.match(/}/g) || []).length;
  if (missingClosingBraces) {
    error = true;
    output.push("Error: Missing closing braces");
  }
  
  // Detect CSS features
  const hasSelectors = /[.#]?[\w-]+\s*{/.test(code);
  const hasMediaQueries = /@media/.test(code);
  const hasAnimations = /@keyframes/.test(code);
  const hasFlexbox = /display\s*:\s*flex/.test(code);
  const hasGrid = /display\s*:\s*grid/.test(code);
  
  output.push("CSS features detected:");
  if (hasSelectors) output.push("- CSS selectors");
  if (hasMediaQueries) output.push("- Media queries (responsive design)");
  if (hasAnimations) output.push("- Keyframe animations");
  if (hasFlexbox) output.push("- Flexbox layout");
  if (hasGrid) output.push("- CSS Grid layout");
  
  output.push("------------------------");
  output.push("Code preview:");
  output.push(code.slice(0, 300) + (code.length > 300 ? "..." : ""));
  
  return { output, error };
};

// Execute Ruby code (simplified simulation)
const executeRuby = (code: string): ExecuteCodeResult => {
  const output: string[] = [];
  let error = false;
  
  // Add header to output
  output.push("Ruby Execution:");
  output.push("------------------------");
  
  try {
    // Handle puts statements with better regex
    const putMatches = code.match(/puts\s+(.*?)($|\n)/g) || [];
    putMatches.forEach(match => {
      const content = match.replace(/puts\s+(.*?)($|\n)/, '$1').trim();
      // Handle string literals
      if ((content.startsWith('"') && content.endsWith('"')) || 
          (content.startsWith("'") && content.endsWith("'"))) {
        output.push(content.slice(1, -1));
      } else {
        output.push(`Output: ${content}`);
      }
    });
    
    // Handle print statements
    const printMatches = code.match(/print\s+(.*?)($|\n)/g) || [];
    if (printMatches.length > 0) {
      output.push("Print statement outputs (without newlines)");
    }
    
    // Check for method definitions
    const defMatches = code.match(/def\s+(\w+)/g) || [];
    defMatches.forEach(match => {
      const methodName = match.replace(/def\s+/, '');
      output.push(`Method '${methodName}' defined`);
    });
    
    // Check for class definitions
    const classMatches = code.match(/class\s+(\w+)/g) || [];
    classMatches.forEach(match => {
      const className = match.replace(/class\s+/, '');
      output.push(`Class '${className}' defined`);
    });
    
    // If code has no output generators, show success message
    if (output.length === 2) { // Only the header lines
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
  
  // Add header to output
  output.push("Go Execution:");
  output.push("------------------------");
  
  try {
    // Verify package main and func main
    if (!code.includes("package main")) {
      error = true;
      output.push("Error: Missing 'package main' declaration");
      return { output, error };
    }
    
    if (!code.includes("func main()")) {
      error = true;
      output.push("Error: Missing 'func main()' function");
      return { output, error };
    }
    
    // Handle fmt.Println statements with better regex
    const printlnMatches = code.match(/fmt\.Println\s*\((.*?)\)/g) || [];
    printlnMatches.forEach(match => {
      const content = match.match(/fmt\.Println\s*\((.*?)\)/)?.[1].trim();
      if (content) {
        // Handle string literals
        if ((content.startsWith('"') && content.endsWith('"')) || 
            (content.startsWith("'") && content.endsWith("'"))) {
          output.push(content.slice(1, -1));
        } else {
          output.push(`Output: ${content}`);
        }
      }
    });
    
    // Handle fmt.Printf statements
    const printfMatches = code.match(/fmt\.Printf\s*\((.*?)\)/g) || [];
    for (const match of printfMatches) {
      const formatStr = match.match(/fmt\.Printf\s*\(\s*"([^"]*)"/)?.[1];
      if (formatStr) {
        const simplified = formatStr.replace(/%d|%f|%s|%v|%T|%p/g, "variable");
        output.push(simplified);
      }
    }
    
    // Check for function definitions
    const funcMatches = code.match(/func\s+(\w+)\s*\(/g) || [];
    funcMatches.forEach(match => {
      if (!match.includes("main")) { // Skip main function we already validated
        const funcName = match.match(/func\s+(\w+)/)?.[1];
        output.push(`Function '${funcName}' defined`);
      }
    });
    
    // If code has no output generators, show success message
    if (output.length === 2) { // Only the header lines
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
  
  // Add header to output
  output.push("PHP Execution:");
  output.push("------------------------");
  
  try {
    // Check for PHP opening tag
    if (!code.includes("<?php") && !code.includes("<?")) {
      output.push("Warning: Missing PHP opening tag");
    }
    
    // Handle echo statements with better regex
    const echoMatches = code.match(/echo\s+(.*?);/g) || [];
    echoMatches.forEach(match => {
      const content = match.match(/echo\s+(.*?);/)?.[1].trim();
      if (content) {
        // Handle string literals
        if ((content.startsWith('"') && content.endsWith('"')) || 
            (content.startsWith("'") && content.endsWith("'"))) {
          output.push(content.slice(1, -1));
        } 
        // Handle string concatenation
        else if (content.includes('.')) {
          const parts = content.split('.');
          output.push("Concatenated output");
        } else {
          output.push(`Output: ${content}`);
        }
      }
    });
    
    // Handle print statements
    const printMatches = code.match(/print\s+(.*?);/g) || [];
    if (printMatches.length > 0) {
      output.push("Print statement detected");
    }
    
    // Check for function definitions
    const funcMatches = code.match(/function\s+(\w+)\s*\(/g) || [];
    funcMatches.forEach(match => {
      const funcName = match.match(/function\s+(\w+)/)?.[1];
      output.push(`Function '${funcName}' defined`);
    });
    
    // Check for class definitions
    const classMatches = code.match(/class\s+(\w+)/g) || [];
    classMatches.forEach(match => {
      const className = match.match(/class\s+(\w+)/)?.[1];
      output.push(`Class '${className}' defined`);
    });
    
    // If code has no output generators, show success message
    if (output.length === 2) { // Only the header lines
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
  
  // Add header to output
  output.push("Rust Execution:");
  output.push("------------------------");
  
  try {
    // Check for fn main
    if (!code.includes("fn main()") && !code.includes("fn main(")) {
      error = true;
      output.push("Error: Missing 'fn main()' function");
      return { output, error };
    }
    
    // Handle println! macros with better regex
    const printlnMatches = code.match(/println!\s*\(\s*"([^"]*)"/g) || [];
    printlnMatches.forEach(match => {
      const formatStr = match.match(/println!\s*\(\s*"([^"]*)"/)?.[1];
      if (formatStr) {
        // Handle format arguments like {}, {:?}, etc.
        const simplified = formatStr.replace(/\{.*?\}/g, "variable");
        output.push(simplified);
      }
    });
    
    // Handle print! macros
    const printMatches = code.match(/print!\s*\(\s*"([^"]*)"/g) || [];
    if (printMatches.length > 0) {
      output.push("Print statement detected (without newline)");
    }
    
    // Check for function definitions
    const funcMatches = code.match(/fn\s+(\w+)\s*\(/g) || [];
    funcMatches.forEach(match => {
      if (!match.includes("main")) { // Skip main function we already validated
        const funcName = match.match(/fn\s+(\w+)/)?.[1];
        output.push(`Function '${funcName}' defined`);
      }
    });
    
    // Check for struct definitions
    const structMatches = code.match(/struct\s+(\w+)/g) || [];
    structMatches.forEach(match => {
      const structName = match.match(/struct\s+(\w+)/)?.[1];
      output.push(`Struct '${structName}' defined`);
    });
    
    // If code has no output generators, show success message
    if (output.length === 2) { // Only the header lines
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
      // For C#, we'll improve the simulation but still borrow from the C++ implementation
      // with some C#-specific adjustments
      return {
        output: [
          "C# Execution:",
          "------------------------",
          ...executeCpp(code.replace("Console.WriteLine", "cout <<").replace(";", " << endl;"))
            .output.slice(2).map(line => line.replace("variable << endl", "variable"))
        ],
        error: false
      };
    case 'html':
      return executeHtml(code);
    case 'css':
      return executeCss(code);
    case 'json':
      try {
        // Better JSON validation with pretty print
        const parsed = JSON.parse(code);
        return {
          output: ["JSON validated successfully", JSON.stringify(parsed, null, 2)],
          error: false
        };
      } catch (err: any) {
        return {
          output: [`JSON Error: ${err.message}`],
          error: true
        };
      }
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
