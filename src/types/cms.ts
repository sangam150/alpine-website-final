// CMS Content Types for Firestore
export interface HomepageContent {
  id: string;
  section: string; // e.g. 'hero', 'cta', 'features', etc.
  type: 'heading' | 'paragraph' | 'cta' | 'image' | 'stat' | 'stats' | 'list' | 'html';
  value: string;
  order: number;
  isActive: boolean;
  metadata?: Record<string, any>;
}

export interface Testimonial {
  id: string;
  name: string;
  country: string;
  university: string;
  course: string;
  image: string;
  rating: number;
  text: string;
  year: string;
  featured?: boolean;
  order: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  price: string;
  icon: React.ElementType;
  order: number;
  isActive: boolean;
  popular?: boolean;
  gradient?: string;
}

export interface CountryPage {
  id: string;
  name: string;
  slug: string;
  flag: string;
  description: string;
  stats: {
    universities: string;
    students: string;
    ranking: string;
    countries: string;
  };
  highlights: string[];
  heroGradient: string;
  breadcrumbItems: { label: string; href?: string; current?: boolean }[];
  tuition: { min: number; max: number; currency: string };
  intakes: string[];
  workRights: string;
  duration: string;
  visa: { successRate: string; processingTime: string; requirements: string[] };
  universities: {
    name: string;
    ranking: string;
    location: string;
    acceptanceRate: string;
    popularCourses: string[];
    tuition: string;
    logo?: string;
  }[];
  livingCosts: {
    category: string;
    cost: string;
    details: string;
    icon: any;
  }[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  authorId: string;
  authorName: string;
  publishDate: any;
  readTime: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  isPublished: boolean;
  viewCount: number;
  seoData?: Record<string, any>;
}

export interface ContactInfo {
  id: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  mapEmbed: string;
  footerLinks: { label: string; url: string }[];
  socialLinks: { label: string; url: string }[];
}

export interface JobPosting {
  id: string;
  title: string;
  location: string;
  deadline: string;
  applyLink: string;
  description: string;
  requirements: string[];
  isActive: boolean;
  order: number;
}

export interface MockTestInfo {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  registrationLink: string;
  isActive: boolean;
}

export interface LeadForm {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  type: 'contact' | 'mock_test' | 'job' | 'general';
  submittedAt: any;
  meta?: Record<string, any>;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
  isActive: boolean;
} 