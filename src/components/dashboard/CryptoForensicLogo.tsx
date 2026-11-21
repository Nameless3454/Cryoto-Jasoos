import React, { useState } from 'react';

export type LogoStyle = 'shield' | 'detective-eye' | 'blockchain-core';

interface CryptoForensicLogoProps {
  className?: string;
  size?: number;
  interactive?: boolean;
}

export const CryptoForensicLogo: React.FC<CryptoForensicLogoProps> = ({
  className = '',
  size = 140,
  interactive = true
}) => {
  const [styleIndex, setStyleIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState(false);

  const styles: LogoStyle[] = ['shield', 'detective-eye', 'blockchain-core'];
  const currentStyle = styles[styleIndex];

  const handleCycleStyle = () => {
    if (!interactive) return;
    setStyleIndex(prev => (prev + 1) % styles.length);
  };

  const getStyleLabel = () => {
    switch (currentStyle) {
      case 'shield':
        return 'CYBER FORENSICS SHIELD';
      case 'detective-eye':
        return 'JASOOS SURVEILLANCE RADAR';
      case 'blockchain-core':
        return 'MULTI-HOP FORENSIC CORE';
    }
  };

  return (
    <div
      className={`relative flex flex-col items-center justify-center select-none group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Container for Logo SVG */}
      <div
        className="relative flex items-center justify-center cursor-pointer transition-transform duration-500 ease-out active:scale-95"
        style={{ width: size, height: size }}
        onClick={handleCycleStyle}
        title="Click to toggle Crypto-Jasoos logo theme"
      >
        {/* Ambient Multi-Layer Glow */}
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/30 via-blue-600/35 to-purple-600/30 blur-2xl transition-all duration-700 pointer-events-none ${isHovered ? 'scale-130 opacity-100' : 'scale-100 opacity-75'
            }`}
        />

        {/* Central SVG Graphic */}
        <svg
          viewBox="0 0 160 160"
          className="w-full h-full relative z-10 overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Hologram Bloom Filter */}
            <filter id="cortex-bloom" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" result="blur1" />
              <feGaussianBlur stdDeviation="7" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Core Intense Laser Glow */}
            <filter id="laser-core" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Holographic Rim Gradient */}
            <linearGradient id="cyber-rim-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="30%" stopColor="#6366f1" />
              <stop offset="70%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>

            {/* Sapphire Obsidian Glass Surface */}
            <radialGradient id="cyber-glass-surface" cx="45%" cy="35%" r="70%">
              <stop offset="0%" stopColor="#162752" />
              <stop offset="55%" stopColor="#0a122c" />
              <stop offset="100%" stopColor="#040817" />
            </radialGradient>

            {/* Laser Diamond Core Gradient */}
            <linearGradient id="core-diamond-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="35%" stopColor="#7dd3fc" />
              <stop offset="75%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>

            {/* Specular Highlight Arc */}
            <linearGradient id="specular-shine" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
              <stop offset="55%" stopColor="#38bdf8" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </linearGradient>

            {/* Gold/Cyan Chrome for Multi-chain */}
            <linearGradient id="gold-cyan-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>

          {/* 1. Outer Precision Radar Ring (Rotating CW) */}
          <g className="animate-[spin_28s_linear_infinite] origin-center">
            <circle
              cx="80"
              cy="80"
              r="74"
              fill="none"
              stroke="url(#cyber-rim-grad)"
              strokeWidth="1.2"
              strokeDasharray="4 8"
              opacity="0.5"
            />
            {/* Laser Caliper Crosshairs */}
            <line x1="80" y1="2" x2="80" y2="7" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
            <line x1="80" y1="153" x2="80" y2="158" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
            <line x1="2" y1="80" x2="7" y2="80" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
            <line x1="153" y1="80" x2="158" y2="80" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* 2. Middle Radar Reticle (Rotating CCW) */}
          <g className="animate-[spin_18s_linear_infinite_reverse] origin-center">
            <circle
              cx="80"
              cy="80"
              r="65"
              fill="none"
              stroke="#6366f1"
              strokeWidth="1.4"
              strokeDasharray="14 10 4 10"
              opacity="0.4"
            />
            <circle cx="80" cy="15" r="1.5" fill="#38bdf8" />
            <circle cx="145" cy="80" r="1.5" fill="#38bdf8" />
            <circle cx="80" cy="145" r="1.5" fill="#38bdf8" />
            <circle cx="15" cy="80" r="1.5" fill="#38bdf8" />
          </g>

          {/* 3. Outer HUD Brackets */}
          <g opacity="0.7" stroke="#38bdf8" strokeWidth="1.4" fill="none">
            <path d="M 30 40 L 30 30 L 40 30" strokeLinecap="round" />
            <path d="M 130 30 L 120 30 M 130 30 L 130 40" strokeLinecap="round" />
            <path d="M 30 120 L 30 130 L 40 130" strokeLinecap="round" />
            <path d="M 130 120 L 130 130 L 120 130" strokeLinecap="round" />
          </g>

          {/* 4. DYNAMIC LOGO CENTERPIECE BASED ON SELECTED STYLE */}

          {/* ============================================================== */}
          {/* STYLE 1: CYBER FORENSICS SHIELD (DEFAULT)                     */}
          {/* ============================================================== */}
          {currentStyle === 'shield' && (
            <g
              className="transition-transform duration-500 ease-out origin-center"
              style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
            >
              {/* Shield Shadow */}
              <path
                d="M 80,30 L 122,46 C 122,88 102,114 80,128 C 58,114 38,88 38,46 Z"
                fill="#020617"
                opacity="0.9"
                filter="blur(5px)"
              />

              {/* Main Faceted Cyber Shield Base */}
              <path
                d="M 80,28 L 120,44 C 120,86 100,112 80,126 C 60,112 40,86 40,44 Z"
                fill="url(#cyber-glass-surface)"
                stroke="url(#cyber-rim-grad)"
                strokeWidth="2.5"
                strokeLinejoin="round"
                filter={isHovered ? 'url(#cortex-bloom)' : 'url(#laser-core)'}
              />

              {/* Inset Metallic Bevel */}
              <path
                d="M 80,35 L 113,48 C 113,82 96,104 80,116 C 64,104 47,82 47,48 Z"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="1.2"
                strokeOpacity="0.55"
                strokeLinejoin="round"
              />

              {/* Glass Specular Reflection */}
              <path
                d="M 80,35 L 113,48 C 108,68 88,78 47,48 L 80,35 Z"
                fill="url(#specular-shine)"
                opacity="0.9"
                pointerEvents="none"
              />

              {/* Shield Etched Circuit Nodes */}
              <g stroke="#38bdf8" strokeWidth="1" strokeLinecap="round" opacity="0.4">
                <line x1="80" y1="36" x2="80" y2="48" />
                <line x1="56" y1="60" x2="66" y2="60" />
                <line x1="104" y1="60" x2="94" y2="60" />
                <circle cx="66" cy="60" r="1.5" fill="#38bdf8" />
                <circle cx="94" cy="60" r="1.5" fill="#38bdf8" />
              </g>

              {/* Center Forensic Optical Scanner & Diamond Core */}
              <g transform="translate(80, 77)">
                {/* Rotating Scanner Tick Ring */}
                <circle
                  r="22"
                  fill="none"
                  stroke="url(#cyber-rim-grad)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  opacity="0.6"
                  className="animate-[spin_12s_linear_infinite]"
                />

                {/* Inner Obsidian Lens Chamber */}
                <circle r="16" fill="#040b1e" stroke="#38bdf8" strokeWidth="1.6" />

                {/* Central Cryptographic Diamond Core */}
                <polygon
                  points="0,-10 9,0 0,10 -9,0"
                  fill="url(#core-diamond-grad)"
                  filter="url(#laser-core)"
                />

                {/* Inner Core Specular Facet */}
                <polygon points="0,-10 9,0 0,0" fill="#ffffff" opacity="0.6" />

                {/* Precision Laser Targeting Crosshairs */}
                <line x1="0" y1="-26" x2="0" y2="-17" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="0" y1="17" x2="0" y2="26" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="-26" y1="0" x2="-17" y2="0" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="17" y1="0" x2="26" y2="0" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />

                {/* 3 Multi-Hop Fund Flow Nodes */}
                <circle cx="-12" cy="-12" r="2.2" fill="#818cf8" />
                <circle cx="12" cy="-12" r="2.2" fill="#38bdf8" />
                <circle cx="0" cy="15" r="2.2" fill="#34d399" />
                <line x1="-12" y1="-12" x2="0" y2="-9" stroke="#818cf8" strokeWidth="0.8" opacity="0.75" />
                <line x1="12" y1="-12" x2="0" y2="-9" stroke="#38bdf8" strokeWidth="0.8" opacity="0.75" />
                <line x1="0" y1="9" x2="0" y2="15" stroke="#34d399" strokeWidth="0.8" opacity="0.75" />
              </g>
            </g>
          )}

          {/* ============================================================== */}
          {/* STYLE 2: JASOOS DETECTIVE EYE / RADAR SCANNER                  */}
          {/* ============================================================== */}
          {currentStyle === 'detective-eye' && (
            <g
              className="transition-transform duration-500 ease-out origin-center"
              style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
            >
              {/* Outer Hexagon Shield Base */}
              <polygon
                points="80,26 122,46 130,88 98,126 62,126 30,88 38,46"
                fill="url(#cyber-glass-surface)"
                stroke="url(#cyber-rim-grad)"
                strokeWidth="2.5"
                strokeLinejoin="round"
                filter={isHovered ? 'url(#cortex-bloom)' : 'url(#laser-core)'}
              />

              {/* Sleek Cyber Detective Eye Contours */}
              <path
                d="M 46,80 C 58,58 102,58 114,80 C 102,102 58,102 46,80 Z"
                fill="#03081c"
                stroke="url(#cyber-rim-grad)"
                strokeWidth="2"
                strokeLinejoin="round"
              />

              {/* Iris Outer Ring */}
              <circle
                cx="80"
                cy="80"
                r="18"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="1.5"
                strokeDasharray="6 3"
                className="animate-[spin_10s_linear_infinite]"
              />

              {/* Glowing Cyber Pupil */}
              <circle cx="80" cy="80" r="10" fill="url(#core-diamond-grad)" filter="url(#laser-core)" />
              <circle cx="77" cy="77" r="3" fill="#ffffff" opacity="0.85" />

              {/* Scanner Crosshairs */}
              <line x1="36" y1="80" x2="124" y2="80" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 4" opacity="0.6" />
              <line x1="80" y1="46" x2="80" y2="114" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 4" opacity="0.6" />

              {/* Specular Highlight */}
              <path
                d="M 46,80 C 58,58 102,58 114,80 C 102,68 58,68 46,80 Z"
                fill="url(#specular-shine)"
                opacity="0.8"
              />
            </g>
          )}

          {/* ============================================================== */}
          {/* STYLE 3: MULTI-HOP BLOCKCHAIN FORENSICS CORE                   */}
          {/* ============================================================== */}
          {currentStyle === 'blockchain-core' && (
            <g
              className="transition-transform duration-500 ease-out origin-center"
              style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
            >
              {/* Outer Circular Hologram Medallion */}
              <circle
                cx="80"
                cy="80"
                r="46"
                fill="url(#cyber-glass-surface)"
                stroke="url(#cyber-rim-grad)"
                strokeWidth="2.5"
                filter={isHovered ? 'url(#cortex-bloom)' : 'url(#laser-core)'}
              />

              {/* 3D Isometric Center Blockchain Cube */}
              <g transform="translate(80, 80)">
                {/* Top Face */}
                <polygon points="0,-18 16,-9 0,0 -16,-9" fill="#38bdf8" opacity="0.9" />
                {/* Left Face */}
                <polygon points="-16,-9 0,0 0,18 -16,9" fill="#1d4ed8" opacity="0.85" />
                {/* Right Face */}
                <polygon points="0,0 16,-9 16,9 0,18" fill="#2563eb" opacity="0.95" />
                {/* Glowing Outline */}
                <path
                  d="M0,-18 L16,-9 L16,9 L0,18 L-16,9 L-16,-9 Z M0,-18 L0,0 M0,0 L16,-9 M0,0 L-16,-9"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="1.2"
                  opacity="0.75"
                />

                {/* 3 Radiating Satellite Nodes (ETH, BTC, SOL) */}
                <g className="animate-[spin_15s_linear_infinite]">
                  {/* BTC satellite node */}
                  <circle cx="0" cy="-32" r="5" fill="#f59e0b" filter="url(#laser-core)" />
                  <line x1="0" y1="-18" x2="0" y2="-27" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="2 2" />

                  {/* ETH satellite node */}
                  <circle cx="28" cy="18" r="5" fill="#818cf8" filter="url(#laser-core)" />
                  <line x1="16" y1="9" x2="24" y2="14" stroke="#818cf8" strokeWidth="1.2" strokeDasharray="2 2" />

                  {/* SOL satellite node */}
                  <circle cx="-28" cy="18" r="5" fill="#10b981" filter="url(#laser-core)" />
                  <line x1="-16" y1="9" x2="-24" y2="14" stroke="#10b981" strokeWidth="1.2" strokeDasharray="2 2" />
                </g>
              </g>
            </g>
          )}
        </svg>
      </div>

      {/* Interactive Micro Theme Switcher Badge */}
      {interactive && (
        <button
          onClick={handleCycleStyle}
          className="mt-1 px-3 py-1 rounded-full bg-[#0b142c]/90 hover:bg-[#132247] border border-blue-500/35 hover:border-cyan-400/60 text-[9px] font-mono font-bold text-cyan-300 tracking-wider uppercase transition-all shadow-[0_0_12px_rgba(56,189,248,0.25)] flex items-center gap-1.5 cursor-pointer active:scale-95 z-20"
          title="Click to toggle insignia design"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>{getStyleLabel()}</span>
          <span className="text-slate-400 text-[8px] ml-0.5">({styleIndex + 1}/3 ⟳)</span>
        </button>
      )}
    </div>
  );
};

export default CryptoForensicLogo;
