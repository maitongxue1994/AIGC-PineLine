type Props = { className?: string; size?: number }

export default function Logo({ className = '', size = 28 }: Props) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
        <defs>
          <linearGradient id="pl-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FF6A3D" />
            <stop offset="55%" stopColor="#FF3D7F" />
            <stop offset="100%" stopColor="#7C5CFF" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="8" fill="#0E0E14" />
        <path
          d="M8 22 L8 10 L14 10 Q20 10 20 14.5 Q20 18.5 15 19 L12 19 L12 22 Z M12 13 L12 16 L14.5 16 Q16.2 16 16.2 14.5 Q16.2 13 14.5 13 Z"
          fill="url(#pl-g)"
        />
        <circle cx="23.5" cy="20" r="2.4" fill="url(#pl-g)" />
      </svg>
      <div className="leading-none">
        <div className="font-display text-[17px] font-semibold tracking-tight text-white">
          PineLine
        </div>
        <div className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.25em] text-ink-2">
          AI Film Pipeline
        </div>
      </div>
    </div>
  )
}
