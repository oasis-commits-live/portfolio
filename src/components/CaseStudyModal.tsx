import React, { useEffect, useState, useRef } from 'react';
import { CaseStudy, CaseStudyBlock } from '../types.ts';
import { CASE_STUDIES } from '../data/portfolioData.ts';
import { ArrowLeft, ArrowRight, ArrowUpRight, ZoomIn, X, ChevronRight } from 'lucide-react';

interface CaseStudyModalProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
  onSelectCaseStudy?: (study: CaseStudy) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  caseStudy,
  onClose,
  onSelectCaseStudy,
}) => {
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt?: string } | null>(null);
  const [activeSectionId, setActiveSectionId] = useState<string>('');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLightboxImage(null);
    if (caseStudy && caseStudy.sections.length > 0) {
      setActiveSectionId(caseStudy.sections[0].id);
    }
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxImage) {
          setLightboxImage(null);
        } else {
          onClose();
        }
      }
    };
    if (caseStudy) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [caseStudy, onClose, lightboxImage]);

  if (!caseStudy) return null;

  const currentIndex = CASE_STUDIES.findIndex((s) => s.id === caseStudy.id);
  const nextStudy = CASE_STUDIES[(currentIndex + 1) % CASE_STUDIES.length];

  const scrollToSection = (sectionId: string) => {
    setActiveSectionId(sectionId);
    const el = document.getElementById(`cs-section-${sectionId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getCleanLinkLabel = (study: CaseStudy) => {
    if (study.externalLabel) return study.externalLabel;
    const rawUrl = study.prototypeUrl || study.externalUrl || '';
    try {
      const parsed = new URL(rawUrl);
      return parsed.hostname.replace(/^www\./, '');
    } catch {
      return 'Live Project';
    }
  };

  const renderBlock = (block: CaseStudyBlock, idx: number) => {
    switch (block.type) {
      case 'paragraph':
        return (
          <p
            key={idx}
            className="text-base sm:text-[17px] text-neutral-300 leading-[1.75] mb-6 font-normal"
          >
            {block.text}
          </p>
        );

      case 'heading': {
        if (block.level === 'h4') {
          return (
            <h4
              key={idx}
              className="text-xl sm:text-2xl font-medium text-white tracking-tight mt-10 mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {block.text}
            </h4>
          );
        }
        if (block.level === 'h5') {
          return (
            <h5
              key={idx}
              className="text-lg sm:text-xl font-medium text-white tracking-tight mt-9 mb-3"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {block.text}
            </h5>
          );
        }
        return (
          <h6
            key={idx}
            className="text-sm sm:text-base font-semibold text-neutral-200 uppercase tracking-wider font-mono mt-6 mb-3"
          >
            {block.text}
          </h6>
        );
      }

      case 'callout':
        return (
          <div
            key={idx}
            className="my-7 p-6 sm:p-7 rounded-2xl border border-white/15 bg-white/[0.03]"
          >
            {block.title && (
              <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3 font-semibold">
                {block.title}
              </div>
            )}
            <ul className="space-y-2.5">
              {block.items.map((item, i) => (
                <li
                  key={i}
                  className="text-sm sm:text-base text-white font-medium flex items-start gap-3 leading-relaxed"
                >
                  <span className="text-neutral-400 font-mono select-none">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        );

      case 'list': {
        const ListTag = block.ordered ? 'ol' : 'ul';
        return (
          <ListTag
            key={idx}
            className="space-y-5 my-6"
          >
            {block.items.map((item, itemIdx) => (
              <li key={itemIdx} className="text-base text-neutral-300 leading-relaxed">
                <div className="flex items-start gap-3.5">
                  <span className="shrink-0 font-mono text-xs text-neutral-400 pt-1.5 select-none tabular-nums">
                    {block.ordered ? `${String(itemIdx + 1).padStart(2, '0')}.` : '•'}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-neutral-200 leading-[1.7]">{item.text}</p>

                    {/* Nested Sub-Items */}
                    {item.subItems && item.subItems.length > 0 && (
                      <ul className="mt-2.5 space-y-1.5 pl-4 border-l border-white/10">
                        {item.subItems.map((sub, sIdx) => (
                          <li
                            key={sIdx}
                            className="text-sm sm:text-[15px] text-neutral-400 leading-relaxed flex items-start gap-2.5"
                          >
                            <span className="text-neutral-500 font-mono select-none">-</span>
                            <span>{sub}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Inline Images attached to this specific list item (exact original portfolio structure) */}
                    {item.images && item.images.length > 0 && (
                      <div className="mt-4 space-y-4">
                        {item.images.map((imgObj, imgIdx) => (
                          <figure
                            key={imgIdx}
                            style={imgObj.maxWidth ? { maxWidth: imgObj.maxWidth } : undefined}
                            className="group/img relative rounded-xl overflow-hidden border border-white/10 bg-neutral-900/80 cursor-zoom-in"
                            onClick={() =>
                              setLightboxImage({ src: imgObj.src, alt: imgObj.caption || item.text })
                            }
                          >
                            <img
                              src={imgObj.src}
                              alt={imgObj.caption || `${caseStudy.title} detail`}
                              className="w-full h-auto block"
                              loading="lazy"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-black/70 text-white/80 opacity-0 group-hover/img:opacity-100 transition-opacity pointer-events-none">
                              <ZoomIn className="w-3.5 h-3.5" />
                            </div>
                            {imgObj.caption && (
                              <figcaption className="px-3.5 py-2 text-xs font-mono text-neutral-400 border-t border-white/10 bg-black/40">
                                {imgObj.caption}
                              </figcaption>
                            )}
                          </figure>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ListTag>
        );
      }

      case 'image': {
        const isSmallLogo = block.maxWidth && parseInt(block.maxWidth, 10) <= 300;
        return (
          <figure
            key={idx}
            style={block.maxWidth ? { maxWidth: block.maxWidth } : undefined}
            className={`my-7 ${
              isSmallLogo
                ? 'inline-block rounded-xl overflow-hidden bg-transparent'
                : 'group/img relative w-full rounded-2xl overflow-hidden border border-white/15 bg-neutral-900/90 shadow-xl cursor-zoom-in'
            }`}
            onClick={() => {
              if (!isSmallLogo) {
                setLightboxImage({ src: block.src, alt: block.alt || caseStudy.title });
              }
            }}
          >
            <img
              src={block.src}
              alt={block.alt || caseStudy.title}
              className="w-full h-auto block"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            {!isSmallLogo && (
              <div className="absolute top-3 right-3 px-2.5 py-1.5 rounded-lg bg-black/75 backdrop-blur-md text-xs font-mono text-white/90 border border-white/15 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center gap-1.5 pointer-events-none">
                <ZoomIn className="w-3.5 h-3.5" />
                <span>Expand</span>
              </div>
            )}
            {block.caption && (
              <figcaption className="px-4 py-2.5 text-xs font-mono text-neutral-400 border-t border-white/10 bg-neutral-950">
                {block.caption}
              </figcaption>
            )}
          </figure>
        );
      }

      case 'image-grid': {
        const gridCols =
          block.columns === 3
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            : 'grid-cols-1 sm:grid-cols-2';
        return (
          <div key={idx} className={`grid ${gridCols} gap-4 sm:gap-5 my-8`}>
            {block.images.map((img, i) => (
              <figure
                key={i}
                onClick={() => setLightboxImage({ src: img.src, alt: img.alt || caseStudy.title })}
                className="group/img relative rounded-2xl overflow-hidden border border-white/15 bg-neutral-900/90 flex flex-col justify-between cursor-zoom-in hover:border-white/35 transition-colors"
              >
                <div className="w-full h-full flex items-center justify-center bg-neutral-950 p-1">
                  <img
                    src={img.src}
                    alt={img.alt || `${caseStudy.title} visual ${i + 1}`}
                    className="w-full h-auto object-contain rounded-xl"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/75 text-white/90 opacity-0 group-hover/img:opacity-100 transition-opacity pointer-events-none">
                  <ZoomIn className="w-3.5 h-3.5" />
                </div>
                {img.caption && (
                  <figcaption className="px-3.5 py-2 text-xs font-mono text-neutral-400 border-t border-white/10 bg-neutral-950">
                    {img.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div
      id="case-study-modal-backdrop"
      ref={scrollContainerRef}
      className="fixed inset-0 z-50 overflow-y-auto bg-[#050505] text-white animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
    >
      {/* Sticky Top Header Bar (Uniform h-9 / 36px CTA heights) */}
      <div className="sticky top-0 z-30 w-full bg-[#050505]/90 backdrop-blur-xl border-b border-white/10 px-5 sm:px-8 md:px-12 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center gap-2 h-9 px-3.5 rounded-lg bg-white/[0.06] hover:bg-white hover:text-black border border-white/10 text-xs font-medium text-neutral-200 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Projects</span>
          </button>

          {/* Unboxed Metadata in Top Bar */}
          <div className="hidden md:flex items-center gap-2.5 text-xs font-mono text-neutral-400">
            <span className="text-white">{caseStudy.year}</span>
            <span aria-hidden="true">·</span>
            <span>{caseStudy.projectType}</span>
            <span aria-hidden="true">·</span>
            <span className="text-neutral-200">{caseStudy.client}</span>
          </div>

          <div className="flex items-center gap-2.5">
            {(caseStudy.prototypeUrl || caseStudy.externalUrl) && (
              <a
                href={caseStudy.prototypeUrl || caseStudy.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 h-9 px-3.5 rounded-lg bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-colors whitespace-nowrap"
              >
                <span>
                  {caseStudy.prototypeUrl ? 'Live Prototype' : 'Live Product'}
                </span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              type="button"
              onClick={onClose}
              aria-label="Close case study"
              className="w-9 h-9 rounded-lg bg-white/[0.06] hover:bg-white/15 border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white transition-colors cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Case Study Document Container */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8 md:px-12 pt-10 sm:pt-16 pb-24">
        {/* Top Metadata Row (Matches Original Portfolio: Year | B2B/B2C | Client | Link) */}
        <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-xs sm:text-sm font-mono text-neutral-400 pb-6 mb-6 border-b border-white/10">
          <div>
            <span className="text-neutral-500 block text-[11px] uppercase mb-0.5">Year</span>
            <span className="text-white font-medium tabular-nums">{caseStudy.year}</span>
          </div>
          <span className="text-white/15 hidden sm:inline">|</span>
          <div>
            <span className="text-neutral-500 block text-[11px] uppercase mb-0.5">Category</span>
            <span className="text-white font-medium">{caseStudy.projectType}</span>
          </div>
          <span className="text-white/15 hidden sm:inline">|</span>
          <div>
            <span className="text-neutral-500 block text-[11px] uppercase mb-0.5">Client / Org</span>
            <span className="text-white font-medium">{caseStudy.client}</span>
          </div>
          {(caseStudy.prototypeUrl || caseStudy.externalUrl) && (
            <>
              <span className="text-white/15 hidden sm:inline">|</span>
              <div>
                <span className="text-neutral-500 block text-[11px] uppercase mb-0.5">Project Link</span>
                <a
                  href={caseStudy.prototypeUrl || caseStudy.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 hover:text-sky-300 underline underline-offset-4 inline-flex items-center gap-1 font-medium"
                >
                  <span>{getCleanLinkLabel(caseStudy)}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                </a>
              </div>
            </>
          )}
        </div>

        {/* Case Study Main Headline */}
        <h1
          id="case-study-title"
          className="text-3xl sm:text-5xl lg:text-[52px] font-medium tracking-tight text-white mb-8 sm:mb-10 leading-[1.1]"
          style={{ fontFamily: 'var(--font-heading)', textWrap: 'balance' }}
        >
          {caseStudy.title}
        </h1>

        {/* Hero Cover Banner (Full-Width Vertical Flow, Clickable to Zoom) */}
        <figure
          onClick={() => setLightboxImage({ src: caseStudy.heroImage, alt: caseStudy.title })}
          className="group relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-neutral-900 mb-14 sm:mb-20 shadow-2xl cursor-zoom-in"
        >
          <img
            src={caseStudy.heroImage}
            alt={caseStudy.title}
            className="w-full h-auto block"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-black/75 backdrop-blur-md text-xs font-mono text-white border border-white/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 pointer-events-none">
            <ZoomIn className="w-3.5 h-3.5" />
            <span>Click to inspect full resolution</span>
          </div>
        </figure>

        {/* Two-Column Layout: Sticky Section Outline + Full Vertical Narrative & Inline Images */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Sticky Chapter Navigation on Desktop */}
          <aside className="lg:col-span-3 lg:sticky lg:top-24 space-y-6">
            <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 mb-3.5">
                Case Study Structure
              </div>
              <nav className="space-y-1.5" aria-label="Case study sections">
                {caseStudy.sections.map((sec, sIdx) => {
                  const isCurrent = activeSectionId === sec.id;
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => scrollToSection(sec.id)}
                      className={`w-full text-left h-9 px-3 rounded-lg text-xs font-mono transition-colors flex items-center justify-between cursor-pointer ${
                        isCurrent
                          ? 'bg-white text-black font-semibold'
                          : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                      }`}
                    >
                      <span className="truncate">
                        {String(sIdx + 1).padStart(2, '0')}. {sec.title}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Quick Impact Summary Box */}
            <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] space-y-3">
              <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-500">
                Key Outcomes
              </div>
              {caseStudy.impactMetrics.map((m) => (
                <div key={m.label} className="pt-2 border-t border-white/10 first:border-t-0 first:pt-0">
                  <div className="text-lg font-mono font-bold text-white tabular-nums">
                    {m.value}
                  </div>
                  <div className="text-xs text-neutral-400">{m.label}</div>
                </div>
              ))}
            </div>
          </aside>

          {/* Right Main Narrative Column (Exact Original Portfolio Sections & Vertical Inline Images) */}
          <div className="lg:col-span-9 space-y-16 sm:space-y-20">
            {caseStudy.sections.map((section, secIdx) => (
              <section
                key={section.id}
                id={`cs-section-${section.id}`}
                onMouseEnter={() => setActiveSectionId(section.id)}
                className="scroll-mt-24 pb-12 sm:pb-16 border-b border-white/10 last:border-b-0"
              >
                {/* Section Header */}
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-xs font-mono text-neutral-500 tabular-nums">
                    0{secIdx + 1}.
                  </span>
                  <h3
                    className="text-2xl sm:text-3xl font-medium text-white tracking-tight"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {section.title}
                  </h3>
                </div>

                {/* Section Content Blocks */}
                <div>
                  {section.blocks.map((block, bIdx) => renderBlock(block, bIdx))}
                </div>
              </section>
            ))}
          </div>
        </div>

        {/* Footer Navigation: Back + Next Project (Matching h-12 / 48px Button Dimensions) */}
        <div className="mt-16 pt-10 border-t border-white/15 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center gap-2.5 h-12 px-6 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <span>Back to All Projects</span>
          </button>

          {nextStudy && onSelectCaseStudy && (
            <button
              type="button"
              onClick={() => onSelectCaseStudy(nextStudy)}
              className="group inline-flex items-center justify-between sm:justify-center gap-3 h-12 px-6 rounded-xl bg-white text-black hover:bg-neutral-200 transition-colors cursor-pointer text-sm font-semibold"
            >
              <span className="text-neutral-500 font-mono text-xs uppercase tracking-wider shrink-0">
                Next:
              </span>
              <span className="truncate max-w-[240px] sm:max-w-[320px]">{nextStudy.title}</span>
              <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}
        </div>
      </div>

      {/* Fullscreen Lightbox Overlay when clicking any inline image */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8 cursor-zoom-out"
          onClick={() => setLightboxImage(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxImage(null)}
            aria-label="Close full image preview"
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <img
            src={lightboxImage.src}
            alt={lightboxImage.alt || ''}
            className="max-w-full max-h-[88vh] object-contain rounded-xl border border-white/15 shadow-2xl"
            referrerPolicy="no-referrer"
          />
          {lightboxImage.alt && (
            <div className="mt-3 text-xs font-mono text-neutral-400 text-center max-w-xl">
              {lightboxImage.alt}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
