export type NotificationCategory = "system" | "reminder" | "message";
export type NotificationItem = {
  id: string;
  category: NotificationCategory;
  title: string;
  description: string;
  time: string;
  dateTime: string;
  tone: "blue" | "purple" | "amber";
};
