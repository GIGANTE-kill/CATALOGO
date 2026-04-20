import { RefObject, useEffect, useRef, useState } from "react";

type Options = {
  sectionRef: RefObject<HTMLElement | null>;
  steps: number;
  lockMs?: number;
};

export function useSnapScroll({ sectionRef, steps, lockMs = 700 }: Options) {
  const [activeScene, setActiveScene] = useState(0);
  const [progress, setProgress] = useState(0);
  const snapLockRef = useRef(false);
  const snapTimeoutRef = useRef<number | null>(null);

  // Compute geometry helpers
  const getGeometry = () => {
    const el = sectionRef.current;
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;
    const sectionEnd = sectionTop + el.offsetHeight - window.innerHeight;
    const currentY = window.scrollY;
    const insideStickyRange = currentY >= sectionTop && currentY <= sectionEnd;
    const currentStep = Math.min(
      steps - 1,
      Math.max(0, Math.round((currentY - sectionTop) / Math.max(window.innerHeight, 1))),
    );
    return { el, sectionTop, sectionEnd, currentY, insideStickyRange, currentStep };
  };

  const snapTo = (nextStep: number, sectionTop: number) => {
    if (nextStep < 0 || nextStep > steps - 1) return;
    if (snapLockRef.current) return;
    snapLockRef.current = true;
    window.scrollTo({
      top: sectionTop + nextStep * window.innerHeight,
      behavior: "smooth",
    });
    if (snapTimeoutRef.current !== null) {
      window.clearTimeout(snapTimeoutRef.current);
    }
    snapTimeoutRef.current = window.setTimeout(() => {
      snapLockRef.current = false;
      snapTimeoutRef.current = null;
    }, lockMs);
  };

  // Track scene + progress on scroll
  useEffect(() => {
    let rafId: number;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const el = sectionRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const total = el.offsetHeight - window.innerHeight;
        const scrolled = Math.min(Math.max(-rect.top, 0), total);
        const p = total > 0 ? scrolled / total : 0;
        setProgress(p);
        const idx = Math.min(
          steps - 1,
          Math.max(0, Math.round(scrolled / Math.max(window.innerHeight, 1))),
        );
        setActiveScene(idx);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [sectionRef, steps]);

  // Wheel + touch + keyboard snapping
  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      const g = getGeometry();
      if (!g || !g.insideStickyRange || event.deltaY === 0) return;
      const nextStep = event.deltaY > 0 ? g.currentStep + 1 : g.currentStep - 1;
      if (nextStep < 0 || nextStep > steps - 1) return;
      event.preventDefault();
      snapTo(nextStep, g.sectionTop);
    };

    let touchStartY = 0;
    let touchStartX = 0;
    let touchActive = false;

    const onTouchStart = (event: TouchEvent) => {
      const g = getGeometry();
      if (!g || !g.insideStickyRange) return;
      touchActive = true;
      touchStartY = event.touches[0].clientY;
      touchStartX = event.touches[0].clientX;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!touchActive) return;
      const deltaY = touchStartY - event.touches[0].clientY;
      const deltaX = touchStartX - event.touches[0].clientX;
      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 10) {
        event.preventDefault();
      }
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (!touchActive) return;
      touchActive = false;
      const touch = event.changedTouches[0];
      const deltaY = touchStartY - touch.clientY;
      const deltaX = touchStartX - touch.clientX;
      if (Math.abs(deltaY) < 50 || Math.abs(deltaX) > Math.abs(deltaY)) return;
      const g = getGeometry();
      if (!g || !g.insideStickyRange) return;
      const nextStep = deltaY > 0 ? g.currentStep + 1 : g.currentStep - 1;
      snapTo(nextStep, g.sectionTop);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      const g = getGeometry();
      if (!g || !g.insideStickyRange) return;

      let nextStep: number | null = null;
      switch (event.key) {
        case "ArrowDown":
        case "PageDown":
        case " ":
          nextStep = g.currentStep + 1;
          break;
        case "ArrowUp":
        case "PageUp":
          nextStep = g.currentStep - 1;
          break;
        case "Home":
          nextStep = 0;
          break;
        case "End":
          nextStep = steps - 1;
          break;
        default:
          return;
      }
      if (nextStep === null || nextStep < 0 || nextStep > steps - 1) return;
      if (nextStep === g.currentStep) return;
      event.preventDefault();
      snapTo(nextStep, g.sectionTop);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
      if (snapTimeoutRef.current !== null) {
        window.clearTimeout(snapTimeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionRef, steps, lockMs]);

  return { activeScene, progress };
}
