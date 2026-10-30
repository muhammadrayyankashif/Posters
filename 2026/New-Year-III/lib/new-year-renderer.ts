
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
    canvas.width = 1080;
    canvas.height = 1080;
    const bgImage = new Image();
    bgImage.crossOrigin = "anonymous";
    bgImage.src = `/Background.png?t=${Date.now()}`;
    bgImage.onload = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }
      ctx.fillStyle = "#FFFFFF"; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      const contentMidY = canvas.height / 2; 
      const contentWidth = canvas.width; 
      const leftWidth = contentWidth * 0.4; 
      const profileX = leftWidth / 2; 
      const rightWidth = contentWidth * 0.6; 
      const rightX = leftWidth + rightWidth / 2; 
      const profileConfig = {
        x: profileX,
        y: contentMidY, 
        radius: 150, 
        strokeColor: "#FFFFFF",
        strokeWidth: 6,
      };
      const rightTextStartY = canvas.height * 0.45; 
      const textConfig = {
        nameY: rightTextStartY,
        desigY: rightTextStartY + 50,
      };
      const messageConfig = {
        centerX: rightX,
        centerY: textConfig.desigY + 170, 
        maxWidth: 550, 
        color: "#FFFFFF",
      };
      const drawContent = () => {
        drawScaledText(
          ctx,
          data.name.toUpperCase(),
          rightX,
          textConfig.nameY,
          450, 
          50, 
          "#166534",
          "Arial",
          "bold",
          "center"
        );
        drawScaledText(
          ctx,
          data.designation,
          rightX,
          textConfig.desigY,
          450,
          30,
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
          messageConfig.centerX,
          30 
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
  radius: number;
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
      ctx.beginPath();
      ctx.arc(config.x, config.y, config.radius, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.save();
      ctx.clip();
      const aspect = img.width / img.height;
      let w, h, dx, dy;
      if (aspect > 1) {
        h = config.radius * 2;
        w = h * aspect;
        dx = config.x - w / 2;
        dy = config.y - config.radius;
      } else {
        w = config.radius * 2;
        h = w / aspect;
        dx = config.x - config.radius;
        dy = config.y - h / 2;
      }
      ctx.drawImage(img, dx, dy, w, h);
      ctx.restore(); 
      ctx.beginPath();
      ctx.arc(config.x, config.y, config.radius, 0, Math.PI * 2, true);
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
  centerX: number,
  initialFontSize: number = 42
) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = "rgba(255, 255, 255, 0.4)";
  ctx.shadowBlur = 2;
  let fontSize = initialFontSize;
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
