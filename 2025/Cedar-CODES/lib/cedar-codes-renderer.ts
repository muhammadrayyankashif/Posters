export interface CedarCodesPosterData {
  name: string;
  designation: string;
  message: string;
  imageData?: string;
}

export function renderCedarCodesPoster(
  canvas: HTMLCanvasElement,
  data: CedarCodesPosterData
): Promise<void> {
  return new Promise((resolve, reject) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      reject(new Error('Canvas context not available'));
      return;
    }

    // Set dimensions to match background image aspect ratio (1587/2 x 2245/2)
    canvas.width = 793.5;
    canvas.height = 1122.5;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Step 1: Draw black background
    drawBlackBackground(ctx, canvas.width, canvas.height);

    // Step 2: Draw profile image (with placeholder if not provided)
    drawProfileImage(ctx, data.imageData).then(() => {
      // Step 3: Draw Background.png on top
      drawBackgroundImage(ctx, canvas.width, canvas.height).then(() => {
        // Step 4: Draw other dynamic elements
        drawName(ctx, data.name);
        drawDesignation(ctx, data.designation);
        drawMessage(ctx, data.message);
        drawCedarLogo(ctx);
        resolve();
      }).catch(reject);
    }).catch(reject);
  });
}

// Draw black background
function drawBlackBackground(ctx: CanvasRenderingContext2D, width: number, height: number): void {
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, width, height);
}

// Draw Background.png from public folder
function drawBackgroundImage(ctx: CanvasRenderingContext2D, width: number, height: number): Promise<void> {
  return new Promise((resolve, reject) => {
    const bgImg = new Image();
    bgImg.crossOrigin = 'anonymous';
    bgImg.src = '/Background.png';

    bgImg.onload = () => {
      ctx.drawImage(bgImg, 0, 0, width, height);
      resolve();
    };

    bgImg.onerror = () => {
      reject(new Error('Failed to load Background.png'));
    };
  });
}


// Draw profile image in square frame
function drawProfileImage(ctx: CanvasRenderingContext2D, imageData?: string): Promise<void> {
  return new Promise((resolve) => {
    const x = 431;
    const y = 440;
    const size = 285;

    const imageSrc = imageData || '/Profile.jpg';
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      ctx.save();

      // Create rounded rectangle clipping path with different corner radius
      const radiusLarge = 35; // Large radius for left and top-right
      const radiusSmall = 15; // Small radius for bottom-right
      ctx.beginPath();
      ctx.moveTo(x + radiusLarge, y);
      ctx.lineTo(x + size - radiusLarge, y);
      ctx.arcTo(x + size, y, x + size, y + radiusLarge, radiusLarge);
      ctx.lineTo(x + size, y + size - radiusSmall);
      ctx.arcTo(x + size, y + size, x + size - radiusSmall, y + size, radiusSmall);
      ctx.lineTo(x + radiusLarge, y + size);
      ctx.arcTo(x, y + size, x, y + size - radiusLarge, radiusLarge);
      ctx.lineTo(x, y + radiusLarge);
      ctx.arcTo(x, y, x + radiusLarge, y, radiusLarge);
      ctx.closePath();
      ctx.clip();

      // Calculate dimensions to fill square while maintaining aspect ratio
      const aspect = img.width / img.height;
      let w, h, drawX, drawY;

      if (aspect > 1) {
        h = size;
        w = h * aspect;
        drawX = x - (w - size) / 2;
        drawY = y;
      } else {
        w = size;
        h = w / aspect;
        drawX = x;
        drawY = y - (h - size) / 2;
      }

      ctx.drawImage(img, drawX, drawY, w, h);
      ctx.restore();

      resolve();
    };

    img.onerror = () => resolve();
    img.src = imageSrc;
  });
}

// Draw Cedar CODES logo/branding text
function drawCedarLogo(ctx: CanvasRenderingContext2D): void {
  // Logo removed
}

// Draw member name
function drawName(ctx: CanvasRenderingContext2D, name: string): void {
  ctx.fillStyle = '#F0F9F8';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';

  const maxWidth = 340;
  const centerX = 198.375; // Center of left half (793.5 / 4)
  const text = name.toUpperCase();

  // Dynamic font sizing - fills space based on name length
  let fontSize = 48;
  ctx.font = `bold ${fontSize}px Arial, sans-serif`;
  let textWidth = ctx.measureText(text).width;

  // Decrease if too wide
  while (textWidth > maxWidth && fontSize > 28) {
    fontSize -= 1;
    ctx.font = `bold ${fontSize}px Arial, sans-serif`;
    textWidth = ctx.measureText(text).width;
  }

  // Increase if there's space (for shorter names)
  while (textWidth < maxWidth * 0.6 && fontSize < 55) {
    fontSize += 1;
    ctx.font = `bold ${fontSize}px Arial, sans-serif`;
    const newWidth = ctx.measureText(text).width;
    if (newWidth <= maxWidth) {
      textWidth = newWidth;
    } else {
      fontSize -= 1;
      break;
    }
  }

  ctx.fillText(text, centerX, 540);
}

// Draw member designation
function drawDesignation(ctx: CanvasRenderingContext2D, designation: string): void {
  ctx.fillStyle = '#14B8A6';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';

  const maxWidth = 340;
  const centerX = 198.375; // Center of left half (793.5 / 4)
  const text = designation;

  // Dynamic font sizing - fills space based on designation length
  let fontSize = 32;
  ctx.font = `bold ${fontSize}px Arial, sans-serif`;
  let textWidth = ctx.measureText(text).width;

  // Decrease if too wide
  while (textWidth > maxWidth && fontSize > 16) {
    fontSize -= 1;
    ctx.font = `bold ${fontSize}px Arial, sans-serif`;
    textWidth = ctx.measureText(text).width;
  }

  // Increase if there's space (for shorter designations)
  while (textWidth < maxWidth * 0.6 && fontSize < 40) {
    fontSize += 1;
    ctx.font = `bold ${fontSize}px Arial, sans-serif`;
    const newWidth = ctx.measureText(text).width;
    if (newWidth <= maxWidth) {
      textWidth = newWidth;
    } else {
      fontSize -= 1;
      break;
    }
  }

  ctx.fillText(text, centerX, 640);
}

// Draw custom message
function drawMessage(ctx: CanvasRenderingContext2D, message: string): void {
  const x = 80;
  const y = 940;
  const maxWidth = 666.5;
  const maxHeight = 159;

  ctx.fillStyle = '#E0F2F1';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';

  // Helper to wrap text
  const getWrappedLines = (fontSize: number): string[] => {
    ctx.font = `${fontSize}px Arial, sans-serif`;
    const words = message.split(' ');
    const lines: string[] = [];
    let line = '';

    for (const word of words) {
      const test = line + word + ' ';
      if (ctx.measureText(test).width > maxWidth && line !== '') {
        lines.push(line.trim());
        line = word + ' ';
      } else {
        line = test;
      }
    }
    lines.push(line.trim());
    return lines;
  };

  // Start with reasonable font size and fit text
  let fontSize = 20;
  let lineHeight = fontSize * 1.4;
  let lines = getWrappedLines(fontSize);
  let totalHeight = lines.length * lineHeight;

  // Decrease font size if needed
  while (totalHeight > maxHeight && fontSize > 12) {
    fontSize -= 1;
    lineHeight = fontSize * 1.4;
    lines = getWrappedLines(fontSize);
    totalHeight = lines.length * lineHeight;
  }

  // Increase font size if there's space - dynamically fills based on message length
  while (totalHeight < maxHeight * 0.75 && fontSize < 32) {
    fontSize += 1;
    lineHeight = fontSize * 1.4;
    const testLines = getWrappedLines(fontSize);
    const testHeight = testLines.length * lineHeight;

    if (testHeight <= maxHeight) {
      lines = testLines;
      totalHeight = testHeight;
    } else {
      fontSize -= 1;
      break;
    }
  }

  ctx.font = `${fontSize}px Arial, sans-serif`;
  lineHeight = fontSize * 1.4;

  // Draw text with italic style for emphasis
  ctx.font = `italic ${fontSize}px Arial, sans-serif`;
  lines.forEach((line, index) => {
    ctx.fillText(line, x, y + index * lineHeight);
  });
}
