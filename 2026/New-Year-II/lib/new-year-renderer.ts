
// Types
export interface NewYearPosterData {
  name: string;
  designation: string;
  message: string;
  imageData?: string;
}
export function renderNewYearPoster(
  canvas: HTMLCanvasElement,
  data: NewYearPosterData
): Promise<void> {
  return new Promise((resolve, reject) => {
    canvas.width = 1000;
    canvas.height = 1335;
    const bgImage = new Image();
    bgImage.crossOrigin = "anonymous";
    bgImage.src = `/Background.png?t=${Date.now()}`;
    bgImage.onload = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }
      ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      const centerX = canvas.width / 2;
      const profileConfig = {
        x: centerX,
        y: 550, 
        size: 320, 
        borderRadius: 40, 
        strokeColor: "#FFFFFF",
        strokeWidth: 6,
      };
      const textConfig = {
        nameY: 800, 
        desigY: 850, 
      };
      const messageConfig = {
        centerX: centerX,
        centerY: 1060, 
        maxWidth: 700, 
        color: "#FFFFFF", 
      };
      const drawContent = () => {
        drawScaledText(
          ctx,
          data.name.toUpperCase(),
          centerX,
          textConfig.nameY,
          900, 
          60, 
          "#166534", 
          "Arial",
          "bold",
          "center"
        );
        drawScaledText(
          ctx,
          data.designation,
          centerX,
          textConfig.desigY,
          900,
          40,
          "#333333", 
          "Arial",
          "normal",
          "center"
        );
        drawMessage(
          ctx,
          data.message,
          messageConfig.centerY,
          messageConfig.maxWidth,
          "#000000", 
          messageConfig.centerX
        );
        resolve();
      };
      const imageToDraw = data.imageData || "/Profile.jpg";
      drawProfileImage(ctx, imageToDraw, profileConfig)
        .then(drawContent)
        .catch(() => {
          drawContent();
        });
    };
    bgImage.onerror = () => {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      reject(new Error("Failed to load background image"));
    };
  });
}
interface ProfileConfig {
  x: number;
  y: number;
  size: number;
  borderRadius: number;
  strokeColor: string;
  strokeWidth: number;
}
function drawProfileImage(
  ctx: CanvasRenderingContext2D,
  imageData: string,
  config: ProfileConfig
): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageData;
    img.onload = () => {
      ctx.save();
      const r = config.borderRadius;
      const x = config.x - config.size / 2;
      const y = config.y - config.size / 2;
      const w = config.size;
      const h = config.size;
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
      ctx.save();
      ctx.clip();
      const aspect = img.width / img.height;
      let imgW, imgH, dx, dy;
      if (aspect > 1) {
        imgH = w;
        imgW = imgH * aspect;
        dx = x - (imgW - w) / 2;
        dy = y;
      } else {
        imgW = w;
        imgH = imgW / aspect;
        dx = x;
        dy = y - (imgH - h) / 2;
      }
      ctx.drawImage(img, dx, dy, imgW, imgH);
      ctx.restore(); 
      ctx.lineWidth = config.strokeWidth;
      ctx.strokeStyle = config.strokeColor;
      ctx.stroke();
      ctx.restore(); 
      resolve();
    };
    img.onerror = () => reject();
  });
}
function drawScaledText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  maxFontSize: number,
  color: string,
  fontFace: string = "Arial",
  fontWeight: string = "normal",
  align: CanvasTextAlign = "center"
) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.shadowColor = "rgba(255, 255, 255, 0.5)";
  ctx.shadowBlur = 4;
  let fontSize = maxFontSize;
  ctx.font = `${fontWeight} ${fontSize}px ${fontFace}`;
  while (ctx.measureText(text).width > maxWidth && fontSize > 10) {
    fontSize -= 1;
    ctx.font = `${fontWeight} ${fontSize}px ${fontFace}`;
  }
  ctx.fillText(text, x, y);
  ctx.restore();
}
function drawMessage(
  ctx: CanvasRenderingContext2D,
  message: string,
  centerY: number,
  maxWidth: number,
  color: string,
  centerX: number
) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = "rgba(255, 255, 255, 0.4)";
  ctx.shadowBlur = 2;
  let fontSize = 40; 
  ctx.font = `italic 600 ${fontSize}px Arial, sans-serif`;
  const words = message.split(" ");
  let lines = [];
  while (fontSize > 20) {
    ctx.font = `italic 600 ${fontSize}px Arial, sans-serif`;
    lines = [];
    let line = "";
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " ";
      if (ctx.measureText(testLine).width > maxWidth && n > 0) {
        lines.push(line);
        line = words[n] + " ";
      } else {
        line = testLine;
      }
    }
    lines.push(line);
    const totalHeight = lines.length * (fontSize * 1.4);
    if (totalHeight > 600) {
      fontSize -= 2;
    } else {
      break;
    }
  }
  const lineHeight = fontSize * 1.4;
  const totalTextBlockHeight = lines.length * lineHeight;
  let currentY = centerY - totalTextBlockHeight / 2 + lineHeight / 2;
  for (let i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], centerX, currentY);
    currentY += lineHeight;
  }
  ctx.restore();
}
