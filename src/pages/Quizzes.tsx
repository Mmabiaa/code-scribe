
import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { HelpCircle, CheckCircle, X } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const quizzes = [
  {
    id: 1,
    title: "Documentation Basics Quiz",
    description: "Test your knowledge on basic documentation principles",
    questions: 10,
    timeEstimate: "15 min",
    difficulty: "Beginner",
    completed: true,
    score: 8
  },
  {
    id: 2,
    title: "API Documentation Best Practices",
    description: "Evaluate your understanding of API documentation standards",
    questions: 15,
    timeEstimate: "25 min",
    difficulty: "Intermediate",
    completed: false,
    score: null
  },
  {
    id: 3,
    title: "Advanced Documentation Tools",
    description: "Test your knowledge of documentation generators and tools",
    questions: 12,
    timeEstimate: "20 min",
    difficulty: "Advanced",
    completed: false,
    score: null
  }
];

// Sample quiz questions for the modal
const sampleQuiz = {
  id: 2,
  title: "API Documentation Best Practices",
  currentQuestion: 0,
  questions: [
    {
      id: 1,
      text: "What is the primary purpose of API documentation?",
      options: [
        "To showcase the developer's coding skills",
        "To explain how to use and integrate with the API",
        "To list all possible API errors",
        "To replace the need for customer support"
      ],
      correctAnswer: 1
    },
    {
      id: 2,
      text: "Which of the following is NOT typically included in API documentation?",
      options: [
        "Authentication methods",
        "Endpoint descriptions",
        "Source code of the API implementation",
        "Request and response examples"
      ],
      correctAnswer: 2
    },
    {
      id: 3,
      text: "What is OpenAPI (formerly Swagger)?",
      options: [
        "A programming language for APIs",
        "A specification for describing RESTful APIs",
        "An API testing tool",
        "A database for storing API credentials"
      ],
      correctAnswer: 1
    }
  ]
};

const QuizzesPage = () => {
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const startQuiz = (quizId) => {
    const quiz = quizzes.find(q => q.id === quizId);
    if (quiz && !quiz.completed) {
      setActiveQuiz(sampleQuiz);
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setAnswers({});
      setQuizCompleted(false);
      setScore(0);
    } else {
      toast({
        title: "Quiz already completed",
        description: "You've already taken this quiz. View your results instead.",
      });
    }
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const nextQuestion = () => {
    if (selectedAnswer === null) {
      toast({
        title: "Please select an answer",
        description: "You need to select an answer before proceeding.",
        variant: "destructive"
      });
      return;
    }

    // Save the answer
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: selectedAnswer
    }));

    if (currentQuestion < activeQuiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      // Calculate score
      let correctAnswers = 0;
      Object.entries({ ...answers, [currentQuestion]: selectedAnswer }).forEach(([questionIdx, answerIdx]) => {
        if (activeQuiz.questions[parseInt(questionIdx)].correctAnswer === answerIdx) {
          correctAnswers++;
        }
      });
      
      const finalScore = Math.round((correctAnswers / activeQuiz.questions.length) * 100);
      setScore(finalScore);
      setQuizCompleted(true);
    }
  };

  const finishQuiz = () => {
    toast({
      title: "Quiz Completed!",
      description: `Your score: ${score}%. Great job!`,
    });
    setActiveQuiz(null);
  };

  const viewResults = (quizId) => {
    const quiz = quizzes.find(q => q.id === quizId);
    if (quiz && quiz.completed) {
      toast({
        title: "Quiz Results",
        description: `You scored ${quiz.score}/10 on this quiz.`,
      });
    }
  };

  return (
    <Layout title="Quizzes & Assessments" subtitle="Test your knowledge and get instant feedback">
      {activeQuiz ? (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>{activeQuiz.title}</CardTitle>
              <Badge>{quizCompleted ? "Completed" : `Question ${currentQuestion + 1} of ${activeQuiz.questions.length}`}</Badge>
            </div>
            {!quizCompleted && <CardDescription>Select the correct answer below</CardDescription>}
          </CardHeader>
          <CardContent>
            {quizCompleted ? (
              <div className="text-center space-y-4">
                <div className="mb-4">
                  <div className={`inline-flex items-center justify-center p-4 rounded-full ${score >= 70 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {score >= 70 ? <CheckCircle className="h-12 w-12" /> : <HelpCircle className="h-12 w-12" />}
                  </div>
                </div>
                <h3 className="text-2xl font-bold">{score}%</h3>
                <p className="text-muted-foreground">
                  {score >= 70 
                    ? "Great job! You have a good understanding of this topic." 
                    : "You might want to review this topic again."}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-lg font-medium mb-4">
                  {activeQuiz.questions[currentQuestion].text}
                </div>
                <RadioGroup value={selectedAnswer} onValueChange={(val) => handleAnswerSelect(parseInt(val))}>
                  {activeQuiz.questions[currentQuestion].options.map((option, idx) => (
                    <div key={idx} className="flex items-center space-x-2 p-2 rounded hover:bg-muted/50">
                      <RadioGroupItem value={idx} id={`option-${idx}`} />
                      <Label htmlFor={`option-${idx}`} className="flex-grow cursor-pointer">{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-end">
            {quizCompleted ? (
              <Button onClick={finishQuiz}>Finish</Button>
            ) : (
              <Button onClick={nextQuestion}>
                {currentQuestion < activeQuiz.questions.length - 1 ? "Next Question" : "Submit Quiz"}
              </Button>
            )}
          </CardFooter>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <Card key={quiz.id} className="flex flex-col h-full">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{quiz.title}</CardTitle>
                  <Badge variant={quiz.completed ? "secondary" : "outline"}>
                    {quiz.completed ? "Completed" : quiz.difficulty}
                  </Badge>
                </div>
                <CardDescription>{quiz.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex justify-between text-sm text-muted-foreground mb-4">
                  <span>{quiz.questions} questions</span>
                  <span>{quiz.timeEstimate}</span>
                </div>
                {quiz.completed && (
                  <div className="mt-2 p-2 bg-muted rounded-md flex items-center justify-between">
                    <span className="text-sm font-medium">Your score:</span>
                    <span className="font-bold">{quiz.score}/10</span>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                {quiz.completed ? (
                  <Button variant="outline" className="w-full" onClick={() => viewResults(quiz.id)}>
                    View Results
                  </Button>
                ) : (
                  <Button className="w-full" onClick={() => startQuiz(quiz.id)}>
                    Start Quiz
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default QuizzesPage;
