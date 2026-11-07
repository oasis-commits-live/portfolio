import React from 'react';
import { CAREER_TIMELINE, EDUCATION_HISTORY, TESTIMONIALS, RESUME_PDF_URL } from '../data/portfolioData.ts';
import { MagneticButton } from './ui/MagneticButton.tsx';
import { FileDown, Quote, Building2, Calendar, MapPin, GraduationCap, ArrowUpRight } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ui/ScrollReveal.tsx';

export const ExperienceSection: React.FC = () => {
  return (
    <section
      id="experience"
      className="relative z-10 w-full px-5 sm:px-8 md:px-12 py-24 sm:py-32 border-t border-white/10 bg-neutral-950/95 backdrop-blur-2xl"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <ScrollReveal variant="fade-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
            <div>
              <div className="text-xs uppercase tracking-widest text-neutral-400 mb-3 font-semibold font-mono flex items-center gap-2">
                <span className="text-white tabular-nums">04</span>
                <span aria-hidden="true">·</span>
                <span>Career Track Record &amp; Education</span>
              </div>
              <h2
                className="text-3xl sm:text-5xl font-medium tracking-tight text-white leading-tight"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Experience &amp; Professional Impact.
              </h2>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <MagneticButton
                href={RESUME_PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="inline-flex items-center justify-center gap-2.5 h-11 px-5 rounded-xl bg-white text-black font-semibold text-xs sm:text-sm hover:bg-neutral-200 transition-colors shadow-lg whitespace-nowrap">
                  <FileDown className="w-4 h-4 shrink-0" />
                  <span>View / Download Resume</span>
                  <ArrowUpRight className="w-4 h-4 shrink-0" />
                </div>
              </MagneticButton>
            </div>
          </div>
        </ScrollReveal>

        {/* Timeline Items */}
        <StaggerContainer staggerDelay={0.1} className="space-y-8 mb-20 sm:mb-24">
          {CAREER_TIMELINE.map((role) => (
            <StaggerItem key={role.period + role.company}>
              <div
                className="group p-7 sm:p-10 rounded-3xl border border-white/10 bg-white/[0.02] hover:border-white/25 transition-all duration-300 hover:bg-white/[0.035]"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <h3
                      className="text-xl sm:text-2xl font-medium text-white tracking-tight"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {role.company}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span className="text-neutral-200 tabular-nums">{role.period}</span>
                  </div>
                </div>

                <div className="text-sm sm:text-base text-neutral-300 mb-4 font-mono font-medium flex flex-wrap items-center gap-2">
                  <span className="text-white">{role.title}</span>
                  <span className="text-neutral-600">·</span>
                  <span className="text-neutral-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{role.location}</span>
                  </span>
                </div>

                <p className="text-sm sm:text-base text-neutral-300 mb-6 leading-relaxed">
                  {role.summary}
                </p>

                <ul className="space-y-3 mb-6">
                  {role.bulletPoints.map((pt, idx) => (
                    <li key={idx} className="text-xs sm:text-sm text-neutral-300 flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 shrink-0" />
                      <span className="leading-relaxed">{pt}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 pt-5 border-t border-white/10">
                  {role.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-3 py-1 rounded-lg bg-white/5 text-neutral-400 border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Education & Academic Foundation (From Attached Resume) */}
        <div className="mb-20 sm:mb-24">
          <ScrollReveal variant="fade-up">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-white/10">
              <div>
                <div className="text-xs uppercase tracking-widest text-neutral-400 mb-1 font-semibold font-mono">
                  Academic Foundation
                </div>
                <h3
                  className="text-2xl sm:text-3xl font-medium text-white tracking-tight"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Education
                </h3>
              </div>
              <span className="text-xs text-neutral-400 font-mono">
                Product &amp; Industrial Design Pedigree
              </span>
            </div>
          </ScrollReveal>

          <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EDUCATION_HISTORY.map((edu) => (
              <StaggerItem key={edu.institution} className="h-full">
                <div className="h-full p-7 sm:p-8 rounded-3xl border border-white/10 bg-white/[0.02] hover:border-white/25 transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-mono text-neutral-300 tabular-nums">
                        {edu.period}
                      </span>
                    </div>
                    <h4
                      className="text-lg sm:text-xl font-medium text-white tracking-tight mb-1.5"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {edu.degree}
                    </h4>
                    <div className="text-sm font-mono text-neutral-300 mb-3">
                      {edu.institution}
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                      {edu.focus}
                    </p>
                  </div>

                  <div className="pt-4 mt-5 border-t border-white/10 flex items-center gap-1.5 text-xs font-mono text-neutral-400">
                    <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                    <span>{edu.location}</span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Peer & Leadership Testimonials */}
        <div>
          <ScrollReveal variant="fade-up">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-white/10">
              <div>
                <div className="text-xs uppercase tracking-widest text-neutral-400 mb-1 font-semibold font-mono">
                  Collaborator Endorsements
                </div>
                <h3
                  className="text-2xl sm:text-4xl font-medium text-white tracking-tight"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  What Teammates Say
                </h3>
              </div>
              <span className="text-xs text-neutral-400 font-mono">
                Direct Feedback from Leaders &amp; Engineers
              </span>
            </div>
          </ScrollReveal>

          <StaggerContainer
            staggerDelay={0.08}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
          >
            {TESTIMONIALS.map((t) => (
              <StaggerItem key={t.author} className="h-full">
                <div
                  className="h-full p-8 sm:p-10 rounded-3xl border border-white/10 bg-white/[0.02] flex flex-col justify-between hover:border-white/25 transition-all duration-300"
                >
                  <div>
                    <div className="p-2.5 rounded-xl bg-white/5 text-neutral-300 w-fit mb-6">
                      <Quote className="w-5 h-5" />
                    </div>
                    <p className="text-sm sm:text-base text-neutral-200 leading-relaxed mb-8 italic">
                      “{t.quote}”
                    </p>
                  </div>

                  <div className="flex items-center gap-3.5 pt-6 border-t border-white/10">
                    <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center font-mono font-bold text-white text-sm shrink-0">
                      {t.avatarText}
                    </div>
                    <div>
                      <div className="text-sm sm:text-base font-medium text-white tracking-tight">
                        {t.author}
                      </div>
                      <div className="text-xs text-neutral-400 font-mono">
                        {t.role} · {t.company}
                      </div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};
