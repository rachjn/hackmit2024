// components/VideoPlayer.tsx
"use client";
import { useEffect, useState } from "react";

interface VideoPlayerProps {
  videoUrl: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
  const [source, setSource] = useState(videoUrl);

  useEffect(() => {
    // Update the video source periodically if needed
    const interval = setInterval(() => {
      setSource(`${videoUrl}?t=${new Date().getTime()}`);
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, [videoUrl]);

  return (
    <video controls>
      <source src="/videos/myvideo.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
