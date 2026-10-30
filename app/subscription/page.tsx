import type { Metadata } from "next";
import Subscription from "@/components/subscription/Subscription";

export const metadata: Metadata = { title: "اشتراک و پرداخت" };

export default function SubscriptionPage() {
  return <Subscription />;
}
