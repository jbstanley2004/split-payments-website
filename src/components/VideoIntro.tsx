"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

interface VideoIntroProps {
  onComplete: () => void;
}

export default function VideoIntro({ onComplete }: VideoIntroProps) {
  const [videoEnded, setVideoEnded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showUnmute, setShowUnmute] = useState(true); // Always show unmute option initially
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;

      // Simple muted autoplay
      video.muted = true;
      video.play().catch((error) => {
        console.error("Autoplay failed:", error);
        onComplete();
      });
    }
  }, [onComplete]);

  const toggleMute = () => {
    if (videoRef.current) {
      if (navigator.vibrate) navigator.vibrate(10);
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
      // Keep button visible so they can toggle back if desired, 
      // or hide it? User just said "muted by default". 
      // Usually toggle buttons stay or fade out. 
      // I'll keep the previous behavior: hide on interaction? 
      // Actually, if I unmute, I might want to mute again. 
      // Let's keep it visible but maybe subtle? 
      // The previous code hid it: setShowUnmute(false). 
      // I'll stick to the previous pattern but allow it to be toggled.
      // Actually, let's just let it toggle state and stay visible or fade out?
      // Simpler: Toggle mute state, keep button visible for a moment or always?
      // Previous code: setShowUnmute(false) on click.
      // I'll change it to toggle the icon but keep the button visible?
      // Or maybe just hide it like before to be less intrusive.
      // Let's stick to the "unmute" action. Once unmuted, maybe they don't need to mute again for a short intro.
      setShowUnmute(false);
    }
  };

  const handleVideoEnded = () => {
    setVideoEnded(true);
    setTimeout(() => {
      onComplete();
    }, 500);
  };

  return (
    <motion.div
      className="w-full h-full flex items-center justify-center overflow-hidden rounded-3xl relative group"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      <motion.div
        className="w-full h-full relative"
        animate={{ opacity: videoEnded ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <video
          ref={videoRef}
          src="/brand.mp4"
          className="w-full h-full object-cover"
          playsInline
          muted={true} // Enforce muted by default
          onEnded={handleVideoEnded}
        />

        {showUnmute && !videoEnded && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={toggleMute}
            className="absolute bottom-6 right-6 bg-black/50 backdrop-blur-md text-white p-3 rounded-full hover:bg-black/70 transition-colors z-20"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
}
