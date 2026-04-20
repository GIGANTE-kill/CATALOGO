import balyCan from "@/assets/baly-tradicional.png";

type Props = { className?: string; variant?: "tradicional" | "tropical" };

/** Baly can image */
export function CanPlaceholder({ className }: Props) {
  return (
    <div className={className} style={{ width: 220, height: 460 }}>
      <img
        src={balyCan}
        alt="Lata Baly Energy Drink 473ml"
        className="w-full h-full object-contain drop-shadow-2xl"
        loading="lazy"
      />
    </div>
  );
}
