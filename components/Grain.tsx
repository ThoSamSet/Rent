const GRAIN_SVG = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180"><filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="100%" height="100%" filter="url(#grain)"/></svg>`,
);

type GrainProps = {
  className?: string;
  /** Overlay strength. Film grain reads best around 0.3–0.5. */
  opacity?: number;
};

/** Film-grain veil. The parent must be positioned (relative, absolute, or fixed). */
export default function Grain({ className = '', opacity = 0.42 }: GrainProps) {
  const classes = className ? `grain ${className}` : 'grain';

  return (
    <div
      className={classes}
      aria-hidden="true"
      style={{
        backgroundImage: `url("data:image/svg+xml,${GRAIN_SVG}")`,
        opacity,
      }}
    />
  );
}
