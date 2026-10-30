"use client";
// Imports
import React from "react";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import PosterBuilder from "./PosterBuilder";
import ErrorBoundary from "../ErrorBoundary";
const PosterGenerator: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-sky-50 via-blue-50 to-sky-100">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#16A34A", 
            color: "#fff",
            fontSize: "14px",
            borderRadius: "12px",
          },
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
            className="inline-flex items-center gap-2 sm:gap-3 bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl px-4 sm:px-6 py-2 sm:py-3 shadow-lg border border-sky-100"
          >
            <div className="text-2xl sm:text-3xl">🎉</div>
            <div className="text-left">
              <h1 className="text-lg sm:text-2xl font-bold text-gray-800">
                Happy New Year 2026
              </h1>
              <p className="text-green-600 font-medium text-sm sm:text-base">
                1st January, 2026
              </p>
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
        <div className="max-w-6xl mx-auto flex justify-center items-center">
          {}
          <div className="text-center">
            <p className="text-sm text-gray-600 font-medium">
              Developed by{" "}
              <a
                href="https://softsols.pk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-700 font-medium underline transition-colors"
              >
                Softsols Pakistan
              </a>
            </p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};
export default PosterGenerator;
