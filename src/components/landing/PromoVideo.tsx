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
 * - Tenta autoplay COM SOM na 1ª reprodução; se o browser bloquear, fica mudo
 *   com um badge pulsante "Toque para ouvir" para sinalizar que é vídeo.
 * - A partir do 2º loop, muta automaticamente (usuário pode reativar a qualquer momento).
 * - Pausa quando sai da viewport e retoma posição entre visitas (sessionStorage).
 */
export function PromoVideo({ className = "", storageKey = "promo-video-time" }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const loopCountRef = useRef(0);
  const [muted, setMuted] = useState(false); // tenta com som primeiro
  const [needsTapToHear, setNeedsTapToHear] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  // Adia o mount do <video> até estar próximo da viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShouldLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    const video = videoRef.current;
    if (!video) return;

    const saved = sessionStorage.getItem(storageKey);
    if (saved) {
      const t = parseFloat(saved);
      if (!Number.isNaN(t) && t > 0) video.currentTime = t;
    }

    const handleTimeUpdate = () => {
      sessionStorage.setItem(storageKey, String(video.currentTime));
    };
    // No loop (sem 'ended'), detectamos volta ao início via seeked + currentTime baixo
    const handleSeeked = () => {
      if (video.currentTime < 0.5 && !video.paused) {
        loopCountRef.current += 1;
        if (loopCountRef.current >= 1) {
          // 2º play em diante: muta
          video.muted = true;
          setMuted(true);
          setNeedsTapToHear(false);
        }
      }
    };
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("seeked", handleSeeked);

    const tryPlay = async () => {
      // Tenta primeiro COM som
      try {
        video.muted = false;
        await video.play();
        setMuted(false);
        setNeedsTapToHear(false);
      } catch {
        // Browser bloqueou autoplay com áudio → cai pra muted
        try {
          video.muted = true;
          setMuted(true);
          setNeedsTapToHear(true);
          await video.play();
        } catch {
          /* noop */
        }
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            tryPlay();
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
      video.removeEventListener("seeked", handleSeeked);
    };
  }, [storageKey, shouldLoad]);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const next = !muted;
    video.muted = next;
    setMuted(next);
    setNeedsTapToHear(false);
    if (!next) {
      video.play().catch(() => {});
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-black ${className}`}
      style={{
        aspectRatio: "1080 / 1350",
        backgroundImage: `url(${promoPosterUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {shouldLoad && (
        <video
          ref={videoRef}
          src={promoVideoUrl}
          poster={promoPosterUrl}
          muted={muted}
          playsInline
          loop
          preload="metadata"
          onClick={() => {
            if (muted) toggleMute();
          }}
          className="absolute inset-0 w-full h-full object-cover cursor-pointer"
        />
      )}

      {/* Badge "Toque para ouvir" quando autoplay com som foi bloqueado */}
      {needsTapToHear && muted && (
        <button
          type="button"
          onClick={toggleMute}
          className="absolute top-3 left-3 z-10 flex items-center gap-2 px-3 py-2 rounded-full bg-brand-red text-white text-xs font-bold tracking-wider uppercase shadow-lg animate-pulse"
        >
          <Volume2 className="w-4 h-4" />
          Toque para ouvir
        </button>
      )}

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
