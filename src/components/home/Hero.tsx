import { AccentArrow } from '../ui/AccentArrow';
import { TransitionLink } from '../ui/TransitionLink';

export function Hero() {
  return (
    <section
      style={{ paddingBottom: 'var(--nav-h, 74px)' }}
      className="relative isolate w-full h-full flex flex-col items-center justify-center text-center overflow-hidden"
    >
      <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-12">
        <p className="font-mono text-[11px] sm:text-xs tracking-[0.03em] text-zinc-500 dark:text-zinc-400">
          Fullstack developer · Stockholm
        </p>

        {/* The small lift evens out the space above and below the lowercase
            letters, which sit low in their line box. */}
        <h1
          aria-label="Alexander Tjernström"
          className="font-headline -translate-y-[0.09em] font-extralight leading-none tracking-[0.02em] text-[clamp(2.5rem,7vw,5rem)]"
        >
          tjrnstrm
          {/* the teal full stop, as on the favicon */}
          <span className="text-teal-700 dark:text-teal-500">.</span>
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 font-mono text-[11px] sm:text-xs tracking-[0.03em] text-zinc-500 dark:text-zinc-400">
          <TransitionLink
            to="/contact"
            className="group relative inline-flex items-center gap-2 text-zinc-900 after:absolute after:-inset-x-2 after:-inset-y-3 after:content-[''] dark:text-zinc-100"
          >
            <span className="underline decoration-zinc-400 dark:decoration-zinc-600 underline-offset-[6px] transition-colors group-hover:decoration-current">
              Tell me what to build
            </span>
            <AccentArrow />
          </TransitionLink>
        </div>
      </div>
    </section>
  );
}
