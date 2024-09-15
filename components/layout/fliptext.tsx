"use client";
import { useState, useEffect } from "react";

export default function RotatingText() {
  const sentences = [
    "Illegal wildlife trade generates 5-20 billion dollars annually.",
    "Pangolins are the most trafficked mammals in the world - one is captured every five minutes.",
    "Over 1,000 rangers have been killed by poachers in the past 10 years.",
    "Three rhinoceroses are killed by poachers on average every day.",
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
    }, 5000); // Time between sentence changes

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
        <p className="text-xl font-bold">{sentences[currentSentence]}</p>
      </div>
    </div>
  );
}
