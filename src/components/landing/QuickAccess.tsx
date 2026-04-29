import { useState, useEffect } from "react";

export function QuickAccess() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after 500px of scroll
      setVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      className={`fixed bottom-8 right-8 z-[100] transition-all duration-500 transform ${
        visible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
      }`}
    >
      <a
        href="#pacotes"
        className="group relative flex items-center justify-center gap-3 px-8 py-5 bg-brand-red text-white border-2 border-white/20 rounded-lg shadow-[0_20px_50px_rgba(224,30,43,0.6)] hover:scale-105 transition-all duration-300"
      >
        <span className="relative font-display text-sm tracking-[0.2em] text-white transition-colors font-black">
          💰 VER INVESTIMENTOS
        </span>
      </a>
    </div>
  );
}
