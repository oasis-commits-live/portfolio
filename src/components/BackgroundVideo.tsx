import React, { useEffect, useRef, useState, useCallback } from 'react';

const LOCAL_AVATAR_URL = '/avatar.mp4';
const GEMINI_DIRECT_VIDEO_URL =
  'https://lh3.googleusercontent.com/gg/ACRwjavpmzEeEy2t08aBQIq9GlO5HOuLOiMtbvD96biFuqh2kZbzpaB4Iq7enCc1Csr6I4KxGzficKJOFfkyFNuUXgrBGXnvAUgxJH8tDWt6ae2kP-7WdfuLjCP0nVGXLwpDEB_jmypRQ2PZGP6YhBCG-3iEw_JVG9Qs8OVVmVGEAvB_mUZ4D6Y=m22';
const FALLBACK_VIDEO_URL = GEMINI_DIRECT_VIDEO_URL;

function resolveVideoUrl(url?: string | null): string {
  if (!url) return LOCAL_AVATAR_URL;
  if (url.includes('share.gemini.google') || url.includes('44d3795c54e9')) {
    return LOCAL_AVATAR_URL;
  }
  return url;
}

interface BackgroundVideoProps {
  customVideoUrl?: string | null;
  scrollY?: number;
}

export const BackgroundVideo: React.FC<BackgroundVideoProps> = ({
  customVideoUrl,
  scrollY = 0,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const targetTimeRef = useRef<number>(2.0);
  const isSeekingRef = useRef<boolean>(false);
  const [videoSrc, setVideoSrc] = useState<string>(() => resolveVideoUrl(customVideoUrl));

  useEffect(() => {
    setVideoSrc(resolveVideoUrl(customVideoUrl));
  }, [customVideoUrl]);

  // Track and follow horizontal cursor/touch position across the window
  const updateTargetTime = useCallback((clientX: number) => {
    const video = videoRef.current;
    if (!video || !video.duration || Number.isNaN(video.duration)) return;

    // Map screen X [0 -> window.innerWidth] to video timeline [0 -> duration]
    const ratio = Math.max(0, Math.min(1, clientX / window.innerWidth));
    const target = ratio * video.duration;
    targetTimeRef.current = target;

    if (!isSeekingRef.current) {
      isSeekingRef.current = true;
      video.currentTime = target;
    }
  }, []);

  const handleSeeked = () => {
    const video = videoRef.current;
    if (!video || !video.duration) {
      isSeekingRef.current = false;
      return;
    }

    isSeekingRef.current = false;
    // If the mouse moved while the previous seek was in progress, catch up immediately
    if (Math.abs(video.currentTime - targetTimeRef.current) > 0.02) {
      isSeekingRef.current = true;
      video.currentTime = targetTimeRef.current;
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      updateTargetTime(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        updateTargetTime(e.touches[0].clientX);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [updateTargetTime]);

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video && video.duration) {
      // Center the avatar gaze initially (neutral forward look)
      const centerTime = video.duration / 2;
      targetTimeRef.current = centerTime;
      video.currentTime = centerTime;
    }
  };

  const handleCanPlay = () => {
    const video = videoRef.current;
    if (video && video.duration && video.currentTime === 0) {
      video.currentTime = video.duration / 2;
    }
  };

  const handleVideoError = () => {
    // If local video fails to load, gracefully switch to CloudFront remote source
    if (videoSrc !== FALLBACK_VIDEO_URL) {
      setVideoSrc(FALLBACK_VIDEO_URL);
    }
  };

  // Compute ambient opacity based on scroll depth:
  // 100% in hero, fading gently as user scrolls into the case studies section
  const heroFadeFactor = Math.max(0, 1 - scrollY / 650);

  return (
    <div
      id="background-video-wrapper"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden transition-opacity duration-300"
      style={{ opacity: heroFadeFactor }}
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        id="background-scrub-video"
        key={videoSrc}
        src={videoSrc}
        muted
        playsInline
        preload="auto"
        onSeeked={handleSeeked}
        onLoadedMetadata={handleLoadedMetadata}
        onCanPlay={handleCanPlay}
        onError={handleVideoError}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: '70% center',
          pointerEvents: 'none',
        }}
      />
      {/* Vignette on left ensures text contrast while keeping the avatar clear and vibrant */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 pointer-events-none" />
    </div>
  );
};
