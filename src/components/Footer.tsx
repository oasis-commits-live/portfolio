import React, { useState, useEffect } from 'react';
import { ScrollReveal } from './ui/ScrollReveal.tsx';
import { RESUME_PDF_URL } from '../data/portfolioData.ts';

export const Footer: React.FC = () => {
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format to Indian Standard Time (IST)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setTimeString(new Intl.DateTimeFormat('en-US', options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 w-full px-5 sm:px-8 md:px-12 py-10 border-t border-white/10 bg-black text-neutral-400 text-xs font-mono">
      <ScrollReveal variant="fade-up" distance={16} duration={0.6}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-center sm:text-left">
            <span className="text-white font-medium">Ayush Dubey®</span>
            <span className="text-neutral-600">•</span>
            <span>Bangalore, India</span>
            <span className="text-neutral-600">•</span>
            <span>
              IST: <strong className="text-emerald-400 font-normal tabular-nums">{timeString || 'Active'}</strong>
            </span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href={RESUME_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Resume
            </a>
            <span className="text-neutral-600">•</span>
            <a
              href="https://www.linkedin.com/in/ayush-dubey-8827481a9/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <span className="text-neutral-600">•</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1.5"
              aria-label="Scroll to top of page"
            >
              <span>Back to top</span>
              <span>↑</span>
            </button>
          </div>
        </div>
      </ScrollReveal>
    </footer>
  );
};
