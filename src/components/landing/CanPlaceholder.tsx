import capaCatalogo from "@/assets/capa-catalogo.png";

type Props = { className?: string; variant?: "tradicional" | "tropical" };

/** Catálogo DSR cover image (replaces can in hero) */
export function CanPlaceholder({ className }: Props) {
  return (
    <div className={className} style={{ width: 600, height: 800 }}>
      <img
        src={capaCatalogo}
        alt="Catálogo DSR — Distribuidora São Roque"
        className="w-full h-full object-contain drop-shadow-2xl"
        loading="lazy"
      />
    </div>
  );
}
