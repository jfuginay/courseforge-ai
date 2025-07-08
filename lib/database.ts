// Database schema and operations for courses, questions, and user progress

export interface Course {
  id: string
  title: string
  description: string
  youtubeUrl: string
  videoId: string
  duration: number
  thumbnailUrl: string
  createdAt: Date
  updatedAt: Date
  isPublic: boolean
  creatorId?: string
  metadata: {
    language: string
    topics: string[]
    difficulty: "beginner" | "intermediate" | "advanced"
  }
}

export interface Question {
  id: string
  courseId: string
  type: "multiple-choice" | "true-false" | "short-answer" | "cloze"
  timestamp: number
  question: string
  options?: string[]
  correctAnswer: string | number
  explanation: string
  difficulty: "easy" | "medium" | "hard"
  concepts: string[]
  isActive: boolean
  order: number
}

export interface UserProgress {
  id: string
  courseId: string
  userId?: string // Optional for anonymous users
  sessionId: string
  currentTimestamp: number
  completedQuestions: string[]
  attempts: QuestionAttempt[]
  score: number
  startedAt: Date
  lastAccessedAt: Date
  completedAt?: Date
}

export interface QuestionAttempt {
  questionId: string
  answer: string | number
  isCorrect: boolean
  attemptedAt: Date
  timeSpent: number // seconds
}

// Mock database operations
class DatabaseService {
  private courses: Map<string, Course> = new Map()
  private questions: Map<string, Question[]> = new Map()
  private userProgress: Map<string, UserProgress> = new Map()

  // Course operations
  async createCourse(courseData: Omit<Course, "id" | "createdAt" | "updatedAt">): Promise<Course> {
    const course: Course = {
      ...courseData,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.courses.set(course.id, course)
    return course
  }

  async getCourse(id: string): Promise<Course | null> {
    return this.courses.get(id) || null
  }

  async updateCourse(id: string, updates: Partial<Course>): Promise<Course | null> {
    const course = this.courses.get(id)
    if (!course) return null

    const updatedCourse = {
      ...course,
      ...updates,
      updatedAt: new Date(),
    }

    this.courses.set(id, updatedCourse)
    return updatedCourse
  }

  async deleteCourse(id: string): Promise<boolean> {
    const deleted = this.courses.delete(id)
    if (deleted) {
      this.questions.delete(id)
    }
    return deleted
  }

  // Question operations
  async createQuestions(courseId: string, questionsData: Omit<Question, "id" | "courseId">[]): Promise<Question[]> {
    const questions = questionsData.map((q, index) => ({
      ...q,
      id: this.generateId(),
      courseId,
      order: index,
    }))

    this.questions.set(courseId, questions)
    return questions
  }

  async getQuestions(courseId: string): Promise<Question[]> {
    return this.questions.get(courseId) || []
  }

  async updateQuestion(questionId: string, updates: Partial<Question>): Promise<Question | null> {
    for (const [courseId, questions] of this.questions.entries()) {
      const questionIndex = questions.findIndex((q) => q.id === questionId)
      if (questionIndex !== -1) {
        const updatedQuestion = { ...questions[questionIndex], ...updates }
        questions[questionIndex] = updatedQuestion
        this.questions.set(courseId, questions)
        return updatedQuestion
      }
    }
    return null
  }

  // User progress operations
  async createUserProgress(progressData: Omit<UserProgress, "id">): Promise<UserProgress> {
    const progress: UserProgress = {
      ...progressData,
      id: this.generateId(),
    }

    this.userProgress.set(progress.id, progress)
    return progress
  }

  async getUserProgress(courseId: string, sessionId: string): Promise<UserProgress | null> {
    for (const progress of this.userProgress.values()) {
      if (progress.courseId === courseId && progress.sessionId === sessionId) {
        return progress
      }
    }
    return null
  }

  async updateUserProgress(progressId: string, updates: Partial<UserProgress>): Promise<UserProgress | null> {
    const progress = this.userProgress.get(progressId)
    if (!progress) return null

    const updatedProgress = {
      ...progress,
      ...updates,
      lastAccessedAt: new Date(),
    }

    this.userProgress.set(progressId, updatedProgress)
    return updatedProgress
  }

  async addQuestionAttempt(progressId: string, attempt: QuestionAttempt): Promise<UserProgress | null> {
    const progress = this.userProgress.get(progressId)
    if (!progress) return null

    const updatedProgress = {
      ...progress,
      attempts: [...progress.attempts, attempt],
      completedQuestions: progress.completedQuestions.includes(attempt.questionId)
        ? progress.completedQuestions
        : [...progress.completedQuestions, attempt.questionId],
      lastAccessedAt: new Date(),
    }

    // Calculate new score
    const correctAttempts = updatedProgress.attempts.filter((a) => a.isCorrect).length
    const totalQuestions = await this.getQuestions(progress.courseId)
    updatedProgress.score = totalQuestions.length > 0 ? Math.round((correctAttempts / totalQuestions.length) * 100) : 0

    this.userProgress.set(progressId, updatedProgress)
    return updatedProgress
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9)
  }
}

// Export singleton instance
export const db = new DatabaseService()

// Utility functions
export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export function calculateProgress(currentTime: number, duration: number): number {
  return Math.min(Math.round((currentTime / duration) * 100), 100)
}

export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  if (hours > 0) {
    return `${hours}h ${minutes}m`
  } else if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`
  } else {
    return `${remainingSeconds}s`
  }
}
