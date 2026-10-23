/** The options offered by the project brief on the contact page. */

export type Choice = { id: string; label: string };
export type Category = Choice & { types: string[] };

/** The first question: something new, or work on something they already have. */
export const STAGES: Choice[] = [
  { id: 'new', label: 'Something new' },
  { id: 'existing', label: 'Something I already have' },
];

/** For an existing project: what they want done with it. */
export const CHANGES: Choice[] = [
  { id: 'look', label: 'Fresh new look' },
  { id: 'rebuild', label: 'Rebuild from scratch' },
  { id: 'move', label: 'Move to a new platform' },
];

export const CATEGORIES: Category[] = [
  {
    id: 'website',
    label: 'Website',
    types: [
      'Landing page',
      'Company site',
      'E-commerce',
      'Booking site',
      'Blog / CMS',
      'Event page',
      'Membership site',
      'Documentation',
    ],
  },
  {
    id: 'app',
    label: 'App',
    types: [
      'Web app / SaaS',
      'Mobile app',
      'Internal tool',
      'Dashboard',
      'Customer portal',
      'Booking system',
      'Admin panel',
      'Real-time / chat',
    ],
  },
  {
    id: 'portfolio',
    label: 'Portfolio',
    types: [
      'Photography',
      'Design / creative',
      'Developer',
      'Music / audio',
      'Art / illustration',
      'Agency / studio',
      'Personal CV',
    ],
  },
  { id: 'other', label: 'Something else', types: [] },
];

type Page = Choice & {
  /** The "What are we building?" choices this page is offered for. */
  for: string[];
};

const W = 'website';
const A = 'app';
const P = 'portfolio';

/** The pages it can have, in everyday words. */
export const PAGES: Page[] = [
  { id: 'home', label: 'Home', for: [W, A, P] },
  { id: 'about', label: 'About us', for: [W, P] },
  { id: 'services', label: 'Services', for: [W, P] },
  { id: 'work', label: 'Work / gallery', for: [W, P] },
  { id: 'prices', label: 'Prices', for: [W, A, P] },
  { id: 'reviews', label: 'Customer reviews', for: [W, P] },
  { id: 'faq', label: 'Questions & answers', for: [W, A] },
  { id: 'team', label: 'Team', for: [W] },
  { id: 'blog', label: 'News / blog', for: [W, P] },
  { id: 'booking', label: 'Booking', for: [W, A] },
  { id: 'shop', label: 'Shop', for: [W] },
  { id: 'checkout', label: 'Checkout / payment', for: [W, A] },
  { id: 'signup', label: 'Sign up', for: [A] },
  { id: 'login', label: 'Log in', for: [W, A] },
  { id: 'profile', label: 'Profile / settings', for: [A] },
  { id: 'dashboard', label: 'Customer dashboard', for: [A] },
  { id: 'admin', label: 'Admin dashboard', for: [W, A] },
  { id: 'contact', label: 'Contact', for: [W, A, P] },
];

/**
 * The pages offered for a "What are we building?" choice. Something else, or
 * nothing picked yet, offers them all.
 */
export const pagesFor = (cat: string) =>
  PAGES.filter((p) => !p.for.length || p.for.includes(cat) || cat === 'other' || !cat);

export const STYLES: Choice[] = [
  { id: 'clean', label: 'Clean & minimal' },
  { id: 'glass', label: 'Glass / iOS' },
  { id: 'bold', label: 'Bold & graphic' },
  { id: 'premium', label: 'Premium' },
  { id: 'warm', label: 'Warm & friendly' },
  { id: 'corporate', label: 'Corporate' },
  { id: 'unsure', label: 'Not sure' },
];

export const THEMES: Choice[] = [
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
  { id: 'both', label: 'Both - Toggleable' },
];

export const LANGS: Choice[] = [
  { id: 'sv', label: 'Swedish' },
  { id: 'en', label: 'English' },
  { id: 'both', label: 'Both - Switchable' },
  { id: 'other', label: 'Other' },
];

export const DOMAIN: Choice[] = [
  { id: 'have', label: 'Yes, I have one' },
  { id: 'want', label: 'No, I want one' },
  { id: 'none', label: 'Not needed' },
];

export const MAIL: Choice[] = [
  { id: 'have', label: 'Yes, already set up' },
  { id: 'want', label: 'No, set one up for me' },
  { id: 'none', label: 'Not needed' },
];

export const WHEN = ['As soon as possible', 'Within 1–3 months', 'Flexible'];

export const STEPS = 7;

/** "What I build", shown beside the brief. */
export const SERVICES: [string, string][] = [
  ['Websites', 'Landing pages, e-commerce, booking'],
  ['Apps', 'SaaS, mobile, internal tools, dashboards'],
  ['APIs', 'REST, GraphQL, Stripe, backends'],
  ['The rest', 'Domains, DNS, business email, hosting'],
];
