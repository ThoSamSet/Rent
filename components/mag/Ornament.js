/**
 * Hand-drawn line ornaments that sit between sections.
 * ridge: Phú Sĩ, a moon and a small tent · fire: a campfire · stars: a scatter of stars.
 * @param {{ variant?: 'ridge' | 'fire' | 'stars'; className?: string }} props
 */
export default function Ornament({ variant = 'ridge', className = '' }) {
  const classes = `ornament ornament--${variant} ${className}`.trim();

  if (variant === 'fire') {
    return (
      <svg className={classes} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
        <path d="M32 10c3 9 12 14 12 26a12 12 0 0 1-24 0c0-6 3-9 5-12 1 5 3 7 5 7-2-7 0-14 2-21Z" />
        <path d="M32 34c2 3 5 5 5 9a5 5 0 0 1-10 0c0-3 3-5 5-9Z" />
        <path d="M14 56 50 48M14 48l36 8" />
      </svg>
    );
  }

  if (variant === 'stars') {
    return (
      <svg className={classes} viewBox="0 0 160 40" aria-hidden="true" focusable="false">
        <path d="M20 8v12M14 14h12" />
        <path d="M80 4v16M72 12h16" />
        <path d="M140 14v10M135 19h10" />
        <circle cx="48" cy="26" r="1.6" />
        <circle cx="110" cy="30" r="1.6" />
        <circle cx="60" cy="10" r="1.2" />
        <circle cx="124" cy="6" r="1.2" />
      </svg>
    );
  }

  return (
    <svg className={classes} viewBox="0 0 240 64" aria-hidden="true" focusable="false">
      <path d="M2 58h236" />
      <path d="M36 58 96 16c4-3 8-3 12 0l6 5 6-5c4-3 8-3 12 0l60 42" />
      <path d="M96 16c6 6 10 4 12 10 2-5 6-7 6-5 2 4 6 6 6 0 3 6 8 6 12-5" />
      <circle cx="196" cy="18" r="8" />
      <path d="M8 58l11-15 11 15M19 43v15" />
    </svg>
  );
}
