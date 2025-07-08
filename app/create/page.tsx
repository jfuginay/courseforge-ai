"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  Settings,
  Check,
  X,
  Loader2,
  Youtube,
  Brain,
  Clock,
  Users,
  Share2,
  BookOpen,
  Edit3,
  Save,
} from "lucide-react"
import Link from "next/link"

interface Question {
  id: string
  type: "multiple-choice" | "true-false" | "short-answer" | "cloze"
  timestamp: number
  question: string
  options?: string[]
  correctAnswer: string | number
  explanation: string
  accepted: boolean
}

export default function CreateCoursePage() {
  // Mock questions for demo
  const mockQuestions: Question[] = [
    {
      id: "1",
      type: "multiple-choice",
      timestamp: 45,
      question: "What is the primary purpose of React hooks?",
      options: [
        "To replace class components entirely",
        "To add state and lifecycle methods to functional components",
        "To improve performance",
        "To handle routing",
      ],
      correctAnswer: 1,
      explanation:
        "React hooks allow functional components to use state and other React features that were previously only available in class components.",
      accepted: true,
    },
    {
      id: "2",
      type: "true-false",
      timestamp: 120,
      question: "useState can only be used once per component.",
      correctAnswer: "false",
      explanation: "You can use useState multiple times in a single component to manage different pieces of state.",
      accepted: true,
    },
    {
      id: "3",
      type: "short-answer",
      timestamp: 180,
      question: "What hook would you use to perform side effects in a functional component?",
      correctAnswer: "useEffect",
      explanation:
        "useEffect is the hook used for side effects like data fetching, subscriptions, or manually changing the DOM.",
      accepted: false,
    },
    {
      id: "4",
      type: "cloze",
      timestamp: 240,
      question: "The _____ hook is used to manage state in functional components.",
      correctAnswer: "useState",
      explanation: "useState is the fundamental hook for adding state to functional components.",
      accepted: true,
    },
    {
      id: "5",
      type: "multiple-choice",
      timestamp: 300,
      question: "Which hook is used for handling side effects?",
      options: [
        "useState",
        "useEffect",
        "useContext",
        "useReducer",
      ],
      correctAnswer: 1,
      explanation: "useEffect is specifically designed for handling side effects in functional components.",
      accepted: true,
    },
    {
      id: "6",
      type: "true-false",
      timestamp: 360,
      question: "Custom hooks must start with the word 'use'.",
      correctAnswer: "true",
      explanation: "Custom hooks must follow the naming convention of starting with 'use' for React to recognize them as hooks.",
      accepted: true,
    },
  ]

  const [step, setStep] = useState<"input" | "processing" | "review" | "complete">("review")
  const [youtubeUrl, setYoutubeUrl] = useState("https://www.youtube.com/watch?v=ml4NSzCQobk")
  const [courseTitle, setCourseTitle] = useState("Introduction to React Hooks")
  const [courseDescription, setCourseDescription] = useState("Learn the fundamentals of React hooks including useState, useEffect, and custom hooks.")
  const [processingProgress, setProcessingProgress] = useState(0)
  const [questions, setQuestions] = useState<Question[]>(mockQuestions)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [videoPlaying, setVideoPlaying] = useState(false)
  const [generatedCourseId, setGeneratedCourseId] = useState("")
  const [editingQuestions, setEditingQuestions] = useState<Set<string>>(new Set())
  const [editingData, setEditingData] = useState<{ [key: string]: Question }>({})

  const handleUrlSubmit = async () => {
    if (!youtubeUrl) return

    setStep("processing")
    setProcessingProgress(0)

    // Simulate processing steps
    const steps = [
      { message: "Extracting video metadata...", progress: 20 },
      { message: "Generating transcript...", progress: 40 },
      { message: "Analyzing content with AI...", progress: 60 },
      { message: "Creating questions...", progress: 80 },
      { message: "Finalizing course structure...", progress: 100 },
    ]

    for (const step of steps) {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setProcessingProgress(step.progress)
    }

    // Set mock data
    setCourseTitle("Introduction to React Hooks")
    setCourseDescription("Learn the fundamentals of React hooks including useState, useEffect, and custom hooks.")
    setQuestions(mockQuestions)
    setStep("review")
  }

  const toggleQuestionAcceptance = (questionId: string) => {
    setQuestions((prev) => prev.map((q) => (q.id === questionId ? { ...q, accepted: !q.accepted } : q)))
  }

  const handleEditQuestion = (questionId: string) => {
    const question = questions.find(q => q.id === questionId)
    if (question) {
      setEditingData(prev => ({ ...prev, [questionId]: { ...question } }))
      setEditingQuestions(prev => new Set([...prev, questionId]))
    }
  }

  const handleSaveQuestion = (questionId: string) => {
    const editedQuestion = editingData[questionId]
    if (editedQuestion) {
      setQuestions(prev => prev.map(q => q.id === questionId ? editedQuestion : q))
      setEditingQuestions(prev => {
        const newSet = new Set(prev)
        newSet.delete(questionId)
        return newSet
      })
      setEditingData(prev => {
        const newData = { ...prev }
        delete newData[questionId]
        return newData
      })
    }
  }

  const handleCancelEdit = (questionId: string) => {
    setEditingQuestions(prev => {
      const newSet = new Set(prev)
      newSet.delete(questionId)
      return newSet
    })
    setEditingData(prev => {
      const newData = { ...prev }
      delete newData[questionId]
      return newData
    })
  }

  const updateEditingQuestion = (questionId: string, field: keyof Question, value: any) => {
    setEditingData(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        [field]: value
      }
    }))
  }

  const updateEditingOption = (questionId: string, optionIndex: number, value: string) => {
    setEditingData(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        options: prev[questionId].options?.map((option, index) => 
          index === optionIndex ? value : option
        )
      }
    }))
  }

  const handlePublishCourse = async () => {
    const acceptedQuestions = questions.filter((q) => q.accepted)

    // Simulate course creation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setGeneratedCourseId("course-123-abc")
    setStep("complete")
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  // Extract video ID from YouTube URL
  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  const renderQuestionContent = (question: Question, isEditing: boolean = false) => {
    const editData = editingData[question.id] || question

    if (isEditing) {
      return (
        <div className="space-y-4">
          {/* Question Text */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Question</label>
            <Textarea
              value={editData.question}
              onChange={(e) => updateEditingQuestion(question.id, 'question', e.target.value)}
              className="w-full"
              rows={2}
            />
          </div>

          {/* Question Type */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Question Type</label>
            <Select
              value={editData.type}
              onValueChange={(value) => updateEditingQuestion(question.id, 'type', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                <SelectItem value="true-false">True/False</SelectItem>
                <SelectItem value="short-answer">Short Answer</SelectItem>
                <SelectItem value="cloze">Fill in the Blank</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Options for Multiple Choice */}
          {editData.type === "multiple-choice" && editData.options && (
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Options</label>
              <div className="space-y-2">
                {editData.options.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-sm font-medium w-6">{String.fromCharCode(65 + index)}.</span>
                    <Input
                      value={option}
                      onChange={(e) => updateEditingOption(question.id, index, e.target.value)}
                      className="flex-1"
                    />
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name={`correct-${question.id}`}
                        checked={editData.correctAnswer === index}
                        onChange={() => updateEditingQuestion(question.id, 'correctAnswer', index)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <label className="ml-2 text-sm text-gray-600">Correct</label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* True/False Answer */}
          {editData.type === "true-false" && (
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Correct Answer</label>
              <Select
                value={editData.correctAnswer as string}
                onValueChange={(value) => updateEditingQuestion(question.id, 'correctAnswer', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">True</SelectItem>
                  <SelectItem value="false">False</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Short Answer/Cloze Answer */}
          {(editData.type === "short-answer" || editData.type === "cloze") && (
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Correct Answer</label>
              <Input
                value={editData.correctAnswer as string}
                onChange={(e) => updateEditingQuestion(question.id, 'correctAnswer', e.target.value)}
                className="w-full"
              />
            </div>
          )}

          {/* Explanation */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Explanation</label>
            <Textarea
              value={editData.explanation}
              onChange={(e) => updateEditingQuestion(question.id, 'explanation', e.target.value)}
              className="w-full"
              rows={3}
            />
          </div>
        </div>
      )
    }

    return (
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900">{question.question}</h4>

        {question.type === "multiple-choice" && question.options && (
          <div className="space-y-2">
            {question.options.map((option, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border ${
                  index === question.correctAnswer
                    ? "bg-green-50 border-green-200"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
                {index === question.correctAnswer && (
                  <Check className="w-4 h-4 text-green-600 inline ml-2" />
                )}
              </div>
            ))}
          </div>
        )}

        {question.type === "true-false" && (
          <div className="space-y-2">
            <div
              className={`p-3 rounded-lg border ${
                question.correctAnswer === "true"
                  ? "bg-green-50 border-green-200"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <span className="font-medium">True</span>
              {question.correctAnswer === "true" && (
                <Check className="w-4 h-4 text-green-600 inline ml-2" />
              )}
            </div>
            <div
              className={`p-3 rounded-lg border ${
                question.correctAnswer === "false"
                  ? "bg-green-50 border-green-200"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <span className="font-medium">False</span>
              {question.correctAnswer === "false" && (
                <Check className="w-4 h-4 text-green-600 inline ml-2" />
              )}
            </div>
          </div>
        )}

        {(question.type === "short-answer" || question.type === "cloze") && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <span className="font-medium text-green-800">Answer:</span> 
            <span className="text-green-700"> {question.correctAnswer}</span>
          </div>
        )}

        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <span className="font-medium">Explanation:</span> {question.explanation}
          </p>
        </div>
      </div>
    )
  }

  if (step === "input") {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="border-b bg-white">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">CourseAI</span>
            </Link>
            <Button variant="outline">Back to Home</Button>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Create Your Course</h1>
              <p className="text-xl text-gray-600">
                Paste a YouTube URL and let AI transform it into an interactive learning experience
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Youtube className="w-6 h-6 text-red-600" />
                  YouTube Video URL
                </CardTitle>
                <CardDescription>Enter the URL of the YouTube video you want to convert into a course</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="https://youtube.com/watch?v=..."
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  className="text-lg"
                />

                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4" />
                    AI-powered analysis
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    ~2-3 minutes processing
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Shareable public link
                  </div>
                  <div className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Customizable questions
                  </div>
                </div>

                <Button
                  onClick={handleUrlSubmit}
                  disabled={!youtubeUrl}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  size="lg"
                >
                  <Brain className="w-5 h-5 mr-2" />
                  Generate Course with AI
                </Button>
              </CardContent>
            </Card>

            <div className="mt-8 text-center text-sm text-gray-500">
              <p>Supported: YouTube videos up to 2 hours • Public and unlisted videos</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (step === "processing") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
            <CardTitle>Processing Your Video</CardTitle>
            <CardDescription>Our AI is analyzing the content and generating interactive questions</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={processingProgress} className="mb-4" />
            <p className="text-center text-sm text-gray-600">{processingProgress}% complete</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (step === "review") {
    const acceptedCount = questions.filter((q) => q.accepted).length
    const videoId = getYouTubeVideoId(youtubeUrl)

    return (
      <div className="min-h-screen bg-gray-50">
        <header className="border-b bg-white">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">CourseAI</span>
            </Link>
            <div className="flex items-center gap-4">
              <Badge variant="secondary">
                {acceptedCount} of {questions.length} questions selected
              </Badge>
              <Button onClick={handlePublishCourse} disabled={acceptedCount === 0}>
                Publish Course
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Video Player */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-0">
                  <div className="aspect-video bg-black rounded-t-lg relative overflow-hidden">
                    {videoId ? (
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="absolute inset-0"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-white text-center">
                          <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                          <p className="opacity-75">Video Player Placeholder</p>
                          <p className="text-sm opacity-50">YouTube: {youtubeUrl}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Course Info */}
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>{courseTitle}</CardTitle>
                  <CardDescription>{courseDescription}</CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* Question Review Panel */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Generated Questions
                    <Badge>{questions.length} total</Badge>
                  </CardTitle>
                  <CardDescription>Review, edit, and select questions for your course</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-[600px] overflow-y-auto">
                    {questions.map((question, index) => {
                      const isEditing = editingQuestions.has(question.id)
                      
                      return (
                        <Card key={question.id} className="p-4 border-2 hover:border-blue-200 transition-colors">
                          <div className="space-y-4">
                            {/* Question Header */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                  {formatTime(question.timestamp)}
                                </Badge>
                                <Badge variant={question.type === "multiple-choice" ? "default" : "secondary"} className="text-xs">
                                  {question.type.replace("-", " ")}
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-2">
                                {!isEditing ? (
                                  <>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => handleEditQuestion(question.id)}
                                      className="h-8 w-8 p-0"
                                    >
                                      <Edit3 className="w-4 h-4" />
                                    </Button>
                                    <Checkbox
                                      id={`question-${question.id}`}
                                      checked={question.accepted}
                                      onCheckedChange={() => toggleQuestionAcceptance(question.id)}
                                    />
                                    <label htmlFor={`question-${question.id}`} className="text-sm font-medium cursor-pointer">
                                      Include
                                    </label>
                                  </>
                                ) : (
                                  <div className="flex gap-2">
                                    <Button
                                      size="sm"
                                      onClick={() => handleSaveQuestion(question.id)}
                                      className="h-8"
                                    >
                                      <Save className="w-4 h-4 mr-1" />
                                      Save
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleCancelEdit(question.id)}
                                      className="h-8"
                                    >
                                      Cancel
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Question Content */}
                            {renderQuestionContent(question, isEditing)}
                          </div>
                        </Card>
                      )
                    })}
                  </div>

                  {/* Summary */}
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 text-center">
                      <span className="font-medium">{acceptedCount}</span> of <span className="font-medium">{questions.length}</span> questions selected
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (step === "complete") {
    const courseUrl = `${window.location.origin}/course/${generatedCourseId}`

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle>Course Published Successfully!</CardTitle>
            <CardDescription>Your interactive course is now live and ready to share</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-gray-100 rounded-lg">
              <p className="text-sm font-medium mb-2">Course URL:</p>
              <div className="flex items-center gap-2">
                <Input value={courseUrl} readOnly className="text-sm" />
                <Button size="sm" variant="outline">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center p-3 bg-blue-50 rounded">
                <div className="font-semibold text-blue-900">{questions.filter((q) => q.accepted).length}</div>
                <div className="text-blue-700">Questions</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded">
                <div className="font-semibold text-green-900">Public</div>
                <div className="text-green-700">Access</div>
              </div>
            </div>

            <div className="flex gap-2">
              <Link href={`/course/${generatedCourseId}`} className="flex-1">
                <Button className="w-full">View Course</Button>
              </Link>
              <Link href="/create" className="flex-1">
                <Button variant="outline" className="w-full bg-transparent">
                  Create Another
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return null
}
