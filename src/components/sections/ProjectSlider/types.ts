// ── Types ──────────────────────────────────────────────────────────────────

/**
 * A single content segment rendered top-to-bottom inside a TextBlock.
 *
 * type:
 *   "label"   — small uppercase category + id line
 *   "title"   — main headline (italic bold, SplitText target)
 *   "desc"    — one or more description paragraphs from i18n
 *   "tagline" — one or more pill/inline tagline strings from i18n
 */
export interface TextSegment {
  type: "label" | "title" | "desc" | "tagline";
  /** CSS applied on top of segment defaults. */
  style?: React.CSSProperties;
  /** "tagline" only — pill background color. Defaults to #e7501e. */
  pillBg?: string;
  /** "tagline" only — pill text color. Defaults to #fff. */
  pillColor?: string;
}

/**
 * An independently positioned, styled block of text content overlaid on the
 * project image. Each project can have 1-N blocks at completely different
 * positions with different backgrounds and typography.
 */
export interface TextBlock {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  /** Container width. Defaults to "min(360px, 40%)". */
  width?: string;
  /** Block background (solid color or rgba). */
  bg: string;
  /** Default text color for all content. Defaults to "#ffffff". */
  color?: string;
  /** Padding. Defaults to "1.6rem 1.4rem". */
  padding?: string;
  /** Border-radius. Defaults to "0.75rem". */
  borderRadius?: string;
  /** Apply backdrop-filter: blur(18px). */
  blur?: boolean;
  /** Border CSS value e.g. "1px solid rgba(255,255,255,0.08)". */
  border?: string;
  /** Content segments rendered in order. */
  segments: TextSegment[];
}

/** Static (non-translatable) project data. All text lives in messages/*.json. */
export interface ProjectStatic {
  id: string;
  slug: string;
  name: string;
  /** Large background image URL for the main view. */
  image: string;
  /** SVG/image URL centred in the thumbnail. */
  logo: string;
  /** Thumbnail background colour. */
  accentColor: string;
  /** One or more independently positioned text blocks. */
  blocks: TextBlock[];
}
