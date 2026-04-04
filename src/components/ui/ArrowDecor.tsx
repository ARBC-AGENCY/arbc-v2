/**
 * Decorative arrow using the ARBC arrow-down glyph.
 *
 * Props:
 *   direction — "down" (default) | "up" | "left" | "right"
 *   bg        — background color of the wrapping div (optional)
 *   color     — fill color of the arrow (default: ARBC orange #e7501e)
 *   size      — width in px (height is auto-proportional, default: 48)
 *   style     — extra CSSProperties on the wrapper
 *   className — extra class on the wrapper
 */

const ROTATE: Record<string, string> = {
  down:  "rotate(0deg)",
  up:    "rotate(180deg)",
  right: "rotate(-90deg)",
  left:  "rotate(90deg)",
};

// Natural viewBox: 1549.97 × 2022.21 → height = width × 1.3047
const ASPECT = 2022.21 / 1549.97;

interface ArrowDecorProps {
  direction?: "down" | "up" | "left" | "right";
  bg?: string;
  color?: string;
  size?: number;
  style?: React.CSSProperties;
  className?: string;
}

export default function ArrowDecor({
  direction = "down",
  bg,
  color = "#e7501e",
  size = 48,
  style,
  className,
}: ArrowDecorProps) {
  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: bg,
        ...style,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1549.97 2022.21"
        width={size}
        height={Math.round(size * ASPECT)}
        style={{ transform: ROTATE[direction], display: "block", fill: color }}
        aria-hidden="true"
      >
        <path d="M1100.63 238.6c-43.29,-138.25 -172.43,-238.6 -324.99,-238.6 -152.21,0 -281.11,99.9 -324.7,237.67 -52.39,165.58 167.7,101.97 324.7,102.86 156.12,-0.9 376.48,62.41 324.99,-101.94zm-86.59 1621.17c75.78,-133.03 151.57,-266.05 227.35,-399.08 93.12,-159.17 186.25,-318.34 279.37,-477.51 86.16,-209.03 -26.31,-327.69 -233.09,-332.15 -170.68,0.99 -341.36,1.98 -512.04,2.97 -199.79,-1.16 -399.58,-2.31 -599.39,-3.47 -168.15,12.1 -232.34,175.49 -120.1,376.47 84.58,144.57 169.16,289.12 253.74,433.69 74.13,130.13 148.27,260.25 222.4,390.39 136.73,226.54 347.24,226.88 481.76,8.69z" />
      </svg>
    </div>
  );
}
