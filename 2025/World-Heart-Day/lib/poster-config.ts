// Imports
import { PosterConfig, QuickMessage, PosterStyle } from "@/types/poster";

// Configuration
export const POSTER_CONFIG: PosterConfig = {
  dimensions: {
    width: 600,
    height: 800,
    mobile: {
      width: 350,
      height: 467, 
    },
    desktop: {
      width: 600,
      height: 800,
    },
  },
  colors: {
    primary: "#DC2626", 
    secondary: "#FFFFFF", 
    accent: "#F59E0B", 
    text: "#212529", 
    background: "#FEF2F2", 
  },
  fonts: {
    heading: 'Georgia, "Times New Roman", serif',
    body: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    decorative: '"Poppins", sans-serif',
  },
};

// Constants
export const QUICK_MESSAGES: QuickMessage[] = [
  {
    id: "heart-priority-pledge",
    text: "I pledge to make my heart health a priority, today and every day.",
    category: "health",
  },
  {
    id: "activity-pledge",
    text: "I commit to 30 minutes of daily physical activity for a stronger heart.",
    category: "health",
  },
  {
    id: "nutrition-pledge",
    text: "I pledge to eat more fruits and vegetables to protect my heart.",
    category: "health",
  },
  {
    id: "no-smoking-pledge",
    text: "I commit to saying NO to smoking for a healthier tomorrow.",
    category: "health",
  },
  {
    id: "checkup-pledge",
    text: "I pledge to get my blood pressure and cholesterol checked regularly.",
    category: "health",
  },
  {
    id: "water-pledge",
    text: "I choose water over sugary drinks to keep my heart healthy.",
    category: "health",
  },
  {
    id: "stress-pledge",
    text: "I pledge to manage stress through meditation, prayer, or relaxation.",
    category: "health",
  },
  {
    id: "sleep-pledge",
    text: "I commit to 7–8 hours of quality sleep for better heart health.",
    category: "health",
  },
];

// Constants
export const CHARACTER_LIMITS = {
  name: {
    max: 20,
    warning: 16, 
  },
  designation: {
    max: 25,
    warning: 20,
  },
  message: {
    max: 150,
    warning: 120,
  },
};
export const CANVAS_SETTINGS = {
  pixelRatio: typeof window !== "undefined" ? window.devicePixelRatio || 1 : 2,
  maxCanvasSize: 2048, 
  imageQuality: {
    mobile: 0.8,
    desktop: 0.95,
  },
  exportFormats: {
    whatsapp: { width: 350, height: 467 },
    instagram: { width: 1080, height: 1080 },
    story: { width: 1080, height: 1920 },
    facebook: { width: 1200, height: 630 },
  },
};
export const TOUCH_SETTINGS = {
  minTouchTarget: 44, 
  swipeThreshold: 50,
  tapThreshold: 10,
  longPressDelay: 500,
};

// Constants
export const POSTER_STYLES: PosterStyle[] = [
  {
    id: "world-heart-day",
    name: "World Heart Day",
    description: "Heart-themed design",
    thumbnail: "❤️",
    category: "health",
    config: {
      colors: {
        primary: "#DC2626", 
        secondary: "#FFFFFF",
        accent: "#F59E0B", 
        text: "#1F2937",
        background: "gradient", 
        headerGradient: ["#E0F2FE", "#0EA5E9"],
        decorative: "rgba(220, 38, 38, 0.3)", 
      },
      fonts: {
        heading: "Arial, sans-serif",
        body: "Arial, sans-serif",
        decorative: "Arial, sans-serif",
      },
      layout: {
        headerHeight: 150,
        profileRadius: 75,
        profileY: 380,
        nameY: 520,
        designationY: 555,
        messageY: 600,
        messageHeight: 120,
      },
      decorations: {
        backgroundPattern: false,
        stars: false,
        borders: true,
        geometric: false,
        traditional: false,
      },
    },
  },
];
export const DEFAULT_STYLE = POSTER_STYLES[0];
