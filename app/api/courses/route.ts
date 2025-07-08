import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"
import { geminiProcessor } from "@/lib/gemini"

export async function POST(request: NextRequest) {
  try {
    const { youtubeUrl } = await request.json()

    if (!youtubeUrl) {
      return NextResponse.json({ error: "YouTube URL is required" }, { status: 400 })
    }

    // Process video with Gemini
    const analysis = await geminiProcessor.processYouTubeVideo(youtubeUrl)

    // Create course in database
    const course = await db.createCourse({
      title: analysis.metadata.title,
      description: analysis.metadata.description,
      youtubeUrl,
      videoId: extractVideoId(youtubeUrl) || "",
      duration: analysis.metadata.duration,
      thumbnailUrl: analysis.metadata.thumbnailUrl,
      isPublic: true,
      metadata: {
        language: analysis.metadata.language,
        topics: analysis.metadata.topics,
        difficulty: "beginner",
      },
    })

    // Create questions
    const questions = await db.createQuestions(
      course.id,
      analysis.questions.map((q) => ({
        type: q.type,
        timestamp: q.timestamp,
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        difficulty: q.difficulty,
        concepts: q.concepts,
        isActive: true,
        order: 0,
      })),
    )

    return NextResponse.json({
      course,
      questions,
      segments: analysis.segments,
    })
  } catch (error) {
    console.error("Error creating course:", error)
    return NextResponse.json({ error: "Failed to create course" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const courseId = searchParams.get("id")

    if (courseId) {
      const course = await db.getCourse(courseId)
      if (!course) {
        return NextResponse.json({ error: "Course not found" }, { status: 404 })
      }

      const questions = await db.getQuestions(courseId)
      return NextResponse.json({ course, questions })
    }

    // Return all public courses (in a real app, this would be paginated)
    return NextResponse.json({ courses: [] })
  } catch (error) {
    console.error("Error fetching courses:", error)
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 })
  }
}

function extractVideoId(url: string): string | null {
  const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/
  const match = url.match(regex)
  return match ? match[1] : null
}
