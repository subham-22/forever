import React, { useEffect, useRef, useState } from 'react';
import { assets } from '../assets/assets';

const Hero = () => {
  const media = [
    { type: 'video', src: assets.bannerVdo },
    { type: 'image', src: assets.banner_01 },
    { type: 'image', src: assets.banner_03 },
    { type: 'image', src: assets.banner_04 },
    { type: 'image', src: assets.banner_05 },
    { type: 'image', src: assets.banner_06 },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(null);
  const [animating, setAnimating] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPreviousIndex(currentIndex);
      setAnimating(true);
      setCurrentIndex((prev) => (prev + 1) % media.length);

      // Stop animating after animation ends
      setTimeout(() => {
        setAnimating(false);
      }, 500); // match transition duration
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  useEffect(() => {
    if (media[currentIndex].type === 'video' && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  }, [currentIndex]);

  return (
    <div className="relative w-full h-[400px] overflow-hidden border border-gray-400">
      {/* Previous Slide - moves left */}
      {previousIndex !== null && (
        <div
          key={`prev-${previousIndex}`}
          className={`absolute w-full h-full top-0 left-0 z-10 transition-transform duration-700 ease-in-out ${
            animating ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {media[previousIndex].type === 'video' ? (
            <video
              src={media[previousIndex].src}
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={media[previousIndex].src}
              alt={`prev-${previousIndex}`}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      )}

      {/* Current Slide - comes from right */}
      <div
        key={`curr-${currentIndex}`}
        className={`absolute w-full h-full top-0 left-0 z-20 transition-transform duration-500 ease-in-out ${
          animating ? 'translate-x-full' : 'translate-x-0'
        }`}
      >
        {media[currentIndex].type === 'video' ? (
          <video
            ref={videoRef}
            src={media[currentIndex].src}
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={media[currentIndex].src}
            alt={`curr-${currentIndex}`}
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </div>
  );
};

export default Hero;
