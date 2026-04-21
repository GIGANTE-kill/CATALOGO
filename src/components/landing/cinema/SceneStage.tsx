import type { Scene } from "./scenes";

type Props = {
  scenes: Scene[];
  activeScene: number;
};

export function SceneStage({ scenes, activeScene }: Props) {
  const current = scenes[activeScene];

  return (
    <div className="relative z-10 max-w-[1600px] w-full mx-auto px-5 sm:px-8 grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-2 md:gap-10 items-center">
      {/* TEXT */}
      <div
        key={activeScene}
        className="relative z-20 space-y-3 md:space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 order-2 md:order-1 text-center md:text-left mt-6 md:mt-0"
      >
        <div
          className="font-condensed font-bold tracking-[0.25em] md:tracking-[0.3em] text-[10px] sm:text-xs md:text-sm uppercase"
          style={{ color: current.kickerColor }}
        >
          ◆ {current.kicker}
        </div>
        <h2 className="font-display text-white text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[0.85]">
          {current.title}
        </h2>
        <p className="text-brand-muted text-sm sm:text-base md:text-lg max-w-xl mx-auto md:mx-0 leading-relaxed pt-1 md:pt-2">
          {current.text}
        </p>
        <div className="hidden md:block">{current.extra}</div>
      </div>

      {/* AD FORMAT IMAGES */}
      <div className="flex justify-center md:justify-center items-center md:items-center relative h-[28vh] sm:h-[40vh] md:h-[110vh] order-1 md:order-2 pt-0 md:pt-0 -mb-2 md:mb-0">
        <div
          className="absolute bottom-2 md:bottom-10 left-1/2 -translate-x-1/2 w-[280px] md:w-[500px] h-[70px] md:h-[140px] rounded-full transition-all duration-700 opacity-70 md:opacity-100 z-0"
          style={{ background: current.glow, filter: "blur(55px)" }}
        />
        {scenes.map((s, i) => (
          <div
            key={i}
            className="absolute inset-0 flex justify-center items-end md:items-center transition-all duration-700 ease-out z-10 pb-2 md:pb-0 md:pt-0"
            style={{
              opacity: i === activeScene ? 1 : 0,
              transform: `rotate(${i === activeScene ? s.rotate : 0}deg) scale(${i === activeScene ? s.scale : 0.92})`,
              pointerEvents: i === activeScene ? "auto" : "none",
            }}
          >
            <img
              src={s.image}
              alt={s.imageAlt}
              className="max-h-[38vh] sm:max-h-[52vh] md:max-h-[110vh] w-auto object-contain drop-shadow-2xl"
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
