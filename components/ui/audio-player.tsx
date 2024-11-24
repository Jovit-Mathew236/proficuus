"use client";
import { Volume2, VolumeX } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const AudioPlayer = () => {
  const [isMuted, setIsMuted] = useState(false); // State to control mute/unmute
  const audioRef = useRef<HTMLAudioElement | null>(null); // Reference for the audio element

  // Play audio when the component mounts
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
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
      <audio ref={audioRef} loop>
        <source src="/music/bgm.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      {/* Speaker icon for mute/unmute */}
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
    </>
  );
};

export default AudioPlayer;
