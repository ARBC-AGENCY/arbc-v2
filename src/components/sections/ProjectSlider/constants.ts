import { PROJECTS } from "./data";

// ── Thumbnail rail layout ──────────────────────────────────────────────────

export const N            = PROJECTS.length;
export const THUMB_W      = 172;
export const THUMB_H      = 108;
export const THUMB_GAP    = 10;
export const STEP         = THUMB_W + THUMB_GAP;
export const RAIL_W       = 3 * THUMB_W + 2 * THUMB_GAP;
export const CENTER_OFFSET = Math.floor((RAIL_W - THUMB_W) / 2);

/** Triple-cloned project list for the infinite drag loop. */
export const TRIPLE = [...PROJECTS, ...PROJECTS, ...PROJECTS];

/** Returns the track x value that centres the item at `index`. */
export function targetX(index: number): number {
  return CENTER_OFFSET - (N + index) * STEP;
}
