import React, { useState, useEffect } from "react";

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = (window.scrollY / h) * 100;
      setProgress(Math.min(p, 100));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-[60] bg-gray-100">
      <div
        className="h-full transition-all duration-200"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, #facc15, #f59e0b)",
          boxShadow: "0 0 10px rgba(250,204,21,0.5)",
        }}
      />
    </div>
  );
}