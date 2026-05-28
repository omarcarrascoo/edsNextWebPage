export default function Logo({ size = 28 }) {
  return (
    <span className="inline-flex items-center gap-2.5 select-none">
      <span
        className="relative inline-flex items-center justify-center rounded-md"
        style={{ width: size, height: size }}
      >
        <svg viewBox="0 0 32 32" width={size} height={size} className="block">
          <defs>
            <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2DE2C5" />
              <stop offset="100%" stopColor="#38BDF8" />
            </linearGradient>
          </defs>
          <rect x="1" y="1" width="30" height="30" rx="8" fill="#0E141B" stroke="url(#logoGrad)" strokeWidth="1.2" />
          <path d="M9 11h14M9 16h10M9 21h14" stroke="url(#logoGrad)" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="23" cy="16" r="1.6" fill="#2DE2C5" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display font-semibold tracking-tight text-fog-50 text-[15px]">Era Digital</span>
        <span className="mono-label text-[10px] tracking-[0.2em] uppercase">Solutions</span>
      </span>
    </span>
  )
}
