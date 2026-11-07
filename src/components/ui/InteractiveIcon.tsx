import React, { useRef, useState } from 'react';

interface InteractiveIconProps {
  icon: React.ComponentType<{ className?: string }>;
  label?: string;
  className?: string;
  iconClassName?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'magnetic' | 'spin' | 'tilt' | 'glow';
  onClick?: (e: React.MouseEvent) => void;
  active?: boolean;
}

export const InteractiveIcon: React.FC<InteractiveIconProps> = ({
  icon: Icon,
  label,
  className = '',
  iconClassName = '',
  size = 'md',
  variant = 'magnetic',
  onClick,
  active = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0, rotateX: 0, rotateY: 0, rotateZ: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-11 h-11 text-base',
    xl: 'w-14 h-14 text-lg',
  }[size];

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6',
  }[size];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    if (variant === 'magnetic') {
      // Pull toward cursor by up to 6px
      setTransform({
        x: distanceX * 0.28,
        y: distanceY * 0.28,
        rotateX: -distanceY * 0.2,
        rotateY: distanceX * 0.2,
        rotateZ: 0,
      });
    } else if (variant === 'tilt') {
      setTransform({
        x: 0,
        y: 0,
        rotateX: -distanceY * 0.35,
        rotateY: distanceX * 0.35,
        rotateZ: 0,
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform({ x: 0, y: 0, rotateX: 0, rotateY: 0, rotateZ: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick(e as unknown as React.MouseEvent);
        }
      }}
      className={`group relative inline-flex items-center justify-center rounded-xl transition-all duration-300 ease-out select-none cursor-pointer ${sizeClasses} ${
        active
          ? 'bg-white text-black shadow-lg shadow-white/20'
          : 'bg-white/[0.04] text-neutral-300 hover:text-white hover:bg-white/[0.12] border border-white/10 hover:border-white/25'
      } ${className}`}
      style={{
        transform: isHovered
          ? `translate3d(${transform.x}px, ${transform.y}px, 0) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`
          : 'translate3d(0, 0, 0)',
        transformStyle: 'preserve-3d',
      }}
      title={label}
      aria-label={label}
    >
      {/* Subtle ambient back-glow ring on hover */}
      <span
        aria-hidden="true"
        className={`absolute inset-0 rounded-xl bg-gradient-to-tr from-white/10 to-transparent opacity-0 transition-opacity duration-300 pointer-events-none ${
          isHovered ? 'opacity-100' : ''
        }`}
      />

      {/* The Actual Icon with optional spin / tilt effect */}
      <div
        className={`relative z-10 transition-transform duration-200 ${
          variant === 'spin' && isHovered ? 'rotate-90' : ''
        }`}
      >
        <Icon className={`${iconSizes} ${iconClassName}`} />
      </div>
    </div>
  );
};
