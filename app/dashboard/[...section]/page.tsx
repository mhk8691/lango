import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Vocabulary from "@/components/vocabulary/Vocabulary";
import Courses from "@/components/course/Courses";
import CourseDetail from "@/components/course-detail/CourseDetail";
import { sampleCourses, courseDetails } from "@/app/course/data";
import LearningPath from "@/components/learning-path/LearningPath";
import TestsDashboard from "@/components/tests-dashboard/TestsDashboard";
import ExercisesHub from "@/components/dashboard/ExercisesHub";
import Library from "@/components/dashboard/Library";
import DemoExam from "@/components/exam/DemoExam";
import { examDefinitions } from "@/lib/exams/catalog";
import ProgressReport from "@/components/progress-report";
import { sampleProgress } from "@/app/progress/sample-progress";
import Favorites from "@/components/favorites/Favorites";
import Achievements from "@/components/achievements/Achievements";
import { sampleAchievements } from "@/components/achievements/data";
import Notifications from "@/components/notifications/Notifications";
import { sampleNotifications } from "@/app/notifications/sample-notifications";
import Subscription from "@/components/subscription/Subscription";
import ProfileSettings from "@/components/profile/ProfileSettings";
import Lesson from "@/components/lesson/Lesson";
import PlacementIntro from "@/app/placement-test/PlacementIntro";
import ProfileEditor from "@/components/profile/ProfileEditor";
import TestResult from "@/components/test-result";
import { sampleResult } from "@/app/placement-test/results/sample-result";
import InteractivePractice from "@/app/exercises/interactive/InteractivePractice";
import ListeningPractice from "@/app/exercises/listening/ListeningPractice";
import SpeakingPractice from "@/app/exercises/speaking/SpeakingPractice";
import WritingPractice from "@/app/exercises/writing/WritingPractice";
import SentenceCompletionPractice from "@/app/exercises/sentence-completion/SentenceCompletionPractice";
import DragAndDropPractice from "@/app/exercises/drag-and-drop/DragAndDropPractice";
import { dashboardItems } from "@/components/dashboard/routes";

const practices = { interactive: InteractivePractice, listening: ListeningPractice, speaking: SpeakingPractice, writing: WritingPractice, "sentence-completion": SentenceCompletionPractice, "drag-and-drop": DragAndDropPractice };
const subpaths = ["lesson", "placement-test", "placement-test/results", "profile/edit", ...sampleCourses.map(course => `courses/${course.id}`), ...examDefinitions.map(exam => `exam/${exam.id}`), ...Object.keys(practices).map(kind => `exercises/${kind}`)];
export function generateStaticParams() {
  return [...dashboardItems.filter(item => item.id !== "overview").map(item => item.href.slice("/dashboard/".length)), ...subpaths].map(path => ({ section: path.split("/") }));
}
export async function generateMetadata({ params }: { params: Promise<{ section: string[] }> }): Promise<Metadata> {
  const { section } = await params;
  const item = dashboardItems.find(item => item.href === `/dashboard/${section[0]}`);
  return { title: item?.label ?? "داشبورد لنگو" };
}
export default async function DashboardSectionPage({ params }: { params: Promise<{ section: string[] }> }) {
  const { section } = await params;
  const path = section.join("/");
  const loading = <p style={{ padding: 24, textAlign: "center" as const }}>در حال آماده‌سازی…</p>;
  if (section[0] === "courses" && section.length === 2) {
    const course = sampleCourses.find(course => course.id === section[1]);
    const details = courseDetails[section[1]];
    if (!course || !details) notFound();
    return <CourseDetail course={course} details={details} />;
  }
  if (section[0] === "exam" && section.length === 2) {
    const definition = examDefinitions.find(exam => exam.id === section[1]);
    if (!definition) notFound();
    return <Suspense fallback={loading}><DemoExam definition={definition} /></Suspense>;
  }
  if (section[0] === "exercises" && section.length === 2) {
    const Practice = Object.hasOwn(practices, section[1]) ? practices[section[1] as keyof typeof practices] : undefined;
    if (!Practice) notFound();
    return <Practice />;
  }
  switch (path) {
    case "learning-path": return <LearningPath />;
    case "courses": return <Courses courses={sampleCourses} />;
    case "tests": return <TestsDashboard />;
    case "exercises": return <ExercisesHub />;
    case "library": return <Library />;
    case "vocabulary": return <Vocabulary />;
    case "speaking": {
      const definition = examDefinitions.find(exam => exam.id === path)!;
      return <Suspense fallback={loading}><DemoExam definition={definition} /></Suspense>;
    }
    case "progress": return <ProgressReport report={sampleProgress} />;
    case "favorites": return <Favorites courses={sampleCourses} />;
    case "achievements": return <Achievements items={sampleAchievements} />;
    case "notifications": return <Notifications items={sampleNotifications} />;
    case "subscription": return <Subscription />;
    case "settings": return <ProfileSettings />;
    case "lesson": return <Lesson />;
    case "placement-test": return <PlacementIntro />;
    case "placement-test/results": return <TestResult result={sampleResult} />;
    case "profile/edit": return <ProfileEditor />;
    default: notFound();
  }
}
