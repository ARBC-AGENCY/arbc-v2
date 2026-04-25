export class ScrollManager {
  x: number = 0;
  y: number = 0;
  vx: number = 0;
  vy: number = 0;
  friction: number = 0.92;
  sensitivity: number = 0.8;
  dragStrength: number = 1.2;
  lockAxis: 'x' | 'y' | null = null;
  remapWheelToX: boolean = false;
  bounds: { minX: number; maxX: number; minY: number; maxY: number } = {
    minX: -Infinity,
    maxX: Infinity,
    minY: -Infinity,
    maxY: Infinity,
  };
  active: boolean = false;
  dragging: boolean = false;
  lastX: number = 0;
  lastY: number = 0;

  private _element: HTMLElement | null = null;

  private _onWheel: (e: WheelEvent) => void;
  private _onPointerDown: (e: PointerEvent) => void;
  private _onTouchStart: (e: TouchEvent) => void;
  private _onTouchMove: (e: TouchEvent) => void;
  readonly onDrag: (e: PointerEvent) => void;
  readonly onDragEnd: (e: PointerEvent) => void;

  constructor() {
    this.onDrag = this._onDrag.bind(this);
    this.onDragEnd = this._onDragEnd.bind(this);

    this._onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (!this.active) return;
      const factor = e.deltaMode === 1 ? 20 : e.deltaMode === 2 ? 400 : 1;
      const dx = e.deltaX * factor * this.sensitivity * 0.1;
      const dy = e.deltaY * factor * this.sensitivity * 0.1;
      if (this.remapWheelToX) {
        this.vx -= Math.abs(dy) > Math.abs(dx) ? dy : dx;
      } else {
        this.vx -= dx;
        this.vy -= dy;
      }
    };

    this._onPointerDown = (e: PointerEvent) => {
      if (!e.isPrimary || !this.active) return;
      this.dragging = true;
      this.lastX = e.clientX;
      this.lastY = e.clientY;
      this.vx = 0;
      this.vy = 0;
      window.addEventListener('pointermove', this.onDrag);
      window.addEventListener('pointerup', this.onDragEnd);
    };

    this._onTouchStart = (e: TouchEvent) => {
      e.preventDefault();
    };

    this._onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
    };
  }

  attachListeners(element: HTMLElement): void {
    this._element = element;
    element.addEventListener('wheel', this._onWheel, { passive: false });
    element.addEventListener('pointerdown', this._onPointerDown);
    element.addEventListener('touchstart', this._onTouchStart, { passive: false });
    element.addEventListener('touchmove', this._onTouchMove, { passive: false });
  }

  detachListeners(): void {
    if (!this._element) return;
    this._element.removeEventListener('wheel', this._onWheel);
    this._element.removeEventListener('pointerdown', this._onPointerDown);
    this._element.removeEventListener('touchstart', this._onTouchStart);
    this._element.removeEventListener('touchmove', this._onTouchMove);
    window.removeEventListener('pointermove', this.onDrag);
    window.removeEventListener('pointerup', this.onDragEnd);
    this._element = null;
  }

  private _onDrag(e: PointerEvent): void {
    if (!this.dragging || !e.isPrimary) return;
    this.vx += (e.clientX - this.lastX) * this.dragStrength * 0.3;
    this.vy += (e.clientY - this.lastY) * this.dragStrength * 0.3;
    this.lastX = e.clientX;
    this.lastY = e.clientY;
  }

  private _onDragEnd(e: PointerEvent): void {
    if (!e.isPrimary) return;
    this.dragging = false;
    window.removeEventListener('pointermove', this.onDrag);
    window.removeEventListener('pointerup', this.onDragEnd);
  }

  applySpring(v: number, min: number, max: number): number {
    if (v > max) return v + (max - v) * 0.15;
    if (v < min) return v + (min - v) * 0.15;
    return v;
  }

  update(): void {
    if (!this.active) return;
    if (this.lockAxis === 'x') this.vy = 0;
    if (this.lockAxis === 'y') this.vx = 0;
    this.x += this.vx;
    this.y += this.vy;
    this.vx *= this.friction;
    this.vy *= this.friction;
    const b = this.bounds;
    if (this.x > b.maxX || this.x < b.minX) {
      this.x = this.applySpring(this.x, b.minX, b.maxX);
      this.vx *= 0.8;
    }
    if (this.y > b.maxY || this.y < b.minY) {
      this.y = this.applySpring(this.y, b.minY, b.maxY);
      this.vy *= 0.8;
    }
    if (Math.abs(this.vx) < 0.01) this.vx = 0;
    if (Math.abs(this.vy) < 0.01) this.vy = 0;
  }

  get isMoving(): boolean {
    const b = this.bounds;
    return (
      Math.abs(this.vx) > 0.01 ||
      Math.abs(this.vy) > 0.01 ||
      this.x > b.maxX + 0.5 ||
      this.x < b.minX - 0.5 ||
      this.y > b.maxY + 0.5 ||
      this.y < b.minY - 0.5
    );
  }

  reset(): void {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
  }
}
