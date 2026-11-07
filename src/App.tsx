import React, { useState, useEffect } from 'react';
import { BackgroundVideo } from './components/BackgroundVideo.tsx';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { WorkSection } from './components/WorkSection.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { ProcessSection } from './components/ProcessSection.tsx';
import { ExperienceSection } from './components/ExperienceSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { Footer } from './components/Footer.tsx';
import { CaseStudyModal } from './components/CaseStudyModal.tsx';
import { VideoSwitcherModal } from './components/VideoSwitcherModal.tsx';
import { CaseStudy } from './types.ts';

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [isVideoSwitcherOpen, setIsVideoSwitcherOpen] = useState(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      id="ayush-portfolio-app"
      className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black antialiased font-normal"
      style={{ fontFamily: 'var(--font-body)' }}
    >
      {/* Interactive mouse-scrub controlled background video */}
      <BackgroundVideo customVideoUrl={activeVideoUrl} scrollY={scrollY} />

      {/* Fixed top navigation bar */}
      <Navbar onOpenVideoSwitcher={() => setIsVideoSwitcherOpen(true)} />

      {/* Hero Section */}
      <Hero onOpenVideoSwitcher={() => setIsVideoSwitcherOpen(true)} />

      {/* Selected Case Studies */}
      <WorkSection onSelectCaseStudy={(study) => setSelectedCaseStudy(study)} />

      {/* About & Craft Philosophy */}
      <AboutSection />

      {/* Product Methodology & Process */}
      <ProcessSection />

      {/* Career History & Peer Endorsements */}
      <ExperienceSection />

      {/* Contact & Inquiries */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Modal: In-depth Case Study Reader */}
      <CaseStudyModal
        caseStudy={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
        onSelectCaseStudy={(study) => setSelectedCaseStudy(study)}
      />

      {/* Modal: Video Drop & File Switcher */}
      <VideoSwitcherModal
        isOpen={isVideoSwitcherOpen}
        onClose={() => setIsVideoSwitcherOpen(false)}
        onVideoChanged={(newUrl) => setActiveVideoUrl(newUrl)}
      />
    </div>
  );
}
