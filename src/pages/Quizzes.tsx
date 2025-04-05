
import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, Award, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const quizCategories = [
  {
    id: "beginner",
    name: "Beginner",
    description: "Fundamental documentation concepts",
    quizzes: [
      {
        id: 1,
        title: "Documentation Basics",
        description: "Learn the fundamentals of code documentation",
        questionsCount: 10,
        timeInMinutes: 15,
        completed: true,
        score: 90
      },
      {
        id: 2,
        title: "Markdown Essentials",
        description: "Master the basics of Markdown formatting",
        questionsCount: 12,
        timeInMinutes: 20,
        completed: true,
        score: 75
      },
      {
        id: 3,
        title: "Comments Best Practices",
        description: "Learn how to write effective code comments",
        questionsCount: 15,
        timeInMinutes: 25,
        completed: false
      }
    ]
  },
  {
    id: "intermediate",
    name: "Intermediate",
    description: "Advanced documentation techniques",
    quizzes: [
      {
        id: 4,
        title: "API Documentation",
        description: "Learn how to document APIs effectively",
        questionsCount: 15,
        timeInMinutes: 30,
        completed: false
      },
      {
        id: 5,
        title: "Documentation Tools",
        description: "Explore popular documentation tools and their uses",
        questionsCount: 12,
        timeInMinutes: 25,
        completed: false
      }
    ]
  },
  {
    id: "advanced",
    name: "Advanced",
    description: "Professional documentation strategies",
    quizzes: [
      {
        id: 6,
        title: "Documentation Architecture",
        description: "Design scalable documentation systems",
        questionsCount: 20,
        timeInMinutes: 40,
        completed: false
      }
    ]
  }
];

const QuizCard = ({ quiz, onStart }) => {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{quiz.title}</CardTitle>
          {quiz.completed && (
            <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Completed
            </Badge>
          )}
        </div>
        <CardDescription>{quiz.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{quiz.timeInMinutes} mins</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Book className="h-4 w-4" />
            <span>{quiz.questionsCount} questions</span>
          </div>
        </div>
        
        {quiz.completed && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Score</span>
              <span className="text-sm font-medium">{quiz.score}%</span>
            </div>
            <Progress value={quiz.score} className="h-2" />
          </div>
        )}
      </CardContent>
      <CardFooter>
        {quiz.completed ? (
          <Button variant="outline" className="w-full" onClick={() => onStart(quiz)}>
            Review Quiz
          </Button>
        ) : (
          <Button className="w-full" onClick={() => onStart(quiz)}>
            Start Quiz
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

const Quizzes = () => {
  const [selectedCategory, setSelectedCategory] = useState("beginner");
  
  const handleStartQuiz = (quiz) => {
    toast({
      title: quiz.completed ? "Quiz Review" : "Quiz Started",
      description: quiz.completed 
        ? `You're reviewing ${quiz.title}. Your previous score was ${quiz.score}%.` 
        : `Starting ${quiz.title}. Good luck!`,
    });
  };

  return (
    <Layout title="Quizzes & Assessments" subtitle="Test your knowledge and get instant feedback">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Award className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-medium">Your Progress</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">3/8</CardTitle>
              <CardDescription>Quizzes Completed</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={37.5} className="h-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">82%</CardTitle>
              <CardDescription>Average Score</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={82} className="h-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">4</CardTitle>
              <CardDescription>Badges Earned</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Badge className="h-8 w-8 rounded-full p-0 flex items-center justify-center">
                  <CheckCircle2 className="h-4 w-4" />
                </Badge>
                <Badge className="h-8 w-8 rounded-full p-0 flex items-center justify-center">
                  <Book className="h-4 w-4" />
                </Badge>
                <Badge className="h-8 w-8 rounded-full p-0 flex items-center justify-center">
                  <Award className="h-4 w-4" />
                </Badge>
                <Badge className="h-8 w-8 rounded-full p-0 flex items-center justify-center">
                  <AlertCircle className="h-4 w-4" />
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Tabs defaultValue={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="mb-4">
          {quizCategories.map(category => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {quizCategories.map(category => (
          <TabsContent key={category.id} value={category.id}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.quizzes.map(quiz => (
                <QuizCard key={quiz.id} quiz={quiz} onStart={handleStartQuiz} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </Layout>
  );
};

export default Quizzes;
