import { PosterConfig, QuickMessage, PosterStyle } from '@/types/poster';

export const POSTER_CONFIG: PosterConfig = {
  dimensions: {
    width: 600,
    height: 800,
    mobile: {
      width: 350,
      height: 467 // 3:4 ratio for mobile sharing
    },
    desktop: {
      width: 600,
      height: 800
    }
  },
  colors: {
    primary: '#7C3AED',      // Purple
    secondary: '#FFFFFF',    // White
    accent: '#FBBF24',       // Yellow/Gold for decorative elements
    text: '#212529',         // Dark text for readability
    background: '#F3E8FF'    // Light purple background
  },
  fonts: {
    heading: 'Georgia, "Times New Roman", serif',
    body: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
    decorative: '"Poppins", sans-serif'
  }
};

// Quick messages organized by category for better mobile UX
export const QUICK_MESSAGES: QuickMessage[] = [
  // Mental health messages
  {
    id: "hiding-feelings",
    text: "It is Ok, if you are hiding your feelings. We are here to help you get out from your mental health worries.",
    category: "health"
  },
  {
    id: "overall-wellbeing",
    text: "There is no health without mental health - Mental health is a key element of a person's overall well-being",
    category: "health"
  },
  {
    id: "seek-help",
    text: "Less than half of the people who need treatment will seek help, usually because of Stigma. Speak up to your doctor!",
    category: "health"
  },
  {
    id: "stay-connected",
    text: "Take time to stay connected with family and friends with whom you have positive, healthy relationships.",
    category: "health"
  },
  {
    id: "manage-stress",
    text: "Take steps to recognize and manage stress. Stress is a normal part of life, but when it gets out of control or lasts too long it can lead to mental health problems",
    category: "health"
  },
  {
    id: "no-shame",
    text: "There is No Shame in Seeking Help",
    category: "health"
  },
  {
    id: "invisible-issues",
    text: "Just because you can't see it, doesn't mean it's not there. Mental health issues exists, we are there to support you in overcoming them.",
    category: "health"
  },
  {
    id: "mental-physical",
    text: "Mental health is as important as physical health.",
    category: "health"
  },
  {
    id: "depression-support",
    text: "Depression is something you have, It does not define you. We can support you in managing it.",
    category: "health"
  },
  {
    id: "happiness-wealth",
    text: "Happiness is the new rich. Inner peace is the new success. Health is the new wealth. Kindness is the new cool.",
    category: "health"
  }
];

// Mobile-optimized character limits
export const CHARACTER_LIMITS = {
  name: {
    max: 20,
    warning: 16 // Show warning at 80%
  },
  designation: {
    max: 25,
    warning: 20
  },
  message: {
    max: 170,
    warning: 140
  }
};

// Canvas rendering settings optimized for mobile
export const CANVAS_SETTINGS = {
  // High DPI support for crisp text on mobile
  pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 2,
  
  // Mobile performance optimization
  maxCanvasSize: 2048, // Prevent memory issues on mobile
  
  // Image quality settings
  imageQuality: {
    mobile: 0.8,
    desktop: 0.95
  },
  
  // Export formats optimized for mobile sharing
  exportFormats: {
    whatsapp: { width: 350, height: 467 },
    instagram: { width: 1080, height: 1080 },
    story: { width: 1080, height: 1920 },
    facebook: { width: 1200, height: 630 }
  }
};

// Touch interaction settings
export const TOUCH_SETTINGS = {
  minTouchTarget: 44, // iOS/Android minimum
  swipeThreshold: 50,
  tapThreshold: 10,
  longPressDelay: 500
};

// Single Poster Style for World Mental Health Day
export const POSTER_STYLES: PosterStyle[] = [
  {
    id: 'world-mental-health-day',
    name: 'World Mental Health Day',
    description: 'Mental health-themed design',
    thumbnail: '🧠',
    category: 'health',
    config: {
      colors: {
        primary: '#7C3AED', // Purple
        secondary: '#FFFFFF',
        accent: '#FBBF24', // Yellow/Gold accent
        text: '#1F2937',
        background: 'gradient', // Custom gradient background
        headerGradient: ['#F3E8FF', '#7C3AED'],
        decorative: 'rgba(124, 58, 237, 0.3)' // Purple decorative elements
      },
      fonts: {
        heading: 'Arial, sans-serif',
        body: 'Arial, sans-serif',
        decorative: 'Arial, sans-serif'
      },
      layout: {
        headerHeight: 150,
        profileRadius: 75,
        profileY: 380,
        nameY: 520,
        designationY: 555,
        messageY: 600,
        messageHeight: 120
      },
      decorations: {
        backgroundPattern: false,
        stars: false,
        borders: true,
        geometric: false,
        traditional: false
      }
    }
  }
];

// Default style (only one available)
export const DEFAULT_STYLE = POSTER_STYLES[0];