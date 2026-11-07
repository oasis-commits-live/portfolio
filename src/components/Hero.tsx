import React from 'react';

interface HeroProps {
  onOpenVideoSwitcher?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  return (
    <main
      id="hero-section"
      className="relative z-10 w-full min-h-screen flex flex-col justify-end pb-16 md:justify-center md:pb-0 px-5 sm:px-8 md:px-12 overflow-hidden pointer-events-none"
    />
  );
};

