"use client";

import { useEffect } from "react";

/** For the engineers who open the hood. */
export default function ConsoleSignature() {
  useEffect(() => {
    console.log(
      "%c AYANE-01 · rev 5.0 %c glass to copper, built by hand \n%c a seal is hidden at the bottom of the stack.",
      "background:#b87333;color:#0b0c0e;font-weight:bold;padding:2px 6px;border-radius:2px",
      "color:#e8e4dc;padding:2px 0",
      "color:#666;font-size:10px"
    );

    // The tab keeps working while you're away
    const original = document.title;
    const onVisibility = () => {
      document.title = document.hidden ? "still building… | FD" : original;
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return null;
}
