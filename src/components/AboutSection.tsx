import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PHILOSOPHY_PILLARS, SKILL_CATEGORIES, MY_STACK_ITEMS } from '../data/portfolioData.ts';
import { ThreeCraftSculpture } from './three/ThreeCraftSculpture.tsx';
import {
  Compass,
  Lightbulb,
  Zap,
  ShieldCheck,
  ArrowUpRight,
  Layers,
  Code2,
  Sparkles,
  Terminal,
  CheckCircle2,
} from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ui/ScrollReveal.tsx';

interface SkillMetadata {
  proof: string;
  project: string;
  tools: string[];
  metric: string;
}

const SKILL_DETAILS: Record<string, SkillMetadata> = {
  '0→1 Product Architecture': {
    proof: 'Architected enterprise finance copilots and internal POD handoff platforms from initial discovery to production launch.',
    project: 'HyperLM Vera & Bridge Handoff',
    tools: ['Figma', 'Cursor', 'Mobbin'],
    metric: '4 Zero-to-One Launches',
  },
  'AI Workspace & Copilot Ergonomics': {
    proof: 'Designed conversational AI drawers, human-in-the-loop confirmation flows, and multi-document synthesis views for CFOs.',
    project: 'HyperLM Vera — CFO Workspace',
    tools: ['Figma', 'Google Labs experiments', 'Antigravity'],
    metric: '90%+ FATE NYC Beta Signups',
  },
  'Design Systems & Token Architecture': {
    proof: 'Built foundational component libraries and semantic color/typography tokens reused across the entire Hyperbots procure-to-pay suite and Cheggout.',
    project: 'Hyperbots P2P & Cheggout Brand System',
    tools: ['Figma', 'Adobe suite'],
    metric: '100% Cross-Product Reuse',
  },
  'User Research & Persona Synthesis': {
    proof: 'Conducted deep persona inquiries with partner CFOs, finance controllers, and AP accountants to map workflow bottlenecks.',
    project: 'HyperLM Vera & Invoice Co-Pilot',
    tools: ['Figma', 'Mobbin'],
    metric: '15+ Enterprise Personas Mapped',
  },
  'Tabular FinTech UI & Data Visualization': {
    proof: 'Engineered high-density invoice and payment tables with 2-way/3-way match tags, GL coding, and side-by-side PDF drill-downs.',
    project: 'Invoice & Payments Co-Pilots',
    tools: ['Figma', 'Cursor'],
    metric: '80% Straight-Through Processing',
  },
  'Information Architecture & Wireframing': {
    proof: 'Structured low-cognitive-load navigation systems for multi-source ERP data, email triage, and agile POD tracking.',
    project: 'Bridge & HyperLM Vera',
    tools: ['Figma', 'Mobbin'],
    metric: '11 Days → <1 Min Workflow',
  },
  'Interactive Figma Prototypes': {
    proof: 'Created high-fidelity interactive prototypes validating complex multi-state table filters, game loops, and reward redemptions.',
    project: 'Bridge Super-Handoff & Cheggout',
    tools: ['Figma', 'Jitter'],
    metric: '24-Hr Sprint Validation',
  },
  'Figma Make & AI Code Generation': {
    proof: 'Combined structured ChatGPT/Perplexity PRDs with Figma Make prompt engineering to ship playable web applications.',
    project: 'Oasis — Retro Gaming Arcade',
    tools: ['Figma', 'Cursor', 'Google Labs experiments'],
    metric: '100+ Active Week-1 Players',
  },
  'Supabase Database & Edge Functions': {
    proof: 'Integrated server-authoritative leaderboards, player auth, and retro chiptune audio storage buckets in Supabase.',
    project: 'Oasis — Retro Gaming Arcade',
    tools: ['Supabase', 'Cursor'],
    metric: 'Real-Time Global Leaderboard',
  },
  'React & TypeScript Prototyping': {
    proof: 'Built responsive, production-grade frontends and interactive component prototypes with modern React and TypeScript.',
    project: 'Interactive Portfolio & Web Experiments',
    tools: ['Cursor', 'Antigravity'],
    metric: 'Sub-Pixel Implementation',
  },
  'Tailwind CSS & Sub-Pixel Craft': {
    proof: 'Crafted responsive layouts, custom dark-mode surface hierarchies, and tactile micro-interactions.',
    project: 'Production Web Interfaces',
    tools: ['Cursor', 'Figma'],
    metric: 'Zero-Slop Visual Restraint',
  },
  'Cursor & Antigravity Prototyping': {
    proof: 'Leveraged AI-native coding environments to bridge design specifications directly into working software.',
    project: 'AI Workflow Explorations',
    tools: ['Cursor', 'Antigravity', 'Google Labs experiments'],
    metric: '3× Design-to-Dev Velocity',
  },
  'Character & Mascot Design (Hypo)': {
    proof: 'Re-imagined Hyperbots’ mascot from a cold robot into a warm, human-centric AI companion aligned with the brand mark.',
    project: 'Hypo — The AI Companion',
    tools: ['Adobe suite', 'Figma', 'Blender'],
    metric: '10k → 28k LinkedIn Growth',
  },
  'Motion Design in Jitter': {
    proof: 'Designed expressive UI transitions, animated social storytelling, and gamified scratch-card reveal animations.',
    project: 'Cheggout & Hyperbots Marketing',
    tools: ['Jitter', 'Figma'],
    metric: 'Elevated Campaign CTR',
  },
  '3D Modeling & Animatics in Blender': {
    proof: 'Modeled 3D character poses, physical toy prototypes, and spatial assets for EdTech and brand communication.',
    project: 'Skillmatics & Hypo 3D Library',
    tools: ['Blender', 'Adobe suite'],
    metric: '2D-to-3D Asset Pipeline',
  },
  'Brand Identity & Presentation Systems': {
    proof: 'Crafted organization-wide brand guidelines, social identity directions, and executive pitch deck templates.',
    project: 'Cheggout & Hyperbots Inc.',
    tools: ['Figma', 'Adobe suite'],
    metric: 'Org-Wide Brand Adoption',
  },
  'Social Media & Growth Collateral': {
    proof: 'Designed high-converting ad banners, video thumbnails, and character-driven social carousels.',
    project: 'Hyperbots & Partner Banking Brands',
    tools: ['Adobe suite', 'Figma', 'Jitter'],
    metric: '+180% Community Growth',
  },
  'Educational & Game Thinking': {
    proof: 'Designed physical phonics games and educational board games for children aged 2–10, now retailed globally at Hamleys.',
    project: 'BINCA Games & Skillmatics',
    tools: ['Adobe suite', 'Blender'],
    metric: 'Retailed at Hamleys',
  },
  'Enterprise B2B FinTech': {
    proof: 'Deep domain fluency in CFO workflows, general ledger coding, 2-way/3-way PO matching, and audit compliance.',
    project: 'Hyperbots FinTech Suite',
    tools: ['Figma', 'Mobbin'],
    metric: '$3M ARR Generated',
  },
  'Accounts Payable & Procure-to-Pay': {
    proof: 'End-to-end UX ownership across invoice discovery, OCR validation, early payment discount capture, and ERP posting.',
    project: 'Invoice & Payments Co-Pilots',
    tools: ['Figma'],
    metric: '+10% Cash Outflow Efficiency',
  },
  'Conversational AI & LLM Copilots': {
    proof: 'Designed context-aware financial Q&A assistants with guardrails that gracefully decline out-of-domain prompts.',
    project: 'HyperLM Vera',
    tools: ['Figma', 'Google Labs experiments'],
    metric: '15+ Data Sources Unified',
  },
  'Internal Tooling & Agile PODs': {
    proof: 'Built POD-based task allocation, automated Slack handoff cascades, and SLA tracking for fast-paced engineering squads.',
    project: 'Bridge — SourceCode Tech',
    tools: ['Figma'],
    metric: 'Eliminated Missed Handoffs',
  },
  'EdTech & Physical Board Games': {
    proof: 'Bridged industrial design and play psychology to craft tactile card and board games for early childhood learning.',
    project: 'Skillmatics & BINCA Games',
    tools: ['Adobe suite', 'Blender'],
    metric: 'Ages 2–10 Play Systems',
  },
  'Banking App Gamification': {
    proof: 'Architected scratch card flows, mystery box redemption journeys, and instant reward campaigns for tier-1 banking apps.',
    project: 'Cheggout Services Pvt Ltd.',
    tools: ['Figma', 'Jitter'],
    metric: 'Multi-Bank In-App Rollout',
  },
};

export const AboutSection: React.FC = () => {
  const pillarIcons = [Compass, Lightbulb, Zap, ShieldCheck];
  const [activePillarIndex, setActivePillarIndex] = useState<number>(0);
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<string>('All');
  const [activeSkill, setActiveSkill] = useState<string>('AI Workspace & Copilot Ergonomics');

  const activePillar = PHILOSOPHY_PILLARS[activePillarIndex] || PHILOSOPHY_PILLARS[0];
  const activeSkillData: SkillMetadata = SKILL_DETAILS[activeSkill] || {
    proof: 'Applied across 0-to-1 product launches, design systems, and interactive prototypes.',
    project: 'Hyperbots Inc. & Self-Initiated',
    tools: ['Figma', 'Cursor'],
    metric: 'Production Proven',
  };

  const displayedCategories =
    selectedSkillCategory === 'All'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((c) => c.category === selectedSkillCategory);

  const renderPillarVisual = (idx: number) => {
    switch (idx) {
      case 0:
        return (
          <svg viewBox="0 0 240 120" className="w-full h-28 stroke-white/80 fill-none">
            <circle cx="70" cy="60" r="36" strokeWidth="1.2" className="stroke-white/30" />
            <circle cx="170" cy="60" r="36" strokeWidth="1.2" className="stroke-white/30" />
            <path
              d="M 70 24 C 120 24, 120 96, 170 96"
              strokeWidth="2"
              className="stroke-sky-400"
            />
            <path
              d="M 70 96 C 120 96, 120 24, 170 24"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              className="stroke-white/60"
            />
            <circle cx="70" cy="60" r="4" className="fill-white" />
            <circle cx="170" cy="60" r="4" className="fill-sky-400" />
            <circle cx="120" cy="60" r="6" className="fill-sky-400/20 stroke-sky-400" strokeWidth="1.5" />
            <text x="42" y="112" className="fill-neutral-400 text-[9px] font-mono">
              TANGIBLE
            </text>
            <text x="142" y="112" className="fill-neutral-400 text-[9px] font-mono">
              EXPERIENTIAL
            </text>
          </svg>
        );
      case 1:
        return (
          <svg viewBox="0 0 240 120" className="w-full h-28 fill-none">
            <rect x="24" y="34" width="68" height="52" rx="10" className="stroke-white/30" strokeWidth="1.2" />
            <rect x="148" y="34" width="68" height="52" rx="10" className="stroke-sky-400/60" strokeWidth="1.5" />
            <path d="M 92 52 L 148 52" className="stroke-sky-400" strokeWidth="1.5" strokeDasharray="3 3" />
            <path d="M 148 68 L 92 68" className="stroke-white/50" strokeWidth="1.5" />
            <circle cx="120" cy="60" r="14" className="fill-neutral-900 stroke-sky-400" strokeWidth="1.5" />
            <text x="41" y="64" className="fill-white text-[10px] font-mono">
              HUMAN
            </text>
            <text x="163" y="64" className="fill-sky-400 text-[10px] font-mono">
              AI TWIN
            </text>
          </svg>
        );
      case 2:
        return (
          <svg viewBox="0 0 240 120" className="w-full h-28 fill-none">
            <polyline
              points="20,85 75,85 95,35 155,35 175,20 220,20"
              className="stroke-amber-400"
              strokeWidth="2"
            />
            <line x1="20" y1="95" x2="220" y2="95" className="stroke-white/15" strokeWidth="1" />
            <circle cx="75" cy="85" r="4" className="fill-white" />
            <circle cx="95" cy="35" r="4" className="fill-amber-400" />
            <circle cx="175" cy="20" r="4" className="fill-emerald-400" />
            <text x="24" y="75" className="fill-neutral-400 text-[9px] font-mono">
              FIGMA
            </text>
            <text x="95" y="25" className="fill-amber-400 text-[9px] font-mono">
              AI PROMPT
            </text>
            <text x="165" y="52" className="fill-emerald-400 text-[9px] font-mono">
              LIVE MVP
            </text>
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 240 120" className="w-full h-28 fill-none">
            <rect x="30" y="72" width="28" height="28" rx="4" className="fill-white/15" />
            <rect x="76" y="54" width="28" height="46" rx="4" className="fill-white/25" />
            <rect x="122" y="36" width="28" height="64" rx="4" className="fill-emerald-400/40" />
            <rect x="168" y="18" width="28" height="82" rx="4" className="fill-emerald-400" />
            <text x="30" y="113" className="fill-neutral-400 text-[9px] font-mono">
              0→1
            </text>
            <text x="158" y="113" className="fill-emerald-400 text-[9px] font-mono">
              $3M ARR
            </text>
          </svg>
        );
    }
  };

  return (
    <section
      id="about"
      className="relative z-10 w-full px-5 sm:px-8 md:px-12 py-24 sm:py-32 border-t border-white/10 bg-neutral-950/95 backdrop-blur-2xl"
    >
      <div className="max-w-6xl mx-auto">
        {/* Split Section: Bio Manifesto + Three.js Kinetic Sculpture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center mb-24 sm:mb-32">
          {/* Left Column: Authentic Bio */}
          <div className="lg:col-span-7">
            <ScrollReveal variant="fade-up">
              <div className="text-xs uppercase tracking-widest text-neutral-400 mb-3 font-semibold font-mono flex items-center gap-2">
                <span className="text-white tabular-nums">02</span>
                <span aria-hidden="true">·</span>
                <span>Philosophy &amp; Creative Craft</span>
              </div>

              <h2
                className="text-3xl sm:text-5xl font-medium tracking-tight text-white mb-6 leading-tight"
                style={{ fontFamily: 'var(--font-heading)', textWrap: 'balance' }}
              >
                Crafting Delightful Digital Experiences Across SaaS, EdTech &amp; Gaming.
              </h2>

              <div className="space-y-4 text-base sm:text-lg text-neutral-300 leading-relaxed">
                <p>
                  Hey! I’m Ayush, a product designer transforming complex problems into intuitive, delightful solutions. I don’t like to label myself strictly as a product designer or industrial designer — I’m fueled with creativity and call myself a creative.
                </p>
                <p className="text-neutral-400 text-sm sm:text-base">
                  I get pumped up when I see something different or revolutionary in the design space. Design is neither limited to being tangible nor experiential; the core essence is the everlasting impact it creates. When I’m not in design mode, you can catch me sketching and building experiments on my own or training hard to become the best hybrid athlete!
                </p>
              </div>

              {/* Quick Creative Focus Callouts */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-8 mt-8 border-t border-white/10 text-xs font-mono">
                <div>
                  <span className="text-neutral-500 block mb-1">DISCIPLINE</span>
                  <span className="text-white font-medium">0→1 Product &amp; AI</span>
                </div>
                <div>
                  <span className="text-neutral-500 block mb-1">MEDIUM</span>
                  <span className="text-white font-medium">Figma, 3D &amp; Code</span>
                </div>
                <div>
                  <span className="text-neutral-500 block mb-1">PASSION</span>
                  <span className="text-white font-medium">Hybrid Athlete &amp; Craft</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Interactive 3D Kinetic Sculpture */}
          <div className="lg:col-span-5">
            <ScrollReveal variant="scale-up" delay={0.12}>
              <ThreeCraftSculpture />
            </ScrollReveal>
          </div>
        </div>

        {/* =====================================================================
            FOUNDATIONAL PRINCIPLES — INTERACTIVE KINETIC ETHOS DECK
           ===================================================================== */}
        <div className="mb-24 sm:mb-32">
          <ScrollReveal variant="fade-up">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-5 border-b border-white/10">
              <div>
                <div className="text-xs uppercase tracking-widest text-neutral-400 mb-1.5 font-semibold font-mono">
                  Foundational Principles
                </div>
                <h3
                  className="text-2xl sm:text-4xl font-medium text-white tracking-tight"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  The 4 Pillars of My Design Ethos
                </h3>
              </div>
              <span className="text-xs text-neutral-400 font-mono">
                Hover or select a pillar to inspect its execution model
              </span>
            </div>
          </ScrollReveal>

          {/* Interactive Horizontal Expanding Deck (Desktop) + Responsive Accordion */}
          <ScrollReveal variant="fade-up" delay={0.06}>
            <div className="flex flex-col lg:flex-row gap-4 min-h-[420px]">
              {PHILOSOPHY_PILLARS.map((pillar, idx) => {
                const Icon = pillarIcons[idx % pillarIcons.length];
                const isActive = activePillarIndex === idx;

                return (
                  <motion.div
                    key={pillar.number}
                    layout
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => setActivePillarIndex(idx)}
                    onMouseEnter={() => setActivePillarIndex(idx)}
                    className={`relative rounded-3xl border transition-colors duration-300 cursor-pointer overflow-hidden flex flex-col justify-between p-6 sm:p-8 ${
                      isActive
                        ? 'lg:flex-[2.6] bg-gradient-to-b from-white/[0.07] via-neutral-900/90 to-black border-white/30 shadow-2xl'
                        : 'lg:flex-[1] bg-white/[0.02] hover:bg-white/[0.04] border-white/10'
                    }`}
                  >
                    {/* Top Row: Index Number + Icon */}
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-6">
                        <span
                          className={`text-2xl sm:text-3xl font-mono tabular-nums transition-colors ${
                            isActive ? 'text-white font-semibold' : 'text-neutral-500'
                          }`}
                          style={{ fontFamily: 'var(--font-heading)' }}
                        >
                          {pillar.number}
                        </span>

                        <div
                          className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${
                            isActive
                              ? 'bg-white text-black border-white scale-105'
                              : 'bg-white/5 text-neutral-400 border-white/10'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Subtitle Kicker */}
                      <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
                        {pillar.subtitle}
                      </div>

                      {/* Pillar Title */}
                      <h4
                        className={`font-medium tracking-tight text-white transition-all ${
                          isActive ? 'text-2xl sm:text-3xl mb-4' : 'text-lg sm:text-xl mb-2'
                        }`}
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {pillar.title}
                      </h4>

                      {/* Expanded Content when Active */}
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 4 }}
                            transition={{ duration: 0.25 }}
                            className="space-y-5 mt-3"
                          >
                            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl">
                              {pillar.description}
                            </p>

                            {/* Interactive Architectural Diagram for this Pillar */}
                            <div className="p-4 rounded-2xl bg-black/60 border border-white/10">
                              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
                                <span>{pillar.visualKeyword}</span>
                                <span className="text-white">{pillar.metricBadge}</span>
                              </div>
                              {renderPillarVisual(idx)}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Bottom Quote / Proof Footer */}
                    <div className="pt-5 mt-6 border-t border-white/10">
                      {isActive ? (
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <blockquote className="text-xs sm:text-sm italic text-neutral-200">
                            “{pillar.quote}”
                          </blockquote>
                          {pillar.relatedProject && (
                            <span className="text-[11px] font-mono text-sky-400 shrink-0">
                              Proven in: {pillar.relatedProject}
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="text-xs font-mono text-neutral-500 flex items-center justify-between">
                          <span className="truncate">{pillar.visualKeyword}</span>
                          <span>→</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>

        {/* =====================================================================
            MY STACK SECTION (Original Framer Logos)
           ===================================================================== */}
        <ScrollReveal variant="fade-up" delay={0.05} className="mb-24 sm:mb-32">
          <div className="p-8 sm:p-12 rounded-3xl border border-white/15 bg-gradient-to-b from-neutral-900 to-black shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8 pb-4 border-b border-white/10">
              <div>
                <div className="text-xs uppercase tracking-widest text-neutral-400 mb-1.5 font-semibold font-mono">
                  Toolkit &amp; Daily Arsenal
                </div>
                <h3
                  className="text-2xl sm:text-3xl font-medium text-white tracking-tight"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  My stack
                </h3>
              </div>
              <span className="text-xs text-neutral-400 font-mono tabular-nums">
                9 Primary Tools &amp; Workflows
              </span>
            </div>

            <StaggerContainer
              staggerDelay={0.05}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4"
            >
              {MY_STACK_ITEMS.map((item) => {
                const isHighlightedBySkill = activeSkillData.tools.some(
                  (t) => t.toLowerCase() === item.tool.toLowerCase()
                );
                return (
                  <StaggerItem key={item.tool}>
                    <a
                      href={item.url || '#'}
                      target={item.url ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className={`group relative p-4 rounded-2xl transition-all duration-200 flex items-center justify-between gap-3 text-left shadow-sm h-full border ${
                        isHighlightedBySkill
                          ? 'bg-white/[0.08] border-white/35'
                          : 'bg-white/[0.03] hover:bg-white/[0.08] border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-neutral-900 border border-white/15 flex items-center justify-center p-1.5 shrink-0 shadow-md group-hover:scale-105 group-hover:border-white/30 transition-all duration-200">
                          <img
                            src={item.logo}
                            alt={`${item.tool} logo`}
                            onError={(e) => {
                              if (item.remoteLogo && e.currentTarget.src !== item.remoteLogo) {
                                e.currentTarget.src = item.remoteLogo;
                              }
                            }}
                            className="w-full h-full object-contain rounded-lg"
                            loading="lazy"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm sm:text-base font-medium text-white group-hover:text-neutral-100 tracking-tight truncate">
                            {item.tool}
                          </div>
                          <div className="text-xs text-neutral-400 group-hover:text-neutral-300 font-normal truncate mt-0.5">
                            {item.category}
                          </div>
                        </div>
                      </div>

                      <div className="text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0 text-sm pl-1 font-mono">
                        ↗
                      </div>
                    </a>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </ScrollReveal>

        {/* =====================================================================
            CORE COMPETENCIES — INTERACTIVE CAPABILITY MATRIX & PROOF INSPECTOR
           ===================================================================== */}
        <ScrollReveal variant="fade-up" delay={0.06}>
          <div className="p-7 sm:p-12 rounded-3xl border border-white/15 bg-[#080808]">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 mb-8 border-b border-white/10">
              <div>
                <div className="text-xs uppercase tracking-widest text-neutral-400 mb-2 font-semibold font-mono">
                  Core Competencies
                </div>
                <h3
                  className="text-2xl sm:text-4xl font-medium text-white tracking-tight"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Interactive Capability &amp; Proof Matrix
                </h3>
              </div>

              {/* Interactive Discipline Filter Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-white/[0.04] border border-white/10">
                {['All', ...SKILL_CATEGORIES.map((c) => c.category)].map((catName) => {
                  const isSelected = selectedSkillCategory === catName;
                  return (
                    <button
                      key={catName}
                      type="button"
                      onClick={() => setSelectedSkillCategory(catName)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                        isSelected
                          ? 'bg-white text-black shadow-sm'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      {catName}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* Left 7 Columns: Interactive Competency Nodes */}
              <div className="lg:col-span-7 space-y-8">
                {displayedCategories.map((category, catIdx) => (
                  <div key={category.category} className="space-y-3.5">
                    <div className="flex items-center justify-between text-xs font-mono text-neutral-400 pb-2 border-b border-white/10">
                      <span className="uppercase tracking-wider text-white font-semibold">
                        0{catIdx + 1}. {category.category}
                      </span>
                      <span className="tabular-nums">{category.skills.length} Capabilities</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {category.skills.map((skill) => {
                        const isSelected = activeSkill === skill;
                        const meta = SKILL_DETAILS[skill];
                        return (
                          <button
                            key={skill}
                            type="button"
                            onMouseEnter={() => setActiveSkill(skill)}
                            onClick={() => setActiveSkill(skill)}
                            className={`group text-left p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-start justify-between gap-2 ${
                              isSelected
                                ? 'bg-white text-black border-white shadow-lg'
                                : 'bg-white/[0.02] hover:bg-white/[0.06] text-neutral-200 border-white/10 hover:border-white/25'
                            }`}
                          >
                            <div className="min-w-0">
                              <div
                                className={`text-xs sm:text-sm font-medium leading-snug ${
                                  isSelected ? 'text-black font-semibold' : 'text-white'
                                }`}
                              >
                                {skill}
                              </div>
                              {meta && (
                                <div
                                  className={`text-[11px] font-mono mt-1 truncate ${
                                    isSelected ? 'text-neutral-700' : 'text-neutral-500'
                                  }`}
                                >
                                  {meta.metric}
                                </div>
                              )}
                            </div>

                            <span
                              className={`text-xs font-mono shrink-0 mt-0.5 transition-transform ${
                                isSelected
                                  ? 'text-black translate-x-0.5'
                                  : 'text-neutral-500 group-hover:text-white'
                              }`}
                            >
                              →
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Right 5 Columns: Sticky Live Proof & Stack Connection Inspector */}
              <div className="lg:col-span-5 lg:sticky lg:top-28">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSkill}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="p-6 sm:p-8 rounded-2xl border border-white/20 bg-gradient-to-b from-neutral-900 to-black shadow-2xl"
                  >
                    <div className="flex items-center justify-between gap-2 text-xs font-mono text-neutral-400 mb-3">
                      <span className="uppercase tracking-widest text-sky-400">
                        Live Competency Spotlight
                      </span>
                      <span className="tabular-nums text-white font-semibold">
                        {activeSkillData.metric}
                      </span>
                    </div>

                    <h4
                      className="text-xl sm:text-2xl font-medium text-white tracking-tight mb-4 leading-snug"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {activeSkill}
                    </h4>

                    <p className="text-sm sm:text-base text-neutral-300 leading-relaxed mb-6">
                      {activeSkillData.proof}
                    </p>

                    {/* Real-World Case Study Attribution */}
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 mb-6">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 mb-1">
                        Proven In Production At
                      </div>
                      <div className="text-sm font-medium text-white flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{activeSkillData.project}</span>
                      </div>
                    </div>

                    {/* Connected Stack Tools */}
                    <div>
                      <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 mb-2.5">
                        Connected Tools in My Stack
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        {activeSkillData.tools.map((toolName) => {
                          const matchedStack = MY_STACK_ITEMS.find(
                            (s) => s.tool.toLowerCase() === toolName.toLowerCase()
                          );
                          return (
                            <div
                              key={toolName}
                              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.06] border border-white/15 text-xs text-white"
                            >
                              {matchedStack && (
                                <img
                                  src={matchedStack.logo}
                                  alt=""
                                  onError={(e) => {
                                    if (
                                      matchedStack.remoteLogo &&
                                      e.currentTarget.src !== matchedStack.remoteLogo
                                    ) {
                                      e.currentTarget.src = matchedStack.remoteLogo;
                                    }
                                  }}
                                  className="w-4 h-4 object-contain rounded-sm"
                                />
                              )}
                              <span>{toolName}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
