// Simple elegant boy monk logo - inline SVG
export default function BoyMonkLogo({ size = 40 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
    >
      <title>Boy Monk</title>
      {/* Halo / aura ring */}
      <circle cx="24" cy="22" r="20" stroke="currentColor" strokeWidth="1.2" opacity="0.3" fill="none" />
      {/* Head */}
      <circle cx="24" cy="18" r="8" fill="currentColor" opacity="0.9" />
      {/* Face circle */}
      <circle cx="24" cy="18" r="6" fill="currentColor" opacity="0.6" />
      {/* Eyes - minimalist dots */}
      <circle cx="21" cy="17" r="1.2" fill="var(--background, #060816)" />
      <circle cx="27" cy="17" r="1.2" fill="var(--background, #060816)" />
      {/* Serene smile */}
      <path d="M21 21.5 Q24 24 27 21.5" stroke="var(--background, #060816)" strokeWidth="1" fill="none" strokeLinecap="round" />
      {/* Robe/body - simple triangular/rounded shape */}
      <path d="M15 28 Q24 38 33 28 L30 44 Q24 46 18 44 Z" fill="currentColor" opacity="0.7" />
      {/* Folded hands */}
      <rect x="20" y="32" width="8" height="4" rx="2" fill="currentColor" opacity="0.4" />
      {/* Subtle meditation lines around head */}
      <line x1="10" y1="22" x2="14" y2="22" stroke="currentColor" strokeWidth="0.8" opacity="0.4" strokeLinecap="round" />
      <line x1="8" y1="26" x2="12" y2="26" stroke="currentColor" strokeWidth="0.8" opacity="0.3" strokeLinecap="round" />
      <line x1="38" y1="22" x2="34" y2="22" stroke="currentColor" strokeWidth="0.8" opacity="0.4" strokeLinecap="round" />
      <line x1="40" y1="26" x2="36" y2="26" stroke="currentColor" strokeWidth="0.8" opacity="0.3" strokeLinecap="round" />
    </svg>
  );
}
