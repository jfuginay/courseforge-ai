# CourseForge AI

**Transform any YouTube video into a complete, interactive course with AI-generated quizzes and progress tracking.**

## 🚀 Live Demo

**URL**: [Coming Soon - Deploy to Vercel]

### Current Features ✅
- ✅ **YouTube URL Input** - Enter any YouTube video URL
- ✅ **Gemini AI Integration** - Processes videos and generates course content
- ✅ **Course Structure Generation** - Auto-creates segments with timestamps
- ✅ **Interactive Quizzes** - Multiple choice questions with explanations
- ✅ **Beautiful UI** - ShadCN components with Tailwind CSS
- ✅ **Responsive Design** - Works on desktop and mobile

## 🎯 MVP Goal (1 Week)

**Input**: YouTube URL  
**Process**: AI generates course structure + quizzes  
**Output**: Public shareable course link

### Core Flow
1. Enter YouTube video URL
2. Gemini AI processes video → generates questions
3. Course creator accepts/rejects questions  
4. System creates public course page
5. Students watch video + take quizzes with progress tracking

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- Git
- Google AI API key (for Gemini)

### Installation
```bash
# Clone the repository
git clone https://github.com/jfuginay/courseforge-ai.git
cd courseforge-ai

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your Google AI API key to .env:
# GOOGLE_AI_API_KEY=your_api_key_here

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### 🤖 Claude CLI Setup (HIGHLY RECOMMENDED)

**Why use Claude CLI?**
- Get instant AI assistance while coding
- Auto-manage tasks with intelligent suggestions
- Real-time problem solving and debugging
- Smart code generation and refactoring

**Installation:**
```bash
# Install Claude CLI globally
npm install -g @anthropic-ai/claude-code

# Login to Claude
claude login

# Start interactive session in your project
cd courseforge-ai
claude
```

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with Pages Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **ShadCN UI** - Beautiful, accessible components
- **Framer Motion** - Smooth animations
- **Lucide React** - Icon library

### Backend
- **Next.js API Routes** - Backend API endpoints
- **Google Gemini AI** - Video processing and question generation
- **Vercel** - Deployment and hosting

### Development
- **Task Master** - Intelligent task management
- **Claude CLI** - AI-powered development assistance
- **GitHub Issues** - Project tracking

## 📁 Project Structure

```
courseforge-ai/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # ShadCN components
│   │   └── Header.tsx      # Navigation header
│   ├── pages/              # Next.js pages
│   │   ├── api/            # API routes
│   │   │   └── analyze-video.ts
│   │   ├── _app.tsx        # App configuration
│   │   └── index.tsx       # Home page
│   ├── lib/                # Utility libraries
│   │   ├── gemini.ts       # Gemini AI integration
│   │   └── utils.ts        # Helper functions
│   ├── hooks/              # Custom React hooks
│   └── styles/             # Global styles
├── public/                 # Static assets
├── task-master.js          # Task management system
├── tasks.json              # Task storage
└── README.md              # This file
```

## 🔧 API Endpoints

### POST /api/analyze-video
Analyzes a YouTube video and generates course content.

**Request:**
```json
{
  "youtubeUrl": "https://www.youtube.com/watch?v=..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "title": "Course Title",
    "description": "Course description",
    "duration": "30 minutes",
    "segments": [
      {
        "title": "Introduction",
        "timestamp": "00:00",
        "concepts": ["concept1", "concept2"],
        "questions": [
          {
            "type": "multiple_choice",
            "question": "What is...?",
            "options": ["A", "B", "C", "D"],
            "correct": 0,
            "explanation": "A is correct because..."
          }
        ]
      }
    ]
  }
}
```

## 📋 Task Management

### View Current Tasks
```bash
npm run task:list
```

### Add New Task
```bash
npm run task:add "Task description"
```

### Complete Task
```bash
npm run task:complete <task-id>
```

### Current Status
- ✅ **Tech Stack Setup** - NextJS + ShadCN + Gemini API
- ✅ **Course Creation UI** - YouTube URL input and course generation
- ✅ **Gemini Integration** - Video analysis and question generation
- 🔄 **Public Course Pages** - In development
- 📋 **Question Accept/Reject** - Planned
- 📋 **Progress Tracking** - Planned

## 🎬 Demo Flow

1. **Visit Home Page** - Clean interface with YouTube URL input
2. **Enter YouTube URL** - Paste any educational video URL
3. **AI Processing** - Gemini analyzes video and generates course
4. **Course Preview** - Review generated segments and questions
5. **Interactive Learning** - Take quizzes based on video content

## 🚀 Deployment

### Vercel Deployment
```bash
# Deploy to Vercel
vercel

# Set environment variables in Vercel dashboard:
# GOOGLE_AI_API_KEY=your_api_key_here
```

### Environment Variables
- `GOOGLE_AI_API_KEY` - Google AI API key for Gemini
- `NEXTAUTH_SECRET` - NextAuth secret (if using authentication)
- `NEXTAUTH_URL` - Application URL for authentication

## 🎯 Success Metrics

### MVP Week 1
- ✅ Process 10-minute video in <2 minutes
- ✅ Generate 5-8 course segments with questions
- ✅ Beautiful, responsive UI
- ✅ Working demo ready for presentation

### Growth Targets
- 100 courses created in first month
- 70% student completion rate
- 5 different quiz types supported
- Mobile-responsive course consumption

## 📞 Support & Communication

- **GitHub Issues**: [CourseForge AI Issues](https://github.com/jfuginay/courseforge-ai/issues)
- **Task Management**: `npm run task:list`
- **Claude CLI**: `claude` for AI assistance
- **Documentation**: This README + inline code comments

### 🤖 Claude CLI Support Commands
```bash
# Get help with CourseForge-specific issues
claude "help me implement YouTube video embedding"
claude "debug this Gemini API error"
claude "optimize this React component"
claude "create unit tests for this function"
claude "refactor this code to be more maintainable"
```

## 🏆 Competitive Advantages

1. **AI-First Course Creation**: Gemini processes everything
2. **Instant Course Generation**: YouTube URL → Course in <2 minutes
3. **Beautiful UI**: ShadCN components with smooth animations
4. **Developer-Friendly**: Claude CLI integration for team productivity
5. **Open Source Ready**: Clean architecture for community contributions

## 📈 Roadmap

### Week 1 (Current)
- [x] NextJS + ShadCN setup
- [x] Gemini AI integration
- [x] Course generation from YouTube URLs
- [x] Interactive quiz components
- [ ] Public course consumption pages

### Week 2 (Next)
- [ ] Course creator accept/reject flow
- [ ] Student progress tracking
- [ ] Multiple quiz types
- [ ] Mobile optimization

### Week 3 (Future)
- [ ] User authentication
- [ ] Course management dashboard
- [ ] Advanced analytics
- [ ] Social sharing features

---

**Let's build the future of online education! 🚀**

*Built with Next.js, Gemini AI, and Claude CLI*