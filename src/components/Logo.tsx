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
        {/* Mountain gradient — very dark blue at base, medium blue at peaks */}
        <linearGradient id="gs-mountain-grad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#0a2a4a" />
          <stop offset="100%" stopColor="#1a5f9a" />
        </linearGradient>

        {/* Side mountain gradient — slightly lighter to differentiate */}
        <linearGradient id="gs-side-mountain-grad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#0d3355" />
          <stop offset="100%" stopColor="#1a6fb5" />
        </linearGradient>

        {/* Trident gradient */}
        <linearGradient id="gs-trident-grad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#4da8da" />
          <stop offset="100%" stopColor="#a0daf0" />
        </linearGradient>

        {/* Clip paths for circuit lines */}
        <clipPath id="gs-left-mountain">
          <polygon points="28,120 65,50 102,120" />
        </clipPath>
        <clipPath id="gs-center-mountain">
          <polygon points="52,120 100,15 148,120" />
        </clipPath>
        <clipPath id="gs-right-mountain">
          <polygon points="98,120 135,50 172,120" />
        </clipPath>
      </defs>

      {/* === Left mountain peak (behind center) === */}
      <polygon
        points="28,120 65,50 102,120"
        fill="url(#gs-side-mountain-grad)"
        opacity="0.85"
      />

      {/* === Right mountain peak (behind center) === */}
      <polygon
        points="98,120 135,50 172,120"
        fill="url(#gs-side-mountain-grad)"
        opacity="0.85"
      />

      {/* === Circuit traces on left mountain (lighter lines on dark faces) === */}
      <g clipPath="url(#gs-left-mountain)">
        {/* Horizontal traces */}
        <g stroke="#4da8da" strokeWidth="0.8" opacity="0.5">
          <line x1="20" y1="75" x2="110" y2="75" />
          <line x1="20" y1="87" x2="110" y2="87" />
          <line x1="20" y1="99" x2="110" y2="99" />
          <line x1="20" y1="111" x2="110" y2="111" />
        </g>
        {/* Vertical connectors */}
        <g stroke="#4da8da" strokeWidth="0.8" opacity="0.4">
          <line x1="55" y1="75" x2="55" y2="87" />
          <line x1="75" y1="87" x2="75" y2="99" />
          <line x1="45" y1="99" x2="45" y2="111" />
          <line x1="85" y1="75" x2="85" y2="99" />
        </g>
        {/* Solder nodes */}
        <g fill="#4da8da" opacity="0.7">
          <circle cx="55" cy="75" r="1.5" />
          <circle cx="85" cy="75" r="1.5" />
          <circle cx="55" cy="87" r="1.5" />
          <circle cx="75" cy="87" r="1.5" />
          <circle cx="45" cy="99" r="1.5" />
          <circle cx="75" cy="99" r="1.5" />
          <circle cx="85" cy="99" r="1.5" />
          <circle cx="45" cy="111" r="1.5" />
          <circle cx="65" cy="111" r="1.5" />
        </g>
      </g>

      {/* === Circuit traces on right mountain === */}
      <g clipPath="url(#gs-right-mountain)">
        {/* Horizontal traces */}
        <g stroke="#4da8da" strokeWidth="0.8" opacity="0.5">
          <line x1="90" y1="75" x2="180" y2="75" />
          <line x1="90" y1="87" x2="180" y2="87" />
          <line x1="90" y1="99" x2="180" y2="99" />
          <line x1="90" y1="111" x2="180" y2="111" />
        </g>
        {/* Vertical connectors */}
        <g stroke="#4da8da" strokeWidth="0.8" opacity="0.4">
          <line x1="125" y1="75" x2="125" y2="87" />
          <line x1="145" y1="87" x2="145" y2="99" />
          <line x1="115" y1="75" x2="115" y2="99" />
          <line x1="155" y1="99" x2="155" y2="111" />
        </g>
        {/* Solder nodes */}
        <g fill="#4da8da" opacity="0.7">
          <circle cx="115" cy="75" r="1.5" />
          <circle cx="125" cy="75" r="1.5" />
          <circle cx="145" cy="87" r="1.5" />
          <circle cx="125" cy="87" r="1.5" />
          <circle cx="115" cy="99" r="1.5" />
          <circle cx="145" cy="99" r="1.5" />
          <circle cx="155" cy="99" r="1.5" />
          <circle cx="135" cy="111" r="1.5" />
          <circle cx="155" cy="111" r="1.5" />
        </g>
      </g>

      {/* === Center mountain peak (in front, tallest) === */}
      <polygon
        points="52,120 100,15 148,120"
        fill="url(#gs-mountain-grad)"
      />

      {/* === Circuit traces on center mountain (lighter lines, most detailed) === */}
      <g clipPath="url(#gs-center-mountain)">
        {/* Horizontal traces */}
        <g stroke="#4da8da" strokeWidth="0.8" opacity="0.55">
          <line x1="45" y1="45" x2="155" y2="45" />
          <line x1="45" y1="57" x2="155" y2="57" />
          <line x1="45" y1="69" x2="155" y2="69" />
          <line x1="45" y1="81" x2="155" y2="81" />
          <line x1="45" y1="93" x2="155" y2="93" />
          <line x1="45" y1="105" x2="155" y2="105" />
        </g>
        {/* Vertical connectors — creating PCB trace routes */}
        <g stroke="#4da8da" strokeWidth="0.8" opacity="0.4">
          {/* Left side traces */}
          <line x1="80" y1="45" x2="80" y2="57" />
          <line x1="70" y1="57" x2="70" y2="69" />
          <line x1="90" y1="69" x2="90" y2="81" />
          <line x1="75" y1="81" x2="75" y2="93" />
          <line x1="85" y1="93" x2="85" y2="105" />
          {/* Right side traces */}
          <line x1="120" y1="45" x2="120" y2="57" />
          <line x1="130" y1="57" x2="130" y2="69" />
          <line x1="110" y1="69" x2="110" y2="81" />
          <line x1="125" y1="81" x2="125" y2="93" />
          <line x1="115" y1="93" x2="115" y2="105" />
          {/* Center vertical spine */}
          <line x1="100" y1="45" x2="100" y2="105" />
        </g>
        {/* Solder nodes */}
        <g fill="#4da8da" opacity="0.7">
          <circle cx="80" cy="45" r="1.5" />
          <circle cx="100" cy="45" r="1.5" />
          <circle cx="120" cy="45" r="1.5" />
          <circle cx="70" cy="57" r="1.5" />
          <circle cx="100" cy="57" r="1.5" />
          <circle cx="130" cy="57" r="1.5" />
          <circle cx="90" cy="69" r="1.5" />
          <circle cx="100" cy="69" r="1.5" />
          <circle cx="110" cy="69" r="1.5" />
          <circle cx="75" cy="81" r="1.5" />
          <circle cx="100" cy="81" r="1.5" />
          <circle cx="125" cy="81" r="1.5" />
          <circle cx="85" cy="93" r="1.5" />
          <circle cx="100" cy="93" r="1.5" />
          <circle cx="115" cy="93" r="1.5" />
          <circle cx="85" cy="105" r="1.5" />
          <circle cx="100" cy="105" r="1.5" />
          <circle cx="115" cy="105" r="1.5" />
        </g>
      </g>

      {/* === Trident / tuning-fork rising from center peak === */}
      <g fill="none" stroke="url(#gs-trident-grad)" strokeWidth="2.5" strokeLinecap="round">
        {/* Central stem */}
        <line x1="100" y1="38" x2="100" y2="14" />
        {/* Left prong */}
        <path d="M100,30 Q90,28 86,18 L84,5" />
        {/* Center prong — straight up */}
        <line x1="100" y1="14" x2="100" y2="0" />
        {/* Right prong */}
        <path d="M100,30 Q110,28 114,18 L116,5" />
      </g>

      {/* Trident tip nodes — glowing */}
      <circle cx="100" cy="0" r="2.5" fill="#a0daf0" />
      <circle cx="84" cy="5" r="2" fill="#a0daf0" />
      <circle cx="116" cy="5" r="2" fill="#a0daf0" />

      {/* === Subtle base line === */}
      <line
        x1="20"
        y1="122"
        x2="180"
        y2="122"
        stroke="#1a6fb5"
        strokeWidth="1"
        opacity="0.4"
      />
    </svg>
  )
}
