import React, { useState } from 'react';
import { MagneticButton } from './ui/MagneticButton.tsx';
import { RESUME_PDF_URL } from '../data/portfolioData.ts';
import { Calendar, Copy, Check, Send, MapPin, Target, Dumbbell, ArrowUpRight, FileText } from 'lucide-react';
import { ScrollReveal } from './ui/ScrollReveal.tsx';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectScope: 'AI Workspace / Copilot Design',
    message: '',
  });

  const handleCopyEmail = async () => {
    const email = 'ayush.dubeypd@gmail.com';
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = email;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;
    setFormSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative z-10 w-full px-5 sm:px-8 md:px-12 py-24 sm:py-32 border-t border-white/10 bg-black text-white"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16">
          {/* Left Column: Direct Info */}
          <ScrollReveal variant="fade-up">
            <div>
              {/* Clean Unboxed Status Indicator */}
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-6">
                <span className="text-white font-bold tabular-nums">05</span>
                <span aria-hidden="true">·</span>
                <span className="text-neutral-300">Open for Select Product Design Advisory &amp; Sprints</span>
              </div>

              <h2
                className="text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white mb-6 leading-tight"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Have a project idea in mind? Let’s chat!
              </h2>

              <p className="text-base sm:text-lg text-neutral-300 leading-relaxed mb-8 max-w-lg">
                Let’s explore how we can bring it to life. Whether you’re architecting an enterprise AI workspace, launching a 0-to-1 product, or scaling a foundational design system.
              </p>

              {/* CTAs: Book a call on Cal.com + Copy Email + Resume PDF (Uniform h-12 / 48px Height) */}
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <MagneticButton
                  href="https://cal.com/ayush-dubey-rhfsyb/30min?overlayCalendar=true"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="inline-flex items-center justify-center gap-2.5 h-12 px-6 rounded-xl bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-colors shadow-xl cursor-pointer whitespace-nowrap">
                    <Calendar className="w-4 h-4 shrink-0" />
                    <span>Book a 30-Min Call</span>
                    <ArrowUpRight className="w-4 h-4 shrink-0" />
                  </div>
                </MagneticButton>

                <div className="relative inline-flex items-center">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center justify-center gap-2.5 h-12 px-5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-colors border border-white/15 cursor-pointer group whitespace-nowrap"
                    aria-label="Copy email address"
                  >
                    <span className="font-mono text-xs sm:text-sm">ayush.dubeypd@gmail.com</span>
                    <span className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center text-xs group-hover:scale-105 transition-transform shrink-0">
                      {copied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </span>
                  </button>

                  {copied && (
                    <span
                      role="status"
                      aria-live="polite"
                      className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-white text-black text-xs font-mono font-semibold rounded-lg shadow-lg pointer-events-none animate-fade-in whitespace-nowrap"
                    >
                      Email Copied!
                    </span>
                  )}
                </div>

                <MagneticButton
                  href={RESUME_PDF_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="inline-flex items-center justify-center gap-2 h-12 px-5 rounded-xl bg-white/[0.06] hover:bg-white/[0.14] text-white font-medium text-sm transition-colors border border-white/15 cursor-pointer whitespace-nowrap">
                    <FileText className="w-4 h-4 shrink-0 text-neutral-300" />
                    <span>Resume PDF</span>
                    <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-neutral-400" />
                  </div>
                </MagneticButton>
              </div>

              {/* Availability & Location */}
              <div className="space-y-2.5 text-xs sm:text-sm text-neutral-400 font-mono pt-6 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                  <span className="text-white font-medium">Location:</span> Bangalore, Karnataka, India (IST / Global)
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                  <span className="text-white font-medium">Focus:</span> Product &amp; UX Design, AI Workspaces, 0→1 Building
                </div>
                <div className="flex items-center gap-2">
                  <Dumbbell className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                  <span className="text-white font-medium">Discipline:</span> Hybrid Athlete Training, Rapid AI Prototyping
                </div>
              </div>

              {/* Verified Social & Work Links */}
              <div className="flex flex-wrap items-center gap-4 pt-8 mt-8 border-t border-white/10 text-xs sm:text-sm text-neutral-300 font-mono">
                <a
                  href="https://www.linkedin.com/in/ayush-dubey-8827481a9/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors underline underline-offset-4"
                >
                  LinkedIn
                </a>
                <span className="text-neutral-600">/</span>
                <a
                  href="https://www.behance.net/ayushdubey07"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors underline underline-offset-4"
                >
                  Behance
                </a>
                <span className="text-neutral-600">/</span>
                <a
                  href="https://www.instagram.com/ayushdubey.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors underline underline-offset-4"
                >
                  Instagram
                </a>
                <span className="text-neutral-600">/</span>
                <a
                  href={RESUME_PDF_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors underline underline-offset-4"
                >
                  Resume
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Direct Quick Contact Form */}
          <ScrollReveal variant="fade-up" delay={0.1}>
            <div className="bg-neutral-900/60 border border-white/15 rounded-3xl p-7 sm:p-10 shadow-2xl">
              <h3
                className="text-xl sm:text-2xl font-medium text-white mb-2 tracking-tight"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Send a Direct Message
              </h3>
              <p className="text-sm text-neutral-400 mb-6">
                Share details about your upcoming launch, team requirement, or advisory need.
              </p>

              {formSubmitted ? (
                <div className="p-8 text-center bg-white/[0.03] border border-white/20 rounded-2xl animate-fade-in">
                  <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center text-lg mx-auto mb-4 font-bold">
                    ✓
                  </div>
                  <h4 className="text-lg font-medium text-white mb-2">Message Dispatched</h4>
                  <p className="text-sm text-neutral-300 mb-4">
                    Thank you for reaching out. I’ll review your note and respond promptly!
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ name: '', email: '', projectScope: 'AI Workspace / Copilot Design', message: '' });
                    }}
                    className="text-xs font-mono text-white underline underline-offset-4 hover:text-neutral-300 cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-mono text-neutral-400 mb-1.5 uppercase">
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Maya Patel"
                      className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white/40 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-mono text-neutral-400 mb-1.5 uppercase">
                      Your Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="maya@company.com"
                      className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white/40 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-scope" className="block text-xs font-mono text-neutral-400 mb-1.5 uppercase">
                      Project Focus
                    </label>
                    <select
                      id="contact-scope"
                      value={formData.projectScope}
                      onChange={(e) => setFormData({ ...formData, projectScope: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl bg-neutral-900 border border-white/10 text-white text-sm focus:outline-none focus:border-white/40 transition-colors"
                    >
                      <option value="AI Workspace / Copilot Design">AI Workspace / Copilot Design</option>
                      <option value="0→1 Product Launch">0→1 Product Launch</option>
                      <option value="Design System Architecture">Design System Architecture</option>
                      <option value="Gaming & AI Workflow Prototyping">Gaming &amp; AI Workflow Prototyping</option>
                      <option value="Brand Identity & Mascot Design">Brand Identity &amp; Mascot Design</option>
                      <option value="Full-Time / Advisory Role">Full-Time / Advisory Role</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-mono text-neutral-400 mb-1.5 uppercase">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about what you are building..."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white/40 transition-colors resize-none"
                    />
                  </div>

                  <MagneticButton type="submit" className="w-full">
                    <div className="w-full h-12 px-6 rounded-xl bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-colors cursor-pointer shadow-lg flex items-center justify-center gap-2">
                      <Send className="w-4 h-4 shrink-0" />
                      <span>Send Message</span>
                    </div>
                  </MagneticButton>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
