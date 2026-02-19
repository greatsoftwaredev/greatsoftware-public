import styles from './Logo.module.css'

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  const combinedClass = [styles.logo, className].filter(Boolean).join(' ')

  return (
    <svg
      viewBox="0 0 200 160"
      xmlns="http://www.w3.org/2000/svg"
      className={combinedClass}
      role="img"
      aria-label="Great Software logo"
    >
      <defs>
        {/* Mountain gradient — darker blue at base, lighter at peaks */}
        <linearGradient id="gs-mountain-grad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#1a6fb5" />
          <stop offset="100%" stopColor="#4da8da" />
        </linearGradient>

        {/* Trident gradient — slightly brighter to stand out */}
        <linearGradient id="gs-trident-grad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#4da8da" />
          <stop offset="100%" stopColor="#7ec8e3" />
        </linearGradient>

        {/* Clip paths for circuit lines to stay within mountain shapes */}
        <clipPath id="gs-left-mountain">
          <polygon points="30,120 65,55 100,120" />
        </clipPath>
        <clipPath id="gs-center-mountain">
          <polygon points="55,120 100,20 145,120" />
        </clipPath>
        <clipPath id="gs-right-mountain">
          <polygon points="100,120 135,55 170,120" />
        </clipPath>
      </defs>

      {/* === Left mountain peak === */}
      <polygon
        points="30,120 65,55 100,120"
        fill="url(#gs-mountain-grad)"
        opacity="0.7"
      />

      {/* === Center mountain peak (tallest) === */}
      <polygon
        points="55,120 100,20 145,120"
        fill="url(#gs-mountain-grad)"
      />

      {/* === Right mountain peak === */}
      <polygon
        points="100,120 135,55 170,120"
        fill="url(#gs-mountain-grad)"
        opacity="0.7"
      />

      {/* === Circuit lines on left mountain === */}
      <g clipPath="url(#gs-left-mountain)" stroke="#0a0a0f" strokeWidth="1" opacity="0.5">
        <line x1="25" y1="80" x2="105" y2="80" />
        <line x1="25" y1="92" x2="105" y2="92" />
        <line x1="25" y1="104" x2="105" y2="104" />
      </g>

      {/* === Circuit lines on center mountain === */}
      <g clipPath="url(#gs-center-mountain)" stroke="#0a0a0f" strokeWidth="1" opacity="0.45">
        <line x1="50" y1="52" x2="150" y2="52" />
        <line x1="50" y1="66" x2="150" y2="66" />
        <line x1="50" y1="80" x2="150" y2="80" />
        <line x1="50" y1="92" x2="150" y2="92" />
        <line x1="50" y1="104" x2="150" y2="104" />
      </g>

      {/* === Circuit lines on right mountain === */}
      <g clipPath="url(#gs-right-mountain)" stroke="#0a0a0f" strokeWidth="1" opacity="0.5">
        <line x1="95" y1="80" x2="175" y2="80" />
        <line x1="95" y1="92" x2="175" y2="92" />
        <line x1="95" y1="104" x2="175" y2="104" />
      </g>

      {/* === PCB solder-point dots on left mountain === */}
      <g fill="#4da8da" opacity="0.8">
        <circle cx="55" cy="80" r="1.8" />
        <circle cx="75" cy="80" r="1.8" />
        <circle cx="48" cy="92" r="1.8" />
        <circle cx="68" cy="92" r="1.8" />
        <circle cx="88" cy="92" r="1.8" />
        <circle cx="42" cy="104" r="1.8" />
        <circle cx="62" cy="104" r="1.8" />
        <circle cx="82" cy="104" r="1.8" />
      </g>

      {/* === PCB solder-point dots on center mountain === */}
      <g fill="#4da8da" opacity="0.8">
        <circle cx="88" cy="52" r="1.8" />
        <circle cx="112" cy="52" r="1.8" />
        <circle cx="80" cy="66" r="1.8" />
        <circle cx="100" cy="66" r="1.8" />
        <circle cx="120" cy="66" r="1.8" />
        <circle cx="75" cy="80" r="1.8" />
        <circle cx="100" cy="80" r="1.8" />
        <circle cx="125" cy="80" r="1.8" />
        <circle cx="70" cy="92" r="1.8" />
        <circle cx="100" cy="92" r="1.8" />
        <circle cx="130" cy="92" r="1.8" />
        <circle cx="66" cy="104" r="1.8" />
        <circle cx="100" cy="104" r="1.8" />
        <circle cx="134" cy="104" r="1.8" />
      </g>

      {/* === PCB solder-point dots on right mountain === */}
      <g fill="#4da8da" opacity="0.8">
        <circle cx="125" cy="80" r="1.8" />
        <circle cx="145" cy="80" r="1.8" />
        <circle cx="112" cy="92" r="1.8" />
        <circle cx="132" cy="92" r="1.8" />
        <circle cx="152" cy="92" r="1.8" />
        <circle cx="118" cy="104" r="1.8" />
        <circle cx="138" cy="104" r="1.8" />
        <circle cx="158" cy="104" r="1.8" />
      </g>

      {/* === Trident / tuning-fork shape rising from center peak === */}
      <g fill="none" stroke="url(#gs-trident-grad)" strokeWidth="2" strokeLinecap="round">
        {/* Central stem from mountain peak downward */}
        <line x1="100" y1="42" x2="100" y2="18" />
        {/* Left prong — curves outward and upward */}
        <path d="M100,32 Q92,32 89,24 L87,8" />
        {/* Center prong — straight up */}
        <line x1="100" y1="18" x2="100" y2="2" />
        {/* Right prong — curves outward and upward */}
        <path d="M100,32 Q108,32 111,24 L113,8" />
      </g>

      {/* Trident tip nodes */}
      <circle cx="100" cy="2" r="2.2" fill="#7ec8e3" />
      <circle cx="87" cy="8" r="1.8" fill="#7ec8e3" />
      <circle cx="113" cy="8" r="1.8" fill="#7ec8e3" />

      {/* === Base line under mountains === */}
      <line
        x1="20"
        y1="122"
        x2="180"
        y2="122"
        stroke="#1a6fb5"
        strokeWidth="1.5"
        opacity="0.6"
      />
    </svg>
  )
}
