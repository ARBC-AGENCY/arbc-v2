'use client';

import { useState, useEffect, forwardRef } from 'react';
import { useTheme } from 'next-themes';
import type { Project } from '@/data/projects';

interface Props {
  project: Project | null;
}

const PortfolioOverlay = forwardRef<HTMLDivElement, Props>(function PortfolioOverlay(
  { project },
  ref,
) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = !mounted || resolvedTheme === 'dark';

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        transform: 'translate(-50%, -50%)',
        opacity: 0,
        transition: 'opacity 0.25s ease',
        pointerEvents: 'none',
        zIndex: 10,
        textAlign: 'center',
        willChange: 'transform, opacity',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-title)',
          fontSize: 'var(--text-xl)',
          fontWeight: 700,
          color: isDark ? 'var(--color-text-dark-hi)' : 'var(--color-text-primary)',
          marginBottom: '0.75rem',
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          whiteSpace: 'nowrap',
        }}
      >
        {project?.title ?? ''}
      </p>
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {(project?.tags ?? []).map(tag => (
          <span
            key={tag}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              color: 'var(--color-orange)',
              border: '1px solid var(--color-orange)',
              borderRadius: '999px',
              padding: '0.15rem 0.6rem',
              whiteSpace: 'nowrap',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
});

export default PortfolioOverlay;
