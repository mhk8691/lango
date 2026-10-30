import type { Metadata } from "next";
import Home from "./Home";

export const metadata: Metadata = { title: "صفحه اصلی" };
export default function HomePage() { return <Home />; }
