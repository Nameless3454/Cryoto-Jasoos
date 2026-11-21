import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FlowingMenu.css';

export interface FlowingMenuItem {
  link: string;
  text: string;
  image: string;
  meta?: string;
}

export interface FlowingMenuProps {
  items: FlowingMenuItem[];
  speed?: number;
  stretch?: number;
  magnet?: number;
  followCursor?: number;
  textColor?: string;
  bgColor?: string;
  marqueeBgColor?: string;
  marqueeTextColor?: string;
  direction?: 'left' | 'right';
  duration?: number;
  bandInset?: number;
  bandRadius?: number;
  carryContent?: boolean;
  dividers?: boolean;
  dimInactive?: boolean;
  align?: 'center' | 'left';
  showIndex?: boolean;
  showArrow?: boolean;
  imageShape?: 'pill' | 'rounded' | 'circle';
  intro?: boolean;
  className?: string;
}

export const FlowingMenu: React.FC<FlowingMenuProps> = ({
  items,
  speed = 60,
  textColor = '#ffffff',
  bgColor = '#120F17',
  marqueeBgColor = '#ffffff',
  marqueeTextColor = '#120F17',
  direction = 'left',
  duration = 0.5,
  bandInset = 0,
  bandRadius = 0,
  dividers = true,
  dimInactive = false,
  align = 'center',
  showIndex = false,
  showArrow = false,
  imageShape = 'pill',
  className = ''
}) => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const trackOffsets = useRef<number[]>(items.map(() => 0));
  const trackRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reqAnimRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(performance.now());

  // Continuous marquee animation loop for tracks
  useEffect(() => {
    const animate = (time: number) => {
      const delta = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      const pxPerSec = speed || 60;
      const move = pxPerSec * delta * (direction === 'left' ? -1 : 1);

      trackRefs.current.forEach((track, idx) => {
        if (!track) return;
        trackOffsets.current[idx] = (trackOffsets.current[idx] || 0) + move;
        const halfWidth = track.scrollWidth / 2;
        if (halfWidth > 0) {
          if (direction === 'left' && trackOffsets.current[idx] <= -halfWidth) {
            trackOffsets.current[idx] += halfWidth;
          } else if (direction === 'right' && trackOffsets.current[idx] >= 0) {
            trackOffsets.current[idx] -= halfWidth;
          }
        }
        track.style.transform = `translate3d(${trackOffsets.current[idx]}px, 0, 0)`;
      });

      reqAnimRef.current = requestAnimationFrame(animate);
    };

    lastTimeRef.current = performance.now();
    reqAnimRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(reqAnimRef.current);
    };
  }, [speed, direction]);

  const handleClick = (e: React.MouseEvent, link: string) => {
    e.preventDefault();
    if (!link || link === '#') return;
    if (link.startsWith('http://') || link.startsWith('https://')) {
      window.open(link, '_blank', 'noopener,noreferrer');
    } else {
      navigate(link);
    }
  };

  return (
    <nav
      className={`flowing-menu ${className}`}
      data-align={align}
      data-shape={imageShape}
      style={{
        backgroundColor: bgColor,
        color: textColor,
        '--flowing-menu-border': 'rgba(255, 255, 255, 0.12)'
      } as React.CSSProperties}
    >
      <ul className="flowing-menu__list">
        {items.map((item, index) => {
          const isHovered = hoveredIndex === index;
          const isDimmed = dimInactive && hoveredIndex !== null && !isHovered;

          return (
            <li
              key={index}
              className="flowing-menu__item"
              data-dimmed={isDimmed ? '' : undefined}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {dividers && index > 0 && <span className="flowing-menu__divider" />}

              {/* Static Base Link */}
              <a
                href={item.link}
                onClick={(e) => handleClick(e, item.link)}
                className="flowing-menu__link"
              >
                {showIndex && (
                  <span className="flowing-menu__index">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                )}

                <span className="flowing-menu__label">
                  <span className="flowing-menu__label-text">{item.text}</span>
                </span>

                <div className="flowing-menu__end">
                  {item.meta && <span className="flowing-menu__meta">{item.meta}</span>}
                  {showArrow && (
                    <span className="flowing-menu__arrow">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 11L11 5M11 5H6M11 5V10" />
                      </svg>
                    </span>
                  )}
                </div>
              </a>

              {/* Hover Expanding Marquee Band */}
              <div
                className="flowing-menu__band"
                style={{
                  backgroundColor: marqueeBgColor,
                  color: marqueeTextColor,
                  visibility: isHovered ? 'visible' : 'hidden',
                  clipPath: isHovered
                    ? `inset(${bandInset}px ${bandInset}px ${bandInset}px ${bandInset}px round ${bandRadius}px)`
                    : 'inset(50% 0 50% 0)',
                  transition: `clip-path ${duration}s cubic-bezier(0.16, 1, 0.3, 1), visibility ${duration}s step-start`
                }}
              >
                <div
                  ref={(el) => (trackRefs.current[index] = el)}
                  className="flowing-menu__track"
                >
                  {/* Repeat segments 4 times for smooth continuous loop */}
                  {[0, 1, 2, 3].map((rep) => (
                    <div key={rep} className="flowing-menu__part">
                      <span className="flowing-menu__part-text">{item.text}</span>
                      <div
                        className="flowing-menu__image"
                        style={{ backgroundImage: `url(${item.image})` }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default FlowingMenu;
