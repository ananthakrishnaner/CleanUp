import { Platform } from 'react-native';

export const shadows = {
  // No shadow
  none: Platform.select({
    web: { boxShadow: 'none' },
    default: { elevation: 0 },
  }),

  // Subtle shadows
  sm: Platform.select({
    web: { boxShadow: '0 1px 2px rgba(15,23,42,0.05)' },
    default: {
      shadowColor: '#0F172A',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
  }),

  // Default shadow for cards
  base: Platform.select({
    web: { boxShadow: '0 1px 3px rgba(15,23,42,0.1), 0 1px 2px rgba(15,23,42,0.06)' },
    default: {
      shadowColor: '#0F172A',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
  }),

  // Medium elevation
  md: Platform.select({
    web: { boxShadow: '0 4px 6px rgba(15,23,42,0.07), 0 1px 3px rgba(15,23,42,0.04)' },
    default: {
      shadowColor: '#0F172A',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.07,
      shadowRadius: 6,
      elevation: 4,
    },
  }),

  // Elevated shadow for floating elements
  lg: Platform.select({
    web: { boxShadow: '0 10px 15px rgba(15,23,42,0.1), 0 4px 6px rgba(15,23,42,0.05)' },
    default: {
      shadowColor: '#0F172A',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.1,
      shadowRadius: 15,
      elevation: 8,
    },
  }),

  // Large shadow for modals and popovers
  xl: Platform.select({
    web: { boxShadow: '0 20px 25px rgba(15,23,42,0.15), 0 10px 10px rgba(15,23,42,0.1)' },
    default: {
      shadowColor: '#0F172A',
      shadowOffset: { width: 0, height: 20 },
      shadowOpacity: 0.15,
      shadowRadius: 25,
      elevation: 12,
    },
  }),

  // Extra large for overlays
  '2xl': Platform.select({
    web: { boxShadow: '0 25px 50px rgba(15,23,42,0.25)' },
    default: {
      shadowColor: '#0F172A',
      shadowOffset: { width: 0, height: 25 },
      shadowOpacity: 0.25,
      shadowRadius: 50,
      elevation: 16,
    },
  }),

  // Special shadow for raised elements
  raised: Platform.select({
    web: {
      boxShadow: '0 10px 40px rgba(37, 99, 235, 0.15)',
      borderColor: 'rgba(37, 99, 235, 0.1)',
      borderWidth: 1,
    },
    default: {
      shadowColor: '#2563EB',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.15,
      shadowRadius: 40,
      elevation: 12,
      borderColor: 'rgba(37, 99, 235, 0.1)',
      borderWidth: 1,
    },
  }),

  // Brand gradient shadow
  brand: Platform.select({
    web: {
      boxShadow: '0 10px 30px rgba(43, 163, 236, 0.2)',
      backgroundImage: 'linear-gradient(135deg, rgba(43, 163, 236, 0.1) 0%, rgba(92, 208, 179, 0.1) 100%)',
    },
    default: {
      shadowColor: '#2BA3EC',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.2,
      shadowRadius: 30,
      elevation: 12,
    },
  }),
};
