import { useEffect, useRef } from "react";

type Props = {
  className?: string;
  /** storage key to persist playback time */
  storageKey?: string;
};

/**
 * Vertical 1080x1350 (4:5) promo video.
 * - Autoplays when scrolled into view
 * - Pauses when out of view
 * - Resumes from last position on revisit (sessionStorage)
 * - object-cover to avoid black bars
 */
export function PromoVideo({ className = "", storageKey = "promo-video-time" }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Restore previous position
    const saved = sessionStorage.getItem(storageKey);
    if (saved) {
      const t = parseFloat(saved);
      if (!Number.isNaN(t) && t > 0) {
        video.currentTime = t;
      }
    }

    const handleTimeUpdate = () => {
      sessionStorage.setItem(storageKey, String(video.currentTime));
    };
    const handleEnded = () => {
      sessionStorage.removeItem(storageKey);
    };
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: [0, 0.5, 1] }
    );
    observer.observe(video);

    return () => {
      observer.disconnect();
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, [storageKey]);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-black ${className}`}
      style={{ aspectRatio: "1080 / 1350" }}
    >
      <video
        ref={videoRef}
        src="/videos/catalogo-promo.mp4?v=2"
        poster="/videos/catalogo-promo-poster.jpg?v=2"
        muted
        playsInline
        loop={false}
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
}
