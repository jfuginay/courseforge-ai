import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Users, BookOpen, Zap } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">CourseAI</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/courses" className="text-gray-600 hover:text-gray-900">
              Browse Courses
            </Link>
            <Link href="/create" className="text-gray-600 hover:text-gray-900">
              Create Course
            </Link>
            <Button variant="outline">Sign In</Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Transform Any YouTube Video Into an
            <span className="text-blue-600"> Interactive Course</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Powered by AI, our platform automatically generates quizzes, timestamps, and learning materials from any
            YouTube video in seconds.
          </p>

          {/* Quick Start */}
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto mb-12">
            <h3 className="text-lg font-semibold mb-4">Try it now - Paste any YouTube URL</h3>
            <div className="flex gap-3">
              <Input placeholder="https://youtube.com/watch?v=..." className="flex-1" />
              <Link href="/create">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Zap className="w-4 h-4 mr-2" />
                  Generate Course
                </Button>
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card>
              <CardHeader>
                <Play className="w-12 h-12 text-blue-600 mb-4" />
                <CardTitle>AI Video Analysis</CardTitle>
                <CardDescription>
                  Advanced AI processes video content, extracts key concepts, and generates relevant questions
                  automatically
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <BookOpen className="w-12 h-12 text-green-600 mb-4" />
                <CardTitle>Interactive Learning</CardTitle>
                <CardDescription>
                  Students engage with timestamped quizzes, pause-and-learn moments, and concept reinforcement
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Users className="w-12 h-12 text-purple-600 mb-4" />
                <CardTitle>Easy Sharing</CardTitle>
                <CardDescription>
                  Create public courses instantly. Share with students, colleagues, or the world with a simple link
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Sample Courses */}
          <div className="text-left">
            <h2 className="text-3xl font-bold text-center mb-8">Sample Courses</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                    <Play className="w-12 h-12 text-gray-400" />
                  </div>
                  <CardTitle className="text-lg">Introduction to React Hooks</CardTitle>
                  <CardDescription>
                    Learn useState, useEffect, and custom hooks with interactive examples
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">15 questions • 45 min</span>
                    <Button variant="outline" size="sm">
                      Try Course
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                    <Play className="w-12 h-12 text-gray-400" />
                  </div>
                  <CardTitle className="text-lg">Python Data Science Basics</CardTitle>
                  <CardDescription>Master pandas, numpy, and matplotlib through hands-on exercises</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">22 questions • 1h 20min</span>
                    <Button variant="outline" size="sm">
                      Try Course
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                    <Play className="w-12 h-12 text-gray-400" />
                  </div>
                  <CardTitle className="text-lg">Machine Learning Fundamentals</CardTitle>
                  <CardDescription>Understand algorithms, training, and model evaluation concepts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">18 questions • 55 min</span>
                    <Button variant="outline" size="sm">
                      Try Course
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="h-6 w-6" />
                <span className="text-xl font-bold">CourseAI</span>
              </div>
              <p className="text-gray-400">
                Transform any video into an interactive learning experience with AI-powered course generation.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/create">Create Course</Link>
                </li>
                <li>
                  <Link href="/courses">Browse Courses</Link>
                </li>
                <li>
                  <Link href="/pricing">Pricing</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help">Help Center</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
                <li>
                  <Link href="/api">API Docs</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <Link href="/blog">Blog</Link>
                </li>
                <li>
                  <Link href="/careers">Careers</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CourseAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
