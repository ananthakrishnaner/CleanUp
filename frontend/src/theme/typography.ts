export const typography = {
  family: {
    heading: '"Plus Jakarta Sans", system-ui, sans-serif',
    body: '"Inter", system-ui, sans-serif',
    mono: '"JetBrains Mono", SFMono, monospace',
  },
  sizes: {
    // Display sizes for hero sections and important headlines
    'hero': { fontSize: 48, lineHeight: 1.2, fontWeight: '700' as const, letterSpacing: '-0.02em' },
    'display.xl': { fontSize: 40, lineHeight: 1.2, fontWeight: '700' as const, letterSpacing: '-0.02em' },
    'display.lg': { fontSize: 32, lineHeight: 1.25, fontWeight: '700' as const, letterSpacing: '-0.01em' },

    // Heading sizes
    'heading.xl': { fontSize: 28, lineHeight: 1.3, fontWeight: '700' as const },
    'heading.lg': { fontSize: 24, lineHeight: 1.35, fontWeight: '600' as const },
    'heading.md': { fontSize: 20, lineHeight: 1.4, fontWeight: '600' as const },
    'heading.sm': { fontSize: 18, lineHeight: 1.45, fontWeight: '600' as const },

    // Body sizes
    'body.lg': { fontSize: 16, lineHeight: 1.6, fontWeight: '400' as const },
    'body.md': { fontSize: 15, lineHeight: 1.5, fontWeight: '400' as const },
    'body.sm': { fontSize: 14, lineHeight: 1.5, fontWeight: '400' as const },
    'body.xs': { fontSize: 13, lineHeight: 1.4, fontWeight: '400' as const },

    // Label and caption sizes
    'label.lg': { fontSize: 14, lineHeight: 1.4, fontWeight: '600' as const, letterSpacing: 0.5 },
    'label.md': { fontSize: 13, lineHeight: 1.4, fontWeight: '600' as const, letterSpacing: 0.4 },
    'label.sm': { fontSize: 12, lineHeight: 1.4, fontWeight: '600' as const, letterSpacing: 0.3 },

    'caption': { fontSize: 12, lineHeight: 1.4, fontWeight: '500' as const },
    'caption.xs': { fontSize: 11, lineHeight: 1.3, fontWeight: '500' as const },

    // Special sizes
    'button': { fontSize: 15, lineHeight: 1.2, fontWeight: '600' as const, letterSpacing: 0.02 },
    'button.sm': { fontSize: 14, lineHeight: 1.2, fontWeight: '600' as const, letterSpacing: 0.02 },

    // Monospace sizes
    'mono.md': { fontSize: 14, lineHeight: 1.5, fontFamily: '"JetBrains Mono", SFMono, monospace' },
    'mono.sm': { fontSize: 13, lineHeight: 1.4, fontFamily: '"JetBrains Mono", SFMono, monospace' },
  },
  // Common text transformations
  transform: {
    uppercase: { textTransform: 'uppercase' },
    capitalize: { textTransform: 'capitalize' },
    lowercase: { textTransform: 'lowercase' },
  },
};
