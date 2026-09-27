import type { Brief, BriefRows } from './brief';

/** The Formspree form the brief is sent to; it emails it to me and keeps a copy. */
const FORMSPREE_URL = 'https://formspree.io/f/xzezjqgk';

// Already sent as their own fields below, so not repeated from the summary.
const SKIP = new Set(['From', 'Reply to']);

/**
 * Sends the brief to Formspree and says whether it went through. Formspree uses
 * the `email` field as the reply-to address, so Reply in my inbox answers the
 * visitor. `honeypot` is the hidden field only bots fill in: Formspree drops
 * any submission with `_gotcha` set.
 */
export async function sendBrief(
  brief: Brief,
  rows: BriefRows,
  honeypot: string,
): Promise<boolean> {
  const name = brief.name.trim();
  const fields: Record<string, string> = {
    _subject: `Project brief from ${name}`,
    _gotcha: honeypot,
    name,
    email: brief.email.trim(),
  };
  if (brief.company.trim()) fields.company = brief.company.trim();
  for (const [k, v] of rows) if (!SKIP.has(k)) fields[k] = v;

  try {
    const res = await fetch(FORMSPREE_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify(fields),
    });
    return res.ok;
  } catch {
    return false;
  }
}
