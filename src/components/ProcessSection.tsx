import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROCESS_STEPS } from '../data/portfolioData.ts';
import { Search, Compass, Sliders, ShieldCheck, CheckCircle2, ArrowRight, FileText, Code2, Play } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ui/ScrollReveal.tsx';

export const ProcessSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const activeStep = PROCESS_STEPS[activeStepIndex];

  const phaseIcons = [Search, Compass, Sliders, ShieldCheck];

  return (
    <section
      id="process"
      className="relative z-10 w-full px-5 sm:px-8 md:px-12 py-24 sm:py-32 border-t border-white/10 bg-black/90 backdrop-blur-2xl"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header with Refined Editorial Hierarchy */}
        <ScrollReveal variant="fade-up">
          <div className="max-w-3xl mb-14 sm:mb-18">
            <div className="text-xs uppercase tracking-widest text-neutral-400 mb-3 font-semibold font-mono flex items-center gap-2">
              <span className="text-white">03</span>
              <span>·</span>
              <span>Methodology & Product Engineering</span>
            </div>
            <h2
              className="text-3xl sm:text-5xl font-medium tracking-tight text-white mb-6 leading-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              A Rigorous, De-risked Product Process.
            </h2>
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
              From ambiguity to high-impact production releases. How I discover real user friction, stress-test mental models with rapid prototyping, and align cross-functional engineering teams.
            </p>
          </div>
        </ScrollReveal>

        {/* Interactive Step Navigator with Connecting Hairline */}
        <div className="relative mb-12">
          {/* Connecting Hairline */}
          <div className="hidden sm:block absolute top-1/2 left-0 right-0 h-[1px] bg-white/15 -translate-y-1/2 z-0" />

          <StaggerContainer
            staggerDelay={0.07}
            className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
          >
            {PROCESS_STEPS.map((step, idx) => {
              const isSelected = activeStepIndex === idx;
              const Icon = phaseIcons[idx % phaseIcons.length];

              return (
                <StaggerItem key={step.number}>
                  <button
                    type="button"
                    onClick={() => setActiveStepIndex(idx)}
                    className={`w-full group relative p-5 sm:p-6 rounded-2xl sm:rounded-3xl text-left border transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? 'bg-white text-black border-white shadow-2xl scale-[1.02]'
                        : 'bg-neutral-900/80 text-neutral-400 border-white/10 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg ${
                          isSelected ? 'bg-black text-white' : 'bg-white/10 text-neutral-300'
                        }`}
                      >
                        {step.number}
                      </span>

                      <div
                        className={`p-2 rounded-xl transition-colors ${
                          isSelected ? 'bg-black/10 text-black' : 'bg-white/5 text-neutral-400 group-hover:text-white'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="text-sm sm:text-base font-medium tracking-tight mb-1">
                      {step.phase}
                    </div>

                    <div
                      className={`text-[11px] font-mono ${
                        isSelected ? 'text-neutral-700' : 'text-neutral-500'
                      }`}
                    >
                      {step.timeline}
                    </div>
                  </button>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>

        {/* Active Step Deep Dive Card with AnimatePresence */}
        <ScrollReveal variant="fade-up" delay={0.08}>
          <div className="p-8 sm:p-12 rounded-3xl border border-white/20 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStepIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/10 mb-8 gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                      <span>Phase {activeStep.number}</span>
                      <span>·</span>
                      <span className="text-white font-semibold">{activeStep.phase}</span>
                    </div>
                    <h3
                      className="text-2xl sm:text-4xl font-medium text-white tracking-tight"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {activeStep.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono px-3.5 py-1.5 rounded-full bg-white/10 text-neutral-300 shrink-0 w-fit border border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>Cadence: {activeStep.timeline}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
                  {/* Core Activities */}
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-5 font-mono">
                      Core Activities & Methods
                    </h4>
                    <ul className="space-y-3.5">
                      {activeStep.activities.map((act, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-neutral-200">
                          <span className="w-5 h-5 rounded-full bg-white/10 text-white flex items-center justify-center shrink-0 text-xs font-mono mt-0.5 border border-white/15">
                            ✓
                          </span>
                          <span className="leading-relaxed">{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Key Deliverables */}
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-5 font-mono">
                      Key Artifacts & Deliverables
                    </h4>
                    <div className="space-y-3">
                      {activeStep.deliverables.map((del, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/25 transition-all flex items-center justify-between gap-3 group"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="p-2 rounded-xl bg-white/5 text-neutral-300 group-hover:text-white transition-colors shrink-0">
                              <FileText className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-medium text-white truncate">{del}</span>
                          </div>
                          <span className="text-xs font-mono text-neutral-500 group-hover:text-white transition-colors">
                            Artifact {idx + 1}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
