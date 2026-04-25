import type { Project } from '@/data/projects';
import { vertexShader, fragmentShader } from './portfolioShaders';
import { ImageMesh } from './ImageMesh';
import { ScrollManager } from './ScrollManager';

// ── WebGL program utilities ───────────────────────────────────────────────────

function createShader(
  gl: WebGLRenderingContext,
  type: number,
  src: string,
): WebGLShader | null {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(s));
    gl.deleteShader(s);
    return null;
  }
  return s;
}

function createProgram(
  gl: WebGLRenderingContext,
  vSrc: string,
  fSrc: string,
): WebGLProgram | null {
  const p = gl.createProgram();
  if (!p) return null;
  const vs = createShader(gl, gl.VERTEX_SHADER, vSrc);
  const fs = createShader(gl, gl.FRAGMENT_SHADER, fSrc);
  if (!vs || !fs) return null;
  gl.attachShader(p, vs);
  gl.attachShader(p, fs);
  gl.linkProgram(p);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(p));
    gl.deleteProgram(p);
    return null;
  }
  return p;
}

// ── PortfolioGL ───────────────────────────────────────────────────────────────

export class PortfolioGL {
  private canvas: HTMLCanvasElement;
  private gl: WebGLRenderingContext;
  private program: WebGLProgram;
  private meshes: ImageMesh[];
  private itemEls: HTMLElement[];
  private scroll: ScrollManager;

  private onHover: (project: Project | null, screenRect: DOMRect | null) => void;
  private onNavigate: (slug: string) => void;

  private rafId: number | null = null;
  private dirty: boolean = true;

  private mouseX: number = 0;
  private mouseY: number = 0;

  private _pointerDownX: number = 0;
  private _pointerDownY: number = 0;

  private _onMouseMove: (e: MouseEvent) => void;
  private _onPointerDown: (e: PointerEvent) => void;
  private _onPointerUp: (e: PointerEvent) => void;
  private readonly resizeHandler: () => void;

  constructor(
    canvas: HTMLCanvasElement,
    itemEls: HTMLElement[],
    projects: Project[],
    onHover: (project: Project | null, screenRect: DOMRect | null) => void,
    onNavigate: (slug: string) => void,
  ) {
    this.canvas = canvas;
    this.onHover = onHover;
    this.onNavigate = onNavigate;
    this.itemEls = itemEls;

    const gl = canvas.getContext('webgl', { alpha: true });
    if (!gl) throw new Error('WebGL not supported');
    this.gl = gl;

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const prog = createProgram(gl, vertexShader, fragmentShader);
    if (!prog) throw new Error('Failed to create WebGL program');
    this.program = prog;

    this.meshes = projects.map((p, i) => {
      const rect = itemEls[i]?.getBoundingClientRect() ?? new DOMRect(0, 0, 100, 62);
      return new ImageMesh(gl, prog, p, rect);
    });

    this.scroll = new ScrollManager();

    this.mouseX = window.innerWidth / 2;
    this.mouseY = window.innerHeight / 2;

    this._onMouseMove = (e: MouseEvent) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    };

    this._onPointerDown = (e: PointerEvent) => {
      if (!e.isPrimary) return;
      this._pointerDownX = e.clientX;
      this._pointerDownY = e.clientY;
    };

    this._onPointerUp = (e: PointerEvent) => {
      if (!e.isPrimary) return;
      const dx = e.clientX - this._pointerDownX;
      const dy = e.clientY - this._pointerDownY;
      if (Math.sqrt(dx * dx + dy * dy) < 8) {
        const offsetX = this.scroll.x;
        const offsetY = this.scroll.y;
        for (const mesh of this.meshes) {
          if (mesh.checkHover(e.clientX, e.clientY, offsetX, offsetY)) {
            this.onNavigate(mesh.project.slug);
            break;
          }
        }
      }
    };

    this.resizeHandler = () => {
      requestAnimationFrame(() => {
        this.resizeCanvas();
        this.measureLayouts();
        this.meshes.forEach(m => m.snapToLayout(0));
        this.applyScrollConfig();
        this.dirty = true;
      });
    };
  }

  start(): void {
    this.scroll.attachListeners(this.canvas);
    this.resizeCanvas();

    window.addEventListener('mousemove', this._onMouseMove);
    this.canvas.addEventListener('pointerdown', this._onPointerDown);
    window.addEventListener('pointerup', this._onPointerUp);
    window.addEventListener('resize', this.resizeHandler);

    requestAnimationFrame(() => {
      this.measureLayouts();
      this.meshes.forEach(m => m.snapToLayout(0));
      this.applyScrollConfig();
      this.render();
    });
  }

  destroy(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.scroll.detachListeners();
    window.removeEventListener('mousemove', this._onMouseMove);
    this.canvas.removeEventListener('pointerdown', this._onPointerDown);
    window.removeEventListener('pointerup', this._onPointerUp);
    window.removeEventListener('resize', this.resizeHandler);
    this.meshes.forEach(m => m.destroy());
    this.gl.deleteProgram(this.program);
  }

  private resizeCanvas(): void {
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = window.innerWidth * dpr;
    this.canvas.height = window.innerHeight * dpr;
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
  }

  private measureLayouts(): void {
    this.itemEls.forEach((el, i) => {
      if (el && this.meshes[i]) {
        this.meshes[i].captureLayout(0, el.getBoundingClientRect());
      }
    });
  }

  private applyScrollConfig(): void {
    this.scroll.active = true;
    this.scroll.lockAxis = null;
    this.scroll.remapWheelToX = false;
    this.scroll.reset();

    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;

    this.meshes.forEach(m => {
      minX = Math.min(minX, m.layout0.x);
      maxX = Math.max(maxX, m.layout0.x + m.layout0.w);
      minY = Math.min(minY, m.layout0.y);
      maxY = Math.max(maxY, m.layout0.y + m.layout0.h);
    });

    const pad = 60;
    const W = window.innerWidth;
    const H = window.innerHeight;

    this.scroll.bounds = {
      maxX:  Math.max(0, -minX) + pad,
      minX: -Math.max(0, maxX - W) - pad,
      maxY:  Math.max(0, -minY) + pad,
      minY: -Math.max(0, maxY - H) - pad,
    };
  }

  private updateHover(offsetX: number, offsetY: number): void {
    let hoveredMesh: ImageMesh | null = null;

    for (const m of this.meshes) {
      if (m.checkHover(this.mouseX, this.mouseY, offsetX, offsetY)) {
        hoveredMesh = m;
      }
    }

    if (hoveredMesh) {
      const rect = {
        x: hoveredMesh.currentX + offsetX,
        y: hoveredMesh.currentY + offsetY,
        width: hoveredMesh.currentW,
        height: hoveredMesh.currentH,
        left: hoveredMesh.currentX + offsetX,
        top: hoveredMesh.currentY + offsetY,
        right: hoveredMesh.currentX + offsetX + hoveredMesh.currentW,
        bottom: hoveredMesh.currentY + offsetY + hoveredMesh.currentH,
        toJSON: () => ({}),
      } as DOMRect;

      this.onHover(hoveredMesh.project, rect);

      this.meshes.forEach(m => {
        if (m === hoveredMesh) {
          m.targetScale = 1.1;
          m.hovered = true;
        } else {
          m.targetScale = 0.95;
          m.hovered = false;
        }
      });
    } else {
      this.onHover(null, null);
      this.meshes.forEach(m => {
        m.targetScale = 1.0;
        m.hovered = false;
      });
    }
  }

  private update(): void {
    this.scroll.update();
    const offsetX = this.scroll.x;
    const offsetY = this.scroll.y;

    this.updateHover(offsetX, offsetY);

    this.meshes.forEach(m => m.update(offsetX, offsetY));

    // Always dirty in mosaic (hover detection runs every frame)
    this.dirty = true;
  }

  private draw(): void {
    const gl = this.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    const offsetX = this.scroll.x;
    const offsetY = this.scroll.y;
    const resW = this.canvas.width;
    const resH = this.canvas.height;
    this.meshes.forEach(m => m.draw(offsetX, offsetY, resW, resH));
  }

  private render(): void {
    this.update();
    if (this.dirty) {
      this.draw();
      this.dirty = false;
    }
    this.rafId = requestAnimationFrame(this.render.bind(this));
  }
}
