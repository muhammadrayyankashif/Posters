'use client';
// Imports
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { saveAs } from 'file-saver';
import toast from 'react-hot-toast';
import { PosterFormData } from '@/types/poster';

// Types
interface PosterPreviewProps {
  formData: PosterFormData;
  onBack: () => void;
}
const PosterPreview: React.FC<PosterPreviewProps> = ({ 
  formData, 
  onBack 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const lastFormDataRef = useRef<string>('');
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number, spikes: number, outerRadius: number, innerRadius: number) => {
    let rot = Math.PI / 2 * 3;
    const step = Math.PI / spikes;
    ctx.beginPath();
    ctx.moveTo(x, y - outerRadius);
    for (let i = 0; i < spikes; i++) {
      ctx.lineTo(x + Math.cos(rot) * outerRadius, y + Math.sin(rot) * outerRadius);
      rot += step;
      ctx.lineTo(x + Math.cos(rot) * innerRadius, y + Math.sin(rot) * innerRadius);
      rot += step;
    }
    ctx.lineTo(x, y - outerRadius);
    ctx.closePath();
    ctx.fill();
  };
  const drawSubtleBackgroundPattern = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.save();
    ctx.strokeStyle = 'rgba(220, 38, 38, 0.02)';
    ctx.lineWidth = 1;
    for (let x = -height; x < width + height; x += 60) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + height, height);
      ctx.stroke();
    }
    ctx.fillStyle = 'rgba(220, 38, 38, 0.03)';
    for (let x = 30; x < width; x += 80) {
      for (let y = 150; y < height - 100; y += 80) {
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
    ctx.restore();
  };
  const drawEmptyAreaRefinements = (ctx: CanvasRenderingContext2D, width: number, height: number, centerX: number, centerY: number, radius: number) => {
    ctx.save();
    ctx.fillStyle = 'rgba(220, 38, 38, 0.8)';
    drawStar(ctx, 100, 140, 5, 6, 3);
    drawStar(ctx, width - 100, 140, 5, 6, 3);
    drawStar(ctx, 70, 190, 4, 5, 2);
    drawStar(ctx, width - 70, 190, 4, 5, 2);
    drawStar(ctx, 80, 120, 4, 5, 2);
    drawStar(ctx, width - 80, 120, 4, 5, 2);
    drawStar(ctx, 120, 170, 3, 4, 2);
    drawStar(ctx, width - 120, 170, 3, 4, 2);
    drawStar(ctx, 50, 280, 4, 5, 2);
    drawStar(ctx, width - 50, 280, 4, 5, 2);
    drawStar(ctx, 90, 420, 5, 6, 3);
    drawStar(ctx, width - 90, 420, 5, 6, 3);
    drawStar(ctx, 70, 350, 4, 5, 2);
    drawStar(ctx, width - 70, 350, 4, 5, 2);
    drawStar(ctx, 110, 450, 3, 4, 2);
    drawStar(ctx, width - 110, 450, 3, 4, 2);
    drawStar(ctx, 60, 580, 4, 5, 2);
    drawStar(ctx, width - 60, 580, 4, 5, 2);
    drawStar(ctx, 80, 640, 5, 6, 3);
    drawStar(ctx, width - 80, 640, 5, 6, 3);
    drawStar(ctx, 50, 620, 3, 4, 2);
    drawStar(ctx, width - 50, 620, 3, 4, 2);
    drawStar(ctx, 100, 600, 4, 5, 2);
    drawStar(ctx, width - 100, 600, 4, 5, 2);
    ctx.fillStyle = 'rgba(220, 38, 38, 0.7)';
    drawStar(ctx, 120, 240, 3, 4, 2);
    drawStar(ctx, width - 120, 240, 3, 4, 2);
    drawStar(ctx, 40, 380, 3, 4, 2);
    drawStar(ctx, width - 40, 380, 3, 4, 2);
    drawStar(ctx, 110, 680, 3, 4, 2);
    drawStar(ctx, width - 110, 680, 3, 4, 2);
    drawStar(ctx, 140, 260, 3, 4, 2);
    drawStar(ctx, width - 140, 260, 3, 4, 2);
    drawStar(ctx, 30, 400, 3, 4, 2);
    drawStar(ctx, width - 30, 400, 3, 4, 2);
    drawStar(ctx, 130, 700, 3, 4, 2);
    drawStar(ctx, width - 130, 700, 3, 4, 2);
    ctx.fillStyle = 'rgba(220, 38, 38, 0.6)';
    drawStar(ctx, 130, 320, 5, 6, 3);
    drawStar(ctx, width - 130, 320, 5, 6, 3);
    drawStar(ctx, 150, 380, 4, 5, 2);
    drawStar(ctx, width - 150, 380, 4, 5, 2);
    const dividerY = centerY + radius + 20;
    ctx.strokeStyle = '#e9ecef';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(centerX - 80, dividerY);
    ctx.lineTo(centerX + 80, dividerY);
    ctx.stroke();
    ctx.fillStyle = '#DC2626';
    ctx.beginPath();
    ctx.arc(centerX, dividerY, 3, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = 'rgba(220, 38, 38, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(50, 720);
    ctx.lineTo(70, 720);
    ctx.moveTo(60, 710);
    ctx.lineTo(60, 720);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(width - 50, 720);
    ctx.lineTo(width - 70, 720);
    ctx.moveTo(width - 60, 710);
    ctx.lineTo(width - 60, 720);
    ctx.stroke();
    ctx.restore();
  };
  const loadImage = useCallback((src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }, []);
  const drawPosterContent = useCallback(async (ctx: CanvasRenderingContext2D, name: string, designation: string, designationLine2: string, message: string, imageData: string | undefined, canvas: HTMLCanvasElement) => {
    const centerX = canvas.width / 2;
    const centerY = 370; 
    const radius = 70;
    drawEmptyAreaRefinements(ctx, canvas.width, canvas.height, centerX, centerY, radius);
    ctx.fillStyle = '#f8f9fa';
    const squareSize = (radius + 8) * 2;
    ctx.fillRect(centerX - squareSize/2, centerY - squareSize/2, squareSize, squareSize);
    if (imageData) {
      try {
        const img = await loadImage(imageData);
        ctx.save();
        const imageSize = radius * 2;
        const imageX = centerX - radius;
        const imageY = centerY - radius;
        const cornerRadius = 8;
        ctx.beginPath();
        ctx.moveTo(imageX + cornerRadius, imageY);
        ctx.lineTo(imageX + imageSize - cornerRadius, imageY);
        ctx.quadraticCurveTo(imageX + imageSize, imageY, imageX + imageSize, imageY + cornerRadius);
        ctx.lineTo(imageX + imageSize, imageY + imageSize - cornerRadius);
        ctx.quadraticCurveTo(imageX + imageSize, imageY + imageSize, imageX + imageSize - cornerRadius, imageY + imageSize);
        ctx.lineTo(imageX + cornerRadius, imageY + imageSize);
        ctx.quadraticCurveTo(imageX, imageY + imageSize, imageX, imageY + imageSize - cornerRadius);
        ctx.lineTo(imageX, imageY + cornerRadius);
        ctx.quadraticCurveTo(imageX, imageY, imageX + cornerRadius, imageY);
        ctx.closePath();
        ctx.clip();
        const imgAspect = img.width / img.height;
        let drawWidth, drawHeight, drawX, drawY;
        if (imgAspect > 1) {
          drawHeight = imageSize;
          drawWidth = drawHeight * imgAspect;
          drawX = imageX - (drawWidth - imageSize) / 2;
          drawY = imageY;
        } else {
          drawWidth = imageSize;
          drawHeight = drawWidth / imgAspect;
          drawX = imageX;
          drawY = imageY - (drawHeight - imageSize) / 2;
        }
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
        ctx.restore();
        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 2;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 6;
        ctx.strokeRect(imageX, imageY, imageSize, imageSize);
        ctx.shadowColor = 'transparent';
        ctx.strokeStyle = '#DC2626';
        ctx.lineWidth = 2;
        ctx.strokeRect(imageX + 3, imageY + 3, imageSize - 6, imageSize - 6);
        ctx.restore();
      } catch {
      }
    }
    if (!imageData) {
      const imageSize = radius * 2;
      const imageX = centerX - radius;
      const imageY = centerY - radius;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(imageX, imageY, imageSize, imageSize);
      ctx.strokeStyle = '#e9ecef';
      ctx.lineWidth = 4;
      ctx.strokeRect(imageX, imageY, imageSize, imageSize);
      ctx.fillStyle = '#6c757d';
      ctx.font = '40px "Poppins", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('👤', centerX, centerY + 12);
    }
    const hasLine2 = designationLine2 && designationLine2.trim() !== '';
    const overlayHeight = hasLine2 ? 70 : 55;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(centerX - radius, centerY + radius - overlayHeight + 10, radius * 2, overlayHeight);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px "Poppins", sans-serif';
    ctx.textAlign = 'center';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowBlur = 3;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
    const nameY = hasLine2 ? centerY + radius - 45 : centerY + radius - 30;
    ctx.fillText(name.toUpperCase(), centerX, nameY);
    if (designation) {
      const maxWidth = radius * 2 - 10; 
      let fontSize = 14;
      ctx.font = `${fontSize}px "Poppins", sans-serif`;
      let textWidth = ctx.measureText(designation).width;
      while (textWidth > maxWidth && fontSize > 10) {
        fontSize -= 0.5;
        ctx.font = `${fontSize}px "Poppins", sans-serif`;
        textWidth = ctx.measureText(designation).width;
      }
      const letterSpacing = textWidth > maxWidth * 0.9 ? '-0.5px' : '0px';
      ctx.letterSpacing = letterSpacing;
      ctx.fillStyle = '#e0e0e0';
      ctx.textAlign = 'center';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
      ctx.shadowBlur = 2;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
      const desigY = hasLine2 ? centerY + radius - 28 : centerY + radius - 10;
      ctx.fillText(designation, centerX, desigY);
      ctx.letterSpacing = '0px';
    }
    if (hasLine2) {
      const maxWidth = radius * 2 - 10;
      let fontSize = 14;
      ctx.font = `${fontSize}px "Poppins", sans-serif`;
      let textWidth = ctx.measureText(designationLine2).width;
      while (textWidth > maxWidth && fontSize > 10) {
        fontSize -= 0.5;
        ctx.font = `${fontSize}px "Poppins", sans-serif`;
        textWidth = ctx.measureText(designationLine2).width;
      }
      const letterSpacing = textWidth > maxWidth * 0.9 ? '-0.5px' : '0px';
      ctx.letterSpacing = letterSpacing;
      ctx.fillStyle = '#e0e0e0';
      ctx.textAlign = 'center';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
      ctx.shadowBlur = 2;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
      ctx.fillText(designationLine2, centerX, centerY + radius - 10);
      ctx.letterSpacing = '0px';
    }
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    const msgY = centerY + radius + 40; 
    const msgWidth = canvas.width - 80;
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(40, msgY, msgWidth, 150);
    ctx.fillStyle = '#495057';
    ctx.font = '26px "Poppins", sans-serif';
    ctx.textAlign = 'center';
    ctx.letterSpacing = '0.8px';
    const words = message.split(' ');
    const lines = [];
    let currentLine = '';
    const maxWidth = msgWidth - 40;
    ctx.textAlign = 'left';
    for (const word of words) {
      const testLine = currentLine + word + '  '; 
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && currentLine !== '') {
        lines.push(currentLine.trim());
        currentLine = word + '  ';
      } else {
        currentLine = testLine;
      }
    }
    lines.push(currentLine.trim());
    ctx.textAlign = 'center';
    const lineHeight = 26; 
    const startY = msgY + 40;
    for (let i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], canvas.width / 2, startY + i * lineHeight);
    }
    const footerY = canvas.height - 50;
    const footerHeight = 50;
    ctx.fillStyle = '#DC2626';
    ctx.fillRect(0, footerY, canvas.width, footerHeight);
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px "Poppins", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('SOFTSOLS PAKISTAN - Digital AI Transformation  |  www.softsols.pk', canvas.width / 2, footerY + 30);
  }, [loadImage]);
  const generatePoster = useCallback(async () => {
    if (isGenerating) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    setIsGenerating(true);
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setIsGenerating(false);
      return;
    }
    try {
    const width = 600;
    const height = 800;
    canvas.width = width;
    canvas.height = height;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
    drawSubtleBackgroundPattern(ctx, width, height);
    try {
      const screenImg = await loadImage('/Screen.png');
      ctx.drawImage(screenImg, 0, 0, width, 260);
    } catch {
      const headerGradient = ctx.createLinearGradient(0, 0, 0, 260);
      headerGradient.addColorStop(0, '#DC2626');
      headerGradient.addColorStop(1, '#B91C1C');
      ctx.fillStyle = headerGradient;
      ctx.fillRect(0, 0, width, 260);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 30px "Poppins", sans-serif';
      ctx.textAlign = 'center';
      ctx.letterSpacing = '1.5px';
      ctx.fillText('WORLD HEART DAY', width / 2, 130);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.font = '18px "Poppins", sans-serif';
      ctx.letterSpacing = '0.8px';
      ctx.fillText('29th September, 2025', width / 2, 160);
    }
    await drawPosterContent(ctx, formData.name, formData.designation || '', formData.designationLine2 || '', formData.message, formData.imageData, canvas);
    } catch (error) {
      console.error('Error generating poster:', error);
    } finally {
      setIsGenerating(false);
    }
  }, [formData, isGenerating, drawPosterContent, loadImage]);
  useEffect(() => {
    const currentFormDataString = JSON.stringify(formData);
    if (canvasRef.current && currentFormDataString !== lastFormDataRef.current && !isGenerating) {
      lastFormDataRef.current = currentFormDataString;
      generatePoster();
    }
  }, [formData, generatePoster, isGenerating]);
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setIsDownloading(true);
    try {
      canvas.toBlob((blob) => {
        if (blob) {
          const fileName = `world-heart-day-poster-${formData.name.replace(/\s+/g, '-').toLowerCase()}.png`;
          saveAs(blob, fileName);
          toast.success('Poster downloaded successfully!');
        }
      }, 'image/png', 0.9);
    } catch {
      toast.error('Failed to download poster');
    } finally {
      setIsDownloading(false);
    }
  };
  return (
    <div className="text-center">
      {}
      <div className="inline-block p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 mb-4 relative">
        {isGenerating && (
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
            <div className="bg-white rounded-lg p-4 flex items-center gap-3 shadow-lg">
              <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-700 font-medium">Generating poster...</span>
            </div>
          </div>
        )}
        <canvas
          ref={canvasRef}
          className="block border-2 border-white/20 rounded-xl shadow-2xl"
          style={{ 
            maxWidth: '100%', 
            height: 'auto',
            maxHeight: isMobile ? '400px' : '500px', 
            imageRendering: 'auto'
          } as React.CSSProperties}
        />
      </div>
      {}
      <motion.button
        onClick={handleDownload}
        disabled={isDownloading}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-gradient-to-r from-[#2d8f5f] to-[#1e5f3e] text-white border-none px-6 py-3 rounded-[25px] text-[14px] font-semibold cursor-pointer transition-all duration-300 uppercase tracking-[0.5px] mb-4 hover:transform hover:translate-y-[-2px] hover:shadow-[0_5px_15px_rgba(0,0,0,0.3)] hover:bg-gradient-to-r hover:from-[#1e5f3e] hover:to-[#2d8f5f] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isDownloading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Downloading...
          </div>
        ) : (
          'Download Poster'
        )}
      </motion.button>
      {}
      <motion.button
        onClick={onBack}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-white/20 hover:bg-white/30 text-white font-medium py-3 px-6 rounded-xl border border-white/30 transition-all duration-200"
      >
        ← Back to Form
      </motion.button>
    </div>
  );
};
export default PosterPreview;