export const colors = {
  white: '#FFFFFF',
  black: '#000000',
  primary: '#007F5F',
  secondary: '#00BFA5',
  purple: '#C084fC',
  pink: '#EC4899',
  red: '#EF4444',
  yellow: '#FACC15',
  orange: '#F97316',
  indigo: '#6366F1',
  gray: '#BDC3C7',
  error: '#B71C1C',
  success: '#2ECC71',
  warning: '#F1C40F',
  darkBackground: '#121212',
  darkCard: '#1E1E1E',
  lightCard: '#E0E0E0',
  textGray: '#666666',
  successLight: '#E8F5E9',
  successDark: '#1B5E20',
  errorLight: '#FFEBEE',
  warningLight: '#FFF3E0',
  secondaryText: '#9CA3AF',
  lightText: '#2C3E50',
  lightBackground: '#E8E8E8',
  lightBorder: '#D0D0D0',
  darkBorder: '#2A2A2A',
  pro: '#B8860B',
  darkPro: '#8B4513',
  // Premium modal specific colors
  modalCard: '#F8F9FA',
  premiumOrange: '#FF6B35',
  premiumGreen: '#10B981',
  premiumPurple: '#8B5CF6',
  premiumPink: '#EC4899',
  gradientStart: '#8B5CF6',
  gradientEnd: '#EC4899',
  lightPurple: '#E9D5FF',
  disclaimerGray: '#6B7280',
};

export const lightColors = {
  background: colors.lightBackground,
  text: colors.lightText,
  card: colors.lightCard,
  border: colors.lightBorder,
  ...colors,
};

export const darkColors = {
  background: colors.darkBackground,
  text: colors.white,
  card: colors.darkCard,
  border: colors.darkBorder,
  ...colors,
};

export const BOARD_COLOR = colors.premiumPink;
