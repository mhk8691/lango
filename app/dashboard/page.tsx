import type { Metadata } from "next";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import { sampleCourses } from "@/app/course/data";

export const metadata: Metadata = { title: "پیشخوان" };
export default function DashboardPage() { return <DashboardOverview courses={sampleCourses} />; }
