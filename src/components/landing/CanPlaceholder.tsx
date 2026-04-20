type Props = { className?: string };

/** Placeholder Baly can — user will swap with real image */
export function CanPlaceholder({ className }: Props) {
  return (
    <div className={className} style={{ width: 220, height: 460 }}>
      <div
        className="relative w-full h-full rounded-[40px] overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #1C3F8F 0%, #07111F 50%, #1C3F8F 100%)",
          boxShadow: "inset 8px 0 30px rgba(0,0,0,0.5), inset -8px 0 30px rgba(255,255,255,0.1)",
        }}
      >
        <div className="absolute top-6 left-1/2 -translate-x-1/2 font-display text-brand-gold text-5xl tracking-wider">
          BALY
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-condensed font-bold text-sm tracking-[0.3em] rotate-90">
          ENERGY DRINK
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-condensed text-xs text-white/70">
          473 ml
        </div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.2) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.3) 100%)",
          }}
        />
      </div>
    </div>
  );
}
