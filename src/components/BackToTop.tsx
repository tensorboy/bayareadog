"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40 w-10 h-10 rounded-full bg-amber-500 text-white shadow-lg hover:bg-amber-600 transition-all duration-300 flex items-center justify-center hover:scale-110"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
