import { type NextRequest, NextResponse } from "next/server"
import { db, generateSessionId } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const { courseId, sessionId, currentTimestamp, questionAttempt } = await request.json()

    if (!courseId) {
      return NextResponse.json({ error: "Course ID is required" }, { status: 400 })
    }

    const actualSessionId = sessionId || generateSessionId()

    // Get or create user progress
    let progress = await db.getUserProgress(courseId, actualSessionId)

    if (!progress) {
      progress = await db.createUserProgress({
        courseId,
        sessionId: actualSessionId,
        currentTimestamp: currentTimestamp || 0,
        completedQuestions: [],
        attempts: [],
        score: 0,
        startedAt: new Date(),
        lastAccessedAt: new Date(),
      })
    }

    // Update progress
    const updates: any = {
      currentTimestamp: currentTimestamp || progress.currentTimestamp,
      lastAccessedAt: new Date(),
    }

    // Add question attempt if provided
    if (questionAttempt) {
      progress = await db.addQuestionAttempt(progress.id, {
        questionId: questionAttempt.questionId,
        answer: questionAttempt.answer,
        isCorrect: questionAttempt.isCorrect,
        attemptedAt: new Date(),
        timeSpent: questionAttempt.timeSpent || 0,
      })
    } else {
      progress = await db.updateUserProgress(progress.id, updates)
    }

    return NextResponse.json({ progress })
  } catch (error) {
    console.error("Error updating progress:", error)
    return NextResponse.json({ error: "Failed to update progress" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const courseId = searchParams.get("courseId")
    const sessionId = searchParams.get("sessionId")

    if (!courseId || !sessionId) {
      return NextResponse.json({ error: "Course ID and session ID are required" }, { status: 400 })
    }

    const progress = await db.getUserProgress(courseId, sessionId)

    if (!progress) {
      return NextResponse.json({ error: "Progress not found" }, { status: 404 })
    }

    return NextResponse.json({ progress })
  } catch (error) {
    console.error("Error fetching progress:", error)
    return NextResponse.json({ error: "Failed to fetch progress" }, { status: 500 })
  }
}
