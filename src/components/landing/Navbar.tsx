import logoDsr from "@/assets/logo-dsr.png";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[200] px-9 py-3.5 flex items-center justify-between backdrop-blur-xl border-b border-brand-blue/20" style={{ background: "rgba(7,17,31,0.92)" }}>
      <div className="flex items-center gap-3.5">
        <img src={logoDsr} alt="Distribuidora São Roque" className="h-14 md:h-16 object-contain" />
      </div>
      <a
        href="#cta"
        className="font-bold text-xs bg-brand-red text-white px-5 py-2.5 rounded hover:-translate-y-px transition-all"
        style={{ textDecoration: "none" }}
      >
        VER PROPOSTA
      </a>
    </nav>
  );
}
