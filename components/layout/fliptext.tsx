"use client";
import { useState, useEffect } from "react";

export default function RotatingText() {
  const sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "A journey of a thousand miles begins with a single step.",
    "Actions speak louder than words.",
  ];

  const [currentSentence, setCurrentSentence] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  // Switch sentence after the flip-out animation
  useEffect(() => {
    const interval = setInterval(() => {
      // Start the flip-out animation
      setIsFlipping(true);

      setTimeout(() => {
        // Change the sentence after the flip-out animation ends
        setCurrentSentence((prev) => (prev + 1) % sentences.length);
        setIsFlipping(false);
      }, 500); // The duration of the flip-out animation
    }, 3000); // Time between sentence changes

    return () => clearInterval(interval);
  }, [sentences.length]);

  return (
    <div className="relative h-12 w-full">
      {/* Current sentence div */}
      <div
        className={`absolute inset-0 transition-transform duration-500 ${
          isFlipping ? "animate-flip-down" : "animate-flip-up"
        }`}
      >
        <p className="text-2xl font-bold">{sentences[currentSentence]}</p>
      </div>
    </div>
  );
}
