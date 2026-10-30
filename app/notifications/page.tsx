import type { Metadata } from "next";
import Notifications from "@/components/notifications/Notifications";
import { sampleNotifications } from "./sample-notifications";

export const metadata: Metadata = { title: "اعلان‌ها و پیام‌ها" };

export default function NotificationsPage() {
  return <Notifications items={sampleNotifications} />;
}
