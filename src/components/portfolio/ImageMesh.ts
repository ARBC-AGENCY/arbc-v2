import type { Project } from '@/data/projects';

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function isPOT(n: number): boolean {
  return n > 0 && (n & (n - 1)) === 0;
}

export function createTexture(
  gl: WebGLRenderingContext,
  url: string,
  onLoad: (w: number, h: number) => void,
): WebGLTexture {
  const texture = gl.createTexture()!;
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 0]));

  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    if (isPOT(img.naturalWidth) && isPOT(img.naturalHeight)) {
      gl.generateMipmap(gl.TEXTURE_2D);
    } else {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }
    onLoad(img.naturalWidth, img.naturalHeight);
  };
  img.src = url;
  return texture;
}

interface LayoutRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface MeshLocs {
  aPosition: number;
  aUv: number;
  uCenter: WebGLUniformLocation | null;
  uScale: WebGLUniformLocation | null;
  uOffset: WebGLUniformLocation | null;
  uResolution: WebGLUniformLocation | null;
  uCurvature: WebGLUniformLocation | null;
  tMap: WebGLUniformLocation | null;
  uImageSizes: WebGLUniformLocation | null;
  uPlaneSizes: WebGLUniformLocation | null;
  uOpacity: WebGLUniformLocation | null;
}

export class ImageMesh {
  readonly project: Project;

  private gl: WebGLRenderingContext;
  private program: WebGLProgram;

  layout0: LayoutRect = { x: 0, y: 0, w: 0, h: 0 };

  currentX: number = 0;
  currentY: number = 0;
  currentW: number = 0;
  currentH: number = 0;

  currentScale: number = 1.0;
  targetScale: number = 1.0;

  hovered: boolean = false;

  lerpSpeed: number = 0.08;
  opacity: number = 0;
  targetOpacity: number = 0;
  imageW: number = 1;
  imageH: number = 1;

  private buffer: WebGLBuffer;
  private texture: WebGLTexture;
  private locs!: MeshLocs;

  _clipX0: number = 0;
  _clipX1: number = 0;
  _clipY0: number = 0;
  _clipY1: number = 0;

  constructor(
    gl: WebGLRenderingContext,
    program: WebGLProgram,
    project: Project,
    initialRect: DOMRect,
  ) {
    this.gl = gl;
    this.program = program;
    this.project = project;

    this.layout0 = {
      x: initialRect.left,
      y: initialRect.top,
      w: initialRect.width,
      h: initialRect.height,
    };

    this.buffer = gl.createBuffer()!;
    this.lookupLocations();

    this.texture = createTexture(gl, project.coverImage, (w, h) => {
      this.imageW = w;
      this.imageH = h;
      this.targetOpacity = 1;
    });
  }

  get targetX(): number { return this.layout0.x; }
  get targetY(): number { return this.layout0.y; }
  get targetW(): number { return this.layout0.w; }
  get targetH(): number { return this.layout0.h; }

  captureLayout(_n: number, rect: DOMRect): void {
    this.layout0 = {
      x: rect.left,
      y: rect.top,
      w: rect.width,
      h: rect.height,
    };
  }

  snapToLayout(_n: number): void {
    this.currentX = this.layout0.x;
    this.currentY = this.layout0.y;
    this.currentW = this.layout0.w;
    this.currentH = this.layout0.h;
    this.updateBuffer();
  }

  switchToLayout(_n: number): void {
    // Single layout — no-op
  }

  checkHover(mouseX: number, mouseY: number, offsetX: number, offsetY: number): boolean {
    const rx = this.currentX + offsetX;
    const ry = this.currentY + offsetY;
    return (
      mouseX >= rx &&
      mouseX <= rx + this.currentW &&
      mouseY >= ry &&
      mouseY <= ry + this.currentH
    );
  }

  updateBuffer(offsetX: number = 0, offsetY: number = 0): void {
    const gl = this.gl;
    const sw = window.innerWidth;
    const sh = window.innerHeight;

    const rx = this.currentX + offsetX;
    const ry = this.currentY + offsetY;

    const x0 = (rx / sw) * 2 - 1;
    const x1 = ((rx + this.currentW) / sw) * 2 - 1;
    const y0 = 1 - ((ry + this.currentH) / sh) * 2;
    const y1 = 1 - (ry / sh) * 2;

    this._clipX0 = x0;
    this._clipX1 = x1;
    this._clipY0 = y0;
    this._clipY1 = y1;

    const verts = new Float32Array([
      x0, y0, 0, 0,
      x1, y0, 1, 0,
      x0, y1, 0, 1,
      x1, y0, 1, 0,
      x1, y1, 1, 1,
      x0, y1, 0, 1,
    ]);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.DYNAMIC_DRAW);
  }

  private lookupLocations(): void {
    const gl = this.gl;
    this.locs = {
      aPosition:   gl.getAttribLocation(this.program, 'aPosition'),
      aUv:         gl.getAttribLocation(this.program, 'aUv'),
      uCenter:     gl.getUniformLocation(this.program, 'uCenter'),
      uScale:      gl.getUniformLocation(this.program, 'uScale'),
      uOffset:     gl.getUniformLocation(this.program, 'uOffset'),
      uResolution: gl.getUniformLocation(this.program, 'uResolution'),
      uCurvature:  gl.getUniformLocation(this.program, 'uCurvature'),
      tMap:        gl.getUniformLocation(this.program, 'tMap'),
      uImageSizes: gl.getUniformLocation(this.program, 'uImageSizes'),
      uPlaneSizes: gl.getUniformLocation(this.program, 'uPlaneSizes'),
      uOpacity:    gl.getUniformLocation(this.program, 'uOpacity'),
    };
  }

  get isAnimating(): boolean {
    if (Math.abs(this.opacity - this.targetOpacity) > 0.001) return true;
    if (Math.abs(this.currentX - this.targetX) > 0.1) return true;
    if (Math.abs(this.currentY - this.targetY) > 0.1) return true;
    if (Math.abs(this.currentW - this.targetW) > 0.1) return true;
    if (Math.abs(this.currentH - this.targetH) > 0.1) return true;
    if (Math.abs(this.currentScale - this.targetScale) > 0.001) return true;
    return false;
  }

  update(offsetX: number = 0, offsetY: number = 0): void {
    this.currentX = lerp(this.currentX, this.targetX, this.lerpSpeed);
    this.currentY = lerp(this.currentY, this.targetY, this.lerpSpeed);
    this.currentW = lerp(this.currentW, this.targetW, this.lerpSpeed);
    this.currentH = lerp(this.currentH, this.targetH, this.lerpSpeed);
    this.currentScale = lerp(this.currentScale, this.targetScale, 0.08);
    this.opacity = lerp(this.opacity, this.targetOpacity, 0.06);
    this.updateBuffer(offsetX, offsetY);
  }

  draw(offsetX: number, offsetY: number, resW: number, resH: number): void {
    const gl = this.gl;
    const F = 4;

    gl.useProgram(this.program);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);

    gl.enableVertexAttribArray(this.locs.aPosition);
    gl.vertexAttribPointer(this.locs.aPosition, 2, gl.FLOAT, false, 4 * F, 0);

    gl.enableVertexAttribArray(this.locs.aUv);
    gl.vertexAttribPointer(this.locs.aUv, 2, gl.FLOAT, false, 4 * F, 2 * F);

    const cx = (this._clipX0 + this._clipX1) / 2;
    const cy = (this._clipY0 + this._clipY1) / 2;
    gl.uniform2f(this.locs.uCenter, cx, cy);
    gl.uniform1f(this.locs.uScale, this.currentScale);

    gl.uniform2f(this.locs.uOffset, offsetX, offsetY);
    gl.uniform2f(this.locs.uResolution, resW, resH);
    gl.uniform1f(this.locs.uCurvature, 2.8);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.uniform1i(this.locs.tMap, 0);

    gl.uniform2f(this.locs.uImageSizes, this.imageW, this.imageH);
    gl.uniform2f(this.locs.uPlaneSizes, this.currentW, this.currentH);
    gl.uniform1f(this.locs.uOpacity, this.opacity);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  destroy(): void {
    this.gl.deleteBuffer(this.buffer);
    this.gl.deleteTexture(this.texture);
  }
}
