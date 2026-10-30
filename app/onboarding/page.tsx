import type { Metadata } from "next";
import Onboarding from "./Onboarding";

export const metadata: Metadata = { title: "معرفی لنگو" };

export default function OnboardingPage() {
  return <Onboarding />;
}
