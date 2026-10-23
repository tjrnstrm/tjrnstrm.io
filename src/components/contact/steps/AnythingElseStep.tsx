import { EMAIL } from '../../../data/site';
import type { StepProps } from '../../../lib/brief';
import { PILL_FOCUS } from '../../../lib/type';
import { AccentArrow } from '../../ui/AccentArrow';
import { TextField } from '../Field';
import { Question } from '../Question';

type AnythingElseProps = StepProps & {
  sending: boolean;
  sent: boolean;
  failed: boolean;
  fallbackHref: string;
};

/** Step 7: references and free text, and the send button. */
export function AnythingElseStep({
  brief,
  set,
  sending,
  sent,
  failed,
  fallbackHref,
}: AnythingElseProps) {
  return (
    <Question id="q-else" title="Anything else?">
      <TextField
        label="Sites you like"
        value={brief.refs}
        onChange={(refs) => set({ refs })}
        placeholder="apple.com, a competitor..."
      />
      <TextField
        label="The idea, in your own words"
        rows={5}
        value={brief.idea}
        onChange={(idea) => set({ idea })}
        placeholder="What it should do, who it is for, anything I should know..."
      />
      <button
        type="submit"
        disabled={sending || sent}
        className={`glass-pill group mt-1 inline-flex min-h-14 items-center gap-5 self-start rounded-full px-7 text-left text-[15px] font-medium disabled:opacity-60 ${
          sent ? 'disabled:cursor-default' : 'disabled:cursor-wait'
        } ${PILL_FOCUS}`}
      >
        <span>
          {sent ? 'Brief sent' : sending ? 'Sending…' : 'Send brief · book free consultation'}
        </span>
        {!sending && !sent && <AccentArrow />}
      </button>
      <p
        role="status"
        className="-mt-2 text-sm leading-normal text-red-600 dark:text-red-400"
      >
        {failed && (
          <>
            That did not go through. Try again, or{' '}
            <a href={fallbackHref} className="underline">
              open it in your mail app
            </a>{' '}
            (or write to {EMAIL}).
          </>
        )}
      </p>
    </Question>
  );
}
