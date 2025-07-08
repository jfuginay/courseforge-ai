"use client"

import { useState, useEffect, useRef } from "react"

// YouTube Player API types
declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: () => void
  }
}
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  Check,
  X,
  Clock,
  BookOpen,
  Trophy,
  RotateCcw,
  Share2,
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
}

interface QuizAttempt {
  questionId: string
  answer: string | number
  correct: boolean
  timestamp: number
}

export default function CoursePage({ params }: { params: { id: string } }) {
  const [currentTime, setCurrentTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [userAnswer, setUserAnswer] = useState<string | number>("")
  const [showResult, setShowResult] = useState(false)
  const [attempts, setAttempts] = useState<QuizAttempt[]>([])
  const [courseCompleted, setCourseCompleted] = useState(false)
  const [playerReady, setPlayerReady] = useState(false)
  const playerRef = useRef<any>(null)
  const timeUpdateInterval = useRef<NodeJS.Timeout | null>(null)

  // Mock course data
  const courseData = {
    id: params.id,
    title: "Introduction to React Hooks",
    description: "Learn the fundamentals of React hooks including useState, useEffect, and custom hooks.",
    duration: 512, // seconds
    youtubeUrl: "https://www.youtube.com/watch?v=ml4NSzCQobk",
    questions: [
      {
        id: "1",
        type: "multiple-choice" as const,
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
      },
      {
        id: "2",
        type: "true-false" as const,
        timestamp: 120,
        question: "useState can only be used once per component.",
        correctAnswer: "false",
        explanation: "You can use useState multiple times in a single component to manage different pieces of state.",
      },
      {
        id: "3",
        type: "short-answer" as const,
        timestamp: 180,
        question: "What hook would you use to perform side effects in a functional component?",
        correctAnswer: "useEffect",
        explanation:
          "useEffect is the hook used for side effects like data fetching, subscriptions, or manually changing the DOM.",
      },
      {
        id: "4",
        type: "cloze" as const,
        timestamp: 240,
        question: "The _____ hook is used to manage state in functional components.",
        correctAnswer: "useState",
        explanation: "useState is the fundamental hook for adding state to functional components.",
      },
    ],
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

  const getScore = () => {
    const correctAnswers = attempts.filter((a) => a.correct).length
    return Math.round((correctAnswers / courseData.questions.length) * 100)
  }

  const getProgress = () => {
    return Math.round((currentTime / courseData.duration) * 100)
  }

  // Load YouTube Player API
  useEffect(() => {
    if (!window.YT) {
      const script = document.createElement('script')
      script.src = 'https://www.youtube.com/iframe_api'
      script.async = true
      document.body.appendChild(script)
      
      window.onYouTubeIframeAPIReady = () => {
        initializePlayer()
      }
    } else {
      initializePlayer()
    }

    return () => {
      if (timeUpdateInterval.current) {
        clearInterval(timeUpdateInterval.current)
      }
    }
  }, [])

  const initializePlayer = () => {
    const videoId = getYouTubeVideoId(courseData.youtubeUrl)
    if (!videoId) return

    playerRef.current = new window.YT.Player('youtube-player', {
      height: '100%',
      width: '100%',
      videoId: videoId,
      playerVars: {
        autoplay: 0,
        controls: 1,
        disablekb: 0,
        enablejsapi: 1,
        fs: 1,
        iv_load_policy: 3,
        modestbranding: 1,
        playsinline: 1,
        rel: 0,
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    })
  }

  const onPlayerReady = () => {
    setPlayerReady(true)
    startTimeTracking()
  }

  const onPlayerStateChange = (event: any) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      setIsPlaying(true)
      startTimeTracking()
    } else {
      setIsPlaying(false)
      if (timeUpdateInterval.current) {
        clearInterval(timeUpdateInterval.current)
      }
    }
  }

  const startTimeTracking = () => {
    if (timeUpdateInterval.current) {
      clearInterval(timeUpdateInterval.current)
    }

    timeUpdateInterval.current = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        const currentVideoTime = Math.floor(playerRef.current.getCurrentTime())
        setCurrentTime(currentVideoTime)

        // Check for questions at current timestamp
        const questionAtTime = courseData.questions.find(
          (q) => Math.abs(q.timestamp - currentVideoTime) < 2 && !attempts.some((a) => a.questionId === q.id),
        )

        if (questionAtTime) {
          setCurrentQuestion(questionAtTime)
          setShowQuiz(true)
          if (playerRef.current) {
            playerRef.current.pauseVideo()
          }
        }

        // Check if course is completed
        if (currentVideoTime >= courseData.duration) {
          setIsPlaying(false)
          setCourseCompleted(true)
          if (timeUpdateInterval.current) {
            clearInterval(timeUpdateInterval.current)
          }
        }
      }
    }, 1000)
  }

  const handleAnswerSubmit = () => {
    if (!currentQuestion || userAnswer === "") return

    const isCorrect = userAnswer === currentQuestion.correctAnswer

    const attempt: QuizAttempt = {
      questionId: currentQuestion.id,
      answer: userAnswer,
      correct: isCorrect,
      timestamp: currentTime,
    }

    setAttempts((prev) => [...prev, attempt])
    setShowResult(true)
  }

  const handleContinue = () => {
    setShowQuiz(false)
    setShowResult(false)
    setCurrentQuestion(null)
    setUserAnswer("")
    if (playerRef.current) {
      playerRef.current.playVideo()
    }
  }

  const handleRestart = () => {
    setCurrentTime(0)
    setAttempts([])
    setCourseCompleted(false)
    setShowQuiz(false)
    setShowResult(false)
    setCurrentQuestion(null)
    setUserAnswer("")
    if (playerRef.current) {
      playerRef.current.seekTo(0)
      playerRef.current.pauseVideo()
    }
  }

  const renderQuestion = () => {
    if (!currentQuestion) return null

    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge variant="outline">
              <Clock className="w-3 h-3 mr-1" />
              {formatTime(currentQuestion.timestamp)}
            </Badge>
            <Badge variant="secondary">{currentQuestion.type.replace("-", " ")}</Badge>
          </div>
          <CardTitle>{currentQuestion.question}</CardTitle>
        </CardHeader>
        <CardContent>
          {!showResult ? (
            <div className="space-y-4">
              {currentQuestion.type === "multiple-choice" && currentQuestion.options && (
                <RadioGroup
                  value={userAnswer.toString()}
                  onValueChange={(value) => setUserAnswer(Number.parseInt(value))}
                >
                  {currentQuestion.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                        {String.fromCharCode(65 + index)}. {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {currentQuestion.type === "true-false" && (
                <RadioGroup value={userAnswer.toString()} onValueChange={setUserAnswer}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="true" id="true" />
                    <Label htmlFor="true" className="cursor-pointer">
                      True
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="false" id="false" />
                    <Label htmlFor="false" className="cursor-pointer">
                      False
                    </Label>
                  </div>
                </RadioGroup>
              )}

              {(currentQuestion.type === "short-answer" || currentQuestion.type === "cloze") && (
                <Input
                  placeholder="Type your answer..."
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAnswerSubmit()}
                />
              )}

              <Button onClick={handleAnswerSubmit} disabled={userAnswer === ""} className="w-full">
                Submit Answer
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div
                className={`p-4 rounded-lg ${
                  attempts[attempts.length - 1]?.correct
                    ? "bg-green-50 border border-green-200"
                    : "bg-red-50 border border-red-200"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {attempts[attempts.length - 1]?.correct ? (
                    <Check className="w-5 h-5 text-green-600" />
                  ) : (
                    <X className="w-5 h-5 text-red-600" />
                  )}
                  <span
                    className={`font-medium ${
                      attempts[attempts.length - 1]?.correct ? "text-green-800" : "text-red-800"
                    }`}
                  >
                    {attempts[attempts.length - 1]?.correct ? "Correct!" : "Incorrect"}
                  </span>
                </div>
                <p className={`text-sm ${attempts[attempts.length - 1]?.correct ? "text-green-700" : "text-red-700"}`}>
                  {currentQuestion.explanation}
                </p>
              </div>

              <Button onClick={handleContinue} className="w-full">
                Continue Video
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">CourseAI</span>
          </Link>
          <div className="flex items-center gap-4">
            <Badge variant="outline">
              {attempts.length} / {courseData.questions.length} questions
            </Badge>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {!showQuiz && !courseCompleted && (
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Video Player */}
            <div className="lg:col-span-3">
              <Card>
                <CardContent className="p-0">
                  <div className="aspect-video bg-black rounded-t-lg relative overflow-hidden">
                    {(() => {
                      const videoId = getYouTubeVideoId(courseData.youtubeUrl)
                      return videoId ? (
                        <div id="youtube-player" className="absolute inset-0" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-white text-center">
                            <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                            <p className="opacity-75">Video Player</p>
                            <p className="text-sm opacity-50">{courseData.title}</p>
                          </div>
                        </div>
                      )
                    })()}

                    {/* Video Controls */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <div className="flex items-center gap-4 text-white">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-white hover:bg-white/20"
                          onClick={() => {
                            if (playerRef.current) {
                              if (isPlaying) {
                                playerRef.current.pauseVideo()
                              } else {
                                playerRef.current.playVideo()
                              }
                            }
                          }}
                        >
                          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-white hover:bg-white/20"
                          onClick={() => {
                            if (playerRef.current) {
                              const currentTime = playerRef.current.getCurrentTime()
                              playerRef.current.seekTo(Math.max(0, currentTime - 10))
                            }
                          }}
                        >
                          <SkipBack className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-white hover:bg-white/20"
                          onClick={() => {
                            if (playerRef.current) {
                              const currentTime = playerRef.current.getCurrentTime()
                              playerRef.current.seekTo(currentTime + 10)
                            }
                          }}
                        >
                          <SkipForward className="w-4 h-4" />
                        </Button>
                        <div className="flex-1 bg-white/20 h-1 rounded">
                          <div
                            className="bg-blue-500 h-1 rounded transition-all"
                            style={{ width: `${(currentTime / courseData.duration) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm">
                          {formatTime(currentTime)} / {formatTime(courseData.duration)}
                        </span>
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                          <Volume2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Course Info */}
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>{courseData.title}</CardTitle>
                  <CardDescription>{courseData.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{getProgress()}%</span>
                    </div>
                    <Progress value={getProgress()} />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    Your Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{getScore()}%</div>
                    <div className="text-sm text-gray-600">Current Score</div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Questions Answered</span>
                      <span>
                        {attempts.length} / {courseData.questions.length}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Correct Answers</span>
                      <span>{attempts.filter((a) => a.correct).length}</span>
                    </div>
                  </div>

                  <Button variant="outline" size="sm" className="w-full bg-transparent" onClick={handleRestart}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Restart Course
                  </Button>
                </CardContent>
              </Card>

              {/* Question Timeline */}
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {courseData.questions.map((question) => {
                      const attempt = attempts.find((a) => a.questionId === question.id)
                      const isPassed = currentTime > question.timestamp

                      return (
                        <div
                          key={question.id}
                          className={`p-3 rounded-lg border ${
                            attempt
                              ? attempt.correct
                                ? "bg-green-50 border-green-200"
                                : "bg-red-50 border-red-200"
                              : isPassed
                                ? "bg-yellow-50 border-yellow-200"
                                : "bg-gray-50 border-gray-200"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <Badge variant="outline" className="text-xs">
                              {formatTime(question.timestamp)}
                            </Badge>
                            {attempt &&
                              (attempt.correct ? (
                                <Check className="w-4 h-4 text-green-600" />
                              ) : (
                                <X className="w-4 h-4 text-red-600" />
                              ))}
                          </div>
                          <p className="text-sm font-medium truncate">{question.question}</p>
                          <Badge variant="secondary" className="text-xs mt-1">
                            {question.type.replace("-", " ")}
                          </Badge>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Quiz Overlay */}
        {showQuiz && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">{renderQuestion()}</div>
        )}

        {/* Course Completion */}
        {courseCompleted && (
          <div className="max-w-2xl mx-auto text-center">
            <Card>
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle>Course Completed!</CardTitle>
                <CardDescription>Congratulations on finishing {courseData.title}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{getScore()}%</div>
                    <div className="text-sm text-blue-800">Final Score</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{attempts.filter((a) => a.correct).length}</div>
                    <div className="text-sm text-green-800">Correct</div>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{formatTime(courseData.duration)}</div>
                    <div className="text-sm text-purple-800">Duration</div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button onClick={handleRestart} variant="outline" className="flex-1 bg-transparent">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Retake Course
                  </Button>
                  <Link href="/" className="flex-1">
                    <Button className="w-full">Explore More Courses</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
