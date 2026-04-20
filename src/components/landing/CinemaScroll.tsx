import { useRef } from "react";
import { scenes } from "./cinema/scenes";
import { useSnapScroll } from "./cinema/useSnapScroll";
import { SceneStage } from "./cinema/SceneStage";

export function CinemaScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const { activeScene, progress } = useSnapScroll({
    sectionRef,
    steps: scenes.length,
  });

  return (
    <section ref={sectionRef} className="relative" style={{ height: `${scenes.length * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center bg-bg">
        <div className="absolute inset-0 grid-bg opacity-50" />

        <SceneStage scenes={scenes} activeScene={activeScene} />

        {/* Scene dots */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
          {scenes.map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full border-2 transition-all"
              style={{
                background: i === activeScene ? "var(--brand-red)" : "transparent",
                borderColor: i === activeScene ? "var(--brand-red)" : "rgba(255,255,255,0.3)",
                transform: i === activeScene ? "scale(1.3)" : "scale(1)",
              }}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-bg3">
          <div
            className="h-full bg-brand-red transition-[width] duration-150"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
}
