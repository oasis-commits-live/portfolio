import React, { useRef, useState } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  strength?: number;
  href?: string;
  target?: string;
  rel?: string;
  download?: string | boolean;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  'aria-label'?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  onClick,
  strength = 0.2,
  href,
  target,
  rel,
  download,
  type = 'button',
  disabled = false,
  'aria-label': ariaLabel,
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current || disabled) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) * strength;
    const distanceY = (e.clientY - centerY) * strength;
    setPosition({ x: distanceX, y: distanceY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  const isFullWidth = className.includes('w-full') || className.includes('flex-1');
  const outerDisplayClass = isFullWidth ? 'flex' : 'inline-flex';

  const content = (
    <div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`${outerDisplayClass} items-center justify-center w-full h-full transition-transform duration-200 ease-out`}
      style={{
        transform: isHovered ? `translate3d(${position.x}px, ${position.y}px, 0)` : 'translate3d(0, 0, 0)',
      }}
    >
      {children}
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        download={download}
        onClick={onClick}
        aria-label={ariaLabel}
        className={`${outerDisplayClass} items-center justify-center no-underline ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      className={`${outerDisplayClass} items-center justify-center cursor-pointer bg-transparent border-none p-0 focus:outline-none ${className}`}
    >
      {content}
    </button>
  );
};
