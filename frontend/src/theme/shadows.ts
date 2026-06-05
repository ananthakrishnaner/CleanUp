import { Platform } from 'react-native';

export const shadows = {
  e0: Platform.select({
    web: { boxShadow: 'none' },
    default: { elevation: 0 },
  }),
  e1: Platform.select({
    web: { boxShadow: '0 1px 2px rgba(15,23,42,0.06)' },
    default: {
      shadowColor: '#0F172A',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.06,
      shadowRadius: 2,
      elevation: 2,
    },
  }),
  e2: Platform.select({
    web: { boxShadow: '0 4px 12px rgba(15,23,42,0.08)' },
    default: {
      shadowColor: '#0F172A',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 4,
    },
  }),
  e3: Platform.select({
    web: { boxShadow: '0 12px 32px rgba(15,23,42,0.12)' },
    default: {
      shadowColor: '#0F172A',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.12,
      shadowRadius: 32,
      elevation: 8,
    },
  }),
};
