"use client";
import { Volume2, VolumeX } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const AudioPlayer = () => {
  const [isMuted, setIsMuted] = useState(false); // State to control mute/unmute
  const [isReady, setIsReady] = useState(false); // State to check if audio is ready to play
  const audioRef = useRef<HTMLAudioElement | null>(null); // Reference for the audio element

  // Play audio when the component mounts and when it's ready
  useEffect(() => {
    const audioElement = audioRef.current;

    if (audioElement) {
      // Listen for the 'canplaythrough' event to check if audio is ready
      const handleCanPlayThrough = () => {
        setIsReady(true); // Audio is ready to play
        audioElement.play(); // Play audio after it is ready
      };

      audioElement.addEventListener("canplaythrough", handleCanPlayThrough);

      return () => {
        audioElement.removeEventListener(
          "canplaythrough",
          handleCanPlayThrough
        );
      };
    }
  }, []);

  // Toggle mute/unmute
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      {/* Audio for background music */}
      <audio
        ref={audioRef}
        loop
        preload="auto" // Preload the audio
        onCanPlayThrough={() => setIsReady(true)} // Set readiness state when the audio can play
      >
        <source src="/music/bgm.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      {/* Show the audio controls after it's ready */}
      {isReady && (
        <div
          className="absolute bottom-10 right-10 z-[40] p-2 rounded-full cursor-pointer bg-slate-100/45"
          onClick={toggleMute}
        >
          {isMuted ? (
            <VolumeX size={20} color="gray" />
          ) : (
            <Volume2 size={20} color="gray" />
          )}
        </div>
      )}
    </>
  );
};

export default AudioPlayer;
