import { MdArrowOutward } from 'react-icons/md';
import type { Project } from '../../data/projects';

/**
 * One project per row: a large screenshot and a short write-up, the screenshot
 * on alternating sides from lg up (stacked, screenshot first, below that).
 */
export function ProjectShowcase({ projects }: { projects: Project[] }) {
  return (
    <div className="flex flex-col gap-16 lg:gap-24">
      {projects.map((p, i) => {
        const meta = [
          p.what,
          ...(p.tags ?? []),
          p.handedOver && `Handed over ${p.handedOver}`,
        ].filter(Boolean);
        const flip = i % 2 === 1;

        return (
          <article
            key={p.name}
            className="grid items-center gap-7 lg:grid-cols-12 lg:gap-12"
          >
            <a
              href={p.url}
              target="_blank"
              rel="noreferrer"
              tabIndex={-1}
              aria-hidden="true"
              className={`block overflow-hidden rounded-2xl border border-white/80 shadow-[0_18px_44px_rgb(30_41_59/0.14)] lg:col-span-7 dark:border-white/10 dark:shadow-[0_18px_50px_rgb(0_0_0/0.5)] ${
                flip ? 'lg:order-2' : ''
              }`}
            >
              {p.image && (
                <img
                  src={p.image}
                  alt=""
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 hover:scale-[1.015] motion-reduce:transition-none"
                />
              )}
            </a>

            <div className="flex flex-col gap-3.5 lg:col-span-5">
              <p className="font-mono text-[11px] tracking-[0.03em] text-zinc-600 dark:text-zinc-400">
                {meta.join(' · ')}
              </p>
              <h2 className="font-headline text-3xl leading-[1.1] font-light tracking-[-0.01em] sm:text-[34px]">
                {p.name}
              </h2>
              <p className="max-w-[46ch] leading-relaxed text-zinc-600 dark:text-zinc-400">
                {p.description}
              </p>
              <a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="group -my-1.5 inline-flex items-center gap-1.5 self-start py-1.5 font-mono text-xs tracking-[0.03em] text-zinc-900 transition-colors hover:text-zinc-600 dark:text-zinc-100 dark:hover:text-zinc-300"
              >
                {p.display}
                <MdArrowOutward
                  size={13}
                  className="text-teal-700 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none dark:text-teal-500"
                />
              </a>
            </div>
          </article>
        );
      })}
    </div>
  );
}
