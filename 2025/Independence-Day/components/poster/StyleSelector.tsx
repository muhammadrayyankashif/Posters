'use client';
// Imports
import React from 'react';
import { motion } from 'framer-motion';
import { POSTER_STYLES } from '@/lib/poster-config';

// Types
interface StyleSelectorProps {
  selectedStyle: string;
  onStyleSelect: (styleId: string) => void;
}
const StyleSelector: React.FC<StyleSelectorProps> = ({ 
  selectedStyle, 
  onStyleSelect 
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
          Choose Your Poster Style
        </h3>
        <p className="text-sm sm:text-base text-gray-600">
          Select a design style that matches your personality
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {POSTER_STYLES.map((style) => (
          <motion.div
            key={style.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: POSTER_STYLES.indexOf(style) * 0.1 }}
            className="relative"
          >
            <motion.button
              onClick={() => onStyleSelect(style.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full p-4 rounded-xl border-2 transition-all duration-300 ${
                selectedStyle === style.id
                  ? 'border-green-500 bg-green-50 shadow-lg ring-2 ring-green-200'
                  : 'border-gray-200 bg-white hover:border-green-300 hover:shadow-md'
              }`}
            >
              <div className="text-center">
                <div 
                  className="text-3xl sm:text-4xl mb-2"
                  style={{ 
                    background: `linear-gradient(135deg, ${style.config.colors.primary}, ${style.config.colors.accent})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  {style.thumbnail}
                </div>
                <h4 className="font-semibold text-sm sm:text-base text-gray-800 mb-1">
                  {style.name}
                </h4>
                <p className="text-xs text-gray-600 leading-tight">
                  {style.description}
                </p>
              </div>
              {selectedStyle === style.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                >
                  <svg 
                    className="w-3 h-3 text-white" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </motion.div>
              )}
            </motion.button>
          </motion.div>
        ))}
      </div>
      {}
      <div className="bg-gray-50 rounded-xl p-4">
        <h4 className="font-semibold text-gray-800 mb-2">Style Preview</h4>
        {POSTER_STYLES.find(s => s.id === selectedStyle) && (
          <div className="text-sm text-gray-600">
            <div className="flex items-center gap-2 mb-2">
              <div 
                className="w-4 h-4 rounded border"
                style={{ 
                  backgroundColor: POSTER_STYLES.find(s => s.id === selectedStyle)?.config.colors.primary 
                }}
              ></div>
              <span>Primary Color</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <div 
                className="w-4 h-4 rounded border"
                style={{ 
                  backgroundColor: POSTER_STYLES.find(s => s.id === selectedStyle)?.config.colors.accent 
                }}
              ></div>
              <span>Accent Color</span>
            </div>
            <div className="text-xs mt-2 p-2 bg-white rounded">
              <strong>Font:</strong> {POSTER_STYLES.find(s => s.id === selectedStyle)?.config.fonts.heading}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default StyleSelector;