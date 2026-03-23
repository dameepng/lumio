import { useRef, useEffect } from 'react';

const AREA_MAP = {
  'kiri atas':   { x: 0.05, y: 0.05, w: 0.40, h: 0.40 },
  'kanan atas':  { x: 0.55, y: 0.05, w: 0.40, h: 0.40 },
  'tengah':      { x: 0.25, y: 0.30, w: 0.50, h: 0.40 },
  'kiri bawah':  { x: 0.05, y: 0.55, w: 0.40, h: 0.40 },
  'kanan bawah': { x: 0.55, y: 0.55, w: 0.40, h: 0.40 },
};

export default function ColorOverlay({ colors, videoWidth, videoHeight }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    const displayW = parent?.clientWidth || videoWidth || 320;
    const displayH = parent?.clientHeight || videoHeight || 240;

    canvas.width = displayW;
    canvas.height = displayH;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, displayW, displayH);

    if (!colors || colors.length === 0) return;

    colors.forEach((color) => {
      const area = AREA_MAP[color.area] || AREA_MAP['tengah'];

      const x = area.x * displayW;
      const y = area.y * displayH;
      const w = area.w * displayW;
      const h = area.h * displayH;

      // Border rect
      ctx.strokeStyle = color.hex;
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, w, h);

      // Color swatch 24x24 at top-left of box
      ctx.fillStyle = color.hex;
      ctx.fillRect(x, y, 24, 24);

      // Label background
      const label = `${color.nameId} / ${color.nameEn}`;
      ctx.font = '12px sans-serif';
      const labelMetrics = ctx.measureText(label);
      const labelW = labelMetrics.width + 8;
      const labelH = 18;
      const labelX = x + 28;
      const labelY = y;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(labelX, labelY, labelW, labelH);

      ctx.fillStyle = '#ffffff';
      ctx.fillText(label, labelX + 4, labelY + 13);

      // Percentage text below label
      const pctText = `${color.percentage}%`;
      const pctMetrics = ctx.measureText(pctText);
      const pctW = pctMetrics.width + 8;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(labelX, labelY + labelH, pctW, 16);

      ctx.fillStyle = '#ffffff';
      ctx.font = '11px sans-serif';
      ctx.fillText(pctText, labelX + 4, labelY + labelH + 12);
    });
  }, [colors, videoWidth, videoHeight]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
}
