// Imports
import { POSTER_STYLES } from "./poster-config";
import { PosterStyle, StyleConfig } from "@/types/poster";

// Types
export interface PosterRenderData {
  name: string;
  designation: string;
  message: string;
  imageData?: string;
}
export interface CanvasRenderContext {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
}

// Renderer
export class StyleRenderer {
  private style: PosterStyle;
  private config: StyleConfig;
  private posterData?: PosterRenderData;
  constructor(styleId: string) {

// Constants
    const style = POSTER_STYLES.find((s) => s.id === styleId);
    if (!style) {
      throw new Error(`Style with id "${styleId}" not found`);
    }
    this.style = style;
    this.config = style.config;
  }
  public render(context: CanvasRenderContext, data: PosterRenderData): void {
    this.posterData = data; 
    this.setupCanvas(context);
    this.drawBackground(context);
    if (this.style.id !== "style1" && this.style.id !== "style3") {
      this.drawHeader(context);
      this.drawProfile(context, data);
      this.drawContent(context, data);
      this.drawFooter(context);
    }
  }
  private drawContentForStyle1(context: CanvasRenderContext): void {
    if (!this.posterData) return;
    this.drawHeader(context);
    this.drawProfile(context, this.posterData);
    this.drawContent(context, this.posterData);
    this.drawFooter(context);
  }
  private drawContentForStyle3(context: CanvasRenderContext): void {
    if (!this.posterData) return;
    this.drawHeader(context);
    this.drawProfile(context, this.posterData);
    this.drawContent(context, this.posterData);
    this.drawFooter(context);
  }
  private setupCanvas(context: CanvasRenderContext): void {
    const { canvas, ctx } = context;
    const targetWidth = 600;
    const targetHeight = 800;
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    context.width = targetWidth;
    context.height = targetHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    canvas.style.width = "100%";
    canvas.style.height = "auto";
    canvas.style.maxWidth = "300px";
    canvas.style.aspectRatio = "3/4"; 
  }
  private drawBackground(context: CanvasRenderContext): void {
    const { ctx, width, height } = context;
    if (this.style.id === "style1") {
      const bgImg = new Image();
      bgImg.crossOrigin = "anonymous";
      bgImg.src = "/background2.png";
      bgImg.onload = () => {
        ctx.drawImage(bgImg, 0, 0, width, height);
        ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
        ctx.fillRect(0, 0, width, height);
        this.drawContentForStyle1(context);
      };
      bgImg.onerror = () => {
        ctx.fillStyle = this.config.colors.background;
        ctx.fillRect(0, 0, width, height);
        this.drawContentForStyle1(context);
      };
      return;
    }
    if (this.style.id === "style3") {
      const bgImg = new Image();
      bgImg.crossOrigin = "anonymous";
      bgImg.src = "/Background.png";
      bgImg.onload = () => {
        ctx.drawImage(bgImg, 0, 0, width, height);
        this.drawContentForStyle3(context);
      };
      bgImg.onerror = () => {
        ctx.fillStyle = this.config.colors.background;
        ctx.fillRect(0, 0, width, height);
        this.drawContentForStyle3(context);
      };
      return;
    }
    if (this.config.colors.background.startsWith("linear-gradient")) {
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#fef3c7");
      gradient.addColorStop(1, "#fef9e7");
      ctx.fillStyle = gradient;
    } else {
      ctx.fillStyle = this.config.colors.background;
    }
    ctx.fillRect(0, 0, width, height);
    if (this.config.decorations.backgroundPattern) {
      this.drawBackgroundPattern(context);
    }
  }
  private drawBackgroundPattern(context: CanvasRenderContext): void {
    const { ctx, width, height } = context;
    ctx.save();
    if (this.style.id === "style3") {
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"; 
      ctx.lineWidth = 1;
      for (let x = -height; x < width + height; x += 80) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + height, height);
        ctx.stroke();
      }
      ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
      for (let x = 40; x < width; x += 100) {
        for (let y = 150; y < height - 100; y += 100) {
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, 2 * Math.PI);
          ctx.fill();
        }
      }
    } else {
      ctx.strokeStyle = this.config.colors.decorative.replace("0.25", "0.02");
      ctx.lineWidth = 1;
      for (let x = -height; x < width + height; x += 60) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + height, height);
        ctx.stroke();
      }
      ctx.fillStyle = this.config.colors.decorative.replace("0.25", "0.03");
      for (let x = 30; x < width; x += 80) {
        for (let y = 150; y < height - 100; y += 80) {
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, 2 * Math.PI);
          ctx.fill();
        }
      }
    }
    ctx.restore();
  }
  public drawHeader(context: CanvasRenderContext): void {
    if (this.style.id === "style1" || this.style.id === "style3") {
      return;
    }
    const { ctx, width } = context;
    const headerHeight = this.config.layout.headerHeight;
    const screenImg = new Image();
    screenImg.crossOrigin = "anonymous";
    screenImg.src = "/Screen.png";
    screenImg.onload = () => {
      ctx.drawImage(screenImg, 0, 0, width, headerHeight);
    };
    screenImg.onerror = () => {
      const headerGradient = ctx.createLinearGradient(0, 0, 0, headerHeight);
      headerGradient.addColorStop(0, this.config.colors.headerGradient[0]);
      headerGradient.addColorStop(1, this.config.colors.headerGradient[1]);
      ctx.fillStyle = headerGradient;
      ctx.fillRect(0, 0, width, headerHeight);
      if (this.config.decorations.geometric) {
        this.drawHeaderDecorations(context);
      }
      ctx.fillStyle = this.config.colors.secondary;
      ctx.font = `bold 30px ${this.config.fonts.heading}`;
      ctx.textAlign = "center";
      ctx.fillText("PAKISTAN INDEPENDENCE DAY", width / 2, headerHeight * 0.5);
      ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
      ctx.font = `18px ${this.config.fonts.body}`;
      ctx.fillText("14th August, 2025", width / 2, headerHeight * 0.62);
    };
  }
  private drawHeaderDecorations(context: CanvasRenderContext): void {
    const { ctx, width } = context;
    ctx.save();
    ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
    if (this.config.decorations.stars) {
      this.drawStar(ctx, 30, 30, 5, 8, 4);
      this.drawStar(ctx, width - 30, 30, 5, 8, 4);
    }
    if (this.config.decorations.geometric) {
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(width / 2 - 50, 110);
      ctx.quadraticCurveTo(width / 2, 95, width / 2 + 50, 110);
      ctx.stroke();
    }
    ctx.restore();
  }
  public drawProfile(
    context: CanvasRenderContext,
    data: PosterRenderData
  ): void {
    const { ctx, width } = context;
    let centerX, centerY, radius;
    if (this.style.id === "style1") {
      centerX = width * 0.3; 
      centerY = this.config.layout.profileY;
      radius = this.config.layout.profileRadius;
    } else if (this.style.id === "style3") {
      centerX = width / 2; 
      centerY = 180; 
      radius = 65; 
    } else {
      centerX = width / 2;
      centerY = this.config.layout.profileY;
      radius = this.config.layout.profileRadius;
    }
    if (
      this.config.decorations.stars &&
      this.style.id !== "style2" &&
      this.style.id !== "style3"
    ) {
      this.drawEmptyAreaRefinements(context, centerX);
    }
    let profileBgColor;
    if (this.style.id === "style1") {
      profileBgColor = "rgba(255, 255, 255, 0.2)";
    } else if (this.style.id === "style3") {
      profileBgColor = "rgba(255, 255, 255, 0.9)"; 
    } else {
      profileBgColor = "#f8f9fa";
    }
    ctx.fillStyle = profileBgColor;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 8, 0, 2 * Math.PI);
    ctx.fill();
    if (data.imageData) {
      this.drawUserImage(context, data.imageData, centerX, centerY, radius);
    } else {
      this.drawPlaceholder(context, centerX, centerY, radius);
    }
  }
  private drawUserImage(
    context: CanvasRenderContext,
    imageData: string,
    centerX: number,
    centerY: number,
    radius: number
  ): void {
    const { ctx } = context;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.clip();
      const imgAspect = img.width / img.height;
      let drawWidth, drawHeight, drawX, drawY;
      if (imgAspect > 1) {
        drawHeight = radius * 2;
        drawWidth = drawHeight * imgAspect;
        drawX = centerX - drawWidth / 2;
        drawY = centerY - drawHeight / 2;
      } else {
        drawWidth = radius * 2;
        drawHeight = drawWidth / imgAspect;
        drawX = centerX - drawWidth / 2;
        drawY = centerY - drawHeight / 2;
      }
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
      ctx.restore();
      ctx.save();
      ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
      ctx.shadowBlur = 8;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 2;
      ctx.strokeStyle = this.config.colors.secondary;
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.shadowColor = "transparent";
      ctx.strokeStyle = this.config.colors.primary;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius - 3, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.restore();
    };
    img.onerror = () => {
      this.drawPlaceholder(context, centerX, centerY, radius);
    };
    img.src = imageData;
  }
  private drawPlaceholder(
    context: CanvasRenderContext,
    centerX: number,
    centerY: number,
    radius: number
  ): void {
    const { ctx } = context;
    ctx.fillStyle = this.config.colors.secondary;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = "#e9ecef";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = "#6c757d";
    ctx.font = `40px ${this.config.fonts.body}`;
    ctx.textAlign = "center";
    ctx.fillText("👤", centerX, centerY + 12);
  }
  public drawContent(
    context: CanvasRenderContext,
    data: PosterRenderData
  ): void {
    const { ctx, width } = context;
    let centerX, nameY, designationY;
    if (this.style.id === "style1") {
      centerX = width * 0.3; 
      nameY = this.config.layout.nameY;
      designationY = this.config.layout.designationY;
    } else if (this.style.id === "style3") {
      centerX = width / 2; 
      nameY = 280; 
      designationY = 310; 
    } else {
      centerX = width / 2;
      nameY = this.config.layout.nameY;
      designationY = this.config.layout.designationY;
    }
    if (this.style.id === "style3") {
      ctx.fillStyle = "#01411C"; 
    } else {
      ctx.fillStyle = this.config.colors.text;
    }
    ctx.font = `bold 24px ${this.config.fonts.heading}`;
    ctx.textAlign = "center";
    ctx.fillText(data.name.toUpperCase(), centerX, nameY);
    if (data.designation) {
      if (this.style.id === "style1") {
        ctx.fillStyle = this.config.colors.text;
      } else if (this.style.id === "style3") {
        ctx.fillStyle = "#2d5a3d"; 
      } else {
        ctx.fillStyle = "#6c757d";
      }
      let fontSize = 20;
      ctx.font = `${fontSize}px ${this.config.fonts.body}`;
      let maxWidth;
      if (this.style.id === "style1") {
        maxWidth = width * 0.5; 
      } else {
        maxWidth = width - 80; 
      }
      while (
        ctx.measureText(data.designation).width > maxWidth &&
        fontSize > 14
      ) {
        fontSize -= 1;
        ctx.font = `${fontSize}px ${this.config.fonts.body}`;
      }
      ctx.fillText(data.designation, centerX, designationY);
    }
    this.drawMessage(context, data.message);
  }
  private drawMessage(context: CanvasRenderContext, message: string): void {
    const { ctx, width } = context;
    let msgX, msgY, msgWidth, textCenterX;
    if (this.style.id === "style1") {
      msgX = 20; 
      msgY = this.config.layout.messageY;
      msgWidth = width * 0.55; 
      textCenterX = msgX + msgWidth / 2; 
    } else if (this.style.id === "style3") {
      msgX = 40; 
      msgY = 350; 
      msgWidth = width - 80; 
      textCenterX = width / 2; 
    } else {
      msgX = 40;
      msgY = this.config.layout.messageY;
      msgWidth = width - 80;
      textCenterX = width / 2;
    }
    const msgHeight = this.config.layout.messageHeight;
    if (this.config.decorations.borders) {
      this.drawMessageDecorations(context, msgX, msgY, msgWidth);
    }
    let messageBgColor;
    if (this.style.id === "style1") {
      messageBgColor = "rgba(255, 255, 255, 0.15)";
    } else if (this.style.id === "style3") {
      messageBgColor = "rgba(255, 255, 255, 0.8)"; 
    } else {
      messageBgColor = "#f8f9fa";
    }
    ctx.fillStyle = messageBgColor;
    ctx.fillRect(msgX, msgY, msgWidth, msgHeight);
    if (this.style.id === "style3") {
      ctx.strokeStyle = "#9CA3AF";
      ctx.lineWidth = 2;
      ctx.strokeRect(msgX, msgY, msgWidth, msgHeight);
    } else if (this.style.id !== "style1") {
      ctx.strokeStyle = this.config.colors.accent;
      ctx.lineWidth = 2;
      ctx.strokeRect(msgX, msgY, msgWidth, msgHeight);
    }
    if (this.style.id === "style3") {
      ctx.fillStyle = "#1a1a1a"; 
    } else {
      ctx.fillStyle = this.config.colors.text;
    }
    ctx.font = `22px ${this.config.fonts.body}`;
    ctx.textAlign = "center";
    ctx.letterSpacing = "0.5px";
    const words = message.split(" ");
    const lines = [];
    let currentLine = "";
    const maxWidth = msgWidth - 40;
    for (const word of words) {
      const testLine = currentLine + word + "  ";
      if (ctx.measureText(testLine).width > maxWidth && currentLine !== "") {
        lines.push(currentLine.trim());
        currentLine = word + "  ";
      } else {
        currentLine = testLine;
      }
    }
    lines.push(currentLine.trim());
    const lineHeight = 23; 
    const startY = msgY + 30;
    for (let i = 0; i < Math.min(lines.length, 4); i++) {
      ctx.fillText(lines[i], textCenterX, startY + i * lineHeight);
    }
  }
  private drawMessageDecorations(
    context: CanvasRenderContext,
    x: number,
    y: number,
    width: number
  ): void {
    const { ctx } = context;
    ctx.save();
    if (this.config.decorations.geometric) {
      ctx.strokeStyle = this.config.colors.decorative.replace("0.25", "0.1");
      ctx.lineWidth = 2;
      const cornerSize = 15;
      ctx.beginPath();
      ctx.moveTo(x - 5, y - 5 + cornerSize);
      ctx.lineTo(x - 5, y - 5);
      ctx.lineTo(x - 5 + cornerSize, y - 5);
      ctx.stroke();
    }
    if (this.config.decorations.stars) {
      ctx.fillStyle = this.config.colors.decorative.replace("0.25", "0.06");
      for (let i = 0; i < 3; i++) {
        const decorY = y + 30 + i * 40;
        this.drawStar(ctx, x - 15, decorY, 3, 4, 2);
        this.drawStar(ctx, x + width + 15, decorY, 3, 4, 2);
      }
    }
    ctx.restore();
  }
  private drawEmptyAreaRefinements(
    context: CanvasRenderContext,
    centerX: number
  ): void {
    const { ctx, width, height } = context;
    ctx.save();
    ctx.fillStyle = this.config.colors.decorative;
    if (this.style.id === "style2") {
      const headerHeight = this.config.layout.headerHeight;
      const numStars = 25; 
      for (let i = 0; i < numStars; i++) {
        const x = Math.random() * (width - 60) + 30; 
        const y =
          Math.random() * (height - headerHeight - 100) + headerHeight + 50; 
        const size = Math.random() * 4 + 3; 
        const innerSize = Math.max(2, size - 2);
        this.drawStar(ctx, x, y, 5, size, innerSize);
      }
    } else {
      const starPositions = [
        [80, 120],
        [width - 80, 120],
        [100, 140],
        [width - 100, 140],
        [70, 190],
        [width - 70, 190],
        [120, 170],
        [width - 120, 170],
        [50, 160],
        [width - 50, 160],
        [50, 280],
        [width - 50, 280],
        [90, 300],
        [width - 90, 300],
        [40, 350],
        [width - 40, 350],
        [110, 380],
        [width - 110, 380],
        [70, 420],
        [width - 70, 420],
        [130, 450],
        [width - 130, 450],
        [60, 580],
        [width - 60, 580],
        [80, 620],
        [width - 80, 620],
        [50, 650],
        [width - 50, 650],
        [100, 680],
        [width - 100, 680],
      ];
      starPositions.forEach(([x, y], index) => {
        const size = index % 3 === 0 ? 7 : index % 2 === 0 ? 5 : 4;
        const innerSize = Math.max(2, size - 2);
        this.drawStar(ctx, x, y, 5, size, innerSize);
      });
    }
    if (this.style.id !== "style2") {
      ctx.fillStyle = this.config.colors.accent;
      const sparklePositions = [
        [centerX - 150, 220],
        [centerX + 150, 220],
        [centerX - 120, 480],
        [centerX + 120, 480],
        [centerX - 180, 350],
        [centerX + 180, 350],
      ];
      sparklePositions.forEach(([x, y]) => {
        this.drawSparkle(ctx, x, y, 3);
      });
      ctx.strokeStyle = "#e9ecef";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(centerX - 100, 560);
      ctx.lineTo(centerX + 100, 560);
      ctx.stroke();
      ctx.fillStyle = this.config.colors.primary;
      ctx.beginPath();
      ctx.arc(centerX - 100, 560, 4, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(centerX + 100, 560, 4, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = this.config.colors.accent;
      ctx.beginPath();
      ctx.arc(centerX, 560, 5, 0, 2 * Math.PI);
      ctx.fill();
    }
    ctx.restore();
  }
  public drawFooter(context: CanvasRenderContext): void {
    const { ctx, width, height } = context;
    const footerY = height - 50;
    const footerHeight = 50;
    let footerBgColor;
    if (this.style.id === "style1") {
      footerBgColor = "#01411C"; 
    } else if (this.style.id === "style3") {
      footerBgColor = "#228B22"; 
    } else {
      footerBgColor = this.config.colors.primary; 
    }
    ctx.fillStyle = footerBgColor;
    ctx.fillRect(0, footerY, width, footerHeight);
    ctx.fillStyle = this.config.colors.secondary;
    ctx.font = `14px ${this.config.fonts.body}`;
    ctx.textAlign = "center";
    ctx.fillText(
      "SOFTSOLS PAKISTAN - Digital AI Transformation  |  www.softsols.pk",
      width / 2,
      footerY + 30
    );
  }
  private drawStar(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    spikes: number,
    outerRadius: number,
    innerRadius: number
  ): void {
    let rot = (Math.PI / 2) * 3;
    const step = Math.PI / spikes;
    ctx.beginPath();
    ctx.moveTo(x, y - outerRadius);
    for (let i = 0; i < spikes; i++) {
      ctx.lineTo(
        x + Math.cos(rot) * outerRadius,
        y + Math.sin(rot) * outerRadius
      );
      rot += step;
      ctx.lineTo(
        x + Math.cos(rot) * innerRadius,
        y + Math.sin(rot) * innerRadius
      );
      rot += step;
    }
    ctx.lineTo(x, y - outerRadius);
    ctx.closePath();
    ctx.fill();
  }
  private drawSparkle(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number
  ): void {
    ctx.save();
    ctx.translate(x, y);
    ctx.lineWidth = 1;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.lineTo(0, size);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-size, 0);
    ctx.lineTo(size, 0);
    ctx.stroke();
    const diagSize = size * 0.7;
    ctx.beginPath();
    ctx.moveTo(-diagSize, -diagSize);
    ctx.lineTo(diagSize, diagSize);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(diagSize, -diagSize);
    ctx.lineTo(-diagSize, diagSize);
    ctx.stroke();
    ctx.restore();
  }
}
export function createStyleRenderer(styleId: string): StyleRenderer {
  return new StyleRenderer(styleId);
}
export function renderPosterWithStyle(
  canvas: HTMLCanvasElement,
  styleId: string,
  data: PosterRenderData
): void {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return;
  }
  try {
    const renderer = createStyleRenderer(styleId);
    const context: CanvasRenderContext = {
      canvas,
      ctx,
      width: canvas.width,
      height: canvas.height,
    };
    renderer.render(context, data);
  } catch (error) {
    throw error;
  }
}
export function renderStyle2WithBackground(
  canvas: HTMLCanvasElement,
  data: PosterRenderData,
  backgroundImageUrl: string
): void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const renderer = createStyleRenderer("style2");
  const bgImg = new Image();
  bgImg.crossOrigin = "anonymous";
  bgImg.onload = function () {
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const context: CanvasRenderContext = {
      canvas,
      ctx,
      width: canvas.width,
      height: canvas.height,
    };
    renderer.drawHeader(context);
    renderer.drawProfile(context, data);
    renderer.drawContent(context, data);
    renderer.drawFooter(context);
  };
  bgImg.onerror = function () {
    renderPosterWithStyle(canvas, "style2", data);
  };
  bgImg.src = backgroundImageUrl;
}
