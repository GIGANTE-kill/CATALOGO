import type { Scene } from "./scenes";

type Props = {
  scenes: Scene[];
  activeScene: number;
};

export function SceneStage({ scenes, activeScene }: Props) {
  const current = scenes[activeScene];

  return (
    <div className="relative z-10 max-w-[1400px] w-full mx-auto px-8 grid md:grid-cols-2 gap-12 items-center">
      {/* TEXT */}
      <div key={activeScene} className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div
          className="font-condensed font-bold tracking-[0.3em] text-sm uppercase"
          style={{ color: current.kickerColor }}
        >
          ◆ {current.kicker}
        </div>
        <h2 className="font-display text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.85]">
          {current.title}
        </h2>
        <p className="text-brand-muted text-lg max-w-xl leading-relaxed pt-2">
          {current.text}
        </p>
        {current.extra}
      </div>

      {/* AD FORMAT IMAGES (all preloaded, fade between) */}
      <div className="hidden md:flex justify-center items-center relative h-[91vh]">
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[400px] h-[120px] rounded-full transition-all duration-700"
          style={{ background: current.glow, filter: "blur(80px)" }}
        />
        {scenes.map((s, i) => (
          <div
            key={i}
            className="absolute inset-0 flex justify-center items-center transition-all duration-700 ease-out"
            style={{
              opacity: i === activeScene ? 1 : 0,
              transform: `rotate(${i === activeScene ? s.rotate : 0}deg) scale(${i === activeScene ? s.scale : 0.92})`,
              pointerEvents: i === activeScene ? "auto" : "none",
            }}
          >
            <img
              src={s.image}
              alt={s.imageAlt}
              className="max-h-[91vh] w-auto object-contain drop-shadow-2xl"
              loading="eager"
              decoding="async"
              fetchPriority={i === 0 ? "high" : "auto"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
