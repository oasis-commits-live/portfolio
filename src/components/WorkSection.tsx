import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CASE_STUDIES } from '../data/portfolioData.ts';
import { CaseStudy } from '../types.ts';
import { MagneticButton } from './ui/MagneticButton.tsx';
import { ArrowUpRight, LayoutGrid, ListFilter, Layers, Gamepad2, Eye, ArrowRight } from 'lucide-react';
import { ScrollReveal } from './ui/ScrollReveal.tsx';

interface WorkSectionProps {
  onSelectCaseStudy: (study: CaseStudy) => void;
}

const CATEGORIES = ['All Projects', 'AI & Workflows', '0→1 Product', 'Design Systems', 'Fintech'] as const;

export const WorkSection: React.FC<WorkSectionProps> = ({ onSelectCaseStudy }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Projects');
  const [viewMode, setViewMode] = useState<'editorial' | 'index'>('editorial');
  const [hoveredStudyId, setHoveredStudyId] = useState<string>(CASE_STUDIES[0].id);
  const [previewFrameIdx, setPreviewFrameIdx] = useState<Record<string, number>>({});

  const filteredStudies =
    selectedCategory === 'All Projects'
      ? CASE_STUDIES
      : CASE_STUDIES.filter((item) => item.category === selectedCategory);

  const activeIndexStudy =
    filteredStudies.find((s) => s.id === hoveredStudyId) || filteredStudies[0] || CASE_STUDIES[0];

  const getActivePreviewImage = (study: CaseStudy) => {
    const idx = previewFrameIdx[study.id] ?? 0;
    const frames = [study.heroImage, ...study.galleryImages.filter((img) => !img.endsWith('.svg'))].slice(0, 4);
    return frames[idx] || study.heroImage;
  };

  const getPreviewFrames = (study: CaseStudy) => {
    return [study.heroImage, ...study.galleryImages.filter((img) => !img.endsWith('.svg'))].slice(0, 4);
  };

  return (
    <section
      id="work"
      className="relative z-10 w-full px-5 sm:px-8 md:px-12 py-24 sm:py-32 border-t border-white/10 bg-[#050505]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Editorial Section Header */}
        <ScrollReveal variant="fade-up">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 sm:pb-14 border-b border-white/10">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2.5 text-xs uppercase tracking-widest text-neutral-400 mb-4 font-mono">
                <span className="text-white font-semibold tabular-nums">01</span>
                <span aria-hidden="true">·</span>
                <span>Featured Projects</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">2023 — 2026</span>
              </div>
              <h2
                className="text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.06]"
                style={{ fontFamily: 'var(--font-heading)', textWrap: 'balance' }}
              >
                Selected Works &amp; Case Studies.
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-end lg:items-end justify-between gap-5">
              <p className="text-sm sm:text-base text-neutral-400 max-w-md leading-relaxed lg:text-right">
                Some of my successful live projects across enterprise FinTech AI copilots, 0-to-1 tools, character systems, and retro gaming workflows.
              </p>

              {/* View Mode Switcher (Editorial Gallery vs Interactive Index Stage) */}
              <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/10">
                <button
                  type="button"
                  onClick={() => setViewMode('editorial')}
                  className={`inline-flex items-center justify-center gap-2 h-9 px-3.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                    viewMode === 'editorial'
                      ? 'bg-white text-black shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>Editorial Spread</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('index')}
                  className={`inline-flex items-center justify-center gap-2 h-9 px-3.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                    viewMode === 'index'
                      ? 'bg-white text-black shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <ListFilter className="w-3.5 h-3.5" />
                  <span>Interactive Index</span>
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Clean Segmented Filter Bar */}
        <ScrollReveal variant="fade-up" delay={0.05}>
          <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-b border-white/10 mb-12 sm:mb-16">
            <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Filter projects by category">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                const count =
                  cat === 'All Projects'
                    ? CASE_STUDIES.length
                    : CASE_STUDIES.filter((c) => c.category === cat).length;
                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setSelectedCategory(cat)}
                    className={`h-9 px-3.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer whitespace-nowrap inline-flex items-center justify-center gap-2 ${
                      isActive
                        ? 'bg-white text-black'
                        : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`font-mono text-[11px] tabular-nums ${
                        isActive ? 'text-neutral-700' : 'text-neutral-500'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="text-xs font-mono text-neutral-400 tabular-nums hidden sm:block">
              Showing {filteredStudies.length} of {CASE_STUDIES.length} Case Studies
            </div>
          </div>
        </ScrollReveal>

        {/* MODE 1: CURATED ASYMMETRIC EDITORIAL SPREAD */}
        {viewMode === 'editorial' ? (
          <div className="space-y-16 sm:space-y-24">
            {filteredStudies.map((study, index) => {
              const frames = getPreviewFrames(study);
              const activeFrameIndex = previewFrameIdx[study.id] ?? 0;
              const currentImage = getActivePreviewImage(study);
              const isEven = index % 2 === 1;
              const displayIndex = String(CASE_STUDIES.findIndex((s) => s.id === study.id) + 1).padStart(2, '0');

              return (
                <ScrollReveal key={study.id} variant="fade-up" delay={0.04}>
                  <article
                    onClick={() => onSelectCaseStudy(study)}
                    className="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch pb-16 sm:pb-24 border-b border-white/10 last:border-b-0 last:pb-0 cursor-pointer"
                  >
                    {/* Visual Media Stage (Alternates Left/Right on Desktop for Editorial Rhythm) */}
                    <div
                      className={`lg:col-span-7 flex flex-col justify-between ${
                        isEven ? 'lg:order-2' : 'lg:order-1'
                      }`}
                    >
                      <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 group-hover:border-white/25 transition-colors duration-300">
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={currentImage}
                            src={currentImage}
                            alt={study.title}
                            initial={{ opacity: 0.4, scale: 1.02 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0.4 }}
                            transition={{ duration: 0.25 }}
                            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                          />
                        </AnimatePresence>

                        {/* Subtle bottom gradient scrim for frame switcher legibility */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity pointer-events-none" />

                        {/* Interactive Screen Switcher Bar inside the Media Stage */}
                        <div
                          className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 z-10"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="inline-flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-white/10">
                            <Layers className="w-3.5 h-3.5 text-neutral-400 mr-0.5 shrink-0" />
                            {frames.map((frameUrl, fIdx) => {
                              const isSelected = activeFrameIndex === fIdx;
                              return (
                                <button
                                  key={frameUrl + fIdx}
                                  type="button"
                                  onMouseEnter={() =>
                                    setPreviewFrameIdx((prev) => ({ ...prev, [study.id]: fIdx }))
                                  }
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setPreviewFrameIdx((prev) => ({ ...prev, [study.id]: fIdx }));
                                  }}
                                  aria-label={`Preview screen ${fIdx + 1}`}
                                  className={`relative w-8 sm:w-9 h-6 rounded overflow-hidden border transition-all cursor-pointer shrink-0 ${
                                    isSelected
                                      ? 'border-white scale-105 opacity-100'
                                      : 'border-white/20 opacity-50 hover:opacity-90'
                                  }`}
                                >
                                  <img
                                    src={frameUrl}
                                    alt=""
                                    className="w-full h-full object-cover"
                                    referrerPolicy="no-referrer"
                                  />
                                </button>
                              );
                            })}
                            <span className="text-[11px] font-mono text-neutral-300 pl-1 pr-0.5 tabular-nums whitespace-nowrap">
                              +{study.galleryImages.length} screens
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => onSelectCaseStudy(study)}
                            className="hidden sm:inline-flex items-center justify-center gap-1.5 h-8 px-3.5 rounded-xl bg-white text-black text-xs font-semibold tracking-tight opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 shadow-lg whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View Case Study</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Editorial Narrative Column */}
                    <div
                      className={`lg:col-span-5 flex flex-col justify-between ${
                        isEven ? 'lg:order-1' : 'lg:order-2'
                      }`}
                    >
                      <div>
                        {/* Editorial Index Number + Unboxed Metadata */}
                        <div className="flex items-baseline justify-between gap-4 pb-5 mb-6 border-b border-white/10">
                          <span
                            className="text-3xl sm:text-4xl font-light font-mono text-neutral-500 group-hover:text-white transition-colors tabular-nums"
                            style={{ fontFamily: 'var(--font-heading)' }}
                          >
                            {displayIndex}
                          </span>

                          <div className="flex flex-wrap items-center justify-end gap-2 text-xs font-mono text-neutral-400">
                            <span className="text-white font-medium">{study.client}</span>
                            <span aria-hidden="true">·</span>
                            <span>{study.projectType}</span>
                            <span aria-hidden="true">·</span>
                            <span className="tabular-nums text-neutral-300">{study.year}</span>
                          </div>
                        </div>

                        {/* Authentic Original Portfolio Title */}
                        <h3
                          className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-white mb-4 leading-[1.15] group-hover:text-neutral-200 transition-colors"
                          style={{ fontFamily: 'var(--font-heading)', textWrap: 'balance' }}
                        >
                          {study.title}
                        </h3>

                        {/* Concise Narrative Summary */}
                        <p className="text-sm sm:text-base text-neutral-300 leading-relaxed mb-8">
                          {study.description}
                        </p>

                        {/* Quantitative Impact Strip (Tabular Numerals, Unboxed Clean Dividers) */}
                        <div className="grid grid-cols-3 gap-4 py-4 border-y border-white/10 mb-8">
                          {study.impactMetrics.map((metric) => (
                            <div key={metric.label}>
                              <div className="text-base sm:text-xl font-semibold text-white font-mono tabular-nums tracking-tight">
                                {metric.value}
                              </div>
                              <div className="text-[11px] text-neutral-400 mt-0.5 leading-snug">
                                {metric.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Action Controls (Uniform 44px / h-11 Dimensions & Clean Format) */}
                      <div
                        className="flex flex-wrap sm:flex-nowrap items-center gap-3 pt-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MagneticButton
                          onClick={() => onSelectCaseStudy(study)}
                          className="w-full sm:w-auto sm:flex-1"
                        >
                          <div className="w-full h-11 px-5 rounded-xl bg-white text-black font-semibold text-xs sm:text-sm hover:bg-neutral-200 transition-colors inline-flex items-center justify-between gap-3 whitespace-nowrap">
                            <span>Read Case Study</span>
                            <ArrowRight className="w-4 h-4 shrink-0" />
                          </div>
                        </MagneticButton>

                        {study.prototypeUrl && (
                          <MagneticButton
                            href={study.prototypeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Launch Live Prototype"
                            className="w-full sm:w-auto"
                          >
                            <div className="w-full sm:w-auto h-11 px-4 sm:px-5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/15 text-xs sm:text-sm font-medium transition-colors inline-flex items-center justify-center gap-2 whitespace-nowrap">
                              <Gamepad2 className="w-4 h-4 shrink-0" />
                              <span>Live Prototype</span>
                              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                            </div>
                          </MagneticButton>
                        )}

                        {study.externalUrl && !study.prototypeUrl && (
                          <MagneticButton
                            href={study.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Visit Live Product"
                            className="w-full sm:w-auto"
                          >
                            <div className="w-full sm:w-auto h-11 px-4 sm:px-5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/15 text-xs sm:text-sm font-medium transition-colors inline-flex items-center justify-center gap-2 whitespace-nowrap">
                              <span>Live Product</span>
                              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                            </div>
                          </MagneticButton>
                        )}
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        ) : (
          /* MODE 2: INTERACTIVE ARCHIVE INDEX + STICKY STAGE */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Interactive Project Rows */}
            <div className="lg:col-span-6 divide-y divide-white/10 border-y border-white/10">
              {filteredStudies.map((study, idx) => {
                const isActive = activeIndexStudy.id === study.id;
                const displayIdx = String(idx + 1).padStart(2, '0');
                return (
                  <div
                    key={study.id}
                    onMouseEnter={() => setHoveredStudyId(study.id)}
                    onClick={() => onSelectCaseStudy(study)}
                    className={`group py-6 px-4 -mx-4 rounded-2xl transition-all duration-200 cursor-pointer ${
                      isActive ? 'bg-white/[0.05]' : 'hover:bg-white/[0.03]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <span className="text-xs font-mono text-neutral-500 pt-1.5 tabular-nums">
                          {displayIdx}
                        </span>
                        <div>
                          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-1.5">
                            <span className="text-white">{study.client}</span>
                            <span aria-hidden="true">·</span>
                            <span>{study.projectType}</span>
                            <span aria-hidden="true">·</span>
                            <span className="tabular-nums">{study.year}</span>
                          </div>
                          <h3
                            className={`text-lg sm:text-xl font-medium tracking-tight transition-colors ${
                              isActive ? 'text-white' : 'text-neutral-300 group-hover:text-white'
                            }`}
                            style={{ fontFamily: 'var(--font-heading)' }}
                          >
                            {study.title}
                          </h3>
                        </div>
                      </div>

                      <span
                        className={`shrink-0 w-9 h-9 rounded-xl border flex items-center justify-center transition-all ${
                          isActive
                            ? 'bg-white text-black border-white translate-x-0.5 -translate-y-0.5'
                            : 'border-white/15 text-neutral-400 group-hover:text-white'
                        }`}
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Sticky Live Preview Stage */}
            <div className="lg:col-span-6 lg:sticky lg:top-28">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndexStudy.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.22 }}
                  onClick={() => onSelectCaseStudy(activeIndexStudy)}
                  className="rounded-2xl border border-white/15 bg-neutral-900/60 overflow-hidden cursor-pointer group"
                >
                  <div className="relative aspect-[16/10] w-full bg-neutral-950 overflow-hidden border-b border-white/10">
                    <img
                      src={activeIndexStudy.heroImage}
                      alt={activeIndexStudy.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-6 sm:p-8">
                    <div className="flex items-center justify-between gap-2 text-xs font-mono text-neutral-400 mb-3">
                      <span>
                        {activeIndexStudy.client} · {activeIndexStudy.role}
                      </span>
                      <span className="tabular-nums">
                        {activeIndexStudy.galleryImages.length + 1} Screens in Case Study
                      </span>
                    </div>
                    <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                      {activeIndexStudy.description}
                    </p>
                    <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 mb-6">
                      {activeIndexStudy.impactMetrics.map((m) => (
                        <div key={m.label}>
                          <div className="text-base font-mono font-bold text-white tabular-nums">
                            {m.value}
                          </div>
                          <div className="text-[11px] text-neutral-400">{m.label}</div>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => onSelectCaseStudy(activeIndexStudy)}
                      className="w-full h-11 px-5 rounded-xl bg-white text-black font-semibold text-xs sm:text-sm hover:bg-neutral-200 transition-colors inline-flex items-center justify-between cursor-pointer"
                    >
                      <span>Read Case Study</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
