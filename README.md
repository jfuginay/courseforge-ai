# CourseForge AI

**Transform any YouTube video into a complete, interactive course with AI-generated quizzes and progress tracking.**

## 🚀 Quick Start for Team

```bash
# Clone the repository
git clone https://github.com/jfuginay/courseforge-ai.git
cd courseforge-ai

# Install task management
npm install

# View project tasks
npm run task:list

# See your assignments
cat COURSEFORGE_TEAM_ASSIGNMENTS.md
```

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

## 📋 Project Documents

### 📊 Planning & Strategy
- **[Project Plan](./COURSEFORGE_PROJECT_PLAN.md)** - Complete project overview, architecture, and roadmap
- **[Updated Plan with Progress](./COURSEFORGE_UPDATED_PLAN.md)** - Integration of team research and MVP definition
- **[Team Assignments](./COURSEFORGE_TEAM_ASSIGNMENTS.md)** - Who does what, daily goals, critical path

### 🔧 Task Management
- **View tasks**: `npm run task:list`
- **Complete task**: `npm run task:complete <id>`
- **Add new task**: `npm run task:add "Task description"`

## 👥 Team Roles & Critical Tasks

### 🤖 AI/Backend Engineer
**Critical Path Tasks:**
- Gemini API integration for video processing
- YouTube transcript extraction pipeline  
- Automated quiz generation system

### 🎨 Frontend Engineer (Course Creation)
**Critical Path Tasks:**
- NextJS + ShadCN + React setup
- Course creation screen with accept/reject UI
- Multiple quiz type interfaces

### 📱 Frontend Engineer (Student Experience)  
**Critical Path Tasks:**
- Public course consumption page
- Video player with quiz integration
- Student progress tracking UI

### 🗄️ Product Manager + Infrastructure
**Critical Path Tasks:**
- Database implementation (Supabase)
- API endpoints and authentication
- Deployment pipeline and demo coordination

## 🛠️ Tech Stack

### Core Technologies
- **Frontend**: React + NextJS + ShadCN UI
- **Backend**: Supabase (PostgreSQL + Auth)
- **AI Processing**: Google Gemini API
- **Video Processing**: Gemini video analysis
- **Deployment**: Vercel/Netlify

### Why These Choices
- **Gemini**: Can process videos directly, extract timestamps, generate questions
- **NextJS**: Fast setup for web-based course creation with shareable pages
- **Supabase**: Rapid backend development with real-time features
- **ShadCN**: Beautiful, accessible UI components

## 🎯 Success Metrics

### MVP Week 1
- ✅ Process 10-minute video in <2 minutes
- ✅ 80% of auto-generated questions accepted by creators
- ✅ End-to-end flow: YouTube URL → Public course link
- ✅ Demo with real YouTube video

### Growth Targets
- 100 courses created in first month
- 70% student completion rate
- 5 different quiz types supported
- Mobile-responsive course consumption

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Git
- Google Cloud account (for Gemini API)
- Supabase account
- **Claude CLI** (for AI-powered development)

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

# Or using curl (macOS/Linux)
curl -fsSL https://claude.ai/install.sh | sh

# Verify installation
claude --version
```

**Getting Started with Claude CLI:**
```bash
# Login to Claude
claude login

# Start interactive session in your project
cd courseforge-ai
claude

# Or run specific commands
claude "help me implement the Gemini API integration"
claude "review my React component for bugs"
claude "optimize this database query"
```

**Pro Tips for Team:**
- **Use `claude` in your project directory** for context-aware assistance
- **Ask for code reviews**: "claude review my-component.tsx"
- **Get implementation help**: "claude implement user authentication"
- **Debug issues**: "claude debug this error: [paste error]"
- **Task management**: "claude add task: implement video player"

### Development Setup
```bash
# 1. Clone and install
git clone https://github.com/jfuginay/courseforge-ai.git
cd courseforge-ai
npm install

# 2. Set up Claude CLI (recommended)
claude login
claude  # Start interactive session

# 3. Environment setup
cp .env.example .env
# Add your API keys:
# GEMINI_API_KEY=your_key_here
# SUPABASE_URL=your_url_here
# SUPABASE_ANON_KEY=your_key_here

# 4. Check your tasks
npm run task:list

# 5. Start development (with Claude assistance)
npm run dev
```

### 🎯 Claude CLI Workflow for CourseForge

**Daily Development Pattern:**
```bash
# Morning: Check tasks with AI assistance
claude "show me my high priority tasks for today"

# During development: Get instant help
claude "help me implement video processing with Gemini API"

# Code review: Get feedback
claude "review this quiz generation function"

# Debugging: Solve issues quickly
claude "this API call is failing, help me debug"

# End of day: Update progress
claude "mark my completed tasks and plan tomorrow's work"
```

**Team Collaboration:**
- **Share Claude conversations** in team chat for complex solutions
- **Use Claude for pair programming** during video calls
- **Get consistent code style** by asking Claude to format code
- **Documentation generation**: "claude create documentation for this API"

### Daily Workflow (with Claude CLI)
1. **Morning Standup**: `claude "show me today's priorities and blockers"`
2. **Development**: `claude` for real-time assistance while coding
3. **Code Review**: `claude "review my changes before pushing"`
4. **Update Tasks**: `npm run task:complete <id>` + `claude "plan tomorrow's work"`
5. **End of Day**: Push code, share Claude conversations with team

## 📅 Week 1 Sprint Schedule

### Day 1 (Monday): Foundation
- Dev environment setup
- Gemini API integration test
- NextJS project initialization

### Day 2 (Tuesday): Core Processing  
- YouTube video processing working
- Database schema implemented
- First question generation

### Day 3 (Wednesday): Creation UI
- Course creation screen functional
- Accept/reject questions interface
- API endpoints connected

### Day 4 (Thursday): Consumption UI
- Public course page working
- Video player + quiz integration
- End-to-end flow testing

### Day 5 (Friday): Polish & Demo
- Bug fixes and UX improvements
- Demo video recording
- MVP launch preparation

## 🎬 Demo Content

**Primary**: "3Blue1Brown - Dot Products and Duality" (math, visual, clear concepts)  
**Secondary**: "Prompt Engineering Basics" (tech, practical)  
**Fallback**: "Excel VLOOKUP Tutorial" (business, step-by-step)

## 🏆 Competitive Advantages

1. **AI-First Course Creation**: Gemini processes everything
2. **Creator Collaboration**: Accept/reject AI suggestions
3. **Rapid Deployment**: YouTube URL → Course in minutes
4. **Multiple Learning Paths**: Non-linear knowledge graphs
5. **Real-time Progress**: Live student analytics

## 📞 Support & Communication

- **Daily Standups**: 9 AM (15 minutes) - Use Claude to prep talking points
- **Blockers**: Immediate team notification + `claude "help me solve this blocker"`
- **Task Updates**: Use Task Master system (`npm run task:complete <id>`)
- **Code Help**: `claude` for instant AI assistance
- **Documentation**: Update this README with discoveries (`claude "document this feature"`)

### 🤖 Claude CLI Support Commands
```bash
# Get help with CourseForge-specific issues
claude "help me implement Gemini video processing"
claude "debug this React component error"
claude "optimize this Supabase query"
claude "create unit tests for this function"
claude "refactor this code to be more maintainable"
```

---

**Let's build the future of online education! 🚀**

*Generated with CourseForge AI Task Management System*