/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#070A13', // main body background
          900: '#0D1322', // primary cards & panels
          850: '#11182B', // secondary cards
          800: '#162038', // borders & hover surfaces
          700: '#1E2B4A', // active borders & subtle inputs
          600: '#2A3B63',
        },
        projexion: {
          bg: '#080A11',            // Primary deep obsidian canvas
          canvas: '#0B0F19',        // Secondary deep background
          surface: '#0D111C',       // Primary card surface
          elevated: '#121726',      // Elevated surface & dropdowns
          hover: '#171D30',         // Surface hover state
          border: 'rgba(255, 255, 255, 0.08)',
          'border-active': 'rgba(109, 85, 255, 0.45)',
          indigo: '#6D55FF',        // Primary signature purple/indigo
          'indigo-glow': 'rgba(109, 85, 255, 0.3)',
          violet: '#8B5CF6',
          cyan: '#00D2D3',          // Cyber cyan telemetry
          'cyan-glow': 'rgba(0, 210, 211, 0.25)',
          emerald: '#10B981',       // Success & positive delta (+0.45%)
          rose: '#F43F5E',          // Negative delta (-0.65%) & critical risk
          amber: '#F59E0B',         // Warning & highlight (Jun 70%)
        },
        cyber: {
          blue: '#3B82F6',
          indigo: '#6366F1',
          purple: '#8B5CF6',
          cyan: '#06B6D4',
          glow: 'rgba(59, 130, 246, 0.15)',
        },
        risk: {
          low: '#10B981',      // Green
          medium: '#F59E0B',   // Yellow
          high: '#F97316',     // Orange
          critical: '#EF4444', // Red
        }
      },
      boxShadow: {
        'projexion-card': '0 12px 36px -4px rgba(0, 0, 0, 0.7), inset 0 1px 0 0 rgba(255, 255, 255, 0.08)',
        'projexion-card-hover': '0 18px 45px -4px rgba(0, 0, 0, 0.8), inset 0 1px 0 0 rgba(255, 255, 255, 0.14)',
        'projexion-glow': '0 0 25px -4px rgba(109, 85, 255, 0.45)',
        'projexion-pill': '0 0 20px rgba(109, 85, 255, 0.55)',
        'projexion-cyan': '0 0 22px rgba(0, 210, 211, 0.35)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite alternate',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        glowPulse: {
          '0%': { boxShadow: '0 0 5px rgba(59, 130, 246, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.7)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' }
        }
      }
    },
  },
  plugins: [],
}
