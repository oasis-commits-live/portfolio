import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RESUME_PDF_URL } from '../data/portfolioData.ts';
import { ArrowUpRight, X, FileText, Film, MapPin, Mail } from 'lucide-react';

interface NavbarProps {
  onOpenVideoSwitcher: () => void;
}

const MOBILE_NAV_ITEMS = [
  { index: '01', label: 'Selected Work', sublabel: 'Case Studies & Prototypes', href: '#work' },
  { index: '02', label: 'Craft & Philosophy', sublabel: 'Ethos, Stack & Competencies', href: '#about' },
  { index: '03', label: 'Design Process', sublabel: 'Discovery to Deployment', href: '#process' },
  { index: '04', label: 'Experience', sublabel: 'Career Track Record & Education', href: '#experience' },
  { index: '05', label: 'Get in Touch', sublabel: 'Advisory, Sprints & Direct Chat', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenVideoSwitcher }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      setPastHero(window.scrollY > window.innerHeight * 0.72);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll and listen for Escape key when mobile drawer is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-40 px-5 sm:px-8 md:px-12 py-4 flex justify-between items-center transition-all duration-300 select-none ${
          scrolled
            ? 'bg-black/85 backdrop-blur-xl border-b border-white/10 shadow-lg'
            : 'bg-transparent'
        }`}
      >
        {/* Top-Left Compact Brand Mark (Visible on mobile or once scrolled past Hero on desktop) */}
        <div className="flex items-center min-w-[140px]">
          <a
            href="#hero-section"
            onClick={closeMobileMenu}
            className={`inline-flex items-center gap-2 text-sm font-medium text-white tracking-tight transition-all duration-300 ${
              pastHero || scrolled
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-100 md:opacity-0 md:-translate-y-2 md:pointer-events-none'
            }`}
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <span>Ayush Dubey®</span>
            <span className="text-neutral-400">✳︎</span>
          </a>
        </div>

        {/* Desktop Nav Links (Center) */}
        <nav
          id="desktop-nav-links"
          className="hidden md:flex items-center text-sm text-neutral-300 font-normal"
          aria-label="Portfolio Navigation"
        >
          <a href="#work" className="px-3 py-1.5 hover:text-white transition-colors">
            Work
          </a>
          <span className="text-neutral-600 select-none">/</span>
          <a href="#about" className="px-3 py-1.5 hover:text-white transition-colors">
            About
          </a>
          <span className="text-neutral-600 select-none">/</span>
          <a href="#process" className="px-3 py-1.5 hover:text-white transition-colors">
            Process
          </a>
          <span className="text-neutral-600 select-none">/</span>
          <a href="#experience" className="px-3 py-1.5 hover:text-white transition-colors">
            Experience
          </a>
          <span className="text-neutral-600 select-none">/</span>
          <a href="#contact" className="px-3 py-1.5 hover:text-white transition-colors">
            Contact
          </a>
        </nav>

        {/* Desktop Right Resume CTA */}
        <div className="hidden md:flex items-center justify-end min-w-[140px]">
          <a
            href={RESUME_PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 h-9 px-3.5 rounded-lg bg-white/[0.08] hover:bg-white hover:text-black text-white border border-white/15 text-xs font-mono font-medium transition-all duration-200 whitespace-nowrap"
          >
            <span>Resume</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Controls (Visible below md) */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href={RESUME_PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 h-9 px-3 rounded-lg bg-white/[0.08] hover:bg-white/15 text-white border border-white/15 text-xs font-mono transition-colors"
          >
            <span>Resume</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>

          <button
            id="mobile-hamburger-button"
            type="button"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? 'Close navigation drawer' : 'Open navigation drawer'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            className="h-9 px-3 rounded-lg bg-white/[0.08] hover:bg-white/15 border border-white/15 text-white inline-flex items-center gap-2 focus:outline-none cursor-pointer transition-colors"
          >
            <span className="text-xs font-mono">Menu</span>
            <span className="flex flex-col justify-center items-center gap-[4px] w-4">
              <span
                className={`w-4 h-[1.5px] bg-white transition-all duration-300 origin-center ${
                  mobileMenuOpen ? 'rotate-45 translate-y-[5.5px]' : 'rotate-0 translate-y-0'
                }`}
              />
              <span
                className={`w-4 h-[1.5px] bg-white transition-opacity duration-300 ${
                  mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`w-4 h-[1.5px] bg-white transition-all duration-300 origin-center ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-[5.5px]' : 'rotate-0 translate-y-0'
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Hero Bottom Center Brand Title (Kept outside <header> so backdrop-blur never traps fixed positioning) */}
      <a
        href="#work"
        className={`fixed bottom-6 sm:bottom-10 md:bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center justify-center text-center group cursor-pointer transition-all duration-500 ease-out select-none ${
          pastHero
            ? 'opacity-0 translate-y-8 pointer-events-none'
            : 'opacity-100 translate-y-0 pointer-events-auto'
        }`}
        aria-label="Ayush Dubey - Senior Product Designer"
      >
        <div className="flex items-center justify-center gap-3 sm:gap-4 whitespace-nowrap">
          <span
            className="text-[36px] sm:text-[50px] md:text-[56px] tracking-tight text-white font-heading font-medium leading-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] group-hover:text-neutral-200 transition-colors"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Ayush Dubey®
          </span>
          <span
            className="text-[30px] sm:text-[42px] md:text-[48px] text-white select-none leading-none opacity-90 drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] group-hover:rotate-45 transition-transform duration-300"
            style={{ letterSpacing: '-0.02em' }}
            aria-hidden="true"
          >
            ✳︎
          </span>
        </div>
        <span className="text-[12px] sm:text-[15px] md:text-[16px] uppercase tracking-[0.24em] text-neutral-300 font-mono mt-2 sm:mt-2.5 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
          Senior Product Designer
        </span>
      </a>

      {/* Slide-In Right Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Dimmed & Blurred Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={closeMobileMenu}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Right Slide-Over Drawer Panel */}
            <motion.aside
              id="mobile-nav-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation Drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 320, mass: 0.8 }}
              className="fixed top-0 right-0 bottom-0 w-[86vw] max-w-[360px] bg-[#080808] border-l border-white/15 shadow-2xl flex flex-col justify-between overflow-y-auto z-10"
            >
              {/* Top Drawer Header */}
              <div>
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                  <div>
                    <div
                      className="text-sm font-medium text-white tracking-tight"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      Ayush Dubey®
                    </div>
                    <div className="text-[11px] font-mono text-neutral-400">
                      Senior Product Designer
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={closeMobileMenu}
                    aria-label="Close navigation drawer"
                    className="w-9 h-9 rounded-lg bg-white/[0.06] hover:bg-white/15 border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Primary Navigation Links with Staggered Reveal */}
                <nav className="px-5 py-6 divide-y divide-white/10" aria-label="Mobile Primary Navigation">
                  {MOBILE_NAV_ITEMS.map((item, idx) => (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      onClick={closeMobileMenu}
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * idx + 0.05, duration: 0.25 }}
                      className="group py-4 px-2 flex items-center justify-between gap-3 hover:bg-white/[0.03] rounded-xl transition-colors"
                    >
                      <div className="flex items-start gap-3.5 min-w-0">
                        <span className="text-xs font-mono text-neutral-500 pt-1 tabular-nums">
                          {item.index}
                        </span>
                        <div className="min-w-0">
                          <div
                            className="text-lg font-medium text-white group-hover:text-neutral-200 tracking-tight transition-colors"
                            style={{ fontFamily: 'var(--font-heading)' }}
                          >
                            {item.label}
                          </div>
                          <div className="text-xs text-neutral-400 truncate mt-0.5">
                            {item.sublabel}
                          </div>
                        </div>
                      </div>

                      <span className="w-8 h-8 rounded-lg border border-white/10 bg-white/[0.03] group-hover:bg-white group-hover:text-black flex items-center justify-center text-neutral-400 transition-all shrink-0">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </motion.a>
                  ))}
                </nav>
              </div>

              {/* Drawer Footer: Quick CTAs (Resume PDF, Direct Contact, Video Switcher & Location) */}
              <div className="p-6 border-t border-white/10 bg-black/50 space-y-3">
                <a
                  href={RESUME_PDF_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                  className="w-full h-11 px-4 rounded-xl bg-white text-black font-semibold text-xs inline-flex items-center justify-between hover:bg-neutral-200 transition-colors"
                >
                  <span className="inline-flex items-center gap-2">
                    <FileText className="w-4 h-4 shrink-0" />
                    <span>View / Download Resume (PDF)</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 shrink-0" />
                </a>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      closeMobileMenu();
                      onOpenVideoSwitcher();
                    }}
                    className="h-10 px-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs font-mono text-white inline-flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <Film className="w-3.5 h-3.5 text-neutral-300 shrink-0" />
                    <span className="truncate">Avatar Video</span>
                  </button>

                  <a
                    href="mailto:ayush.dubeypd@gmail.com"
                    onClick={closeMobileMenu}
                    className="h-10 px-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs font-mono text-white inline-flex items-center justify-center gap-2 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-neutral-300 shrink-0" />
                    <span className="truncate">Email Me</span>
                  </a>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-neutral-500" />
                    <span>Bangalore, India</span>
                  </span>
                  <span className="text-emerald-400">Available for Sprints</span>
                </div>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
