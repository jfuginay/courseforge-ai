# CourseForge AI - Team Task Assignments

## 🚀 MVP in 1 Week - Who Does What

### 👤 Team Member 1: AI/Backend Engineer
**Your Critical Tasks:**
```bash
# Task 1: Gemini API Integration (Due: Day 2)
npm run task:complete 1751989437462

# Task 2: YouTube Processing Pipeline (Due: Day 3)
npm run task:complete 1751989251267

# Task 3: Quiz Generation System (Due: Day 5)
npm run task:complete 1751989262557
```

**Deliverables:**
- Gemini API wrapper that accepts YouTube URLs
- Returns: transcript, timestamps, generated questions
- Support for videos >20MB via File API

---

### 👤 Team Member 2: Frontend Engineer (Creation)
**Your Critical Tasks:**
```bash
# Task 1: NextJS + ShadCN Setup (Due: Day 1)
npm run task:complete 1751989490428

# Task 2: Course Creation Screen (Due: Day 4)
npm run task:complete 1751989445375

# Task 3: Quiz Types UI (Due: Day 6)
npm run task:complete 1751989472147
```

**Deliverables:**
- Course creation wizard with video preview
- Accept/reject question interface
- Support for multiple quiz types

---

### 👤 Team Member 3: Frontend Engineer (Consumption)
**Your Critical Tasks:**
```bash
# Task 1: Public Course Page (Due: Day 4)
npm run task:complete 1751989456597

# Task 2: Student Learning Interface (Due: Day 5)
npm run task:complete 1751989276272

# Task 3: Video Player Integration (Due: Day 6)
# Create new task for this
```

**Deliverables:**
- Public shareable course links
- Video player with quiz integration
- Progress tracking UI

---

### 👤 Team Member 4: Product Manager + Infrastructure
**Your Critical Tasks:**
```bash
# Task 1: Database Implementation (Due: Day 2)
# Use the completed schema design

# Task 2: Deployment Pipeline (Due: Day 6)
# Set up Vercel/Netlify

# Task 3: Integration Testing (Due: Day 7)
# Coordinate team for demo
```

**Deliverables:**
- Supabase database setup
- API endpoints
- Production deployment
- Demo coordination

---

## 📅 Daily Sync Schedule

### Day 1 (Monday)
- **9 AM**: Kickoff, confirm task ownership
- **Goal**: Dev environment setup, Gemini API test

### Day 2 (Tuesday)
- **9 AM**: API integration status
- **Goal**: Process first YouTube video

### Day 3 (Wednesday)
- **9 AM**: UI progress check
- **Goal**: Course creation flow working

### Day 4 (Thursday)
- **9 AM**: Integration points
- **Goal**: End-to-end flow (video → course → public link)

### Day 5 (Friday)
- **9 AM**: Bug fixes and polish
- **Goal**: Demo recording with real YouTube video

### Day 6 (Saturday)
- **Goal**: Launch MVP to beta testers

---

## 🎯 Definition of Done

**MVP is complete when:**
1. ✅ Can input YouTube URL
2. ✅ Generates quiz questions via Gemini
3. ✅ Creator can accept/reject questions
4. ✅ Generates public shareable link
5. ✅ Students can watch video + take quiz
6. ✅ Progress is tracked

## 🚨 Critical Path

```
Gemini API → YouTube Processing → Question Generation
     ↓              ↓                    ↓
Database ← Course Creation UI ← Accept/Reject Flow
     ↓              ↓                    ↓
API Layer → Public Course Page → Student Experience
```

**Bottleneck**: Gemini API integration - all UI work depends on this!

## 💬 Communication

- **Blockers**: Post immediately in team chat
- **Progress**: Update task status daily
- **Questions**: Tag @ProductManager
- **Demo Content**: Use "3Blue1Brown - Dot Products" video

---

**Remember**: We're building the "Cursor for Course Creators" 🚀