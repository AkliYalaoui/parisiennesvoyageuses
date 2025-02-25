"use client";

import React, { useState, useRef } from 'react';
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from 'react-icons/fa'; // React Icons

const InstagramReel = ({ videoUrl }) => {
  // States to handle play/pause and mute/unmute
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Video reference
  const videoRef = useRef(null);

  // Handle play/pause
  const handlePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Handle mute/unmute
  const handleMuteUnmute = () => {
    if (videoRef.current.muted) {
      videoRef.current.muted = false;
      setIsMuted(false);
    } else {
      videoRef.current.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <div className="relative  bg-black rounded-xl overflow-hidden group">
      <div className="w-full h-full">
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full h-full object-cover"
          onClick={handlePlayPause} // Click video to toggle play/pause
        />
      </div>

      {/* Play/Pause Button - Appear on hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handlePlayPause}
          className="bg-black bg-opacity-60 text-white p-4 rounded-full"
        >
          {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
        </button>
      </div>

      {/* Mute/Unmute Button - Positioned bottom right */}
      <div className="absolute bottom-4 right-4">
        <button
          onClick={handleMuteUnmute}
          className="bg-black bg-opacity-60 text-white p-2 rounded-full"
        >
          {isMuted ? <FaVolumeMute size={15} /> : <FaVolumeUp size={15} />}
        </button>
      </div>
    </div>
  );
};

export default InstagramReel;
