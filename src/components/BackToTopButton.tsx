import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

const SHOW_AFTER_PX = 320;

export function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let currentVisibility = window.scrollY > SHOW_AFTER_PX;
    const updateVisibility = () => {
      const nextVisibility = window.scrollY > SHOW_AFTER_PX;

      if (nextVisibility !== currentVisibility) {
        currentVisibility = nextVisibility;
        setIsVisible(nextVisibility);
      }
    };

    setIsVisible(currentVisibility);
    window.addEventListener('scroll', updateVisibility, { passive: true });

    return () => window.removeEventListener('scroll', updateVisibility);
  }, []);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <button
      aria-hidden={!isVisible}
      aria-label="Back to top"
      className={`back-to-top ${isVisible ? 'is-visible' : ''}`}
      data-liquid-hover="control"
      onClick={scrollToTop}
      tabIndex={isVisible ? 0 : -1}
      type="button"
    >
      <ArrowUp size={21} aria-hidden="true" />
    </button>
  );
}
