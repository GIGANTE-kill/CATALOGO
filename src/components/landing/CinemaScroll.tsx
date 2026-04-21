import { useRef } from "react";
import { scenes } from "./cinema/scenes";
import { useSnapScroll } from "./cinema/useSnapScroll";
import { SceneStage } from "./cinema/SceneStage";

const sceneLabels = ["Página inteira", "Meia página", "Um quarto de página"];

export function CinemaScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const { activeScene, progress, scrollToScene } = useSnapScroll({
    sectionRef,
    steps: scenes.length,
  });

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${scenes.length * 100}vh` }}
      aria-label="Formatos de anúncio no catálogo DSR"
      aria-roledescription="carousel"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center bg-bg">
        <div className="absolute inset-0 grid-bg opacity-50" />

        <div
          role="region"
          aria-live="polite"
          aria-atomic="true"
          aria-label={`Cena ${activeScene + 1} de ${scenes.length}: ${sceneLabels[activeScene] ?? ""}`}
          className="contents"
        >
          <SceneStage scenes={scenes} activeScene={activeScene} />
        </div>

        {/* Scene dots — right side on desktop, bottom-center on mobile */}
        <div
          role="tablist"
          aria-label="Selecionar formato de anúncio"
          aria-orientation="vertical"
          className="absolute z-20 flex gap-3 md:flex-col md:gap-3 bottom-6 md:bottom-auto left-1/2 md:left-auto -translate-x-1/2 md:translate-x-0 md:right-8 md:top-1/2 md:-translate-y-1/2"
        >
          {scenes.map((_, i) => {
            const isActive = i === activeScene;
            const label = sceneLabels[i] ?? `Cena ${i + 1}`;
            return (
              <button
                key={i}
                type="button"
                role="tab"
                aria-label={`Ir para ${label}`}
                aria-current={isActive ? "true" : undefined}
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                onClick={() => scrollToScene(i)}
                className="w-3 h-3 rounded-full border-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:ring-brand-gold cursor-pointer"
                style={{
                  background: isActive ? "var(--brand-red)" : "transparent",
                  borderColor: isActive ? "var(--brand-red)" : "rgba(255,255,255,0.3)",
                  transform: isActive ? "scale(1.3)" : "scale(1)",
                }}
              />
            );
          })}
        </div>

        {/* Progress bar */}
        <div
          role="progressbar"
          aria-label="Progresso das cenas"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
          className="hidden md:block absolute bottom-0 left-0 right-0 h-1 bg-bg3"
        >
          <div
            className="h-full bg-brand-red transition-[width] duration-150"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
}
