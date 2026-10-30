
// Types
export interface WorldHeartDayPosterData {
  name: string;
  designation: string;
  message: string;
  imageData?: string;
}
interface PosterLayout {
  frameWidth: number;
  posterX: number;
  posterY: number;
  posterWidth: number;
  posterHeight: number;
  profileY: number;
  nameY: number;
  designationY: number;
  messageY: number;
  footerHeight: number;
}
export function renderWorldHeartDayPoster(
  canvas: HTMLCanvasElement,
  data: WorldHeartDayPosterData
): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  canvas.width = 640; 
  canvas.height = 880; 
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  const frameWidth = 35; 
  const posterWidth = canvas.width - (frameWidth * 2); 
  const posterHeight = canvas.height - (frameWidth * 2); 
  const layout = {
    frameWidth: frameWidth,
    posterX: frameWidth,
    posterY: frameWidth,
    posterWidth: posterWidth,
    posterHeight: posterHeight,
    profileY: 340, 
    nameY: 100, 
    designationY: 125, 
    messageY: 595, 
    footerHeight: 120 
  };
  drawWorldHeartDayFrame(ctx, canvas.width, canvas.height, layout.frameWidth);
  drawPixelPerfectBackground(ctx, layout.posterX, layout.posterY, layout.posterWidth, layout.posterHeight);
  drawBackgroundImageWithCallback(ctx, layout, () => {
    drawPixelPerfectProfile(ctx, layout, data);
    drawNameAndDesignation(ctx, layout, data.name, data.designation);
    drawPixelPerfectMessage(ctx, layout, data.message);
    drawFooterWithFrame(ctx, layout, () => {
    });
  });
}
function drawWorldHeartDayFrame(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, frameWidth: number): void {
  ctx.save();
  const mainGradient = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight);
  mainGradient.addColorStop(0, '#B91C1C'); 
  mainGradient.addColorStop(0.3, '#DC2626'); 
  mainGradient.addColorStop(0.7, '#EF4444'); 
  mainGradient.addColorStop(1, '#F87171'); 
  ctx.fillStyle = mainGradient;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  drawAbstractGeometricPattern(ctx, canvasWidth, canvasHeight, frameWidth);
  drawHealthSymbolsPattern(ctx, canvasWidth, canvasHeight, frameWidth);
  drawCornerDecorations(ctx, canvasWidth, canvasHeight, frameWidth);
  drawInnerFrameBorder(ctx, canvasWidth, canvasHeight, frameWidth);
  ctx.restore();
}
function drawAbstractGeometricPattern(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, frameWidth: number): void {
  ctx.save();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.beginPath();
  ctx.moveTo(0, frameWidth * 0.3);
  ctx.bezierCurveTo(canvasWidth * 0.2, frameWidth * 0.8, canvasWidth * 0.8, frameWidth * 0.2, canvasWidth, frameWidth * 0.7);
  ctx.lineTo(canvasWidth, 0);
  ctx.lineTo(0, 0);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(0, canvasHeight - frameWidth * 0.3);
  ctx.bezierCurveTo(canvasWidth * 0.3, canvasHeight - frameWidth * 0.8, canvasWidth * 0.7, canvasHeight - frameWidth * 0.2, canvasWidth, canvasHeight - frameWidth * 0.6);
  ctx.lineTo(canvasWidth, canvasHeight);
  ctx.lineTo(0, canvasHeight);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
  ctx.beginPath();
  ctx.moveTo(frameWidth * 0.2, 0);
  ctx.bezierCurveTo(frameWidth * 0.8, canvasHeight * 0.2, frameWidth * 0.3, canvasHeight * 0.8, frameWidth * 0.9, canvasHeight);
  ctx.lineTo(0, canvasHeight);
  ctx.lineTo(0, 0);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(canvasWidth - frameWidth * 0.2, 0);
  ctx.bezierCurveTo(canvasWidth - frameWidth * 0.8, canvasHeight * 0.3, canvasWidth - frameWidth * 0.3, canvasHeight * 0.7, canvasWidth - frameWidth * 0.9, canvasHeight);
  ctx.lineTo(canvasWidth, canvasHeight);
  ctx.lineTo(canvasWidth, 0);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}
function drawHealthSymbolsPattern(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, frameWidth: number): void {
  ctx.save();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
  ctx.font = '14px system-ui';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const hearts = ['♥', '♡']; 
  const seed = 42; 
  function pseudoRandom(x: number, y: number): number {
    return ((x * 73 + y * 37 + seed) % 100) / 100;
  }
  const baseSpacing = 35;
  for (let x = baseSpacing; x < canvasWidth - baseSpacing; x += baseSpacing) {
    const randomOffset = (pseudoRandom(x, 0) - 0.5) * 15; 
    const heartType = pseudoRandom(x, 1) > 0.6 ? hearts[1] : hearts[0]; 
    const y = frameWidth / 2 + (pseudoRandom(x, 2) - 0.5) * 8; 
    ctx.fillText(heartType, x + randomOffset, y);
  }
  for (let x = baseSpacing; x < canvasWidth - baseSpacing; x += baseSpacing) {
    const randomOffset = (pseudoRandom(x, 100) - 0.5) * 15;
    const heartType = pseudoRandom(x, 101) > 0.6 ? hearts[1] : hearts[0];
    const y = canvasHeight - frameWidth / 2 + (pseudoRandom(x, 102) - 0.5) * 8;
    ctx.fillText(heartType, x + randomOffset, y);
  }
  for (let y = baseSpacing * 2; y < canvasHeight - baseSpacing * 2; y += baseSpacing) {
    const randomOffset = (pseudoRandom(0, y) - 0.5) * 12;
    const heartType = pseudoRandom(1, y) > 0.6 ? hearts[1] : hearts[0];
    const x = frameWidth / 2 + (pseudoRandom(2, y) - 0.5) * 8;
    ctx.fillText(heartType, x, y + randomOffset);
  }
  for (let y = baseSpacing * 2; y < canvasHeight - baseSpacing * 2; y += baseSpacing) {
    const randomOffset = (pseudoRandom(200, y) - 0.5) * 12;
    const heartType = pseudoRandom(201, y) > 0.6 ? hearts[1] : hearts[0];
    const x = canvasWidth - frameWidth / 2 + (pseudoRandom(202, y) - 0.5) * 8;
    ctx.fillText(heartType, x, y + randomOffset);
  }
  const cornerHearts = [
    {x: frameWidth * 0.7, y: frameWidth * 0.7},
    {x: canvasWidth - frameWidth * 0.7, y: frameWidth * 0.7},
    {x: frameWidth * 0.7, y: canvasHeight - frameWidth * 0.7},
    {x: canvasWidth - frameWidth * 0.7, y: canvasHeight - frameWidth * 0.7},
  ];
  cornerHearts.forEach((corner) => {
    const heartType = pseudoRandom(corner.x, corner.y) > 0.5 ? hearts[1] : hearts[0];
    ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.fillText(heartType, corner.x, corner.y);
  });
  ctx.restore();
}
function drawCornerDecorations(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, frameWidth: number): void {
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 2;
  const cornerSize = frameWidth * 0.6;
  ctx.beginPath();
  ctx.arc(cornerSize, cornerSize, cornerSize * 0.7, Math.PI, Math.PI * 1.5);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(canvasWidth - cornerSize, cornerSize, cornerSize * 0.7, Math.PI * 1.5, 0);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cornerSize, canvasHeight - cornerSize, cornerSize * 0.7, Math.PI * 0.5, Math.PI);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(canvasWidth - cornerSize, canvasHeight - cornerSize, cornerSize * 0.7, 0, Math.PI * 0.5);
  ctx.stroke();
  ctx.restore();
}
function drawInnerFrameBorder(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, frameWidth: number): void {
  ctx.save();
  const innerGradient = ctx.createLinearGradient(frameWidth, frameWidth, canvasWidth - frameWidth, canvasHeight - frameWidth);
  innerGradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
  innerGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)');
  innerGradient.addColorStop(1, 'rgba(255, 255, 255, 0.3)');
  ctx.strokeStyle = innerGradient;
  ctx.lineWidth = 3;
  ctx.strokeRect(frameWidth - 1.5, frameWidth - 1.5, canvasWidth - (frameWidth * 2) + 3, canvasHeight - (frameWidth * 2) + 3);
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.lineWidth = 1;
  ctx.strokeRect(frameWidth + 1, frameWidth + 1, canvasWidth - (frameWidth * 2) - 2, canvasHeight - (frameWidth * 2) - 2);
  ctx.restore();
}
function drawPixelPerfectBackground(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number): void {
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(x, y, width, height);
}
function drawBackgroundImageWithCallback(ctx: CanvasRenderingContext2D, layout: PosterLayout, callback: () => void): void {
  const bgImg = new Image();
  bgImg.crossOrigin = 'anonymous';
  bgImg.src = '/Background.png';
  bgImg.onload = () => {
    const mainAreaHeight = layout.posterHeight - layout.footerHeight;
    ctx.drawImage(bgImg, layout.posterX, layout.posterY, layout.posterWidth, mainAreaHeight);
    callback();
  };
  bgImg.onerror = () => {
    const mainAreaHeight = layout.posterHeight - layout.footerHeight;
    const gradient = ctx.createLinearGradient(layout.posterX, layout.posterY, layout.posterX, layout.posterY + mainAreaHeight);
    gradient.addColorStop(0, '#f8f9fa');
    gradient.addColorStop(1, '#e9ecef');
    ctx.fillStyle = gradient;
    ctx.fillRect(layout.posterX, layout.posterY, layout.posterWidth, mainAreaHeight);
    callback();
  };
}
function drawNameAndDesignation(ctx: CanvasRenderingContext2D, layout: PosterLayout, name: string, designation: string): void {
  const rightX = layout.posterX + (layout.posterWidth * 0.75); 
  ctx.save();
  ctx.font = 'bold 22px "Poppins", system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#1F2937';
  ctx.fillText(name.toUpperCase(), rightX, layout.posterY + layout.nameY);
  if (designation) {
    ctx.font = '20px "Poppins", sans-serif';
    ctx.fillStyle = '#DC2626';
    ctx.fillText(designation, rightX, layout.posterY + layout.designationY);
  }
  ctx.restore();
}
function drawPixelPerfectProfile(ctx: CanvasRenderingContext2D, layout: PosterLayout, data: WorldHeartDayPosterData): void {
  const centerX = layout.posterX + (layout.posterWidth * 0.72); 
  const centerY = layout.posterY + layout.profileY;
  const radius = 100; 
  ctx.save();
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius + 4, 0, 2 * Math.PI);
  ctx.fill();
  if (data.imageData) {
    drawUserImage(ctx, data.imageData, centerX, centerY, radius);
  } else {
    drawDefaultProfileImage(ctx, centerX, centerY, radius);
  }
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius + 2, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.restore();
}
function drawUserImage(
  ctx: CanvasRenderingContext2D,
  imageData: string,
  centerX: number,
  centerY: number,
  radius: number
): void {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.clip();
    const imgAspect = img.width / img.height;
    let drawWidth, drawHeight;
    if (imgAspect > 1) {
      drawHeight = radius * 2;
      drawWidth = drawHeight * imgAspect;
    } else {
      drawWidth = radius * 2;
      drawHeight = drawWidth / imgAspect;
    }
    const drawX = centerX - drawWidth / 2;
    const drawY = centerY - drawHeight / 2;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    ctx.restore();
  };
  img.src = imageData;
}
function drawDefaultProfileImage(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number
): void {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = '/Profile.jpg';
  img.onload = () => {
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.clip();
    const imgAspect = img.width / img.height;
    let drawWidth, drawHeight;
    if (imgAspect > 1) {
      drawHeight = radius * 2;
      drawWidth = drawHeight * imgAspect;
    } else {
      drawWidth = radius * 2;
      drawHeight = drawWidth / imgAspect;
    }
    const drawX = centerX - drawWidth / 2;
    const drawY = centerY - drawHeight / 2;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    ctx.restore();
  };
  img.onerror = () => {
    drawProfessionalPlaceholder(ctx, centerX, centerY, radius);
  };
}
function drawProfessionalPlaceholder(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number
): void {
  ctx.fillStyle = '#F3F4F6';
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.fillStyle = '#9CA3AF';
  ctx.font = '40px system-ui';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('👤', centerX, centerY);
}
function drawPixelPerfectMessage(
  ctx: CanvasRenderingContext2D,
  layout: PosterLayout,
  message: string
): void {
  const centerX = layout.posterX + (layout.posterWidth * 0.28);
  const maxWidth = layout.posterWidth * 0.5; 
  const messageY = layout.posterY + layout.messageY;
  ctx.save();
  ctx.font = '22px "Poppins", system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#374151';
  const words = message.split(' ');
  const lines = [];
  let currentLine = '';
  for (const word of words) {
    const testLine = currentLine + word + ' ';
    if (ctx.measureText(testLine).width > maxWidth && currentLine !== '') {
      lines.push(currentLine.trim());
      currentLine = word + ' ';
    } else {
      currentLine = testLine;
    }
  }
  lines.push(currentLine.trim());
  const lineHeight = 26;
  const maxLines = 6;
  const linesToShow = Math.min(lines.length, maxLines);
  const totalTextHeight = (linesToShow - 1) * lineHeight;
  const startY = messageY - (totalTextHeight / 2);
  for (let i = 0; i < linesToShow; i++) {
    ctx.fillText(lines[i], centerX, startY + i * lineHeight);
  }
  ctx.restore();
}
function drawFooterWithFrame(ctx: CanvasRenderingContext2D, layout: PosterLayout, callback: () => void): void {
  const footerImg = new Image();
  footerImg.crossOrigin = 'anonymous';
  footerImg.src = '/Footer.jpg';
  footerImg.onload = () => {
    const footerY = layout.posterY + layout.posterHeight - layout.footerHeight;
    ctx.drawImage(footerImg, layout.posterX, footerY, layout.posterWidth, layout.footerHeight);
    ctx.save();
    ctx.strokeStyle = '#DC2626';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(layout.posterX + 10, footerY);
    ctx.lineTo(layout.posterX + layout.posterWidth - 10, footerY);
    ctx.stroke();
    ctx.restore();
    callback();
  };
  footerImg.onerror = () => {
    const footerY = layout.posterY + layout.posterHeight - layout.footerHeight;
    ctx.fillStyle = '#DC2626';
    ctx.fillRect(layout.posterX, footerY, layout.posterWidth, layout.footerHeight);
    ctx.save();
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(layout.posterX + 10, footerY);
    ctx.lineTo(layout.posterX + layout.posterWidth - 10, footerY);
    ctx.stroke();
    ctx.restore();
    callback();
  };
}