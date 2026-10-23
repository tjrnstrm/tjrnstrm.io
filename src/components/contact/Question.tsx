import type { ReactNode } from 'react';
import { RequiredMark } from './Field';

/**
 * One step of the brief: a glass card with a title, an optional hint and its
 * fields. `flagged` puts a red * on the title after a Send with the card's
 * main question unanswered (steps 1 and 2, which have no label of their own).
 * Unlike the labelled fields there is no grey * before that.
 */
export function Question({
  id,
  title,
  hint,
  flagged,
  children,
}: {
  id: string;
  title: string;
  hint?: string;
  /** Turns the * red: the card's question was left unanswered. */
  flagged?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      role="group"
      aria-labelledby={id}
      className="reveal glass flex min-w-0 flex-col gap-[22px] rounded-[28px] p-5 sm:p-9"
    >
      <h2
        id={id}
        className="font-headline text-[22px] font-light tracking-[-0.01em] sm:text-[26px]"
      >
        {title}
        {flagged && <RequiredMark flagged />}
      </h2>
      {hint && (
        <p className="-mt-2.5 text-[15px] leading-normal text-zinc-600 dark:text-zinc-400">
          {hint}
        </p>
      )}
      {children}
    </div>
  );
}
