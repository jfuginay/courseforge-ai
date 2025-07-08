# CourseForge AI - Updated Project Plan with Progress

## 🎯 MVP Definition (From Your Notes)

**Core Flow**: YouTube URL → Course Creation Screen → Accept/Reject Questions → Public Course Link

### MVP Features
1. Enter a video URL
2. Get Gemini results for the video
3. Creators accept/reject questions
4. Play/pause video on demand based on quiz results
5. Output: Public link for video + questions consumption

## ✅ Completed Research & Planning

### 1. Technical Stack (DECIDED)
- **Frontend**: React, ShadCN, NextJS
- **Video Processing**: Gemini API (can process videos, extract timestamps, generate questions)
- **Deployment**: Web-based with shareable URLs
- **Future**: iPad app for consumption

### 2. Core Features (DEFINED)
- **Video Processing**: Gemini handles transcripts, timestamps, visual analysis
- **Quiz Types**: 11 types identified (MCQ, Cloze, True/False, Short Answer, etc.)
- **Course Creator Tools**: 
  - Accept/reject questions
  - Screenshot-to-question tool
  - Video segmentation
  - Concept extraction panel

### 3. User Flows (MAPPED)
- **Self-learners**: Topic → AI generates video sequence → Dynamic adjustment
- **Parents/Teachers**: Topic + child info → Lesson plan → Progress tracking

## 📋 Updated Task Assignments

### 🔴 CRITICAL MVP Tasks (Week 1)

#### Backend/AI Engineer
- [x] Research video processing options (Gemini chosen)
- [ ] **Implement Gemini API integration** (#1751989437462) 
  - Video upload/YouTube URL processing
  - Transcript extraction
  - Question generation
- [ ] **Build YouTube video processing pipeline** (#1751989251267)
  - Handle >20MB files via File API
  - Extract timestamps and segments

#### Frontend Engineer (Course Creation)
- [ ] **Set up NextJS + ShadCN + React** (#1751989490428)
- [ ] **Build course creation screen** (#1751989445375)
  - Video preview player
  - Question accept/reject interface
  - Real-time Gemini results display
- [ ] **Create public course page** (#1751989456597)
  - Video player with timestamp controls
  - Quiz integration
  - Progress tracking

#### Full Stack Engineer
- [x] Define database schema
- [ ] **Implement course data model**
  - Courses, questions, attempts, progress
  - Public link generation
  - User authentication (creators vs learners)

### 🟡 HIGH Priority Tasks (Week 2)

#### AI/Backend Features
- [ ] **Multiple quiz type generation** (#1751989472147)
  - MCQ, Cloze deletion, True/False
  - Short answer with LLM evaluation
- [ ] **Video auto-segmentation** (#1751989463971)
  - Topic shifts, speaker changes, slides
- [ ] **AI course structure generation** (#1751989257291)

#### Frontend Features
- [ ] **Screenshot-to-question tool** (#1751989482797)
- [ ] **Instructor dashboard** (#1751989269089)
- [ ] **Student learning interface** (#1751989276272)

### 🟢 MEDIUM Priority Tasks (Week 3-4)

- [ ] **Reference checking system** (#1751989285026)
- [ ] **Parent dashboard** (#1751989497669)
- [ ] Concept extraction and visualization
- [ ] Advanced quiz types (Socratic, simulation-based)
- [ ] Learning pathways engine (graph view)

## 🚀 Implementation Strategy

### Week 1 Sprint Goals
1. **Day 1-2**: NextJS setup + Gemini API integration
2. **Day 3-4**: Basic course creation flow (video → questions)
3. **Day 5-6**: Public course consumption page
4. **Day 7**: Testing & demo preparation

### Technical Implementation

#### Gemini Integration (Priority 1)
```javascript
// Option 1: YouTube URL directly
const response = await gemini.generateContent({
  contents: [{
    parts: [{
      text: "Generate quiz questions from this video: https://youtube.com/..."
    }]
  }]
});

// Option 2: Upload video file
const file = await fileManager.uploadFile(videoPath, {
  mimeType: "video/mp4",
});
const response = await gemini.generateContent({
  contents: [{
    parts: [
      { fileData: { fileUri: file.uri } },
      { text: "Extract key concepts and generate questions" }
    ]
  }]
});
```

#### Database Schema (Simplified for MVP)
```sql
-- Core tables only
courses (id, title, youtube_url, creator_id, public_id)
questions (id, course_id, type, content, answers, timestamp)
course_attempts (id, course_id, user_id, progress, score)
quiz_responses (id, attempt_id, question_id, response, is_correct)
```

### Risk Mitigation

#### Technical Risks (From Your Notes)
- ✅ **Gemini can handle video processing** (validated)
- ⚠️ **Limited to MCQ generation initially** (plan for enhancement)
- ✅ **YouTube URL support confirmed**
- ⚠️ **Need to handle >20MB videos** (use File API)

## 🎯 Success Metrics (MVP)

1. **Technical**: Process 10-min video in <2 minutes
2. **Quality**: 80% of auto-generated questions accepted by creators
3. **Engagement**: 70% course completion rate
4. **Scale**: Handle 100 courses in first week

## 📅 Daily Standups Focus

### Monday: Infrastructure
- Gemini API connected?
- NextJS running?
- Database schema deployed?

### Tuesday: Core Flow
- Can we process a YouTube URL?
- Do we get questions back?
- Can creators see/edit them?

### Wednesday: Creation UI
- Is the accept/reject flow smooth?
- Can we save courses?
- Do public links work?

### Thursday: Consumption UI
- Can learners take quizzes?
- Does video pause/play work?
- Is progress tracked?

### Friday: Polish & Demo
- Fix critical bugs
- Prepare demo video
- Test with real YouTube content

## 🔥 Competitive Advantages (Your SpikyPOVs)

1. **Messiness as Value**: Embrace YouTube's chaos
2. **Non-linear Learning**: Knowledge graphs, not lists
3. **Crowd Curation**: Let YouTube's algorithm pick teachers
4. **Productive Confusion**: Keep creator disagreements
5. **Format Diversity**: Mixed quality forces attention

## 🎬 Demo Topics (From Your List)

**Week 1 Demo**: "Intro to Prompt Engineering" (dense, testable)
**Week 2 Demo**: "Excel VLOOKUP" (practical, visual)
**Week 3 Demo**: "Spanish Past Tense" (multimedia, varied)

---

**Next Action**: Each team member should:
1. Pick their Week 1 critical tasks
2. Set up development environment
3. Share Gemini API test results by EOD
4. Daily sync at 9 AM