
export const SUPPORTED_LANGUAGES = {
  javascript: "JavaScript",
  typescript: "TypeScript",
  html: "HTML",
  css: "CSS",
  json: "JSON",
  python: "Python",
  java: "Java",
  csharp: "C#",
  cpp: "C++",
  go: "Go",
  php: "PHP",
  ruby: "Ruby",
  rust: "Rust",
  sql: "SQL",
} as const;

export type SupportedLanguage = keyof typeof SUPPORTED_LANGUAGES;

export const DEFAULT_LANGUAGE = "javascript";

export const DEFAULT_CODE_SNIPPETS: Record<SupportedLanguage, string> = {
  javascript: `// Welcome to CodeScribe!
// Write your JavaScript code here
function greet() {
  const name = "World";
  console.log(\`Hello, \${name}!\`);
  return \`Hello, \${name}!\`;
}

// Call the function
greet();`,
  typescript: `// Welcome to CodeScribe!
// Write your TypeScript code here
function greet(name: string): string {
  console.log(\`Hello, \${name}!\`);
  return \`Hello, \${name}!\`;
}

// Call the function
greet("World");`,
  html: `<!DOCTYPE html>
<html>
<head>
  <title>My HTML Page</title>
</head>
<body>
  <h1>Hello, World!</h1>
  <p>This is a simple HTML page.</p>
</body>
</html>`,
  css: `/* Welcome to CodeScribe! */
/* Write your CSS code here */

body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
  color: #333;
  background-color: #f5f5f5;
}

h1 {
  color: #2c3e50;
}`,
  json: `{
  "name": "CodeScribe",
  "version": "1.0.0",
  "description": "An online code editor",
  "languages": ["JavaScript", "TypeScript", "HTML", "CSS"],
  "features": {
    "syntaxHighlighting": true,
    "codeExecution": true,
    "multiLanguageSupport": true
  }
}`,
  python: `# Welcome to CodeScribe!
# Write your Python code here
def greet(name="World"):
    message = f"Hello, {name}!"
    print(message)
    return message

# Call the function
greet()`,
  java: `// Welcome to CodeScribe!
// Write your Java code here
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  csharp: `// Welcome to CodeScribe!
// Write your C# code here
using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Hello, World!");
    }
}`,
  cpp: `// Welcome to CodeScribe!
// Write your C++ code here
#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`,
  go: `// Welcome to CodeScribe!
// Write your Go code here
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`,
  php: `<?php
// Welcome to CodeScribe!
// Write your PHP code here
function greet($name = "World") {
    echo "Hello, " . $name . "!";
}

// Call the function
greet();
?>`,
  ruby: `# Welcome to CodeScribe!
# Write your Ruby code here
def greet(name = "World")
  puts "Hello, #{name}!"
end

# Call the function
greet`,
  rust: `// Welcome to CodeScribe!
// Write your Rust code here
fn main() {
    println!("Hello, World!");
}`,
  sql: `-- Welcome to CodeScribe!
-- Write your SQL code here
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE
);

INSERT INTO users (id, name, email) VALUES (1, 'John Doe', 'john@example.com');

SELECT * FROM users;`
};
