export type CaseStudyBlock =
  | { type: 'paragraph'; text: string; highlight?: boolean }
  | { type: 'heading'; level: 'h3' | 'h4' | 'h5' | 'h6'; text: string }
  | {
      type: 'list';
      ordered?: boolean;
      items: {
        text: string;
        subItems?: string[];
        images?: { src: string; alt?: string; caption?: string; maxWidth?: string }[];
      }[];
    }
  | {
      type: 'image';
      src: string;
      alt?: string;
      caption?: string;
      maxWidth?: string;
      aspectRatio?: string;
    }
  | {
      type: 'image-grid';
      columns: 2 | 3;
      images: { src: string; alt?: string; caption?: string }[];
    }
  | {
      type: 'callout';
      title?: string;
      items: string[];
    };

export interface CaseStudySection {
  id: string;
  title: string;
  blocks: CaseStudyBlock[];
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  year: string;
  projectType: 'B2B' | 'B2C' | 'Communication';
  role: string;
  category: 'AI & Workflows' | '0→1 Product' | 'Design Systems' | 'Fintech';
  description: string;
  heroImage: string;
  galleryImages: string[];
  prototypeUrl?: string;
  externalUrl?: string;
  externalLabel?: string;
  impactMetrics: {
    label: string;
    value: string;
  }[];
  tags: string[];
  thumbnailTheme: string;
  accentColor: string;
  previewMockup: {
    type: 'dashboard' | 'mobile' | 'tokens' | 'telemetry' | 'canvas' | 'fintech';
    headline: string;
    subheadline: string;
  };
  sections: CaseStudySection[];
  details: {
    challenge: string;
    research: string[];
    keyDecisions: {
      title: string;
      description: string;
    }[];
    systemHighlights: string[];
    results: string[];
  };
}

export interface PhilosophyPillar {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  quote: string;
  metricBadge?: string;
  relatedProject?: string;
  visualKeyword?: string;
}

export interface ProcessStep {
  phase: string;
  number: string;
  title: string;
  timeline: string;
  activities: string[];
  deliverables: string[];
}

export interface CareerRole {
  period: string;
  title: string;
  company: string;
  location: string;
  summary: string;
  bulletPoints: string[];
  stack: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  location: string;
  focus: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatarText: string;
}

export interface StackItem {
  tool: string;
  category: string;
  logo: string;
  remoteLogo?: string;
  url?: string;
}
