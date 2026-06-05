export const typography = {
  family: {
    heading: '"Plus Jakarta Sans", system-ui, sans-serif',
    body: '"Inter", system-ui, sans-serif',
  },
  sizes: {
    'display.xl': { fontSize: 40, lineHeight: 48, fontWeight: '800' as const },
    'display.lg': { fontSize: 32, lineHeight: 40, fontWeight: '700' as const },
    'heading.xl': { fontSize: 28, lineHeight: 36, fontWeight: '700' as const },
    'heading.lg': { fontSize: 22, lineHeight: 30, fontWeight: '600' as const },
    'heading.md': { fontSize: 18, lineHeight: 26, fontWeight: '600' as const },
    'body.lg': { fontSize: 16, lineHeight: 24, fontWeight: '400' as const },
    'body.md': { fontSize: 14, lineHeight: 22, fontWeight: '400' as const },
    'body.sm': { fontSize: 13, lineHeight: 20, fontWeight: '400' as const },
    'label.lg': { fontSize: 14, lineHeight: 20, fontWeight: '600' as const, letterSpacing: 0.56 },
    'label.md': { fontSize: 12, lineHeight: 16, fontWeight: '600' as const },
    'caption': { fontSize: 12, lineHeight: 18, fontWeight: '500' as const },
  },
};
