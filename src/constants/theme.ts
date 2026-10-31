
/**
 * TaskFlow Color Theme
 * Sage Green + Ivory
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#263F36',
    background: '#F7F5ED',
    backgroundElement: '#DCE7DC',
    backgroundSelected: '#C5D8C8',
    textSecondary: '#718078',
  },
  dark: {
    text: '#F7F5ED',
    background: '#1F3029',
    backgroundElement: '#315C50',
    backgroundSelected: '#426D5E',
    textSecondary: '#C0CEC3',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({
  ios: 50,
  android: 80,
}) ?? 0;

export const MaxContentWidth = 800;
