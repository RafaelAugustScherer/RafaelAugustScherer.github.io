import { useCallback, useEffect, useRef, useState } from 'react';
import type { MouseEvent, PointerEvent } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FileText, Folder } from 'lucide-react';
import type { AppId, FsNode } from '../types';
import { APPS, DESKTOP_APPS } from '../registry';

const CELL_W = 92;
const CELL_H = 96;
const DRAG_THRESHOLD = 5;

const Layer = styled.div`
  position: absolute;
  top: calc(var(--bar-h) + 14px);
  left: 12px;
  right: 12px;
  bottom: 90px;
  z-index: 40;
`;

const Cell = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 84px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 9px 4px 7px;
  border: 1px solid transparent;
  border-radius: 3px;
  text-align: center;
  cursor: grab;
  user-select: none;
  touch-action: none;
  transition: transform 0.16s cubic-bezier(0.2, 0.8, 0.2, 1);
  &:hover { background: rgba(1, 251, 251, 0.09); border-color: var(--line); }
  &.selected {
    background: rgba(1, 251, 251, 0.16);
    border-color: var(--cyan);
    box-shadow: inset 0 0 16px rgba(1, 251, 251, 0.12);
  }
  &.dragging {
    transition: none;
    z-index: 60;
    cursor: grabbing;
    background: rgba(1, 251, 251, 0.12);
    border-color: var(--cyan-dim);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.5);
  }
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
  .glyph {
    width: 42px;
    height: 38px;
    display: grid;
    place-items: center;
    border: 1px solid var(--line);
    background: var(--surface);
    box-shadow: inset 0 0 14px rgba(1, 251, 251, 0.1);
  }
  .glyph img {
    width: 30px;
    height: 30px;
    mix-blend-mode: screen;
    pointer-events: none;
  }
  .label {
    font-family: var(--mono);
    font-size: 10.5px;
    color: var(--text-dim);
    line-height: 1.3;
    max-width: 100%;
    word-break: break-word;
  }
  input {
    width: 78px;
    background: var(--ground);
    border: 1px solid var(--cyan-dim);
    color: var(--text);
    font-family: var(--mono);
    font-size: 10.5px;
    text-align: center;
    outline: none;
    padding: 1px 2px;
  }
`;

type IconItem =
  | { key: string; kind: 'app'; appId: AppId }
  | { key: string; kind: 'node'; node: FsNode };

interface DesktopIconsProps {
  userNodes: FsNode[];
  editingId: string | null;
  draft: string;
  onDraft: (v: string) => void;
  onCommit: () => void;
  onCancel: () => void;
  onOpenApp: (appId: AppId) => void;
  onOpenNode: (node: FsNode) => void;
  onContextNode: (e: MouseEvent, nodeId: string) => void;
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

const initialGeom = () => {
  const availH = window.innerHeight - 32 - 14 - 90;
  const availW = window.innerWidth - 24;
  return {
    rows: Math.max(1, Math.floor(availH / CELL_H)),
    maxCols: Math.max(1, Math.floor(availW / CELL_W)),
  };
};

const DesktopIcons = ({
  userNodes,
  editingId,
  draft,
  onDraft,
  onCommit,
  onCancel,
  onOpenApp,
  onOpenNode,
  onContextNode,
}: DesktopIconsProps) => {
  const { t } = useTranslation();

  const focusRename = useCallback((el: HTMLInputElement | null) => {
    if (!el) return;
    el.focus();
    const dot = el.value.lastIndexOf('.');
    el.setSelectionRange(0, dot > 0 ? dot : el.value.length);
  }, []);

  const items: IconItem[] = [
    ...DESKTOP_APPS.map((appId) => ({ key: `app:${appId}`, kind: 'app' as const, appId })),
    ...userNodes.map((node) => ({ key: `node:${node.id}`, kind: 'node' as const, node })),
  ];

  const layerRef = useRef<HTMLDivElement>(null);
  const [geom, setGeom] = useState(initialGeom);
  const [slots, setSlots] = useState<Record<string, number>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [drag, setDrag] = useState<{ key: string; dx: number; dy: number } | null>(null);
  const dragRef = useRef<{
    key: string;
    startX: number;
    startY: number;
    baseX: number;
    baseY: number;
    pointerId: number;
    active: boolean;
  } | null>(null);

  const itemsKey = items.map((i) => i.key).join('|');

  useEffect(() => {
    const keys = items.map((i) => i.key);
    setSlots((prev) => {
      const used = new Set<number>();
      const next: Record<string, number> = {};
      keys.forEach((k) => {
        if (k in prev) {
          next[k] = prev[k];
          used.add(prev[k]);
        }
      });
      let free = 0;
      keys.forEach((k) => {
        if (!(k in next)) {
          while (used.has(free)) free += 1;
          next[k] = free;
          used.add(free);
        }
      });
      const same =
        Object.keys(prev).length === keys.length && keys.every((k) => prev[k] === next[k]);
      return same ? prev : next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsKey]);

  useEffect(() => {
    const onDown = (e: globalThis.PointerEvent) => {
      if (!(e.target as HTMLElement).closest('.os-icon')) setSelected(null);
    };
    window.addEventListener('pointerdown', onDown);
    return () => window.removeEventListener('pointerdown', onDown);
  }, []);

  useEffect(() => {
    const el = layerRef.current;
    if (!el) return;
    const measure = () => {
      const rows = Math.max(1, Math.floor(el.clientHeight / CELL_H));
      const maxCols = Math.max(1, Math.floor(el.clientWidth / CELL_W));
      setGeom((g) => (g.rows === rows && g.maxCols === maxCols ? g : { rows, maxCols }));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const slotXY = (idx: number) => {
    const col = Math.floor(idx / geom.rows);
    const row = idx % geom.rows;
    return { x: col * CELL_W, y: row * CELL_H };
  };

  const xyToSlot = (px: number, py: number) => {
    const col = clamp(Math.round(px / CELL_W), 0, geom.maxCols - 1);
    const row = clamp(Math.round(py / CELL_H), 0, geom.rows - 1);
    return col * geom.rows + row;
  };

  const applyDrop = (key: string, target: number) => {
    setSlots((prev) => {
      const cur = prev[key];
      if (cur === undefined || cur === target) return prev;
      const occupant = Object.keys(prev).find((k) => k !== key && prev[k] === target);
      const next = { ...prev, [key]: target };
      if (occupant) next[occupant] = cur;
      return next;
    });
  };

  const onPointerDown = (e: PointerEvent, key: string) => {
    if ((e.target as HTMLElement).tagName === 'INPUT') return;
    setSelected(key);
    if (e.button !== 0) return;
    if (key === `node:${editingId}`) return;
    const { x, y } = slotXY(slots[key] ?? 0);
    dragRef.current = {
      key,
      startX: e.clientX,
      startY: e.clientY,
      baseX: x,
      baseY: y,
      pointerId: e.pointerId,
      active: false,
    };
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      /* capture is best-effort */
    }
  };

  const onPointerMove = (e: PointerEvent) => {
    const ds = dragRef.current;
    if (!ds) return;
    const dx = e.clientX - ds.startX;
    const dy = e.clientY - ds.startY;
    if (!ds.active) {
      if (Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
      ds.active = true;
    }
    setDrag({ key: ds.key, dx, dy });
  };

  const onPointerUp = (e: PointerEvent) => {
    const ds = dragRef.current;
    if (!ds) return;
    const dx = e.clientX - ds.startX;
    const dy = e.clientY - ds.startY;
    if (ds.active || Math.hypot(dx, dy) >= DRAG_THRESHOLD) {
      applyDrop(ds.key, xyToSlot(ds.baseX + dx, ds.baseY + dy));
    }
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(ds.pointerId);
    } catch {
      /* release is best-effort */
    }
    dragRef.current = null;
    setDrag(null);
  };

  const renderInner = (item: IconItem) => {
    if (item.kind === 'app') {
      const Glyph = APPS[item.appId].icon;
      return (
        <>
          <span className="glyph">
            <Glyph size={19} />
          </span>
          <span className="label">{t(`os.apps.${item.appId}`)}</span>
        </>
      );
    }
    const { node } = item;
    return (
      <>
        <span className="glyph">
          {node.type === 'dir' ? (
            <Folder size={19} color="var(--amber)" />
          ) : (
            <FileText size={19} color="var(--cyan)" />
          )}
        </span>
        {editingId === node.id ? (
          <input
            ref={focusRename}
            value={draft}
            onChange={(e) => onDraft(e.target.value)}
            onBlur={onCommit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onCommit();
              if (e.key === 'Escape') onCancel();
            }}
            onDoubleClick={(e) => e.stopPropagation()}
          />
        ) : (
          <span className="label">{node.name}</span>
        )}
      </>
    );
  };

  const openItem = (item: IconItem) => {
    if (item.kind === 'app') onOpenApp(item.appId);
    else if (editingId !== item.node.id) onOpenNode(item.node);
  };

  return (
    <Layer ref={layerRef}>
      {items.map((item) => {
        const { x, y } = slotXY(slots[item.key] ?? 0);
        const isDragging = drag?.key === item.key;
        const tx = x + (isDragging ? drag.dx : 0);
        const ty = y + (isDragging ? drag.dy : 0);
        const title = item.kind === 'app' ? t(`os.apps.${item.appId}`) : item.node.name;
        return (
          <Cell
            className={`os-icon${selected === item.key ? ' selected' : ''}${isDragging ? ' dragging' : ''}`}
            key={item.key}
            style={{ transform: `translate(${tx}px, ${ty}px)` }}
            title={title}
            onPointerDown={(e) => onPointerDown(e, item.key)}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onDoubleClick={() => openItem(item)}
            onContextMenu={item.kind === 'node' ? (e) => onContextNode(e, item.node.id) : undefined}
          >
            {renderInner(item)}
          </Cell>
        );
      })}
    </Layer>
  );
};

export default DesktopIcons;
