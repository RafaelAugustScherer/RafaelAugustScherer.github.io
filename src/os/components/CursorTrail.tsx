import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Canvas = styled.canvas`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 40;
  pointer-events: none;
`;

const LIFESPAN = 480;
const NEON = '146, 228, 46';

interface Point {
  x: number;
  y: number;
  t: number;
}

const isDesktop = (target: EventTarget | null) => {
  const el = target as HTMLElement | null;
  if (!el) return false;
  return !(
    el.closest('.os-window') ||
    el.closest('.os-dock') ||
    el.closest('.os-icon') ||
    el.closest('.os-widget')
  );
};

const CursorTrail = ({ paused = false }: { paused?: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const points = useRef<Point[]>([]);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const buffer = document.createElement('canvas');
    const bctx = buffer.getContext('2d');
    if (!bctx) return;

    let raf = 0;
    let running = false;
    let dpr = window.devicePixelRatio || 1;

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = buffer.width = width * dpr;
      canvas.height = buffer.height = height * dpr;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e: PointerEvent) => {
      if (pausedRef.current || !isDesktop(e.target)) return;
      const rect = canvas.getBoundingClientRect();
      points.current.push({ x: e.clientX - rect.left, y: e.clientY - rect.top, t: performance.now() });
      if (!running) {
        running = true;
        raf = requestAnimationFrame(draw);
      }
    };
    window.addEventListener('pointermove', onMove);

    const draw = () => {
      const now = performance.now();
      if (pausedRef.current) points.current.length = 0;
      else points.current = points.current.filter((p) => now - p.t < LIFESPAN);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      bctx.clearRect(0, 0, buffer.width, buffer.height);

      const pts = points.current;
      if (pts.length === 0) {
        running = false;
        return;
      }
      if (pts.length > 1) {
        bctx.lineCap = 'round';
        bctx.lineJoin = 'round';
        bctx.strokeStyle = `rgb(${NEON})`;
        bctx.lineWidth = 2.4 * dpr;
        bctx.beginPath();
        bctx.moveTo(pts[0].x * dpr, pts[0].y * dpr);
        for (let i = 1; i < pts.length - 1; i++) {
          const mx = ((pts[i].x + pts[i + 1].x) / 2) * dpr;
          const my = ((pts[i].y + pts[i + 1].y) / 2) * dpr;
          bctx.quadraticCurveTo(pts[i].x * dpr, pts[i].y * dpr, mx, my);
        }
        const last = pts[pts.length - 1];
        bctx.lineTo(last.x * dpr, last.y * dpr);
        bctx.stroke();

        ctx.shadowColor = `rgba(${NEON}, 0.85)`;
        ctx.shadowBlur = 10 * dpr;
        ctx.globalAlpha = 0.92;
        ctx.drawImage(buffer, 0, 0);
        ctx.drawImage(buffer, 0, 0);
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      }
      raf = requestAnimationFrame(draw);
    };

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return <Canvas ref={canvasRef} aria-hidden />;
};

export default CursorTrail;
