# **User Flow Document**

## **Project: YouTube-to-Course Generation System**

**Version:** 1.0  
**Date:** July 8, 2025  
**Author:** Systems Analysis Team

### **1. Introduction**

This document maps every possible user journey through the YouTube-to-Course Generation System. It serves as the definitive guide for understanding user interactions, system responses, and state transitions. This document bridges the gap between functional requirements and actual implementation by defining the exact sequence of interactions for both course creators and learners accessing the web-based platform.

### **2. Flow Identification Process**

All user flows have been extracted from the Functional Requirements Document (FRD) and organized by user type and primary objectives. Each flow follows the naming convention UF-XXX (User Flow - Sequential Number) with action-based descriptions.

### **3. Primary User Flows**

#### **3.1. Course Creator Flows**

| Flow ID | Flow Name | Related Requirements | Entry Points | Success Criteria | Exit Points |
|---------|-----------|---------------------|--------------|------------------|-------------|
| UF-001 | Video URL Input and Processing | FR-001 to FR-005 | Landing page, Course creation screen | Valid video processed by AI | Course creation screen, Error state |
| UF-002 | Course Creation Screen Initial View | FR-013, FR-015, FR-016 | Post-AI processing, Version loading | Creator views generated content | Any editing action flow |
| UF-003 | Quiz Question Accept/Reject | FR-014, FR-015 | Course creation screen | Question status updated | Continue editing, Save version |
| UF-004 | Quiz Question Text Editing | FR-020 | Course creation screen | Question text modified | Continue editing, Save version |
| UF-005 | Video Segment Interaction | FR-017, FR-019 | Course creation screen | Segment reviewed or modified | Continue editing, Save version |
| UF-006 | Screenshot-Based Question Generation | FR-018 | Course creation screen | Screenshot question created | Continue editing, Save version |
| UF-007 | Video Annotation Addition | FR-021 | Course creation screen | Annotation added to timestamp | Continue editing, Save version |
| UF-008 | Course Version Management | FR-022 to FR-027 | Course creation screen | Course version saved with public URL | Public URL generated, Version list updated |
| UF-009 | Manual Content Creation | FR-018, FR-020, FR-047 | AI processing failure, Creator choice | Custom content added to course | Continue editing, Save version |
| UF-010 | Previous Course Version Loading | FR-026, Creator clarification | Course creation screen | Previous version loaded for editing | UF-002 |
| UF-011 | Confidence Score Filtering | FR-015, FR-016 | Course creation screen | Content filtered by confidence level | Continue with filtered view |

#### **3.2. Course Consumer Flows**

| Flow ID | Flow Name | Related Requirements | Entry Points | Success Criteria | Exit Points |
|---------|-----------|---------------------|--------------|------------------|-------------|
| UF-012 | Course Consumption - Video and Quiz | FR-028 to FR-033 | Public course URL | Learner completes course with quiz interactions | Course completed, Session ended |
| UF-013 | AI-Powered Learning Assistant | FR-034 to FR-039 | During course consumption | Learner receives AI assistance | Return to video, Continue learning |

---

## **4. Detailed Flow Specifications**

### **UF-001: Video URL Input and Processing**

**Entry Points:** User navigates to landing page or course creation screen

| Step | User Action | UI Element | System Response | Next Step | Error Path |
|------|-------------|------------|-----------------|-----------|------------|
| 1 | Navigates to system | Browser address bar | Displays landing page with URL input field | Step 2 | - |
| 2 | Clicks URL input field | Text input (Atom: Input) | Focuses input, shows placeholder text | Step 3 | - |
| 3 | Types YouTube URL | Text input | Real-time URL format validation | Step 4 | UF-001E1: Invalid format |
| 4 | Clicks "Process Video" | Button (Atom: ButtonPrimary) | Validates URL format | Step 5 | UF-001E1: Invalid format |
| 5 | Waits for processing | Loading indicator (Atom: Spinner) | Extracts video ID, calls Gemini API | Step 6 | UF-001E2: API timeout, UF-001E3: Video unavailable |
| 6 | Views processing complete | Course creation screen | Displays AI-generated content | UF-002 | - |

**Error Paths:**
- **UF-001E1:** Display error message "Please enter a valid YouTube URL", return to Step 3
- **UF-001E2:** Display "Video processing failed" with manual creation option, go to UF-004
- **UF-001E3:** Display "Video unavailable or private", return to Step 3

### **UF-002: Course Creation Screen Initial View**

**Entry Points:** Successful video processing (UF-001 Step 6), Loading previous version (UF-010)

| Step | User Action | UI Element | System Response | Next Step | Error Path |
|------|-------------|------------|-----------------|-----------|------------|
| 1 | Views course creation screen | Course creation interface (Template: CourseCreationLayout) | Displays video player, AI-generated questions, segments, confidence scores | Any UF-003 to UF-011 flow | - |

*Note: This is the entry point for all course editing actions. From here, creators can perform any editing action in any order.*

### **UF-003: Quiz Question Accept/Reject**

**Entry Points:** Course creation screen (UF-002), During any editing flow

| Step | User Action | UI Element | System Response | Next Step | Error Path |
|------|-------------|------------|-----------------|-----------|------------|
| 1 | Clicks on quiz question | Question card (Molecule: QuestionCard) | Highlights question, shows Accept/Reject buttons and confidence score | Step 2 | - |
| 2 | Clicks "Accept" or "Reject" | Button (Atom: ButtonSecondary) | Updates question status, adjusts course content count | Return to UF-002 or continue editing | - |

### **UF-004: Quiz Question Text Editing**

**Entry Points:** Course creation screen (UF-002), After accepting question (UF-003)

| Step | User Action | UI Element | System Response | Next Step | Error Path |
|------|-------------|------------|-----------------|-----------|------------|
| 1 | Clicks "Edit Question" on any question | Button (Atom: ButtonTertiary) | Opens text editor modal for question modification | Step 2 | - |
| 2 | Modifies question text | Text editor (Molecule: TextEditor) | Real-time text validation and character count | Step 3 | UF-004E1: Text validation error |
| 3 | Modifies answer options (if applicable) | Answer option inputs (Atom: Input) | Updates answer choices, validates format | Step 4 | UF-004E2: Invalid answer format |
| 4 | Clicks "Save Changes" | Button (Atom: ButtonPrimary) | Updates question in course data, closes modal | Return to UF-002 or continue editing | UF-004E3: Save fails |

**Error Paths:**
- **UF-004E1:** Display character limit warning, return to Step 2
- **UF-004E2:** Display "Please provide valid answer options", return to Step 3
- **UF-004E3:** Display "Failed to save changes", return to Step 4

### **UF-005: Video Segment Interaction**

**Entry Points:** Course creation screen (UF-002), During any editing flow

| Step | User Action | UI Element | System Response | Next Step | Error Path |
|------|-------------|------------|-----------------|-----------|------------|
| 1 | Clicks video segment on timeline | Video timeline segment (Molecule: VideoSegment) | Highlights segment, shows associated questions and options | Step 2 | - |
| 2 | Views segment details | Segment details panel (Organism: SegmentPanel) | Displays questions for this segment, confidence scores | Step 3 | - |
| 3 | Clicks "Mark as Key Concept" | Toggle button (Atom: Toggle) | Updates segment importance, adds visual indicator | Return to UF-002 or continue editing | - |
| 4 | Clicks "Generate More Questions" | Button (Atom: ButtonSecondary) | Sends segment to AI for additional question generation | Step 5 | UF-005E1: AI generation fails |
| 5 | Reviews new generated questions | Question preview list (Molecule: QuestionPreview) | Shows new questions with confidence scores | Return to UF-002 or UF-003 | - |

**Error Paths:**
- **UF-005E1:** Display "Could not generate additional questions", continue with existing content

### **UF-006: Screenshot-Based Question Generation**

**Entry Points:** Course creation screen (UF-002), During video segment interaction (UF-005)

| Step | User Action | UI Element | System Response | Next Step | Error Path |
|------|-------------|------------|-----------------|-----------|------------|
| 1 | Clicks specific video frame | Video player frame | Pauses video at clicked timestamp | Step 2 | - |
| 2 | Clicks "Generate Question from Frame" | Button (Atom: ButtonSecondary) | Captures screenshot, extracts visual context | Step 3 | UF-006E1: Screenshot capture fails |
| 3 | Waits for AI processing | Loading indicator (Atom: Spinner) | AI analyzes screenshot and generates contextual question | Step 4 | UF-006E2: AI processing fails |
| 4 | Reviews generated screenshot question | Question preview (Molecule: QuestionPreview) | Shows AI-generated question with screenshot reference and confidence score | Step 5 | - |
| 5 | Clicks "Accept" or "Edit" | Action buttons | Either adds question to course or opens editor | Return to UF-002, UF-004, or continue editing | - |

**Error Paths:**
- **UF-006E1:** Display "Could not capture screenshot", return to Step 1
- **UF-006E2:** Display "Could not generate question from image", return to Step 2

### **UF-007: Video Annotation Addition**

**Entry Points:** Course creation screen (UF-002), During video segment interaction (UF-005)

| Step | User Action | UI Element | System Response | Next Step | Error Path |
|------|-------------|------------|-----------------|-----------|------------|
| 1 | Right-clicks or long-presses video at desired timestamp | Video player | Shows context menu with "Add Annotation" option | Step 2 | - |
| 2 | Clicks "Add Annotation" | Context menu item | Opens annotation creation modal with current timestamp | Step 3 | - |
| 3 | Types annotation text | Text area (Atom: Textarea) | Real-time character count and validation | Step 4 | UF-007E1: Text validation error |
| 4 | Selects annotation type | Dropdown (Atom: Select) | Shows annotation type options (Note, Warning, Key Point) | Step 5 | - |
| 5 | Clicks "Save Annotation" | Button (Atom: ButtonPrimary) | Adds annotation to video timeline, closes modal | Return to UF-002 or continue editing | UF-007E2: Save fails |

**Error Paths:**
- **UF-007E1:** Display character limit warning, return to Step 3
- **UF-007E2:** Display "Failed to save annotation", return to Step 5

### **UF-008: Course Version Management**

**Entry Points:** Course creation screen (UF-002), After any editing flow

| Step | User Action | UI Element | System Response | Next Step | Error Path |
|------|-------------|------------|-----------------|-----------|------------|
| 1 | Clicks "Save Version" | Button (Atom: ButtonPrimary) | Validates course has minimum content | Step 2 | UF-008E1: Insufficient content |
| 2 | Enters version notes (optional) | Text input (Atom: Textarea) | Accepts version description | Step 3 | - |
| 3 | Confirms save | Button (Atom: ButtonPrimary) | Generates SHA-256 hash, increments version number | Step 4 | UF-008E2: Save operation fails |
| 4 | Views save confirmation | Success message (Molecule: AlertSuccess) | Displays version number and public URL | Step 5 | - |
| 5 | Copies public URL | Button (Atom: ButtonSecondary) | Copies URL to clipboard | End flow or return to UF-002 | - |

**Error Paths:**
- **UF-008E1:** Display "Please add at least one question before saving", return to UF-002
- **UF-008E2:** Display "Save failed, please try again", return to Step 1

### **UF-009: Manual Content Creation**

**Entry Points:** AI processing failure (UF-001E2), Course creation screen (UF-002), Creator choice during any editing flow

| Step | User Action | UI Element | System Response | Next Step | Error Path |
|------|-------------|------------|-----------------|-----------|------------|
| 1 | Clicks "Add Custom Question" | Button (Atom: ButtonPrimary) | Opens question creation modal | Step 2 | - |
| 2 | Selects question type | Dropdown (Atom: Select) | Shows type-specific question form | Step 3 | - |
| 3 | Enters question text | Text input (Atom: Textarea) | Real-time character validation | Step 4 | UF-009E1: Text validation error |
| 4 | Adds answer options (MCQ) | Text inputs (Atom: Input) | Dynamic form based on question type | Step 5 | - |
| 5 | Marks correct answer | Checkbox/Radio (Atom: Checkbox) | Validates at least one correct answer | Step 6 | UF-009E2: No correct answer selected |
| 6 | Sets question timestamp | Time input (Molecule: TimestampPicker) | Validates timestamp within video duration | Step 7 | UF-009E3: Invalid timestamp |
| 7 | Saves custom question | Button (Atom: ButtonPrimary) | Adds question to course content | Return to UF-002 or continue editing | - |

**Error Paths:**
- **UF-009E1:** Display character limit warning, return to Step 3
- **UF-009E2:** Display "Please select at least one correct answer", return to Step 5
- **UF-009E3:** Display "Timestamp must be within video duration", return to Step 6

### **UF-010: Previous Course Version Loading**

**Entry Points:** Course creation screen with existing course data in browser storage

| Step | User Action | UI Element | System Response | Next Step | Error Path |
|------|-------------|------------|-----------------|-----------|------------|
| 1 | Clicks "Load Previous Version" | Button (Atom: ButtonSecondary) | Checks browser storage for course data | Step 2 | UF-010E1: No previous versions found |
| 2 | Views version list | Version list (Organism: VersionList) | Displays saved versions with timestamps | Step 3 | - |
| 3 | Selects version to load | Version item (Molecule: VersionItem) | Highlights selected version | Step 4 | - |
| 4 | Clicks "Load Version" | Button (Atom: ButtonPrimary) | Retrieves version data from storage | Step 5 | UF-010E2: Version data corrupted |
| 5 | Views loaded course | Course creation screen | Populates interface with version data | UF-002 | - |

**Error Paths:**
- **UF-010E1:** Display "No previous versions found", hide load option
- **UF-010E2:** Display "Version data corrupted, please try another version", return to Step 2

### **UF-011: Confidence Score Filtering**

**Entry Points:** Course creation screen (UF-002), During any editing flow

| Step | User Action | UI Element | System Response | Next Step | Error Path |
|------|-------------|------------|-----------------|-----------|------------|
| 1 | Clicks confidence filter dropdown | Filter dropdown (Molecule: FilterDropdown) | Shows confidence level options (All, High, Medium, Low) | Step 2 | - |
| 2 | Selects confidence level | Filter option | Filters displayed content by selected confidence level | Step 3 | - |
| 3 | Views filtered content | Course creation interface | Shows only content matching selected confidence level | Return to UF-002 or continue editing | - |
| 4 | Clicks "Show All" (optional) | Filter reset button | Removes filter, shows all content | Return to UF-002 | - |

### **UF-012: Course Consumption - Video and Quiz**

**Entry Points:** User accesses public course URL

**Entry Points:** Course creation completion (UF-002), Manual content creation (UF-004)

| Step | User Action | UI Element | System Response | Next Step | Error Path |
|------|-------------|------------|-----------------|-----------|------------|
| 1 | Clicks "Save Version" | Button (Atom: ButtonPrimary) | Validates course has minimum content | Step 2 | UF-003E1: Insufficient content |
| 2 | Enters version notes (optional) | Text input (Atom: Textarea) | Accepts version description | Step 3 | - |
| 3 | Confirms save | Button (Atom: ButtonPrimary) | Generates SHA-256 hash, increments version number | Step 4 | UF-003E2: Save operation fails |
| 4 | Views save confirmation | Success message (Molecule: AlertSuccess) | Displays version number and public URL | Step 5 | - |
| 5 | Copies public URL | Button (Atom: ButtonSecondary) | Copies URL to clipboard | End flow | - |

**Error Paths:**
- **UF-003E1:** Display "Please add at least one question before saving", return to UF-002
- **UF-003E2:** Display "Save failed, please try again", return to Step 1

### **UF-004: Manual Content Creation**

**Entry Points:** AI processing failure (UF-001E2), Creator choice during editing (UF-002)

| Step | User Action | UI Element | System Response | Next Step | Error Path |
|------|-------------|------------|-----------------|-----------|------------|
| 1 | Clicks "Add Custom Question" | Button (Atom: ButtonPrimary) | Opens question creation modal | Step 2 | - |
| 2 | Selects question type | Dropdown (Atom: Select) | Shows type-specific question form | Step 3 | - |
| 3 | Enters question text | Text input (Atom: Textarea) | Real-time character validation | Step 4 | UF-004E1: Text validation error |
| 4 | Adds answer options (MCQ) | Text inputs (Atom: Input) | Dynamic form based on question type | Step 5 | - |
| 5 | Marks correct answer | Checkbox/Radio (Atom: Checkbox) | Validates at least one correct answer | Step 6 | UF-004E2: No correct answer selected |
| 6 | Sets question timestamp | Time input (Molecule: TimestampPicker) | Validates timestamp within video duration | Step 7 | UF-004E3: Invalid timestamp |
| 7 | Saves custom question | Button (Atom: ButtonPrimary) | Adds question to course content | Return to UF-002 | - |

**Error Paths:**
- **UF-004E1:** Display character limit warning, return to Step 3
- **UF-004E2:** Display "Please select at least one correct answer", return to Step 5
- **UF-004E3:** Display "Timestamp must be within video duration", return to Step 6

### **UF-005: Previous Course Version Loading**

**Entry Points:** Course creation screen with existing course data in browser storage

| Step | User Action | UI Element | System Response | Next Step | Error Path |
|------|-------------|------------|-----------------|-----------|------------|
| 1 | Clicks "Load Previous Version" | Button (Atom: ButtonSecondary) | Checks browser storage for course data | Step 2 | UF-005E1: No previous versions found |
| 2 | Views version list | Version list (Organism: VersionList) | Displays saved versions with timestamps | Step 3 | - |
| 3 | Selects version to load | Version item (Molecule: VersionItem) | Highlights selected version | Step 4 | - |
| 4 | Clicks "Load Version" | Button (Atom: ButtonPrimary) | Retrieves version data from storage | Step 5 | UF-005E2: Version data corrupted |
| 5 | Views loaded course | Course creation screen | Populates interface with version data | UF-002 | - |

**Error Paths:**
- **UF-005E1:** Display "No previous versions found", hide load option
- **UF-005E2:** Display "Version data corrupted, please try another version", return to Step 2

### **UF-006: Course Consumption - Video and Quiz**

**Entry Points:** User accesses public course URL

| Step | User Action | UI Element | System Response | Next Step | Error Path |
|------|-------------|------------|-----------------|-----------|------------|
| 1 | Navigates to course URL | Browser address bar | Loads course consumption interface | Step 2 | UF-012E1: Course not found |
| 2 | Views course interface | Course consumption layout (Template: CourseConsumptionLayout) | Displays video player and quiz sidebar | Step 3 | - |
| 3 | Clicks play on video | Video player (Organism: VideoPlayer) | Starts video playback | Step 4 | UF-012E2: Video fails to load |
| 4 | Watches video content | Video player | Tracks current timestamp | Step 5 | - |
| 5 | Reaches quiz trigger timestamp | Video player | Auto-pauses video, highlights quiz question | Step 6 | - |
| 6 | Reads quiz question | Quiz overlay (Organism: QuizOverlay) | Displays question with answer options | Step 7 | - |
| 7 | Selects answer option | Answer choice (Atom: Radio/Checkbox) | Highlights selected answer | Step 8 | - |
| 8 | Clicks "Submit Answer" | Button (Atom: ButtonPrimary) | Validates answer, shows feedback | Step 9 | - |
| 9 | Views answer feedback | Feedback message (Molecule: AnswerFeedback) | Shows correct/incorrect with explanation | Step 10 | - |
| 10 | Clicks "Continue Video" | Button (Atom: ButtonSecondary) | Resumes video playback | Step 4 or End | - |

**Error Paths:**
- **UF-012E1:** Display "Course not found or unavailable", show generic error page
- **UF-012E2:** Display "Video failed to load" with reload option, return to Step 3

### **UF-013: AI-Powered Learning Assistant**

**Entry Points:** During course consumption (UF-012), learner has questions

| Step | User Action | UI Element | System Response | Next Step | Error Path |
|------|-------------|------------|-----------------|-----------|------------|
| 1 | Clicks chat interface | Chat toggle (Atom: ButtonIcon) | Opens AI chat sidebar | Step 2 | - |
| 2 | Types question about content | Chat input (Molecule: ChatInput) | Shows typing indicator | Step 3 | - |
| 3 | Clicks "Send" or presses Enter | Send button/Enter key | Auto-pauses video, captures timestamp and screenshot | Step 4 | - |
| 4 | Waits for AI response | Loading indicator (Atom: Spinner) | Sends question context to AI model | Step 5 | UF-013E1: AI unavailable |
| 5 | Views AI response | Chat message (Molecule: ChatMessage) | Displays contextual answer with timestamp reference | Step 6 | - |
| 6 | Asks follow-up question (optional) | Chat input | Maintains conversation context | Step 3 | - |
| 7 | Clicks "Resume Video" | Button (Atom: ButtonSecondary) | Resumes video from paused timestamp | Return to UF-012 | - |

**Error Paths:**
- **UF-013E1:** Display "AI assistant temporarily unavailable", allow manual video resumption

---

## **5. Cross-Flow Relationships**

| From Flow | Trigger | To Flow | Data Passed |
|-----------|---------|---------|-------------|
| UF-001 | Successful processing | UF-002 | Video metadata, AI-generated content, confidence scores |
| UF-001 | Processing failure | UF-009 | Video metadata only |
| UF-002 | Accept/Reject question | UF-003 | Question data |
| UF-002 | Edit question | UF-004 | Question data |
| UF-002 | Click video segment | UF-005 | Segment data |
| UF-002 | Click video frame | UF-006 | Timestamp, screenshot |
| UF-002 | Add annotation | UF-007 | Timestamp |
| UF-002 | Save course | UF-008 | Complete course data |
| UF-002 | Add custom content | UF-009 | Current course state |
| UF-002 | Load previous version | UF-010 | Current course state |
| UF-002 | Filter content | UF-011 | Current view state |
| UF-003 | Question updated | UF-002 | Updated question status |
| UF-004 | Question edited | UF-002 | Modified question data |
| UF-005 | Segment modified | UF-002 | Updated segment data |
| UF-006 | Screenshot question created | UF-002 | New question data |
| UF-007 | Annotation added | UF-002 | New annotation data |
| UF-008 | Version saved | UF-002 | Version metadata |
| UF-009 | Manual content complete | UF-002 | Custom questions and annotations |
| UF-010 | Version loaded | UF-002 | Previous version course data |
| UF-011 | Filter applied | UF-002 | Filtered view state |
| UF-012 | Learner question | UF-013 | Video timestamp, current context |
| UF-013 | Question answered | UF-012 | Conversation context maintained |

---

## **6. Component Interaction States**

### **6.1. Video Player Component States**

| State | Appearance | Triggers | User Actions Available |
|-------|------------|----------|----------------------|
| Loading | Spinner overlay | Initial load, seek operations | Wait |
| Playing | Standard controls visible | Play button clicked | Pause, seek, volume |
| Paused | Pause overlay | Quiz trigger, manual pause | Play, seek |
| Quiz Active | Dimmed with quiz overlay | Timestamp trigger | Answer quiz, skip (if allowed) |
| Error | Error message with retry | Load failure | Retry, report issue |

### **6.2. Quiz Question Component States**

| State | Appearance | Triggers | User Actions Available |
|-------|------------|----------|----------------------|
| Unanswered | Default styling | Question displayed | Select answer, skip |
| Answered | Selected answer highlighted | Answer submitted | View explanation |
| Correct | Green success styling | Correct answer | Continue, review explanation |
| Incorrect | Red error styling | Wrong answer | Try again (if allowed), view explanation |
| Disabled | Grayed out | Already completed | View only |

### **6.3. Confidence Score Component States**

| State | Appearance | Triggers | User Actions Available |
|-------|------------|----------|----------------------|
| High Confidence | Green badge (80-100%) | AI confidence score | Accept content |
| Medium Confidence | Yellow badge (50-79%) | AI confidence score | Review and edit |
| Low Confidence | Red badge (0-49%) | AI confidence score | Manual review required |
| No Score | Gray badge | Manual content | Edit or keep |

---

## **7. Timing and Performance Requirements**

| Interaction | Expected Response Time | Loading Indicator | Timeout Handling |
|-------------|----------------------|-------------------|------------------|
| URL Validation | < 100ms | None | Immediate feedback |
| Video Processing | 30-120 seconds | Progress spinner | Show timeout after 180s |
| Question Save | < 500ms | Button spinner | Show error after 5s |
| AI Chat Response | 2-10 seconds | Typing indicator | Show timeout after 30s |
| Version Save | < 2 seconds | Save button spinner | Show error after 10s |
| Video Load | < 5 seconds | Video player spinner | Show error after 15s |

---

## **8. Navigation and Browser Behavior**

### **8.1. URL Changes**
- **Course Creation:** URLs update with course ID when version is saved
- **Course Consumption:** URL remains static, timestamp stored in session only
- **Version Loading:** URL parameters indicate loaded version

### **8.2. Browser Back Button Behavior**
- **Course Creation:** Returns to landing page (with unsaved work warning)
- **Course Consumption:** No effect (video position maintained)
- **Quiz Active:** Returns to video (quiz progress lost)

### **8.3. Refresh Behavior**
- **Course Creation:** Unsaved work persists in browser storage
- **Course Consumption:** Video restarts, quiz progress resets
- **AI Chat:** Conversation context lost

### **8.4. Deep Linking**
- **Public Course URLs:** Direct access to course consumption interface
- **Course Creation:** Not directly linkable (requires new session)
- **Specific Video Timestamps:** Supported in consumption mode only