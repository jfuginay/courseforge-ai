# Video Delivery Strategy for CourseForge AI

## 🎯 Recommended Approach: YouTube Embedding (No Video Storage)

### Why No Video Storage?
1. **Cost**: YouTube hosting = $0, AWS/Supabase = $$$
2. **Performance**: Google's global CDN vs self-hosting
3. **Features**: Mobile apps, captions, quality switching
4. **Reliability**: 99.9% uptime vs managing your own CDN
5. **Legal**: No copyright concerns (videos stay on YouTube)

## 🏗️ Architecture

```
YouTube URL Input → Gemini Processing → Course Creation → YouTube Embedding
```

### Data Flow
1. **User inputs**: YouTube URL
2. **Gemini processes**: Video content (no download needed)
3. **Store in Supabase**: Course metadata + YouTube URL + Questions
4. **Frontend renders**: Embedded YouTube player + Quiz overlay

## 📊 Cost Comparison

### Option 1: YouTube Embedding (RECOMMENDED)
- **Storage**: $0 (videos stay on YouTube)
- **Bandwidth**: $0 (served by Google)
- **Features**: Full YouTube functionality
- **Maintenance**: Minimal

### Option 2: Supabase Storage
- **Storage**: $0.021/GB/month
- **Bandwidth**: $0.10/GB after 200GB free
- **10-min video**: ~50MB = $1.05/month storage + bandwidth costs
- **100 courses**: ~$100+/month

### Option 3: AWS S3 + CloudFront
- **Storage**: $0.023/GB/month
- **Bandwidth**: $0.085/GB
- **10-min video**: ~50MB = $1.15/month storage + bandwidth costs
- **Setup complexity**: High (CDN, encoding, security)

## 🔧 Implementation Details

### YouTube API Integration
```javascript
// Extract video ID from YouTube URL
const getYouTubeId = (url) => {
  const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

// Get video metadata
const getVideoMetadata = async (videoId) => {
  const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${YOUTUBE_API_KEY}&part=snippet,contentDetails`);
  const data = await response.json();
  return data.items[0];
};
```

### Database Schema (Supabase)
```sql
-- No video storage, just metadata
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  youtube_url TEXT NOT NULL,
  youtube_id TEXT NOT NULL,
  duration INTEGER, -- in seconds
  thumbnail_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id),
  timestamp INTEGER NOT NULL, -- when to show question
  question_text TEXT NOT NULL,
  question_type TEXT NOT NULL,
  options JSONB,
  correct_answer TEXT,
  explanation TEXT
);
```

### Video Player Component
```jsx
// React component for course consumption
const CoursePlayer = ({ course }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  // Check if we should show a quiz question
  useEffect(() => {
    const question = course.questions.find(q => 
      Math.abs(q.timestamp - currentTime) < 2
    );
    
    if (question && !showQuiz) {
      setCurrentQuestion(question);
      setShowQuiz(true);
      // Pause video
      playerRef.current?.pauseVideo();
    }
  }, [currentTime]);

  return (
    <div className="course-player">
      <YouTube
        videoId={course.youtube_id}
        opts={{
          playerVars: {
            autoplay: 0,
            controls: 1,
            modestbranding: 1,
            rel: 0
          }
        }}
        onReady={(event) => {
          playerRef.current = event.target;
        }}
        onStateChange={(event) => {
          // Track current time
          setInterval(() => {
            setCurrentTime(event.target.getCurrentTime());
          }, 1000);
        }}
      />
      
      {showQuiz && (
        <QuizOverlay 
          question={currentQuestion}
          onComplete={() => {
            setShowQuiz(false);
            playerRef.current?.playVideo();
          }}
        />
      )}
    </div>
  );
};
```

## 🚀 MVP Implementation Plan

### Week 1: YouTube Embedding
- [ ] Extract YouTube ID from URLs
- [ ] Embed YouTube player with custom controls
- [ ] Sync quiz questions with video timestamps
- [ ] Basic pause/play control for quizzes

### Week 2: Enhanced Features
- [ ] YouTube API integration for metadata
- [ ] Advanced player controls (seek, speed)
- [ ] Video progress tracking
- [ ] Mobile optimization

### Week 3: Advanced Features
- [ ] Chapters/segments based on questions
- [ ] Playlist support for multi-video courses
- [ ] Video quality selection
- [ ] Offline transcript generation

## 🎯 Benefits for CourseForge

1. **Zero Infrastructure Costs**: No video storage/CDN needed
2. **Instant Scalability**: Google handles all video delivery
3. **Better UX**: Users familiar with YouTube controls
4. **Mobile Optimized**: Works perfectly on all devices
5. **Legal Compliance**: No copyright issues with embedded videos

## 🔒 Potential Limitations

1. **YouTube Dependency**: If YouTube removes video, course breaks
2. **Limited Customization**: Can't fully customize player
3. **Ads**: YouTube may show ads (can upgrade to YouTube Premium API)
4. **Offline Support**: Limited offline capabilities

## 💡 Future Considerations

### If You Eventually Need Video Storage
- **Start with YouTube embedding** for MVP
- **Add hybrid approach** later: YouTube + optional video upload
- **Use AWS S3 + CloudFront** for enterprise customers who need branded players
- **Consider Vimeo Pro** for ad-free embedding

### Recommended Stack for Video Storage (Future)
```
Video Upload → AWS S3 → Lambda (processing) → CloudFront (CDN) → Custom Player
```

## 🎬 Demo Strategy

**MVP Demo**: 
- Input: "https://youtube.com/watch?v=..."
- Output: Embedded YouTube player with quiz overlay
- Cost: $0 for video delivery

**Future Demo**:
- Show hybrid approach: YouTube + uploaded videos
- Demonstrate branded player experience
- Cost comparison: $0 vs $X for self-hosted

---

**Recommendation**: Start with YouTube embedding for MVP, add video storage later if needed.