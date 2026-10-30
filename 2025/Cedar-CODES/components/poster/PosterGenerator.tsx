'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Image from 'next/image';
import PosterBuilder from './PosterBuilder';
import ErrorBoundary from '../ErrorBoundary';

const PosterGenerator: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-teal-50 via-cyan-50 to-teal-100">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#14B8A6',
            color: '#fff',
            fontSize: '14px',
            borderRadius: '12px'
          }
        }}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-4 sm:pt-8 pb-4 sm:pb-6 text-center px-2"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 sm:gap-3 bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl px-4 sm:px-6 py-2 sm:py-3 shadow-lg border border-teal-100"
          >
            <Image src="/Logo.png" alt="Cedar CODES Logo" width={48} height={48} className="w-10 h-10 sm:w-12 sm:h-12" />
            <div className="text-left">
              <h1 className="text-lg sm:text-2xl font-bold text-gray-800">
                Cedar CODES
              </h1>
              <p className="text-teal-600 font-medium text-sm sm:text-base">THE Society of Cedar College</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <ErrorBoundary>
        <PosterBuilder />
      </ErrorBoundary>
    </div>
  );
};

export default PosterGenerator;