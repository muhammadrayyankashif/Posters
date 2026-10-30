'use client';
// Imports
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

// Types
interface ImageUploadWithCropProps {
  onImageChange: (imageData: string | undefined) => void;
  initialImage?: string;
}
interface CropArea {
  x: number;
  y: number;
  size: number;
}
interface ImageTransform {
  scale: number;
  translateX: number;
  translateY: number;
}
const ImageUploadWithCrop: React.FC<ImageUploadWithCropProps> = ({ onImageChange, initialImage }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [originalImage, setOriginalImage] = useState<string | undefined>(initialImage);
  const [showCropper, setShowCropper] = useState(false);
  const [croppedImage, setCroppedImage] = useState<string | undefined>(initialImage);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [cropArea, setCropArea] = useState<CropArea>({ x: 0, y: 0, size: 200 });
  const [, setImageSize] = useState({ width: 0, height: 0 });
  const [imageTransform, setImageTransform] = useState<ImageTransform>({ 
    scale: 1, 
    translateX: 0, 
    translateY: 0 
  });
  const [lastPinchDistance, setLastPinchDistance] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };
  const getImageOrientation = (file: File): Promise<number> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const view = new DataView(e.target?.result as ArrayBuffer);
        if (view.getUint16(0, false) !== 0xFFD8) resolve(1);
        let offset = 2;
        let marker;
        while (offset < view.byteLength) {
          marker = view.getUint16(offset, false);
          offset += 2;
          if (marker === 0xFFE1) {
            offset += 2;
            if (view.getUint32(offset, false) !== 0x45786966) {
              resolve(1);
              return;
            }
            offset += 6;
            const little = view.getUint16(offset, false) === 0x4949;
            offset += view.getUint32(offset + 4, little);
            const tags = view.getUint16(offset, little);
            offset += 2;
            for (let i = 0; i < tags; i++) {
              if (view.getUint16(offset + (i * 12), little) === 0x0112) {
                resolve(view.getUint16(offset + (i * 12) + 8, little));
                return;
              }
            }
          } else if ((marker & 0xFF00) !== 0xFF00) break;
          else offset += view.getUint16(offset, false);
        }
        resolve(1);
      };
      reader.readAsArrayBuffer(file);
    });
  };
  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image too large. Please select a smaller image (max 10MB)');
      return;
    }
    setIsProcessing(true);
    try {
      const orientation = await getImageOrientation(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          const img = new Image();
          img.onload = async () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            const { width, height } = img;
            canvas.width = width;
            canvas.height = height;
            ctx.save();
            switch (orientation) {
              case 2: ctx.transform(-1, 0, 0, 1, width, 0); break;
              case 3: ctx.transform(-1, 0, 0, -1, width, height); break;
              case 4: ctx.transform(1, 0, 0, -1, 0, height); break;
              case 5: ctx.transform(0, 1, 1, 0, 0, 0); canvas.width = height; canvas.height = width; break;
              case 6: ctx.transform(0, 1, -1, 0, height, 0); canvas.width = height; canvas.height = width; break;
              case 7: ctx.transform(0, -1, -1, 0, height, width); canvas.width = height; canvas.height = width; break;
              case 8: ctx.transform(0, -1, 1, 0, 0, width); canvas.width = height; canvas.height = width; break;
            }
            ctx.drawImage(img, 0, 0);
            ctx.restore();
            const correctedDataURL = canvas.toDataURL('image/jpeg', 0.9);
            setOriginalImage(correctedDataURL);
            setShowCropper(true);
            toast.success('Image uploaded! Drag to reposition.');
          };
          img.src = result;
        }
      };
      reader.readAsDataURL(file);
    } catch {
      toast.error('Failed to process image');
    } finally {
      setIsProcessing(false);
    }
  };
  const handleImageLoad = useCallback(() => {
    if (!imageRef.current || !containerRef.current) return;
    setTimeout(() => {
      if (!imageRef.current || !containerRef.current) return;
      const container = containerRef.current.getBoundingClientRect();
      const minDimension = Math.min(container.width, container.height);
      const cropSize = Math.min(minDimension * 0.6, 250); 
      const centerX = (container.width - cropSize) / 2;
      const centerY = (container.height - cropSize) / 2;
      setCropArea({ x: centerX, y: centerY, size: cropSize });
      setImageSize({ width: imageRef.current.naturalWidth, height: imageRef.current.naturalHeight });
      setImageTransform({ scale: 1, translateX: 0, translateY: 0 });
    }, 100);
  }, []);
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const delta = -e.deltaY;
    const zoomIntensity = 0.1;
    const scale = delta > 0 ? 1 + zoomIntensity : 1 - zoomIntensity;
    setImageTransform(prev => {
      const newScale = Math.max(0.5, Math.min(3, prev.scale * scale));
      return { ...prev, scale: newScale };
    });
  }, []);
  const getTouchDistance = (touches: TouchList): number => {
    if (touches.length < 2) return 0;
    const touch1 = touches[0];
    const touch2 = touches[1];
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) + 
      Math.pow(touch2.clientY - touch1.clientY, 2)
    );
  };
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const distance = getTouchDistance(e.touches);
      setLastPinchDistance(distance);
    }
  }, []);
  const handleTouchMoveZoom = useCallback((e: TouchEvent) => {
    if (e.touches.length === 2 && lastPinchDistance !== null) {
      e.preventDefault();
      const distance = getTouchDistance(e.touches);
      const scale = distance / lastPinchDistance;
      setImageTransform(prev => {
        const newScale = Math.max(0.5, Math.min(3, prev.scale * scale));
        return { ...prev, scale: newScale };
      });
      setLastPinchDistance(distance);
    }
  }, [lastPinchDistance]);
  const handleTouchEndZoom = useCallback(() => {
    setLastPinchDistance(null);
  }, []);
  const handleCropMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!containerRef.current) return;
    const container = containerRef.current.getBoundingClientRect();
    const offsetX = e.clientX - container.left - cropArea.x;
    const offsetY = e.clientY - container.top - cropArea.y;
    setIsDragging(true);
    setDragStart({ x: offsetX, y: offsetY });
  };
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    const container = containerRef.current.getBoundingClientRect();
    const newX = e.clientX - container.left - dragStart.x;
    const newY = e.clientY - container.top - dragStart.y;
    const maxX = container.width - cropArea.size;
    const maxY = container.height - cropArea.size;
    const constrainedX = Math.max(0, Math.min(newX, maxX));
    const constrainedY = Math.max(0, Math.min(newY, maxY));
    setCropArea(prev => ({ ...prev, x: constrainedX, y: constrainedY }));
  }, [isDragging, dragStart.x, dragStart.y, cropArea.size]);
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);
  const handleCropTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    e.preventDefault();
    e.stopPropagation();
    if (!containerRef.current) return;
    const touch = e.touches[0];
    const container = containerRef.current.getBoundingClientRect();
    const offsetX = touch.clientX - container.left - cropArea.x;
    const offsetY = touch.clientY - container.top - cropArea.y;
    setIsDragging(true);
    setDragStart({ x: offsetX, y: offsetY });
  };
  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging || !containerRef.current || e.touches.length !== 1) return;
    e.preventDefault();
    const touch = e.touches[0];
    const container = containerRef.current.getBoundingClientRect();
    const newX = touch.clientX - container.left - dragStart.x;
    const newY = touch.clientY - container.top - dragStart.y;
    const maxX = container.width - cropArea.size;
    const maxY = container.height - cropArea.size;
    const constrainedX = Math.max(0, Math.min(newX, maxX));
    const constrainedY = Math.max(0, Math.min(newY, maxY));
    setCropArea(prev => ({ ...prev, x: constrainedX, y: constrainedY }));
  }, [isDragging, dragStart.x, dragStart.y, cropArea.size]);
  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !showCropper) return;
    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMoveZoom, { passive: false });
    container.addEventListener('touchend', handleTouchEndZoom);
    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMoveZoom);
      container.removeEventListener('touchend', handleTouchEndZoom);
    };
  }, [showCropper, handleWheel, handleTouchStart, handleTouchMoveZoom, handleTouchEndZoom]);
  const cropImage = async () => {
    if (!originalImage || !imageRef.current || !canvasRef.current || !containerRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = imageRef.current;
    const container = containerRef.current.getBoundingClientRect();
    const imgRect = img.getBoundingClientRect();
    const scaleX = img.naturalWidth / imgRect.width;
    const scaleY = img.naturalHeight / imgRect.height;
    const imgOffsetX = (container.width - imgRect.width) / 2;
    const imgOffsetY = (container.height - imgRect.height) / 2;
    const cropX = Math.max(0, (cropArea.x - imgOffsetX) * scaleX);
    const cropY = Math.max(0, (cropArea.y - imgOffsetY) * scaleY);
    const cropSize = cropArea.size * Math.min(scaleX, scaleY);
    const finalCropX = Math.min(cropX, img.naturalWidth - cropSize);
    const finalCropY = Math.min(cropY, img.naturalHeight - cropSize);
    const finalCropSize = Math.min(cropSize, Math.min(img.naturalWidth - finalCropX, img.naturalHeight - finalCropY));
    canvas.width = 300; 
    canvas.height = 300;
    ctx.drawImage(
      img,
      finalCropX,
      finalCropY,
      finalCropSize,
      finalCropSize,
      0,
      0,
      300,
      300
    );
    const croppedDataURL = canvas.toDataURL('image/jpeg', 0.9);
    setCroppedImage(croppedDataURL);
    onImageChange(croppedDataURL);
    setShowCropper(false);
    toast.success('Photo cropped successfully!');
  };
  const handleRemove = () => {
    setOriginalImage(undefined);
    setCroppedImage(undefined);
    setShowCropper(false);
    onImageChange(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.success('Image removed');
  };
  if (showCropper && originalImage) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed inset-0 bg-black flex items-center justify-center z-50"
      >
        <div className="w-full h-full flex flex-col">
          {}
          <div className="flex items-center justify-between p-4 text-white">
            <button
              onClick={handleRemove}
              className="text-white hover:text-gray-300 transition-colors"
            >
              ✕ Cancel
            </button>
            <h3 className="text-lg font-medium">Crop Photo</h3>
            <button
              onClick={cropImage}
              disabled={isProcessing}
              className="text-green-400 hover:text-green-300 font-medium transition-colors disabled:opacity-50"
            >
              Done
            </button>
          </div>
          {}
          <div 
            ref={containerRef}
            className="flex-1 relative overflow-hidden bg-black flex items-center justify-center"
          >
            {}
            <img
              ref={imageRef}
              src={originalImage}
              alt="Crop me"
              className="max-w-full max-h-full object-contain"
              onLoad={handleImageLoad}
              style={{ 
                cursor: isDragging ? 'grabbing' : 'grab',
                transform: `scale(${imageTransform.scale}) translate(${imageTransform.translateX}px, ${imageTransform.translateY}px)`,
                transformOrigin: 'center center',
                transition: 'transform 0.1s ease-out'
              }}
            />
            {}
            <div className="absolute inset-0 bg-black/60 pointer-events-none" />
            {}
            <div
              className="absolute border-2 border-white bg-transparent pointer-events-auto cursor-grab active:cursor-grabbing"
              style={{
                left: cropArea.x,
                top: cropArea.y,
                width: cropArea.size,
                height: cropArea.size,
                borderRadius: '8px',
                boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.6)',
              }}
              onMouseDown={handleCropMouseDown}
              onTouchStart={handleCropTouchStart}
            >
              {}
              <div className="w-full h-full rounded-lg border border-white/50" />
            </div>
          </div>
          {}
          <div className="absolute top-20 right-4 flex flex-col gap-2">
            <button
              onClick={() => setImageTransform(prev => ({ 
                ...prev, 
                scale: Math.min(3, prev.scale * 1.2) 
              }))}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center text-lg font-bold transition-colors"
            >
              +
            </button>
            <button
              onClick={() => setImageTransform(prev => ({ 
                ...prev, 
                scale: Math.max(0.5, prev.scale / 1.2) 
              }))}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center text-lg font-bold transition-colors"
            >
              −
            </button>
            <button
              onClick={() => setImageTransform({ scale: 1, translateX: 0, translateY: 0 })}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center text-xs font-bold transition-colors"
            >
              ↻
            </button>
          </div>
          {}
          <div className="p-4 text-center">
            <p className="text-white/80 text-sm mb-1">
              Drag the square to reposition your photo
            </p>
            <p className="text-white/60 text-xs">
              Use scroll wheel or pinch to zoom • Tap zoom buttons
            </p>
          </div>
        </div>
        {}
        <canvas ref={canvasRef} className="hidden" />
      </motion.div>
    );
  }
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {croppedImage ? (
        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-center">
          <div className="relative inline-block">
            {}
            <img
              src={croppedImage}
              alt="Your photo"
              className="w-24 h-24 rounded-lg border-4 border-green-500 shadow-lg object-cover mx-auto bg-white"
            />
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
          </div>
          <p className="text-gray-600 font-medium mt-2 text-sm">Photo ready for poster!</p>
          <div className="mt-3">
            <button
              type="button"
              onClick={handleRemove}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg text-sm transition-colors"
            >
              🗑️ Delete Photo
            </button>
          </div>
        </motion.div>
      ) : (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="relative block w-full mb-[15px] px-5 py-[30px] border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 text-gray-600 text-center cursor-pointer transition-all duration-300 text-[15px] overflow-hidden hover:border-green-400 hover:bg-green-50 hover:transform hover:translate-y-[-2px] hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)] active:transform active:translate-y-0"
        >
          <AnimatePresence mode="wait">
            {isProcessing ? (
              <motion.div
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-600 text-sm">Processing image...</p>
              </motion.div>
            ) : (
              <motion.div
                key="upload"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center"
              >
                <div className="text-4xl mb-2">📷</div>
                <div className="text-[14px] text-gray-600 mb-2">Click to upload your photo</div>
                <div className="text-[12px] text-gray-500">PNG, JPG, or JPEG (Max 10MB)</div>
                <div className="text-[12px] text-gray-500 mt-1">You can crop after upload</div>
              </motion.div>
            )}
          </AnimatePresence>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />
        </div>
      )}
    </motion.div>
  );
};
export default ImageUploadWithCrop;