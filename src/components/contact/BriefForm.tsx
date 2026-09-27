import type { SubmitEvent } from 'react';
import type { Missing, StepProps } from '../../lib/brief';
import { AboutYouStep } from './steps/AboutYouStep';
import { AnythingElseStep } from './steps/AnythingElseStep';
import { BuildStep } from './steps/BuildStep';
import { FeelStep } from './steps/FeelStep';
import { PracticalStep } from './steps/PracticalStep';
import { SectionsStep } from './steps/SectionsStep';

type BriefFormProps = StepProps & {
  /** Mandatory fields to mark as missing (after a send attempt). */
  flagged: Missing;
  /** A send is in flight. */
  sending: boolean;
  /** The brief has gone through; it can't be sent again. */
  sent: boolean;
  /** The last send failed. */
  failed: boolean;
  /** A mailto: link with the brief filled in, offered when sending fails. */
  fallbackHref: string;
  onSubmit: (e: SubmitEvent<HTMLFormElement>) => void;
};

/** The six steps of the brief. Validation is done in `onSubmit`, not by the browser. */
export function BriefForm({
  brief,
  set,
  flagged,
  sending,
  sent,
  failed,
  fallbackHref,
  onSubmit,
}: BriefFormProps) {
  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <BuildStep brief={brief} set={set} />
      <AboutYouStep brief={brief} set={set} flagged={flagged} />
      <SectionsStep brief={brief} set={set} flagged={flagged} />
      <FeelStep brief={brief} set={set} flagged={flagged} />
      <PracticalStep brief={brief} set={set} flagged={flagged} />
      <AnythingElseStep
        brief={brief}
        set={set}
        sending={sending}
        sent={sent}
        failed={failed}
        fallbackHref={fallbackHref}
      />
      {/* Honeypot: off-screen and out of the tab order. Only bots fill it in;
          it is sent to Formspree as _gotcha, which makes it drop the brief. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />
    </form>
  );
}
