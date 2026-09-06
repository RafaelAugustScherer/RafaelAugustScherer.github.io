export const initScrollReveal = (): (() => void) => {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>('[data-aos]')
  );
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('aos-animate'));
    return () => {};
  }

  elements.forEach((el) => {
    const duration = el.getAttribute('data-aos-duration');
    if (duration) el.style.transitionDuration = `${duration}ms`;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('aos-animate');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );

  elements.forEach((el) => observer.observe(el));

  return () => observer.disconnect();
};
