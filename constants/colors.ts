
export const COLORS = {
  // Base colors
  background: "#c0d5ff",
  foreground: "#171717",
  backgroundDark: "#9cbdff",

  // Light theme backgrounds
  backgroundLight1: "#9cbdff",
  backgroundLight2: "#79a3f6",

  // Dark theme backgrounds
  backgroundDark1: "#1e2939",
  backgroundDark2: "#101828",

  // Text colors
  textLight: "#222222",
  textDark: "#f5f5f5",

  // Theme-specific grouped colors
  light: {
    background: "#c0d5ff",
    background1: "#9cbdff",
    background2: "#79a3f6",
    text: "#222222",
    foreground: "#171717",
  },
  dark: {
    background: "#9cbdff",
    background1: "#1e2939",
    background2: "#101828",
    text: "#f5f5f5",
    foreground: "#171717",
  },
} as const;

// Type for theme keys
export type Theme = "light" | "dark";

// Helper function to get theme colors
export const getThemeColors = (theme: Theme) => COLORS[theme];