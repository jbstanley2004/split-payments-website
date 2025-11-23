"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

interface VideoIntroProps {
  onComplete?: () => void;
  loop?: boolean;
}

export default function VideoIntro({ onComplete, loop = false }: VideoIntroProps) {
  const [videoEnded, setVideoEnded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showUnmute, setShowUnmute] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let playPromise: Promise<void> | undefined;

    const safePlay = () => {
      if (video.paused && !playPromise) {
        playPromise = video.play();
        playPromise
          .then(() => {
            playPromise = undefined;
          })
          .catch((error) => {
            playPromise = undefined;
            // AbortError is expected if we pause quickly, ignore it
            if (error.name !== 'AbortError') {
              console.error("Autoplay failed:", error);
              if (onComplete) onComplete();
            }
          });
      }
    };

    const safePause = () => {
      if (playPromise) {
        playPromise.then(() => {
          video.pause();
        });
      } else if (!video.paused) {
        video.pause();
      }
    };

    // Intersection Observer for scroll pausing
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && !videoEnded) {
            safePause();
          } else if (entry.isIntersecting && !videoEnded) {
            safePlay();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Initial play handled by observer if visible, or force it if needed
    // But observer usually fires initially. Let's rely on observer for cleaner logic
    // or call safePlay() initially to be sure.
    safePlay();

    return () => {
      observer.disconnect();
    };
  }, [onComplete, videoEnded]);

  const toggleMute = () => {
    if (videoRef.current) {
      if (navigator.vibrate) navigator.vibrate(10);
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
      setShowUnmute(false);
    }
  };

  const handleVideoEnded = () => {
    if (loop) return;
    setVideoEnded(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 500);
  };

  return (
    <motion.div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center overflow-hidden relative group"
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
          muted={true}
          loop={loop}
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
