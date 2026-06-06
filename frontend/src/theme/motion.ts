// Animation durations in milliseconds
export const durations = {
  instant: 80,    // For micro-interactions
  fast: 160,      // For simple transitions
  base: 240,      // For standard transitions
  slow: 360,      // For complex animations
  slower: 480,    // For large UI changes
};

// Easing functions
export const easing = {
  // Standard ease-in-out
  standard: 'cubic-bezier(0.2, 0.0, 0.0, 1.0)',

  // Ease out (slows down at the end)
  out: 'cubic-bezier(0.0, 0.0, 0.2, 1)',

  // Ease in (starts slow, speeds up)
  in: 'cubic-bezier(0.4, 0, 1, 1)',

  // Ease-in-out
  inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',

  // Spring animations (bouncy)
  spring: {
    gentle: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)',
    medium: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    strong: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
  },

  // Custom for UI elements
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',

  // Special animations
  fade: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)',
  slide: 'cubic-bezier(0.4, 0, 0.2, 1)',
};

// Animation presets
export const presets = {
  // Fade in/out
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: {
      duration: durations.base,
      ease: easing.fade,
    },
  },

  // Slide up from bottom
  slideUp: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: {
      duration: durations.fast,
      ease: easing.slide,
    },
  },

  // Scale up with bounce
  scaleIn: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: {
      duration: durations.slow,
      ease: easing.spring.medium,
    },
  },

  // Stagger animation for lists
  stagger: {
    delay: durations.instant,
    staggerChildren: durations.instant,
  },
};