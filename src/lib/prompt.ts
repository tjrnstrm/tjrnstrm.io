import { CHANGES, pagesFor } from '../data/brief';
import type { Brief } from './brief';

/**
 * Writes the brief as a build prompt, ready to paste into Lovable or Claude.
 * Plain sentence templates: every part is skipped when its question was left
 * empty. Who sent it (name, email, phone) and the practical bits (domain,
 * business email, timeline) are left out — they are for me, not the builder.
 */

// "What kind?" picks, as they read in a sentence
const KIND: Record<string, string> = {
  'Landing page': 'a landing page',
  'Company site': 'a company website',
  'E-commerce': 'an online store',
  'Booking site': 'a booking website',
  'Blog / CMS': 'a blog',
  'Event page': 'an event page',
  'Membership site': 'a membership website',
  Documentation: 'a documentation website',
  'Web app / SaaS': 'a web app (SaaS)',
  'Mobile app': 'a mobile app',
  'Internal tool': 'an internal tool',
  Dashboard: 'a dashboard app',
  'Customer portal': 'a customer portal',
  'Booking system': 'a booking system',
  'Admin panel': 'an admin panel',
  'Real-time / chat': 'a real-time chat app',
  Photography: 'a photography portfolio',
  'Design / creative': 'a design portfolio',
  Developer: 'a developer portfolio',
  'Music / audio': 'a music portfolio',
  'Art / illustration': 'an art portfolio',
  'Agency / studio': 'an agency portfolio',
  'Personal CV': 'a personal CV website',
};
// when no "what kind?" was picked
const CATEGORY: Record<string, string> = {
  website: 'a website',
  app: 'a web app',
  portfolio: 'a portfolio website',
  other: 'a project',
};

const CHANGE: Record<string, string> = {
  look: 'give it a fresh new look',
  rebuild: 'rebuild it from scratch',
  move: 'move it to a new platform',
};

const STYLE: Record<string, string> = {
  clean: 'clean and minimal',
  glass: 'glassy and iOS-like (frosted glass, soft blur)',
  bold: 'bold and graphic',
  premium: 'premium',
  warm: 'warm and friendly',
  corporate: 'corporate',
  unsure: 'not decided — pick one that suits the business',
};

const THEME: Record<string, string> = {
  light: 'light',
  dark: 'dark',
  both: 'light and dark, with a toggle to switch',
};

/** Lowercase the first letter, unless it starts an acronym or name ("SaaS", "IKEA"). */
const lowerFirst = (s: string) => (/^[A-ZÅÄÖ][a-zåäö]/.test(s) ? s[0].toLowerCase() + s.slice(1) : s);

/** "a, b and c" */
const list = (items: string[]) =>
  items.length < 2 ? items.join('') : `${items.slice(0, -1).join(', ')} and ${items.at(-1)}`;

const clean = (s: string) => s.trim().replace(/[.\s]+$/, '');

export function toPrompt(b: Brief): string {
  const parts: string[] = [];

  // What it is, and for whom.
  const kind = b.kind.split(':')[1];
  const what = (kind && KIND[kind]) || CATEGORY[b.cat] || 'a website';
  const industry = clean(b.industry);
  const location = clean(b.location);
  const company = clean(b.company);
  const where = location ? ` in ${location}` : '';

  // "What you do" is free text ("Excavation contractor", "Dog walking"), so it
  // goes in brackets, which reads right whatever form it takes.
  const does = industry ? ` (${lowerFirst(industry)})` : '';
  if (b.noName || !company) {
    parts.push(
      `Build ${what} for a new business${does}${where}. It does not have a name yet, so use a placeholder name.`,
    );
  } else {
    parts.push(`Build ${what} for ${company}${does}${where}.`);
  }

  if (b.cat === 'other' && b.other.trim()) parts.push(`What it is: ${clean(b.other)}.`);

  // An existing site or app.
  if (b.stage === 'existing') {
    const url = clean(b.currentUrl);
    const changes = CHANGES.filter((c) => b.changes.includes(c.id)).map((c) => CHANGE[c.id]);
    const has = url ? `They already have one at ${url}.` : 'They already have one.';
    parts.push(changes.length ? `${has} The job: ${list(changes)}.` : `${has} This is a new version of it.`);
  }

  // Who it is for, and what visitors should do.
  const goal = [
    b.audience.trim() && `Who it is for: ${lowerFirst(clean(b.audience))}.`,
    b.cta.trim() && `What visitors should do: ${lowerFirst(clean(b.cta))}.`,
  ].filter(Boolean);
  if (goal.length) parts.push(goal.join('\n'));

  // Pages (only those offered for the current choice).
  const pages = pagesFor(b.cat).filter((p) => b.pages.includes(p.id));
  if (pages.length) parts.push(`Pages:\n${pages.map((p) => `- ${p.label}`).join('\n')}`);

  // Look and feel.
  const lang =
    b.lang === 'sv'
      ? 'All text in Swedish'
      : b.lang === 'en'
        ? 'All text in English'
        : b.lang === 'both'
          ? 'Text in Swedish and English, with a language switcher'
          : b.lang === 'other' && b.langOther.trim()
            ? `All text in ${clean(b.langOther)}`
            : '';
  const look = [
    STYLE[b.style] && `Style: ${STYLE[b.style]}`,
    THEME[b.theme] && `Theme: ${THEME[b.theme]}`,
    b.color.trim() && `Brand colour: ${lowerFirst(clean(b.color))}`,
    b.refs.trim() && `Sites they like: ${clean(b.refs)}`,
    lang,
  ].filter(Boolean);
  if (look.length) parts.push(`Look and feel:\n${look.map((l) => `- ${l}`).join('\n')}`);

  // Their own words, untouched.
  if (b.idea.trim()) parts.push(`Notes from the client:\n${b.idea.trim()}`);

  return parts.join('\n\n');
}
