import type { Metadata } from "next";
import ProfileSettings from "@/components/profile/ProfileSettings";

export const metadata: Metadata = { title: "پروفایل و تنظیمات" };

export default function ProfilePage() {
  return <ProfileSettings />;
}
