'use client';

import { useRef, useEffect, useState } from 'react';
import { useTransitionContext } from '@/context/TransitionContext';
import type { Project } from '@/data/projects';
import { PortfolioGL } from './PortfolioGL';
import PortfolioOverlay from './PortfolioOverlay';

interface Props {
  projects: Project[];
}

export default function PortfolioCanvas({ projects }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const itemRefs = useRef<HTMLElement[]>([]);
  const glRef = useRef<PortfolioGL | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const hoveredSlugRef = useRef<string | null>(null);

  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);

  const { navigate } = useTransitionContext();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const items = itemRefs.current.filter(Boolean);
    if (items.length === 0) return;

    let gl: PortfolioGL;
    try {
      gl = new PortfolioGL(
        canvas,
        items,
        projects,
        (p, r) => {
          // Update overlay position imperatively (no React re-render each frame)
          const el = overlayRef.current;
          if (el) {
            if (p && r) {
              const cx = r.x + r.width / 2;
              const cy = r.y + r.height / 2;
              el.style.left = cx + 'px';
              el.style.top = cy + 'px';
              el.style.opacity = '1';
            } else {
              el.style.opacity = '0';
            }
          }
          // Only update React state (and re-render content) when project changes
          const slug = p?.slug ?? null;
          if (slug !== hoveredSlugRef.current) {
            hoveredSlugRef.current = slug;
            setHoveredProject(p);
          }
        },
        (slug) => {
          const project = projects.find(p => p.slug === slug);
          navigate('/projects/' + slug, project?.title ?? 'projects');
        },
      );
      gl.start();
      glRef.current = gl;
    } catch (err) {
      console.error('PortfolioGL init failed:', err);
      return;
    }

    return () => {
      gl.destroy();
      glRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100svh' }}>
      {/* Invisible mosaic grid — WebGL reads DOMRects from these divs */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          overflow: 'visible',
          visibility: 'hidden',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 38vw)',
            gap: '3vw',
            padding: '12vh 5vw 8vh',
          }}
        >
          {projects.map((p, i) => (
            <div
              key={p.slug}
              ref={(el) => {
                if (el) itemRefs.current[i] = el;
              }}
              data-slug={p.slug}
              style={{ aspectRatio: '16/10', width: '100%' }}
            />
          ))}
        </div>
      </div>

      {/* WebGL canvas — fixed fullscreen */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          cursor: hoveredProject ? 'pointer' : 'default',
        }}
      />

      {/* HTML hover overlay — position updated imperatively, content via React state */}
      <PortfolioOverlay ref={overlayRef} project={hoveredProject} />
    </div>
  );
}
