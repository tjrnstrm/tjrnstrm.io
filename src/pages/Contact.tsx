import { useState, type SubmitEvent } from 'react';
import { BriefForm } from '../components/contact/BriefForm';
import { BriefSent } from '../components/contact/BriefSent';
import { ContactDetails } from '../components/contact/ContactDetails';
import { PitchPanel } from '../components/contact/PitchPanel';
import { ServicesList } from '../components/contact/ServicesList';
import { Footer } from '../components/layout/Footer';
import { STEPS } from '../data/brief';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import {
  INITIAL_BRIEF,
  mailtoHref,
  missingFields,
  NOTHING_MISSING,
  REQUIRED,
  summarise,
  type Brief,
} from '../lib/brief';
import { sendBrief } from '../lib/sendBrief';
import { playSound } from '../lib/sound';

export function Contact() {
  useDocumentTitle('Tell me what to build · Alexander Tjernström');

  const [brief, setBrief] = useState<Brief>(INITIAL_BRIEF);
  const [done, setDone] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  // Nothing is flagged until the first Send attempt; after that the stars
  // follow the fields live.
  const [showErrors, setShowErrors] = useState(false);

  const set = (patch: Partial<Brief>) => setBrief((b) => ({ ...b, ...patch }));

  const rows = summarise(brief);
  const href = mailtoHref(brief, rows);
  const missing = missingFields(brief);

  const onSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    const firstMissing = REQUIRED.find((k) => missing[k]);
    if (firstMissing) {
      playSound('error');
      setShowErrors(true);
      // A group of radio chips comes back as a list; focus its first chip.
      const found = e.currentTarget.elements.namedItem(firstMissing);
      const first = found instanceof RadioNodeList ? found[0] : found;
      if (first instanceof HTMLElement) {
        first.focus();
        first.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }
      return;
    }
    // The hidden honeypot field: people leave it empty, bots fill it in.
    const honeypot = String(new FormData(e.currentTarget).get('website') ?? '');
    setSending(true);
    setFailed(false);
    const sent = await sendBrief(brief, rows, honeypot);
    setSending(false);
    if (sent) {
      playSound('success');
      setDone(true);
    } else {
      playSound('error');
      setFailed(true);
    }
  };

  return (
    // Pulled up under the navbar; the content starts 1.5rem below the top edge
    // (the pill state of the navbar ends 1.25rem above that, see Navbar.tsx).
    <div
      style={{
        marginTop: 'calc(var(--nav-h, 72px) * -1)',
        paddingTop: 'calc(var(--nav-h, 72px) + 1.5rem)',
      }}
      className="relative isolate overflow-clip px-4 font-heading sm:px-8 lg:px-12"
    >
      <div className="grid gap-y-8 lg:mb-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-x-6">
        <PitchPanel />

        {/* Mobile only: "What I build" sits between the pitch and the brief (on
            desktop it is inside the sticky panel). */}
        <div className="lg:hidden">
          <ServicesList />
        </div>

        <div className="flex scroll-mt-24 flex-col gap-5 lg:col-start-2 lg:row-start-1">
          <div className="reveal flex flex-col justify-between gap-1 pb-1 font-mono text-[11px] tracking-[0.03em] text-zinc-600 sm:flex-row sm:items-center lg:px-2 lg:pt-2 dark:text-zinc-400">
            <span>Project brief</span>
            <span>{STEPS} steps · no cost · no commitment</span>
          </div>

          {/* The brief stays on the page behind the confirmation, so closing it
              leaves the visitor looking at what they wrote. It just can't be
              sent twice. */}
          <BriefForm
            brief={brief}
            set={set}
            flagged={showErrors ? missing : NOTHING_MISSING}
            sending={sending}
            sent={done}
            failed={failed}
            fallbackHref={href}
            onSubmit={onSubmit}
          />
        </div>
      </div>

      {/* Mobile only: on desktop this lives in the sticky panel. */}
      <aside className="mt-10 mb-4 flex flex-col gap-12 lg:hidden">
        <ContactDetails />
      </aside>
      <Footer />

      {done && !dismissed && (
        <BriefSent
          name={brief.name.trim()}
          email={brief.email.trim()}
          onClose={() => setDismissed(true)}
        />
      )}
    </div>
  );
}
