import React from 'react';
import './JasoosLogo.css';

export interface JasoosLogoProps {
  /** Size in pixels (width) or preset */
  size?: 'xs' | 'sm' | 'md' | 'lg' | number;
  /** Whether to render the 'JASOOS' wordmark */
  showWordmark?: boolean;
  /** Whether to render the 'CRYPTO FORENSICS' subtitle */
  showSubtitle?: boolean;
  /** Whether to animate the logo */
  animated?: boolean;
  /** Whether hover effects are enabled */
  interactive?: boolean;
  /** Optional layout mode: 'vertical' (stacked) or 'horizontal' (side-by-side for headers) */
  layout?: 'vertical' | 'horizontal';
  className?: string;
  onClick?: () => void;
}

export const JasoosLogo: React.FC<JasoosLogoProps> = ({
  size = 'md',
  showWordmark = true,
  showSubtitle = true,
  animated = true,
  interactive = true,
  layout = 'vertical',
  className = '',
  onClick
}) => {
  // Compute pixel dimensions from presets
  const getDimension = () => {
    if (typeof size === 'number') {
      const h = showWordmark ? size * 0.95 : size * 0.72;
      return { width: size, height: h };
    }
    switch (size) {
      case 'xs':
        return { width: 32, height: 32 };
      case 'sm':
        return { width: 48, height: showWordmark ? 58 : 48 };
      case 'md':
        return { width: 140, height: showWordmark ? 135 : 100 };
      case 'lg':
        return { width: 180, height: showWordmark ? 172 : 130 };
      default:
        return { width: 140, height: showWordmark ? 135 : 100 };
    }
  };

  const dim = getDimension();

  // If layout is horizontal (for Header)
  if (layout === 'horizontal') {
    return (
      <div
        className={`jasoos-logo-root flex items-center gap-2.5 select-none ${
          interactive ? 'cursor-pointer' : ''
        } ${className}`}
        onClick={onClick}
      >
        {/* Soft Ambient Glow */}
        <div className="jasoos-ambient-glow -inset-1 w-12 h-12" />

        {/* Minimalist Icon */}
        <svg
          viewBox="48 20 104 104"
          className="w-9 h-9 shrink-0 overflow-visible relative z-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="h-hex-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f0ff" />
              <stop offset="40%" stopColor="#3b82f6" />
              <stop offset="80%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>

            <linearGradient id="h-eye-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f0ff" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>

            <linearGradient id="h-iris-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>

            <linearGradient id="h-laser-bar" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity="0" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
            </linearGradient>

            <clipPath id="h-eye-clip">
              <path d="M 75 72 C 83 58, 117 58, 125 72 C 117 86, 83 86, 75 72 Z" />
            </clipPath>
          </defs>

          {/* 4 Brackets */}
          <g className={animated ? 'jasoos-brackets-group' : ''}>
            <path d="M 72 26 L 58 26 Q 54 26 54 30 L 54 44" fill="none" stroke="#00f0ff" strokeWidth="2.5" strokeLinecap="round" className={animated ? 'jasoos-bracket jasoos-bracket-tl' : ''} />
            <path d="M 128 26 L 142 26 Q 146 26 146 30 L 146 44" fill="none" stroke="#00f0ff" strokeWidth="2.5" strokeLinecap="round" className={animated ? 'jasoos-bracket jasoos-bracket-tr' : ''} />
            <path d="M 54 100 L 54 114 Q 54 118 58 118 L 72 118" fill="none" stroke="#00f0ff" strokeWidth="2.5" strokeLinecap="round" className={animated ? 'jasoos-bracket jasoos-bracket-bl' : ''} />
            <path d="M 146 100 L 146 114 Q 146 118 142 118 L 128 118" fill="none" stroke="#00f0ff" strokeWidth="2.5" strokeLinecap="round" className={animated ? 'jasoos-bracket jasoos-bracket-br' : ''} />
          </g>

          {/* Hexagonal Shield */}
          <g className={animated ? 'jasoos-hex-shield' : ''}>
            <polygon
              points="100,36 131,54 131,90 100,108 69,90 69,54"
              fill="#060914"
              stroke="url(#h-hex-grad)"
              strokeWidth="4.5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </g>

          {/* Eye Symbol */}
          <g>
            <path
              d="M 75 72 C 83 58, 117 58, 125 72 C 117 86, 83 86, 75 72 Z"
              fill="#040714"
              stroke="url(#h-eye-grad)"
              strokeWidth="2.4"
              strokeLinejoin="round"
              className="jasoos-eye-contour"
            />
            {/* Flat clean iris with specular dot */}
            <circle cx="100" cy="72" r="10" fill="url(#h-iris-grad)" />
            <circle cx="97" cy="68" r="2" fill="#ffffff" opacity="0.9" />

            {/* Scanning light */}
            {animated && (
              <g clipPath="url(#h-eye-clip)">
                <rect x="99" y="56" width="1.8" height="32" fill="url(#h-laser-bar)" className="jasoos-eye-scanner-beam" />
                <circle cx="100" cy="72" r="1.8" fill="#00f0ff" className="jasoos-eye-scanner-light" />
              </g>
            )}
          </g>
        </svg>

        {/* Wordmark and Subtitle */}
        {(showWordmark || showSubtitle) && (
          <div className="flex flex-col">
            {showWordmark && (
              <span className="font-extrabold text-xs sm:text-sm tracking-[0.18em] text-white leading-none font-sans">
                JASOOS
              </span>
            )}
            {showSubtitle && (
              <span className="text-[8px] font-bold tracking-[0.25em] bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent leading-tight mt-1 uppercase font-sans">
                CRYPTO FORENSICS
              </span>
            )}
          </div>
        )}
      </div>
    );
  }

  // Vertical layout (Hero Showcase & Dashboard)
  return (
    <div
      className={`jasoos-logo-root ${interactive ? 'cursor-pointer' : ''} ${className}`}
      style={{ width: dim.width, height: dim.height }}
      onClick={onClick}
    >
      {/* Diffuse Soft Ambient Glow */}
      <div className="jasoos-ambient-glow" />

      {/* Main Vector SVG - ViewBox 200x180 for perfect proportions */}
      <svg
        viewBox={showWordmark ? '40 18 120 156' : '40 18 120 108'}
        className="w-full h-full relative z-10 overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Hexagon Shield Gradient */}
          <linearGradient id="v-hex-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f0ff" />
            <stop offset="35%" stopColor="#3b82f6" />
            <stop offset="75%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#c084fc" />
          </linearGradient>

          {/* Eye Gradient */}
          <linearGradient id="v-eye-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f0ff" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#c084fc" />
          </linearGradient>

          {/* Clean Flat Iris Gradient */}
          <linearGradient id="v-iris-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>

          {/* Laser Scanner Bar */}
          <linearGradient id="v-laser-bar" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00f0ff" stopOpacity="0" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
          </linearGradient>

          {/* Subtitle Gradient */}
          <linearGradient id="v-sub-grad" x1="15%" y1="0%" x2="85%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#c084fc" />
          </linearGradient>

          {/* Inner Eye ClipPath */}
          <clipPath id="v-eye-clip">
            <path d="M 75 72 C 83 58, 117 58, 125 72 C 117 86, 83 86, 75 72 Z" />
          </clipPath>
        </defs>

        {/* 1. Scanning Brackets (4 corners) */}
        <g className={animated ? 'jasoos-brackets-group' : ''}>
          <path
            d="M 72 26 L 58 26 Q 54 26 54 30 L 54 44"
            fill="none"
            stroke="#00f0ff"
            strokeWidth="2.6"
            strokeLinecap="round"
            className={animated ? 'jasoos-bracket jasoos-bracket-tl' : ''}
          />
          <path
            d="M 128 26 L 142 26 Q 146 26 146 30 L 146 44"
            fill="none"
            stroke="#00f0ff"
            strokeWidth="2.6"
            strokeLinecap="round"
            className={animated ? 'jasoos-bracket jasoos-bracket-tr' : ''}
          />
          <path
            d="M 54 100 L 54 114 Q 54 118 58 118 L 72 118"
            fill="none"
            stroke="#00f0ff"
            strokeWidth="2.6"
            strokeLinecap="round"
            className={animated ? 'jasoos-bracket jasoos-bracket-bl' : ''}
          />
          <path
            d="M 146 100 L 146 114 Q 146 118 142 118 L 128 118"
            fill="none"
            stroke="#00f0ff"
            strokeWidth="2.6"
            strokeLinecap="round"
            className={animated ? 'jasoos-bracket jasoos-bracket-br' : ''}
          />
        </g>

        {/* 2. Hexagonal Shield */}
        <g className={animated ? 'jasoos-hex-shield' : ''}>
          <polygon
            points="100,36 131,54 131,90 100,108 69,90 69,54"
            fill="#060914"
            stroke="url(#v-hex-grad)"
            strokeWidth="4.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </g>

        {/* 3. Eye Symbol in Center */}
        <g>
          {/* Eye Contour */}
          <path
            d="M 75 72 C 83 58, 117 58, 125 72 C 117 86, 83 86, 75 72 Z"
            fill="#040714"
            stroke="url(#v-eye-grad)"
            strokeWidth="2.4"
            strokeLinejoin="round"
            className="jasoos-eye-contour"
          />

          {/* Clean Flat Blue Iris */}
          <circle cx="100" cy="72" r="10" fill="url(#v-iris-grad)" />

          {/* Crisp Specular Reflection Dot (Top Left) */}
          <circle cx="97" cy="68" r="2" fill="#ffffff" opacity="0.95" />

          {/* Minimalist Horizontal Scanning Light */}
          {animated && (
            <g clipPath="url(#v-eye-clip)">
              <rect
                x="99"
                y="56"
                width="1.8"
                height="32"
                fill="url(#v-laser-bar)"
                className="jasoos-eye-scanner-beam"
              />
              <circle
                cx="100"
                cy="72"
                r="1.8"
                fill="#00f0ff"
                className="jasoos-eye-scanner-light"
              />
            </g>
          )}
        </g>

        {/* 4. Minimalist Wordmark: "JASOOS" */}
        {showWordmark && (
          <g className={animated ? 'jasoos-wordmark' : ''}>
            {/* Letter J */}
            <path
              d="M 56 128 L 56 140 Q 56 146 50 146 L 46 146 Q 42 146 42 142"
              fill="none"
              stroke="#ffffff"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Letter A (Futuristic Chevron) */}
            <path
              d="M 62 146 L 71 128 L 80 146"
              fill="none"
              stroke="#ffffff"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Letter S */}
            <path
              d="M 98 132 C 96 129, 87 127, 87 132 C 86 137, 98 137, 97 142 C 96 147, 86 147, 85 143"
              fill="none"
              stroke="#ffffff"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Letter O (Squircle) */}
            <rect
              x="104"
              y="129"
              width="14"
              height="17"
              rx="5"
              fill="none"
              stroke="#ffffff"
              strokeWidth="3"
            />

            {/* Letter O (Squircle) */}
            <rect
              x="123"
              y="129"
              width="14"
              height="17"
              rx="5"
              fill="none"
              stroke="#ffffff"
              strokeWidth="3"
            />

            {/* Letter S */}
            <path
              d="M 157 132 C 155 129, 146 127, 146 132 C 145 137, 157 137, 156 142 C 155 147, 145 147, 144 143"
              fill="none"
              stroke="#ffffff"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>
        )}

        {/* 5. Minimalist Subtitle: "CRYPTO FORENSICS" */}
        {showWordmark && showSubtitle && (
          <text
            x="100"
            y="164"
            textAnchor="middle"
            fill="url(#v-sub-grad)"
            fontSize="8"
            fontWeight="700"
            className="jasoos-subtitle font-sans select-none"
          >
            CRYPTO FORENSICS
          </text>
        )}
      </svg>
    </div>
  );
};

export default JasoosLogo;
