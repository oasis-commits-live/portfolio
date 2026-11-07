import React, { useState, useEffect } from 'react';

interface ActionPillsProps {
  onOpenVideoSwitcher: () => void;
}

export const ActionPills: React.FC<ActionPillsProps> = ({ onOpenVideoSwitcher }) => {
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    const email = 'ayush.dubeypd@gmail.com';
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = email;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      id="hero-action-pills-container"
      className="flex flex-wrap gap-y-1 relative"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
      }}
    >
      <button
        id="action-pill-work"
        type="button"
        onClick={() => scrollTo('work')}
        className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap cursor-pointer hover:bg-black hover:text-white transition-colors duration-200"
      >
        View Selected Work
      </button>

      <button
        id="action-pill-process"
        type="button"
        onClick={() => scrollTo('process')}
        className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap cursor-pointer hover:bg-black hover:text-white transition-colors duration-200"
      >
        Design Process
      </button>

      <button
        id="action-pill-about"
        type="button"
        onClick={() => scrollTo('about')}
        className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap cursor-pointer hover:bg-black hover:text-white transition-colors duration-200"
      >
        Philosophy & Craft
      </button>

      {/* Video drop/replace button */}
      <button
        id="action-pill-video"
        type="button"
        onClick={onOpenVideoSwitcher}
        title="Drop or replace background video"
        className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap cursor-pointer hover:bg-black hover:text-white transition-colors duration-200 gap-1.5"
      >
        <span>🎬</span>
        <span>Replace Avatar Video</span>
      </button>

      {/* Outline pill button with copy icon */}
      <div className="relative inline-flex items-center">
        <button
          id="action-pill-contact"
          type="button"
          onClick={handleCopyEmail}
          aria-label="Copy ayush.dubeypd@gmail.com email to clipboard"
          className="inline-flex items-center justify-center text-white bg-transparent border border-white rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap gap-2 sm:gap-3 cursor-pointer hover:bg-white hover:text-black transition-colors duration-200 group"
        >
          <span>
            Reach me:{' '}
            <span className="underline underline-offset-1">
              ayush.dubeypd@gmail.com
            </span>
          </span>

          {/* 12x12 copy icon or checkmark feedback */}
          {copied ? (
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0 text-emerald-400 group-hover:text-emerald-700 transition-colors"
              aria-hidden="true"
            >
              <path
                d="M2.5 6.5L4.5 8.5L9.5 3.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0"
              aria-hidden="true"
            >
              <rect
                x="3.5"
                y="1.5"
                width="7"
                height="7"
                rx="1"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <path
                d="M1.5 3.5V9.5C1.5 10.0523 1.94772 10.5 2.5 10.5H8.5"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>

        {/* Visual feedback toast */}
        {copied && (
          <span
            id="copy-status-indicator"
            role="status"
            aria-live="polite"
            className="absolute -top-7 left-1/2 -translate-x-1/2 bg-white text-black text-[11px] font-medium px-2 py-0.5 rounded shadow-md pointer-events-none select-none transition-all"
          >
            Copied!
          </span>
        )}
      </div>
    </div>
  );
};
