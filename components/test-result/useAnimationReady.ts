"use client";

import { useEffect, useState } from "react";

export default function useAnimationReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let active = true;
    let firstFrame = 0;
    let secondFrame = 0;
    void Promise.resolve(document.fonts?.ready).then(() => {
      if (!active) return;
      firstFrame = requestAnimationFrame(() => {
        secondFrame = requestAnimationFrame(() => { if (active) setReady(true); });
      });
    });
    return () => {
      active = false;
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
    };
  }, []);
  return ready;
}
