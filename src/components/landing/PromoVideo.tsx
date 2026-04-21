import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import promoVideoUrl from "@/assets/videos/catalogo-promo.mp4";
import promoPosterUrl from "@/assets/videos/catalogo-promo-poster.jpg";

type Props = {
  className?: string;
  storageKey?: string;
};

/**
 * Vertical 1080x1350 (4:5) promo video.
 * - Autoplays muted when scrolled into view (browser policy)
 * - User can tap the speaker icon to unmute
 * - Pauses when out of view
 * - Resumes from last position on revisit (sessionStorage)
 */
export function PromoVideo({ className = "", storageKey = "promo-video-time" }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

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

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const next = !muted;
    video.muted = next;
    setMuted(next);
    if (!next) {
      // User intent: ensure it's playing when unmuted
      video.play().catch(() => {});
    }
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-black ${className}`}
      style={{ aspectRatio: "1080 / 1350" }}
    >
      <video
        ref={videoRef}
        src={promoVideoUrl}
        poster={promoPosterUrl}
        muted={muted}
        playsInline
        loop
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <button
        type="button"
        onClick={toggleMute}
        aria-label={muted ? "Ativar som" : "Desativar som"}
        className="absolute bottom-3 right-3 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-sm border border-white/20 text-white hover:bg-black/80 transition"
      >
        {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>
    </div>
  );
}
