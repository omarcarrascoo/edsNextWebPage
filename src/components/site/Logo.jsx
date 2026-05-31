// Minimal wordmark: dot + name. No icon block, no gradient stroke.
// The accent dot is the only visual identity element.
export default function Logo() {
  return (
    <span className="inline-flex items-baseline gap-2 select-none">
      <span
        aria-hidden
        className="inline-block w-1.5 h-1.5 rounded-full bg-accent translate-y-[-2px]"
        style={{ boxShadow: '0 0 10px rgba(45,226,197,0.6)' }}
      />
      <span className="font-display font-semibold tracking-[-0.02em] text-fog-50 text-[15px]">
        Era<span className="text-fog-400 font-normal">/</span>Digital
      </span>
    </span>
  )
}
