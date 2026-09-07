import { useEffect, useRef, useState } from 'react';
import type { ComponentType } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Circle as CircleIcon, Dot, Eraser, Slash, X } from 'lucide-react';

const NEON = '146, 228, 46';

type Tool = 'point' | 'line' | 'circle';

interface Pt {
  x: number;
  y: number;
}

type Shape =
  | { kind: 'point'; x: number; y: number }
  | { kind: 'line'; x1: number; y1: number; x2: number; y2: number }
  | { kind: 'circle'; cx: number; cy: number; r: number };

const isDesktop = (target: EventTarget | null) => {
  const el = target as HTMLElement | null;
  if (!el) return false;
  return !(
    el.closest('.os-window') ||
    el.closest('.os-dock') ||
    el.closest('.os-icon') ||
    el.closest('.os-widget') ||
    el.closest('.os-sketch-tools')
  );
};

const Canvas = styled.canvas<{ $active: boolean }>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 200;
  pointer-events: ${({ $active }) => ($active ? 'auto' : 'none')};
  cursor: none;
`;

const Tools = styled.div`
  position: absolute;
  top: 50%;
  right: 14px;
  transform: translateY(-50%);
  z-index: 210;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px;
  background: rgba(10, 8, 20, 0.82);
  border: 1px solid var(--line);
  backdrop-filter: blur(6px);
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.5), inset 0 0 22px rgba(146, 228, 46, 0.06);
  user-select: none;
`;

const Head = styled.p`
  font-family: var(--mono);
  font-size: 9.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--green);
  text-shadow: 0 0 10px rgba(146, 228, 46, 0.5);
  margin: 0 2px 4px;
`;

const ToolBtn = styled.button<{ $on?: boolean; $danger?: boolean }>`
  display: flex;
  align-items: center;
  gap: 9px;
  width: 148px;
  padding: 7px 9px;
  border: 1px solid ${({ $on }) => ($on ? 'var(--green)' : 'transparent')};
  background: ${({ $on }) => ($on ? 'rgba(146, 228, 46, 0.12)' : 'none')};
  font-family: var(--mono);
  font-size: 11.5px;
  color: ${({ $on, $danger }) =>
    $danger ? 'var(--magenta)' : $on ? 'var(--green)' : 'var(--text-dim)'};
  text-align: left;
  transition: background 0.12s ease, border-color 0.12s ease, color 0.12s ease;
  svg {
    flex: none;
  }
  &:hover {
    background: ${({ $danger }) =>
      $danger ? 'rgba(255, 0, 234, 0.12)' : 'rgba(146, 228, 46, 0.09)'};
    color: ${({ $danger }) => ($danger ? '#fff' : 'var(--green)')};
  }
  .label {
    flex: 1;
  }
  .key {
    font-size: 9.5px;
    letter-spacing: 0.06em;
    color: var(--text-faint);
    border: 1px solid var(--line-soft);
    border-radius: 3px;
    padding: 1px 5px;
  }
`;

interface ToolDef {
  id: Tool;
  key: string;
  icon: ComponentType<{ size?: number | string }>;
}

const TOOLS: ToolDef[] = [
  { id: 'point', key: 'P', icon: Dot },
  { id: 'line', key: 'L', icon: Slash },
  { id: 'circle', key: 'C', icon: CircleIcon },
];

const Sketchpad = ({ onActiveChange }: { onActiveChange: (active: boolean) => void }) => {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(false);
  const [tool, setTool] = useState<Tool>('point');

  const activeRef = useRef(false);
  const toolRef = useRef<Tool>('point');
  const shapesRef = useRef<Shape[]>([]);
  const pendingRef = useRef<Pt | null>(null);
  const cursorRef = useRef({ x: 0, y: 0, inside: false });
  const startLoopRef = useRef<() => void>(() => {});

  const chooseTool = (t: Tool) => {
    toolRef.current = t;
    pendingRef.current = null;
    setTool(t);
  };

  const pressShape = (t: 'line' | 'circle') => {
    const c = cursorRef.current;
    const at = c.inside ? { x: c.x, y: c.y } : null;
    if (toolRef.current !== t) {
      toolRef.current = t;
      setTool(t);
      pendingRef.current = at;
    } else if (!pendingRef.current) {
      pendingRef.current = at;
    } else if (at) {
      const p = pendingRef.current;
      if (t === 'line') shapesRef.current.push({ kind: 'line', x1: p.x, y1: p.y, x2: at.x, y2: at.y });
      else shapesRef.current.push({ kind: 'circle', cx: p.x, cy: p.y, r: Math.hypot(at.x - p.x, at.y - p.y) });
      pendingRef.current = null;
    }
  };

  const clearShapes = () => {
    shapesRef.current = [];
    pendingRef.current = null;
  };

  const exit = () => {
    activeRef.current = false;
    clearShapes();
    cursorRef.current.inside = false;
    setActive(false);
    onActiveChange(false);
  };

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

    const stroke = (from: Pt, to: Pt, dashed: boolean) => {
      bctx.setLineDash(dashed ? [7 * dpr, 5 * dpr] : []);
      bctx.beginPath();
      bctx.moveTo(from.x * dpr, from.y * dpr);
      bctx.lineTo(to.x * dpr, to.y * dpr);
      bctx.stroke();
    };
    const ring = (cx: number, cy: number, r: number, dashed: boolean) => {
      bctx.setLineDash(dashed ? [7 * dpr, 5 * dpr] : []);
      bctx.beginPath();
      bctx.arc(cx * dpr, cy * dpr, r * dpr, 0, Math.PI * 2);
      bctx.stroke();
    };
    const dot = (x: number, y: number) => {
      bctx.setLineDash([]);
      bctx.beginPath();
      bctx.arc(x * dpr, y * dpr, 3 * dpr, 0, Math.PI * 2);
      bctx.fill();
    };
    const crosshair = (x: number, y: number) => {
      const arm = 11 * dpr;
      const gap = 3 * dpr;
      bctx.setLineDash([]);
      bctx.lineWidth = 1.4 * dpr;
      bctx.beginPath();
      bctx.moveTo(x * dpr - arm, y * dpr);
      bctx.lineTo(x * dpr - gap, y * dpr);
      bctx.moveTo(x * dpr + gap, y * dpr);
      bctx.lineTo(x * dpr + arm, y * dpr);
      bctx.moveTo(x * dpr, y * dpr - arm);
      bctx.lineTo(x * dpr, y * dpr - gap);
      bctx.moveTo(x * dpr, y * dpr + gap);
      bctx.lineTo(x * dpr, y * dpr + arm);
      bctx.stroke();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (!activeRef.current) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(draw);

      bctx.clearRect(0, 0, buffer.width, buffer.height);
      bctx.lineCap = 'round';
      bctx.lineJoin = 'round';
      bctx.strokeStyle = `rgb(${NEON})`;
      bctx.fillStyle = `rgb(${NEON})`;
      bctx.lineWidth = 2 * dpr;

      for (const s of shapesRef.current) {
        if (s.kind === 'point') dot(s.x, s.y);
        else if (s.kind === 'line') stroke({ x: s.x1, y: s.y1 }, { x: s.x2, y: s.y2 }, false);
        else ring(s.cx, s.cy, s.r, false);
      }

      const p = pendingRef.current;
      const c = cursorRef.current;
      if (p && c.inside) {
        if (toolRef.current === 'line') stroke(p, c, true);
        else if (toolRef.current === 'circle') ring(p.x, p.y, Math.hypot(c.x - p.x, c.y - p.y), true);
        dot(p.x, p.y);
      }

      if (c.inside) crosshair(c.x, c.y);

      ctx.shadowColor = `rgba(${NEON}, 0.85)`;
      ctx.shadowBlur = 8 * dpr;
      ctx.globalAlpha = 0.95;
      ctx.drawImage(buffer, 0, 0);
      ctx.drawImage(buffer, 0, 0);
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    };
    startLoopRef.current = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(draw);
    };

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      if (activeRef.current || !e.ctrlKey || (e.button !== 0 && e.button !== 2) || !isDesktop(e.target))
        return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      e.preventDefault();
      e.stopPropagation();
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      shapesRef.current = [{ kind: 'point', x, y }];
      pendingRef.current = null;
      cursorRef.current = { x, y, inside: true };
      activeRef.current = true;
      toolRef.current = 'point';
      setTool('point');
      setActive(true);
      onActiveChange(true);
      startLoopRef.current();
    };
    const onCtx = (e: MouseEvent) => {
      if (activeRef.current || (e.ctrlKey && isDesktop(e.target))) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    window.addEventListener('pointerdown', onDown, true);
    window.addEventListener('contextmenu', onCtx, true);
    return () => {
      window.removeEventListener('pointerdown', onDown, true);
      window.removeEventListener('contextmenu', onCtx, true);
    };
  }, [onActiveChange]);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (e.key === 'Escape') exit();
      else if (k === 'p') chooseTool('point');
      else if (k === 'l') pressShape('line');
      else if (k === 'c') pressShape('circle');
      else if (k === 'e') clearShapes();
      else return;
      e.preventDefault();
      e.stopPropagation();
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [active]);

  const onMove = (e: React.PointerEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    cursorRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, inside: true };
  };
  const onLeave = () => {
    cursorRef.current.inside = false;
  };
  const onDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const t = toolRef.current;
    if (t === 'point') {
      shapesRef.current.push({ kind: 'point', x, y });
    } else if (t === 'line') {
      if (!pendingRef.current) pendingRef.current = { x, y };
      else {
        const p = pendingRef.current;
        shapesRef.current.push({ kind: 'line', x1: p.x, y1: p.y, x2: x, y2: y });
        pendingRef.current = null;
      }
    } else {
      if (!pendingRef.current) pendingRef.current = { x, y };
      else {
        const p = pendingRef.current;
        shapesRef.current.push({ kind: 'circle', cx: p.x, cy: p.y, r: Math.hypot(x - p.x, y - p.y) });
        pendingRef.current = null;
      }
    }
  };

  return (
    <>
      <Canvas
        ref={canvasRef}
        $active={active}
        aria-hidden
        onPointerMove={active ? onMove : undefined}
        onPointerLeave={active ? onLeave : undefined}
        onPointerDown={active ? onDown : undefined}
      />
      {active && (
        <Tools className="os-sketch-tools" role="toolbar" aria-label={t('os.sketchpad.title')}>
          <Head>{t('os.sketchpad.title')}</Head>
          {TOOLS.map((td) => {
            const label = t(`os.sketchpad.${td.id}`);
            return (
              <ToolBtn
                key={td.id}
                $on={tool === td.id}
                onClick={() => chooseTool(td.id)}
                title={`${label} (${td.key})`}
              >
                <td.icon size={15} />
                <span className="label">{label}</span>
                <span className="key">{td.key}</span>
              </ToolBtn>
            );
          })}
          <ToolBtn onClick={clearShapes} title={`${t('os.sketchpad.clear')} (E)`}>
            <Eraser size={15} />
            <span className="label">{t('os.sketchpad.clear')}</span>
            <span className="key">E</span>
          </ToolBtn>
          <ToolBtn $danger onClick={exit} title={`${t('os.sketchpad.exit')} (Esc)`}>
            <X size={15} />
            <span className="label">{t('os.sketchpad.exit')}</span>
            <span className="key">Esc</span>
          </ToolBtn>
        </Tools>
      )}
    </>
  );
};

export default Sketchpad;
