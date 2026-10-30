'use client';
// Imports
import React from 'react';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Image from 'next/image';
import PosterBuilder from './PosterBuilder';
import ErrorBoundary from '../ErrorBoundary';
const PosterGenerator: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-50 via-violet-50 to-purple-100">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#7C3AED',
            color: '#fff',
            fontSize: '14px',
            borderRadius: '12px'
          }
        }}
      />
      {}
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
            className="inline-flex items-center gap-2 sm:gap-3 bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl px-4 sm:px-6 py-2 sm:py-3 shadow-lg border border-purple-100"
          >
            <div className="text-2xl sm:text-3xl">🧠</div>
            <div className="text-left">
              <h1 className="text-lg sm:text-2xl font-bold text-gray-800">
                World Mental Health Day
              </h1>
              <p className="text-purple-600 font-medium text-sm sm:text-base">10th October, 2025</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
      <ErrorBoundary>
        <PosterBuilder />
      </ErrorBoundary>
      {}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-8 pb-8 px-4"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          {}
          <div className="text-center">
            <p className="text-sm text-gray-600 font-medium mb-3">Project Of</p>
            <Image src="/hiranis.png" alt="Hiranis" width={200} height={64} className="h-16 mx-auto object-contain" />
          </div>
          {}
          <div className="text-center flex items-end justify-center">
            <p className="text-sm text-gray-600 font-medium">
              Developed by{' '}
              <a
                href="https://softsols.pk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:text-purple-700 font-medium underline transition-colors"
              >
                Softsols Pakistan
              </a>
            </p>
          </div>
          {}
          <div className="text-center">
            <p className="text-sm text-gray-600 font-medium mb-3">Powered by</p>
            <div className="flex justify-center items-center gap-4">
              <Image src="/lutero.png" alt="Lutero" width={100} height={64} className="h-16 object-contain" />
              <Image src="/tingnum.png" alt="Tingnum" width={100} height={64} className="h-16 object-contain" />
              <Image src="/divanza.png" alt="Divanza" width={100} height={64} className="h-16 object-contain" />
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};
export default PosterGenerator;