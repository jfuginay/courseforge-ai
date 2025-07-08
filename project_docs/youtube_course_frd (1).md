# **Functional Requirements Document (FRD)**

## **Project: YouTube-to-Course Generation System**

**Version:** 1.0

**Date:** July 8, 2025

**Author:** Systems Analysis Team

### **1. Introduction**

This Functional Requirements Document (FRD) defines the detailed system behaviors for the YouTube-to-Course Generation System. The system transforms unstructured YouTube video content into structured, interactive learning courses through AI-powered content analysis and question generation. This document translates the high-level business needs into specific, testable system functions that will guide development and quality assurance efforts.

The system enables course creators to input a single YouTube video URL and receive AI-generated course content including auto-segmented video sections, extracted concepts, and contextual quiz questions. Creators can accept, reject, or modify the generated content before publishing courses as publicly accessible links for learners to consume.

### **2. Functional Requirements**

#### **2.1. Video Input and Processing**

**User Story:** As a course creator, I want to input a YouTube video URL so that the system can analyze the content and generate course materials.

| ID | Requirement Description |
|---|---|
| FR-001 | The system **shall** provide an input field that accepts YouTube video URLs in standard formats (youtube.com/watch?v=, youtu.be/, youtube.com/embed/) |
| FR-002 | The system **shall** validate YouTube URLs and display an error message if the URL format is invalid |
| FR-003 | The system **shall** extract the video ID from valid YouTube URLs and pass it to the Gemini 2.0 Flash API for processing |
| FR-004 | The system **shall** display a loading indicator while the AI processes the video content |
| FR-005 | The system **shall** handle API timeouts gracefully and display appropriate error messages if video processing fails |

#### **2.2. AI-Powered Content Generation**

**User Story:** As a course creator, I want the system to automatically generate course content from my video so that I can efficiently create structured learning materials.

| ID | Requirement Description |
|---|---|
| FR-006 | The system **shall** use Gemini 2.0 Flash API to analyze the YouTube video and extract key concepts covered |
| FR-007 | The system **shall** generate an auto-segmented timeline of the video based on topic shifts, speaker changes, and content transitions |
| FR-008 | The system **shall** create multiple quiz questions for each video segment using various question types (MCQ, True/False, Fill-in-the-blank, Short Answer) |
| FR-009 | The system **shall** extract and display a list of core concepts identified in the video (e.g., "Vectors, Dot Product, Duality") |
| FR-010 | The system **shall** generate contextual questions that can be triggered at specific video timestamps |
| FR-011 | The system **shall** receive and store confidence scores from the Gemini API for all generated content including concepts, segments, and quiz questions |
| FR-012 | The system **shall** display confidence scores to course creators as visual indicators (e.g., color-coded badges, percentage values) for each piece of generated content |

#### **2.3. Course Creation Interface**

**User Story:** As a course creator, I want to review and customize the AI-generated content so that I can ensure the course meets my teaching objectives.

| ID | Requirement Description |
|---|---|
| FR-013 | The system **shall** display the course creation screen with the original video embedded and AI-generated content in an editable interface |
| FR-014 | The system **shall** present each generated quiz question with Accept/Reject buttons for creator approval |
| FR-015 | The system **shall** display confidence scores alongside each generated item (questions, concepts, segments) using visual indicators such as colored badges or percentage displays |
| FR-016 | The system **shall** allow creators to sort or filter generated content by confidence score to prioritize high-quality suggestions |
| FR-017 | The system **shall** allow creators to click on any video segment to view and modify associated questions |
| FR-018 | The system **shall** enable creators to click on specific video frames to generate additional screenshot-based questions |
| FR-019 | The system **shall** allow creators to mark video segments as "Key Concept" areas for emphasis |
| FR-020 | The system **shall** provide text editing capabilities for modifying question text, answer choices, and explanations |
| FR-021 | The system **shall** allow creators to add custom annotations to specific video timestamps |

#### **2.4. Course Versioning and Saving**

**User Story:** As a course creator, I want to save different versions of my course so that I can iterate on content while preserving previous states.

| ID | Requirement Description |
|---|---|
| FR-022 | The system **shall** provide a "Save Version" button that creates a new immutable version of the current course state |
| FR-023 | The system **shall** generate a SHA-256 hash of the complete course data (video metadata, questions, segments, annotations, confidence scores) for each saved version |
| FR-024 | The system **shall** auto-increment version numbers (v1, v2, v3...) for each course when saved |
| FR-025 | The system **shall** store each course version as an immutable record with version hash, course ID, creation timestamp, and complete course data including confidence scores |
| FR-026 | The system **shall** allow creators to view a list of all saved versions for a course |
| FR-027 | The system **shall** generate a unique public URL for each course version that remains permanent and accessible |

#### **2.5. Course Consumption Interface**

**User Story:** As a learner, I want to watch the video and interact with quiz content so that I can learn effectively from the course material.

| ID | Requirement Description |
|---|---|
| FR-028 | The system **shall** display the course consumption interface with the embedded YouTube video and associated quiz questions |
| FR-029 | The system **shall** automatically pause the video when a contextual quiz question is triggered at its designated timestamp |
| FR-030 | The system **shall** present quiz questions in an overlay or sidebar interface without obscuring the video content |
| FR-031 | The system **shall** allow learners to resume video playbook after answering quiz questions |
| FR-032 | The system **shall** provide immediate feedback on quiz answers (correct/incorrect with explanations where available) |
| FR-033 | The system **shall** track and display the learner's current quiz score throughout the course |

#### **2.6. AI-Powered Learning Assistant**

**User Story:** As a learner, I want to ask questions about the video content so that I can get clarification on concepts I don't understand.

| ID | Requirement Description |
|---|---|
| FR-034 | The system **shall** provide a chat interface where learners can type questions about the video content |
| FR-035 | The system **shall** automatically pause the video when a learner submits a question through the chat interface |
| FR-036 | The system **shall** capture the current video timestamp and frame screenshot when a question is asked |
| FR-037 | The system **shall** send the question text, timestamp, and screenshot to the AI model for contextual response generation |
| FR-038 | The system **shall** display the AI-generated answer in the chat interface |
| FR-039 | The system **shall** allow learners to resume video playback after receiving an AI response |

#### **2.7. Quiz Types and Question Management**

**User Story:** As a course creator, I want access to various question types so that I can create diverse and engaging assessments.

| ID | Requirement Description |
|---|---|
| FR-040 | The system **shall** support Multiple Choice Questions (MCQ) with single correct answers |
| FR-041 | The system **shall** support "Select All That Apply" multiple choice questions |
| FR-042 | The system **shall** support True/False questions with optional explanation prompts |
| FR-043 | The system **shall** support Fill-in-the-Blank (Cloze deletion) questions for terminology and equations |
| FR-044 | The system **shall** support Short Answer questions requiring 1-3 sentence explanations |
| FR-045 | The system **shall** support Ordering/Sequencing questions for process-heavy content |
| FR-046 | The system **shall** support Matching questions connecting terms to definitions |
| FR-047 | The system **shall** generate contextual, application-based questions rather than simple recall questions |

### **3. Data Handling and Validation**

#### **3.1. Input Validation**

- **YouTube URL Validation:** The system shall validate URLs using regex pattern matching for standard YouTube URL formats and reject malformed URLs with specific error messages.
- **Question Text Validation:** All question text fields must contain at least 10 characters and not exceed 500 characters.
- **Answer Choice Validation:** Multiple choice questions must have between 2-6 answer options, with at least one marked as correct.
- **Timestamp Validation:** Video timestamps must be in valid time format (HH:MM:SS or MM:SS) and not exceed the total video duration.

#### **3.2. Data Processing**

- **Content Hash Generation:** The system shall serialize course data to JSON format, compute SHA-256 hash using consistent field ordering, and store the hash as the version identifier.
- **Video Metadata Extraction:** The system shall extract and store video title, duration, thumbnail URL, and channel information from YouTube API responses.
- **Quiz Scoring Calculation:** The system shall calculate scores as (correct answers / total questions) * 100, rounded to nearest integer.
- **Confidence Score Processing:** The system shall normalize confidence scores from Gemini API to a 0-100 scale and categorize them as High (80-100), Medium (50-79), or Low (0-49) for display purposes.

#### **3.3. Data Storage Format**

- **Course Data Structure:** All course data shall be stored as JSONB containing video metadata, segmentation data, questions array, creator annotations, and confidence scores for all AI-generated content.
- **Timestamp Format:** All timestamps shall be stored in ISO 8601 format (YYYY-MM-DDTHH:MM:SSZ).
- **Version Metadata:** Each version record shall include version_hash, course_id, version_number, created_at, and creator_ip.
- **Confidence Score Storage:** Confidence scores shall be stored as floating-point numbers (0.0-1.0) alongside their corresponding content items in the course data structure.

### **4. Error Handling and Messaging**

#### **4.1. Video Processing Errors**

| Condition | System Action | User Message |
|---|---|---|
| Invalid YouTube URL format | Prevent form submission, highlight URL field | "Please enter a valid YouTube URL (e.g., https://youtube.com/watch?v=VIDEO_ID)" |
| Video not accessible/private | Display error state | "This video is private or unavailable. Please check the URL and try again." |
| Gemini API timeout | Show retry option | "Video processing is taking longer than expected. Would you like to try again?" |
| API rate limit exceeded | Queue request with estimated wait time | "Our AI is currently busy. Your request is queued and will process in approximately 2 minutes." |

#### **4.2. Course Creation Errors**

| Condition | System Action | User Message |
|---|---|---|
| No questions generated for video | Provide manual question creation tools | "We couldn't generate questions automatically. You can create custom questions using the tools below." |
| Low confidence scores on all generated content | Display warning and suggest manual review | "The AI has low confidence in the generated content. Please review and edit before publishing." |
| Save operation fails | Retry automatically, then show manual retry | "Failed to save course. Retrying... If this continues, please try again in a few moments." |
| Version limit exceeded (100 versions) | Prevent new version creation | "Maximum versions reached (100). Please contact support to increase your limit." |

#### **4.3. Course Consumption Errors**

| Condition | System Action | User Message |
|---|---|---|
| Video fails to load | Show reload button | "Video failed to load. Please check your connection and try reloading." |
| AI assistant unavailable | Disable chat interface | "AI assistant is temporarily unavailable. You can continue with the course content." |
| Quiz data corrupted | Skip to next question | "This question couldn't be loaded. Moving to the next one..." |

### **5. Traceability Matrix**

This FRD supports the following business requirements:
- **BR-001:** Transform unstructured YouTube content into structured learning paths
- **BR-002:** Enable rapid course creation through AI assistance
- **BR-003:** Provide interactive learning experience with contextual questions
- **BR-004:** Support iterative course improvement through versioning
- **BR-005:** Deliver courses via shareable public links without user registration

Each functional requirement (FR) listed above directly supports one or more of these business requirements, ensuring complete coverage of the project scope and preventing orphaned features that don't serve business needs.