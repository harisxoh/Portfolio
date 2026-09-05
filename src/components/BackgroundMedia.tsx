import { useRef, useEffect, useCallback } from 'react';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4';
const FADE_DURATION = 500;
const FADE_OUT_THRESHOLD = 0.55;

export default function BackgroundMedia() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fadingOutRef = useRef(false);
  const animFrameRef = useRef<number>(0);

  const cancelFade = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = 0;
    }
  }, []);

  /**
   * Animate the video element's opacity from its current value to `target`
   * over `duration` ms using requestAnimationFrame.  Each new call cancels
   * any running animation so competing fades never stack.
   */
  const fadeToOpacity = useCallback(
    (target: number, duration: number, onComplete?: () => void) => {
      cancelFade();
      const video = videoRef.current;
      if (!video) return;

      const startOpacity = parseFloat(video.style.opacity || '0');
      const startTime = performance.now();

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        video.style.opacity = String(
          startOpacity + (target - startOpacity) * progress,
        );
        if (progress < 1) {
          animFrameRef.current = requestAnimationFrame(step);
        } else {
          animFrameRef.current = 0;
          onComplete?.();
        }
      };

      animFrameRef.current = requestAnimationFrame(step);
    },
    [cancelFade],
  );

  /* Fade in when the video has enough data to play. */
  const handleCanPlay = useCallback(() => {
    fadeToOpacity(1, FADE_DURATION);
  }, [fadeToOpacity]);

  /* Start fading out when ≤0.55 s remain. fadingOutRef prevents re-entry. */
  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video || fadingOutRef.current) return;
    const remaining = video.duration - video.currentTime;
    if (remaining <= FADE_OUT_THRESHOLD && remaining > 0) {
      fadingOutRef.current = true;
      fadeToOpacity(0, FADE_DURATION);
    }
  }, [fadeToOpacity]);

  /**
   * When the video ends, snap to 0 opacity, wait 100 ms, reset to the
   * beginning, play, then fade back in for a seamless loop.
   */
  const handleEnded = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    cancelFade();
    video.style.opacity = '0';
    setTimeout(() => {
      video.currentTime = 0;
      video.play();
      fadingOutRef.current = false;
      fadeToOpacity(1, FADE_DURATION);
    }, 100);
  }, [cancelFade, fadeToOpacity]);

  /* Ensure the video is invisible until the first fade-in. */
  useEffect(() => {
    const video = videoRef.current;
    if (video) video.style.opacity = '0';
    return () => cancelFade();
  }, [cancelFade]);

  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden bg-black">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover translate-y-[17%] blur-[2px] brightness-75"
        style={{ opacity: 0 }}
        onCanPlay={handleCanPlay}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      >
        <source src={VIDEO_URL} type="video/mp4" />
      </video>

      {/* Cinematic gradient overlay — darker to push focus onto UI */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
      {/* Radial vignette for extra depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.6)_100%)]" />
    </div>
  );
}
