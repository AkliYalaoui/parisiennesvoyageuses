"use client";

import { useState, useRef } from "react";
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from "react-icons/fa";

const Reel = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteUnmute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative bg-slate-200 rounded-lg shadow-md overflow-hidden">
      {/* Video */}
      <video
        ref={videoRef}
        className="w-full h-[520px] object-cover"
        preload="metadata"
        loop
        muted={isMuted}
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Play/Pause Button */}
      <button
        onClick={handlePlayPause}
        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-25 text-white text-4xl rounded-full w-16 h-16 m-auto opacity-0 hover:opacity-100 transition-opacity duration-300"
      >
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>

      {/* Mute/Unmute Button */}
      <button
        onClick={handleMuteUnmute}
        className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white text-2xl rounded-full w-12 h-12 flex items-center justify-center hover:bg-opacity-75 transition duration-300"
      >
        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
      </button>
    </div>
  );
};

export default Reel;
