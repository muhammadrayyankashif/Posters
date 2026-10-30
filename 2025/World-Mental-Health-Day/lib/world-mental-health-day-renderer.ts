
// Types
export interface WorldMentalHealthDayPosterData {
  name: string;
  designation: string;
  designationLine2?: string;
  message: string;
  imageData?: string;
}
export function renderWorldMentalHealthDayPoster(
  canvas: HTMLCanvasElement,
  data: WorldMentalHealthDayPosterData
): Promise<void> {
  return new Promise((resolve, reject) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      reject(new Error("Canvas context not available"));
      return;
    }
    canvas.width = 1000;
    canvas.height = 750;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    const bgImage = new Image();
    bgImage.crossOrigin = "anonymous";
    bgImage.onload = () => {
      ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
      if (data.imageData) {
        drawProfileImage(ctx, data.imageData)
          .then(() => {
            drawName(ctx, data.name);
            drawDesignation(ctx, data.designation, data.designationLine2);
            drawMessage(ctx, data.message);
            resolve();
          })
          .catch(reject);
      } else {
        drawProfileImage(ctx, data.imageData);
        drawName(ctx, data.name);
        drawDesignation(ctx, data.designation, data.designationLine2);
        drawMessage(ctx, data.message);
        resolve();
      }
    };
    bgImage.onerror = () => {
      reject(new Error("Failed to load background image"));
    };
    bgImage.src = "/Background.png";
  });
}
function drawProfileImage(
  ctx: CanvasRenderingContext2D,
  imageData?: string
): Promise<void> {
  return new Promise((resolve) => {
    const x = 90; 
    const y = 119; 
    const width = 240; 
    const height = 228; 
    const imageSrc = imageData || "/profile.jpg";
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      ctx.save();
      ctx.beginPath();
      ctx.rect(x, y, width, height);
      ctx.clip();
      const aspect = img.width / img.height;
      let w, h, drawX, drawY;
      if (aspect > 1) {
        h = height;
        w = h * aspect;
        drawX = x - (w - width) / 2;
        drawY = y;
      } else {
        w = width;
        h = w / aspect;
        drawX = x;
        drawY = y - (h - height) / 2;
      }
      ctx.drawImage(img, drawX, drawY, w, h);
      ctx.restore();
      ctx.strokeStyle = "#E5E7EB";
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, width, height);
      resolve();
    };
    img.onerror = () => resolve(); 
    img.src = imageSrc;
  });
}
function drawName(ctx: CanvasRenderingContext2D, name: string): void {
  ctx.fillStyle = "#000000";
  ctx.font = "bold 18px Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const text = name.toUpperCase();
  ctx.fillText(text, 210, 375);
}
function drawDesignation(
  ctx: CanvasRenderingContext2D,
  designation: string,
  designationLine2?: string
): void {
  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const centerX = 210;
  const maxWidth = 200; 
  const fitText = (text: string): { fontSize: number; text: string } => {
    let fontSize = 21;
    const textLength = text.length;
    if (textLength < 10) {
      fontSize = 28;
    } else if (textLength < 15) {
      fontSize = 25;
    } else if (textLength < 20) {
      fontSize = 22;
    } else {
      fontSize = 21;
    }
    ctx.font = `bold ${fontSize}px Arial, sans-serif`;
    let textWidth = ctx.measureText(text).width;
    while (textWidth > maxWidth && fontSize > 14) {
      fontSize -= 1;
      ctx.font = `bold ${fontSize}px Arial, sans-serif`;
      textWidth = ctx.measureText(text).width;
    }
    return { fontSize, text };
  };
  if (designationLine2 && designationLine2.trim() !== "") {
    const line1 = fitText(designation);
    const line2 = fitText(designationLine2);
    const fontSize = Math.min(line1.fontSize, line2.fontSize);
    const lineHeight = fontSize + 4;
    ctx.font = `bold ${fontSize}px Arial, sans-serif`;
    const startY = 428 - lineHeight / 2;
    ctx.fillText(line1.text, centerX, startY);
    ctx.fillText(line2.text, centerX, startY + lineHeight);
  } else {
    const line1 = fitText(designation);
    ctx.font = `bold ${line1.fontSize}px Arial, sans-serif`;
    ctx.fillText(line1.text, centerX, 428);
  }
}
function drawMessage(ctx: CanvasRenderingContext2D, message: string): void {
  const x = 445;
  const maxWidth = 470;
  const boxHeight = 270;
  const boxTopY = 180;
  ctx.fillStyle = "#1F2937";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  const getWrappedLines = (fontSize: number): string[] => {
    ctx.font = `${fontSize}px Arial, sans-serif`;
    const words = message.split(" ");
    const lines: string[] = [];
    let line = "";
    for (const word of words) {
      const test = line + word + " ";
      if (ctx.measureText(test).width > maxWidth && line !== "") {
        lines.push(line.trim());
        line = word + " ";
      } else {
        line = test;
      }
    }
    lines.push(line.trim());
    return lines;
  };
  let fontSize = 50; 
  let lineHeight = fontSize * 1.3;
  let lines = getWrappedLines(fontSize);
  let totalTextHeight = lines.length * lineHeight;
  while (totalTextHeight > boxHeight && fontSize > 16) {
    fontSize -= 1;
    lineHeight = fontSize * 1.3;
    lines = getWrappedLines(fontSize);
    totalTextHeight = lines.length * lineHeight;
  }
  while (totalTextHeight < boxHeight * 0.6 && fontSize < 50) {
    fontSize += 1;
    lineHeight = fontSize * 1.3;
    const testLines = getWrappedLines(fontSize);
    const testHeight = testLines.length * lineHeight;
    if (testHeight <= boxHeight) {
      lines = testLines;
      totalTextHeight = testHeight;
    } else {
      fontSize -= 1;
      break;
    }
  }
  ctx.font = `${fontSize}px Arial, sans-serif`;
  const startY = boxTopY + (boxHeight - totalTextHeight) / 2;
  lines.forEach((l, i) => {
    ctx.fillText(l, x, startY + i * lineHeight);
  });
}
