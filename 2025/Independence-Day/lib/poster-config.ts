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
    primary: "#01411C", 
    secondary: "#FFFFFF", 
    accent: "#FFD700", 
    text: "#212529", 
    background: "#F8F9FA", 
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
    id: "proud-pakistani",
    text: "I am proud to be a Pakistani",
    category: "patriotic",
  },
  {
    id: "respect-protect",
    text: "I will respect and protect the dignity, sovereignty and progress of my country",
    category: "patriotic",
  },
  {
    id: "stand-against",
    text: "I will stand against extremism, hatred and corruption",
    category: "patriotic",
  },
  {
    id: "contribute",
    text: "I will contribute to the development of Pakistan through education, service and honesty",
    category: "patriotic",
  },
  {
    id: "one-nation",
    text: "Pakistan lives in every heart. Let's rise as one nation under one flag.",
    category: "patriotic",
  },
  {
    id: "happy-independence",
    text: "Happy Independence Day, Pakistan!",
    category: "personal",
  },
  {
    id: "freedom-blessing",
    text: "Freedom is a blessing, and Pakistan is our pride.",
    category: "personal",
  },
  {
    id: "jashn-mubarak",
    text: "Jashn-e-Azadi Mubarak ho!",
    category: "personal",
  },
  {
    id: "azadi-pride",
    text: "Azadi ka din hai – let's celebrate it with pride!",
    category: "personal",
  },
  {
    id: "doctor-pledge",
    text: "As a doctor, I pledge to serve this nation with compassion, integrity, and care.",
    category: "medical",
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
    id: "style1",
    name: "Style 1",
    description: "Custom background",
    thumbnail: "1️⃣",
    category: "modern",
    config: {
      colors: {
        primary: "#FFFFFF", 
        secondary: "#FFFFFF",
        accent: "#FFD700",
        text: "#FFFFFF", 
        background: "#F8F9FA", 
        headerGradient: ["#01411C", "#2d5a3d"],
        decorative: "rgba(255, 255, 255, 0.3)", 
      },
      fonts: {
        heading: 'Georgia, "Times New Roman", serif',
        body: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        decorative: '"Poppins", sans-serif',
      },
      layout: {
        headerHeight: 0, 
        profileRadius: 60, 
        profileY: 320, 
        nameY: 420, 
        designationY: 450, 
        messageY: 490, 
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
  {
    id: "style2",
    name: "Style 2",
    description: "Bright green modern",
    thumbnail: "2️⃣",
    category: "modern",
    config: {
      colors: {
        primary: "#10B981", 
        secondary: "#FFFFFF",
        accent: "#34D399", 
        text: "#1F2937",
        background: "#fefdf8",
        headerGradient: ["#10B981", "#059669"],
        decorative: "rgba(16, 185, 129, 0.3)", 
      },
      fonts: {
        heading: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        body: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        decorative: '"Poppins", sans-serif',
      },
      layout: {
        headerHeight: 260,
        profileRadius: 70,
        profileY: 360, 
        nameY: 460, 
        designationY: 490, 
        messageY: 530, 
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
  {
    id: "style3",
    name: "Style 3",
    description: "Pakistan flag design",
    thumbnail: "3️⃣",
    category: "artistic",
    config: {
      colors: {
        primary: "#01411C", 
        secondary: "#FFFFFF",
        accent: "#FFD700", 
        text: "#1a1a1a", 
        background: "#FFFFFF", 
        headerGradient: ["#01411C", "#2d5a3d"],
        decorative: "rgba(1, 65, 28, 0.3)", 
      },
      fonts: {
        heading: '"Playfair Display", serif',
        body: '"Inter", sans-serif',
        decorative: '"Playfair Display", serif',
      },
      layout: {
        headerHeight: 0, 
        profileRadius: 65,
        profileY: 180, 
        nameY: 300, 
        designationY: 330, 
        messageY: 370, 
        messageHeight: 120,
      },
      decorations: {
        backgroundPattern: false, 
        stars: false, 
        borders: true,
        geometric: false, 
        traditional: true, 
      },
    },
  },
];
export const DEFAULT_STYLE = POSTER_STYLES[0];
