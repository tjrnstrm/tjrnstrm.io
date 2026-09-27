import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { FiX } from 'react-icons/fi';
import { EMAIL } from '../../data/site';
import { PILL_FOCUS } from '../../lib/type';
import { TransitionLink } from '../ui/TransitionLink';

type BriefSentProps = {
  name: string;
  email: string;
  onClose: () => void;
};

/** Smaller than PAGE_HEADING: this one has to fit a 460px card. */
const MODAL_HEADING =
  'font-headline text-[clamp(1.875rem,4.6vw,2.5rem)] leading-[1.05] font-extralight tracking-[-0.02em] wrap-break-word';

const FOCUSABLE = 'a[href], button:not(:disabled)';

/**
 * Shown over the form once the brief has gone through: a green check, what
 * happens next, and the way home. Deliberately no summary of the brief and no
 * "copy" button — the visitor already has their own answers in the form behind
 * this, and a tidy copyable spec is not what this page is for.
 *
 * A real dialog: Escape, the scrim and the ✕ all close it, focus is trapped
 * while it is open and goes back where it came from afterwards. It renders in
 * a portal on <body> rather than inside the page, so it sits above everything
 * and the scrim's blur can reach the whole page behind it (the contact page's
 * wrapper is `isolate`, which would otherwise cut the blur off).
 */
export function BriefSent({ name, email, onClose }: BriefSentProps) {
  const card = useRef<HTMLDivElement>(null);
  const firstName = name.split(/\s+/)[0];
  // the latest onClose, so the effect below can run once and never re-run
  const close = useRef(onClose);
  useEffect(() => {
    close.current = onClose;
  });

  useEffect(() => {
    const el = card.current;
    if (!el) return;
    const previous = document.activeElement;
    el.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close.current();
        return;
      }
      if (e.key !== 'Tab') return;
      const items = [...el.querySelectorAll<HTMLElement>(FOCUSABLE)];
      if (!items.length) {
        e.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      // wrap at both ends, counting the card itself as the start
      if (e.shiftKey && (document.activeElement === first || document.activeElement === el)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
      if (previous instanceof HTMLElement) previous.focus();
    };
  }, []);

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={() => close.current()}
        className="sent-scrim absolute inset-0 cursor-default bg-zinc-900/25 backdrop-blur-[6px] dark:bg-black/45"
      />

      <div
        ref={card}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sent-heading"
        tabIndex={-1}
        className="sent-card glass relative flex w-full max-w-[460px] flex-col items-center gap-6 rounded-[28px] p-7 text-center outline-none sm:p-9"
      >
        <button
          type="button"
          onClick={() => close.current()}
          aria-label="Close"
          className={`absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 ${PILL_FOCUS}`}
        >
          <FiX size={16} />
        </button>

        <span className="sent-lift relative h-[74px] w-[74px]">
          <span className="sent-halo absolute inset-0 rounded-full border border-green-600/60 dark:border-green-400/60" />
          <svg viewBox="0 0 52 52" aria-hidden="true" className="h-full w-full overflow-visible">
            <circle
              className="sent-disc fill-green-600/10 dark:fill-green-400/15"
              cx="26"
              cy="26"
              r="25"
            />
            <circle
              className="sent-ring stroke-green-600 dark:stroke-green-400"
              cx="26"
              cy="26"
              r="24"
              fill="none"
              strokeWidth={2}
              transform="rotate(-90 26 26)"
            />
            <path
              className="sent-tick stroke-green-600 dark:stroke-green-400"
              d="M15.5 26.5 L23 34 L37 19"
              fill="none"
              strokeWidth={3.2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>

        <div className="flex flex-col items-center gap-3">
          <p className="sent-lift font-mono text-xs tracking-[0.03em] text-green-700 [animation-delay:90ms] dark:text-green-500">
            Brief sent
          </p>
          <h2 id="sent-heading" className={`sent-lift ${MODAL_HEADING} [animation-delay:90ms]`}>
            Got it{firstName ? `, ${firstName}` : ''}.
          </h2>
          <p className="sent-lift max-w-[44ch] leading-relaxed text-zinc-600 [animation-delay:90ms] dark:text-zinc-400">
            I will get back to you within 24 hours from{' '}
            <span className="text-zinc-900 dark:text-zinc-100">{EMAIL}</span> to{' '}
            <span className="text-zinc-900 dark:text-zinc-100">{email}</span>.
          </p>
        </div>

        <p className="sent-lift max-w-[44ch] text-[13px] leading-normal text-zinc-500 [animation-delay:170ms] dark:text-zinc-500">
          If it stays quiet, have a look in your junk folder.
        </p>

        <TransitionLink
          to="/"
          className={`glass-pill sent-lift flex min-h-12 items-center rounded-full px-6 text-[15px] font-medium [animation-delay:250ms] ${PILL_FOCUS}`}
        >
          Back to home
        </TransitionLink>
      </div>
    </div>,
    document.body,
  );
}
