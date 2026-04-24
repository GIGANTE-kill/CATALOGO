
type Props = { className?: string; image?: string };

/** Catálogo cover image (replaces can in hero) */
export function CanPlaceholder({ className, image }: Props) {
  return (
    <div className={`${className ?? ""} w-full max-w-[600px] aspect-[3/4] mx-auto`}>
      <img
        src={image ?? "/fornecedores/baly/capa.png"}
        alt="Catálogo DSR — Distribuidora São Roque"
        className="w-full h-full object-contain drop-shadow-2xl"
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />
    </div>
  );
}
